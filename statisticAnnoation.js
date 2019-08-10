const fs = require("fs");
const path = require("path");
const readline = require("readline");
const XLSX = require("xlsx");

var statisticData = [["名称", "总行数", "注释行数", "注释率"]];

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
    const xlsxData = XLSX.utils.aoa_to_sheet(statisticData);
    let xlsxNew = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(xlsxNew, xlsxData, "statistic");
    XLSX.writeFile(xlsxNew, "注释率统计.xlsx");
  });
}

function statisticAnnotation(pathname) {
  // 不统计如下文件
  if (
    pathname.includes("node_modules") ||
    pathname.includes("dist") ||
    pathname.includes("git") ||
    pathname.includes("image") ||
    pathname.includes("plugin") ||
    pathname.includes("vscode")
  ) {
    return;
  }

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
    statisticData.push([
      pathname,
      lineNumber,
      annotationLineNumber,
      (annotationLineNumber / lineNumber).toFixed(2)
    ]);
  });
}

travel(
  "/Users/liuchang/Documents/work/wechat_jzb/alipay-saas-web",
  statisticAnnotation
);
