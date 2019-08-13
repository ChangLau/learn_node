var http = require("http");
var url = require("url");

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello1 World");
//   })
//   .listen(8888);

// console.log("Server running at http://127.0.0.1:8888/");

http
  .createServer(function(request, response) {
    console.log("开始请求");
    console.log(url.parse(request.url));
    response.writeHead(200, { "Content-Type": "text/plain" });

    request.on("data", function(chunk) {
      response.write(chunk);
    });

    request.on("end", function() {
      response.end();
    });
  })
  .listen(8889);
