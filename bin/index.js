#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filelist_1 = require("./filelist");
var path = require("path");
var fs = require("fs");
var excel_1 = require("./excel");
var START = '';
var LANG = '';
var IGNORE = [];
var PRESERVEKEY = [];
var OUTDIR = '';
var cwd = process.cwd();
var EXCELPATH = '';
var EXTENDKEYS = {};
var absPath = function (relative) {
    return path.resolve(cwd, relative);
};
if (process.argv[2] === '--config' && process.argv[3]) {
    var config = require(absPath(process.argv[3]));
    START = absPath(config.entry);
    LANG = absPath(config.baseSample);
    IGNORE = config.ignoreFileOrDirRelativePath;
    PRESERVEKEY = config.preserveKeys;
    OUTDIR = absPath(config.outDir);
    EXCELPATH = absPath(config.excelPath);
    EXTENDKEYS = config.extendKeys;
}
else {
    console.log('参数不正确，请参照README.md使用方法');
    process.exit(1);
}
var tStr = filelist_1.default(START, {
    ignore: IGNORE
});
var _a = excel_1.default(EXCELPATH), ch = _a.ch, en = _a.en, ha = _a.ha;
for (var i in EXTENDKEYS) {
    ch.message[i] = EXTENDKEYS[i];
}
var lang = {
    ch: ch, en: en, ha: ha
};
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
write(path.resolve(OUTDIR, './ch.js'), format(search(ch), 'ch'));
write(path.resolve(OUTDIR, './en.js'), format(search(en), 'en'));
write(path.resolve(OUTDIR, './ha.js'), format(search(ha), 'ha'));
write(LANG, JSON.stringify(lang));
