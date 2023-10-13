# dash_grpcweb_v2
Fully functioning dashboard with gRPC communication

## Steps

Youtube link : https://www.youtube.com/watch?v=h8JVC13S66g

Steps : 
install docker
install nodejs
install from ibeji & chariott
sudo apt-get update
sudo apt-get install make
sudo apt-get install g++
sudo apt-get install -y linux-modules-extra-$(uname -r)
sudo npm install -g protoc-gen-grpc-web



nodejs download github : https://github.com/nodesource/distributions

Reference : https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld

While installing socketcan error install g++ : 
sudo apt-get update
sudo apt-get install make
sudo apt-get install g++

For vcan0, we need linux extra modules : sudo apt-get install -y linux-modules-extra-$(uname -r)

After that

sudo modprobe vcan
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0

Commands : 

node server.js

docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    --network=host envoyproxy/envoy:v1.22.0

python3 -m http.server 8081
