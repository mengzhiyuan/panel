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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by wangxiangyang on 2017/9/27.
                                                                                                                                                                                                                                                                               */
//取主域名路径


//引入realPath

//引入template(直接执行)


//引入analyze(直接执行)
//import analyze from './analyze.js';

//引入createItem


var _realPath = __webpack_require__(1);

var _realPath2 = _interopRequireDefault(_realPath);

var _template = __webpack_require__(2);

var _template2 = _interopRequireDefault(_template);

var _createItem = __webpack_require__(3);

var _createItem2 = _interopRequireDefault(_createItem);

var _setui = __webpack_require__(4);

var _setui2 = _interopRequireDefault(_setui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//暴露接口
var createQuestion = _createItem2.default.createQuestion,
    createMatrixQuestion = _createItem2.default.createMatrixQuestion,
    createMessage = _createItem2.default.createMessage,
    drawQuestion = _createItem2.default.drawQuestion;

//引入setui

//暴露接口
var renderCollectControl = _setui2.default.renderCollectControl,
    renderAllocateControl = _setui2.default.renderAllocateControl,
    prepareForProgressControl = _setui2.default.prepareForProgressControl,
    renderProgressControl = _setui2.default.renderProgressControl,
    prepareForQualityControl = _setui2.default.prepareForQualityControl,
    renderQualityControl = _setui2.default.renderQualityControl;

//sessionStorage.setItem('surveyName', '7389091');

if (sessionStorage.getItem("surveyName") == null) {
    location.href = realPath + "/wjLogin";
} else {
    $('#header .signin .name').text(sessionStorage.getItem("surveyName"));
}

//左侧菜单的点击显示
function spreadMenu(e) {
    var $menuBox = $(document.createElement('div'));
    $menuBox.attr('id', 'menu_box');

    $menuBox.css('position', 'absolute');
    $menuBox.css('top', '0');
    $menuBox.css('right', '0');

    $menuBox.css('display', 'block');
    $menuBox.css('width', '72px');
    $menuBox.css('height', '36px');

    $menuBox.css('padding', '36px 12px 12px 12px');
    $menuBox.css('overflow', 'scroll');

    $menuBox.css('background-color', '#ffffff');
    $menuBox.css('border', '1px solid #e9e9e9');

    var $left = $('#left');
    $left.append($menuBox);

    var wi = $left.css('width'),
        hi = $left.css('height');

    $menuBox.animate({ width: wi, height: hi }, 300, function () {
        listQuestion();
        $('#menu').off('click').on('click', packUp);
    });
}

//收起目录
function packUp(event) {
    var $menuBox = $('#menu_box'),
        t = $(event.target);
    $menuBox.animate({ width: '72px', height: '36px' }, 300, function () {
        $menuBox.remove();
    });
    submit();
    t.off('click');
    $('#menu').on('click', spreadMenu);
}

//将目录展示出来
function listQuestion() {

    var box = $('#menu_box'),
        list = $('<div id="menulist">\n                    <div v-for="item in sortedList" class="menu-item" :index="item.index" :itemid="item.itemId">\n                        <span class="index" :index="item.index" :ordericon="item.ordericon">{{ item.ordericon || item.index }}</span>\n                        <span class="title" :title="item.title">{{ item.title }}</span>\n                        <i class="skip"></i>\n                    </div>\n                </div>'),
        qs = questions,
        actived = [],
        l = questions.length,
        i = void 0;

    box.append(list);

    function compare(propertyName) {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value2 < value1) {
                return 1;
            } else if (value2 > value1) {
                return -1;
            } else {
                return 0;
            }
        };
    }

    function filterActive(obj) {

        var arr = [];

        for (var _i = 0, _l = obj.length; _i < _l; _i++) {
            if (obj[_i].active) {
                arr.push(obj[_i]);
            }
        }
        return arr;
    }

    //for (i = 0; i < l; i++){
    //    if (qs[i].active){
    //        actived.push(qs[i])
    //    }
    //}
    //actived.sort(compare('index'));

    //施工中-start
    var filtered = filterActive(questions.sort(compare('index')));

    if (filtered.length > 0) {
        window.menuListItem = new Vue({
            el: '#menu_box',
            data: {
                list: questions
            },
            computed: {
                sortedList: function sortedList() {
                    return filterActive(questions.sort(compare('index')));
                }
            }
        });
    }

    //施工中-end

    //for (i = 0; i < l; i++){
    //
    //    let q = actived[i],
    //        active = q.active,
    //        order = q.ordericon || q.index;
    //
    //    if (active){
    //        list.append(`
    //    <div class="menu-item" index="`+ q.index +`" itemid="`+ q.itemId +`">
    //        <span class="index" index="`+ q.index +`" ordericon="`+ q.ordericon +`">`+ order +`</span>
    //        <span class="title" title="`+ q.title +`">`+ q.title +`</span>
    //        <i class="skip"></i>
    //    </div>
    //    `)
    //    }
    //}
    //
}

//点击skip跳转到相应题目
function skipToItem(event) {

    var itemId = $(event.target).parent().attr('itemid'),
        item = $('#q' + itemId),
        inner = item.find('.inner'),
        wrap = $('#wrap');

    item[0].scrollIntoView();
    inner.addClass('skip-target');
    setTimeout(function () {
        inner.removeClass('skip-target');
    }, 1500);
    wrap.off('click', packUp).on('click', packUp);
}

//点击事件<元素变为可编辑+将值赋予到placeholder上+聚焦+添加类+绑定失焦事件>
function contenteditableToggle(event) {

    var t = $(event.target);
    //holder = t.attr('ordericon') || t.attr('index') || t.attr('title');

    t.prop('contenteditable', true).addClass('editing') //添加样式class
    //.empty()
    //.attr('placeholder', holder);
    .focus();
}

//失焦事件<元素变为不可编辑+填充text()+判断现有值是否和index相同(即是否有变动)并赋予变量+移除类>
function fixQ(event) {

    var t = $(event.target),
        //目标
    p = t.parent(),
        //父元素.menu-item
    itemId = p.attr('itemid'),
        //用于在questions中定位q
    q = questions[itemId - 1],
        index = p.attr('index'),
        v = t.text(),
        vd = v.replace(/(^\s*)|(\s*$)/g, ''); //去空格

    t.prop('contenteditable', false).removeClass('editing'); //移除样式class
    //.attr('placeholder','');

    if (t.text()) {
        //如果用户输入了值

        t.text(vd); //填充去前后空格之后的内容

        if (t.hasClass('index')) {
            //如果是序号栏

            if (parseInt(vd) !== index) {
                //如果序号栏内容有变更
                q.ordericon = vd;
                t.attr('ordericon', vd); //更新属性值
            }
        } else {
            q.title = vd;
            t.attr('title', vd); //更新属性值

            $('#q' + itemId).find('.edit .question_title').text(vd); //手动更新编辑界面的title
        }
    } else if (t.hasClass('index')) {
        t.text(q.ordericon || q.index);
    } else if (t.hasClass('title')) {
        t.text(q.title);
    }
}

//当按回车键时,触发blur
function confirmFix(event) {
    if (event.keyCode === 13) {
        $(event.target).blur();
    }
}

//输入框的placeholder聚焦和失焦
function clearHolder(e) {

    var t = $(this),
        h = t.attr('placeholder');

    t.attr('placeholder', '');

    function fillHolder(e) {

        var t = $(this);

        t.attr('placeholder', h);

        t.off('blur');
    }

    t.on('blur', fillHolder);
}

//进度状态切换显示
function switchProcess(e) {

    var t = $(this);

    if (!t.hasClass('active')) {

        t.addClass('active').siblings('li').removeClass('active');

        var left = $('#left'),
            analysis = $('#analysis'),
            setUi = $('#set_ui');

        if (t.hasClass('design')) {

            left.find('.design').addClass('active').siblings('.side').removeClass('active');
            analysis.css('display', 'none');
            setUi.css('display', 'none');
        } else if (t.hasClass('set')) {

            left.find('.set').addClass('active').siblings('.side').removeClass('active');
            analysis.css('display', 'none');
            setUi.css('display', 'block');
            renderCollectControl();
        } else if (t.hasClass('analyze')) {

            left.find('.analyze').addClass('active').siblings('.side').removeClass('active');
            setUi.css('display', 'none');
            analysis.css('display', 'block');
            //displayAnalyze()
        }
    }
}

//左边栏的点击事件切换显示状态方法
function switchBars(e) {

    var t = $(this);

    if (t.hasClass('active')) {

        return;
    } else if (t.hasClass('finally')) {
        return;
    } else {
        t.addClass('active').siblings('.tag').removeClass('active');
    }

    //渲染右侧
    var set_ui = $('#set_ui');
    if (t.hasClass('allocate-control')) {
        //进度界面
        set_ui.find('.set.allocate').css('display', 'block');
        renderAllocateControl();
    } else {
        set_ui.find('.set.allocate').css('display', 'none');
    }
    if (t.hasClass('progress-control')) {
        //进度界面
        prepareForProgressControl();
    } else {
        set_ui.find('.set.progress').css('display', 'none');
    }
    if (t.hasClass('quality-control')) {
        //质控界面
        prepareForQualityControl();
    } else {
        set_ui.find('.set.quality').css('display', 'none');
    }
    if (t.hasClass('collect-control')) {
        //总设置界面
        set_ui.find('.set').css('display', 'none');
    }

    if (t.hasClass('first')) {

        if (!t.siblings().is('animated') || !t.is('animated')) {

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.fifth').css('top', '').animate({ bottom: '0' }, 100);
            t.siblings('.tag.forth').css('top', '').animate({ bottom: '36px' }, 100);
            t.siblings('.tag.third').css('top', '').animate({ bottom: '72px' }, 100);
            t.siblings('.tag.second').css('top', '').animate({ bottom: '108px' }, 100, function () {

                t.siblings('.bar.first').addClass('active');
            });
        }
    } else if (t.hasClass('second')) {

        if (!t.siblings().is('animated') || !t.is('animated')) {

            t.siblings('.bar').removeClass('active');
            t.css('bottom', '').animate({ top: '36px' }, 100);
            t.siblings('.tag.fifth').css('top', '').animate({ bottom: '0' }, 100);
            t.siblings('.tag.forth').css('top', '').animate({ bottom: '36px' }, 100);
            t.siblings('.tag.third').css('top', '').animate({ bottom: '72px' }, 100, function () {

                t.siblings('.bar.second').addClass('active');
            });
        }
    } else if (t.hasClass('third')) {

        if (!t.siblings().is('animated') || !t.is('animated')) {

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.second').css('bottom', '').animate({ top: '36px' }, 100);
            t.css('bottom', '').animate({ top: '72px' }, 100);
            t.siblings('.tag.fifth').css('top', '').animate({ bottom: '0' }, 100);
            t.siblings('.tag.forth').css('top', '').animate({ bottom: '36px' }, 100, function () {

                t.siblings('.bar.third').addClass('active');
            });
        }
    } else if (t.hasClass('forth')) {

        if (!t.siblings().is('animated') || !t.is('animated')) {

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.second').css('bottom', '').animate({ top: '36px' }, 100);
            t.siblings('.tag.third').css('bottom', '').animate({ top: '72px' }, 100);
            t.css('bottom', '').animate({ top: '108px' }, 100);
            t.siblings('.tag.fifth').css('top', '').animate({ bottom: '0' }, 100, function () {

                t.siblings('.bar.forth').addClass('active');
            });
        }
    } else {

        if (!t.siblings().is('animated') || !t.is('animated')) {

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.second').css('bottom', '').animate({ top: '36px' }, 100);
            t.siblings('.tag.third').css('bottom', '').animate({ top: '72px' }, 100);
            t.siblings('.tag.forth').css('bottom', '').animate({ top: '108px' }, 100);
            t.css('bottom', '').animate({ top: '144px' }, 100, function () {

                t.siblings('.bar.fifth').addClass('active');
            });
        }
    }
}

//矩阵题型可视化
function drawMatrix(e) {

    var t = $(this);
    window.row = t.attr('row');
    window.col = t.attr('col');

    t.css('background-color', '#999999').parent().siblings('.count').find('.cols').text(col);
    t.parent().siblings('.count').find('.rows').text(row);

    t.siblings('.cell').each(function () {

        if ($(this).attr('row') <= row && $(this).attr('col') <= col) {

            $(this).css('background-color', '#999999');
        } else {

            $(this).css('background-color', 'transparent');
        }
    });
}

function createMatrix(e) {

    var t = $(this);
}

function cleanDrawMatrix(e) {

    var t = $(this);

    window.row = '0';
    window.col = '0';

    t.find('.cell').css('background-color', 'transparent');
    t.siblings('.count').find('.cols').text('0');
    t.siblings('.count').find('.rows').text('0');
}

//左边栏选中信息题型的勾选框样式变化
function changeChecks(e) {

    var t = $(this);

    if (t.prop('checked') === true) {

        t.siblings().find('.icon').addClass('active');
    } else {

        t.siblings().find('.icon').removeClass('active');
    }
}

//左侧选中颜色的勾选方法
function pickColor(e) {

    var t = $(this),
        v = t.val(),
        css = 'repeating-linear-gradient(60deg,#ffffff, #ffffff 10px, ' + v + ' 0, ' + v + ' 20px)';

    if (t.prop('checked')) {
        $('#colors').find('label').removeClass('picked');
        t.siblings('label').addClass('picked');
        $('#edge').css('background', css);
    }
}

//清理数据
function cleanData(data) {
    for (var i in data) {
        if (i == 'question_list' || i == 'options') {
            data[i] = null;
        }
        if (_typeof(data[i]) === 'object') {
            cleanData(data[i]);
        }
    }
}

