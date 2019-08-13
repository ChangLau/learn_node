const fs = require("fs");
const path = require("path");

var rs = fs.createReadStream(path.join(__dirname, "/input.txt"));

rs.on("data", function(chunk) {
  console.log(chunk.toString());
});

rs.on("end", function() {
  console.log("end");
});
