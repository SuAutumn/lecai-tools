#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filelist_1 = require("./filelist");
var fs = require("fs");
var START = '';
var LANG = '';
var IGNORE = [];
var PRESERVEKEY = [];
if (process.argv[2] === '--config' && process.argv[3]) {
    var config = require(process.argv[3]);
    START = config.entry;
    LANG = config.baseSample;
    IGNORE = config.ignoreFileOrDirRelativePath;
    PRESERVEKEY = config.preserveKeys;
    console.log(config);
}
else {
    console.log('lecai --config xx.js');
    process.exit(1);
}
var tStr = filelist_1.default(START, {
    ignore: IGNORE
});
var lang = filelist_1.default(LANG);
var _a = (JSON.parse(lang)), ch = _a.ch, en = _a.en, ha = _a.ha;
// 检测字段是不是保留字段
function checkPreserveKey(key) {
    return PRESERVEKEY.every(function (preKey) {
        return key.indexOf(preKey) !== 0;
    });
}
function search(lang) {
    var newLang = {
        message: {}
    };
    for (var i in lang.message) {
        if (checkPreserveKey(i) && tStr.indexOf(i) === -1) {
            console.log(i);
        }
        else {
            newLang.message[i] = lang.message[i];
        }
    }
    return newLang;
}
exports.search = search;
function format(newLang, type) {
    var str = JSON.stringify(newLang);
    str = "const locales={" + type + ":" + str + "}\nexport {locales}";
    return str.replace(/'/g, "\\'").replace(/"/g, "'");
}
exports.format = format;
function write(path, data) {
    fs.writeFile(path, data, 'utf-8', function (err) {
        if (err)
            console.log(err);
        console.log(path, 'ok.');
    });
}
exports.write = write;
write('./ch.js', format(search(ch), 'ch'));
write('./en.js', format(search(en), 'en'));
write('./ha.js', format(search(ha), 'ha'));
