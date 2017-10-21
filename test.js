//use just diskspace if installed via NPM
const { check } = require('./diskspace.js'),
	os = require('os');
let drive_letter = null;

if (os.type() == 'Windows_NT') {
	drive_letter = 'C'; //Good Mount Point
	//drive_letter = 'K'; //Bad Mount Point - Well on my system
} else if (os.type() == 'Darwin' || os.type() == 'Linux') {
	//Mac OS or Linux
	drive_letter = '/';
} else {
	drive_letter = null;
}

check('/').then((result) => {
	console.log('Total: ' + result.total);
	console.log('Used: ' + result.used);
	console.log('Free: ' + result.free);
	console.log('Status: ' + result.status);
}).catch((err) => {
	console.log('errr', err);
})


// check(drive_letter, function (err, result)
// {
//     console.log('err: ' + result.err);
// 	console.log('Total: ' + result.total);
// 	console.log('Used: ' + result.used);
// 	console.log('Free: ' + result.free);
// 	console.log('Status: ' + result.status);
// });