//问卷提交保存方法
function submit(event) {
    //打包数据
    if (window.sets) {
        cleanData(sets);
    } else {
        window.sets = {
            total_top: 0,
            total_bottom: 0,
            time_question: {
                restrict: false,
                time: null
            },
            time_survey: {
                restrict: false,
                time: null
            },
            clientOnly: false,
            disposableForClient: false,
            disposableForIp: false,
            disposableForDevice: false,
            passwordNeeded: false,
            verificationCodeNeeded: false,
            allocations: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [{
                    index: 0,
                    question_id: '',
                    question_title: '',
                    options: {},
                    sum_top: 0,
                    sum_bottom: 0,
                    allocate_option: [{
                        op_index: 0,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    }, {
                        op_index: 1,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    }]
                }]
            },
            allocation_cross: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [{
                    index: 0,
                    options: {},
                    conditionString: '',
                    allocate_bottom: 0,
                    allocate_top: 0,
                    percent_bottom: 0,
                    percent_top: 0,
                    percent_average: 0
                }, {
                    index: 1,
                    options: {},
                    conditionString: '',
                    allocate_bottom: 0,
                    allocate_top: 0,
                    percent_bottom: 0,
                    percent_top: 0,
                    percent_average: 0
                }]
            }
        };
    }

    var list = [];

    for (var i = 0, l = questions.length; i < l; i++) {
        if (questions[i].active) {
            list.push(questions[i]);
        }
    }

    var details = {
        survey: sessionStorage.getItem('surveyId') || '',
        email: sessionStorage.getItem('surveyName') || '571029031@qq.com',
        titles: {
            title: $('#title>span').text()
        },
        subtitle: {
            subtitle: $('#subtitle>span').text()
        },
        sets: sets,
        style: {
            color: $('input[name=color]:checked').val()
        },
        list: list
    };
    //提交保存
    $.ajax({
        url: "" + realPath + "/questionnaire/add",
        type: 'post',
        contentType: 'application/json;charset=utf',
        dataType: 'json',
        async: true,
        data: JSON.stringify(details),
        success: function success(d) {
            if (d[0].error_code == 'success') {
                if (event) {
                    if ($(event.target).attr('id') === 'submit') {
                        warnSuccess(d[0].result);
                    }
                }
            } else if (d[0].error_code == 'login') {
                window.location.href = realPath + "/wjLogin";
            } else {
                warnFailed();
            }
        },
        error: function error(e) {
            warnConnectedFailed();
        }
    });
}

//请求成功
function warnSuccess(data) {

    window.warn_success = $(document.createElement('div'));

    warnRender(warn_success, '保存成功');
    sessionStorage.setItem("link", realPath + "/display?wj=" + data);
    window.location.href = realPath + "/html/kolpanel/PublicLink.html";
}

//请求失败的警告
function warnFailed() {

    window.warn_failed = $(document.createElement('div'));

    warnRender(warn_failed, '保存失败');
}

//连接失败的警告
function warnConnectedFailed() {

    window.warn_connected_failed = $(document.createElement('div'));

    warnRender(warn_connected_failed, '连接失败,请稍后再试');
}

//警告渲染
function warnRender(obj, str) {

    obj.text(str);

    var l = str.length * 1.2 + 4 + 'rem';

    obj.css('width', l);

    obj.css('position', 'fixed');
    obj.css('left', getSize()[0] / 2 - 60 + 'px');
    obj.css('top', getSize()[0] / 2 - 15 + 'px');
    obj.css('display', 'none');
    obj.css('height', '30px');
    obj.css('background-color', 'rgba(255,250,240,0.7)');
    obj.css('box-shadow', '0 0 1px 0 #c9c9c9');
    obj.css('outline', '1px solid #d9d9d9');
    obj.css('outline-offset', '-3px');
    obj.css('text-align', 'center');
    obj.css('font-size', '1.2rem');
    obj.css('line-height', '30px');
    obj.css('z-index', '1200');

    $('#survey_container').append(obj);
    obj.fadeIn(700);

    var warnDisappear = setTimeout(function () {
        obj.fadeOut(500, function () {
            var warnRemove = setTimeout(function () {
                obj.remove();
                obj = null;
            }, 700);
        });
    }, 3000);
}

//当在题目上点击鼠标时,题目进入编辑状态
function quickEdit(event) {

    if ($(event.target).hasClass('button')) {
        return false;
    }
    var thisVue = vues[$(event.currentTarget).attr('id').slice(1) - 1],
        editing = thisVue.editing,
        edit = thisVue.edit;

    if (!editing) {
        edit();
    }
}

//当按command+enter或ctrl+enter时,触发题目的save方法
function quickSave(event) {

    if (event.keyCode === 13) {
        if (event.ctrlKey || event.metaKey) {
            vues[$(event.currentTarget).attr('id').slice(1) - 1].save();
        }
    }
}

//当将要被关闭时,弹出确定框
function confirmClose(e) {
    e.returnValue('问卷数据将被清空.确定离开此页面吗?');
}

//取得当前浏览器的尺寸
function getSize() {

    return [window.innerWidth, window.innerHeight];
}

//清空sessionStorage
function clearSession() {
    sessionStorage.removeItem('surveyId');
    //    sessionStorage.removeItem('designNow')
}

//质量控制操作-invalid
function invalidResult(event) {
    var c = $('#container'),
        t = $(this),
        r = t.find('.reason'),
        v = t.find('.invalid-with-reason');
    if (!t.is('animated') && r.css('display') === 'none') {
        var afterBlur = function afterBlur(event) {
            if (!t.is('animated')) {
                v.on('click', invalidSubmit).animate({ right: '3.5px' });
                r.animate({ width: '0' }, 100, function () {
                    r.css('display', 'none').off('blur').off('keypress');
                    v.off('click').removeClass('btn');
                });
                t.animate({ width: '45px' }, 100, function () {
                    t.animate({ width: '30px' }, 50, function () {
                        t.addClass('btn');
                        c.on('click', '.invalid', invalidResult);
                    });
                });
            }
        };

        var invalidSubmit = function invalidSubmit(event) {
            var reason = r.val();
            if (reason.replace(/\s/g, '')) {
                $.ajax({
                    url: realPath + '/questionnaire/wjUnqualified',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: {
                        sitId: v.attr('result_id'),
                        sitDescribe: r.val()
                    },
                    success: function success(data) {
                        if (data[0].error_code === 'success') {
                            var results = result_list.results,
                                resultId = parseInt(v.attr('result_id')),
                                result = void 0;
                            for (var i = 0, l = results.length; i < l; i++) {
                                if (results[i].resultId === resultId) {
                                    result = results[i];
                                }
                            }
                            result.availability = 0;
                            result.reason = r.val();
                        }
                    }
                });
            }
        };

        var excuteSubmit = function excuteSubmit(event) {
            if (event.keyCode === 13) {
                invalidSubmit(event);
            }
        };

        c.off('click');

        t.removeClass('btn').animate({ width: '45px' }, 50, function () {
            t.animate({ width: '120px' }, 100);
            v.animate({ right: '1px' });
            r.css('display', 'inline-block').animate({ width: '80px' }, 100, function () {
                r.on('blur', afterBlur).on('keypress', excuteSubmit).focus();
                v.addClass('btn');
            });
        });
    }
}

//解析已有问题
function listParse(json) {

    $('#title>span').text(json.title);
    $('#subtitle>span').text(json.discribe);
    var list = json.wjQuestion,
        surveyId = json.wjId;

    window.sets = JSON.parse(json.setting)[0];
    //    window.style = json.style;

    for (var i in list) {
        var itemKey = list[i].itemId;
        list[i] = JSON.parse(list[i].itemContent)[0];
        list[i].surveyId = surveyId;
        list[i].itemKey = itemKey;
    }
    function compare(propertyName) {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value2 < value1) {
                return 1;
            } else if (value2 > value1) {
                return -1;
            } else {
                return 0;
            }
        };
    }
    list.sort(compare('itemId'));

    for (var _i2 in list) {

        var item = list[_i2];

        item.itemId = Number(_i2) + 1;

        if (item.active) {

            var type = item.type,
                form = item.form;

            drawQuestion(type, form, item.col, item);
        }
    }
    var sorting = [],
        items = $('.inners'),
        container = $('#survey_container');

    for (var _i3 = 0, l = items.length; _i3 < l; _i3++) {
        //现在是根据list和items交叉遍历的,在以后list中包括active=false时会出现问题
        sorting[_i3] = {
            index: list[_i3].index,
            node: $(items[_i3]).remove()
        };
    }
    sorting.sort(compare('index'));

    for (var _i4 = 0, _l2 = sorting.length; _i4 < _l2; _i4++) {
        container.append(sorting[_i4].node);
    }
}

//如果不是初次编辑此问卷
$(function () {
    if (sessionStorage.getItem('surveyId')) {
        $.ajax({
            url: realPath + '/questionnaire/UpdateObject',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                survey: sessionStorage.getItem('surveyId')
            }),
            success: function success(d) {

                listParse(d[0]['result'][0]);
            }
        });
    }
}());

//listParse(jsons);

$(window).on('beforeunload', clearSession); //退出页面时,清除surveyId
$('#submit').on('click', submit); //保存事件
$('#main').on('click', '.tags li', switchProcess); //切换进度
$('#matrix').on('mouseover', '.frame_background .cell', drawMatrix) //绘制矩阵题
.on('click', '.frame_background .cell', createMatrix).on('mouseout', '.frame_background', cleanDrawMatrix);
$('#menu').on('click', spreadMenu); //展开目录
$('#colors').on('change', '.color>input', pickColor); //选择样式颜色
$('#wrap').on('focus', '[contenteditable=true]', clearHolder) //当输入时,不显示placeholder
.on('keydown', '.inners', quickSave).on('click', '.inners', quickEdit);
$('#left').on('click', '.tag', switchBars) //进度(编辑/设置/分析)
//.on('change', '.quickly .msg input', changeChecks)
.on('mousedown', '.menu-item>span', contenteditableToggle) //将其转化为可编辑
.on('blur', '.menu-item>span', fixQ) //结束编辑并保存
.on('keypress', '.menu-item>span', confirmFix) //回车键等价于失焦事件
.on('click', '.menu-item>.skip', skipToItem) //点选目录跳转箭头,跳转到对应的题目
.on('click', '.progress-control .acquire', renderProgressControl).on('click', '.quality-control .acquire', renderQualityControl);
$('#container').on('click', '.invalid', invalidResult);

//about createItem.js
//绑定创建事件
$('#left').on('click', '.button', createQuestion);
$('#left').on('click', '.frame_background .cell', createMatrixQuestion);
$('#left').on('click', '.msg a', createMessage);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangxiangyang on 2017/11/29.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

window.realPath = localhostPath + projectName;
//window.sets = window.sets ? sets : {};
window.questions = window.questions ? questions : [];
window.vues = window.vues ? vues : [];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangxiangyang on 2017/9/27.
 */

