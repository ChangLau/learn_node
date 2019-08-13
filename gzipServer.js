const http = require("http");
const zlib = require("zlib");

http
  .createServer(function(request, response) {
    console.log("http start");
    var i = 1024,
      data = "";

    while (i--) {
      data += ".";
    }

    if ((request.headers["accept-encoding"] || "").indexOf("gzip") !== -1) {
      zlib.gzip(data, function(err, data) {
        response.writeHead(200, {
          "Content-Type": "text/plain",
          "Content-Encoding": "gzip"
        });
        response.end(data);
      });
    } else {
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.end(data);
    }
  })
  .listen(8877);

console.log("Server is listening at 8090");
