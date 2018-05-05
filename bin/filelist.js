"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function read(location) {
    return function () { return fs.readFileSync(location, 'utf-8'); };
}
function ls(location) {
    var files = fs.readdirSync(location).map(function (filename) {
        return path.resolve(location, filename);
    });
    files.forEach(function (file) {
        var stats = fs.statSync(file);
        stack.push({
            ls: ls,
            read: read(file),
            isFile: stats.isFile(),
            isDir: stats.isDirectory(),
            path: file
        });
    });
}
var stack = [];
function main(start, options) {
    var fileContent = '';
    var ignorePath = [];
    var stats = fs.statSync(start);
    if (options) {
        ignorePath = options.ignore.map(function (ig) {
            return path.resolve(start, ig);
        });
    }
    if (ignorePath.indexOf(start) > -1) {
        return fileContent;
    }
    if (stats.isFile()) {
        return read(start)();
    }
    if (stats.isDirectory()) {
        ls(start);
        while (stack.length > 0) {
            var node = stack.pop();
            if (ignorePath.indexOf(node.path) > -1) {
                continue;
            }
            if (node.isFile) {
                fileContent += node.read();
            }
            else {
                ls(node.path);
            }
        }
        return fileContent;
    }
}
exports.default = main;
