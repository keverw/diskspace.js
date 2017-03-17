[![build status](https://secure.travis-ci.org/keverw/diskspace.js.png)](http://travis-ci.org/keverw/diskspace.js)

# diskspace.js 2.0.0
This is a simple module for Node.js to check disk space usage in bytes on both *nix and Windows systems.

If you are using on Windows, This also depends on a console application for Windows called [DriveSpace](https://github.com/keverw/drivespace) written in C# and requires .NET Framework 3.5 when using this on a Windows system. This is included in the NPM package, but you can look at the DriveSpace code also if you wish.

If your on a *nix system, `drivespace.exe` is not used and `df` command is used.

## Setup

To set up diskspace.js on your Node.js server use npm.

`npm install diskspace`

## Example Usage
```
var diskspace = require('diskspace');
diskspace.check('C', function (err, result)
{
	Your code here
});
```
On Windows you change C to the drive letter you want to check. On Linux you use the mount path eg `/`.

The result of the diskspace check is returned as an object named `result`.

* `result.total` is how much the drive has totally.
* `result.used` is how much of the drive is reported as used. On *nix this is straight from the `df -k` command, on Windows it's calculated from `result.total - result.free`
* `result.free` is how much free space you have.
* `result.status` isn't really that useful unless you want to debug.

## Status codes:

- NOTFOUND - Disk was not found, the space values will be 0
- READY - The drive is ready
- NOTREADY - The drive isn't ready, the space values will be 0
- STDERR - some error, the output of it was logged to the console.

## Other Notes
This will fail on hard drives bigger than 9 petabytes. Thanks [@SteveStreza](https://twitter.com/#!/SteveStreza) [[1]](https://twitter.com/#!/SteveStreza/status/197939419842482176) [[2]](https://twitter.com/#!/SteveStreza/status/197939715993907200)