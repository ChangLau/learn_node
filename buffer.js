/**
 * Author: Changlau
 * Time: 2019-08-10
 */
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var str = bin.toString("utf-8");

var bin = new Buffer("hello", "utf-8");
console.log(bin, str);
