const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 同步遍历;
// function travelSync(dir, callback) {
//   fs.readdirSync(dir).forEach(function(file) {
//     var pathname = path.join(dir, file);

//     if (fs.statSync(pathname).isDirectory()) {
//       travel(pathname, callback);
//     } else {
//       callback(pathname);
//     }
//   });
// }

// travelSync(
//   "/Users/liuchang/Documents/changlau-project/learn_node",
//   pathname => {
//     console.log("文件目录", pathname);
//   }
// );

// 异步遍历
function travel(dir, callback) {
  fs.readdir(dir, function(err, files) {
    for (let file of files) {
      let pathname = path.join(dir, file);
      fs.stat(pathname, function(err, stats) {
        if (stats.isDirectory()) {
          travel(pathname, callback);
        } else {
          callback(pathname);
        }
      });
    }
  });
}

travel(
  "/Users/liuchang/Documents/changlau-project/learn_node",
  statisticAnnotation
);

function statisticAnnotation(pathname) {
  var regCommon1 = /^\/\//;
  var regCommon2 = /^(\/)?(\*)+(\/)?/;
  var regHtml = /^(<!--).*(-->)$/;
  var lineNumber = 0;
  var annotationLineNumber = 0;

  var readStrem = fs.createReadStream(pathname);
  var readLine = readline.createInterface({
    input: readStrem
  });

  readLine.on("line", function(line) {
    if (
      regCommon1.test(line.toString().trim()) ||
      regCommon2.test(line.toString().trim()) ||
      regHtml.test(line.toString().trim())
    ) {
      annotationLineNumber++;
    }
    lineNumber++;
  });
  readLine.on("close", function() {
    console.log(
      "close",
      pathname,
      lineNumber,
      annotationLineNumber,
      (annotationLineNumber / lineNumber).toFixed(2)
    );
  });
}
