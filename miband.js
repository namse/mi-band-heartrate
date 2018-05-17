const MiBand = require('miband');
const bluetooth = require('webbluetooth').bluetooth;
global.TextDecoder = require('util').TextDecoder;

module.exports = async (onHeartRate) => {
	const device = await bluetooth.requestDevice({
		filters: [
			{ services: [MiBand.advertisementService] }
		],
		optionalServices: MiBand.optionalServices
	});

	const server = await device.gatt.connect();

	const miband = new MiBand(server);
	await miband.init();

	miband.on('heart_rate', (rate) => {
		console.log('Heart Rate:', rate)
		onHeartRate(rate);
	});

	await miband.hrmStart();
}