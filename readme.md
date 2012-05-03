# diskspace.js #
This is a simple module for node.js to check disk space usages.

This also depends on a Console Application for Windows called [DriveSpace](https://github.com/keverw/drivespace) written in C# and requires .NET Framework 3.5 when using this on a Windows system.

## Exmaple ##
	diskspace.check('C', function (total, free, status)
	{
		Your code here
	});

On Windows you change C to the drive letter you want to check. On Linux you use the mount path eg `/`.

`total` is how much the drive has totaly.
`free` is how much freespace you have.
`status` isn't really that useful unless you want to debug.

## Status codes: ##

- NOTFOUND - Disk letter was not found, the space values will be 0
- READY - The drive is ready
- NOTREADY - The drive isn't ready, the space values will be 0
- STDERR - some error, the output of it was logged to the console.