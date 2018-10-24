/*! 版权所有，翻版必究 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/swing/design/preview.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/swing/common/alerting.js":
/*!*************************************!*\
  !*** ./js/swing/common/alerting.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./js/swing/common/functions.js");


const alerting = {
    //----------------------------------------------------------Alerts
    simpleAlert: function (content, color = '#000000', background = '#ffffff', during = 500) {
        let alerting = $(`<div class="simple-alert"></div>`);
        alerting.text(content);
        alerting.css('color', color).css('position', 'fixed').css('left', $(window).width() / 2 - 25 + 'px').css('top', $(window).height() / 2 - 120 + 'px').css('display', 'none').css('width', '240px').css('height', '50px').css('line-height', '50px').css('background-color', background).css('font-size', '14px').css('text-align', 'center').css('z-index', '1999').css('-webkit-border-radius', '10px').css('-moz-border-radius', '10px').css('border-radius', '10px').css('-webkit-box-shadow', '0 0 5px 0 #999').css('-moz-box-shadow', '0 0 5px 0 #999').css('box-shadow', '0 0 5px 0 #999');

        $('#root').append(alerting);
        alerting.fadeIn(during).on('click', function () {
            alerting.fadeOut(during);
            setTimeout(function () {
                alerting.remove();
            }, during);
        });
    },
    alertAntoRemove: function (content, color = '#000000', background = '#ffffff', during = 500, postpone = 1500) {
        let alerting = $(`<div class="simple-alert"></div>`);
        alerting.text(content);
        alerting.css('color', color).css('position', 'fixed').css('left', $(window).width() / 2 - 25 + 'px').css('top', $(window).height() / 2 - 120 + 'px').css('display', 'none').css('width', '240px').css('height', '50px').css('line-height', '50px').css('background-color', background).css('font-size', '14px').css('text-align', 'center').css('z-index', '1999').css('-webkit-border-radius', '10px').css('-moz-border-radius', '10px').css('border-radius', '10px').css('-webkit-box-shadow', '0 0 5px 0 #999').css('-moz-box-shadow', '0 0 5px 0 #999').css('box-shadow', '0 0 5px 0 #999');

        $('#root').append(alerting);
        function fade() {
            alerting.fadeOut(during);
            setTimeout(function () {
                alerting.remove();
            }, during);
        }
        alerting.fadeIn(during).on('click', fade);
        setTimeout(fade, postpone);
    },
    InputAlert: function (title = '', field = '', confirm = '', cancel = '', color = '#000000', background = '#ffffff', during = 500) {
        let alerting = $(`<div class="input-alert"></div>`),
            title_node = $(`<div></div>`),
            input_node = $(`<div><input type="text" v-model="` + field + `"></div>`),
            buttons_node = $(`<div>
            <button class="conceal btn btn-sm btn-success" @click="` + confirm + `">确认</button>
            <button class="conceal btn btn-sm btn-danger" @click="` + cancel + `">取消</button>
        </div>`);
        title_node.text(title);
        alerting.css('color', color).css('position', 'fixed').css('left', $(window).width() / 2 - 50 + 'px').css('top', $(window).height() / 2 - 120 + 'px').css('display', 'none').css('width', '240px').css('height', '100px').css('line-height', '32px').css('background-color', background).css('font-size', '14px').css('text-align', 'center').css('z-index', '1999').css('-webkit-border-radius', '10px').css('-moz-border-radius', '10px').css('border-radius', '10px').css('-webkit-box-shadow', '0 0 5px 0 #999').css('-moz-box-shadow', '0 0 5px 0 #999').css('box-shadow', '0 0 5px 0 #999');

        input_node.find('input').css('line-height', '24px');
        buttons_node.find('button').css('margin', '0');

        alerting.append(title_node).append(input_node).append(buttons_node);
        $('#root').append(alerting);

        this.inputAlter = function () {
            $('.input-alert').fadeIn(during).on('click', '.conceal', function () {
                $('.input-alert').fadeOut(during);
                //setTimeout(function(){
                //    $('.input-alert').remove()
                //},during)
            });
        };
    },
    MultiInputAlert: function (obj) {

        const title = obj.title,
              couples = obj.list || [],
              confirm = obj.confirm || '',
              color = obj.color || '#000000',
              background = obj.background || '#ffffff',
              during = obj.during || 500,
              height = 60 + couples.length * 32;

        let alerting = $(`<div class="multi-input-alert"></div>`),
            title_node = $(`<div>` + title + `</div>`),
            inputs_node = $(`<div></div>`),
            buttons_node = $(`<div>
            <button class="conceal btn btn-sm btn-success" @click="` + confirm + `">确认</button>
            <button class="conceal btn btn-sm btn-info">取消</button>
        </div>`);

        alerting.css('color', color).css('position', 'fixed').css('left', $(window).width() / 2 - 120 + 'px').css('top', $(window).height() / 2 - height + 'px').css('display', 'none').css('width', '240px').css('height', height + 'px').css('line-height', '24px').css('background-color', background).css('font-size', '14px').css('text-align', 'center').css('z-index', '1999').css('-webkit-border-radius', '10px').css('-moz-border-radius', '10px').css('border-radius', '10px').css('-webkit-box-shadow', '0 0 5px 0 #999').css('-moz-box-shadow', '0 0 5px 0 #999').css('box-shadow', '0 0 5px 0 #999');

        buttons_node.find('button').css('margin', '0');

        for (let i = 0; i < couples.length; i++) {
            inputs_node.append(`<div>
            <label for="` + couples[i].field + `_in_alerting">` + couples[i].label + `</label>
            <input type="text" v-model="` + couples[i].field + `" id="` + couples[i].field + `_in_alerting">
        </div>`);
        }

        alerting.append(title_node).append(inputs_node).append(buttons_node);
        $('#root').append(alerting);

        this.alert = function () {
            $('.multi-input-alert').fadeIn(during).on('click', '.conceal', function () {
                $('.multi-input-alert').fadeOut(during);
            });
        };
    },
    BranchAlert: function (obj) {

        //title,left,right,color='#000000',background='#ffffff',during=500

        const title = obj.title,
              left = obj.left || '',
              right = obj.right || '',
              left_text = obj.left_text || '',
              right_text = obj.right_text || '',
              color = obj.color || '#000000',
              background = obj.background || '#ffffff',
              during = obj.during || 500;

        let alerting = $(`<div class="branch-alert"></div>`),
            title_node = $(`<div></div>`),
            buttons_node = $(`<div>
            <button class="conceal btn btn-sm btn-success" @click="` + left + `">` + left_text + `</button>
            <button class="conceal btn btn-sm btn-info" @click="` + right + `">` + right_text + `</button>
        </div>`);
        title_node.text(title);
        alerting.css('color', color).css('position', 'fixed').css('left', $(window).width() / 2 - 50 + 'px').css('top', $(window).height() / 2 - 120 + 'px').css('display', 'none').css('width', '240px').css('height', '100px').css('line-height', '32px').css('background-color', background).css('font-size', '14px').css('text-align', 'center').css('z-index', '1999').css('-webkit-border-radius', '10px').css('-moz-border-radius', '10px').css('border-radius', '10px').css('-webkit-box-shadow', '0 0 5px 0 #999').css('-moz-box-shadow', '0 0 5px 0 #999').css('box-shadow', '0 0 5px 0 #999');

        buttons_node.find('button').css('margin', '0');

        alerting.append(title_node).append(buttons_node);
        $('#root').append(alerting);

        this.branchAlter = function () {
            $('.branch-alert').fadeIn(during).on('click', '.conceal', function () {
                $('.branch-alert').fadeOut(during);
            });
        };
    },
    TableAlert: function (obj) {
        const title = obj.title,
              fields = obj.fields,
              data = obj.data,
              color = obj.color || '#000000',
              background = obj.background || '#ffffff',
              during = obj.during || 500;

        let alerting = $(`<div class="table-alert"></div>`),
            title_node = $(`<div></div>`),
            table_node = $(`<div>
            <table>
                <thead>
                <tr><th style="width: initial;word-break: keep-all" v-for="f in ` + fields + `">{{ f.value }}</th></tr>
                </thead>
                <tbody>
                <tr v-for="d in ` + data + `"><td style="width: initial;word-break: keep-all" v-for="f in ` + fields + `">{{ d[f.key] }}</td></tr>
                </tbody>
            </table>
        </div>`);
        title_node.text(title);
        alerting.css('color', color).css('position', 'fixed').css('display', 'none')
        //.css('width', '240px')
        //.css('height', '100px')
        .css('line-height', '24px').css('background-color', background).css('font-size', '14px').css('text-align', 'center').css('z-index', '1999').css('-webkit-border-radius', '10px').css('-moz-border-radius', '10px').css('border-radius', '10px').css('-webkit-box-shadow', '0 0 5px 0 #999').css('-moz-box-shadow', '0 0 5px 0 #999').css('box-shadow', '0 0 5px 0 #999');

        alerting.append(title_node).append(table_node);
        $('#root').append(alerting);

        alerting.css('left', $(window).width() / 2 - 50 + 'px').css('top', $(window).height() / 2 - 120 + 'px');

        this.tableAlert = function () {
            let alert = $('.table-alert');
            alert.fadeIn(during);

            setTimeout(function () {
                let w = alert[0].offsetWidth,
                    h = alert[0].offsetHeight;
                alert.css('left', ($(window).width() - w) / 2 + 'px').css('top', ($(window).height() - h) / 2 + 'px').on('click', function () {
                    $('.table-alert').fadeOut(during);
                });
            }, 0);
        };
    }
};

/* harmony default export */ __webpack_exports__["default"] = (alerting);

/***/ }),

/***/ "./js/swing/common/functions.js":
/*!**************************************!*\
  !*** ./js/swing/common/functions.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alerting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alerting.js */ "./js/swing/common/alerting.js");
/* harmony import */ var _initial_survey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initial-survey */ "./js/swing/common/initial-survey.js");



