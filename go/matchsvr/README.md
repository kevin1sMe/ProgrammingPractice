## grpc-go准备

### 步骤
* 安装grpc
    * `go get -u google.golang.org/grpc`
* 安装protoc
    * 在这里下载: `https://github.com/protocolbuffers/protobuf/releases`
* 安装protoc-go插件
    * go get -u github.com/golang/protobuf/protoc-gen-go
    * 配置到PATH. `export PATH=$PATH:$GOPATH/bin`

### 参考
https://grpc.io/docs/quickstart/go.html
