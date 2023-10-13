const {Empty, CANSignal} = require('./autodemo_pb.js');
const {CANSignalServiceClient} = require('./autodemo_grpc_web_pb.js');

var client = new CANSignalServiceClient('http://' + window.location.hostname + ':8080',
                               null, null);

// server streaming call

document.addEventListener("DOMContentLoaded", onDomReadyHandler())


function onDomReadyHandler(event) {
  const emptyRequest = new Empty();
  var stream = client.streamCANSignals(emptyRequest, {});
  stream.on('data', (carInfo) => {
    //console.log(carInfo.array[0]);
    var speed = carInfo.array[0];
    var revs = carInfo.array[1];
    var speed_attribute = document.getElementsByTagName('canvas')[0];
    var rev_attribute = document.getElementsByTagName('canvas')[1];
    speed_attribute.setAttribute('data-value', speed)
    rev_attribute.setAttribute('data-value', revs)
    console.log("Speed is " + speed + " Rev is " + revs)
  });
  stream.on('error', (err) => {
    console.log(`Unexpected stream error: code = ${err.code}` +
                `, message = "${err.message}"`);
  });
}