//模块html
var component = '\n    <div class="inners" :id="\'q\' + item_id">\n        <div class="inner choice" v-if="type===\'choice\'">\n            <div class="display" v-show="!editing">\n                <div class="question_head">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="description">{{ description }}</div>\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button edit" @click="edit">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers">\n                    <div class="input choice" v-for="option in options" :key="option.optionId">\n                        <input :id="\'radio_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="radio" :value="option.value" @change="check">\n                        <label :for="\'radio_q\' + item_id + \'_op\' + option.optionId">\n                            <i class="icon"><span></span></i>\n                            <span class="option_text">{{ option.value }}</span>\n                        </label>\n                        <span class="blank" contenteditable="true" v-show="option.fillable"></span>\n                    </div>\n                </div>\n            </div>\n            <div class="edit" v-show="editing">\n                <div class="question_head">\n                    <div class="question_title" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u6807\u9898" contenteditable="true" @input="editTitle">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n               <span class="description_label">\u9898\u76EE\u63CF\u8FF0: </span>\n                <div class="description" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u63CF\u8FF0" contenteditable="true" @input="editDescription">{{ description }}</div>\n                <div class="control">\n                    <div class="button save" @click="save">3</div>\n                    <div class="button cancel" @click="cancel">d</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers">\n                    <div class="input choice" v-for="option in options" :key="option.optionId">\n                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>\n                        <div class="option_text" :option_id="option.optionId" placeholder="\u8F93\u5165\u9009\u9879" contenteditable="true" @input="editOption">{{ option.value }}</div>\n                        <span class="option_fillable">\n                            <input type="checkbox" :id="\'fillable_q\' + item_id + \'_op\' + option.optionId" :option_id="option.optionId" :checked="option.fillable" @change="editFillable">\n                            <label :for="\'fillable_q\' + item_id + \'_op\' + option.optionId">\n                                <i class="icon"></i>\n                                <span>\u5F00\u653E</span>\n                            </label>\n                        </span>\n                    </div>\n                    <div class="input choice insert" @click=insertOption>\n                        <i class="icon">&</i>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="inner checks" v-if="type===\'checks\'">\n            <div class="display" v-show="!editing">\n                <div class="question_head">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="description">{{ description }}</div>\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button edit" @click="edit">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers">\n                    <div class="input checks" v-for="option in options" :key="option.optionId">\n                        <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="checkbox" :value="option.value" @change="check">\n                        <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId">\n                            <i class="icon"><span></span></i>\n                            <span class="option_text">{{ option.value }}</span>\n                        </label>\n                        <span class="blank" contenteditable="true" v-show="option.fillable"></span>\n                    </div>\n                </div>\n            </div>\n            <div class="edit" v-show="editing">\n                <div class="question_head">\n                    <div class="question_title" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u6807\u9898" contenteditable="true" @input="editTitle">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <span class="description_label">\u9898\u76EE\u63CF\u8FF0: </span>\n                <div class="description" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u63CF\u8FF0" contenteditable="true" @input="editDescription">{{ description }}</div>\n                <div class="control">\n                    <div class="button save" @click="save">3</div>\n                    <div class="button cancel" @click="cancel">d</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers">\n                    <div class="input checks" v-for="option in options" :key="option.optionId">\n                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>\n                        <div class="option_text" :option_id="option.optionId" placeholder="\u8F93\u5165\u9009\u9879" contenteditable="true" @input="editOption">{{ option.value }}</div>\n                        <span class="option_fillable">\n                            <input type="checkbox" :id="\'fillable_q\' + item_id + \'_op\' + option.optionId" :option_id="option.optionId" :checked="option.fillable" @change="editFillable">\n                            <label :for="\'fillable_q\' + item_id + \'_op\' + option.optionId">\n                                <i class="icon"></i>\n                                <span>\u5F00\u653E</span>\n                            </label>\n                        </span>\n                    </div>\n                    <div class="input checks insert" @click="insertOption">\n                        <i class="icon">&</i>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="inner blank" v-if="type===\'blank\'">\n            <div class="display" v-show="!editing">\n                <div class="question_head">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="description">{{ description }}</div>\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button edit" @click="edit">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers single" v-show="form===\'single\'">\n                    <div class="input blank">\n                        <span class="blank" contenteditable="true"></span>\n                        <span class="suffix">{{ suffix }}</span>\n                    </div>\n                </div>\n                <div class="answers multi" v-show="form===\'multi\'">\n                    <div class="input blank">\n                        <div class="questions" v-for="question in sub_questions" :key="question.index">\n                            <span class="sub_question">{{ question.title }}<i>:</i></span>\n                            <span class="blank" contenteditable="true"></span>\n                        </div>\n                    </div>\n                </div>\n                <div class="answers textarea" v-show="form===\'textarea\'">\n                    <div class="input blank">\n                        <div class="blank" contenteditable="true"></div>\n                    </div>\n                </div>\n                <div class="answers time" v-show="form===\'time\'">\n                    <div class="input blank">\n                        <span class="blank" contenteditable="true" v-show="need.time.indexOf(\'hour\') >= 0"></span>\n                        <span class="hour" v-show="need.time.indexOf(\'hour\') >= 0">\u65F6</span>\n                        <span class="blank" contenteditable="true" v-show="need.time.indexOf(\'minute\') >= 0"></span>\n                        <span class="hour" v-show="need.time.indexOf(\'minute\') >= 0">\u5206</span>\n                        <span class="blank" contenteditable="true" v-show="need.time.indexOf(\'second\') >= 0"></span>\n                        <span class="hour" v-show="need.time.indexOf(\'second\') >= 0">\u79D2</span>\n                    </div>\n                </div>\n                <div class="answers date" v-show="form===\'date\'">\n                    <div class="input blank">\n                        <span class="blank" contenteditable="true" v-show="need.date.indexOf(\'year\') >= 0"></span>\n                        <span class="hour" v-show="need.date.indexOf(\'year\') >= 0">\u5E74</span>\n                        <span class="blank" contenteditable="true" v-show="need.date.indexOf(\'month\') >= 0"></span>\n                        <span class="hour" v-show="need.date.indexOf(\'month\') >= 0">\u6708</span>\n                        <span class="blank" contenteditable="true" v-show="need.date.indexOf(\'date\') >= 0"></span>\n                        <span class="hour" v-show="need.date.indexOf(\'date\') >= 0">\u65E5</span>\n                    </div>\n                </div>\n            </div>\n            <div class="edit" v-show="editing">\n                <div class="question_head">\n                    <div class="question_title" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u6807\u9898" contenteditable="true" @input="editTitle">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <span class="description_label">\u9898\u76EE\u63CF\u8FF0: </span>\n                <div class="description" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u63CF\u8FF0" contenteditable="true" @input="editDescription">{{ description }}</div>\n                <div class="control">\n                    <div class="button save" @click="save">3</div>\n                    <div class="button cancel" @click="cancel">d</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="blank_switch">\n                    <label :for="\'type_q\' + item_id">\u586B\u7A7A\u7C7B\u578B</label>\n                    <select :id="\'type_q\' + item_id" :value="form" @change="changeForm">\n                        <option value="single">\u5355\u9879\u586B\u7A7A</option>\n                        <option value="multi">\u591A\u9879\u586B\u7A7A</option>\n                        <option value="textarea">\u591A\u884C\u6587\u672C</option>\n                        <option value="time">\u65F6\u95F4</option>\n                        <option value="date">\u65E5\u671F</option>\n                    </select>\n                </div>\n                <div class="answers single" v-show="form===\'single\'">\n                    <div class="suffix">\n                        <span>\u5355\u4F4D/\u540E\u7F00</span>\n                        <input type="text" :value="suffix" @change="editSuffix">\n                    </div>\n                </div>\n                <div class="answers multi active" v-show="form===\'multi\'">\n                    <div class="input blank" v-for="question in sub_questions" :key="question.index">\n                        <i class="icon" :question_id="question.index" @click="deleteSubQuestion">*</i>\n                        <div class="sub_question" :question_id="question.index" placeholder="\u8F93\u5165\u5B50\u95EE\u9898" contenteditable="true" @input="editSubQuestion">{{ question.title }}</div>\n                    </div>\n                    <div class="input blank insert" @click="insertSubQuestion">\n                        <i class="icon">&</i>\n                    </div>\n                </div>\n                <div class="answers textarea" v-show="form===\'textarea\'">\n                </div>\n                <div class="answers time" v-show="form===\'time\'">\n                    <div class="require_time">\n                        <input :id="\'hour_q\' + item_id" type="checkbox" @change="toggleHour"><label :for="\'hour_q\' + item_id">\u65F6</label>\n                        <input :id="\'minute_q\' + item_id" type="checkbox" @change="toggleMinute"><label :for="\'minute_q\' + item_id">\u5206</label>\n                        <input :id="\'second_q\' + item_id" type="checkbox" @change="toggleSecond"><label :for="\'second_q\' + item_id">\u79D2</label>\n                    </div>\n                </div>\n                <div class="answers date" v-show="form===\'date\'">\n                    <div class="require_time">\n                        <input :id="\'year_q\' + item_id" type="checkbox" @change="toggleYear"><label :for="\'year_q\' + item_id">\u5E74</label>\n                        <input :id="\'month_q\' + item_id" type="checkbox" @change="toggleMonth"><label :for="\'month_q\' + item_id">\u6708</label>\n                        <input :id="\'date_q\' + item_id" type="checkbox" @change="toggleDate"><label :for="\'date_q\' + item_id">\u65E5</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="inner matrix" v-if="type===\'matrix\'">\n            <div class="display" v-show="!editing">\n                <div class="question_head">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="description">{{ description }}</div>\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button edit" @click="edit">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers matrix" v-if="form===\'row\'">\n                    <table>\n                        <thead>\n                        <tr>\n                            <th></th>\n                            <th v-for="option in options" :key="option.optionId">{{ option.value }}</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="question in sub_questions" :key="question.index">\n                            <td>{{ question.title }}</td>\n                            <td v-for="option in options" :key="option.optionId">\n                                <input :name="question.title" :value="option.value" type="checkbox" v-if="the_class===\'multi\'">\n                                <input :name="question.title" :value="option.value" type="radio" v-if="the_class===\'single\' || the_class===\'score\'">\n                                <input :name="question.title" :sbt="option.value" type="text" v-if="the_class===\'blank\'">\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class="answers matrix" v-if="form===\'col\'">\n                    <table>\n                        <thead>\n                        <tr>\n                            <th></th>\n                            <th v-for="question in sub_questions" :key="question.index">{{ question.title }}</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="option in options" :key="option.optionId">\n                            <td>{{ option.value }}</td>\n                            <td v-for="question in sub_questions" :key="question.index">\n                                <input :name="question.title" :value="option.value" type="checkbox" v-if="the_class===\'multi\'">\n                                <input :name="question.title" :value="option.value" type="radio" v-if="the_class===\'single\' || the_class===\'score\'">\n                                <input :name="question.title" :value="option.value" type="text" v-if="the_class===\'blank\'">\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n            <div class="edit" v-show="editing">\n                <div class="question_head">\n                    <div class="question_title" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u6807\u9898" contenteditable="true" @input="editTitle">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <span class="description_label">\u9898\u76EE\u63CF\u8FF0: </span>\n                <div class="description" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u63CF\u8FF0" contenteditable="true" @input="editDescription">{{ description }}</div>\n                <div class="control">\n                    <div class="button save" @click="save">3</div>\n                    <div class="button cancel" @click="cancel">d</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="matrix_switch">\n                    <label :for="\'class_q\' + item_id">\u77E9\u9635\u7C7B\u578B</label>\n                    <select :id="\'class_q\' + item_id" :value="the_class" @change="changeClass">\n                        <option value="single" selected>\u77E9\u9635\u5355\u9009</option>\n                        <option value="multi">\u77E9\u9635\u591A\u9009</option>\n                        <option value="blank">\u77E9\u9635\u586B\u7A7A</option>\n                        <option value="score">\u77E9\u9635\u8BC4\u5206</option>\n                    </select>\n                </div>\n                <div class="answers matrix" v-if="form===\'row\'">\n                    <table>\n                        <thead>\n                        <tr>\n                            <th></th>\n                            <th></th>\n                            <th class="delete-icon" v-for="option in options" :key="option.optionId"  :option_id="option.optionId" @click="deleteOption">*</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr>\n                            <td></td>\n                            <td class="inputs"></td>\n                            <td class="inputs" placeholder="\u8F93\u5165\u9009\u9879" contenteditable="true" v-for="option in options" :key="option.optionId" :option_id="option.optionId" @input="editOption">{{ option.value }}</td>\n                            <td class="insert-icon" @click="insertOption">&</td>\n                        </tr>\n                        <tr v-for="question in sub_questions" :key="question.index">\n                            <td class="delete-icon" @click="deleteSubQuestion" :question_id="question.index">*</td>\n                            <td class="inputs" placeholder="\u8F93\u5165\u5B50\u95EE\u9898" contenteditable="true" :question_id="question.index" @input="editSubQuestion">{{ question.title }}</td>\n                            <td v-for="option in options" :key="option.optionId">\n                                <input :name="question.index" type="checkbox" v-if="the_class===\'multi\'">\n                                <input :name="question.index" type="radio" v-if="the_class===\'single\' || the_class===\'score\'">\n                                <input :name="question.index" type="text" v-if="the_class===\'blank\'">\n                            </td>\n                        </tr>\n                        <tr class="insert">\n                            <td></td>\n                            <td class="insert-icon" @click="insertSubQuestion">&</td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class="answers matrix" v-if="form===\'col\'">\n                    <table>\n                        <thead>\n                        <tr>\n                            <th></th>\n                            <th></th>\n                            <th class="delete-icon" v-for="question in sub_questions" :key="question.index"  :question_id="question.index" @click="deleteSubQuestion">*</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr class="prefix" @mousedown="dragPrefix">\n                        <td></td>\n                        <td></td>\n                        <td v-for="question in sub_questions" :key="question.index" :question_id="question.index" @input="editPrefix" class="edit-prefix">{{ question.prefix }}</td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td class="inputs"></td>\n                            <td class="inputs" placeholder="\u8F93\u5165\u5B50\u95EE\u9898" contenteditable="true" v-for="question in sub_questions" :key="question.index" :question_id="question.index" @input="editSubQuestion">{{ question.title }}</td>\n                            <td class="insert-icon" @click="insertSubQuestion">&</td>\n                        </tr>\n                        <tr v-for="option in options" :key="option.optionId">\n                            <td class="delete-icon" @click="deleteOption" :option_id="option.optionId">*</td>\n                            <td class="inputs" placeholder="\u8F93\u5165\u9009\u9879" contenteditable="true" :option_id="option.optionId" @input="editOption">{{ option.value }}</td>\n                            <td v-for="question in sub_questions" :key="question.index">\n                                <input :name="question.index" type="checkbox" v-if="the_class===\'multi\'">\n                                <input :name="question.index" type="radio" v-if="the_class===\'single\' || the_class===\'score\'">\n                                <input :name="question.index" type="text" v-if="the_class===\'blank\'">\n                            </td>\n                        </tr>\n                        <tr class="insert">\n                            <td></td>\n                            <td class="insert-icon" @click="insertOption">&</td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        <div class="inner score" v-if="type===\'score\'">\n            <div class="display" v-show="!editing">\n                <div class="question_head">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="description">{{ description }}</div>\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button edit" @click="edit">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers score">\n                    <div class="score" v-for="option in options" :key="option.optionId">\n                        <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="radio" :value="option.value" @change="mark">\n                        <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId">\n                            <span v-show="form===\'text\'">{{ option.value }}</span>\n                            <span v-show="form===\'number\'">{{ option.score }}</span>\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class="edit" v-show="editing">\n                <div class="question_head">\n                    <div class="question_title" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u6807\u9898" contenteditable="true" @input="editTitle">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <span class="description_label">\u9898\u76EE\u63CF\u8FF0: </span>\n                <div class="description" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u63CF\u8FF0" contenteditable="true" @input="editDescription">{{ description }}</div>\n                <div class="control">\n                    <div class="button save" @click="save">3</div>\n                    <div class="button cancel" @click="cancel">d</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="score_switch">\n                    <label :for="\'form_q\' + item_id">\u663E\u793A\u5F62\u5F0F</label>\n                    <select :id="\'form_q\' + item_id" :value="form" @change="changeForm">\n                        <option value="">\u8BF7\u9009\u62E9</option>\n                        <option value="number">\u5206\u6570</option>\n                        <option value="text">\u6587\u5B57\u63CF\u8FF0</option>\n                        <option value="img">\u56FE\u5F62</option>\n                    </select>\n                </div>\n                <div class="answers score">\n                    <div class="input score" v-for="option in options" :key="option.optionId">\n                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>\n                        <span class="title_prefix">\u6587\u5B57\u63CF\u8FF0</span>\n                        <div class="score_title" placeholder="\u8F93\u5165\u5206\u6570\u63CF\u8FF0" contenteditable="true" :option_id="option.optionId" @input="editOption">{{ option.value }}</div>\n                        <span class="number_prefix">\u5206\u6570</span>\n                        <input :option_id="option.optionId" placeholder="\u5206\u6570" class="score_number" :value="option.score" @input="editScore">\n                    </div>\n                    <div class="input score insert" @click="insertOption">\n                        <i class="icon">&</i>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="inner sort" v-if="type===\'sort\'">\n            <div class="display" v-show="!editing">\n                <div class="question_head">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="description">{{ description }}</div>\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button edit" @click="edit">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="answers sort" v-show="form === \'click\'">\n                    <div class="sort" v-for="option in options" :key="option.optionId">\n                        <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="checkbox" :value="option.value" @change="sort">\n                        <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId" class="first">\n                            <span>{{ option.value }}</span>\n                        </label>\n                    </div>\n                </div>\n                <div class="answers sort" v-show="form === \'cols\'">\n                    <div class="to-sort">\n                        <div class="sort" v-for="option in options" :key="option.optionId">\n                            <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="checkbox" :value="option.value" @change="sort">\n                            <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId" class="first">\n                                <span>{{ option.value }}</span>\n                            </label>\n                        </div>\n                    </div>\n                    <div class="sorted">\n                        <div class="sort" v-for="option in options" :value="option"></div>\n                    </div>\n                </div>\n                <div class="answers sort" v-show="form === \'drag\'">\n                    <div class="sort" v-for="option in options" :key="option.optionId">\n                        <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="checkbox" :value="option.value" @change="sort">\n                        <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId" class="first">\n                            <span>{{ option.value }}</span>\n                        </label>\n                    </div>\n                </div>\n                <div class="answers sort" v-show="form === \'mark\'">\n                    <div class="sort" v-for="option in options" :key="option.optionId">\n                        <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="checkbox" :value="option.value" @change="sort">\n                        <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId" class="first">\n                            <span>{{ option.value }}</span>\n                        </label>\n                    </div>\n                </div>\n                <div class="answers sort" v-show="form === \'input\'">\n                    <div class="sort" v-for="option in options" :key="option.optionId">\n                        <input :id="\'checks_q\' + item_id + \'_op\' + option.optionId" :name="\'q\' + item_id" type="checkbox" :value="option.value" @change="sort">\n                        <label :for="\'checks_q\' + item_id + \'_op\' + option.optionId" class="first">\n                            <span>{{ option.value }}</span>\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class="edit" v-show="editing">\n                <div class="question_head">\n                    <div class="question_title" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u6807\u9898" contenteditable="true" @input="editTitle">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <span class="description_label">\u9898\u76EE\u63CF\u8FF0: </span>\n                <div class="description" placeholder="\u8BF7\u8F93\u5165\u95EE\u9898\u63CF\u8FF0" contenteditable="true" @input="editDescription">{{ description }}</div>\n                <div class="control">\n                    <div class="button save" @click="save">3</div>\n                    <div class="button cancel" @click="cancel">d</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n                <div class="sort_switch">\n                    <label :for="\'form_q\' + item_id">\u663E\u793A\u5F62\u5F0F</label>\n                    <select :id="\'form_q\' + item_id" :value="form" @change="changeForm">\n                        <option value="click">\u70B9\u51FB</option>\n                        <option value="cols">\u5206\u680F</option>\n                        <option value="drag">\u62D6\u62FD</option>\n                        <option value="mark">\u6253\u5206</option>\n                        <option value="input">\u8F93\u5165</option>\n                    </select>\n                </div>\n                <div class="answers sort">\n                    <div class="input sort" v-for="option in options" :key="option.optionId">\n                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>\n                        <span class="sort_prefix">\u6587\u5B57\u63CF\u8FF0</span>\n                        <div class="sort_title" placeholder="\u8F93\u5165\u9009\u9879" contenteditable="true" :option_id="option.optionId" @input="editOption">{{ option.value }}</div>\n                    </div>\n                    <div class="input sort insert" @click="insertOption">\n                        <i class="icon">&</i>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n',
    message = '<div class="inners" :id="\'q\' + item_id" v-if="type instanceof Array">\n            <div class="inner message name">\n\n                <div class="question_head name display" v-if="type.indexOf(\'name\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="name">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head name edit" v-if="type.indexOf(\'name\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="name">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers name" v-if="type.indexOf(\'name\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head sex display" v-if="type.indexOf(\'sex\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="sex">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head sex edit" v-if="type.indexOf(\'sex\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="sex">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers sex" v-if="type.indexOf(\'sex\') > -1">\n                    <div class="input choice">\n                        <input :id="\'radio_q\' + item_id + \'_op1\'" :name="\'q\' + item_id + \'sex\'" type="radio" value="\u7537" @change="check">\n                        <label :for="\'radio_q\' + item_id + \'_op1\'">\n                            <i class="icon"><span></span></i>\n                            <span class="option_text">\u7537</span>\n                        </label>\n                    </div>\n                    <div class="input choice">\n                        <input :id="\'radio_q\' + item_id + \'_op2\'" :name="\'q\' + item_id + \'sex\'" type="radio" value="\u5973" @change="check">\n                        <label :for="\'radio_q\' + item_id + \'_op2\'">\n                            <i class="icon"><span></span></i>\n                            <span class="option_text">\u5973</span>\n                        </label>\n                    </div>\n                </div>\n\n                <div class="question_head age display" v-if="type.indexOf(\'age\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="age">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head age edit" v-if="type.indexOf(\'age\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="age">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers age" v-if="type.indexOf(\'age\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head telephone display" v-if="type.indexOf(\'telephone\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="telephone">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head telephone edit" v-if="type.indexOf(\'telephone\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="telephone">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers telephone" v-if="type.indexOf(\'telephone\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head email display" v-if="type.indexOf(\'email\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="email">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head email edit" v-if="type.indexOf(\'email\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="email">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers email" v-if="type.indexOf(\'email\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head company display" v-if="type.indexOf(\'company\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="company">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head company edit" v-if="type.indexOf(\'company\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="company">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers company" v-if="type.indexOf(\'company\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head job display" v-if="type.indexOf(\'job\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="job">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head job edit" v-if="type.indexOf(\'job\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="job">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers job" v-if="type.indexOf(\'job\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head industry display" v-if="type.indexOf(\'industry\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="industry">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head industry edit" v-if="type.indexOf(\'industry\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="industry">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers industry" v-if="type.indexOf(\'industry\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head address display" v-if="type.indexOf(\'address\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="address">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head address edit" v-if="type.indexOf(\'address\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="address">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers address" v-if="type.indexOf(\'address\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head highschool display" v-if="type.indexOf(\'highschool\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="highschool">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head highschool edit" v-if="type.indexOf(\'highschool\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="highschool">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers highschool" v-if="type.indexOf(\'highschool\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head education display" v-if="type.indexOf(\'education\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="education">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head education edit" v-if="type.indexOf(\'education\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="education">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers education" v-if="type.indexOf(\'education\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head department display" v-if="type.indexOf(\'department\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="department">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head department edit" v-if="type.indexOf(\'department\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="department">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers department" v-if="type.indexOf(\'department\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head hospitallevel display" v-if="type.indexOf(\'hospitallevel\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="hospitallevel">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head hospitallevel edit" v-if="type.indexOf(\'hospitallevel\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="hospitallevel">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers hospitallevel" v-if="type.indexOf(\'hospitallevel\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="question_head titlelevel display" v-if="type.indexOf(\'titlelevel\') > -1" v-show="!editing">\n                    <span class="question_index">\n                        <span class="index">{{ ordericon || index }}</span>.\n                    </span>\n                    <span class="question_title" name="titlelevel">{{ title }}</span>\n                    <span class="question_require" v-show="required">*</span>\n                </div>\n                <div class="question_head titlelevel edit" v-if="type.indexOf(\'titlelevel\') > -1" v-show="editing">\n                    <div class="question_title" contenteditable="true" @input="editTitle" name="titlelevel">{{ title }}</div>\n                    <span class="question_require">\n                        <input type="checkbox" :id="\'require_q\' + item_id" :checked="required" @change="editRequired">\n                        <label :for="\'require_q\' + item_id">\n                            <i class="icon checked"></i>\n                            <span>\u5FC5\u7B54</span>\n                        </label>\n                    </span>\n                </div>\n                <div class="answers titlelevel" v-if="type.indexOf(\'titlelevel\') > -1">\n                    <div class="input">\n                        <span class="blank" contenteditable="true"></span>\n                    </div>\n                </div>\n\n                <div class="control">\n                    <div class="button up" @click="moveUp">{</div>\n                    <div class="button down" @click="moveDown">}</div>\n                    <div class="button save" @click="save" v-show="editing">3</div>\n                    <div class="button edit" @click="edit" v-show="!editing">W</div>\n                    <div class="button delete" @click="deleteQ">#</div>\n                    <div class="button logic" @click="logic">%</div>\n                </div>\n            </div>\n        </div>\n    ';