var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const functions = {
    realPath: realPath,
    changeSurveyName: function (survey_id, survey_name) {
        //--------------------------------------------更改问卷名称
        let result;

        $.ajax({
            url: functions.realPath + '/survey/insert',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                survey_id: survey_id,
                survey_name: survey_name
            }),
            async: true,
            success: function (d) {
                console.log(d);
                if (d[0].wj_id) {
                    data.survey_id = d[0].wj_id;
                    result = true;
                    _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存成功', '#00dbff');
                }
                if (d[0].sub_id) {
                    data.questions[data.questions.mapping[id]].sub_id = d[0].sub_id;
                    result = true;
                    _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存成功', '#00dbff');
                }
                if (!d[0]) {
                    result = false;
                    _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存失败', '#f56c6c');
                }
            },
            error: function (error) {
                console.log(error);
                result = false;
                _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存失败', '#f56c6c');
            }
        });
        return result;
    },
    togglePublish: function (status) {
        //--------------------------------------------切换问卷状态
        let result;
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                status: status
            }),
            async: false,
            success: function (data) {
                if (data[0].result > 0) {
                    result = !status;
                } else {
                    result = status;
                }
            },
            error: function (error) {
                console.log(error);
                result = status;
            }
        });
        return result;
    },
    save: function ($this, type, key, id) {

        let data = $this.$data,
            to_send = {
            usr_email: data.usr_email,
            survey_id: data.survey_id,
            survey_number: data.survey_number,
            survey_name: data.survey_name,
            survey_remark: data.survey_remark,
            questions: {},
            saved_logic: data.saved_logic,
            style: data.style
        },
            questions = {};

        $.extend(true, questions, data.questions);

        to_send.questions = questions;

        for (let i = 0; i < to_send.questions.length; i++) {
            let question = to_send.questions[i];
            question.editing && delete question.editing;
            question.recommend_stretched && delete question.recommend_stretched;
            question.site_questions && delete question.site_questions;
            question.config.func_display && delete question.config.func_display;
            question.config.neck && delete question.config.neck;
            question.config.neck_initial && delete question.config.neck_initial;
            if (question.sub_questions) {
                for (let j = 0; j < question.sub_questions.length; j++) {
                    delete question.sub_questions[j].scroll_initial;
                    delete question.sub_questions[j].scroll_open;
                }
            }
            if (question.options) {
                for (let j = 0; j < question.options.length; j++) {
                    delete question.options[j].option_addition;
                    delete question.options[j].scroll_initial;
                    delete question.options[j].scroll_open;
                }
            }
        }

        let to_send_final = {};
        if (key === 'question') {
            to_send_final[key] = {};
            to_send_final[key][id] = to_send.questions[to_send.questions.mapping[id]];
        } else {
            to_send_final[key] = to_send[key];
        }
        to_send_final.survey_id = to_send.survey_id;
        to_send_final.usr_email = to_send.usr_email;

        try {
            $.ajax({
                url: functions.realPath + '/survey/insert',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(to_send_final),
                async: true,
                success: function (d) {
                    console.log(d);
                    if (d[0].wj_id) {
                        data.survey_id = d[0].wj_id;
                        _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存成功', '#00dbff');
                    }
                    if (d[0].sub_id) {
                        data.questions[data.questions.mapping[id]].sub_id = d[0].sub_id;
                        _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存成功', '#00dbff');
                    }
                    if (!d[0]) {
                        _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存失败', '#f56c6c');
                    }
                },
                error: function (error) {
                    console.log(error);
                    _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('保存失败', '#f56c6c');
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    switchEdit: function ($this, workspace) {

        if (workspace.animating) {
            return;
        }

        $this.editing = !$this.editing;
        if ($this.editing) {
            let target = $(event.currentTarget),
                id,
                item;
            if (target.hasClass('item')) {
                id = target.attr('id').match(/item\-(\d)/)[1];
            } else {
                id = target.parents('.item').attr('id').match(/item\-(\d)/)[1];
            }

            item = workspace.questions[workspace.questions.mapping[id]];
            workspace.status.editing.proto = item;
        } else {
            if ($this.options) {
                let last_option_index = $this.options.length - 1;
                if ($this.options[last_option_index].option_content.length <= 0) {
                    $this.options.splice(last_option_index, 1);
                }
            }
            if ($this.sub_questions) {
                let last_sub_question_index = $this.sub_questions.length - 1;
                if ($this.sub_questions[last_sub_question_index].question_content.length <= 0) {
                    $this.sub_questions.splice(last_sub_question_index, 1);
                }
            }
        }
    },
    changeContent: function (target, $this, key) {
        $this[key] = $(target).html();
    },
    changeOptionContent: function ($this, target, option) {
        option.option_content = $(target).html();
    },
    changeSubQuestionContent: function ($this, target, question) {
        question.question_content = $(target).html();
    },
    closeEditor: function (event, curtain, employer) {
        event.stopPropagation();
        event.preventDefault();
        curtain.fadeOut(300);
        setTimeout(function () {
            curtain.remove();
            curtain = null;
            if (employer) {
                for (let i = 0; i < employer.length; i++) {
                    employer[i] = null;
                }
            }
        }, 300);
    },
    preventClose: function (event) {
        event.stopPropagation();
        // event.preventDefault();
    },
    activeEdit: function (event, workspace) {
        // let target = $(event.currentTarget),
        //     id,item;
        // if (target.hasClass('item')){
        //     id = target.attr('id').match(/item\-(\d)/)[1]
        // } else {
        //     id = target.parents('.item').attr('id').match(/item\-(\d)/)[1]
        // }
        //
        // item = workspace.questions[workspace.questions.mapping[id]];
        // workspace.status.editing.proto = item;
        // item.editing = true
        // workspace.status.editing.id = id;
    },
    rtfEdit: function (event, $this) {
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">高级编辑器</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="board"></div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header).append(remove_icon).append(board).append(footer);
        footer.append(confirm).append(cancel);
        curtain.css('display', 'none');
        curtain.fadeIn(300);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);
        setTimeout(function () {
            let rtf_editor = new self.E('#board'),
                target = $(event.target).parents('.rtf-container').find('.rtf-target');
            // rtf_editor.customConfig.onchange = function(html){
            //     target.val(html)
            // };
            // self.closeEditor(event, curtain, [rtf_editor]){
            //     event.stopPropagation();
            //     event.preventDefault();
            //     curtain.fadeOut(300);
            //     setTimeout(function(){
            //         curtain.remove();
            //         curtain = null;
            //         rtf_editor = null;
            //     },300);
            // }

            remove_icon.on('click', function (event) {
                self.closeEditor(event, curtain, [rtf_editor]);
            });
            cancel.on('click', function (event) {
                self.closeEditor(event, curtain, [rtf_editor]);
            });
            confirm.on('click', function (event) {
                target.html(rtf_editor.txt.html());
                setTimeout(function () {
                    target.change();
                }, 0);
                self.closeEditor(event, curtain, [rtf_editor]);
            });
            container.on('click', self.preventClose);
            curtain.on('click', function (event) {
                self.closeEditor(event, curtain, [rtf_editor]);
            });

            rtf_editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
            // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
            rtf_editor.create();
            rtf_editor.txt.html(target.html());
        }, 0);
    },
    editLogic: function (event, $this, entry) {
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">逻辑编辑器</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="logics">
                    <div class="logic-switch">
                        <span class="label" :class="{ 'active': editing === 'display' }" @click="switchLabel('display')">显示逻辑</span>
                        <span class="label" :class="{ 'active': editing === 'jump' }" @click="switchLabel('jump')">跳转逻辑</span>
                    </div>
                    <div class="logic-brick display" v-if="editing === 'display'">
                        <div class="logic-item" v-for="item in logic.display_logic">
                            <i class="part delete" @click="deleteLogic(logic.display_logic,item)"><b class="glyphicon glyphicon-minus-sign"></b></i>
                            <div class="condition" v-for="condition in item.conditions">
                                <i class="part">
                                <select v-model="condition.id">
                                    <option value="">请选择</option>
                                    <option v-for="question in question_id_array" v-if="question.type==='choice' || question.type==='check' || question.type==='matrix' || question.type==='score' || question.type==='sort' || question.type==='pictures'" :value="question.id">第{{ question.number }}题</option>
                                </select>
                                </i>
                                <b class="part" v-if="condition.type === 'matrix'">中</b>
                                <i class="part" v-if="condition.type === 'matrix'">
                                    <select v-model="condition.sub_question">
                                        <option value="">请选择</option>
                                        <option v-for="question in condition.sub_questions_now" :value="question.question_id">{{ question.question_content }}</option>
                                    </select>
                                </i>
                                <b class="part">的</b>
                                <i class="part">
                                    <select v-model="condition.option">
                                        <option value="">请选择</option>
                                        <option v-for="option in condition.options_now" :value="option.option_id">{{ option.option_content }}</option>
                                    </select>
                                </i>
                                <i class="part">
                                    <select v-model="condition.judgement">
                                        <option value="">请选择</option>
                                        <option value="checked">被选中</option>
                                        <option value="unchecked">未被选中</option>
                                    </select>
                                </i>
                            </div>
                            <p class="result">
                                <b class="part">时，则显示</b>
                                <i class="part">
                                    <select v-model="item.target">
                                        <option value="">请选择</option>
                                        <option v-for="question in question_id_array" :value="question.id">{{ question.number }}</option>
                                    </select>
                                </i>
                            </p>
                            <i class="part push" @click="pushCondition(item)"><b class="glyphicon glyphicon-plus"></b></i>
                        </div>
                        <p class="logic-append logic-item" @click="appendLogic('display')"><i class="glyphicon glyphicon-plus-sign"></i></p>
                    </div>
                    <div class="logic-brick jump" v-else>
                        <div class="logic-item" v-for="item in logic.jump_logic">
                            <i class="part delete" @click="deleteLogic(logic.display_logic,item)"><b class="glyphicon glyphicon-minus-sign"></b></i>
                            <div class="condition" v-for="condition in item.conditions">
                                <i class="part">
                                    <select v-model="condition.id">
                                        <option value="">请选择</option>
                                        <option v-for="question in question_id_array" v-if="question.type==='choice' || question.type==='check' || question.type==='matrix' || question.type==='score' || question.type==='sort' || question.type==='pictures'" :value="question.id">第{{ question.number }}题</option>
                                    </select>
                                </i>
                                <b class="part" v-if="condition.type === 'matrix'">中</b>
                                <i class="part" v-if="condition.type === 'matrix'">
                                    <select v-model="condition.sub_question">
                                        <option value="">请选择</option>
                                        <option v-for="question in condition.sub_questions_now" :value="question.question_id">{{ question.question_content }}</option>
                                    </select>
                                </i>
                                <b class="part">的</b>
                                <i class="part">
                                    <select v-model="condition.option">
                                        <option value="">请选择</option>
                                        <option v-for="option in condition.options_now" :value="option.option_id">{{ option.option_content }}</option>
                                    </select>
                                </i>
                                <i class="part">
                                    <select v-model="condition.judgement">
                                        <option value="">请选择</option>
                                        <option value="checked">被选中</option>
                                        <option value="unchecked">未被选中</option>
                                    </select>
                                </i>
                            </div>
                            <p class="result">
                                <b class="part">时，则显示</b>
                                <i class="part">
                                    <select v-model="item.target">
                                        <option value="">请选择</option>
                                        <option v-for="question in question_id_array" :value="question.id">{{ question.number }}</option>
                                    </select>
                                </i>
                            </p>
                            <i class="part push" @click="pushCondition(item)"><b class="glyphicon glyphicon-plus"></b></i>
                        </div>
                        <p class="logic-append logic-item" @click="appendLogic('jump')"><i class="glyphicon glyphicon-plus-sign"></i></p>
                    </div>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header).append(remove_icon).append(board).append(footer);
        footer.append(confirm).append(cancel);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let logic_vue = new Vue({
            el: '#logics',
            data: {
                question_array: [],
                proto: {},
                question_id_array: [],
                // sub_questions_now: [],
                id: 0,
                index: 0,
                number: '',
                logic: self.logic,
                editing: 'display'
            },
            methods: {
                switchLabel: function (label) {
                    this.editing = label;
                },
                appendLogic: function (label) {
                    this.logic[label + '_logic'].push({
                        conditions: [{
                            id: '',
                            type: '',
                            sub_questions_now: { 0: {} },
                            options_now: [{}],
                            sub_question: '',
                            option: '',
                            judgement: ''
                        }],
                        target: ''
                    });
                },
                deleteLogic: function (item_array, item) {
                    item_array.splice(item_array.indexOf(item), 1);
                },
                pushCondition: function (item) {
                    item.conditions.push({
                        id: '',
                        type: '',
                        sub_questions_now: { 0: {} },
                        options_now: [{}],
                        sub_question: {},
                        option: {},
                        judgement: ''
                    });
                }
            },
            mounted: function () {
                self.logic = JSON.parse(JSON.stringify(self.saved_logic));
                this.question_array = self.questions;
                for (let i = 0; i < this.question_array.length; i++) {
                    if (this.question_array[i].index = i + 1) {
                        this.question_id_array.push(this.question_array[i]);
                    }
                }
                // if (entry === 'setting_bar'){
                //     this.proto = self.status.editing.proto;
                //     this.id = self.status.editing.id;
                //     this.index = self.status.editing.proto.index;
                //     this.number = self.status.editing.proto.number;
                //     this.type = self.status.editing.type;
                //     if (this.proto.sub_questions){
                //         this.sub_questions_now = this.proto.sub_questions
                //     }
                //     if (this.proto.options){
                //         this.options_now = this.proto.options_now
                //     }
                //
                // }
            },
            watch: {
                'logic': {
                    handler: function (value, old) {
                        for (let i = 0; i < value.display_logic.length; i++) {
                            for (let j = 0; j < value.display_logic[i].conditions.length; j++) {
                                let proto = this.question_array[this.question_array.mapping[value.display_logic[i].conditions[j].id]];
                                if (proto) {
                                    if (proto.type) {
                                        value.display_logic[i].conditions[j].type = proto.type;
                                    }
                                    if (proto.sub_questions) {
                                        value.display_logic[i].conditions[j].sub_questions_now = proto.sub_questions;
                                    }
                                    if (proto.options) {
                                        value.display_logic[i].conditions[j].options_now = proto.options;
                                    }
                                }
                            }
                        }

                        for (let i = 0; i < value.jump_logic.length; i++) {
                            for (let j = 0; j < value.jump_logic[i].conditions.length; j++) {
                                let proto = this.question_array[this.question_array.mapping[value.jump_logic[i].conditions[j].id]];
                                if (proto) {
                                    if (proto.type) {
                                        value.jump_logic[i].conditions[j].type = proto.type;
                                    }
                                    if (proto.sub_questions) {
                                        value.jump_logic[i].conditions[j].sub_questions_now = proto.sub_questions;
                                    }
                                    if (proto.options) {
                                        value.jump_logic[i].conditions[j].options_now = proto.options;
                                    }
                                }
                            }
                        }
                    },
                    deep: true
                }
            }
        });

        curtain.css('display', 'none');
        curtain.fadeIn(300);

        remove_icon.on('click', function (event) {
            self.closeEditor(event, curtain, [logic_vue]);
        });
        cancel.on('click', function (event) {
            self.closeEditor(event, curtain, [logic_vue]);
        });
        confirm.on('click', function (event) {
            self.saved_logic = JSON.parse(JSON.stringify(self.logic));
            self.closeEditor(event, curtain, [logic_vue]);
        });
        container.on('click', self.preventClose);
        curtain.on('click', function (event) {
            self.closeEditor(event, curtain, [logic_vue]);
        });
    },
    NewArray: function () {
        function Pt() {
            this.findItemById = function (id) {
                return this[this.mapping[id]];
            };
            this.push = function (arg) {
                arg.id = this.length;
                Array.prototype.push.call(this, arg);
                this.mapping[arg.id] = this.length - 1;
                return arg;
            };
        }
        Pt.prototype = [];
        function CreateArray() {
            this.mapping = {};
        }
        CreateArray.prototype = new Pt();
        return new CreateArray();
    },
    switchNeck: function ($this) {
        $this.config.neck = !$this.config.neck;
        if ($this.config.neck_initial) {
            $this.config.neck_initial = false;
        }
    },
    activeShift: function (event, $this, workspace) {
        let base = $('#root'),
            wrap = $('#items'),
            queue = $('#items').find('.item'),
            insert_before = null,
            insert_after = null,
            target = $(event.currentTarget),
            target_data = $this.$data,
            target_index = workspace.questions.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        console.log('moving initialed as false');

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event) {

            workspace.animating = true;

            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function () {
                for (let i = 0; i <= queue.length; i++) {
                    if (queue[i]) {
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                            continue;
                        }
                    }
                    if (queue[i - 1]) {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i - 1]).addClass('before-insert');
                        insert_before = $(queue[i - 1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null;
                    }
                    // insert_before = null
                    break;
                }
            }, 0);
            if (!moving) {
                moving = true;
                console.log('changed moving');
            }
            // base.on('mouseup', endShift)
        }

        function endShift(event) {

            workspace.animating = false;

            console.log(moving);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function () {
                if (insert_before) {
                    let index_before = workspace.questions[workspace.questions.mapping[insert_before.attr('id').match(/item-(\d*)/)[1]]].index;
                    if (index_target > index_before + 1) {
                        for (let i = 0; i < workspace.questions.length; i++) {
                            if (workspace.questions[i].index > index_before && workspace.questions[i].index < index_target) {
                                workspace.questions[i].index += 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    } else if (index_target < index_before) {
                        for (let i = 0; i < workspace.questions.length; i++) {
                            if (workspace.questions[i].index <= index_before && workspace.questions[i].index > index_target) {
                                workspace.questions[i].index -= 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert');
                } else if (insert_after) {
                    if (queue.length) {
                        let index_after = workspace.questions[workspace.questions.mapping[insert_after.attr('id').match(/item-(\d*)/)[1]]].index;
                        if (index_target > index_after) {
                            for (let i = 0; i < workspace.questions.length; i++) {
                                if (workspace.questions[i].index >= index_after && workspace.questions[i].index < index_target) {
                                    workspace.questions[i].index += 1;
                                }
                            }
                            target_data.index = index_after - 1;
                        } else if (index_target < index_after) {
                            for (let i = 0; i < workspace.questions.length; i++) {
                                if (workspace.questions[i].index < index_after && workspace.questions[i].index > index_target) {
                                    workspace.questions[i].index -= 1;
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]));
                    }
                }
                let new_sort = [];
                for (let i = 0; i < workspace.questions.length; i++) {
                    new_sort.push({
                        sub_id: workspace.questions[i].sub_id,
                        index: workspace.questions[i].index
                    });
                }
                $.ajax({
                    url: functions.realPath + '/survey/swap_positions',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify({
                        new_sort: new_sort
                    }),
                    async: true,
                    success: function (d) {
                        console.log(d);
                        _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('操作成功', '#00dbff');
                    },
                    error: function (e) {
                        console.log(e);
                        _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('网络错误', '#f56c6c');
                    }
                });
            }, 0);
            target.css('top', 'auto');
        }

        base.on('mousemove', shiftItem).on('mouseup', function (event) {
            event.preventDefault();
            base.off('mousemove', shiftItem).off('mouseup');
            if (moving) {
                endShift();
            }
        });
    },
    activeShiftOutline: function (event, $this, workspace) {
        let base = $('#root'),
            wrap = $('#question_array'),
            queue = $('#question_array').find('.question'),
            insert_before = null,
            insert_after = null,
            target = $(event.currentTarget),
            target_data = $this,
            target_index = workspace.questions.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        console.log('moving initialed as false');

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event) {

            workspace.animating = true;

            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function () {
                for (let i = 0; i <= queue.length; i++) {
                    if (queue[i]) {
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                            continue;
                        }
                    }
                    if (queue[i - 1]) {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i - 1]).addClass('before-insert');
                        insert_before = $(queue[i - 1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null;
                    }
                    // insert_before = null
                    break;
                }
            }, 0);
            if (!moving) {
                moving = true;
                console.log('changed moving');
            }
            // base.on('mouseup', endShift)
        }

        function endShift(event) {

            workspace.animating = false;

            console.log(moving);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function () {
                if (insert_before) {
                    let index_before = workspace.questions[workspace.questions.mapping[insert_before.attr('ol_id').match(/item-(\d*)/)[1]]].index;
                    if (index_target > index_before + 1) {
                        for (let i = 0; i < workspace.questions.length; i++) {
                            if (workspace.questions[i].index > index_before && workspace.questions[i].index < index_target) {
                                workspace.questions[i].index += 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    } else if (index_target < index_before) {
                        for (let i = 0; i < workspace.questions.length; i++) {
                            if (workspace.questions[i].index <= index_before && workspace.questions[i].index > index_target) {
                                workspace.questions[i].index -= 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert');
                } else if (insert_after) {
                    if (queue.length) {
                        let index_after = workspace.questions[workspace.questions.mapping[insert_after.attr('ol_id').match(/item-(\d*)/)[1]]].index;
                        if (index_target > index_after) {
                            for (let i = 0; i < workspace.questions.length; i++) {
                                if (workspace.questions[i].index >= index_after && workspace.questions[i].index < index_target) {
                                    workspace.questions[i].index += 1;
                                }
                            }
                            target_data.index = index_after - 1;
                        } else if (index_target < index_after) {
                            for (let i = 0; i < workspace.questions.length; i++) {
                                if (workspace.questions[i].index < index_after && workspace.questions[i].index > index_target) {
                                    workspace.questions[i].index -= 1;
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]));
                    }
                }
            }, 0);
            target.css('top', 'auto');
        }

        base.on('mousemove', shiftItem).on('mouseup', function (event) {
            event.preventDefault();
            base.off('mousemove', shiftItem).off('mouseup');
            if (moving) {
                endShift();
            }
        });
    },
    activeOptionShift: function (option, event, options) {
        event.preventDefault();
        event.stopPropagation();

        let base = $('#root'),
            wrap = $(event.target).parents('.item-options'),
            queue = wrap.find('.option'),
            insert_before = null,
            insert_after = null,
            target = $(event.target).parents('.option'),
            target_data = option,
            target_index = options.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event) {

            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function () {
                for (let i = 0; i <= queue.length; i++) {
                    if (queue[i]) {
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                            continue;
                        }
                    }
                    if (queue[i - 1]) {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i - 1]).addClass('before-insert');
                        insert_before = $(queue[i - 1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null;
                    }
                    break;
                }
            }, 0);
            // base.one('mouseup', endShift)
            if (!moving) {
                moving = true;
            }
        }

        function endShift(event) {
            console.log(1);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function () {
                if (insert_before) {
                    let index_before = insert_before.attr('index');
                    if (index_target > index_before + 1) {
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].index > index_before && options[i].index < index_target) {
                                options[i].index += 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    } else if (index_target < index_before) {
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].index <= index_before && options[i].index > index_target) {
                                options[i].index -= 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert');
                } else if (insert_after) {
                    if (queue.length) {
                        let index_after = insert_after.attr('index');
                        if (index_target > index_after) {
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].index >= index_after && options[i].index < index_target) {
                                    options[i].index += 1;
                                }
                            }
                            target_data.index = index_after - 1;
                        } else if (index_target < index_after) {
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].index < index_after && options[i].index > index_target) {
                                    options[i].index -= 1;
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]));
                    }
                }
            }, 0);
            target.css('top', 'auto');
        }

        base.on('mousemove', shiftItem).on('mouseup', function (event) {
            base.off('mousemove', shiftItem).off('mouseup', endShift);
            if (moving) {
                endShift();
                event.preventDefault();
            }
        });
    },
    activeSortingShift: function (option, event, sorting, workspace) {
        event.preventDefault();
        event.stopPropagation();

        let base = $('#root'),
            wrap = $(event.target).parents('.drag'),
            queue = wrap.find('.option'),
            insert_before = null,
            insert_after = null,
            target = $(event.target),
            target_data = option,
            target_index = sorting.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event) {

            workspace.animating = true;

            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function () {
                for (let i = 0; i <= queue.length; i++) {
                    if (queue[i]) {
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                            continue;
                        }
                    }
                    if (queue[i - 1]) {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i - 1]).addClass('before-insert');
                        insert_before = $(queue[i - 1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null;
                    }
                    break;
                }
            }, 0);
            // base.one('mouseup', endShift)
            if (!moving) {
                moving = true;
            }
        }

        function endShift(event) {

            workspace.animating = false;

            console.log(1);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function () {
                if (insert_before) {
                    let index_before = insert_before.attr('index');
                    if (index_target > index_before + 1) {
                        for (let i = 0; i < sorting.length; i++) {
                            if (sorting[i].index > index_before && sorting[i].index < index_target) {
                                sorting[i].index += 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    } else if (index_target < index_before) {
                        for (let i = 0; i < sorting.length; i++) {
                            if (sorting[i].index <= index_before && sorting[i].index > index_target) {
                                sorting[i].index -= 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert');
                } else if (insert_after) {
                    if (queue.length) {
                        let index_after = insert_after.attr('index');
                        if (index_target > index_after) {
                            for (let i = 0; i < sorting.length; i++) {
                                if (sorting[i].index >= index_after && sorting[i].index < index_target) {
                                    sorting[i].index += 1;
                                }
                            }
                            target_data.index = index_after - 1;
                        } else if (index_target < index_after) {
                            for (let i = 0; i < sorting.length; i++) {
                                if (sorting[i].index < index_after && sorting[i].index > index_target) {
                                    sorting[i].index -= 1;
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]));
                    }
                }
            }, 0);
            target.css('top', 'auto');
            for (let i = 0; i < this.sorting.length; i++) {
                this.sorting[i].order = i;
            }
        }

        base.on('mousemove', shiftItem).on('mouseup', function (event) {
            base.off('mousemove', shiftItem).off('mouseup', endShift);
            if (moving) {
                endShift();
                event.preventDefault();
            }
        });
    },
    activeSubQuestionShift: function (question, event, sub_questions) {
        event.preventDefault();
        event.stopPropagation();

        let base = $('#root'),
            wrap = $(event.target).parents('.item-branches'),
            queue = wrap.find('.sub-question'),
            insert_before = null,
            insert_after = null,
            target = $(event.target).parents('.sub-question'),
            target_data = question,
            target_index = sub_questions.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event) {
            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function () {
                for (let i = 0; i <= queue.length; i++) {
                    if (queue[i]) {
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                            continue;
                        }
                    }
                    if (queue[i - 1]) {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i - 1]).addClass('before-insert');
                        insert_before = $(queue[i - 1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null;
                    }
                    break;
                }
            }, 0);
            // base.one('mouseup', endShift)
            if (!moving) {
                moving = true;
            }
        }

        function endShift(event) {
            console.log(1);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function () {
                if (insert_before) {
                    let index_before = insert_before.attr('index');
                    if (index_target > index_before + 1) {
                        for (let i = 0; i < sub_questions.length; i++) {
                            if (sub_questions[i].index > index_before && sub_questions[i].index < index_target) {
                                sub_questions[i].index += 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    } else if (index_target < index_before) {
                        for (let i = 0; i < sub_questions.length; i++) {
                            if (sub_questions[i].index <= index_before && sub_questions[i].index > index_target) {
                                sub_questions[i].index -= 1;
                            }
                        }
                        target_data.index = index_before + 1;
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert');
                } else if (insert_after) {
                    if (queue.length) {
                        let index_after = insert_after.attr('index');
                        if (index_target > index_after) {
                            for (let i = 0; i < sub_questions.length; i++) {
                                if (sub_questions[i].index >= index_after && sub_questions[i].index < index_target) {
                                    sub_questions[i].index += 1;
                                }
                            }
                            target_data.index = index_after - 1;
                        } else if (index_target < index_after) {
                            for (let i = 0; i < sub_questions.length; i++) {
                                if (sub_questions[i].index < index_after && sub_questions[i].index > index_target) {
                                    sub_questions[i].index -= 1;
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]));
                    }
                }
            }, 0);
            target.css('top', 'auto');
        }

        base.on('mousemove', shiftItem).on('mouseup', function (event) {
            base.off('mousemove', shiftItem).off('mouseup', endShift);
            if (moving) {
                endShift();
                event.preventDefault();
            }
        });
    },
    triggerSubQuestionOperate: function (question) {
        if (question.scroll_initial) {
            question.scroll_initial = false;
        }
        question.scroll_open = !question.scroll_open;
    },
    triggerOptionOperate: function (option) {
        if (option.scroll_initial) {
            option.scroll_initial = false;
        }
        option.scroll_open = !option.scroll_open;
    },
    deleteMatrixSubQuestion: function (sub_questions, question) {
        sub_questions.splice(sub_questions.indexOf(question), 1);
    },
    deleteMatrixOption: function (options, option) {
        options.splice(options.indexOf(option), 1);
    },
    changeSubQuestionClass: function (question) {
        if (question.class === 'blank') {
            question.blank = false;
        }
    },
    changeSubQuestionBlank: function (event, question) {
        question.blank = $(event.target).prop('checked');
    },
    autoAppendOption: function (event, $this, option) {
        if ($this.options.indexOf(option) === $this.options.length - 1) {
            functions.pushOption($this.options);
        }
    },
    autoAppendSubQuestion: function (event, $this, question) {
        if ($this.sub_questions.indexOf(question) === $this.sub_questions.length - 1) {
            functions.pushSubQuestion($this.sub_questions);
        }
    },
    switchFunc: function (event, $this) {
        $this.config.func_display = !$this.config.func_display;
    },
    pushOption: function (options) {
        var id = 0,
            index,
            option;
        for (let i = 0; i < options.length; i++) {
            if (options[i].option_id > id) {
                id = options[i].option_id;
            }
        }
        index = options.length;
        option = {
            option_id: id,
            option_index: index,
            option_code: '',
            option_content: ''
        };
        options.push(option);
        return option;
    },
    pushSubQuestion: function (sub_questions) {
        var id = 0,
            index,
            question;
        for (let i = 0; i < sub_questions.length; i++) {
            if (sub_questions[i].question_id > id) {
                id = sub_questions[i].question_id;
            }
        }
        index = sub_questions.length;
        question = {
            question_id: id,
            question_index: index,
            question_content: ''
        };
        sub_questions.push(question);
        return question;
    },
    batchOption: function (event, $this) {
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">批量编辑选项</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="batch_option">
                    <textarea></textarea>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header).append(remove_icon).append(board).append(footer);
        footer.append(confirm).append(cancel);
        curtain.css('display', 'none');
        curtain.fadeIn(300);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let batch_saved = '';

        for (let i = 0; i < $this.options.length; i++) {
            batch_saved += $this.options[i].option_content;
            batch_saved += '\n';
        }

        $('#batch_option').find('textarea').val(batch_saved);

        setTimeout(function () {

            remove_icon.on('click', function (event) {
                self.closeEditor(event, curtain);
            });
            cancel.on('click', function (event) {
                self.closeEditor(event, curtain);
            });
            confirm.on('click', function (event) {

                function pushOption() {
                    let abc = $this.pushOption();
                    console.log(abc);
                }

                setTimeout(function () {
                    let batch = $('#batch_option').find('textarea').val().split('\n');
                    for (let i = 0; i < batch.length; i++) {
                        if ($this.options[i]) {
                            $this.options[i].option_content = batch[i];
                        } else {
                            let option = functions.pushOption($this.options);
                            option.option_content = batch[i];
                        }
                    }
                }, 0);
                self.closeEditor(event, curtain);
            });
            container.on('click', self.preventClose);
            curtain.on('click', function (event) {
                self.closeEditor(event, curtain);
            });
        }, 0);
    },
    batchSubQuestion: function (event, $this) {
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">批量编辑子问题</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="batch_option">
                    <textarea></textarea>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header).append(remove_icon).append(board).append(footer);
        footer.append(confirm).append(cancel);
        curtain.css('display', 'none');
        curtain.fadeIn(300);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let batch_saved = '';

        for (let i = 0; i < $this.sub_questions.length; i++) {
            batch_saved += $this.sub_questions[i].question_content;
            batch_saved += '\n';
        }

        $('#batch_option').find('textarea').val(batch_saved);

        setTimeout(function () {

            remove_icon.on('click', function (event) {
                self.closeEditor(event, curtain);
            });
            cancel.on('click', function (event) {
                self.closeEditor(event, curtain);
            });
            confirm.on('click', function (event) {

                function pushOption() {
                    let abc = $this.pushOption();
                    console.log(abc);
                }

                setTimeout(function () {
                    let batch = $('#batch_option').find('textarea').val().split('\n');
                    for (let i = 0; i < batch.length; i++) {
                        if ($this.sub_questions[i]) {
                            $this.sub_questions[i].question_content = batch[i];
                        } else {
                            let question = functions.pushSubQuestion($this.sub_questions);
                            question.question_content = batch[i];
                        }
                    }
                }, 0);
                self.closeEditor(event, curtain);
            });
            container.on('click', self.preventClose);
            curtain.on('click', function (event) {
                self.closeEditor(event, curtain);
            });
        }, 0);
    },
    settingOptions: function (event, $this) {
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain" id="option_settings">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">选项设置</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="setting-board">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th v-for="option in options">{{ option.option_content }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>默认选中</th>
                                <td v-for="option in options">
                                    <input type="radio" name="checked" :checked="option.checked" @change="setChecked($event, option)">
                                </td>
                            </tr>
                            <tr>
                                <th>选项互斥</th>
                                <td v-for="option in options">
                                    <input type="radio" name="mutex" :checked="option.mutex" @change="setMutex($event, option)" :disabled="type==='choice' || type==='score' || type==='pictures'">
                                </td>
                            </tr>
                            <tr>
                                <th>其他</th>
                                <td v-for="option in options">
                                    <input type="checkbox" name="blank" :checked="option.blank" @change="setBlank($event, option)">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header).append(remove_icon).append(board).append(footer);
        footer.append(confirm).append(cancel);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let options = JSON.parse(JSON.stringify($this.options)),
            settings = new Vue({
            el: '#setting-board',
            data: {
                type: $this.type,
                options: options
            },
            methods: {
                setChecked: function (event, option) {
                    event.stopPropagation();
                    for (let i = 0; i < this.options.length; i++) {
                        if (this.options[i] === option) {
                            this.options[i].checked = true;
                        } else {
                            this.options[i].checked = false;
                        }
                    }
                },
                setMutex: function (event, option) {
                    event.stopPropagation();
                    for (let i = 0; i < this.options.length; i++) {
                        if (this.options[i] === option) {
                            this.options[i].mutex = true;
                        } else {
                            this.options[i].mutex = false;
                        }
                    }
                },
                setBlank: function (event, option) {
                    event.stopPropagation();
                    option.blank = $(event.currentTarget).prop('checked');
                }
            }
        });
        curtain.css('display', 'none');
        curtain.fadeIn(300);

        setTimeout(function () {

            remove_icon.on('click', function (event) {
                self.closeEditor(event, curtain, [settings]);
            });
            cancel.on('click', function (event) {
                self.closeEditor(event, curtain, [settings]);
            });
            confirm.on('click', function (event) {

                setTimeout(function () {
                    $this.options = options;
                }, 0);
                self.closeEditor(event, curtain, [settings]);
            });
            container.on('click', self.preventClose);
            curtain.on('click', function (event) {
                self.closeEditor(event, curtain, [settings]);
            });
        }, 0);
    },
    deleteOption: function (target, option, options) {
        if (options.length > 1) {
            $(target).fadeOut(200, function () {
                setTimeout(function () {
                    $(target).show();
                    options.splice(options.indexOf(option), 1);
                }, 0);
            });
        }
    },
    stretch_recommend: function ($this) {
        $this.recommend_stretched = !$this.recommend_stretched;
    },
    activeUpload: function (event) {
        $(event.currentTarget).find('input').click();
    },
    changeOptionUrl: function (event, option) {
        option.option_url = $(event.currentTarget).val();
        if (option.option_url) {
            let form = option.option_url.substring(option.option_url.lastIndexOf(".")).toLowerCase();
            if (!form.match(/.png|.jpg|.jpeg/)) {
                _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('\'上传错误,文件格式必须为：png/jpg/jpeg\'', '#f56c6c');
            } else {
                let fileInput = event.currentTarget;
                let file = fileInput.files[0];
                //创建读取文件的对象
                let reader = new FileReader();
                //创建文件读取相关的变量
                let imgFile;
                //为文件读取成功设置事件
                reader.onload = function (e) {
                    // alert('文件读取完成');
                    imgFile = e.target.result;
                    option.picture_path = imgFile;

                    setTimeout(function () {
                        // $("#style_preview").attr('src',imgFile);
                        // $('.theme-customize').css('background-image', 'url(' + imgFile + ')')
                    }, 0);
                };

                //正式读取文件
                reader.readAsDataURL(file);
            }
        } else {
            option.option_url = '点击添加图片';
        }
    },
    switchPage: function ($this, page) {
        $this.status.page = page;
        console.log(page);
        console.log(page === $this.status.page);
    },
    previousPage: function ($this) {},
    nextPage: function ($this) {},
    appendPage: function ($this) {
        let last = $this.status.page_array.length + 1;
        $this.status.page_array.push(last);
        $this.status.page = last;
    },
    deletePage: function ($this, page) {
        if ($this.status.page_array.length > 1) {
            let index = $this.status.page_array.indexOf(page),
                to_show;
            if (index > 0) {
                to_show = index;
            } else {
                to_show = index + 1;
            }
            $this.status.page_array.splice(index, 1);
            $this.status.page = to_show;
            for (let i = 0; i < $this.questions.length; i++) {
                if ($this.questions[i].page === index + 1) {
                    $this.questions[i].config.exist = false;
                } else if ($this.questions[i].page > index + 1) {
                    $this.questions[i].page -= 1;
                }
            }
            for (let i = 0; i < $this.status.page_array.length; i++) {
                if ($this.status.page_array[i] > index + 1) {
                    $this.status.page_array[i] -= 1;
                }
            }
        }
    },
    showEnd: function ($this) {
        $this.status.page = 'end';
    },
    triggerCollect: function (event, $this) {
        event.stopPropagation();
        event.preventDefault();
        let collected = $this.collected,
            to_send = {};

        $.extend(true, to_send, $this._data);

        to_send.editing && delete to_send.editing;
        to_send.recommend_stretched && delete to_send.recommend_stretched;
        to_send.site_questions && delete to_send.site_questions;
        to_send.config.func_display && delete to_send.config.func_display;
        to_send.config.neck && delete to_send.config.neck;
        to_send.config.neck_initial && delete to_send.config.neck_initial;
        if (to_send.sub_questions) {
            for (let j = 0; j < to_send.sub_questions.length; j++) {
                delete to_send.sub_questions[j].scroll_initial;
                delete to_send.sub_questions[j].scroll_open;
            }
        }
        if (to_send.options) {
            for (let j = 0; j < to_send.options.length; j++) {
                delete to_send.options[j].option_addition;
                delete to_send.options[j].scroll_initial;
                delete to_send.options[j].scroll_open;
            }
        }

        $.ajax({
            url: functions.realPath + '/survey/collection_topic',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                collected: collected === 0 ? 1 : 0,
                subId: to_send.sub_id
            }),
            async: true,
            success: function (d) {
                if (d[0].result > 0) {
                    $this.collected = collected === 0 ? 1 : 0;
                    _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('收藏成功', '#00dbff');
                } else {
                    _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('收藏未成功', '#f56c6c');
                }
            },
            error: function (e) {
                console.log(e);
                _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('网络错误', '#f56c6c');
            }
        });
    },
    deleteItem: function (event, item) {
        event.stopPropagation();
        item.config.exist = false;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./js/swing/common/initial-survey.js":
/*!*******************************************!*\
  !*** ./js/swing/common/initial-survey.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function Initialize() {
    if (sessionStorage.getItem('information')) {
        this.usr_email = JSON.parse(sessionStorage.getItem('information')).iEmail;
    }

    this.survey_id = sessionStorage.getItem('survey_id') || '';
    this.sub_id = sessionStorage.getItem('sub_id') || '';
    this.survey_number = sessionStorage.getItem('survey_number') || 'WJ001023';
    this.survey_name = sessionStorage.getItem('survey_name') || '某个问卷题目';
    this.publish_status = sessionStorage.getItem('publish_status') || false;

    sessionStorage.removeItem('survey_id');
    sessionStorage.removeItem('survey_number');
    sessionStorage.removeItem('survey_name');
    sessionStorage.removeItem('publish_status');
}
const initial = new Initialize();
/* harmony default export */ __webpack_exports__["default"] = (initial);

/***/ }),

