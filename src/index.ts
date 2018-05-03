import fileContent from './filelist'
import path = require('path');
import fs = require('fs');
import { fstat } from 'fs';

const START: string = path.resolve(__dirname, '../../../work/lecai-vue-trunk/eLearningH5.01/src');

const LANG: string = path.resolve(__dirname, '../../../work/lecai-vue-trunk/eLearningH5.01/src/language.js');


let tStr: string = fileContent(START, {
  ignore: [
    'assets',
    'language.js',
    'components/view/exam',
    'components/view/training',
    'language',
    'HTone.js'
  ]
});
let lang: string = fileContent(LANG);

interface Lang {
  message: {
    [x: string]: string
  }
}

interface I18n {
  ch: Lang;
  en: Lang;
  ha: Lang;
}

let {ch, en, ha} = <I18n>(JSON.parse(lang));

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

function search(lang: Lang): Lang {
  let newLang: Lang = {
    message: {}
  }
  for (let i in lang.message) {
    if (checkPreserveKey(i) && tStr.indexOf(i) === -1) {
      // console.log(i)
    } else {
      newLang.message[i] = lang.message[i]
    }
  }
  return newLang
}

function format(newLang: Lang, type: string): string {
  let str = JSON.stringify(newLang);
  str = `const locales={${type}:${str}}\nexport {locales}`;
  return str.replace(/'/g, "\\'").replace(/"/g, "'");
}

function write(path: string, data: string): void {
  fs.writeFile(path, data, 'utf-8', err => {
    if (err) console.log(err);
    console.log('ok.')
  })
}

write('./ch.js', format(search(ch), 'ch'))
write('./en.js', format(search(en), 'en'))
write('./ha.js', format(search(ha), 'ha'))