### 去除vue项目不用国际化语言

* 安装方法

  npm i lecai-tools@last

* 使用

  * lecai-tools --config 配置文件.js
  * 只支持CommonJs方式调用

* 配置文件格式

  ```typescript
  interface Config {
    entry: string; // 程序扫描入口
    outDir: string; // 结果文件输出目录
    baseSample: string; // 样本比较
    preserveKeys: string[]; // 样本保留keys
    ignoreFileOrDirRelativePath: string[]; // 扫描忽略文件(夹)，entry相对路径
    excelPath: string; // excel文件目录路径
    extendKeys: Json; // 扩展老key
  }
  ```

  * TODO

    * ~~自动请求国际化文档~~
    * ~~增加扩展老文档~~