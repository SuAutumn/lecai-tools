"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
var ch = {
    message: {}
};
var en = {
    message: {}
};
var ha = {
    message: {}
};
var lang = {
    ch: ch, en: en, ha: ha
};
function readXlsx(path) {
    return XLSX.readFile(path, {
        type: 'string'
    });
}
function main(path) {
    var workBook = readXlsx(path);
    var sheetNames = workBook.SheetNames;
    for (var sheetIndex in sheetNames) {
        var sheetName = sheetNames[sheetIndex];
        var sheet = workBook.Sheets[sheetName];
        if (!sheet['!ref']) {
            continue;
        }
        var range = Number(sheet['!ref'].match(/\d+/g)[1]);
        for (var i = 2; i <= range; i++) {
            if (!sheet['A' + i])
                continue;
            var key = sheet['A' + i]['v'];
            ch.message[key] = sheet['B' + i]['v'];
            en.message[key] = sheet['C' + i]['v'];
            ha.message[key] = sheet['D' + i]['v'];
        }
    }
    return lang;
}
exports.default = main;