/***/ "./js/swing/design/preview.js":
/*!************************************!*\
  !*** ./js/swing/design/preview.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../survey/survey-template.js */ "./js/swing/survey/survey-template.js");


let curWwwPath = window.document.location.href,
    pathName = window.document.location.pathname,
    pos = curWwwPath.indexOf(pathName),
    localhostPath = curWwwPath.substring(0, pos),
    projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

let survey_data = {
    realPath: localhostPath + projectName,
    page: 1,
    total_page: 1,
    answering: 0,
    question_array: [],
    answers_object: {
        sub_id: '',
        respondent: '',
        answers_now: []
    },
    logic: {}
};

// let survey_object = [
//     {
//         "pageTotal": 1,
//         "page": 1,
//         "wjSurvey": [
//             {
//                 "createTime": {
//                     "date": 27,
//                     "day": 1,
//                     "hours": 10,
//                     "minutes": 37,
//                     "month": 7,
//                     "seconds": 39,
//                     "time": 1535337459000,
//                     "timezoneOffset": -480,
//                     "year": 118
//                 },
//                 "pLogin": "57102890230@qq.com",
//                 "updateTime": null,
//                 "wjDelete": "",
//                 "wjId": 21,
//                 "wjName": "的萨芬撒",
//                 "wjNumber": "",
//                 "wjRemark": "萨达",
//                 "wjSavedLogic": "",
//                 "wjStatus": "",
//                 "wjStyle": "",
//                 "wjTemplate": "",
//                 "wjTime": null
//             }
//         ],
//         "wjSubject": [
//             {
//                 "page": 0,
//                 "subBreak": "1",
//                 "subConfig": "[{\"exist\":true,\"page_now\":1,\"random_option\":\"fixed\",\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"}}]",
//                 "subId": 31,
//                 "subIndex": "1",
//                 "subName": "",
//                 "subNumber": "1",
//                 "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\",\"checked\":false,\"mutex\":false,\"blank\":false}]",
//                 "subPId": 0,
//                 "subPage": "1",
//                 "subQuestions": "",
//                 "subRecommendStretched": "",
//                 "subRemark": "",
//                 "subType": "choice",
//                 "subWjId": 21
//             },
//             {
//                 "page": 0,
//                 "subBreak": "1",
//                 "subConfig": "[{\"exist\":true,\"page_now\":1,\"random_option\":\"fixed\",\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"}}]",
//                 "subId": 32,
//                 "subIndex": "2",
//                 "subName": "",
//                 "subNumber": "2",
//                 "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\",\"checked\":false,\"mutex\":false,\"blank\":false}]",
//                 "subPId": 1,
//                 "subPage": "1",
//                 "subQuestions": "",
//                 "subRecommendStretched": "",
//                 "subRemark": "",
//                 "subType": "check",
//                 "subWjId": 21
//             },
//             {
//                 "page": 0,
//                 "subBreak": "1",
//                 "subConfig": "[{\"class\":\"single\",\"exist\":true,\"page_now\":1,\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"},\"restrict\":\"none\",\"number\":\"\",\"min_word\":\"\",\"max_word\":\"\",\"post\":\"\"}]",
//                 "subId": 33,
//                 "subIndex": "3",
//                 "subName": "填空题",
//                 "subNumber": "3",
//                 "subOption": "",
//                 "subPId": 2,
//                 "subPage": "1",
//                 "subQuestions": "[{\"question_id\":0,\"question_index\":1,\"question_content\":\"ç¬¬ä¸å­é®é¢\"},{\"question_id\":1,\"question_index\":2,\"question_content\":\"ç¬¬äºå­é®é¢\"}]",
//                 "subRecommendStretched": "",
//                 "subRemark": "",
//                 "subType": "blank",
//                 "subWjId": 21
//             },
//             {
//                 "page": 0,
//                 "subBreak": "1",
//                 "subConfig": "[{\"class\":\"matrix_choice\",\"exist\":true,\"page_now\":1,\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"},\"restrict\":\"none\",\"number\":\"\",\"min_word\":\"\",\"max_word\":\"\",\"post\":\"\",\"random_branch\":\"\",\"random_option_matrix\":\"\"}]",
//                 "subId": 34,
//                 "subIndex": "4",
//                 "subName": "矩阵题",
//                 "subNumber": "4",
//                 "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\"},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\"}]",
//                 "subPId": 3,
//                 "subPage": "1",
//                 "subQuestions": "[{\"class\":\"matrix_choice\",\"question_id\":0,\"question_index\":1,\"question_content\":\"ç¬¬ä¸å­é®é¢\"},{\"class\":\"matrix_choice\",\"question_id\":1,\"question_index\":2,\"question_content\":\"ç¬¬äºå­é®é¢\"}]",
//                 "subRecommendStretched": "",
//                 "subRemark": "",
//                 "subType": "matrix",
//                 "subWjId": 21
//             },
//             {
//                 "page": 0,
//                 "subBreak": "1",
//                 "subConfig": "[{\"exist\":true,\"page_now\":1,\"layout\":{\"orientation\":\"horizon\",\"cols_number\":5,\"width_percent\":\"20%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"},\"style\":\"number\",\"min_score\":\"\",\"max_score\":\"\",\"credit\":\"satisfaction\",\"left_label\":\"非常不满意\",\"right_label\":\"非常满意\"}]",
//                 "subId": 35,
//                 "subIndex": "5",
//                 "subName": "",
//                 "subNumber": "5",
//                 "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"1\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":1,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"2\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":2,\"option_index\":3,\"option_code\":\"\",\"option_content\":\"3\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":3,\"option_index\":4,\"option_code\":\"\",\"option_content\":\"4\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":4,\"option_index\":5,\"option_code\":\"\",\"option_content\":\"5\",\"checked\":false,\"mutex\":false,\"blank\":false}]",
//                 "subPId": 4,
//                 "subPage": "1",
//                 "subQuestions": "",
//                 "subRecommendStretched": "",
//                 "subRemark": "",
//                 "subType": "score",
//                 "subWjId": 21
//             },
//             {
//                 "page": 0,
//                 "subBreak": "1",
//                 "subConfig": "[{\"exist\":true,\"page_now\":1,\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"},\"style\":\"number\",\"min_score\":\"\",\"max_score\":\"\",\"credit\":\"satisfaction\"}]",
//                 "subId": 36,
//                 "subIndex": "6",
//                 "subName": "",
//                 "subNumber": "6",
//                 "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\",\"checked\":false,\"mutex\":false,\"blank\":false}]",
//                 "subPId": 5,
//                 "subPage": "1",
//                 "subQuestions": "",
//                 "subRecommendStretched": "",
//                 "subRemark": "",
//                 "subType": "sort",
//                 "subWjId": 21
//             }
//         ]
//     }
// ];
const survey = new Vue({
    el: '#root',
    data: survey_data,
    methods: {
        submit: function () {
            // let self = this,
            //     could_complete = true,
            //     answers_final = [];
            //
            // for (let arr = self.question_array, i = 0; i < arr.length; i++){
            //     if (arr[i].config.required){
            //         if (!arr[i].pass){
            //             could_complete = false;
            //             break
            //         }
            //     }
            // }
            //
            // if (could_complete){
            //
            //     for (let i = 0; i < self.answers_object.answers_now.length; i++){
            //         answers_final.push({
            //             type: self.answers_object.answers_now[i].type,
            //             sub_id: self.answers_object.answers_now[i].sub_id,
            //             answer_content: self.answers_object.answers_now[i]
            //         });
            //         delete(self.answers_object.answers_now[i].type);
            //         delete(self.answers_object.answers_now[i].sub_id)
            //     }
            //     self.answers_object.answers_now = answers_final;
            //
            //     $.ajax({
            //         url: self.realPath + '',
            //         type: 'post',
            //         dataType: 'json',
            //         contentType: 'application/json;charset=utf-8',
            //         data: JSON.stringify(self.answers_object),
            //         async: true,
            //         success: function(d){
            //             if (!self.answers_object.respondent){
            //                 self.answers_object.respondent = d[0].respondent
            //             }
            //         },
            //         error: function(e){
            //
            //         }
            //     })
            // }
        },
        initialStyle: function (style_object) {},
        getData: function (page) {
            try {
                let code = document.location.href.match(/\?wj\=(\S+)/)[1],
                    self = this;

                $.ajax({
                    url: this.realPath + '/survey/page_answer',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify({
                        survey_id: code,
                        page: page
                    }),
                    async: false,
                    success: function (d) {
                        console.log(d);
                        if (d[0]) {
                            self.initialSurvey(d[0]);
                            self.page = page;
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            } catch (e) {}

            // this.initialSurvey(survey_object[0]);
        },
        initialSurvey: function (d) {
            this.total_page = d.pageTotal;
            // this.page = d.page;

            let information = d.wjSurvey[0];

            this.survey_id = information.wjId;
            this.survey_name = information.wjName;
            this.survey_number = information.wjNumber;
            this.survey_remark = information.wjRemark;
            this.style = information.wjStyle.checked_theme;
            this.style_number = information.wjStyle.checked_theme_name;
            this.answers_object.answers_now = [];
            this.question_array = [];

            this.initialStyle(this.style_number, this.style);

            $('#title').text(this.survey_name);
            $('#remark').text(this.survey_remark);

            this.questions = d.wjSubject;

            this.answers_object.survey_id = 21; //--------------------------------待更改
            this.answers_array = this.answers_object.answers_now;
            _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"].logic = this.logic = information.wjSavedLogic || {
                display_logic: [],
                jump_logic: []
            };
            for (let i = 0; i < this.logic.display_logic.length; i++) {
                for (let j = 0; j < this.logic.display_logic[i].conditions.length; j++) {
                    this.logic.display_logic[i].conditions[j].correspond = false;
                }
            }
            for (let i = 0; i < this.logic.jump_logic.length; i++) {
                for (let j = 0; j < this.logic.jump_logic[i].conditions.length; j++) {
                    this.logic.jump_logic[i].conditions[j].correspond = false;
                }
            }

            this.displayItem(this.questions);
        },
        displayItem: function (questions) {
            if (questions.length) {
                function compare(obj_a, obj_b) {
                    return parseInt(obj_a['subIndex']) - parseInt(obj_b['subIndex']);
                }
                questions.sort(compare);

                for (let i = 0; i < questions.length; i++) {
                    this.renderItem(questions[i]);
                }
            }
        },
        renderItem: function (data) {
            let id, sub_id, index, name, remark, number, breaking, type, options, sub_questions, config, template, methods, watcher, mounted, created, beforeCreate, answer_container;

            if (data.subConfig) {

                let config = JSON.parse(data.subConfig)[0];

                if (!config.exist) {
                    return;
                }

                id = data.id = data.subPId;
                index = data.index = data.subIndex;
                name = data.name = data.subName;
                remark = data.remark = data.subRemark;
                number = data.number = data.subNumber;
                if (data.subOption) {
                    data.options = JSON.parse(data.subOption);
                }
                if (data.subQuestions) {
                    data.sub_questions = JSON.parse(data.subQuestions);
                }
                breaking = data.breaking = data.subBreak;
                type = data.type = data.subType;
                data.config = config;
                template = _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"][type].template;
                methods = _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"][type].methods;
                watcher = _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"][type].watch || {};
                beforeCreate = _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"][type].beforeCreate || function () {};
                mounted = _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"][type].mounted || function () {};
                created = _survey_survey_template_js__WEBPACK_IMPORTED_MODULE_0__["default"][type].created || function () {};

                if (data.options) {
                    options = data.options;
                }
                if (data.sub_questions) {
                    sub_questions = data.sub_questions;
                }

                switch (type) {
                    case 'choice':
                        answer_container = {
                            option_id: '',
                            option_index: '',
                            option_code: '',
                            option_content: '',
                            option_addition: ''
                        };
                        break;
                    case 'check':
                        answer_container = [{
                            option_id: '',
                            option_index: '',
                            option_code: '',
                            option_content: '',
                            option_addition: ''
                        }];
                        break;
                    case 'blank':
                        answer_container = [{
                            question_id: '',
                            question_index: '',
                            question_content: '',
                            answer: ''
                        }];
                        break;
                    case 'matrix':
                        answer_container = [{
                            question_id: '',
                            question_index: '',
                            question_content: '',
                            answer: '',
                            options: [{
                                option_id: '',
                                option_index: '',
                                option_code: '',
                                option_content: '',
                                option_addition: '',
                                option_checked: '',
                                option_answer: ''
                            }]
                        }];
                        break;
                    case 'score':
                        answer_container = {
                            option_id: '',
                            option_index: '',
                            option_code: '',
                            option_content: '',
                            option_addition: ''
                        };
                        break;
                    case 'sort':
                        answer_container = [{
                            option_id: '',
                            option_index: '',
                            option_code: '',
                            option_content: '',
                            option_addition: '',
                            order: ''
                        }];
                        break;
                    case 'pictures':
                        answer_container = {
                            option_id: '',
                            option_index: '',
                            option_code: '',
                            option_content: '',
                            option_addition: ''
                        };
                        break;
                    case 'description':

                        break;
                }

                let node = $(template);
                node.attr('id', 'item-' + index);
                $('#questions').append(node);

                data.answer = answer_container;
                sub_id = data.answer.sub_id = data.subId;
                data.pass = false;
                data.correspond = true;
                data.type = type;

                for (let i = 0; i < this.logic.display_logic.length; i++) {
                    if (this.logic.display_logic[i].target === data.id) {
                        data.correspond = false;
                    }
                }

                this.question_array.push(new Vue({
                    el: '#item-' + index,
                    data: data,
                    methods: methods,
                    watch: watcher,
                    beforeCreate: beforeCreate,
                    created: created,
                    mounted: mounted
                }));
                data.answer.type = type;
                this.answers_array.push(data.answer);
                this.answering = data.id; //待更改，把这个放到survey-template: answering.watch里面
            }
        },
        clearPage: function () {
            this.submit();
            $('#questions').html('');
        },
        previousPage: function () {
            this.clearPage();
            if (this.page > 1) {
                this.getData(this.page - 1);
            }
        },
        nextPage: function () {
            this.clearPage();
            if (this.page < this.total_page) {
                this.getData(this.page + 1);
            }
        },
        submitAll: function () {
            this.clearPage();
        }
    },
    mounted: function () {
        this.getData(1);
        if (sessionStorage.getItem('way') === 'print') {
            window.print();
        }
    },
    watch: {
        'logic.jump_logic': {
            handler: function (value, old) {
                for (let i = 0; i < value.length; i++) {
                    let flag = false;
                    for (let j = 0; j < value[i].conditions.length; j++) {
                        if (value[i].conditions[j].correspond) {
                            if (value[i].conditions[j].id === this.answering) {
                                flag = true;
                            }
                        } else {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        let id = value[i].target;
                        //未完待续
                    }
                }
            },
            deep: true
        },
        'logic.display_logic': {
            handler: function (value, old) {
                for (let i = 0; i < value.length; i++) {
                    let flag = true;
                    for (let j = 0; j < value[i].conditions.length; j++) {
                        if (!value[i].conditions[j].correspond) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        let id = value[i].target;
                        //未完待续
                        for (let j = 0; j < this.question_array.length; j++) {
                            if (this.question_array[j].id === id) {
                                this.question_array[j].correspond = true;
                            }
                        }
                    }
                }
            },
            deep: true
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (survey);

/***/ }),

/***/ "./js/swing/survey/survey-template.js":
/*!********************************************!*\
  !*** ./js/swing/survey/survey-template.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/functions */ "./js/swing/common/functions.js");


const survey_template = {
    logic: [],
    choice: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-options" v-if="config.layout.orientation === 'select'">
                                <select :name="'item-' + id" v-model="answer.option_id">
                                    <option v-for="option in options" :value="option.option_id">{{ option.option_content }}</option>
                                </select>
                            </div>
                            <div class="item-options" v-else>
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeChoice(option.option_id)">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>            
                    </div>
            `,
        data: {
            answer: {}
        },
        methods: {
            changeChoice: function (option_id) {
                this.answer.option_id = option_id;
            },
            randomSort: function (arr) {
                if (arr.length >= 2) {
                    let result = [],
                        circle = arr.length - 1;

                    for (let i = 0; i < circle; i++) {
                        let last = arr.length - 1,
                            next = Math.floor(last * Math.random());
                        result.push(arr.splice(next, 1)[0]);
                    }
                    return result;
                }
            }
        },
        mounted: function () {

            let condition = this.config.random_option;

            if (condition === 'random') {
                let transiting = this.randomSort(this.options);
                this.options = transiting;
            } else if (condition === 'fix_one') {
                let fixed = this.options.splice(this.options.length - 2, 1),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_two') {
                let fixed = this.options.splice(this.options.length - 3, 2),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_three') {
                let fixed = this.options.splice(this.options.length - 4, 3),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            }
        },
        watch: {
            answer: {
                handler: function (value, old) {
                    for (let i = 0; i < this.options.length; i++) {
                        if (parseInt(value.option_id) === this.options[i].option_id) {
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank) {
                                value.option_addition = answer_option.option_addition;
                            }
                        }
                    }
                    if (value.option_id !== '') {
                        this.pass += 1;
                    }
                },
                deep: true
            },
            pass: function (value, old) {
                if (value) {
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++) {
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++) {
                            if (this.id === display_logic.conditions[j].id) {
                                if (this.answer[0].option_id === display_logic.conditions[j].option) {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'checked';
                                } else {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'unchecked';
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++) {
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++) {
                            if (this.id === jump_logic.conditions[j].id) {
                                if (this.answer[0].option_id === jump_logic.conditions[j].option) {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'checked';
                                } else {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'unchecked';
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    check: {
        template: `
                <div class="item" v-if="correspond && config.exist && page === config.page_now">
                    <div class="item-head">
                        <i class="index"><b class="present">{{ number }}</b></i>
                        <p class="item-name">{{ name }}</p>
                    </div>
                    <div class="item-neck">
                        <p class="item-remark" v-if="remark">{{ remark }}</p>
                    </div>
                    <div class="item-chest">
                        <div class="item-options">
                            <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                <label :for="'item-' + id + 'option-' + option.option_id">
                                    <input class="checkbox" type="checkbox" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeCheck($event,option.option_id)">
                                    <span>{{ option.option_content }}</span>
                                    <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                </label>
                            </p>
                        </div>
                    </div>
                </div>`,
        data: {},
        methods: {
            changeCheck: function (event, option_id) {
                let answer_option;
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].option_id === option_id) {
                        answer_option = this.options[i];
                        break;
                    }
                }
                if ($(event.currentTarget).prop('checked')) {

                    let obj = {
                        option_id: answer_option.option_id,
                        option_code: answer_option.option_code
                    };
                    if (answer_option.blank) {
                        obj.option_addition = answer_option.option_addition;
                    }

                    if (this.answer[0].option_id !== '') {
                        this.answer.push(obj);
                    } else {
                        this.answer[0] = obj;
                    }
                } else {
                    if (this.answer.length > 1) {
                        this.answer.splice(this.answer.indexOf(answer_option), 1);
                    } else {
                        this.answer[0] = {
                            option_id: answer_option.option_id,
                            option_code: answer_option.option_code
                        };
                        if (answer_option.blank) {
                            obj.option_addition = answer_option.option_addition;
                        }
                    }
                }
            }
        },
        mounted: function () {
            let condition = this.config.random_option;

            if (condition === 'random') {
                let transiting = this.randomSort(this.options);
                this.options = transiting;
            } else if (condition === 'fix_one') {
                let fixed = this.options.splice(this.options.length - 2, 1),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_two') {
                let fixed = this.options.splice(this.options.length - 3, 2),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_three') {
                let fixed = this.options.splice(this.options.length - 4, 3),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            }
        },
        watch: {
            answer: {
                handler: function (value, old) {
                    if (value.length >= 2) {
                        this.pass += 1;
                    } else {
                        this.pass = 0;
                    }
                },
                deep: true
            },
            pass: function (value, old) {
                if (value) {
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++) {
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++) {
                            if (this.id === display_logic.conditions[j].id) {
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++) {
                                    if (this.answer[k].option_id === display_logic.conditions[j].option_id) {
                                        checked = true;
                                        break;
                                    }
                                }
                                if (display_logic.conditions[j].judgement === 'checked') {
                                    display_logic.conditions[j].correspond = true;
                                } else if (display_logic.conditions[j].judgement === 'unchecked') {
                                    display_logic.conditions[j].correspond = true;
                                } else {
                                    display_logic.conditions[j].correspond = false;
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++) {
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++) {
                            if (this.id === jump_logic.conditions[j].id) {
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++) {
                                    if (this.answer[k].option_id === jump_logic.conditions[j].option_id) {
                                        checked = true;
                                        break;
                                    }
                                }
                                if (jump_logic.conditions[j].judgement === 'checked') {
                                    jump_logic.conditions[j].correspond = true;
                                } else if (jump_logic.conditions[j].judgement === 'unchecked') {
                                    jump_logic.conditions[j].correspond = true;
                                } else {
                                    jump_logic.conditions[j].correspond = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    blank: {
        template: `
                <div class="item" v-if="correspond && config.exist && page === config.page_now">
                    <div class="item-head">
                        <i class="index"><b class="present">{{ number }}</b></i>
                        <p class="item-name">{{ name }}</p>
                    </div>
                    <div class="item-neck">
                        <p class="item-remark" v-if="remark">{{ remark }}</p>
                    </div>
                    <div class="item-chest">
                        <div class="item-blank">
                            <p class="single-blank" v-if="config.the_class==='single'">
                                <textarea v-model="answer[0].answer"></textarea>
                                <span class="post" v-if="config.post">{{ config.post }}</span>
                            </p>
                            <div class="multi-blank" v-if="config.the_class==='multi'">
                                <p class="branch-blank">
                                    <label v-for="sub_answer in answer" :for="'item-' + id + 'sub_question-' + sub_question.question_id">
                                        <b>{{ question.question_content }}</b>
                                        <input :id="'item-' + id + 'sub_question-' + sub_question.question_id" type="text" @v-model="sub_question.answer">
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>    
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        },
        created: function () {
            for (let i = 0; i < this.sub_questions.length; i++) {
                if (this.answer[i]) {
                    this.answer[i].question_id = this.sub_questions[i].question_id;
                    this.answer[i].question_index = this.sub_questions[i].question_index;
                    this.answer[i].question_content = this.sub_questions[i].question_content;
                    this.answer[i].answer = '';
                } else {
                    this.answer.push({
                        question_id: '',
                        answer: ''
                    });
                }
            }
        }
    },
    matrix: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <table class="item-matrix">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th v-for="question in sub_questions">{{ question.question_content }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="option in options">
                                        <th>{{ option.option_content }}</th>
                                        <td v-for="question in sub_questions">
                                            <span v-if="question.the_class==='matrix_choice'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="radio" @change="changeChoice($event,question.question_id,option.option_id)"></span>
                                            <span v-if="question.the_class==='matrix_check'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="checkbox" @change="changeCheck($event,question.question_id,option.option_id)"></span>
                                            <span v-if="question.the_class==='matrix_blank'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="text" @change="changeBlank($event,question.question_id,option.option_id)"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            `,
        data: {},
        methods: {
            changeChoice(event, question_id, option_id) {
                if ($(event.currentTarget).prop('checked')) {
                    for (let i = 0; i < this.answer.length; i++) {
                        if (this.answer[i].question_id === question_id) {
                            let this_question = this.answer[i];
                            for (let j = 0; j < this_question.options.length; j++) {
                                this_question.options[j].option_checked = this_question.options[j].option_id === option_id;
                            }
                        }
                    }
                }
            },
            changeCheck(event, question_id, option_id) {
                for (let i = 0; i < this.answer.length; i++) {
                    if (this.answer[i].question_id === question_id) {
                        let this_question = this.answer[i];
                        for (let j = 0; j < this_question.options.length; j++) {
                            if (this_question.options[j].option_id === option_id) {
                                this_question.options[j].option_checked = $(event.currentTarget).prop('checked');
                                break;
                            }
                        }
                    }
                }
            },
            changeBlank(event, question_id, option_id) {
                for (let i = 0; i < this.answer.length; i++) {
                    if (this.answer[i].question_id === question_id) {
                        let this_question = this.answer[i];
                        for (let j = 0; j < this_question.options.length; j++) {
                            if (this_question.options[j].option_id === option_id) {
                                this_question.options[j].option_answer = $(event.currentTarget).val();
                                break;
                            }
                        }
                    }
                }
            }
        },
        watch: {
            answer: {
                handler: function (value, old) {
                    let pass = 1;
                    for (let i = 0; i < value.length; i++) {
                        let sub_pass;
                        if (value[i].the_class === 'matrix_blank') {
                            sub_pass = true;
                            for (let j = 0; j < value[i].options.length; j++) {
                                if (!value[i].options[j].option_answer) {
                                    sub_pass = 0;
                                    break;
                                }
                            }
                        } else {
                            sub_pass = false;
                            for (let j = 0; j < value[i].options.length; j++) {
                                if (value[i].options[j].option_checked) {
                                    sub_pass += 1;
                                    break;
                                }
                            }
                        }
                        if (!sub_pass) {
                            pass = 0;
                        }
                    }
                    this.pass = pass;
                },
                deep: true
            },
            pass: function (value, old) {
                if (value) {
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++) {
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++) {
                            if (this.id === display_logic.conditions[j].id) {
                                for (let k = 0; k < this.answer.length; k++) {
                                    if (this.answer[k].question_id === display_logic.conditions[j].sub_question) {
                                        let checked = false;
                                        for (let o = 0; o < this.answer[k].options.length; o++) {
                                            if (display_logic.conditions[j].option === this.answer[k].options[o]) {
                                                checked = true;
                                                break;
                                            }
                                        }
                                        if (display_logic.conditions[j].judgement === 'checked') {
                                            display_logic.conditions[j].correspond = true;
                                        } else if (display_logic.conditions[j].judgement === 'unchecked') {
                                            display_logic.conditions[j].correspond = true;
                                        } else {
                                            display_logic.conditions[j].correspond = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++) {
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++) {
                            if (this.id === jump_logic.conditions[j].id) {
                                for (let k = 0; k < this.answer.length; k++) {
                                    if (this.answer[k].question_id === jump_logic.conditions[j].sub_question) {
                                        let checked = false;
                                        for (let o = 0; o < this.answer[k].options.length; o++) {
                                            if (jump_logic.conditions[j].option === this.answer[k].options[o]) {
                                                checked = true;
                                                break;
                                            }
                                        }
                                        if (jump_logic.conditions[j].judgement === 'checked') {
                                            jump_logic.conditions[j].correspond = true;
                                        } else if (jump_logic.conditions[j].judgement === 'unchecked') {
                                            jump_logic.conditions[j].correspond = true;
                                        } else {
                                            jump_logic.conditions[j].correspond = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        created: function () {
            this.answer = [];
            for (let i = 0; i < this.sub_questions.length; i++) {
                let about_question = {
                    question_id: this.sub_questions[i].question_id,
                    question_index: this.sub_questions[i].question_index,
                    question_content: this.sub_questions[i].question_content,
                    class: this.sub_questions[i].the_class,
                    options: []
                };
                for (let j = 0; j < this.options.length; j++) {
                    about_question.options.push({
                        option_id: this.options[j].option_id,
                        option_index: this.options[j].option_id,
                        option_code: this.options[j].option_code,
                        option_content: this.options[j].option_id,
                        option_addition: '',
                        option_checked: '',
                        option_answer: ''
                    });
                }
                this.answer.push(about_question);
            }
        }
    },
    score: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest item-score">
                            <div class="option-label">
                                <span class="left-label" v-html="config.left_label"></span>
                                <span class="right-label" v-html="config.right_label"></span>
                            </div>
                            <div class="item-options">
                                <p class="option score" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label class="score" :class="{ 'checked': option.option_checked }" :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeChoice(option.option_id)">
                                        <span>{{ option.option_content }}</span>
                                        <span class="thumb" v-if="config.style==='thumb'"></span>
                                        <span class="heart" v-if="config.style==='heart'"></span>
                                        <span class="star" v-if="config.style==='start'"></span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
            `,
        data: {},
        methods: {
            changeChoice: function (option_id) {
                this.answer.option_id = option_id;
            }
        },
        watch: {
            answer: {
                handler: function (value, old) {
                    for (let i = 0; i < this.options.length; i++) {
                        if (parseInt(value.option_id) === this.options[i].option_id) {
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank) {
                                value.option_addition = answer_option.option_addition;
                            }
                        }
                    }
                    if (value.option_id !== '') {
                        this.pass += 1;
                    }
                },
                deep: true
            },
            pass: function (value, old) {
                if (value) {
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++) {
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++) {
                            if (this.id === display_logic.conditions[j].id) {
                                if (this.answer[0].option_id === display_logic.conditions[j].option) {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'checked';
                                } else {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'unchecked';
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++) {
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++) {
                            if (this.id === jump_logic.conditions[j].id) {
                                if (this.answer[0].option_id === jump_logic.conditions[j].option) {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'checked';
                                } else {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'unchecked';
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    sort: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-options sort-area inputting" v-if="config.sorting_method === 'inputting'">
                                <div class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <div class="label" :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="order" type="number" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" v-model="option.order">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </div>
                                </div>
                            </div>
                            <div class="item-options sort-area drag" v-if="config.sorting_method === 'drag'">
                                <div class="option" v-for="option in sorting" @mousedown="activeSortingShift(option,$event)">{{ option.option_content }}</div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                    </div>
            `,
        data: {},
        methods: {
            activeSortingShift: function (option, event, sorting) {
                event.preventDefault();
                event.stopPropagation();

                let base = $('#root'),
                    wrap = $(event.target).parents('.drag'),
                    queue = wrap.find('.option'),
                    insert_before = null,
                    insert_after = null,
                    target = $(event.target),
                    target_data = option,
                    target_index = sorting.indexOf(target_data),
                    initial_top = target[0].offsetTop,
                    initial_height = target[0].offsetHeight,
                    initial_y = event.clientY,
                    index_target = Array.prototype.indexOf.call(queue, target[0]),
                    moving = false;

                Array.prototype.splice.apply(queue, [index_target, 1]);

                function shiftItem(event) {
                    let instant_y = event.clientY,
                        instant_top = initial_top + (instant_y - initial_y),
                        instant_middle_top = instant_top + initial_height / 2;
                    target.addClass('drift');
                    target.css('top', instant_top + 'px');
                    wrap.css('paddingBottom', initial_height);

                    setTimeout(function () {
                        for (let i = 0; i <= queue.length; i++) {
                            if (queue[i]) {
                                if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                                    continue;
                                }
                            }
                            if (queue[i - 1]) {
                                wrap.find('.before-insert').removeClass('before-insert');
                                wrap.find('.after-insert').removeClass('after-insert');
                                $(queue[i - 1]).addClass('before-insert');
                                insert_before = $(queue[i - 1]);
                                insert_after = null;
                            } else {
                                wrap.find('.before-insert').removeClass('before-insert');
                                wrap.find('.after-insert').removeClass('after-insert');
                                $(queue[0]).addClass('after-insert');
                                insert_after = $(queue[0]);
                                insert_before = null;
                            }
                            break;
                        }
                    }, 0);
                    // base.one('mouseup', endShift)
                    if (!moving) {
                        moving = true;
                    }
                }

                function endShift(event) {
                    console.log(1);
                    target.removeClass('drift');
                    wrap.css('paddingBottom', 0);
                    setTimeout(function () {
                        if (insert_before) {
                            let index_before = insert_before.attr('index');
                            if (index_target > index_before + 1) {
                                for (let i = 0; i < sorting.length; i++) {
                                    if (sorting[i].index > index_before && sorting[i].index < index_target) {
                                        sorting[i].index += 1;
                                    }
                                }
                                target_data.index = index_before + 1;
                            } else if (index_target < index_before) {
                                for (let i = 0; i < sorting.length; i++) {
                                    if (sorting[i].index <= index_before && sorting[i].index > index_target) {
                                        sorting[i].index -= 1;
                                    }
                                }
                                target_data.index = index_before + 1;
                            }
                            $(target).insertAfter(insert_before);
                            insert_before.removeClass('before-insert');
                        } else if (insert_after) {
                            if (queue.length) {
                                let index_after = insert_after.attr('index');
                                if (index_target > index_after) {
                                    for (let i = 0; i < sorting.length; i++) {
                                        if (sorting[i].index >= index_after && sorting[i].index < index_target) {
                                            sorting[i].index += 1;
                                        }
                                    }
                                    target_data.index = index_after - 1;
                                } else if (index_target < index_after) {
                                    for (let i = 0; i < sorting.length; i++) {
                                        if (sorting[i].index < index_after && sorting[i].index > index_target) {
                                            sorting[i].index -= 1;
                                        }
                                    }
                                }
                                insert_after.removeClass('after-insert');
                                $(target).insertBefore($(queue[0]));
                            }
                        }
                    }, 0);
                    target.css('top', 'auto');
                    for (let i = 0; i < this.sorting.length; i++) {
                        this.sorting[i].order = i;
                    }
                }

                base.on('mousemove', shiftItem).on('mouseup', function (event) {
                    base.off('mousemove', shiftItem).off('mouseup', endShift);
                    if (moving) {
                        endShift();
                        event.preventDefault();
                    }
                });
            }
        },
        watch: {
            answer: {
                handler: function (value, old) {
                    let flag = true;
                    for (let i = 0; i < value.length; i++) {
                        if (value[i].order === '') {
                            flag = false;
                            break;
                        }
                    }
                    this.pass = flag;
                },
                deep: true
            },
            options: {
                handler: function (val) {
                    for (let i = 0; i < val.length; i++) {
                        for (let j = 0; j < this.answer.length; j++) {
                            if (val[i].option_id === this.answer[j].option_id) {
                                this.answer[j].order = i;
                            }
                        }
                    }
                },
                deep: true
            },
            pass: function (value, old) {
                if (value) {
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++) {
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++) {
                            if (this.id === display_logic.conditions[j].id) {
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++) {
                                    if (this.answer[k].option_id === display_logic.conditions[j].option_id) {
                                        checked = true;
                                        break;
                                    }
                                }
                                if (display_logic.conditions[j].judgement === 'checked') {
                                    display_logic.conditions[j].correspond = true;
                                } else if (display_logic.conditions[j].judgement === 'unchecked') {
                                    display_logic.conditions[j].correspond = true;
                                } else {
                                    display_logic.conditions[j].correspond = false;
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++) {
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++) {
                            if (this.id === jump_logic.conditions[j].id) {
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++) {
                                    if (this.answer[k].option_id === jump_logic.conditions[j].option_id) {
                                        checked = true;
                                        break;
                                    }
                                }
                                if (jump_logic.conditions[j].judgement === 'checked') {
                                    jump_logic.conditions[j].correspond = true;
                                } else if (jump_logic.conditions[j].judgement === 'unchecked') {
                                    jump_logic.conditions[j].correspond = true;
                                } else {
                                    jump_logic.conditions[j].correspond = false;
                                }
                            }
                        }
                    }
                }
            }
        },
        mounted: function () {
            this.answer = [];
            for (let i = 0; i < this.options.length; i++) {
                this.answer.push(this.options[i]);
            }
        }

    },
    pictures: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-pictures">
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeChoice(option.option_id)">
                                        <span>{{ option.option_content }}</span>
                                        <img :src="option.picture_path" :title="option.option_content" v-if="option.picture_path">
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
            `,
        data: {},
        methods: {
            changeChoice: function (option_id) {
                this.answer.option_id = option_id;
            }
        },
        watch: {
            'answer': {
                handler: function (value, old) {
                    for (let i = 0; i < this.options.length; i++) {
                        if (parseInt(value.option_id) === this.options[i].option_id) {
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank) {
                                value.option_addition = answer_option.option_addition;
                            }
                        }
                    }
                    if (value.option_id !== '') {
                        this.pass += 1;
                    }
                },
                deep: true
            }
        }
    },
    description: {
        template: `
            <div class="item" v-if="correspond && config.exist && page === config.page_now">
                <div class="item-head">
                    <i class="index"><b class="present">{{ number }}</b></i>
                    <p class="item-name">{{ name }}</p>
                </div>
            </div>
            `,
        data: {},
        methods: {}
    },
    upload: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <input type="file" :accept="accept">
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {},
        mounted: function () {
            let accept = '';
            for (let j in this.config.restrict) {
                if (this.config.restrict[j].all === true) {
                    accept += j + '/*,';
                } else {
                    for (let k in this.config.restrict[j]) {
                        if (k !== 'all') {
                            accept += j + '/' + k + ',';
                        }
                    }
                }
            }
            this.accept = accept;
        }
    },
    geolocation: {
        template: `
                <div class="item item-geolocation" v-if="correspond && config.exist && page === config.page_now">
                    <script type="text/javascript"
	                src="https://webapi.amap.com/maps?v=1.4.9&key=45e883962deaebb8a4c3a6b5f6e221f4&plugin=AMap.Geocoder"></script>
                    <div class="item-head">
                        <i class="index"><b class="present">{{ number }}</b></i>
                        <p class="item-name">{{ name }}</p>
                    </div>
                    <div class="item-neck">
                        <p class="item-remark" v-if="remark">{{ remark }}</p>
                    </div>
                    <div class="item-chest item-map">
                        <div class="map" :id="'map-' + id"></div>
                    </div>
                    <div class="control"></div>
                </div>
            `,
        data: {},
        methods: {},
        mounted: function () {
            let self = this;
            function onComplete(result) {
                console.log(result);
                self.answer = result;
                self.pass = 1;
            }
            function onError(error) {
                console.log(error);
                self.answer = error;
                self.pass = 0;
            }

            mapObj = new AMap.Map('iCenter');
            if (self.config.mode === 'default') {
                mapObj.plugin('AMap.Geolocation', function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, //是否使用高精度定位，默认:true
                        timeout: 10000, //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0, //定位结果缓存0毫秒，默认：0
                        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true, //显示定位按钮，默认：true
                        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
                });
            } else {
                var marker = new AMap.Marker({
                    position: mapObj.getCenter(),
                    draggable: true,
                    cursor: 'move',
                    raiseOnDrag: false,
                    zIndex: 101
                });
                marker.setMap(mapObj);

                AMap.event.addListener(marker, "dragend", function (e) {
                    self.answer.lng = marker.getPosition().lng;
                    self.answer.lat = marker.getPosition().lat;
                    lnglatXY = [marker.getPosition().lng, marker.getPosition().lat];
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress(lnglatXY, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            var address = result.regeocode.formattedAddress; //返回地址描述
                            self.answer.description = address;
                        }
                    });
                });
            }
        }
    },
    order: {
        template: `
                <div class="item item-order" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-orders">
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <span>{{ option.option_content }}：</span>
                                        <input class="" type="number" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" v-model="option.number">
                                        <span>{{ option.price * option.option_number }}</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        create: function () {
            for (let i = 0; i < this.options.length; i++) {
                if (this.answer[i]) {
                    this.answer[i].option_id = this.options[i].option_id;
                    this.answer[i].option_index = this.options[i].option_index;
                    this.answer[i].option_code = this.options[i].option_code;
                    this.answer[i].option_content = this.options[i].option_content;
                    this.answer[i].price = this.options[i].price;
                    this.answer[i].number = '';
                } else {
                    this.answer.push({
                        option_id: this.options[i].option_id,
                        option_index: this.options[i].option_index,
                        option_code: this.options[i].option_code,
                        option_content: this.options[i].option_content,
                        price: this.options[i].price,
                        number: ''
                    });
                }
            }
        },
        watch: {
            answer: {
                handler: function (value, old) {
                    let pass = 1;
                    for (let i = 0; i < value.length; i++) {
                        if (!value[i].number) {
                            pass = 0;
                        }
                    }
                    this.pass = pass;
                },
                deep: true
            }
        }
    },
    linkage: {
        template: `
                <div class="item item-linkage" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-select" v-for="question in sub_question">
                                <select :name="'item-' + id">
                                    <option value="">请选择</option>
                                    <option v-for="option in question.options" :value="option.option_id">{{ option.option_content }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        create: function () {
            for (let i = 0; i < this.sub_questions.length; i++) {
                if (this.answer[i]) {
                    this.answer[i].question_id = this.options[i].question_id;
                    this.answer[i].question_index = this.options[i].question_index;
                    this.answer[i].option = {
                        option_content: '',
                        option_id: ''
                    };
                } else {
                    this.answer.push({
                        question_id: this.options[i].question_id,
                        question_index: this.options[i].question_index,
                        option: {
                            option_content: '',
                            option_id: ''
                        }
                    });
                }
            }
        },
        answer: {
            handler: function (value, old) {
                let pass = 1;
                for (let i = 0; i < value.length; i++) {
                    if (!value[i].option.option_id) {
                        pass = 0;
                    }
                }
                this.pass = pass;
            },
            deep: true
        }
    },
    name: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = true;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    sex: {
        template: `
                <div class="item item-choice" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-options" v-if="config.layout.orientation === 'select'">
                                <select :name="'item-' + id">
                                    <option v-for="option in options" :value="option.option_id">{{ option.option_content }}</option>
                                </select>
                            </div>
                            <div class="item-options" v-else>
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    for (let i = 0; i < this.options.length; i++) {
                        if (parseInt(value.option_id) === this.options[i].option_id) {
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank) {
                                value.option_addition = answer_option.option_addition;
                            }
                        }
                    }
                    if (value.option_id !== '') {
                        this.pass += 1;
                    }
                },
                deep: true
            },
            pass: function (value, old) {
                if (value) {
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++) {
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++) {
                            if (this.id === display_logic.conditions[j].id) {
                                if (this.answer[0].option_id === display_logic.conditions[j].option) {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'checked';
                                } else {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'unchecked';
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++) {
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++) {
                            if (this.id === jump_logic.conditions[j].id) {
                                if (this.answer[0].option_id === jump_logic.conditions[j].option) {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'checked';
                                } else {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'unchecked';
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    age: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <input type="number">
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    company: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    department: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    address: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    email: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    telephone: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    },
    cellphone: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function (value, old) {
                    if (this.config.the_class === 'single') {
                        if (value[0].answer) {
                            this.pass += 1;
                        } else {
                            this.pass = 0;
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++) {
                            if (!value[i].answer) {
                                pass = 0;
                            }
                        }
                        this.pass = pass;
                    }
                },
                deep: true
            }
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (survey_template);

/***/ })

/******/ });