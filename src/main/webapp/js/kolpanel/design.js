/**
 * Created by wangxiangyang on 2017/9/27.
 */
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPath+projectName;


//sessionStorage.setItem('surveyName', '7389091');

if(sessionStorage.getItem("surveyName")==null){
     location.href = realPath + "/wjLogin";
 } else {
    $('#header .signin .name').text(sessionStorage.getItem("surveyName"))
}
var sets;

//左侧菜单的点击显示
function spreadMenu(e){
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

    $menuBox.animate({width: wi, height: hi}, 300 ,function(){
        listQuestion();
        $('#menu').off('click').on('click', packUp)
    })
}

//收起目录
function packUp(event){
    var $menuBox = $('#menu_box'),
        t = $(event.target);
    $menuBox.animate({width: '72px', height: '36px'}, 300, function(){$menuBox.remove()});
    submit();
    t.off('click');
    $('#menu').on('click',spreadMenu);
}

//将目录展示出来
function listQuestion(){

    let box = $('#menu_box'),
        list = $(`<div id="menulist"></div>`),
        qs = questions,
        l = questions.length,
        i;

    for (i = 0; i < l; i++){

        let q = qs[i],
            active = q.active,
            order = q.ordericon || q.index;

        if (active){
            list.append(`
        <div class="menu-item" index="`+ q.index +`" itemid="`+ q.itemId +`">
            <span class="index" index="`+ q.index +`" ordericon="`+ q.ordericon +`">`+ order +`</span>
            <span class="title" title="`+ q.title +`">`+ q.title +`</span>
            <i class="skip"></i>
        </div>
        `)
        }
    }
    box.append(list)
}

//点击skip跳转到相应题目
function skipToItem(event){

    var itemId = $(event.target).parent().attr('itemid'),
        item = $('#q' + itemId),
        inner = item.find('.inner'),
        wrap = $('#wrap');

    item[0].scrollIntoView();
    inner.addClass('skip-target');
    setTimeout(function(){inner.removeClass('skip-target')},1500);
    wrap.off('click', packUp).on('click', packUp)
}

//点击事件<元素变为可编辑+将值赋予到placeholder上+聚焦+添加类+绑定失焦事件>
function contenteditableToggle(event){

    let t = $(event.target);
        //holder = t.attr('ordericon') || t.attr('index') || t.attr('title');

    t.prop('contenteditable', true)
        .addClass('editing')//添加样式class
        //.empty()
        //.attr('placeholder', holder);
        .focus()
}

//失焦事件<元素变为不可编辑+填充text()+判断现有值是否和index相同(即是否有变动)并赋予变量+移除类>
function fixQ(event){

    let t = $(event.target),//目标
        p = t.parent(),//父元素.menu-item
        itemId = p.attr('itemid'),//用于在questions中定位q
        q = questions[itemId-1],
        index = p.attr('index'),
        v = t.text(),
        vd = v.replace(/(^\s*)|(\s*$)/g, '');//去空格

    t.prop('contenteditable', false)
        .removeClass('editing');//移除样式class
        //.attr('placeholder','');

    if (t.text()){//如果用户输入了值

        t.text(vd);//填充去前后空格之后的内容

        if (t.hasClass('index')){//如果是序号栏

            if (parseInt(vd) !== index){//如果序号栏内容有变更
                q.ordericon = vd;
                t.attr('ordericon', vd);//更新属性值
            }
        } else {
            q.title = vd;
            t.attr('title', vd);//更新属性值

            $('#q' + itemId).find('.edit .question_title').text(vd);//手动更新编辑界面的title
        }
    } else if (t.hasClass('index')){
        t.text(q.ordericon || q.index)
    } else if (t.hasClass('title')){
        t.text(q.title)
    }
}

//当按回车键时,触发blur
function confirmFix(event){
    if (event.keyCode === 13){
        $(event.target).blur()
    }
}

//输入框的placeholder聚焦和失焦
function clearHolder(e){

    var t = $(e.target),
        h = t.attr('placeholder');

    t.attr('placeholder', '');

    function fillHolder(e){

        var t = $(e.target);

        t.attr('placeholder', h);

        t.off('blur')
    }

    t.on('blur', fillHolder)
}

//进度状态切换显示
function switchProcess(e){

    let t = $(e.target);

    if(!t.hasClass('active')){

        t.addClass('active').siblings('li').removeClass('active');

        var left = $('#left'),
            analysis = $('#analysis'),
            setUi = $('#set_ui');

        if (t.hasClass('design')){

            left.find('.design').addClass('active').siblings('.side').removeClass('active');
            analysis.css('display','none');
            setUi.css('display', 'none');

        } else if (t.hasClass('set')){

            left.find('.set').addClass('active').siblings('.side').removeClass('active');
            analysis.css('display','none');
            setUi.css('display', 'block');
            renderCollectControl();

        } else if (t.hasClass('analyze')){

            left.find('.analyze').addClass('active').siblings('.side').removeClass('active');
            setUi.css('display', 'none');
            analysis.css('display','block');
            //displayAnalyze()
        }
    }
}

