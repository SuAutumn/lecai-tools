#! /usr/bin/env node
import * as fs from 'fs'
import * as html from 'html5parser'

// html ast 生成抽象语法树
class HtmlParse {
  public content: string;
  public template: string;
  public filename: string;
  public isChArray: Array<string>;

  static regExpTemplate: RegExp = new RegExp('<template>[\\S\\s]*</template>', 'g');

  constructor (route: string) {
    this.template = this.content = '';
    this.filename = route
    this.isChArray = []
    this.setContent(route)
    if (this.content) {
      this.parseAst(this.content)
    }
  }

  parseAst (content: string): void {
    let self = this
    let ast = html.parse(content)
    html.walk(ast, {
      enter (node: html.INode) {
        if (node.type === 'Tag') {
          // console.log(node.body)
        } else if (node.type === 'Text') {
          node.value = node.value.replace(/\n/g, '').trim()
          if (node.value && HtmlParse.isCh(node.value)) {
            self.isChArray.push(node.value)
          }
        }
      }
    })
  }

  // 获取要处理的文本
  setContent (route: string): void {
    this.content = fs.readFileSync(route, 'utf-8')
    this.content = HtmlParse.getTemplate(this.content)
  }

  static getTemplate (content: string): string {
    let template = content.match(HtmlParse.regExpTemplate)
    if (template) {
      return template[0]
    }
    return ''
  }

  static isCh (content: string): boolean {
    let r = false
    let len = content.length
    for (let i = 0; i < len; i++) {
      if (content.charCodeAt(i) > 255) {
        r = true
        break
      }
    }
    return r
  }
}

export default HtmlParse

// let h = new HtmlParse('/Users/zhangp/Documents/work/lecai-vue-trunk/eLearningH5.01/src/components/view/account/systemupgrade.vue')

// console.log(h.isChArray)
