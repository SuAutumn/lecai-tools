export declare namespace filelist {
  interface File {
    read: () => string;
    ls: (path: string) => string[];
    path: string;
    isFile: boolean;
    isDir: boolean;
  }

  interface Options {
    ignore: string[]; // 读取文件的时候忽略的文件和目录
  }
}

export declare namespace index {
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

  interface Json {
    [x: string]: string;
  }

  interface Config {
    entry: string; // 程序扫描入口
    outDir: string; // 结果文件输出目录
    baseSample: string; // 样本比较
    preserveKeys: string[]; // 样本保留keys
    ignoreFileOrDirRelativePath: string[]; // 扫描忽略文件(夹)，entry相对路径
    excelPath: string; // excel文件目录路径
    extendKeys: Json; // 扩展老key
  }
}