//左边栏的点击事件切换显示状态方法
function switchBars(e){

    var t = $(e.target);

    if (t.hasClass('active')){

        return

    } else if (t.hasClass('finally')){
            return
    } else {
        t.addClass('active').siblings('.tag').removeClass('active')
    }

    //渲染右侧
    let set_ui = $('#set_ui');
    if (t.hasClass('allocate-control')){//进度界面
        set_ui.find('.set.allocate').css('display','block');
        renderAllocateControl()
    } else {
        set_ui.find('.set.allocate').css('display','none');
    }
    if (t.hasClass('progress-control')){//进度界面
        prepareForProgressControl()
    } else {
        set_ui.find('.set.progress').css('display','none');
    }
    if (t.hasClass('quality-control')){//质控界面
        prepareForQualityControl()
    } else {
        set_ui.find('.set.quality').css('display','none');
    }
    if (t.hasClass('collect-control')){//总设置界面
        set_ui.find('.set').css('display','none')
    }

    if (t.hasClass('first')){

        if (!t.siblings().is('animated') || !t.is('animated')){

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.fifth').css('top','').animate({bottom: '0'},100);
            t.siblings('.tag.forth').css('top','').animate({bottom: '36px'},100);
            t.siblings('.tag.third').css('top','').animate({bottom: '72px'},100);
            t.siblings('.tag.second').css('top','').animate({bottom: '108px'},100, function(){

                t.siblings('.bar.first').addClass('active')
            });
        }
    } else if (t.hasClass('second')){

        if (!t.siblings().is('animated') || !t.is('animated')){

            t.siblings('.bar').removeClass('active');
            t.css('bottom','').animate({top: '36px'},100);
            t.siblings('.tag.fifth').css('top','').animate({bottom: '0'},100);
            t.siblings('.tag.forth').css('top','').animate({bottom: '36px'},100);
            t.siblings('.tag.third').css('top','').animate({bottom: '72px'},100, function(){

                t.siblings('.bar.second').addClass('active')
            });
        }

    } else if (t.hasClass('third')){

        if (!t.siblings().is('animated') || !t.is('animated')){

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.second').css('bottom','').animate({top: '36px'},100);
            t.css('bottom','').animate({top: '72px'},100);
            t.siblings('.tag.fifth').css('top','').animate({bottom: '0'},100);
            t.siblings('.tag.forth').css('top','').animate({bottom: '36px'},100, function(){

                t.siblings('.bar.third').addClass('active')
            });
        }

    } else if (t.hasClass('forth')){

        if (!t.siblings().is('animated') || !t.is('animated')){

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.second').css('bottom','').animate({top: '36px'},100);
            t.siblings('.tag.third').css('bottom','').animate({top: '72px'},100);
            t.css('bottom','').animate({top: '108px'},100);
            t.siblings('.tag.fifth').css('top','').animate({bottom: '0'},100, function(){

                t.siblings('.bar.forth').addClass('active')
            })
        }
    } else {

        if (!t.siblings().is('animated') || !t.is('animated')){

            t.siblings('.bar').removeClass('active');

            t.siblings('.tag.second').css('bottom','').animate({top: '36px'},100);
            t.siblings('.tag.third').css('bottom','').animate({top: '72px'},100);
            t.siblings('.tag.forth').css('bottom','').animate({top: '108px'},100);
            t.css('bottom','').animate({top: '144px'},100, function(){

                t.siblings('.bar.fifth').addClass('active')
            })
        }
    }
}

//矩阵题型可视化
function drawMatrix(e){

    var t = $(this);
    window.row = t.attr('row');
    window.col = t.attr('col');

    t.css('background-color', '#999999')
        .parent().siblings('.count').find('.cols').text(col);
    t.parent().siblings('.count').find('.rows').text(row);

    t.siblings('.cell').each(function(){

        if ($(this).attr('row') <= row && $(this).attr('col') <= col){

            $(this).css('background-color', '#999999')
        } else {

            $(this).css('background-color', 'transparent')
        }
    })
}

function createMatrix(e){

    var t = $(this);
}

function cleanDrawMatrix(e){

    var t = $(this);

    window.row = '0';
    window.col = '0';

    t.find('.cell').css('background-color','transparent');
    t.siblings('.count').find('.cols').text('0');
    t.siblings('.count').find('.rows').text('0');
}

//左边栏选中信息题型的勾选框样式变化
function changeChecks(e){

    var t = $(this);

    if (t.prop('checked') === true){

        t.siblings().find('.icon').addClass('active')

    } else {

        t.siblings().find('.icon').removeClass('active')
    }
}

