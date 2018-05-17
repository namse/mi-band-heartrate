const express = require('express');
const bodyParser = require('body-parser')
const WebSocket = require('ws');

const app = express();

app.use(express.static('public'));

app.listen(4000, () => {
	console.log('Example app listening on port 4000!');
});

const wss = new WebSocket.Server({ port: 4001 });

let sockets = [];
wss.on('connection', (ws) => {
	sockets.push(ws);
	console.log('connected', sockets.length);

	ws.on('close', () => {
		sockets = sockets.filter(socket => socket !== ws);
		console.log('disconnected');
	});
});


require('./miband')(heartRate => {
	sockets.forEach(socket => socket.send(heartRate));
});
