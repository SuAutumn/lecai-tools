import fileContent from './filelist'
import path = require('path');

const START: string = path.resolve(__dirname, '../../work/lecai-vue-trunk/eLearningH5.01/src/components');

const LANG: string = path.resolve(__dirname, '../../work/lecai-vue-trunk/eLearningH5.01/src/language.js');


let tStr: string = fileContent(START);
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

// let shakeKey: string[] = [];
// for (let i in ch.message) {
//   if (tStr.indexOf(i) === -1) {
//     shakeKey.push(i)
//   }
// }

// console.log(shakeKey);
console.log(tStr);
