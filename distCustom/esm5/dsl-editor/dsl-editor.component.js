import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import * as CodeMirror from 'codemirror-minified';
import * as _$ from 'jquery';
var $ = _$;
import 'codemirror-minified/addon/lint/lint';
import 'codemirror-minified/addon/hint/show-hint';
import 'codemirror-minified/addon/display/placeholder';
import 'codemirror-minified/addon/scroll/annotatescrollbar';
import 'codemirror-minified/addon/scroll/simplescrollbars';
var DslEditorComponent = /** @class */ (function () {
    function DslEditorComponent(element) {
        var _this = this;
        this.element = element;
        this._dsl = '';
        this._lint = false;
        this.lineNumbers = false;
        this.lineWrapping = false;
        this.debounce = 0;
        this.dslChange = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.editor = new EventEmitter();
        this._dslChangedHandler = function () {
            _this._dsl = _this.doc.getValue();
            _this.dslChange.emit(_this._dsl);
        };
    }
    Object.defineProperty(DslEditorComponent.prototype, "dsl", {
        set: function (dsl) {
            this._dsl = dsl;
            if (this.doc && this._dsl !== this.doc.getValue()) {
                var cursorPosition = this.doc.getCursor();
                this.doc.setValue(this._dsl || '');
                this.doc.setCursor(cursorPosition);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DslEditorComponent.prototype, "lintOptions", {
        set: function (lintOptions) {
            this._lint = lintOptions;
            if (this.doc) {
                this.doc.setOption('lint', this._lint);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DslEditorComponent.prototype, "hintOptions", {
        set: function (hintOptions) {
            this._hint = hintOptions;
            if (this.doc) {
                this.doc.setOption('hintOptions', this._hint);
            }
        },
        enumerable: true,
        configurable: true
    });
    DslEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        var options = {
            value: this._dsl || '',
            gutters: ['CodeMirror-lint-markers'],
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            lineNumbers: this.lineNumbers,
            lineWrapping: this.lineWrapping,
            electricChars: false,
            smartIndent: false,
        };
        if (this.scrollbarStyle) {
            options.scrollbarStyle = this.scrollbarStyle;
        }
        if (this._lint) {
            options.lint = this._lint;
        }
        if (this._hint) {
            options.hintOptions = this._hint;
        }
        this.doc = CodeMirror.fromTextArea($('#dsl-editor-host', this.element.nativeElement)[0], options);
        if (this.placeholder) {
            this.doc.setOption('placeholder', this.placeholder);
        }
        // Turns out "value" in the option doesn't set it.
        this.doc.setValue(this._dsl || '');
        this.doc.on('change', this.debounce ? _.debounce(this._dslChangedHandler, this.debounce) : this._dslChangedHandler);
        this.doc.on('focus', function () { return _this.focus.emit(); });
        this.doc.on('blur', function () { return _this.blur.emit(); });
        this.editor.emit(this.doc);
    };
    DslEditorComponent.prototype.ngOnDestroy = function () {
    };
    tslib_1.__decorate([
        Input('line-numbers'),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "lineNumbers", void 0);
    tslib_1.__decorate([
        Input('line-wrapping'),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "lineWrapping", void 0);
    tslib_1.__decorate([
        Input('scrollbar-style'),
        tslib_1.__metadata("design:type", String)
    ], DslEditorComponent.prototype, "scrollbarStyle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DslEditorComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "debounce", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "dslChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "focus", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "blur", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DslEditorComponent.prototype, "editor", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], DslEditorComponent.prototype, "dsl", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DslEditorComponent.prototype, "lintOptions", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DslEditorComponent.prototype, "hintOptions", null);
    DslEditorComponent = tslib_1.__decorate([
        Component({
            selector: 'dsl-editor',
            template: "\n    <textarea id=\"dsl-editor-host\"></textarea>\n  ",
            styles: ["\n    .CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:rgba(20,255,20,.5);-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:-20px;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-type,.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta{color:#555}.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-s-default .cm-error{color:red}.cm-invalidchar{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:0;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:0 0!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:0 0;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:0}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-focused div.CodeMirror-cursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:''}span.CodeMirror-selectedtext{background:0 0}.CodeMirror-hints{position:absolute;z-index:10;overflow:hidden;list-style:none;margin:0;padding:2px;-webkit-box-shadow:2px 3px 5px rgba(0,0,0,.2);-moz-box-shadow:2px 3px 5px rgba(0,0,0,.2);box-shadow:2px 3px 5px rgba(0,0,0,.2);border-radius:3px;border:1px solid silver;background:#fff;font-size:90%;font-family:monospace;max-height:20em;overflow-y:auto}.CodeMirror-hint{margin:0;padding:0 4px;border-radius:2px;white-space:pre;color:#000;cursor:pointer}li.CodeMirror-hint-active{background:#08f;color:#fff}.CodeMirror-lint-markers{width:16px}.CodeMirror-lint-tooltip{background-color:#ffd;border:1px solid #000;border-radius:4px 4px 4px 4px;color:#000;font-family:monospace;font-size:10pt;overflow:hidden;padding:2px 5px;position:fixed;white-space:pre;white-space:pre-wrap;z-index:100;max-width:600px;opacity:0;transition:opacity .4s;-moz-transition:opacity .4s;-webkit-transition:opacity .4s;-o-transition:opacity .4s;-ms-transition:opacity .4s}.CodeMirror-lint-mark-error,.CodeMirror-lint-mark-warning{background-position:left bottom;background-repeat:repeat-x}.CodeMirror-lint-mark-error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==)}.CodeMirror-lint-mark-warning{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=)}.CodeMirror-lint-marker-error,.CodeMirror-lint-marker-warning{background-position:center center;background-repeat:no-repeat;cursor:pointer;display:inline-block;height:16px;width:16px;vertical-align:middle;position:relative}.CodeMirror-lint-message-error,.CodeMirror-lint-message-warning{padding-left:18px;background-position:top left;background-repeat:no-repeat}.CodeMirror-lint-marker-error,.CodeMirror-lint-message-error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAHlBMVEW7AAC7AACxAAC7AAC7AAAAAAC4AAC5AAD///+7AAAUdclpAAAABnRSTlMXnORSiwCK0ZKSAAAATUlEQVR42mWPOQ7AQAgDuQLx/z8csYRmPRIFIwRGnosRrpamvkKi0FTIiMASR3hhKW+hAN6/tIWhu9PDWiTGNEkTtIOucA5Oyr9ckPgAWm0GPBog6v4AAAAASUVORK5CYII=)}.CodeMirror-lint-marker-warning,.CodeMirror-lint-message-warning{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEX/uwDvrwD/uwD/uwD/uwD/uwD/uwD/uwD/uwD6twD/uwAAAADurwD2tQD7uAD+ugAAAAD/uwDhmeTRAAAADHRSTlMJ8mN1EYcbmiixgACm7WbuAAAAVklEQVR42n3PUQqAIBBFUU1LLc3u/jdbOJoW1P08DA9Gba8+YWJ6gNJoNYIBzAA2chBth5kLmG9YUoG0NHAUwFXwO9LuBQL1giCQb8gC9Oro2vp5rncCIY8L8uEx5ZkAAAAASUVORK5CYII=)}.CodeMirror-lint-marker-multiple{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAACVBMVEUAAAAAAAC/v7914kyHAAAAAXRSTlMAQObYZgAAACNJREFUeNo1ioEJAAAIwmz/H90iFFSGJgFMe3gaLZ0od+9/AQZ0ADosbYraAAAAAElFTkSuQmCC);background-repeat:no-repeat;background-position:right bottom;width:100%;height:100%}/* Code Mirror related styles START */\n\n    .CodeMirror {\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -o-user-select: none;\n      user-select: none;\n      height: 100%;\n    }\n    .CodeMirror-hint {\n      max-width: 38em;\n    }\n    .CodeMirror-vertical-ruler-error {\n      background-color: rgba(188, 0, 0, 0.5);\n    }\n    .CodeMirror-vertical-ruler-warning {\n      background-color: rgba(255, 188, 0, 0.5);\n    }\n\n\n    /* Code Mirror related styles END */\n  "],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], DslEditorComponent);
    return DslEditorComponent;
}());
export { DslEditorComponent };
//# sourceMappingURL=dsl-editor.component.js.map