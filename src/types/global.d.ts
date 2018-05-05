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
}
