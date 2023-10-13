var PROTO_PATH = __dirname + '/autodemo.proto';

var assert = require('assert');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var can = require("socketcan");
var channel = can.createRawChannel('vcan0', true);

var carInfo = {};
carInfo.speed = 0
carInfo.revs = 0

channel.addListener("onMessage", function(msg) {
    carInfo.revs = msg.data.readUIntBE(0, 4)
    carInfo.speed = msg.data.readUIntBE(4, 2)
    //console.log(carInfo)
  })
  

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var autodemo = protoDescriptor.autodemo;
  
  function getServer() {
    var server = new grpc.Server();
    server.addService(autodemo.CANSignalService.service, {
        StreamCANSignals: (call) => {
            setInterval(() => {
                console.log(carInfo);
                call.write(carInfo);
            },100)
        }
    });
    return server;
  }
  
  if (require.main === module) {
    var server = getServer();
    server.bindAsync(
      '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
        assert.ifError(err);
        server.start();
        channel.start()
    });
  }

  
  exports.getServer = getServer;
