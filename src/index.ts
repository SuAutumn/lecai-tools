#!/usr/bin/env node

import fileContent from './filelist'
import path = require('path');
import fs = require('fs');
import {fstat} from 'fs';
import {index} from './types/global';


let START: string = '';
let LANG: string = '';
let IGNORE: string[] = [];
let PRESERVEKEY: string[] = [];
let OUTDIR: string = '';
let cwd: string = process.cwd(); // 当前进程的目录
let absPath: (path: string) => string = function (relative: string): string {
  return path.resolve(cwd, relative)
}


if (process.argv[2] === '--config' && process.argv[3]) {
  let config = <index.Config>require(absPath(process.argv[3]));
  START = absPath(config.entry);
  LANG = absPath(config.baseSample);
  IGNORE = config.ignoreFileOrDirRelativePath;
  PRESERVEKEY = config.preserveKeys;
  OUTDIR = absPath(config.outDir);
} else {
  console.log('参数不正确，请参照README.md使用方法');
  process.exit(1);
}

let tStr: string = fileContent(START, {
  ignore: IGNORE
});
let lang: string = fileContent(LANG);

let {ch, en, ha} = <index.I18n>(JSON.parse(lang));

// 检测字段是不是保留字段
function checkPreserveKey(key: string): boolean {
  return PRESERVEKEY.every(preKey => {
    return key.indexOf(preKey) !== 0
  })
}

export function search(lang: index.Lang): index.Lang {
  let newLang: index.Lang = {
    message: {}
  }
  for (let i in lang.message) {
    if (checkPreserveKey(i) && tStr.indexOf(i) === -1) {
      console.log(i)
    } else {
      newLang.message[i] = lang.message[i]
    }
  }
  return newLang
}

export function format(newLang: index.Lang, type: string): string {
  let str = JSON.stringify(newLang);
  str = `const locales={${type}:${str}}\nexport {locales}`;
  return str.replace(/'/g, "\\'").replace(/"/g, "'");
}

export function write(path: string, data: string): void {
  fs.writeFile(path, data, 'utf-8', err => {
    if (err) console.log(err);
    console.log(path, 'ok.');
  })
}


write(path.resolve(OUTDIR, './ch.js'), format(search(ch), 'ch'))
write(path.resolve(OUTDIR, './en.js'), format(search(en), 'en'))
write(path.resolve(OUTDIR, './ha.js'), format(search(ha), 'ha'))