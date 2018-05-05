import fileContent from './filelist'
import path = require('path');
import fs = require('fs');
import { fstat } from 'fs';
import { index } from './types/global';

const START: string = 'E:/vue-h5/src';

const LANG: string = 'E:/vue-h5/src/language.json';


let tStr: string = fileContent(START, {
  ignore: [
    'assets',
    'language.json',
    'components/view/exam',
    'components/view/training',
    'language',
    'HTone.js'
  ]
});
let lang: string = fileContent(LANG);

let {ch, en, ha} = <index.I18n>(JSON.parse(lang));

// 保留字段
const PRESERVEKEY: string[] = [
  'global.',
  'apis.',
  'api.',
  'posts.',
  'name.',
  'face.',
  'advert.',
  'apisorg.',
  'pis.'
]

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
    console.log('ok.')
  })
}


write('./ch.js', format(search(ch), 'ch'))
write('./en.js', format(search(en), 'en'))
write('./ha.js', format(search(ha), 'ha'))