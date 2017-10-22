'use strict';
const osType = require('os').type(),
	exec = require('child_process').exec,
	execFile = require('child_process').execFile,
	path = require('path');

/**
* @description returns an object in a promiser.
* @async
* @function check
* @param {string} drive - driver you want to have information
* @returns {Promise.<check>} 
* @example
*	diskspace.check('/').then((result) => {
*		console.log('Total: ' + result.total);
*		console.log('Used: ' + result.used);
*		console.log('Free: ' + result.free);
*		console.log('Status: ' + result.status);
*	}).catch((err) => {
*		console.log('errr', err.result);
*	})
*
* @throws Will throw an error if the argument is null.
*
*/
exports.check = async (drive) => {
	const system = () => new Promise((resolve, reject) => {

		let result = {};
		result.total = 0;
		result.used = 0;
		result.free = 0;
		result.status = null;

		if (!drive) {
			result.status = 'NOTFOUND';
			var error = new Error('Necessary parameter absent');

			throw {
				error: error,
				result: result
			}
		}

		//Windows
		if (osType === 'Windows_NT') {
			if (drive.length <= 3)
				drive = drive.charAt(0);

			return execFile(path.join(__dirname, 'drivespace.exe'), ["drive-" + drive], function (error, stdout, stderr) {
				let disk_info = stdout.trim().split(',');
				if (error) {
					result.status = 'STDERR';
					return reject(result);
				}


				result.status = disk_info[2];

				if (result.status === 'NOTFOUND') {
					result.status = 'Drive not found';
					return reject(result);
				}

				result.total = disk_info[0];
				result.free = disk_info[1];
				result.used = result.total - result.free;
				result.status = disk_info[2];

				return resolve(result)


			});
		};


		exec("df -k '" + drive.replace(/'/g, "'\\''") + "'", (error, stdout, stderr) => {
			if (error) {
				let erro = JSON.stringify(error);

				result['status'] = stderr.indexOf("No such file or directory") !== -1 ? 'NOTFOUND' : 'STDERR'

				return reject({ erro, result });
			}

			let lines = stdout.trim().split("\n"),
				str_disk_info = lines[lines.length - 1].replace(/[\s\n\r]+/g, ' '),
				disk_info = str_disk_info.split(' ');

			return resolve({
				"total": disk_info[1] * 1024,
				"used": disk_info[2] * 1024,
				"free": disk_info[3] * 1024,
				'status': 'READY'
			});
		});
	});

	return await system().then((result) => {
		return result;
	}).catch((err) => {
		throw err;
	})

}