//左侧选中颜色的勾选方法
function pickColor(e){

    var t = $(e.target),
        v = t.val(),
        css = 'repeating-linear-gradient(60deg,#ffffff, #ffffff 10px, '+ v +' 0, ' + v +' 20px)';

    if (t.prop('checked')){
        $('#colors').find('label').removeClass('picked');
        t.siblings('label').addClass('picked');
        $('#edge').css('background', css)
    }
}

//清理数据
function cleanData(data){
    for (let i in data){
        if (i == 'question_list' || i == 'options'){
            data[i] = null
        }
        if (typeof data[i] === 'object'){
            cleanData(data[i])
        }
    }
}

//问卷提交保存方法
function submit(event){
    //打包数据
    cleanData(sets);

    var details = {
        survey: sessionStorage.getItem('surveyId') || '',
        email: sessionStorage.getItem('surveyName') || '571029031@qq.com',
        titles: {
            title: $('#title>span').text()
        },
        subtitle: {
            subtitle: $('#subtitle>span').text()
        },
        sets: sets || {},
        style: {
            color: $('input[name=color]:checked').val()
        },
        list: questions
    };
    //提交保存
    $.ajax({
        url:  "" + realPath + "/questionnaire/add",
        type: 'post',
        contentType: 'application/json;charset=utf',
        dataType: 'json',
        async: true,
        data: JSON.stringify(details),
        success: function(d){
            if (d[0].error_code =='success'){
                if ($(event.target).attr('id') === 'submit'){
                    warnSuccess(d[0].result);
                }
            } else if(d[0].error_code =='login'){
                window.location.href = realPath+"/wjLogin";
            }else {
                warnFailed()
            }
        },
        error: function(e){
            warnConnectedFailed()
        }
    })
}

//请求成功
function warnSuccess(data){

    window.warn_success = $(document.createElement('div'));

    warnRender(warn_success, '保存成功');
    sessionStorage.setItem("link", realPath+"/display?wj="+data);
    window.location.href = realPath+"/html/kolpanel/PublicLink.html";
}

//请求失败的警告
function warnFailed(){

    window.warn_failed = $(document.createElement('div'));

    warnRender(warn_failed, '保存失败');
}

//连接失败的警告
function warnConnectedFailed(){

    window.warn_connected_failed = $(document.createElement('div'));

    warnRender(warn_connected_failed, '连接失败,请稍后再试')
}

//警告渲染
function warnRender(obj,str){

    obj.text(str);

    var l = (str.length * 1.2 + 4) + 'rem';

    obj.css('width', l);

    obj.css('position','fixed');
    obj.css('left',getSize()[0] / 2 - 60 + 'px');
    obj.css('top',getSize()[0] / 2 - 15 + 'px');
    obj.css('display','none');
    obj.css('height','30px');
    obj.css('background-color','rgba(255,250,240,0.7)');
    obj.css('box-shadow','0 0 1px 0 #c9c9c9');
    obj.css('outline','1px solid #d9d9d9');
    obj.css('outline-offset','-3px');
    obj.css('text-align','center');
    obj.css('font-size','1.2rem');
    obj.css('line-height','30px');
    obj.css('z-index','1200');

    $('#survey_container').append(obj);
    obj.fadeIn(700);

    var warnDisappear = setTimeout(function(){
        obj.fadeOut(500, function(){
            var warnRemove = setTimeout(function(){
                obj.remove();
                obj = null
            },700)
        });
    }, 3000)
}

//当在题目上点击鼠标时,题目进入编辑状态
function quickEdit(event){

    if ($(event.target).hasClass('button')){
        return false
    }
    var thisVue = vues[$(event.currentTarget).attr('id').slice(1)-1],
        editing = thisVue.editing,
        edit = thisVue.edit;

    if (!editing){
        edit()
    }
}

//当按command+enter或ctrl+enter时,触发题目的save方法
function quickSave(event){

    if (event.keyCode === 13){
        if (event.ctrlKey || event.metaKey){
            vues[$(event.currentTarget).attr('id').slice(1)-1].save();
        }
    }
}

//当将要被关闭时,弹出确定框
function confirmClose(e){
    e.returnValue('问卷数据将被清空.确定离开此页面吗?')
}

//取得当前浏览器的尺寸
function getSize(){

    return(
        [window.innerWidth,window.innerHeight]
    )
}

//清空sessionStorage
function clearSession(){
    sessionStorage.removeItem('surveyId');
//    sessionStorage.removeItem('designNow')
}

