import XLSX = require("xlsx");
import {index} from './types/global'
import { WorkSheet, WorkBook } from '../node_modules/xlsx/types/index'
import { fstat } from "fs";
import fs = require('fs');

let ch: index.Lang = {
  message: {}
};
let en: index.Lang = {
  message: {}
};
let ha: index.Lang = {
  message: {}
};
let lang: index.I18n = {
  ch, en, ha
}

/**
 * 读取excel文件内容
 * @param path excel文件路径
 */
function readXlsx(path: string): WorkBook {
  return XLSX.readFile(path, {
    type: 'string'
  });
}

export default function main(path: string): index.I18n {
  let workBook = readXlsx(path);
  let sheetNames = workBook.SheetNames;

  // 循环给ch en ha对象赋值
  for (let sheetIndex in sheetNames) {
    let sheetName: string = sheetNames[sheetIndex];
    let sheet: WorkSheet = workBook.Sheets[sheetName];
    // 如果不存在范围就下一个
    if (!sheet['!ref']) {
      continue;
    }
    let range = Number(sheet['!ref'].match(/\d+/g)[1]);
    for (let i = 2; i <= range; i++) {
      // 如果单元格值为空，则弄下一个
      if (!sheet['A' + i]) continue;
      let key = sheet['A' + i]['v'];
      ch.message[key] =  sheet['B' + i]['v'];
      en.message[key] =  sheet['C' + i]['v'];
      ha.message[key] =  sheet['D' + i]['v'];
    }
  }
  return lang;
}