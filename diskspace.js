'use strict';
var osType = require('os').type();
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var path = require('path');

function check(drive, callback)
{
	var result = {};
	result.total = 0;
	result.used = 0;
	result.free = 0;
	result.status = null;

	if (!drive)
	{
		result.status = 'NOTFOUND';
		var error = new Error('Necessary parameter absent');

		return callback
					? callback(error, result)
					: console.error(error);
	}

	if (osType === 'Windows_NT') //Windows
	{

		if(drive.length <= 3)
			drive = drive.charAt(0);

		execFile(path.join(__dirname, 'drivespace.exe'),["drive-"+ drive], function (error, stdout, stderr)
		{
			if (error)
			{
				result.status = 'STDERR';
			}
			else
			{
				var disk_info = stdout.trim().split(',');

				result.total = disk_info[0];
				result.free = disk_info[1];
				result.used = result.total - result.free;
				result.status = disk_info[2];

				if (result.status === 'NOTFOUND')
				{
					error = new Error('Drive not found');
				}

			}

			callback ? callback(error, result)
						 : console.error(stderr);
		});
	}
	else
	{
		exec("df -k '" + drive.replace(/'/g,"'\\''") + "'", function(error, stdout, stderr)
		{
			if (error)
			{
				if (stderr.indexOf("No such file or directory") != -1)
				{
					result.status = 'NOTFOUND';
				}
				else
				{
					result.status = 'STDERR';
				}

				callback ? callback(error, result)
						 : console.error(stderr);
			}
			else
			{
				var lines = stdout.trim().split("\n");

				var str_disk_info = lines[lines.length - 1].replace( /[\s\n\r]+/g,' ');
				var disk_info = str_disk_info.split(' ');

				result.total = disk_info[1] * 1024;
				result.used = disk_info[2] * 1024;
				result.free = disk_info[3] * 1024;
				result.status = 'READY';

				callback && callback(null, result);
			}
		});
	}
}

// Export public API
module.exports = {
	check: check,
};