//质量控制操作-invalid
function invalidResult(event){
    let c = $('#container'),
        t = $(this),
        r = t.find('.reason'),
        v = t.find('.invalid-with-reason');
    if (!t.is('animated') && r.css('display') === 'none'){

        c.off('click');

        function afterBlur(event){
            if (!t.is('animated')){
                v.on('click', invalidSubmit)
                    .animate({right: '3.5px'});
                r.animate({width: '0'},100, function(){
                    r.css('display', 'none')
                        .off('blur')
                        .off('keypress');
                    v.off('click')
                        .removeClass('btn');
                });
                t.animate({width: '45px'},100, function(){
                    t.animate({width: '30px'}, 50, function(){
                        t.addClass('btn');
                        c.on('click', '.invalid', invalidResult)
                    })
                })
            }
        }

        function invalidSubmit(event){
            let reason = r.val();
            if (reason.replace(/\s/g, '')){
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
                    success: function(data){
                        if (data[0].error_code === 'success'){
                            let results = result_list.results,
                                resultId = parseInt(v.attr('result_id')),
                                result;
                            for (let i = 0,l = results.length; i < l; i++){
                                if (results[i].resultId === resultId){
                                    result = results[i]
                                }
                            }
                            result.availability = 0;
                            result.reason = r.val()


                        }
                    }
                });
            }
        }

        function excuteSubmit(event){
            if (event.keyCode === 13){
                invalidSubmit(event)
            }
        }

        t.removeClass('btn')
            .animate({width: '45px'},50, function(){
                t.animate({width: '120px'},100);
                v.animate({right: '1px'});
                r.css('display', 'inline-block')
                    .animate({width: '80px'}, 100, function(){
                        r.on('blur', afterBlur)
                            .on('keypress', excuteSubmit)
                            .focus();
                        v.addClass('btn')
                    })
            })
    }
}

//解析已有问题
function listParse(json){

    $('#title').text(json.title);
    $('#subtitle').text(json.discribe);
    let list = json.wjQuestion,
        surveyId = json.wjId;

    window.sets = JSON.parse(json.setting);
//    window.style = json.style;

    for (let i in list){
        let itemKey = list[i].itemId;
        list[i] = JSON.parse(list[i].itemContent)[0];
        list[i].surveyId = surveyId;
    }
    function compare(propertyName) {
        return function(object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value2 < value1) {
                return 1;
            } else if (value2 > value1) {
                return -1;
            } else {
                return 0;
            }
        }
    }
    list.sort(compare('itemId'));

    for (let i in list){

        let item = list[i];
        
        item.itemId = Number(i) + 1;

        if (item.active){

            var type = item.type,
                form = item.form;

            drawQuestion(type,form,item.col,item)
        }
    }
    let sorting = [],
        items = $('.inners'),
        container = $('#survey_container');

    for (let i = 0, l = items.length; i < l; i++){//现在是根据list和items交叉遍历的,在以后list中包括active=false时会出现问题
        sorting[i] = {
            index: list[i].index,
            node: $(items[i]).remove()
        }
    }
    sorting.sort(compare('index'));

    for (let i = 0, l = sorting.length; i < l; i++){
        container.append(sorting[i].node)
    }
}

//如果不是初次编辑此问卷
$(function(){
    if (sessionStorage.getItem('surveyId')){
        $.ajax({
            url: realPath + '/questionnaire/UpdateObject',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data:JSON.stringify({
            	survey: sessionStorage.getItem('surveyId')
            }),
            success: function(d){

                listParse(d[0]['result'][0]);
            }
        })
    }
}());

//listParse(jsons);

$(window).on('beforeunload', clearSession);//退出页面时,清除surveyId
$('#submit').on('click', submit);//保存事件
$('#main').on('click', '.tags li', switchProcess);//切换进度
$('#matrix').on('mouseover', '.frame_background .cell', drawMatrix)//绘制矩阵题
    .on('click', '.frame_background .cell', createMatrix)
    .on('mouseout', '.frame_background', cleanDrawMatrix);
$('#menu').on('click', spreadMenu);//展开目录
$('#colors').on('change', '.color>input', pickColor);//选择样式颜色
$('#wrap').on('focus','[contenteditable=true]', clearHolder)//当输入时,不显示placeholder
    .on('keydown', '.inners', quickSave)
    .on('click', '.inners', quickEdit);
$('#left').on('click', '.tag', switchBars)//进度(编辑/设置/分析)
    //.on('change', '.quickly .msg input', changeChecks)
    .on('mousedown', '.menu-item>span', contenteditableToggle)//将其转化为可编辑
    .on('blur', '.menu-item>span', fixQ)//结束编辑并保存
    .on('keypress', '.menu-item>span', confirmFix)//回车键等价于失焦事件
    .on('click', '.menu-item>.skip', skipToItem)//点选目录跳转箭头,跳转到对应的题目
    .on('click', '.progress-control .acquire', renderProgressControl)
    .on('click', '.quality-control .acquire', renderQualityControl);
$('#container').on('click', '.invalid', invalidResult);