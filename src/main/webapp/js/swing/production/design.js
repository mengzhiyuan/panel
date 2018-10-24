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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/swing/design/design.js");
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

            for (let k = 0; k < to_send.questions.length; k++) {
                if (to_send.questions[k].type === 'pictures') {
                    let this_question = to_send.questions[k];

                    for (let n = 0; n < this_question.options.length; n++) {
                        if (this_question.options[n].picture_path === '') {
                            _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('请保证每个选项的图片均上传完毕', '#f56c6c');
                            return;
                        }
                    }
                }
            }
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
                        data.survey_id = _initial_survey__WEBPACK_IMPORTED_MODULE_1__["default"].survey_id = d[0].wj_id;
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
                    //find insert_before or insert_after
                    if (queue[i]) {
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2) {
                            continue; //if the midline height of queue[i] is higher than the drift, let's find the next
                        }
                    }
                    //finally, maybe we found the node to insert before
                    if (queue[i - 1]) {
                        //if the drift is located at the first row
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i - 1]).addClass('before-insert');
                        insert_before = $(queue[i - 1]); //the previous one is identified as the insert_before
                        insert_after = null; // we set the insert_after as null
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]); //the node we found is identified as the insert_after
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
                    //insert_before is existent, that means the drift isn't located at the first row
                    let index_before = workspace.questions[workspace.questions.mapping[insert_before.attr('ol_id').match(/item-(\d*)/)[1]]].index; // get the index of target_data in questions
                    if (index_target > index_before + 1) {
                        //if the location of the target have shifted front
                        for (let i = 0; i < workspace.questions.length; i++) {
                            //find the questions needed to change index in question array
                            if (workspace.questions[i].index > index_before && workspace.questions[i].index < index_target) {
                                workspace.questions[i].index += 1;
                            }
                        }
                        target_data.index = index_before + 1; //the index of the question we found need to increased by 1
                    } else if (index_target < index_before) {
                        for (let i = 0; i < workspace.questions.length; i++) {
                            if (workspace.questions[i].index <= index_before && workspace.questions[i].index > index_target) {
                                workspace.questions[i].index -= 1;
                            }
                        }
                        target_data.index = index_before + 1; //else the index of the question need to decreased by 1
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
                target_data.page = target_data.config.page = parseInt(target.parents('.page').attr('page_number'));
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
            if (options[i].option_id >= id) {
                id = options[i].option_id + 1;
            }
        }
        index = options.length + 1;
        option = {
            option_id: id,
            option_index: index,
            option_code: '',
            option_content: '',
            option_addition: '',
            scroll_open: false,
            scroll_initial: true
        };
        options.push(option);
        return option;
    },
    pushSubQuestion: function (the_class, sub_questions) {
        var id = 0,
            index,
            question;
        for (let i = 0; i < sub_questions.length; i++) {
            if (sub_questions[i].question_id >= id) {
                id = sub_questions[i].question_id + 1;
            }
        }
        index = sub_questions.length + 1;
        question = {
            question_id: id,
            question_index: index,
            the_class: the_class,
            question_content: '',
            scroll_open: false,
            scroll_initial: true
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

                    $.ajax({
                        url: functions.realPath + '/dataManagement/picture_upload',
                        type: 'post',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify({
                            image_data: imgFile
                        }),
                        async: true,
                        success: function (d) {
                            console.log(d);
                            option.picture_path = d[0].url;
                        },
                        error: function (e) {
                            console.log(e);
                            _alerting_js__WEBPACK_IMPORTED_MODULE_0__["default"].alertAntoRemove('上传图片未成功，请稍后再试', '#f56c6c');
                        }
                    });

                    // option.picture_path = imgFile;

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

/***/ "./js/swing/common/header.js":
/*!***********************************!*\
  !*** ./js/swing/common/header.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initial_survey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial-survey.js */ "./js/swing/common/initial-survey.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions.js */ "./js/swing/common/functions.js");
/* harmony import */ var _alerting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alerting.js */ "./js/swing/common/alerting.js");




const header = new Vue({
    el: '#header',
    data: {
        active_step: 'design', //当前步骤
        survey_id: _initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id, //问卷ID
        survey_number: _initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_number, //问卷编号
        survey_name: _initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_name, //问卷名称
        saved_name: _initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_name, //储存的问卷名称
        inputting: false, //问卷名是否处于编辑状态
        copy: _initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"]
    },
    methods: {
        goHome: function () {},
        goDesign: function (event) {
            event.preventDefault();
            sessionStorage.setItem('survey_id', this.survey_id);
            sessionStorage.setItem('survey_number', this.survey_number);
            sessionStorage.setItem('survey_name', this.survey_name);
            sessionStorage.setItem('publish_status', this.publish_status);
            document.location.href = './index.html';
        },
        goCollect: function (event) {
            event.preventDefault();
            sessionStorage.setItem('survey_id', this.survey_id);
            sessionStorage.setItem('survey_number', this.survey_number);
            sessionStorage.setItem('survey_name', this.survey_name);
            sessionStorage.setItem('publish_status', this.publish_status);
            document.location.href = './collect.html';
        },
        goStatistics: function (event) {
            event.preventDefault();
            sessionStorage.setItem('survey_id', this.survey_id);
            sessionStorage.setItem('survey_number', this.survey_number);
            sessionStorage.setItem('survey_name', this.survey_name);
            sessionStorage.setItem('publish_status', this.publish_status);
            document.location.href = './statistics.html';
        },
        editSurveyName: function (event) {
            let parent = $(event.target).parent();
            this.inputting = true;
            this.saved_name = this.survey_name;
            setTimeout(function () {
                parent.find('.edit').focus();
            }, 0);
        },
        presentSurveyName: function (event) {
            if (event.keyCode === 13) {
                this.inputting = false;
                if (this.survey_name !== this.saved_name) {
                    let result = _functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].changeSurveyName(this.survey_id, this.survey_name);
                    if (result) {
                        this.saved_name = this.survey_name;
                    } else {
                        this.survey_name = this.saved_name;
                        _alerting_js__WEBPACK_IMPORTED_MODULE_2__["default"].simpleAlert('网络错误，请稍后再试', '#f56c6c');
                    }
                }
            }
        }
    },
    watch: {
        copy: {
            handler: function (val, old) {
                if (val.survey_id) {
                    this.survey_id = val.survey_id;
                }
            },
            deep: true
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (header);

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

    // sessionStorage.removeItem('survey_id');
    // sessionStorage.removeItem('survey_number');
    // sessionStorage.removeItem('survey_name');
    // sessionStorage.removeItem('publish_status');
}
const initial = new Initialize();
/* harmony default export */ __webpack_exports__["default"] = (initial);

/***/ }),

/***/ "./js/swing/design/design.js":
/*!***********************************!*\
  !*** ./js/swing/design/design.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/header.js */ "./js/swing/common/header.js");
/* harmony import */ var _toolbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar.js */ "./js/swing/design/toolbar.js");
/* harmony import */ var _workspace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workspace.js */ "./js/swing/design/workspace.js");




/***/ }),

