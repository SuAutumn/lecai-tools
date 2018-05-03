import fs = require('fs')
import path = require('path')

function read(location: string): Function {
  return (): string => fs.readFileSync(location, 'utf-8')
}

function ls(location: string): void {
  const files: string[] = fs.readdirSync(location).map(filename => {
    return path.resolve(location, filename)
  });
  files.forEach(file => {
    let stats: fs.Stats = fs.statSync(file);
    stack.push(<File>{
      ls: ls,
      read: read(file),
      isFile: stats.isFile(),
      isDir: stats.isDirectory(),
      path: file
    })
  })
}

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

let stack: Array<File> = [];

function main(start: string, options?: Options): string {
  start = path.resolve(__dirname, start);
  let fileContent: string = '';
  let ignorePath: string[] = [];
  let stats: fs.Stats = fs.statSync(start);

  if (options) {
    ignorePath = options.ignore.map(ig => {
      return path.resolve(start, ig)
    })
  }
  if (ignorePath.indexOf(start) > -1) {
    return fileContent
  }

  if (stats.isFile()) {
    return read(start)()
  }

  if (stats.isDirectory()) {
    ls(start);

    while (stack.length > 0) {
      let node = stack.pop();
      // 忽略不需要检查的文件
      if (ignorePath.indexOf(node.path) > -1) {
        continue
      }
      if (node.isFile) {
        fileContent += node.read()
      }

      if (node.isDir) {
        ls(node.path)
      }
    }
    return fileContent
  }
}

export default main