Vue.component('node', {

    props: ['index', 'ordericon', 'item_id', 'title', 'type', 'form', 'the_class', 'description', 'required', 'editing', 'options', 'words_restrict', 'suffix', 'sub_questions', 'need', 'jump', 'depend', 'quote', 'relate', 'evaluate'],

    template: component,

    methods: {

        moveUp: function moveUp(e) {

            this.$emit('move_up', e);
        },
        moveDown: function moveDown(e) {

            this.$emit('move_down', e);
        },
        edit: function edit(e) {

            this.$emit('edit', e);
        },
        deleteQ: function deleteQ(e) {

            this.$emit('delete_q', e);
        },
        logic: function logic(e) {

            this.$emit('logic', e);
        },
        save: function save(e) {

            this.$emit('save', e);
        },
        cancel: function cancel(e) {

            this.$emit('cancel', e);
        },
        editTitle: function editTitle(e) {

            this.$emit('edit_title', e);
        },
        editRequired: function editRequired(e) {

            this.$emit('edit_required', e);
        },
        editDescription: function editDescription(e) {

            this.$emit('edit_description', e);
        },
        deleteOption: function deleteOption(e) {

            this.$emit('delete_option', e);
        },
        editOption: function editOption(e) {

            this.$emit('edit_option', e);
        },
        editFillable: function editFillable(e) {

            this.$emit('edit_fillable', e);
        },
        insertOption: function insertOption(e) {

            this.$emit('insert_option', e);
        },
        check: function check(e) {

            this.$emit('check', e);
        },
        sort: function sort(e) {

            this.$emit('sort', e);
        },
        changeForm: function changeForm(e) {

            this.$emit('change_form', e);
        },
        changeClass: function changeClass(e) {

            this.$emit('change_class', e);
        },
        deleteSubQuestion: function deleteSubQuestion(e) {

            this.$emit('delete_sub_question', e);
        },
        editSuffix: function editSuffix(e) {
            this.$emit('edit_suffix', e);
        },
        editSubQuestion: function editSubQuestion(e) {

            this.$emit('edit_sub_question', e);
        },
        dragPrefix: function dragPrefix(e) {
            this.$emit('drag_prefix', e);
        },
        editPrefix: function editPrefix(e) {
            this.$emit('edit_prefix', e);
        },
        insertSubQuestion: function insertSubQuestion(e) {

            this.$emit('insert_sub_question', e);
        },
        toggleHour: function toggleHour(e) {

            this.$emit('toggle_hour', e);
        },
        toggleMinute: function toggleMinute(e) {

            this.$emit('toggle_minute', e);
        },
        toggleSecond: function toggleSecond(e) {

            this.$emit('toggle_second', e);
        },
        toggleYear: function toggleYear(e) {

            this.$emit('toggle_year', e);
        },
        toggleMonth: function toggleMonth(e) {

            this.$emit('toggle_month', e);
        },
        toggleDate: function toggleDate(e) {

            this.$emit('toggle_date', e);
        },
        mark: function mark(e) {

            this.$emit('mark', e);
        },
        editScore: function editScore(e) {

            this.$emit('edit_score', e);
        }
    }
});