/***/ "./js/swing/design/item-template.js":
/*!******************************************!*\
  !*** ./js/swing/design/item-template.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _workspace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workspace */ "./js/swing/design/workspace.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/functions */ "./js/swing/common/functions.js");



const templates = {
    common: {
        choice: { //单选题
            template: `
                <div class="item item-choice" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name" v-html="name"></p>
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'choice',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    random_option: 'fixed',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        check: { //多选题
            template: `
                <div class="item item-check" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                        <input class="checkbox" type="checkbox" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'check',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    random_option: 'fixed',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        blank: { //填空题
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                <div class="multi-blank" v-if="config.the_class==='multi'">
                                    <p class="branch-blank">
                                         <label v-for="question in sub_questions" :for="'item-' + id + 'sub_question-' + question.question_id">
                                            <b>{{ question.question_content }}</b>
                                            <input :id="'item-' + id + 'sub_question-' + question.question_id" type="text">
                                         </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-branches" v-if="config.the_class==='multi'">
                                <p class="sub-question" v-for="question in sub_questions">
                                    <span class="question-ceiling"></span>
                                    <span class="question-shift glyphicon glyphicon-option-vertical" @mousedown="activeSubQuestionShift(question, $event)"></span>
                                    <span class="question-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendSubQuestion($event,question)" @blur="changeSubQuestionContent($event.target, question)"  v-html="question.question_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="question-delete glyphicon glyphicon-remove" @click="deleteSubQuestion($event.currentTarget,question)"></i>
                                    <span class="question-floor"></span>
                                </p>
                                <p class="about-sub-question">
                                    <span class="append-batch" @click="batchSubQuestion">批量添加</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">子问题引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '填空题',
                remark: '',
                type: 'blank',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeSubQuestionContent: function (target, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeSubQuestionContent(this, target, question);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendSubQuestion: function (event, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendSubQuestion(event, this, question);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchSubQuestion: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchSubQuestion(event, this);
                },
                deleteSubQuestion: function (target, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.sub_question')[0], question, this.sub_questions);
                },
                activeSubQuestionShift: function (question, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeSubQuestionShift(question, event, this.sub_questions);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        matrix: { //矩阵题
            template: `
                <div class="item item-matrix" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                            <span v-if="question.the_class==='matrix_choice'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="radio"></span>
                                            <span v-if="question.the_class==='matrix_check'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="checkbox"></span>
                                            <span v-if="question.the_class==='matrix_blank'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="text"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <table class="item-matrix">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th v-for="question in sub_questions" class="sub-question">
                                            <span class="question-content container rtf-container">
                                                <span class="rtf-target textarea" contenteditable="true" @blur="changeSubQuestionContent($event.target, question)"  v-html="question.question_content"></span>
							                    <span class="rtf">
								                    <i class="glyphicon glyphicon-picture" title="图片"></i>
								                    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							                    </span>
                                            </span>
                                            <span class="operate">
                                                <span class="trigger glyphicon glyphicon-triangle-bottom" @click="triggerSubQuestionOperate(question)"></span>
                                                <span class="menu" :class="{ 'open': question.scroll_open && !question.scroll_initial, 'close': !question.scroll_open && !question.scroll_initial }">
                                                <ul>
                                                    <li @click="deleteSubQuestion(question)">删除</li>
                                                    <li>
                                                        <select v-model="question.the_class" @change="changeSubQuestionClass(question)">
                                                            <option value="matrix_choice">矩阵单选</option>
										                    <option value="matrix_check">矩阵多选</option>
										                    <option value="matrix_blank">矩阵填空</option>
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" :checked="question.blank" @change="changeSubQuestionBlank($event, question)"><span>其他</span>
                                                    </li>
                                                </ul>
                                                </span>
                                            </span>
                                        </th>
                                        <th class="sub-question no-border">
                                            <span class="append glyphicon glyphicon-plus" @click="appendSubQuestion($event)"></span>
                                            <span class="append glyphicon glyphicon-menu-hamburger" @click="batchSubQuestion"></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="option in options">
                                        <th class="option">
                                            <span class="option-content container rtf-container">
                                            <span class="rtf-target textarea" contenteditable="true" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							                    <span class="rtf">
								                    <i class="glyphicon glyphicon-picture" title="图片"></i>
								                    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							                    </span>
                                            </span>
                                            <span class="operate">
                                                <span class="trigger glyphicon glyphicon-triangle-bottom" @click="triggerOptionOperate(option)"></span>
                                                <span class="menu" :class="{ 'open': option.scroll_open && !option.scroll_initial, 'close': !option.scroll_open && !option.scroll_initial }">
                                                <ul>
                                                    <li @click="deleteMatrixOption(option)">删除</li>
                                                </ul>
                                                </span>
                                            </span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th class="option no-border">
                                            <span class="append glyphicon glyphicon-plus" @click="appendOption($event)"></span>
                                            <span class="append glyphicon glyphicon-menu-hamburger" @click="batchOption"></span>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="about-sub-question">
                                    <span class="recommend">
                                        <span @click="stretch_recommend">子问题引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '矩阵题',
                remark: '',
                type: 'matrix',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    the_class: 'matrix_choice',
                    question_content: '第一子问题',
                    scroll_open: false,
                    scroll_initial: true
                }, {
                    question_id: 1,
                    question_index: 2,
                    the_class: 'matrix_choice',
                    question_content: '第二子问题',
                    scroll_open: false,
                    scroll_initial: true
                }],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    option_addition: '',
                    scroll_open: false,
                    scroll_initial: true
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    option_addition: '',
                    scroll_open: false,
                    scroll_initial: true
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'matrix_choice',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: '',
                    random_branch: '',
                    random_option_matrix: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                triggerSubQuestionOperate: function (question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerSubQuestionOperate(question);
                },
                triggerOptionOperate: function (option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerOptionOperate(option);
                },
                deleteMatrixSubQuestion: function (question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteMatrixSubQuestion(this.sub_questions, question);
                },
                deleteMatrixOption: function (option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteMatrixOption(this.options, option);
                },
                changeSubQuestionClass: function (question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeSubQuestionClass(question);
                },
                changeSubQuestionBlank: function (event, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeSubQuestionBlank(event, question);
                },
                changeSubQuestionContent: function (target, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeSubQuestionContent(this, target, question);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                appendSubQuestion: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].pushSubQuestion(this.config.the_class, this.sub_questions);
                },
                appendOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].pushOption(this.options);
                },
                batchSubQuestion: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchSubQuestion(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                deleteSubQuestion: function (target, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.sub_question')[0], question, this.sub_questions);
                },
                activeSubQuestionShift: function (question, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeSubQuestionShift(question, event, this.sub_questions);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            },
            watch: {
                'config.the_class': {
                    handler: function (value, old) {
                        for (let i = 0; i < this.sub_questions.length; i++) {
                            this.sub_questions[i].the_class = value;
                        }
                    },
                    deep: true
                }
            }
        },
        score: { //打分题
            template: `
                <div class="item item-score" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="option-label">
                                <span class="left-label" v-html="config.left_label"></span>
                                <span class="right-label" v-html="config.right_label"></span>
                            </div>
                            <div class="item-options">
                                <p class="option score" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label class="score" :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'score',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '1',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '2',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 2,
                    option_index: 3,
                    option_code: '',
                    option_content: '3',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 3,
                    option_index: 4,
                    option_code: '',
                    option_content: '4',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 4,
                    option_index: 5,
                    option_code: '',
                    option_content: '5',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'horizon',
                        cols_number: 5,
                        width_percent: '20%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    style: 'number',
                    min_score: '',
                    max_score: '',
                    credit: 'satisfaction',
                    left_label: '非常不满意',
                    right_label: '非常满意'
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        sort: { //排序题
            template: `
                <div class="item item-sort" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'sort',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                sorting: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    style: 'number',
                    sorting_method: 'inputting',
                    min_score: '',
                    max_score: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                activeSortingShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeSortingShift(option, event, this.sorting, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            },
            watch: {
                options: {
                    handler: function (val) {
                        this.sorting = val;
                    },
                    deep: true
                }
            }
        },
        pictures: { //图片选择题
            template: `
                <div class="item item-pictures" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <img :src="option.picture_path" :title="option.option_content" v-if="option.picture_path">
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <input type="text" class="rtf-target textarea" @focus="autoAppendOption($event,option)" v-model="option.option_content">
                                        <span class="file-container textarea" @click="activeUpload">
                                            <span class="file-label">{{ option.option_url }}</span>
                                            <input :id="'item' + id + '-picture' + option.option_id" type="file" @change="changeOptionUrl($event,option)">
                                        </span>
							            <!--<span class="rtf">-->
								            <!--<i class="glyphicon glyphicon-picture" title="图片"></i>-->
								            <!--<i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>-->
							            <!--</span>-->
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'pictures',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    option_url: '点击添加图片',
                    picture_path: '',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    option_url: '点击添加图片',
                    picture_path: '',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    style: 'number',
                    min_score: '',
                    max_score: '',
                    credit: 'satisfaction'
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                activeUpload: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeUpload(event);
                },
                changeOptionUrl: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionUrl(event, option);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        description: { //描述说明题
            template: `
                <div class="item item-description" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'description',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    style: 'number',
                    min_score: '',
                    max_score: '',
                    credit: 'satisfaction'
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        paging: { //分页
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {}
        },
        break: { //分节
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {}
        }
    },
    advanced: {
        upload: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="restrict">
                                <p class="restrict-all">
                                    <label>
                                        <input type="checkbox" :checked="config.restrict.all" @change="changeSuperRestrict">
                                        <span>限制文件类型</span>
                                    </label>
                                </p>
                                <p>
                                    <b>图片文件</b>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.all" @change="changeMiddleRestrict($event,'image')">
                                        <span>全选</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.gif" @change="changeMinorRestrict($event,'image','gif')">
                                        <span>.gif</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.png" @change="changeMinorRestrict($event,'image','png')">
                                        <span>.png</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.jpg" @change="changeMinorRestrict($event,'image','jpg')">
                                        <span>.jpg</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.jpeg" @change="changeMinorRestrict($event,'image','jpeg')">
                                        <span>.jpeg</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.bmp" @change="changeMinorRestrict($event,'image','bmp')">
                                        <span>.bmp</span>
                                    </label>
                                </p>
                                <p>
                                    <b>文档文件</b>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.all" @change="changeMiddleRestrict($event,'document')">
                                        <span>全选</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.doc" @change="changeMinorRestrict($event,'document','doc')">
                                        <span>.doc</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.docx" @change="changeMinorRestrict($event,'document','docx')">
                                        <span>.docx</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.pdf" @change="changeMinorRestrict($event,'document','pdf')">
                                        <span>.pdf</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.xls" @change="changeMinorRestrict($event,'document','xls')">
                                        <span>.xls</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.xlsx" @change="changeMinorRestrict($event,'document','xlsx')">
                                        <span>.xlsx</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.ppt" @change="changeMinorRestrict($event,'document','ppt')">
                                        <span>.ppt</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.pptx" @change="changeMinorRestrict($event,'document','pptx')">
                                        <span>.pptx</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.txt" @change="changeMinorRestrict($event,'document','txt')">
                                        <span>.txt</span>
                                    </label>
                                </p>
                                <p>
                                    <b>压缩文件</b>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.all" @change="changeMiddleRestrict($event,'compressed')">
                                        <span>全选</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.rar" @change="changeMinorRestrict($event,'compressed','rar')">
                                        <span>.rar</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.zip" @change="changeMinorRestrict($event,'compressed','zip')">
                                        <span>.zip</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.gzip" @change="changeMinorRestrict($event,'compressed','gzip')">
                                        <span>.gzip</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '文件上传题',
                remark: '',
                type: 'upload',
                editing: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    restrict: {
                        all: true,
                        image: {
                            all: true,
                            gif: true,
                            png: true,
                            jpg: true,
                            jpeg: true,
                            bmp: true
                        },
                        document: {
                            all: true,
                            doc: true,
                            docx: true,
                            pdf: true,
                            xls: true,
                            xlsx: true,
                            ppt: true,
                            pptx: true,
                            txt: true
                        },
                        compressed: {
                            all: true,
                            rar: true,
                            zip: true,
                            gzip: true
                        }
                    },
                    class: 'single',
                    neck_initial: true,
                    func_display: false,
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeSubQuestionContent: function (target, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeSubQuestionContent(this, target, question);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeSuperRestrict: function (event) {
                    let bool = $(event.currentTarget).prop('checked');
                    this.config.restrict.all = bool;
                    for (let k in this.config.restrict.image) {
                        this.config.restrict.image[k] = bool;
                    }
                    for (let k in this.config.restrict.document) {
                        this.config.restrict.image[k] = bool;
                    }
                    for (let k in this.config.restrict.compressed) {
                        this.config.restrict.image[k] = bool;
                    }
                },
                changeMiddleRestrict: function (event, type) {
                    let bool = $(event.currentTarget).prop('checked');
                    for (let k in this.config.restrict[type]) {
                        this.config.restrict[type][k] = bool;
                    }
                },
                changeMinorRestrict: function (event, type, sub_type) {
                    this.config.restrict[type][sub_type] = $(event.currentTarget).prop('checked');
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            },
            watch: {
                'config.restrict': {
                    handler: function (value, old) {
                        let all = true;
                        for (let k in value) {
                            if (k !== 'all') {
                                let flag = true;
                                for (let h in value[k]) {
                                    if (h !== 'all') {
                                        if (!value[k][h]) {
                                            flag = false;
                                            break;
                                        }
                                    }
                                }
                                value[k].all = flag;
                                if (!value[k].all) {
                                    all = false;
                                    break;
                                }
                            }
                        }
                        value.all = all;
                    },
                    deep: true
                }
            }
        },
        geolocation: {
            template: `
                <div class="item item-choice">
                    <div class="present" v-show="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="map" :id=" 'map-' + id"></div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-show="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '定位题',
                remark: '',
                type: 'geolocation',
                logic: { jump: [], display: [] },
                editing: false,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    map_obj: {}
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeSubQuestionContent: function (target, question) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeSubQuestionContent(this, target, question);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                initialDefault: function () {
                    let self = this;
                    function onComplete() {}
                    function onError() {}
                    let map_obj = new AMap.Map('map-' + self.id);
                    map_obj.plugin('AMap.Geolocation', function () {
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
                        map_obj.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
                        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
                    });
                },
                initialManual: function () {
                    let self = this;
                    let map_obj = new AMap.Map('map-' + self.id);
                    let marker = new AMap.Marker({
                        position: map_obj.getCenter(),
                        draggable: true,
                        cursor: 'move',
                        raiseOnDrag: false,
                        zIndex: 101
                    });
                    marker.setMap(self.config.map_obj);

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
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        // pictures: {
        //     template: `
        //         <div class="item item-choice">
        //             <div class="item-head">
        //                 <i class="index">
        //                     <b class="present"></b>
        //                     <input type="text" class="edit">
        //                 </i>
        //             </div>
        //             <div class="control"></div>
        //         </div>
        //     `,
        //     data: {
        //
        //     }
        // },
        vote: {
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {}
        },
        nps: {
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {}
        },
        proportion: {
            template: `
                <div class="item item-choice">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <div class="multi-blank">
                                    <p class="branch-blank">
                                         <label v-for="question in sub_questions" :for="'item-' + id + 'sub_question-' + question.question_id">
                                            <b>{{ question.question_content }}</b>
                                            <input :id="'item-' + id + 'sub_question-' + question.question_id" type="text">
                                         </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-branches">
                                <p class="sub-question" v-for="question in sub_questions">
                                    <span class="question-ceiling"></span>
                                    <span class="question-shift glyphicon glyphicon-option-vertical" @mousedown="activeSubQuestionShift(question, $event)"></span>
                                    <span class="question-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendSubQuestion($event,question)" @blur="changeSubQuestionContent($event.target, question)"  v-html="question.question_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="question-delete glyphicon glyphicon-remove" @click="deleteSubQuestion($event.currentTarget,question)"></i>
                                    <span class="question-floor"></span>
                                </p>
                                <p class="about-sub-question">
                                    <span class="append-batch" @click="batchSubQuestion">批量添加</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">子问题引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '比重题',
                remark: '',
                type: 'proportion',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }, {
                    question_id: 1,
                    question_index: 2,
                    question_content: '第二子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            }
        },
        random: {
            template: `
                <div class="item item-random" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <div class="name-branches">
                                <p class="item-name">{{ name }}</p>
                            </div>
                        </div>
                        <div class="item-chest">
                            <p class="item-description"></p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-branches">
                                <div class="description">
                                    <p class="description">
                                        <input type="text">
                                    </p>
                                    <p class="container rtf-container">
                                        <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
                                        <span class="rtf">
                                            <i class="glyphicon glyphicon-picture" title="图片"></i>
                                            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
                                        </span>
                                    </p>
                                    <i class="delete"></i>
                                </div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'choice',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    random_option: 'fixed',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        order: {
            template: `
                <div class="item item-order" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <input type="text" class="rtf-target textarea" @focus="autoAppendOption($event,option)" v-model="option.option_content">
                                        <input type="number" class="textarea" v-model="option.price">
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'pictures',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '第一项',
                    option_number: '',
                    price: 0
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '第二项',
                    option_number: '',
                    price: 0
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    style: 'number',
                    min_score: '',
                    max_score: '',
                    credit: 'satisfaction'
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                autoAppendOption: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].autoAppendOption(event, this, option);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                batchOption: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].batchOption(event, this);
                },
                deleteOption: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOption($(target).parents('.option')[0], option, this.options);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                activeUpload: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeUpload(event);
                },
                changeOptionUrl: function (event, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionUrl(event, option);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        linkage: {
            template: `
                <div class="item item-linkage" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="col-line" v-for="question in sub_question">
                                <div class="row-line" v-for="option in question.options" v-if="option.sup_question_index === -1 || option.sup_id === sub_question[question.question_id - 1].checked">
                                    <input type="text" class="row-input" v-model="option.option_content">
                                    <i class="glyphicon glyphicon-arrow-right" :checked="{ option.option_id === question.checked }" @click="changeCheck(question,option)"></i>
                                </div>
                                <div class="row-line" @click="addRow(question)"><i class="glyphicon glyphicon-plus"></i></div>
                            </div>
                            <div class="col-line" @click="addCol"><i class="glyphicon glyphicon-plus"></i></div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '',
                remark: '',
                type: 'choice',
                logic: { jump: [], display: [] },
                editing: false,
                sub_question: [{
                    checked: 0,
                    question_id: 0,
                    question_index: 1,
                    options: [{
                        option_content: '',
                        option_id: 0,
                        sup_question_index: -1,
                        sup_id: -1
                    }, {
                        option_content: '',
                        option_id: 1,
                        sup_question_index: -1,
                        sup_id: -1
                    }]
                }, {
                    checked: 0,
                    question_id: 1,
                    question_index: 2,
                    options: [{
                        option_content: '',
                        option_id: 0,
                        sup_question_index: 0,
                        sup_id: 0
                    }, {
                        option_content: '',
                        option_id: 1,
                        sup_question_index: 0,
                        sup_id: 0
                    }, {
                        option_content: '',
                        option_id: 2,
                        sup_question_index: 0,
                        sup_id: 1
                    }, {
                        option_content: '',
                        option_id: 3,
                        sup_question_index: 0,
                        sup_id: 1
                    }]
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    random_option: 'fixed',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                addRow: function (question) {
                    let id = 0;
                    for (let i = 0; i < question.options.length; i++) {
                        if (question.options[i].id > id) {
                            id = question.options[i].id;
                        }
                    }
                    question.options.push({
                        option_content: '',
                        option_id: id + 1,
                        sup_question_index: this.sub_questions[question.question_id - 1].question_index,
                        sup_id: this.sub_questions[question.question_id - 1].checked
                    });
                },
                addCol: function () {
                    let id = 0,
                        index = 0;
                    for (let i = 0; i < this.sub_question.length; i++) {
                        if (this.sub_question[i].id > id) {
                            id = this.sub_question[i].id;
                        }
                        if (this.sub_question[i].index > index) {
                            index = this.sub_question[i].index;
                        }
                    }
                    this.sub_question.push({
                        checked: 0,
                        question_id: id + 1,
                        question_index: index + 1,
                        options: [{
                            option_content: '',
                            option_id: 0,
                            sup_question_index: this.sub_questions[question.question_id - 1].question_index,
                            sup_id: this.sub_questions[question.question_id - 1].checked
                        }]
                    });
                },
                changeCheck: function (question, option) {
                    question.checked = option.option_id;
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        }
    },
    quick: {
        name: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的姓名：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        sex: {
            template: `
                <div class="item item-choice" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
                                    </span>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请选择您的性别：',
                remark: '',
                type: 'choice',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                options: [{
                    option_id: 0,
                    option_index: 1,
                    option_code: '',
                    option_content: '男性',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }, {
                    option_id: 1,
                    option_index: 2,
                    option_code: '',
                    option_content: '女性',
                    checked: false,
                    mutex: false,
                    blank: false,
                    option_addition: ''
                }],
                // uuu: 0,
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    random_option: 'fixed',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                changeOptionContent: function (target, option) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeOptionContent(this, target, option);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                activeOptionShift: function (option, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeOptionShift(option, event, this.options);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                settingOptions: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].settingOptions(event, this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        age: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的年龄：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        company: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的工作单位：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                activeSubQuestionShift: function (question, event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeSubQuestionShift(question, event, this.sub_questions);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        department: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的工作部门：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        ID_card: {
            template: ``,
            data: {}
        },
        pcc: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <select class="province"><option value="">请选择</option></select>
                            <select class="city"><option value="">请选择</option></select>
                            <select class="district"><option value="">请选择</option></select>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请选择省份、城市以及区县：',
                remark: '',
                type: 'pcc',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        address: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的地址：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        email: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的电子邮箱：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        telephone: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的电话号码：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        cellphone: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: '',
                name: '请输入您的手机号码：',
                remark: '',
                type: 'name',
                logic: { jump: [], display: [] },
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题'
                }],
                recommend_stretched: false,
                collected: 0,
                config: {
                    exist: true,
                    page_now: 1,
                    required: true,
                    neck: false,
                    the_class: 'single',
                    neck_initial: true,
                    func_display: false,
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    recommend: {
                        bool: false,
                        recommended: ''
                    },
                    restrict: 'none',
                    number: '',
                    min_word: '',
                    max_word: '',
                    post: ''
                }
            },
            methods: {
                // activeEdit: function(event){
                //     functions.activeEdit(event,workspace)
                // },
                switchEdit: function (event) {
                    event.stopPropagation();
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchEdit(this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                    // this.activeEdit(event);
                },
                rtfEdit: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
                },
                changeContent: function (target, key) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
                },
                closeEditor: function (event, curtain, employer) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
                },
                preventClose: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
                },
                switchNeck: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchNeck(this);
                },
                activeShift: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].activeShift(event, this, _workspace__WEBPACK_IMPORTED_MODULE_0__["default"]);
                },
                switchFunc: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].switchFunc(event, this);
                },
                stretch_recommend: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].stretch_recommend(this);
                },
                triggerCollect: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].triggerCollect(event, this);
                },
                deleteItem: function (event) {
                    _common_functions__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(event, this);
                }
            }
        },
        education: {
            template: ``,
            data: {}
        },
        industry: {
            template: ``,
            data: {}
        },
        grade: {
            template: ``,
            data: {}
        },
        experiment: {
            template: ``,
            data: {}
        },
        working_year: {
            template: ``,
            data: {}
        },
        commonly: {
            template: ``,
            data: {}
        },
        industry_evasion: {
            template: ``,
            data: {}
        },
        time: {
            template: ``,
            data: {}
        },
        date: {
            template: ``,
            data: {}
        },
        other: {}
    }
};

/* harmony default export */ __webpack_exports__["default"] = (templates);

/***/ }),

/***/ "./js/swing/design/toolbar.js":
/*!************************************!*\
  !*** ./js/swing/design/toolbar.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/initial-survey.js */ "./js/swing/common/initial-survey.js");
/* harmony import */ var _common_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/functions.js */ "./js/swing/common/functions.js");
/* harmony import */ var _common_alerting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/alerting.js */ "./js/swing/common/alerting.js");
/* harmony import */ var _workspace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./workspace.js */ "./js/swing/design/workspace.js");





const toolbar = new Vue({
    el: '#toolbar',
    data: {
        survey_id: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id, //问卷ID
        publish_status: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].publish_status //问卷发布状态（是否发布）
    },
    methods: {
        togglePublish: function () {
            let result = _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].togglePublish(this.publish_status);
            if (result === this.publish_status) {
                _common_alerting_js__WEBPACK_IMPORTED_MODULE_2__["default"].simpleAlert('网络错误，请稍后再试', '#f56c6c');
            }
        },
        editLogic: function (event, entry) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].editLogic(event, _workspace_js__WEBPACK_IMPORTED_MODULE_3__["default"], entry);
        },
        switchLeftSide: function (string) {
            _workspace_js__WEBPACK_IMPORTED_MODULE_3__["default"].status.left_side = string;
        },
        previewQuestionnaire: function () {
            sessionStorage.setItem('survey_id', _workspace_js__WEBPACK_IMPORTED_MODULE_3__["default"].survey_id);
            window.open('./preview.html');
        },
        printQuestionnaire: function () {
            sessionStorage.setItem('survey_id', _workspace_js__WEBPACK_IMPORTED_MODULE_3__["default"].survey_id);
            sessionStorage.setItem('way', 'print');
            window.open('./preview.html');
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (toolbar);

/***/ }),

/***/ "./js/swing/design/workspace.js":
/*!**************************************!*\
  !*** ./js/swing/design/workspace.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/initial-survey.js */ "./js/swing/common/initial-survey.js");
/* harmony import */ var _common_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/functions.js */ "./js/swing/common/functions.js");
/* harmony import */ var _common_alerting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/alerting.js */ "./js/swing/common/alerting.js");
/* harmony import */ var _item_template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item-template.js */ "./js/swing/design/item-template.js");
/* harmony import */ var _toolbar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolbar.js */ "./js/swing/design/toolbar.js");






function appendItem($this, event, level, type, id) {

    if (type === 'paging') {
        _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].appendPage($this);
        return;
    }

    let container = $('#items'),
        item = $(_item_template_js__WEBPACK_IMPORTED_MODULE_3__["default"][level][type].template),
        $this_data,
        $this_methods = _item_template_js__WEBPACK_IMPORTED_MODULE_3__["default"][level][type].methods,
        watcher_part,
        watcher,
        $this_vue,
        page = $this.status.page,
        breaking = $this.status.break;

    if (id !== undefined) {
        let index = $this.questions.mapping[id];
        $this_data = $this.questions[index];
        $this_data.type = type;
        $this_vue = $this.vues[index];
    } else {
        let last_number_prefix = '',
            last_number_integer = '';

        if ($this.questions[0]) {
            let last_index = -1,
                last_number;
            for (let i = 0; i < $this.questions.length; i++) {
                if ($this.questions[i].index > last_index) {
                    last_index = $this.questions[i].index;
                    last_number = $this.questions[i].number;
                }
            }
            last_number_prefix = last_number.match(/([A-z]*)\d*/)[1];
            last_number_integer = parseInt(last_number.match(/[A-z]*(\d*)/)[1]);
        }

        $this_data = $this.questions.push(JSON.parse(JSON.stringify(_item_template_js__WEBPACK_IMPORTED_MODULE_3__["default"][level][type].data)));
        if (_item_template_js__WEBPACK_IMPORTED_MODULE_3__["default"][level][type].watch) {
            watcher_part = _item_template_js__WEBPACK_IMPORTED_MODULE_3__["default"][level][type].watch;
        }
        $this_data.number = last_number_integer ? last_number_prefix + (last_number_integer + 1) : '1';
        $this_data.site_questions = $this.questions;
        $this_data.index = $this.questions.length;
        $this_data.numbering = false;
        $this_data.config.page = $this_data.config.page_now = $this_data.page = page;
        $this_data.config.break = breaking;
    }
    item.attr('id', 'item-' + $this_data.id);
    if (id !== undefined) {
        let to_replace = $('#item-' + id);
        item.insertBefore(to_replace);
        to_replace.remove();
        to_replace = null;
    } else {
        container.append(item);
    }
    watcher = {
        'id': {
            handler: function () {
                // $this.save()
            },
            deep: true
        },
        'number': {
            handler: function () {
                $this.save('insert', 'question', $this_data.id);
            },
            deep: true
        },
        'name': {
            handler: function () {
                $this.save('insert', 'question', $this_data.id);
            },
            deep: true
        },
        'remark': {
            handler: function () {
                $this.save('insert', 'question', $this_data.id);
            },
            deep: true
        },
        'type': {
            handler: function () {
                $this.save('insert', 'question', $this_data.id);
            },
            deep: true
        },
        'options': {
            handler: function () {
                $this.save('insert', 'question', $this_data.id);
            },
            deep: true
        },
        'config': {
            handler: function () {
                $this.save('insert', 'question', $this_data.id);
            },
            deep: true
        },
        'config.recommend.recommended': {
            handler: function (value) {
                $this.recommend_stretched = false;
                if (value) {
                    $this.recommend.bool = true;
                }
            },
            deep: true
        },
        'config.the_class': function (value) {
            if (this.type === 'matrix') {
                for (let i = 0; i < this.sub_questions.length; i++) {
                    this.sub_questions.the_class = value;
                }
            }
        },
        'config.mode': function (value) {
            let id = 'map-' + $this.id;
        }
    };
    if (watcher_part) {
        for (let k in watcher_part) {
            watcher[k] = watcher_part[k];
        }
    }

    $this_vue = new Vue({
        el: '#item-' + $this_data.id,
        data: $this_data,
        methods: $this_methods,
        watch: watcher,
        mounted: function () {
            $this.E = window.wangEditor;
            if (type === 'geolocation') {
                this.initialDefault();
            } else if (type === 'pcc') {
                let this_node = $('#item-' + $this_data.id);
                function chainReact() {
                    var len = provinces.length,
                        str = "",
                        i;
                    for (i = 0; i < len; i++) {
                        str += '<option pro_id="' + provinces[i]["ProID"] + '">' + provinces[i]["name"] + '</option>';
                    }
                    this_node.find(".province").append(str);

                    function provincesChange(event) {
                        var pro_id = $(this).find(":selected").attr("pro_id"),
                            str = "",
                            len = cities.length,
                            i;
                        for (i = 0; i < len; i++) {
                            if (cities[i]["ProID"] == pro_id) {
                                str += '<option city_id=" ' + cities[i]["CityID"] + '">' + cities[i]["name"] + '</option>';
                            }
                        }
                        this_node.find(".city").find("option:not(':first-child')").remove().end().append(str);
                        this_node.find(".district").find("option:not(':first-child')").remove();
                    }

                    function citiesChange(event) {
                        var city_id = $(this).find(":selected").attr("city_id"),
                            str = "",
                            len = districts.length,
                            i;

                        for (i = 0; i < len; i++) {
                            if (districts[i]["CityID"] == city_id) {
                                str += '<option id="' + districts[i]["Id"] + '">' + districts[i]["DisName"] + '</option>';
                            }
                        }
                        this_node.find(".district").find("option:not(':first-child')").remove().end().append(str);
                    }

                    this_node.find(".province").on("change", provincesChange);
                    this_node.find(".city").on("change", citiesChange);
                }
                chainReact();
            }
        }
    });
    $this_vue.id = $this_data.id;
    if (id === undefined) {
        $this.vues.push($this_vue);
    }
    $this.save('insert', 'question', $this_data.id);
    document.getElementById('item-' + $this_data.id).scrollIntoView(false);
}

const workspace = new Vue({
    el: '#workspace',
    data: {
        usr_email: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email, //登录邮箱
        survey_id: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id, //问卷ID
        sub_id: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id,
        survey_number: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_number, //问卷编号
        survey_name: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_name, //问卷名称
        survey_remark: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].survey_remark,
        logic: {
            display_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: { 0: {} },
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }],
            jump_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: { 0: {} },
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }]
        },
        saved_logic: {
            display_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: { 0: {} },
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }],
            jump_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: { 0: {} },
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }]
        },
        style: {
            theme_array: [{
                id: 9,
                checked: false,
                class_name: 'theme-9',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 8,
                checked: false,
                class_name: 'theme-8',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 7,
                checked: true,
                class_name: 'theme-7',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 6,
                checked: false,
                class_name: 'theme-6',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 5,
                checked: false,
                class_name: 'theme-5',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 4,
                checked: false,
                class_name: 'theme-4',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 3,
                checked: false,
                class_name: 'theme-3',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 2,
                checked: false,
                class_name: 'theme-2',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 1,
                checked: false,
                class_name: 'theme-1',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }, {
                id: 0,
                checked: false,
                class_name: 'theme-0',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            }],
            checked_theme: {
                id: 7,
                checked: true,
                class_name: 'theme-7',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            },
            checked_theme_name: 7
        },
        vues: new _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].NewArray(),
        pages: [1],
        questions: new _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].NewArray(),
        item_bank: [{
            id: 1,
            name: '某题0001',
            type: ''
        }, {
            id: 2,
            name: '某题0002',
            type: ''
        }, {
            id: 3,
            name: '某题0003',
            type: ''
        }, {
            id: 4,
            name: '某题0004',
            type: ''
        }, {
            id: 5,
            name: '某题0005',
            type: ''
        }, {
            id: 6,
            name: '某题0006',
            type: ''
        }],
        status: {
            page: 1,
            page_array: [1],
            break: 1,
            break_array: [1],
            citing: false,
            initial: true,
            left_side: 'item-types',
            editing: {
                proto: {},
                id: '',
                type: '',
                saved_type: '',
                class: '',
                options: [],
                option_indexes: [],
                option_scores: [],
                config: {
                    exist: true,
                    collected: false,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    required: true,
                    type: '',
                    sorting_method: '',
                    class: '',
                    restrict: 'none',
                    number: 'none',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    random_option: 'fixed',
                    min_option: 1,
                    max_option: 1,
                    min_word: 1,
                    max_word: 1,
                    post: '',
                    matrix_recommend: false,
                    recommend_question: '',
                    random_branch: false,
                    random_option_matrix: false,
                    transpose: false,
                    style: '',
                    min_score: 1,
                    max_score: 1,
                    credit: '',
                    left_label: '',
                    right_label: '',
                    total: 0,
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            }
        }
    },
    methods: {
        E: function () {},
        save: function (type, key, id) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].save(this, type, key, id);
        },
        changeContent: function (target, key) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].changeContent(target, this, key);
        },
        switchItemType: function (event, number) {
            let container = $('#item_type'),
                first = $('#common_type'),
                second = $('#advanced_type'),
                third = $('#quick_type');
            switch (number) {
                case 1:
                    if (!second.is(':animated')) {
                        second.animate({ top: '390px' }, 300);
                        third.animate({ top: '390px' }, 300);
                    }
                    break;
                case 2:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '390px' }, 300);
                    }
                    break;
                case 3:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '0px' }, 300);
                    }
                    break;
            }
        },
        switchStyleBar: function (event, number) {
            let container = $('#style'),
                first = $('#theme'),
                second = $('#customize'),
                third = $('#more-setting');
            switch (number) {
                case 1:
                    if (!second.is(':animated')) {
                        second.animate({ top: '390px' }, 300);
                        third.animate({ top: '390px' }, 300);
                    }
                    break;
                case 2:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '390px' }, 300);
                    }
                    break;
                case 3:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '0px' }, 300);
                    }
                    break;
            }
        },
        closeEditor: function (event, curtain, employer) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].closeEditor(event, curtain, employer);
        },
        preventClose: function (event) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].preventClose(event);
        },
        rtfEdit: function (event) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].rtfEdit(event, this);
        },
        insertPicture: function () {},
        triggerCiting: function () {
            this.status.citing = !this.status.citing;
            if (this.status.citing) {
                //查询收藏题库
                $.ajax({
                    url: _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].realPath + '/survey/collection_search',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify({
                        usr_email: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email
                    }),
                    success: function (d) {
                        self.item_bank = [];
                        for (let i = 0; i < d[0].result.length; i++) {
                            self.item_bank.push({
                                id: '',
                                sub_id: d[0].result[i].subId,
                                index: d[0].result[i].subIndex,
                                number: '',
                                name: d[0].result[i].subName,
                                remark: d[0].result[i].subRemark,
                                type: d[0].result[i].subType,
                                page: d[0].result[i].subPage,
                                config: d[0].result[i].subConfig,
                                option: d[0].result[i].subOption,
                                question: d[0].result[i].subQuestions

                            });
                        }
                    },
                    error: function (e) {}
                });
            }
            if (this.status.initial) {
                this.status.initial = false;
                let self = this;
                this.triggerCiting = function () {
                    self.status.citing = !self.status.citing;
                    if (this.status.citing) {
                        //查询收藏题库
                        $.ajax({
                            url: _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].realPath + '/survey/collection_search',
                            type: 'post',
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            async: true,
                            data: JSON.stringify({
                                usr_email: _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email
                            }),
                            success: function (d) {
                                self.item_bank = [];
                                for (let i = 0; i < d[0].result.length; i++) {
                                    self.item_bank.push({
                                        id: '',
                                        sub_id: d[0].result[i].subId,
                                        index: d[0].result[i].subIndex,
                                        number: '',
                                        name: d[0].result[i].subName,
                                        remark: d[0].result[i].subRemark,
                                        type: d[0].result[i].subType,
                                        page: d[0].result[i].subPage,
                                        config: d[0].result[i].subConfig,
                                        option: d[0].result[i].subOption,
                                        question: d[0].result[i].subQuestions

                                    });
                                }
                            },
                            error: function (e) {}
                        });
                    }
                };
            }
        },
        citeItem: function (item) {},
        deleteItem: function (item) {},
        changeTranspose: function (event) {
            this.status.editing.config.transpose = !this.status.editing.config.transpose;
        },
        changeConfigRequired: function () {
            this.status.editing.config.required = !this.status.editing.config.required;
        },
        changeMatrixRecommend: function (target) {
            this.status.editing.config.matrix_recommend = $(target).prop('checked');
        },
        changeRandomBranch: function (target) {
            this.status.editing.config.random_branch = $(target).prop('checked');
        },
        changeRandomOptionMatrix: function (target) {
            this.status.editing.config.random_option_matrix = $(target).prop('checked');
        },
        editLogic: function (event, entry) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].editLogic(event, this, entry);
        },
        appendItem: function ($event, level, type) {
            appendItem(this, $event, level, type);
        },
        changeItemType: function () {
            let this_question = this.status.editing.proto,
                value = this.status.editing.type,
                old = this.status.editing.saved_type;
            if (old === 'choice') {
                if (value === 'check') {
                    if (this_question.config.layout.orientation === 'select') {
                        this_question.config.layout.orientation = 'portrait';
                    }
                    for (let i = 0; i < this_question.options.length; i++) {
                        this_question.options[i].mutex = false;
                    }
                }
            }
            if (value && old && value !== old) {
                appendItem(this, null, 'common', 'check', this.status.editing.id);
                this.status.editing.saved_type = this.status.editing.type;
            }
        },
        switchPage(page) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].switchPage(this, page);
        },
        appendPage: function () {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].appendPage(this);
        },
        deletePage: function (page) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].deletePage(this, page);
        },
        showEnd: function () {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].showEnd(this);
        },
        activeShiftOutline: function (event, question) {
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].activeShiftOutline(event, question, this);
        },
        pickTheme: function (theme) {
            for (let i = 0; i < this.style.theme_array.length; i++) {
                this.style.theme_array[i].checked = false;
            }
            theme.checked = true;
            // this.style.checked_theme = theme;
            // this.style.checked_theme_name = theme.id;
        },
        switchNumbering: function (event, item) {
            item.numbering = !item.numbering;
            if (item.numbering) {
                $(event.target).parent().find('.numbering')[0].focus();
            }
            event.stopPropagation();
        }
    },
    mounted: function () {
        let self = this;
        self.E = window.wangEditor;

        var filearr = [];
        var myfile = document.getElementById('logo-upload');
        myfile.onchange = function () {
            var files = self.files;
            for (var i = 0; i < files.length; i++) {
                filearr.push(files[i]);
            }

            var formData = new FormData();
            for (var i = 0; i < filearr.length; i++) {
                //提交时，我们把filearr中的数据遍历一遍
                formData.append("upfile[]", filearr[i]); //用append添加到formData中，就得用户最终要提交的图片了，多张的话[]必须
            }
            $.ajax({
                url: _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].realPath + '',
                type: "POST",
                data: formData,
                cache: false, //不设置缓存
                processData: false, // 不处理数据
                contentType: false // 不设置内容类型
            });
        };

        $('.pick-color').paigusu({
            color: '#85c8ff' //初始色  支持两种配置方案
            //		,color : '42,0,255'
        }, function (event, obj) {
            console.log(event);
            console.log(obj);
            // $(event).css('color','#' + obj.hex)
            // $('.workspace').addClass('customize');
            let str = 'rgba(' + obj.rgba + ')';

            self.style.checked_theme_name = 'customize';
            self.style.checked_theme.id = 'customize';
            self.style.checked_theme.class_name = 'customize';
            self.style.checked_theme.config.color_background = str;

            // setTimeout(function(){
            //     $('.theme-customize').css('background-color', str);
            // },0)

            // checked_theme: {
            //     id: 7,
            //         checked: true,
            //         class_name: 'theme-7',
            //         config: {
            //         logo: '',
            //             background: '',
            //             color_head: '',
            //             color_background: '',
            //             color_font: ''
            //     }
            // },
            // checked_theme_name: 7
        });

        $('#style_picture').on('change', function () {
            let fileInput = document.getElementById("style_picture");
            let file = fileInput.files[0];
            //创建读取文件的对象
            let reader = new FileReader();
            //创建文件读取相关的变量
            let imgFile;
            //为文件读取成功设置事件
            reader.onload = function (e) {
                // alert('文件读取完成');
                imgFile = e.target.result;
                console.log(imgFile);
                // $('.workspace').addClass('customize');
                self.style.checked_theme_name = 'customize';
                self.style.checked_theme.id = 'customize';
                self.style.checked_theme.class_name = 'theme-customize';

                $.ajax({
                    url: _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].realPath + '/dataManagement/picture_upload',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify({
                        image_data: imgFile
                    }),
                    async: true,
                    success: function (d) {
                        console.log(d);
                        self.style.checked_theme.config.background = imgFile;
                    },
                    error: function (e) {
                        console.log(e);
                        _common_alerting_js__WEBPACK_IMPORTED_MODULE_2__["default"].alertAntoRemove('上传图片未成功，请稍后再试', '#f56c6c');
                    }
                });

                setTimeout(function () {
                    $("#style_preview").attr('src', imgFile);
                    // $('.theme-customize').css('background-image', 'url(' + imgFile + ')')
                }, 0);
            };

            //正式读取文件
            reader.readAsDataURL(file);
        });

        // let reads= new FileReader(),
        //     f=document.getElementById('style_picture').files[0];
        // reads.readAsDataURL(f);
        // reads.onload=function (e) {
        //     document.getElementById('style_preview').src=this.result;
        // };
    },
    watch: {
        'status.editing.proto': {
            handler: function (value, old) {
                this.status.editing.id = value.id;
                this.status.editing.type = this.status.editing.saved_type = this.status.editing.config.type = value.type;
                for (let k in value.config) {
                    this.status.editing.config[k] = value.config[k];
                }
                if (value.options) {
                    this.status.editing.options = JSON.parse(JSON.stringify(value.options));
                    this.status.editing.option_indexes = [];
                    this.status.editing.option_scores = [];
                    for (let j = 1; j <= value.options.length; j++) {
                        this.status.editing.options.push(value.options[j - 1]);
                        this.status.editing.option_indexes.push(j);
                        if (value.type === 'score') {
                            this.status.editing.option_scores.push(value.options[j - 1].score);
                        }
                    }
                }
                // if (value.type === 'score'){
                //     let l = value.options.length;
                //     this.status.editing.config.layout.orientation = 'orientation';
                //     this.status.editing.config.layout.cols_number = l;
                //     for (let i = 0; i < l; i++){
                //         this.status.editing.option_scores.push(i + 1)
                //     }
                // }
            },
            deep: true
        },
        // 'status.editing.id': function(value,old){
        //     if (value){
        //         let options;
        //         for (let i = 0,l = this.questions.length; i < l; i++){
        //             if (this.questions[i].id === parseInt(value)){
        //                 let this_question = this.questions[i];
        //                 this.status.editing.type = this.status.editing.config.type = this_question.type;
        //
        //                 if (this_question.options){
        //                     options = this_question.options;
        //                     this.status.editing.options = [];
        //                     this.status.editing.option_indexes = [];
        //                     for (let j = 1; j <= options.length; j++){
        //                         this.status.editing.options.push(options[j-1]);
        //                         this.status.editing.option_indexes.push(j);
        //                         if (this_question.type === 'score'){
        //                             this.status.editing.option_scores.push(options[j-1].score);
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        'status.page': function (value) {
            // if (this.status.editing.proto.id){
            //     this.status.editing.proto.config.page_now = value
            // }
            for (let i = 0; i < this.questions.length; i++) {
                this.questions[i].config.page_now = value;
            }
        },
        'status.break': function (value) {
            for (let i = 0; i < this.questions.length; i++) {
                this.questions[i].config.break_now = value;
            }
        },
        'status.editing.config': {
            handler: function (value, old) {
                // if (value.layout.orientation === 'portrait'){
                //     value.layout.cols_number = 1
                // } else if (value.layout.orientation === 'select'){
                //
                // }
                // let this_config = this.questions[this.questions.mapping[this.status.editing.id]].config;
                let this_config = this.status.editing.proto.config;
                for (let k in this_config) {
                    this_config[k] = value[k];
                }
                // this.questions[this.questions.mapping[this.status.editing.id]].config = value
            },
            deep: true
        },
        // 'status.editing.type': function(value,old){
        //     let this_question = this.status.editing.proto;
        //     if (old==='choice'){
        //         if (value==='check'){
        //             if (this_question.config.layout.orientation === 'select'){
        //                 this_question.config.layout.orientation = 'portrait'
        //             }
        //             for (let i = 0; i < this_question.options.length; i++){
        //                 this_question.options[i].mutex = false
        //             }
        //         }
        //     }
        //     if (value && old && value !== old){
        //         appendItem(this,null,'common','check',this.status.editing.id)
        //     }
        // },
        'status.editing.config.layout': {
            handler: function (value, old) {
                if (value.orientation === 'horizon') {
                    value.width_percent = parseInt(100 / value.cols_number) + '%';
                } else {
                    value.cols_number = 1;
                    value.width_percent = '100%';
                }
            },
            deep: true
        },
        'status.editing.config.credit': function (value, old) {
            switch (value) {
                case '满意度':
                    this.editing.config.left_label = '非常不满意';
                    this.editing.config.right_label = '非常满意';
                    break;
                case '认同度':
                    this.editing.config.left_label = '非常不认同';
                    this.editing.config.right_label = '非常认同';
                    break;
                case '重要度':
                    this.editing.config.left_label = '非常不重要';
                    this.editing.config.right_label = '非常重要';
                    break;
                case '愿意度':
                    this.editing.config.left_label = '非常不愿意';
                    this.editing.config.right_label = '非常愿意';
                    break;
                case '符合度':
                    this.editing.config.left_label = '非常不符合';
                    this.editing.config.right_label = '非常符合';
                    break;
            }
        },
        'survey_id': function () {
            // this.save()
        },
        'survey_number': function () {
            // this.save()
        },
        'survey_name': function () {
            this.save('common', 'survey_name');
        },
        'survey_remark': function () {
            this.save('common', 'survey_remark');
        },
        'saved_logic': {
            handler: function () {
                if (this.saved_logic.jump_logic.length && this.saved_logic.display_logic.length) {
                    this.save('common', 'saved_logic');
                }
            },
            deep: true
        },
        'style': {
            handler: function () {
                let checked;
                for (let i = 0; i < this.style.theme_array.length; i++) {
                    if (this.style.theme_array[i].checked === true) {
                        checked = this.style.theme_array[i];
                    }
                }
                if (this.style.checked_theme_name !== 'customize') {
                    this.style.checked_theme_name = checked.id;
                    this.style.checked_theme = checked;
                }

                if (this.style.checked_theme.config.color_background) {
                    $('.workspace').css('background-color', this.style.checked_theme.config.color_background);
                }
                if (this.style.checked_theme.config.background) {
                    $('.workspace').css('background-image', 'url(' + this.style.checked_theme.config.background + ')');
                }

                this.save('common', 'style');
            },
            deep: true
        },
        'status': {
            handler: function () {
                // this.save()
            },
            deep: true
        }
    },
    computed: {}
});

/* harmony default export */ __webpack_exports__["default"] = (workspace);

/***/ })

/******/ });