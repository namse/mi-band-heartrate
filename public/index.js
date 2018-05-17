const socket = new WebSocket('ws://192.168.0.7:4001');

socket.onmessage = event => {
  const heartRate = event.data;
  console.log(heartRate);
  document.getElementById('text').textContent = heartRate;
};
