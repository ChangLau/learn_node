const http = require("http");
const zlib = require("zlib");
const url = require("url");

var options = {
  hostname: "localhost",
  port: 8877,
  path: "/",
  method: "GET",
  headers: {
    "Accept-Encoding": "gzip, deflate"
  }
};

http
  .request(options, function(response) {
    console.log(url.format(options));
    var body = [];

    response.on("data", function(chunk) {
      body.push(chunk);
    });

    response.on("end", function() {
      body = Buffer.concat(body);
      if (response.headers["content-encoding"] === "gzip") {
        zlib.gunzip(body, function(err, data) {
          console.log(data.toString());
        });
      } else {
        console.log(body.toString());
      }
    });
  })
  .end();
