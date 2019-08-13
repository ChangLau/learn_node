var http = require("http");
var url = require("url");

var options = {
  hostname: "localhost",
  port: 8889,
  path: "/getname?name=changlau",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

var request = http.request(options, function(response) {
  var body = [];

  console.log(url.format(options));

  response.on("data", function(chunk) {
    body.push(chunk);
  });

  response.on("end", function() {
    body = Buffer.concat(body);
    console.log(body.toString());
  });
});

request.write("Hello World");
request.end();
