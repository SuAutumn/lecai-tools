#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var html = require("html5parser");
var HtmlParse = (function () {
    function HtmlParse(route) {
        this.template = this.content = '';
        this.filename = route;
        this.isChArray = [];
        this.setContent(route);
        if (this.content) {
            this.parseAst(this.content);
        }
    }
    HtmlParse.prototype.parseAst = function (content) {
        var self = this;
        var ast = html.parse(content);
        html.walk(ast, {
            enter: function (node) {
                if (node.type === 'Tag') {
                }
                else if (node.type === 'Text') {
                    node.value = node.value.replace(/\n/g, '').trim();
                    if (node.value && HtmlParse.isCh(node.value)) {
                        self.isChArray.push(node.value);
                    }
                }
            }
        });
    };
    HtmlParse.prototype.setContent = function (route) {
        this.content = fs.readFileSync(route, 'utf-8');
        this.content = HtmlParse.getTemplate(this.content);
    };
    HtmlParse.getTemplate = function (content) {
        var template = content.match(HtmlParse.regExpTemplate);
        if (template) {
            return template[0];
        }
        return '';
    };
    HtmlParse.isCh = function (content) {
        var r = false;
        var len = content.length;
        for (var i = 0; i < len; i++) {
            if (content.charCodeAt(i) > 255) {
                r = true;
                break;
            }
        }
        return r;
    };
    HtmlParse.regExpTemplate = new RegExp('<template>[\\S\\s]*</template>', 'g');
    return HtmlParse;
}());
exports.default = HtmlParse;
