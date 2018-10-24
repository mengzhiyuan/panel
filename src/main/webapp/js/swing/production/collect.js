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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/swing/collect/collect.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/swing/collect/collect.js":
/*!*************************************!*\
  !*** ./js/swing/collect/collect.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/initial-survey.js */ "./js/swing/common/initial-survey.js");
/* harmony import */ var _common_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/header.js */ "./js/swing/common/header.js");
/* harmony import */ var _collect_toolbar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../collect/toolbar.js */ "./js/swing/collect/toolbar.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.js */ "./js/swing/collect/settings.js");





/***/ }),

/***/ "./js/swing/collect/settings.js":
/*!**************************************!*\
  !*** ./js/swing/collect/settings.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/initial-survey */ "./js/swing/common/initial-survey.js");


var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const collect = new Vue({
    el: '#settings',
    data: {
        realPath: realPath,
        usr_email: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email, //登录邮箱
        survey_id: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id, //问卷ID,
        questions: [],
        survey_url: 'http://www.kolpanel.net/' + _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id,
        sub_id: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id,
        survey_number: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_number, //问卷编号
        survey_name: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_name, //问卷名称
        survey_remark: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_remark,
        share_status: 'copy-links',
        creating_link: false,
        link_number: 0,
        links: [],
        email: {
            host: 'common',
            host_address: '',
            port: '',
            email_account: '',
            email_password: '',
            signature: ''
        },
        restrict: {
            breakpoint_answer: false,
            progress_bar: false,
            rollback_progress: false,
            viewing_statistics: false,
            answer_time: 0,
            start_end_time: {
                star_time: '',
                end_time: ''
            },
            repeated_submission: false,
            user_resp: {
                equipment: false, //1一台设备  0其他
                wechat: false, //1一个微信用户  0 其他
                ip: false
            },
            display_number: false
        },
        quotas: {
            total_limit: {
                max_value: '20',
                min_value: '10'
            },
            quota_restriction: [{
                item: {},
                item_id: '',
                selected: '',
                min: 0,
                max: 0
            }]
        }
    },
    methods: {
        switchTo: function (status) {
            this.share_status = status;
        },
        switchItemType: function (event, number) {
            let container = $('#configs'),
                first = $('#set_quota'),
                second = $('#set_collect'),
                third = $('#manage_links'),
                forth = $('#reward');
            switch (number) {
                case 1:
                    if (!second.is(':animated')) {
                        second.animate({ top: '390px' }, 300);
                        third.animate({ top: '390px' }, 300);
                        forth.animate({ top: '390px' }, 300);
                    }
                    break;
                case 2:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '390px' }, 300);
                        forth.animate({ top: '390px' }, 300);
                    }
                    break;
                case 3:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '0px' }, 300);
                        forth.animate({ top: '390px' }, 300);
                    }
                    break;
                case 4:
                    if (!second.is(':animated')) {
                        second.animate({ top: '0px' }, 300);
                        third.animate({ top: '0px' }, 300);
                        forth.animate({ top: '0px' }, 300);
                    }
            }
        },
        copyLink: function () {
            let text = this.survey_url,
                container = document.createElement('input'),
                parent = document.getElementById('root');
            container.style.fontSize = '0px';
            parent.appendChild(container);
            container.value = text;
            container.select();
            document.execCommand('Copy');
            parent.removeChild(container);
        },
        beforeCreateLink: function () {
            this.creating_link = !this.creating_link;
        },
        createLink: function () {
            let self = this;
            $.ajax({
                url: self.realPath + '/survey/uniqueLink',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    survey_id: self.survey_id,
                    number: self.link_number
                }),
                async: true,
                success: function (d) {
                    self.links = d;
                    self.creating_link = false;
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },
        getLink: function () {
            let self = this;
            $.ajax({
                url: self.realPath + '/survey/listWjLinks',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    survey_id: self.survey_id,
                    usr_email: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email
                }),
                async: true,
                success: function (d) {
                    self.links = d;
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },
        changeItemName: function (target, quota) {
            quota.item_name = $(target).find('option:selected').attr('data_name');
        },
        changeSelectedContent: function (target, quota) {
            quota.selected_content = $(target).find('option:selected').attr('data_name');
        },
        switchBool: function (key, sub_key) {
            if (sub_key) {
                this.restrict[key][sub_key] = !this.restrict[key][sub_key];
            } else {
                this.restrict[key] = !this.restrict[key];
            }
        },
        switchHost: function (target) {
            this.email.host = target;
        },
        appendQuota: function () {
            this.quotas.quota_restriction.push({
                item: {},
                item_id: '',
                selected: '',
                min: 0,
                max: 0
            });
        },
        saveQuotas: function () {},
        saveSettings: function () {
            $.ajax({
                url: self.realPath + '/survey/configuringAmailbox',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    foxHairPiece: this.host_address,
                    foxAccountNumber: this.email_account,
                    foxPassword: this.email_password,
                    foxHairPort: this.port,
                    usr_email: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email
                }),
                success: function (d) {},
                error: function (e) {}
            });
            let to_send = {
                survey_id: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id,
                collection: [{
                    g_set_name: 'total_limit', //总数限制
                    g_set_value: {
                        min_value: this.quotas.total_limit.min_value,
                        max_value: this.quotas.total_limit.min_value

                    }
                }, {
                    g_set_name: 'quota_restriction', //配额限制
                    g_set_value: this.quotas.quota_restriction //值王向阳定
                }]
            };
            for (let k in this.restrict) {
                to_send.collection.push({
                    g_set_name: k,
                    g_set_value: this.restrict[k]
                });
            }
            $.ajax({
                url: self.realPath + '/survey/configuringAmailbox',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    foxHairPiece: this.host_address,
                    foxAccountNumber: this.email_account,
                    foxPassword: this.email_password,
                    foxHairPort: this.port,
                    usr_email: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email
                }),
                success: function (d) {},
                error: function (e) {}
            });
        }
    },
    mounted: function () {
        let self = this,
            qr = new QRCode($('#qr')[0], { width: 120, height: 120 }),
            text = self.survey_url;
        if (text) {
            qr.makeCode(text);
        }
        self.getLink();

        $.ajax({
            url: self.realPath + '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                survey_id: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].survey_id,
                usr_email: _common_initial_survey__WEBPACK_IMPORTED_MODULE_0__["default"].usr_email
            }),
            success: function (d) {
                let result = d[0];
                // let result = {
                //     total_limit:'1',    //总数限制   1放行0 不放行
                //     breakpoint_answer:'1',   ////1续答//0不续答
                //     progress_bar:'1',     //1显示进度条//0不显示进度条
                //     rollback_progress:'1',  //1显示上一页按钮//0不显示上一页按钮
                //     viewing_statistics:'1',  //允许受访人查看统计
                //     answer_time:12,     //最短答卷时间（题目和问卷）返回分钟
                //     start_end_time:{    //设定调查起止时间
                //         star_time:'2018-09-03',
                //         end_time:'2018-10-03'
                //     },
                //     display_number:'1',//显示题号
                //     lone_link：1,  //1放行 0 不放行
                //     the_blacklist:1, //1放行  0不放行
                //     prohibit_share:1,//不禁止分享 1  0//禁止分享
                //     tips_share:1,  //提示分享1  //0不提示
                //     share_weChat_public:1,//分享微信公众号  1分享 0不分享
                //     display_share_button1:1,//显示分享按钮  1显示  0不显示
                //     transmission_system：1，//发送系统=问卷星系统+贵公司系统  1贵公司 0 问卷星
                //     encoding_method：1,  //编码方式=默认+utf-8    1默认 0 utf-8
                // }
                self.quotas.total_limit = result.total_limit;
                self.restrict.breakpoint_answer = result.breakpoint_answer;
                self.restrict.progress_bar = result.progress_bar;
                self.restrict.rollback_progress = result.rollback_progress;
                self.restrict.viewing_statistics = result.viewing_statistics;
                self.restrict.answer_time = result.answer_time;
                self.restrict.start_end_time.start_time = result.start_end_time.star_time;
                self.restrict.start_end_time.end_time = result.start_end_time.end_time;
                self.restrict.display_number = result.display_number;
            },
            error: function (e) {}
        });
    },
    watch: {
        'quotas': {
            handler: function (value, old) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].item_id) {
                        for (let j = 0; j < this.questions.length; j++) {
                            if (this.questions[j].sub_id === value[i].item_id) {
                                value[i].item = this.questions[j];
                            }
                        }
                    }
                }
            },
            deep: true
        }
    }
});

/***/ }),

/***/ "./js/swing/collect/toolbar.js":
/*!*************************************!*\
  !*** ./js/swing/collect/toolbar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_initial_survey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/initial-survey.js */ "./js/swing/common/initial-survey.js");
/* harmony import */ var _common_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/functions.js */ "./js/swing/common/functions.js");
/* harmony import */ var _common_alerting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/alerting.js */ "./js/swing/common/alerting.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.js */ "./js/swing/collect/settings.js");





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
            _common_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].editLogic(event, workspace, entry);
        }
    }
});

/* harmony default export */ __webpack_exports__["default"] = (toolbar);

/***/ }),

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

/***/ })

/******/ });