Vue.component('message', {
    props: ['item_id', 'index', 'required', 'ordericon', 'editing', 'title', 'type', 'description', 'depend'],
    template: message,
    methods: {
        moveUp: function moveUp(e) {

            this.$emit('move_up', e);
        },
        moveDown: function moveDown(e) {

            this.$emit('move_down', e);
        },
        edit: function edit(e) {

            this.$emit('edit', e);
        },
        save: function save(e) {

            this.$emit('save', e);
        },
        editTitle: function editTitle(e) {

            this.$emit('edit_title', e);
        },
        editDescription: function editDescription(e) {

            this.$eimt('edit_description', e);
        },
        editRequired: function editRequired(e) {

            this.$emit('edit_required', e);
        },
        deleteQ: function deleteQ(e) {

            this.$emit('delete_q', e);
        },
        logic: function logic(e) {

            this.$emit('logic', e);
        },
        check: function check(e) {

            this.$emit('check', e);
        }
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by wangxiangyang on 2017/10/19.
 */

//存储创建历史列表
var total = 0;
//区别将要创建的题目类型

//普通题型
function createQuestion(e) {

    var char = $(this).attr('char').split(' ');

    drawQuestion(char[0], char[1], char[2]);
}

//矩阵题型
function createMatrixQuestion(e) {

    var row = window.row,
        col = window.col,
        c0 = 'matrix',
        c1 = $(this).parents('.sub_label').attr('char'),
        c2 = [row, col];

    drawQuestion(c0, c1, c2);
}

//快速题型
function createMessage(e) {

    var type = $(e.target).attr('class').split(' ');

    //$('input[name="messages"]').each(function(){
    //
    //    if ($(this).prop('checked') === true){
    //
    //        type.push($(this).val())
    //    }
    //});
    drawMessage(type);
}

//渲染题目
function drawQuestion(c0, c1, c2, item) {

    var type = c0,
        form = c1;

    if (type === 'matrix') {

        if (!item) {
            var nor = c2[0],
                noc = c2[1];
        }
    } else if (form === 'row' || form === 'col') {

        var noc = c2;
    }

    createNode(type, form, noc, nor || item);
}

//渲染快速题型+创建节点
function drawMessage(type) {

    var actived = 0;

    for (var i = 0, l = questions.length; i < l; i++) {

        if (questions[i].active === true) {

            actived++;
        }
    }
    var message = $(document.createElement('message'));

    message.attr('id', 'q' + (total + 1));
    message.attr(':index', 'index');
    message.attr(':editing', 'editing');
    message.attr(':required', 'required');
    message.attr(':ordericon', 'ordericon');
    message.attr(':item_id', 'itemId');
    message.attr(':title', 'title');
    message.attr(':type', 'type');
    message.attr(':description', 'description');
    message.attr(':depend', 'depend');

    message.attr('v-on:move_up', 'moveUp');
    message.attr('v-on:move_down', 'moveDown');
    message.attr('v-on:edit', 'edit');
    message.attr('v-on:save', 'save');
    message.attr('v-on:delete_q', 'deleteQ');
    message.attr('v-on:logic', 'logic');
    message.attr('v-on:edit_title', 'editTitle');
    message.attr('v-on:edit_description', 'editDescription');
    message.attr('v-on:check', 'check');

    $('#survey_container').append(message);

    var obj = {
        itemId: total + 1,
        index: actived + 1,
        active: true,
        editing: false,
        ordericon: '',
        title: {
            name: '请输入您的姓名',
            sex: '请选择你的性别',
            age: '请输入您的年龄',
            telephone: '请输入您的联系电话',
            email: '请输入您的电子邮箱',
            company: '请输入您的工作单位',
            job: '请输入您的工作职位',
            industry: '请输入您所属的行业',
            address: '请输入您的通讯地址',
            highschool: '请输入您的毕业院校',
            education: '请输入最高学历',
            department: '请输入您所在的科室',
            hospitallevel: '请输入您所在医院的级别',
            titlelevel: '请输入您当年的职称级别'
        },
        required: true,
        type: type,
        form: 'single',
        description: '',
        depend: {}
    };
    obj.title = obj.title[type[0]];
    questions.push(obj);

    createMessageVue(obj);
}

//创建元素节点
function createNode(type, form, noc, nor) {

    var node = $(document.createElement('node'));

    //赋属性值
    node.attr('id', 'q' + (total + 1));
    node.attr(':index', 'index');
    node.attr(':ordericon', 'ordericon');
    node.attr(':item_id', 'itemId');
    node.attr(':type', 'type');
    node.attr(':form', 'form');
    node.attr(':title', 'title');
    node.attr(':description', 'description');
    node.attr(':required', 'required');
    node.attr(':editing', 'editing');
    node.attr(':options', 'options');
    node.attr(':words_restrict', 'words_restrict');
    node.attr(':suffix', 'suffix');
    node.attr(':sub_questions', 'sub_questions');
    node.attr(':need', 'need');
    node.attr(':jump', 'jump');
    node.attr(':depend', 'depend');
    node.attr(':quote', 'quote');
    node.attr(':relate', 'relate');
    node.attr(':evaluate', 'evaluate');
    node.attr(':the_class', 'theClass');

    //赋予方法属性
    node.attr('v-on:move_up', 'moveUp');
    node.attr('v-on:move_down', 'moveDown');
    node.attr('v-on:edit', 'edit');
    node.attr('v-on:delete_q', 'deleteQ');
    node.attr('v-on:logic', 'logic');
    node.attr('v-on:save', 'save');
    node.attr('v-on:cancel', 'cancel');
    node.attr('v-on:edit_title', 'editTitle');
    node.attr('v-on:edit_required', 'editRequired');
    node.attr('v-on:edit_description', 'editDescription');
    node.attr('v-on:delete_option', 'deleteOption');
    node.attr('v-on:edit_option', 'editOption');
    node.attr('v-on:edit_suffix', 'editSuffix');
    node.attr('v-on:edit_fillable', 'editFillable');
    node.attr('v-on:insert_option', 'insertOption');
    node.attr('v-on:check', 'check');
    node.attr('v-on:change_form', 'changeForm');
    node.attr('v-on:change_class', 'changeClass');
    node.attr('v-on:delete_sub_question', 'deleteSubQuestion');
    node.attr('v-on:drag_prefix', 'dragPrefix');
    node.attr('v-on:edit_prefix', 'editPrefix');
    node.attr('v-on:insert_sub_question', 'insertSubQuestion');
    node.attr('v-on:edit_sub_question', 'editSubQuestion');

    //填空题特殊方法
    node.attr('v-on:toggle_hour', 'toggleHour');
    node.attr('v-on:toggle_minute', 'toggleMinute');
    node.attr('v-on:toggle_second', 'toggleSecond');
    node.attr('v-on:toggle_year', 'toggleYear');
    node.attr('v-on:toggle_month', 'toggleMonth');
    node.attr('v-on:toggle_date', 'toggleDate');

    //评分题特殊方法
    node.attr('v-on:mark', 'mark');
    node.attr('v-on:edit_score', 'editScore');

    if (type === 'choice' || type === 'checks') {

        node.addClass('form-' + form + 's');

        if (form === 'row') {

            node.addClass('rows-' + noc);
        }
    }
    $('#survey_container').append(node);

    var actived = 0;

    for (var i = 0, l = questions.length; i < l; i++) {

        if (questions[i].active === true) {

            actived++;
        }
    }

    createDetail(total + 1, actived + 1, type, form, noc, nor);
}

//创建Vue属性对象
function createDetail(id, index, type, form, noc, nor) {

    if ((typeof nor === 'undefined' ? 'undefined' : _typeof(nor)) !== 'object') {
        var thisObj = {

            active: true,
            itemId: id,
            itemKey: null,
            index: index,
            ordericon: '',
            type: type,
            form: type === 'score' ? 'text' : form,
            theClass: 'single',
            title: '',
            description: '',
            words_restrict: {
                min: '',
                max: ''
            },
            suffix: '',
            required: true,
            editing: true,
            options: {},
            col: noc,
            sub_questions: {},
            need: {},
            jump: {},
            depend: {},
            quote: {},
            relate: {},
            evaluate: {}
        };
    } else {
        var thisObj = nor;
    }
    if (type === 'choice' || type === 'checks') {

        if (!thisObj.options[1]) {

            for (var i = 0; i < 2; i++) {

                thisObj.options[i + 1] = {
                    index: i + 1,
                    optionId: i + 1,
                    value: '',
                    fillable: false
                };
            }
        }
    } else if (type === 'sort') {

        if (!thisObj.options[1]) {

            for (var _i = 0; _i < 5; _i++) {

                thisObj.options[_i + 1] = {
                    index: _i + 1,
                    optionId: _i + 1,
                    value: '',
                    score: '',
                    fillable: false
                };
            }
            thisObj.sorted = [];
        }
    } else if (type === 'score') {

        if (!thisObj.options[1]) {

            for (var _i2 = 0; _i2 < noc; _i2++) {

                thisObj.options[_i2 + 1] = {
                    index: _i2 + 1,
                    optionId: _i2 + 1,
                    value: '',
                    score: _i2 + 1,
                    fillable: false
                };
            }
        }
    } else if (type === 'blank') {

        if (!thisObj.sub_questions[1]) {

            for (var _i3 = 0; _i3 < 2; _i3++) {

                thisObj.sub_questions[_i3 + 1] = {
                    index: _i3 + 1,
                    title: ''
                };
            }
        }
    } else if (type === 'matrix') {

        if (!thisObj.options[1]) {
            switch (form) {

                case 'row':

                    for (var _i4 = 0; _i4 < nor; _i4++) {

                        thisObj.sub_questions[_i4 + 1] = {
                            index: _i4 + 1,
                            title: '',
                            prefix: ''
                        };
                    }
                    for (var _i5 = 0; _i5 < noc; _i5++) {

                        thisObj.options[_i5 + 1] = {
                            index: _i5 + 1,
                            optionId: _i5 + 1,
                            value: ''
                        };
                    }
                    break;

                case 'col':

                    for (var _i6 = 0; _i6 < noc; _i6++) {

                        thisObj.sub_questions[_i6 + 1] = {
                            index: _i6 + 1,
                            title: '',
                            prefix: ''
                        };
                    }
                    for (var _i7 = 0; _i7 < nor; _i7++) {

                        thisObj.options[_i7 + 1] = {
                            index: _i7 + 1,
                            optionId: _i7 + 1,
                            value: ''
                        };
                    }
                    break;
            }
        }
    }

    thisObj.need = {
        time: [],
        date: []
    };

    questions.push(thisObj);

    createVue(thisObj);
}

//创建Vue方法对象
var funcs = {

    mounted: function mounted() {
        $(this.$el).find('[contenteditable=true]').each(function () {
            var v = $(this).text();
            $(this).empty().text(v);
        });
    },

    trim: function trim(text) {
        return text.replace(/^\s+|\s+$/g, '');
    },

    moveUp: function moveUp(e) {

        if (this.index > 1) {

            //取得vue根对象
            var t = $(e.target).parents('.inners');
            //dom中调换位置
            t.insertBefore($(t[0].previousSibling));
            //数据中两个对象交换index

            //var subtrahend = 2;//当前题目在数组中的序号是itemId-1,前一个应该是itemId-2

            //取questions中index值为this.index-1的取为pr
            for (var i = 0, l = questions.length; i < l; i++) {
                if (questions[i].index === this.index - 1) {
                    var pr = questions[i];
                }
            }
            //while (this.itemId >= subtrahend){
            //
            //    if (questions[this.itemId - subtrahend].active){
            //
            //        var pr = questions[this.itemId - subtrahend];
            //        break
            //    }
            //    subtrahend += 1
            //}
            //if (!pr){
            //    return false
            //}

            //var pr = questions[this.itemId - 2];

            var t_index = this.index,
                p_index = pr.index;

            var m_index = t_index;
            this.index = p_index;
            pr.index = m_index;

            var sorteds = {
                survey: sessionStorage.getItem('surveyId'),
                list: [this.$data, pr]
            };
            console.log(JSON.stringify(sorteds));

            $.ajax({
                url: realPath + '/questionnaire/sort',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(sorteds),
                success: function success(d) {
                    console.log(d);
                },
                error: function error(e) {
                    console.log(e);
                }
            });
        }
    },
    moveDown: function moveDown(e) {

        var l = 0;

        for (var i = 0; i < total; i++) {

            if (questions[i].active === true) {

                l++;
            }
        }

        if (this.index < l) {

            var t = $(e.target).parents('.inners');

            t.insertAfter($(t[0].nextSibling));

            //var subtrahend = 0;//当前题目在数组中的序号是itemId-1,下一个应该是itemId

            //从下一个题目开始往后遍历,第一个active===true的题目将被赋给变量nt
            //while (this.itemId + subtrahend < (questions.length - 1)){
            //
            //    if (questions[this.itemId + subtrahend].active){
            //
            //        var nt = questions[this.itemId + subtrahend];
            //        break
            //    }
            //    subtrahend += 1
            //}
            //if (!nt){
            //    return false
            //}
            //取questions中index值为this.index+1的取为nt
            for (var _i8 = 0, _l = questions.length; _i8 < _l; _i8++) {
                if (questions[_i8].index === this.index + 1) {
                    var nt = questions[_i8];
                }
            }

            //var nt = questions[this.itemId];

            var t_index = this.index,
                n_index = nt.index;

            var m_index = t_index;
            this.index = n_index;
            nt.index = m_index;

            var sorteds = {
                survey: sessionStorage.getItem('surveyId'),
                list: [this.$data, nt]
            };

            console.log(JSON.stringify(sorteds));

            $.ajax({
                url: realPath + '/questionnaire/sort',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(sorteds),
                success: function success(d) {
                    console.log(d);
                },
                error: function error(e) {
                    console.log(e);
                }
            });
        }
    },
    edit: function edit(e) {
        this.editing = true;
    },
    deleteQ: function deleteQ(e) {

        //dom中移除vue根元素
        var t = $(e.target).parents('.inners');
        t.remove();

        //数据中将此vue取消active状态,index置为空值
        var c = this.index,
            idToDelete = this.itemKey;

        //向后台提交删除
        $.ajax({
            url: realPath + '/questionnaire/deleteQuestion',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                itemId: idToDelete
            }),
            success: function success(d) {
                var result = d[0].errorCode;
            },
            error: function error(e) {}
        });

        //取出所有活跃问题
        var actived = [];

        for (var i = 0; i < total; i++) {

            if (questions[i].active === true) {

                actived.push(questions[i]);
            }
        }
        //将所有index值大于此vue的对象index属性-1
        for (var _i9 = 0, l = actived.length; _i9 < l; _i9++) {

            if (actived[_i9].index > c) {

                actived[_i9].index -= 1;
            }
        }
        this.active = false;
        this.index = null;
    },
    logic: function logic(e) {

        var t = $(e.target),
            qNow = this.itemId,
            model = '\n                <div class="logic-control">\n                    <div class="head">\n                        <span class="title">\u6DFB\u52A0\u903B\u8F91\u63A7\u5236</span>\n                        <span class="close"></span>\n                    </div>\n                    <div class="main">\n                        <div class="words-restrict">\n                            <div>\n                                <span>\u6700\u5C11\u5B57\u6570</span>\n                                <span contenteditable="true" class="min"></span>\n                            </div>\n                            <div>\n                                <span>\u6700\u591A\u5B57\u6570</span>\n                                <span contenteditable="true" class="max"></span>\n                            </div>\n                        </div>\n                        <div class="depend">\n                            <span>\u5F53\u9898\u76EE</span>\n                            <select class="depend_question">\n                                <option value="">\u8BF7\u9009\u62E9</option>\n                            </select>\n                            <span>\u9009\u4E2D\u7ED3\u679C\u4E3A</span>\n                                <a class="depend_option" href="javascript: void(0);">\n                                    <span class="initialed">\u70B9\u51FB\u9009\u62E9\u9009\u9879</span>\n                                    <span class="selected" picked_option="[]"></span>\n                                </a>\n                            <span>\u65F6,\u672C\u9898\u663E\u793A,\u5426\u5219\u672C\u9898\u9690\u85CF</span>\n                        </div>\n                        <div class="relate">\n                            <span>\u672C\u9898\u5C06\u5F15\u7528\u9898\u76EE</span>\n                            <select class="relate_question">\n                                <option value="">\u8BF7\u9009\u62E9</option>\n                            </select>\n                            <span>\u88AB\u9009\u4E2D\u7684\u6240\u6709\u7ED3\u679C\u4F5C\u4E3A\u672C\u9898\u7684\u5907\u9009\u9879</span>\n                        </div>\n                        <div class="quote">\n                            <span>\u672C\u9898\u5C06\u5F15\u7528\u9898\u76EE</span>\n                            <select class="quote_question">\n                                <option value="">\u8BF7\u9009\u62E9</option>\n                            </select>\n                            <span>\u7684\u7B54\u9898\u7ED3\u679C\u4F5C\u4E3A\u672C\u9898\u9898\u5E72\u7684\u4E00\u90E8\u5206(\u8BF7\u5728\u9898\u5E72\u4E2D\u7528[\u63D2\u5165]\u6807\u8BB0\u51FA\u8981\u63D2\u5165\u7684\u4F4D\u7F6E)</span>\n                        </div>\n                        <div class="jump">\n                            <div class="jump_logics"><a href="javascript:void(0);">\u70B9\u51FB\u8BBE\u7F6E\u8DF3\u8F6C\u903B\u8F91</a></div>\n                            <!--<span>\u5F53\u672C\u9898\u9009\u4E2D\u7ED3\u679C\u4E3A</span>-->\n                            <!--<select class="jump_option">-->\n                                <!--<option value="">\u8BF7\u9009\u62E9</option>-->\n                            <!--</select>-->\n                            <!--<span>\u65F6,\u4E0B\u4E00\u9898\u5C06\u8DF3\u8F6C\u5230\u9898\u76EE</span>-->\n                            <!--<select class="jump_target">-->\n                                <!--<option value="">\u8BF7\u9009\u62E9</option>-->\n                                <!--<option value="over">\u95EE\u5377\u7ED3\u675F(\u5224\u5B9A\u65E0\u6548)</option>-->\n                            <!--</select>-->\n                        </div>\n                        <div class="evaluate">\n                            <span>\u672C\u9898\u5C06\u6839\u636E\u9898\u76EE</span>\n                            <select class="evaluate_question">\n                                <option value="">\u8BF7\u9009\u62E9</option>\n                            </select>\n                            <span>\u7684\u7B54\u9898\u7ED3\u679C\u4E0D\u540C,\u9898\u5E72\u63D2\u5165\u4E0D\u540C\u7684\u5185\u5BB9(\u8BF7\u5728\u9898\u5E72\u4E2D\u7528[\u8D4B\u503C]\u6807\u8BB0\u51FA\u8981\u63D2\u5165\u7684\u4F4D\u7F6E)</span>\n                            <div class="evaluate_options">\n\n                            </div>\n                        </div>\n                    </div>\n                    <div class="foot">\n                        <button class="cancel btn btn-sm btn-warning pull-right">\u53D6\u6D88</button>\n                        <button class="save btn btn-sm btn-success pull-right">\u4FDD\u5B58</button>\n                    </div>\n                </div>';

        t.parents('.inner').append(model);

        var inner = t.parents('.inner');

        //判断填空题独有逻辑(字数限制)
        if (inner.hasClass('blank')) {
            inner.find('.words-restrict').css('display', 'block');
            try {
                inner.find('.words-restrict .min').text(qNow.words_restrict.min);
                inner.find('.words-restrict .max').text(qNow.words_restrict.max);
            } catch (e) {}
        } else {
            inner.find('.words-restrict').css('display', 'none');
        }

        //判断选择题独有逻辑(跳转逻辑&关联逻辑)
        if (inner.hasClass('choice') || inner.hasClass('checks') || inner.hasClass('matrix') || inner.hasClass('score')) {

            //在新的框内设置跳转逻辑
            var createJumpBox = function createJumpBox(e) {

                var jumpBox = $('\n                    <div class="jump_box">\n                        <div class="head">\u8BF7\u9009\u62E9\u6BCF\u4E2A\u9009\u9879\u5BF9\u5E94\u7684\u8DF3\u8F6C\u76EE\u6807</div>\n                        <span class="close_jump"></span>\n                        <button class="btn btn-success btn-sm save_jump">\u4FDD\u5B58</button>\n                    </div>\n                '),
                    options = this.options,
                    targets = '';

                //按顺序组成列表
                for (var i in options) {
                    var o = options[i];
                    jumpBox.append('\n                    <div class="jump_option">\n                        <span class="option_value">\u9009\u9879' + o.index + '. ' + o.value.slice(0, 5) + '...</span>\n                        <select class="jump_target" option_id="' + o.optionId + '" option_value="' + o.value + '">\n                            <option value="">\u8BF7\u9009\u62E9\u8DF3\u8F6C\u76EE\u6807</option>\n                            <option value="over">\u95EE\u5377\u7ED3\u675F(\u5224\u5B9A\u65E0\u6548)</option>\n                        </select>\n                    </div>\n                    ');
                }
                //将可选目标填入select
                for (var _i10 = 0, l = questions.length; _i10 < l; _i10++) {
                    var q = questions[_i10];
                    if (q.active === true && q.index > this.index) {
                        targets += '<option value="' + q.itemId + '">' + q.index + ',' + q.title.slice(0, 10) + '...</option>';
                    }
                }
                var jumpBoxs = jumpBox.find('.jump_target');

                jumpBoxs.each(function () {
                    var index = Array.prototype.indexOf.call(jumpBoxs, this);
                    $(this).append(targets);
                    try {
                        this.val(this.jump[index].target);
                    } catch (e) {}
                });

                inner.append(jumpBox);

                function closeJump() {

                    jumpBox.remove();
                    jumpBox = null;
                }
                function saveJump(e) {
                    //保存跳转逻辑的设置
                    var self = this;

                    jumpBoxs.each(function () {

                        var optionId = $(this).attr('option_id');

                        self.jump[optionId] = {
                            optionId: optionId,
                            value: self.options[optionId]['value'],
                            target: $(this).val()
                        };
                    });
                    closeJump();
                }

                jumpBox.on('click', '.close_jump', closeJump.bind(this));
                jumpBox.on('click', '.save_jump', saveJump.bind(this));

                //jumpBoxs.on('')
            };

            //跳转
            inner.find('.logic-control .jump').css('display', 'block');

            inner.find('.jump_logics').on('click', createJumpBox.bind(this));

            //let options = this.options,
            //    s_jump_option = inner.find('.logic-control .jump_option'),
            //    s_jump_target = inner.find('.logic-control .jump_target');
            //
            //for (let i in options){
            //    var o = options[i];
            //    s_jump_option.append('<option value="'+ o.value +'">'+ o.optionId + '.' + o.value.slice(0,5) +'...</option>')
            //}
            //
            //function changeJumpTarget(e){
            //
            //    for (let i = 0,l = questions.length; i < l; i++){
            //        let q = questions[i];
            //        if (q.active === true && q.index > inner.find('.question_index>.index').text()){
            //            s_jump_target.append('<option value="'+ q.itemId +'">'+ q.index + ','+ q.title.slice(0,10) +'...</option>')
            //        }
            //    }
            //    try{
            //        s_jump_target.val(this.jump.target[0]);
            //    } catch(e){}
            //}
            //
            //try{
            //    if (s_jump_option.val(this.jump.options[0])){
            //        changeJumpTarget()
            //    }
            //} catch(e){}
            //
            //s_jump_option.on('change', changeJumpTarget.bind(this));

            //关联
            inner.find('.logic-control').find('.relate').css('display', 'block');

            var s_relate_question = inner.find('.logic-control .relate_question');

            for (var i = 0, l = questions.length; i < l; i++) {
                var q = questions[i];
                if (q.active === true && (q.type === 'choice' || q.type === 'checks') && q.index < this.index) {
                    s_relate_question.append('<option value="' + q.itemId + '">' + q.index + ',' + q.title.slice(0, 10) + '...</option>');
                }
            }
            try {
                s_relate_question.val(this.relate.itemId);
            } catch (e) {}
        } else {
            inner.find('.logic-control').find('.jump').css('display', 'none');
            inner.find('.logic-control').find('.relate').css('display', 'none');
        }

        //显示逻辑选项
        if (this.type instanceof Array) {
            inner.find('.depend').css('display', 'none');
        }
        var s_depend_question = inner.find('.logic-control .depend_question'),
            s_depend_option = inner.find('.logic-control .depend_option');

        for (var _i11 = 0, _l2 = questions.length; _i11 < _l2; _i11++) {
            var _q = questions[_i11];
            if (_q.active === true && (_q.type === 'choice' || _q.type === 'checks') && _q.index < this.index) {
                s_depend_question.append('<option value="' + _q.itemId + '">' + _q.index + '.' + _q.title.slice(0, 10) + '...' + '</option>');
            }
        }

        function changeDependOption(e) {

            //如果调用此方法的事件target是预设的主要目标
            if (e.originalEvent) e = e.originalEvent;

            if ($(e.currentTarget).hasClass('depend_option')) {

                //创建一个元素(后来的弹出框)
                var dependBox = $('\n                    <div class="depend_box">\n                        <div class="head">\u5728\u54EA\u4E2A\u9009\u9879\u88AB\u9009\u4E2D\u65F6,\u6B64\u9898\u663E\u793A,\u8BF7\u52FE\u9009</div>\n                        <span class="close_depend"></span>\n                    </div>\n                '),
                    dependQuestion = $(e.target).parents('.depend').find('.depend_question').val();

                //如果已经选择了依赖题目
                if (dependQuestion) {
                    //将依赖题目的选项赋予option
                    var options = questions[dependQuestion - 1]['options'];
                    //否则就退出方法
                } else {
                    return false;
                }

                //如果不是预设的主要目标,且设置过的depend属性
            } else if (this.depend.itemId) {

                //将设置好的depend.itemId值赋予s_depend_question,仅在逻辑界面链接内显示选中的选项
                s_depend_question.val(this.depend.itemId);

                //将设置好的depend.options显示出来
                var options = this.depend.options,
                    txt = inner.find('.depend_option>.selected');

                if (options.length > 0) {

                    var str = '';

                    for (var _i12 = 0, _l3 = options.length; _i12 < _l3; _i12++) {
                        str += options[_i12].slice(0, 5) + '...; ';
                    }
                    txt.text(str).attr('picked_option', JSON.stringify(options)).siblings('.initialed').text('');
                }
                return false;
            }

            for (var _i13 in options) {

                var ops = options[_i13];

                dependBox.append('\n                    <div class="depend_boxs">\n                        <input class="pick_depend" type="checkbox" value="' + ops.value + '">\n                        <span class="label_pick">' + ops.optionId + '. ' + ops.value.slice(0, 5) + '...</span>\n                    </div>\n                ');
            }

            //向DOM添加节点
            inner.append(dependBox);

            function closeDepend(e) {

                try {
                    if (dependBox) {
                        var txt = inner.find('.depend_option>.selected'),
                            pickeds = dependBox.find('.pick_depend:checked');

                        txt.text('').attr('picked_option', '[]');

                        if (pickeds.length > 0) {

                            inner.find('.depend_option>.initialed').text('');

                            pickeds.each(function () {

                                txt.text(txt.text() + $(this).siblings('.label_pick').text());

                                var ar = JSON.parse(txt.attr('picked_option'));

                                ar.push($(this).val());

                                txt.attr('picked_option', JSON.stringify(ar));
                            });
                        }
                    }
                    dependBox.remove();
                    dependBox = null;
                } catch (e) {
                    console.log(e);
                }
            }
            dependBox.on('click', '.close_depend', closeDepend.bind(this));
            inner.find('.logic-control .save').on('click', closeDepend.bind(this));
            inner.find('.logic-control .cancel').on('click', closeDepend.bind(this));

            try {

                if (this.depend.itemId) {

                    var pickDepends = dependBox.find('.pick_depend'),
                        self = this;

                    pickDepends.each(function () {

                        if (self.depend.options.indexOf($(this).val()) > -1) {

                            $(this).prop('checked', true);
                        }
                    });
                }
            } catch (e) {}
        }

        function updateDependOption(e) {

            if (this.depend.itemId) {

                var txt = inner.find('.depend_option>.selected');

                if (this.depend.itemId === $(e.target).val()) {

                    try {
                        var options = this.depend.options;

                        if (options.length > 0) {

                            var str = '';

                            for (var _i14 = 0, _l4 = options.length; _i14 < _l4; _i14++) {
                                str += options[_i14].slice(0, 5) + '...; ';
                            }
                            txt.text(str).attr('picked_option', JSON.stringify(options)).siblings('.initialed').text('');
                        }
                    } catch (e) {}
                } else {
                    txt.text('').siblings('.initialed').text('点击选择选项');
                }
            }
        }

        try {
            if (s_depend_question.val(this.depend.itemId)) {
                changeDependOption.bind(this)(e);
            }
        } catch (e) {}

        //if (true){
        //
        //}
        s_depend_question.on('change', updateDependOption.bind(this));
        s_depend_option.on('click', changeDependOption.bind(this));

        //引用逻辑选项
        var s_quote_question = inner.find('.logic-control .quote_question');

        for (var _i15 = 0, _l5 = questions.length; _i15 < _l5; _i15++) {
            var _q2 = questions[_i15];
            if (_q2.active === true && (_q2.type === 'choice' || _q2.type === 'checks' || _q2.type === 'blank') && _q2.index < this.index) {
                s_quote_question.append('<option value="' + _q2.itemId + '">' + _q2.index + ',' + _q2.title.slice(0, 10) + '...</option>');
            }
        }
        try {
            s_quote_question.val(this.quote.itemId);
        } catch (e) {}

        //赋值逻辑选项
        var s_evaluate_question = inner.find('.logic-control .evaluate_question');

        for (var _i16 = 0, _l6 = questions.length; _i16 < _l6; _i16++) {
            var _q3 = questions[_i16];
            if (_q3.active === true && (_q3.type === 'choice' || _q3.type === 'checks') && _q3.index < this.index) {
                s_evaluate_question.append('<option value="' + _q3.itemId + '">' + _q3.index + ',' + _q3.title.slice(0, 10) + '...</option>');
            }
        }

        function changeEvaluate(e) {

            if (e) {
                if ($(e.target).val()) {
                    var options = questions[$(e.target).val()].options;
                }
            } else if (this.evaluate.itemId) {
                var options = questions[this.evaluate.itemId - 1];
            }

            for (var _i17 in options) {

                var thisOption = $('' + '<div class="evaluates">' + '<span>选项 ' + options[_i17].index + '.' + options[_i17].value.slice(0, 5) + '...</span>' + '<span contenteditable="true" class="input"></span>' + '</div>');

                if (this.evaluate.matches) {

                    if (this.evaluate.matches[options[_i17].optionId]) {
                        thisOption.find('.input').text(this.evaluate.matches[options[_i17].optionId]);
                    }
                }

                inner.find('.logic-control .evaluate_options').append(thisOption);
            }
        }

        try {
            s_evaluate_question.val(this.evaluate.itemId);
        } catch (e) {}

        //if (true){
        //
        //}
        s_evaluate_question.on('change', changeEvaluate.bind(this));

        //保存按钮
        inner.find('.logic-control').on('click', '.save', function (e) {

            var logics = inner.find('.logic-control'),
                q = questions[this.itemId - 1];

            q.words_restrict = {
                min: logics.find('.words-restrict>.min').text(),
                max: logics.find('.words-restrict>.max').text()
            };
            q.depend = {
                itemId: logics.find('.depend_question').val(),
                options: JSON.parse(logics.find('.depend_option>.selected').attr('picked_option'))
            };
            //q.jump = {
            //    options: [logics.find('.jump_option').val()],
            //    target: logics.find('.jump_target').val()
            //};
            q.relate = {
                itemId: logics.find('.relate_question').val()
            };
            q.quote = {
                itemId: logics.find('.quote_question').val()
            };
            q.evaluate = {
                itemId: logics.find('.evaluate_question').val()
            };
            if (q.evaluate.itemId) {
                var nodes = inner.find('.evaluate_options>.evaluates'),
                    options = questions[q.evaluate.itemId - 1].options;

                q.evaluate.matches = {};

                for (var _i18 in options) {
                    q.evaluate.matches[options[_i18].optionId] = {
                        optionId: options[_i18].optionId,
                        value: options[_i18].value,
                        text: $(nodes[_i18]).find('.input').text()
                    };
                }
            }
            logics.remove();
        }.bind(this));

        //放弃按钮
        inner.find('.logic-control').on('click', '.cancel', function (e) {
            inner.find('.logic-control').remove();
        });
    },
    save: function save(e) {

        this.editing = false;
        var data = {
            survey: sessionStorage.getItem('surveyId') || '',
            email: sessionStorage.getItem('surveyName'),
            singleQ: questions[this.itemId - 1],
            singeTitle: $('#title').text()
        },
            self = this;
        $.ajax({
            url: realPath + '/questionnaire/singleSaveOrUpdate',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify(data),
            success: function success(d) {
                var designNow = sessionStorage.getItem('surveyId');
                if (!designNow) {
                    sessionStorage.setItem('surveyId', d[0].surveyId);
                }
                self.itemKey = d[0].itemId;
            }
        });
    },
    cancel: function cancel(e) {
        this.editing = false;
    },
    editTitle: function editTitle(e) {

        var t = $(e.target);

        if (this.type instanceof Array) {
            var name = t.attr('name');
            this.title[name] = this.trim(t.text());
        }
        this.title = this.trim(t.text());
    },
    editRequired: function editRequired(e) {

        var t = $(e.target);

        if (t.prop('checked') === true) {

            this.required = true;

            t.siblings('label').find('.icon').addClass('checked');
        } else {

            this.required = false;

            t.siblings('label').find('.icon').removeClass('checked');
        }
    },
    editDescription: function editDescription(e) {
        this.description = this.trim($(e.target).text());
    },
    deleteOption: function deleteOption(e) {

        var t = $(e.target),
            id = t.attr('option_id');

        var ops = JSON.parse(JSON.stringify(this.options));

        delete ops[id];

        var index = 1;

        for (var i = 0, l = ops.length; i < l; i++) {

            if (ops[i].index == 99) {
                continue;
            }
            ops[i].optionId = ops[i].index = index;
            index += 1;
        }

        this.options = ops;
    },
    editOption: function editOption(e) {

        var id = $(e.target).attr('option_id');

        this.options[id].value = this.trim($(e.target).text());
    },
    editSuffix: function editSuffix(e) {
        this.suffix = this.trim($(e.target).val());
    },
    editFillable: function editFillable(e) {

        var t = $(e.target),
            id = t.attr('option_id');

        if (t.prop('checked') === true) {

            this.options[id].fillable = true;
            t.siblings('label').find('.icon').addClass('checked');
        } else {

            this.options[id].fillable = false;
            t.siblings('label').find('.icon').removeClass('checked');
        }
    },
    insertOption: function insertOption(e) {

        var ops = JSON.parse(JSON.stringify(this.options)),
            c = 0;

        for (var i in ops) {

            var n = ops[i].optionId;

            if (n > c && n != 99) {
                c = n;
            }
        }
        c += 1;

        var heightNow = this.$el.offsetHeight;

        ops[c] = {
            index: c,
            optionId: c,
            value: '',
            score: '',
            fillable: false
        };

        this.options = ops;

        if (this.$el.offsetHeight !== heightNow) {

            scrollToDem(this.$el.offsetHeight - heightNow);
        }
        var clear = this.mounted;
        setTimeout(clear, 100);
    },
    check: function check(e) {
        var t = $(e.target),
            icon = t.siblings('label').find('.icon');
        if (t.prop('checked') === true) {
            icon.find('span').css('background-color', '#5bc0ff');
        } else {
            icon.find('span').css('background-color', '#ffffff');
        }
    },
    changeForm: function changeForm(e) {

        var t = $(e.target);

        this.form = t.val();
    },
    changeClass: function changeClass(e) {

        var t = $(e.target);

        this.theClass = t.val();
    },
    deleteSubQuestion: function deleteSubQuestion(e) {

        var t = $(e.target),
            id = t.attr('question_id');

        var stq = JSON.parse(JSON.stringify(this.sub_questions));

        delete stq[id];

        var index = 1;

        for (var i = 0, l = stq.length; i < l; i++) {

            if (stq[i].index == 99) {
                continue;
            }
            stq[i].index = index;
            index += 1;
        }

        this.sub_questions = stq;
    },
    dragPrefix: function dragPrefix(event) {

        var start_coordinates = { //取起始坐标
            x: event.clientX,
            y: event.clientY
        },
            t = $(event.currentTarget),
            //取prefix行
        spread = false,
            edge = { bottom: -10, top: 42, divide: 16 };

        //判断prefix是否展开
        if (t.css('height') === '32px') {
            spread = true;
            edge = { bottom: -42, top: 10, divide: -16 };
        }

        //prefix边界随鼠标移动
        function dragRow(event) {

            var move_coordinates = { //取鼠标移动的即时坐标
                x: event.clientX,
                y: event.clientY
            },
                vector = move_coordinates.y - start_coordinates.y; //取鼠标即时的移动方向(正为向下,负为向上)

            if (vector >= edge.bottom && vector <= edge.top) {

                var height = spread ? 32 + vector : 4 + vector;
                t.css('height', height + 'px');
                t.find('.edit-prefix').css('height', height + 'px').css('fontSize', '0px');
            } else {
                endDrag(event);
            }
            if (vector < -10) {
                console.log(vector);
            }
        }

        //抬时鼠标键或者鼠标拖出区域时,结束并解绑
        function endDrag(event) {

            var move_coordinates = { //取鼠标移动的即时坐标
                x: event.clientX,
                y: event.clientY
            },
                vector = move_coordinates.y - start_coordinates.y;

            if (vector <= edge.divide) {
                t.find('.edit-prefix').animate({ height: '4px' }, 150).attr('contenteditable', false);
                t.animate({ height: '4px' }, 150);
            } else {
                t.animate({ height: '32px' }, 150);
                t.find('.edit-prefix').animate({ height: '32px' }).attr('contenteditable', true).css('fontSize', '14px').each(function () {
                    var e = $(this).text();$(this).empty().text(e);
                });
            }
            $('body').off('mousemove').off('mouseup');
            return;
        }

        $('body').on('mousemove', dragRow).on('mouseup', endDrag); //当拖动时,prefix行随之变动,抬起鼠标键时,解绑事件且结束
    },
    editPrefix: function editPrefix(event) {
        var t = $(event.target);
        this.sub_questions[t.attr('question_id')].prefix = this.trim(t.text());
    },
    insertSubQuestion: function insertSubQuestion(e) {

        var stq = JSON.parse(JSON.stringify(this.sub_questions)),
            c = 0;

        for (var i in stq) {

            var n = stq[i].index;

            if (n > c && n != 99) {
                c = n;
            }
        }
        c += 1;

        stq[c] = {
            index: c,
            title: ''
        };

        var heightNow = this.$el.offsetHeight;

        this.sub_questions = stq;

        if (this.$el.offsetHeight !== heightNow) {

            scrollToDem(this.$el.offsetHeight - heightNow);
        }
        var clear = this.mounted;
        setTimeout(clear, 100);
    },
    editSubQuestion: function editSubQuestion(e) {

        var id = $(e.target).attr('question_id');

        this.sub_questions[id].title = this.trim($(e.target).text());
    },

    toggleHour: function toggleHour(e) {

        var n = this.need.time;

        if ($(e.target).prop('checked') === true) {

            n.push('hour');
        } else {

            try {
                n.splice(n.indexOf('minute'), 1);
            } catch (e) {}
        }
    },
    toggleMinute: function toggleMinute(e) {

        var n = this.need.time;

        if ($(e.target).prop('checked') === true) {

            n.push('minute');
        } else {

            try {
                n.splice(n.indexOf('minute'), 1);
            } catch (e) {}
        }
    },
    toggleSecond: function toggleSecond(e) {

        var n = this.need.time;

        if ($(e.target).prop('checked') === true) {

            n.push('second');
        } else {

            try {
                n.splice(n.indexOf('second'), 1);
            } catch (e) {}
        }
    },
    toggleYear: function toggleYear(e) {

        var n = this.need.date;

        if ($(e.target).prop('checked') === true) {

            n.push('year');
        } else {

            try {
                n.splice(n.indexOf('year'), 1);
            } catch (e) {}
        }
    },
    toggleMonth: function toggleMonth(e) {

        var n = this.need.date;

        if ($(e.target).prop('checked') === true) {

            n.push('month');
        } else {

            try {
                n.splice(n.indexOf('month'), 1);
            } catch (e) {}
        }
    },
    toggleDate: function toggleDate(e) {

        var n = this.need.date;

        if ($(e.target).prop('checked') === true) {

            n.push('date');
        } else {

            try {
                n.splice(n.indexOf('date'), 1);
            } catch (e) {}
        }
    },
    mark: function mark(e) {

        var t = $(e.target);

        if (t.prop('checked') === true) {}
    },
    editScore: function editScore(e) {

        var t = $(e.target),
            id = t.attr('option_id');

        this.options[id].score = this.trim(t.text());
    }
};

//当新建题目,新加选项时,自动滚动页面到最后面
function scrollToDem(t) {

    var scrollTo;

    if (t instanceof Number) {
        scrollTo = t;
    } else {
        var $r = $('#room'),
            scrollTopNow = $r[0].scrollTop,
            height = t[0].offsetHeight;

        scrollTo = scrollTopNow + height;
    }

    $r.animate({ scrollTop: scrollTo }, 200);
}

//创建Vue对象
function createVue(obj) {

    var el = '#q' + obj.itemId;

    vues.push(new Vue({

        el: el,

        data: obj,

        methods: funcs,

        mounted: function mounted() {
            $(this.$el).find('[contenteditable=true]').each(function () {
                var v = $(this).text();
                $(this).empty().text(v);
            });
        }
    }));
    total += 1;
    //向下滚动到合适位置
    scrollToDem($(el));
}

function createMessageVue(obj) {

    var el = '#q' + obj.itemId;

    vues.push(new Vue({

        el: el,

        data: obj,

        methods: funcs,

        mounted: funcs.mounted
    }));
    total += 1;

    //向下滚动到合适位置
    scrollToDem($(el));
}

//暴露接口
module.exports.createQuestion = createQuestion;
module.exports.createMatrixQuestion = createMatrixQuestion;
module.exports.createMessage = createMessage;
module.exports.drawQuestion = drawQuestion;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(['</span>'], ['</span>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Created by wangxiangyang on 2017/11/15.
 */

//收集设置渲染
function renderCollectControl() {
    //问卷收集部分的选项
    if (!window.sets) {

        window.sets = {
            total_top: 0,
            total_bottom: 0,
            time_question: {
                restrict: false,
                time: null
            },
            time_survey: {
                restrict: false,
                time: null
            },
            clientOnly: false,
            disposableForClient: false,
            disposableForIp: false,
            disposableForDevice: false,
            passwordNeeded: false,
            verificationCodeNeeded: false,
            allocations: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [{
                    index: 0,
                    question_id: '',
                    question_title: '',
                    options: {},
                    sum_top: 0,
                    sum_bottom: 0,
                    allocate_option: [{
                        op_index: 0,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    }, {
                        op_index: 1,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    }]
                }]
            },
            allocation_cross: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [{
                    index: 0,
                    options: {},
                    conditionString: '',
                    allocate_bottom: 0,
                    allocate_top: 0,
                    percent_bottom: 0,
                    percent_top: 0,
                    percent_average: 0
                }, {
                    index: 1,
                    options: {},
                    conditionString: '',
                    allocate_bottom: 0,
                    allocate_top: 0,
                    percent_bottom: 0,
                    percent_top: 0,
                    percent_average: 0
                }]
            }
        };
    }
    sets.allocations.summary_bottom = sets.allocation_cross.summary_bottom = sets.total_bottom;
    sets.allocations.summary_top = sets.allocation_cross.summary_top = sets.total_top;

    var setsV = new Vue({
        el: '#collect_control',
        data: sets,
        methods: {
            updateTotalTop: function updateTotalTop(event) {
                this.allocations.summary_top = parseInt($(event.target).val());
                this.allocation_cross.summary_top = parseInt($(event.target).val());
            },
            updateTotalBottom: function updateTotalBottom(event) {
                this.allocations.summary_bottom = parseInt($(event.target).val());
                this.allocation_cross.summary_bottom = parseInt($(event.target).val());
            }
        }
    });
}

//点击到设置配额界面时,加载数据
function renderAllocateControl() {

    var allocationV = new Vue({
        el: '#allocate_basic',
        data: sets.allocations,
        methods: {
            updateSummaryBottom: function updateSummaryBottom(event) {
                sets.total_bottom = this.summary_bottom = $(event.target).val();
            },
            updateSummaryTop: function updateSummaryTop(event) {
                sets.total_bottom = this.summary_top = $(event.target).val();
            },
            findTP: function findTP(event) {
                var t = $(event.target),
                    p = t.parents('.allocation').attr('index');
                return [t, p];
            },
            findTPG: function findTPG(event) {
                var t = $(event.target),
                    p = t.parents('tr').attr('op_index'),
                    g = t.parents('.allocation').attr('index');
                return [t, p, g];
            },
            selectQuestion: function selectQuestion(event) {
                var _findTP = this.findTP(event),
                    _findTP2 = _slicedToArray(_findTP, 2),
                    t = _findTP2[0],
                    p = _findTP2[1];

                if (t.val() === 'deletethis') {
                    this.allocatings.splice(p, 1);
                } else {
                    this.allocatings[p].question_id = t.val();
                    this.allocatings[p].options = this.question_list[t.find(':selected').attr('item_id') - 1].options ? this.question_list[t.find(':selected').attr('item_id') - 1].options : {};
                }
            },
            selectOption: function selectOption(event) {
                var _findTPG = this.findTPG(event),
                    _findTPG2 = _slicedToArray(_findTPG, 3),
                    t = _findTPG2[0],
                    p = _findTPG2[1],
                    g = _findTPG2[2];

                if (t.val() === 'deletethis') {
                    this.allocatings[g].allocate_option.splice(p, 1);
                } else {
                    this.allocatings[g].allocate_option[p].value = t.val();
                }
            },
            editAllocationBottom: function editAllocationBottom(event) {
                var _findTPG3 = this.findTPG(event),
                    _findTPG4 = _slicedToArray(_findTPG3, 3),
                    t = _findTPG4[0],
                    p = _findTPG4[1],
                    g = _findTPG4[2],
                    allocatings = this.allocatings,
                    options = allocatings[g].allocate_option,
                    sum_bottom = 0,
                    allocate_bottom = 0;

                options[p].allocation_bottom = parseInt(t.val());

                options[p].percent_bottom = Math.round(options[p].allocation_bottom * 100 / this.summary_bottom);

                for (var i in options) {
                    sum_bottom += options[i].allocation_bottom;
                }
                allocatings[g].sum_bottom = sum_bottom;

                for (var _i in allocatings) {
                    allocate_bottom += allocatings[_i].sum_bottom;
                }
                this.allocate_bottom = allocate_bottom;
            },
            editAllocationTop: function editAllocationTop(event) {
                var _findTPG5 = this.findTPG(event),
                    _findTPG6 = _slicedToArray(_findTPG5, 3),
                    t = _findTPG6[0],
                    p = _findTPG6[1],
                    g = _findTPG6[2],
                    allocatings = this.allocatings,
                    options = allocatings[g].allocate_option,
                    sum_top = 0,
                    allocate_top = 0;

                options[p].allocation_top = parseInt(t.val());

                options[p].percent_top = Math.round(options[p].allocation_top * 100 / this.summary_top);

                for (var i in options) {
                    sum_top += options[i].allocation_top;
                }
                allocatings[g].sum_top = sum_top;

                for (var _i2 in allocatings) {
                    allocate_top += allocatings[_i2].sum_top;
                }
                this.allocate_top = allocate_top;
            },
            insertAllocation: function insertAllocation(event) {
                var _findTP3 = this.findTP(event),
                    _findTP4 = _slicedToArray(_findTP3, 2),
                    t = _findTP4[0],
                    p = _findTP4[1],
                    allocations = this.allocatings[p].allocate_option;

                allocations.push({
                    op_index: allocations.length,
                    value: '',
                    allocation_top: 0,
                    percent_top: 0,
                    allocation_bottom: 0,
                    percent_bottom: 0,
                    collected: 0
                });
            },
            deleteAllocation: function deleteAllocation(event) {
                var _findTPG7 = this.findTPG(event),
                    _findTPG8 = _slicedToArray(_findTPG7, 3),
                    t = _findTPG8[0],
                    p = _findTPG8[1],
                    g = _findTPG8[2],
                    options = this.allocatings[g].allocate_option,
                    option = options[p];

                options.splice(options.indexOf(option), 1);
            },
            insertTable: function insertTable(event) {
                var allocatings = this.allocatings,
                    t = event.target;
                allocatings.push({
                    index: allocatings.length,
                    question_id: '',
                    question_title: '',
                    options: {},
                    sum_top: 0,
                    sum_bottom: 0,
                    allocate_option: [{
                        op_index: 0,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    }, {
                        op_index: 1,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    }]
                });
                setTimeout(function () {
                    t.scrollIntoView(false);
                }, 100);
            }
        }
    });

    var allocation_cross = new Vue({
        el: '#allocate_cross',
        data: sets.allocation_cross,
        mounted: function mounted() {
            $(this.$el).find('.writable').each(function () {
                var v = $(this).text();
                $(this).empty().text(v);
            });
        },
        methods: {
            findTP: function findTP(event) {
                var t = $(event.target),
                    p = t.parents('tr').attr('index');
                return [t, p];
            },
            moveToEnd: function moveToEnd(that) {
                if (document.all) {
                    that.range = document.selection.createRange();
                    that.range.select();
                    that.range.moveStart("character", -1);
                } else {
                    that.range = window.getSelection().getRangeAt(0);
                    that.offset = that.range.startOffset;

                    return that.offset;
                }
            },
            middlePostion: function middlePostion(event, char) {
                event.preventDefault();
                var t = $(event.target),
                    p = t.parents('.conditions'),
                    g = t.parents('tr').attr('index');
                if (document.all) {
                    return;
                    //t.range=document.selection.createRange();
                    //t.range.select();
                    //t.range.moveStart("character",-1);
                } else {
                    t.range = window.getSelection().getRangeAt(0);
                    t.index = Array.prototype.indexOf.call(t[0].childNodes, t.range.startContainer);
                    t.container = t.range.startContainer;
                    t.offset = t.range.startOffset;
                    var arr = t.text().split('');
                    arr.splice(c.offset, 0, char);
                    var text = arr.join('');
                    t.text(text);
                    this.allocatings[g].conditionString = text;
                    t.focus();
                    t.range.setStart($(t.range.startContainer)[0].childNodes[t.index], t.offset + 1);
                }
            },
            editExpression: function editExpression(event) {
                var _findTP5 = this.findTP(event),
                    _findTP6 = _slicedToArray(_findTP5, 2),
                    t = _findTP6[0],
                    p = _findTP6[1],
                    v = t.text();

                this.allocatings[p].conditionString = v;
            },
            keysFuncs: function keysFuncs(event) {

                var n = event.keyCode,
                    c = event.ctrlKey,
                    a = event.altKey,
                    m = event.metaKey,
                    s = event.shiftKey;

                $(event.target).parents('.conditions').find('.questions-in-expression').hide();

                if (n === 32) {
                    var _findTP7 = this.findTP(event),
                        _findTP8 = _slicedToArray(_findTP7, 2),
                        t = _findTP8[0],
                        p = _findTP8[1];

                    event.preventDefault();
                    if (document.all) {} else {

                        t.range = window.getSelection().getRangeAt(0);

                        if (/q$/.test(t.range.startContainer.data.slice(0, t.range.startOffset))) {
                            this.chooseQuestion(event);
                        } else if (t.range.startContainer.data.slice(0, t.range.startOffset).match(/q(\d+)=$/)) {
                            this.chooseAnswer(event, t.range.startContainer.data.slice(0, t.range.startOffset).match(/q(\d+)=$/)[1]);
                        }
                    }
                } else if (n === 40 || n === 65288) {
                    this.openBracket(event);
                } else if (n === 41 || n === 65289) {
                    this.closeBracket(event);
                } else if (n === 61) {
                    //this.chooseAnswer(event)
                } else if (n === 38) {
                    this.insertAnd(event);
                } else if (n === 124) {
                    this.insertOr(event);
                } else if (n === 33 || n === 65281) {
                    this.insertNot(event);
                }
            },
            chooseQuestion: function chooseQuestion(event) {
                $(event.target).parents('.conditions').find('.questions-in-expression').show();
            },
            pickQuestion: function pickQuestion(event) {
                var t = $(event.target),
                    question_id = t.attr('item_id'),
                    l = question_id.length,
                    p = t.parents('.conditions'),
                    c = p.find('.express'),
                    g = t.parents('tr').attr('index');

                t.parents('.questions-in-expression').hide();

                if (document.all) {
                    return;
                    //t.range=document.selection.createRange();
                    //t.range.select();
                    //t.range.moveStart("character",-1);
                } else {
                    c.range = window.getSelection().getRangeAt(0);
                    c.index = Array.prototype.indexOf.call(c[0].childNodes, c.range.startContainer);
                    c.offset = c.range.startOffset;
                    var arr = c[0].childNodes[c.index].data.split('');
                    arr.splice(c.offset, 0, question_id);
                    var text = arr.join('');
                    c[0].childNodes[c.index].data = text;
                    this.allocatings[g].conditionString = c.html();
                    c.focus();
                    c.range.setStart(c[0].childNodes[c.index], c.offset + parseInt(l));
                }
            },
            openBracket: function openBracket(event) {
                this.middlePostion(event, '(');
            },
            closeBracket: function closeBracket(event) {
                this.middlePostion(event, ')');
            },
            chooseAnswer: function chooseAnswer(event, itemid) {
                this.allocatings[$(event.target).parents('tr').attr('index')].options = this.question_list[itemid - 1].options;
                $(event.target).parents('.conditions').find('.options-in-expression').show();
            },
            pickAnswer: function pickAnswer(event) {
                if (event.type === 'keypress') {
                    if (event.keyCode !== 13) {
                        $(event.target).attr('title', $(event.target).text());
                        return;
                    }
                }
                var t = $(event.target),
                    v = t.attr('title'),
                    l = v.length,
                    p = t.parents('.conditions'),
                    c = p.find('.express'),
                    g = t.parents('tr').attr('index');

                t.parents('.options-in-expression').hide();

                if (document.all) {
                    return;
                    //t.range=document.selection.createRange();
                    //t.range.select();
                    //t.range.moveStart("character",-1);
                } else {
                    c.range = window.getSelection().getRangeAt(0);
                    c.index = Array.prototype.indexOf.call(c[0].childNodes, c.range.startContainer);
                    c.offset = c.range.startOffset;
                    var arr = c[0].childNodes[c.index].data.split('');
                    arr.splice(c.offset, 0, v);
                    var text = arr.join('');
                    c[0].childNodes[c.index].data = text;
                    this.allocatings[g].conditionString = c.html();
                    c.focus();
                    c.range.setStart(c[0].childNodes[c.index], c.offset + parseInt(l));
                }
            },
            insertAnd: function insertAnd(event) {
                event.preventDefault();
                this.insertRelation(event, '&&');
            },
            insertOr: function insertOr(event) {
                event.preventDefault();
                this.insertRelation(event, '||');
            },
            insertNot: function insertNot(event) {
                event.preventDefault();
                this.insertRelation(event, ' !');
            },
            insertRelation: function insertRelation(event, char) {
                var t = $(event.target),
                    p = t.parents('tr').attr('index'),
                    nodes = t[0].childNodes,
                    l = nodes.length + 1;
                nodes[l - 2].data += ' ';
                t.append('<b>' + char + '</b>').append(document.createTextNode(' q'));
                this.allocatings[p].conditionString = t.html();
                t.range = window.getSelection().getRangeAt(0);
                t.range.setStart(nodes[l], 2);
            },
            editEdge: function editEdge(event) {
                var t = $(event.target),
                    cls = t.className,
                    al = this.allocatings[t.parents('tr').attr('index')];

                al['allocate_' + cls] = t.val();
                al['percent_' + cls] = Math.round(al['allocate_' + cls] * 100 / this['summary_' + cls]);

                if (al.percent_bottom === 0) {
                    al.precent_average = al.percent_top;
                } else if (al.percent_top === 0) {
                    al.percent_average = al.percent_bottom;
                } else {
                    al.percent_average = Math.round((al.percent_bottom + al.percent_top) / 2);
                }
            },
            insertCondition: function insertCondition(event) {
                var allocatings = this.allocatings,
                    index = allocatings.length;
                allocatings.push({
                    index: index,
                    options: {},
                    conditionString: '',
                    allocate_bottom: 0,
                    allocate_top: 0,
                    percent_bottom: 0,
                    percent_top: 0,
                    percent_average: 0
                });
            }
        }
    });
    //}
}

function prepareForProgressControl() {

    var surveyName = sessionStorage.getItem('surveyName');
    fillOptions(surveyName);
}

function prepareForQualityControl() {

    var surveyName = sessionStorage.getItem('surveyName');

    fillOptions(surveyName);
}

function fillOptions(surveyName) {

    $.ajax({
        url: realPath + '/questionnaire/searchWjTitle',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({
            email: surveyName
        }),
        success: function success(data) {
            var options = '<option value="">\u8BF7\u9009\u62E9</option>',
                ql = data[0].result;
            for (var i = 0, l = ql.length; i < l; i++) {
                options += '<option value="' + ql[i].wjId + '" title="' + ql[i].title + '">' + ql[i].wjId + '. ' + ql[i].title.slice(0, 5) + '...</option>';
            }
            $('.select_survey_by_name').html(options);
        }
    });
}

//进度控制
function renderProgressControl(event) {

    var surveyId = $(event.target).parent().siblings('.select_survey_by_name').val(); //取问卷id

    function displayProgress(data) {

        $('#set_ui').find('.set.progress').css('display', 'block');

        var progressSumVue = new Vue({
            el: '#progress_basic',
            data: data[0].allocations
        }),
            progressCrossVue = new Vue({
            el: '#progress_cross',
            data: data[0].allocation_cross
        });
    }

    //请求数据
    $.ajax({
        url: realPath + '/questionnaire/progress',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({ survey: surveyId }),
        success: function success(data) {
            displayProgress(data);
        }
    });
}

//质量控制
function renderQualityControl() {

    $('#set_ui').find('.set.quality').css('display', 'block');

    var surveyId = $(event.target).parent().siblings('.select_survey_by_name').val(); //取问卷id

    function arrangeQuestion(data) {
        //var top_label = new Vue({
        //    el: '#toptable',
        //    data: data
        //}),
        //    width = 0;
        //for (let i = 0, l = data.question_list.length; i < l; i++){
        //    width += 202
        //}
        //
        //return supposedWidth = width || 122 + 'px'
        var top_labels = '';
        for (var i = 0, l = data.length; i < l; i++) {

            switch (data[i].type) {

                case 'choice':
                    top_labels += '<span item_index="' + data[i].index + '">' + data[i].index + '</span>';
                    break;
                case 'checks':
                    for (var j = 0, ln = data[i].option.length; j < ln; j++) {
                        top_labels += '<span item_index=\'' + data[i].index + '\' option_code="' + data[i].option[j].option_code + '">' + data[i].index + '. ' + data[i].option[j].option_code(_templateObject);
                    }
                    break;
                case 'blank':

                    break;
                case 'matrix':
                    break;
                case 'score':
                    break;
                default:
                    return;
            }
        }
    }
    function fillAnswers(data) {
        //window.result_list = data;
        //var main = new Vue({
        //    el: '#answers',
        //    data: result_list
        //})
    }
    function programmingTable() {
        //最后整理框架样式
        //如果边框宽度一样，则宽度+1个右边框
        //否则要宽度+左边框宽度+右边框宽度-本身边框宽度
        var marginLeft = parseInt($("#toplefttbl").css('width').match(/\d+/g)[0]) + parseInt($("#toplefttbl").css("border-right-width").match(/\d+/g)[0]);
        var marginTop = parseInt($("#toplefttbl").css('height').match(/\d+/g)[0]) + parseInt($("#toplefttbl").css("border-bottom-width").match(/\d+/g)[0]);
        $("#toptable").css("margin-left", marginLeft + "px") //设置顶部栏距左距离
        .css('width', supposedWidth);
        //$("#lefttable").css("margin-top", marginTop + "px"); //设置左边栏距上距离
        //设置内容表格距左距上距离
        $("#datatable").css("margin-left", marginLeft + "px").css("margin-top", marginTop + "px").css('width', supposedWidth);
        //顶部栏外层DIV宽度为 总容器宽度-滚动轴宽度(16为滚动轴宽度)
        $("#topdv").css("width", $("#container").width() - 16);
        $("#leftdv").css("height", $("#container").height() - 16);
        //容器滚动事件
        $("#container").scroll(function () {
            var currentScrollTop = $(this).scrollTop();
            var currentScrollLeft = $(this).scrollLeft();
            $("#topdv").find(".table-mask").css("left", -currentScrollLeft + "px");
            $("#leftdv").find(".table-mask").css("top", -currentScrollTop + "px");
        });
    }

    $.ajax({
        url: realPath + '/questionnaire/qualityControl',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({ survey: surveyId }),
        success: function success(data) {
            arrangeQuestion(data[0].questions);
            fillAnswers(data[0].answers);
            programmingTable();
        }
    });
    //var questions = {
    //    question_list: [
    //        {index: 1,title: '第一题'},
    //        {index: 2,title: '第二题'},
    //        {index: 3,title: '第三题'},
    //        {index: 4,title: '第四题'}
    //    ]
    //},
    //    results = {
    //        results: [
    //            {
    //                resultId: 1,
    //                availability: 1,
    //                reason: '',
    //                list: [23,34,43,21]
    //            },{
    //                resultId: 2,
    //                availability: 0,
    //                reason: '甄别题没过',
    //                list: [54,234,654,3]
    //            },{
    //                resultId: 3,
    //                availability: 1,
    //                reason: '',
    //                list: [15,63,84,412]
    //            }
    //        ]
    //    };
    //arrangeQuestion(questions);
    //fillAnswers(results);
    //programmingTable();
}

//暴露接口
module.exports.renderCollectControl = renderCollectControl;
module.exports.renderAllocateControl = renderAllocateControl;
module.exports.prepareForProgressControl = prepareForProgressControl;
module.exports.renderProgressControl = renderProgressControl;
module.exports.prepareForQualityControl = prepareForQualityControl;
module.exports.renderQualityControl = renderQualityControl;

/***/ })
/******/ ]);
//# sourceMappingURL=packedDesign.js.map