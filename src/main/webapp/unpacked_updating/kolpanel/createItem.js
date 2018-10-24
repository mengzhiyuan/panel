/**
 * Created by wangxiangyang on 2017/10/19.
 */


//存储创建历史列表
var total = 0;
//区别将要创建的题目类型

//普通题型
function createQuestion(e){

    var char = $(this).attr('char').split(' ');

    drawQuestion(char[0],char[1],char[2])
}

//矩阵题型
function createMatrixQuestion(e){

    var row = window.row,
        col = window.col,

        c0 = 'matrix',
        c1 = $(this).parents('.sub_label').attr('char'),
        c2 = [row,col];

    drawQuestion(c0,c1,c2)
}

//快速题型
function createMessage(e){

    var type = $(e.target).attr('class').split(' ');

    //$('input[name="messages"]').each(function(){
    //
    //    if ($(this).prop('checked') === true){
    //
    //        type.push($(this).val())
    //    }
    //});
    drawMessage(type)
}

//渲染题目
function drawQuestion(c0,c1,c2,item){

    if (c0 instanceof Array){
        drawMessage(c0,item);
        return;
    }

    var type = c0,
        form = c1;

    if (type === 'matrix'){

        if (!item){
            var nor = c2[0],
                noc = c2[1];
        }
    } else if (form === 'row' || form === 'col'){

        var noc = c2;
    }

    createNode(type,form,noc,nor || item)
}

//渲染快速题型+创建节点
function drawMessage(type,item){

    let actived = 0;

    for (let i = 0,l = questions.length; i < l; i++){

        if (questions[i].active === true){

            actived++
        }
    }
    var message = $(document.createElement('message'));

    message.attr('id','q' + (total + 1));
    message.attr(':index','index');
    message.attr(':editing', 'editing');
    message.attr(':required', 'required');
    message.attr(':ordericon','ordericon');
    message.attr(':item_id','itemId');
    message.attr(':title', 'title');
    message.attr(':type','type');
    message.attr(':description','description');
    message.attr(':depend','depend');

    message.attr('v-on:move_up','moveUp');
    message.attr('v-on:move_down','moveDown');
    message.attr('v-on:edit','edit');
    message.attr('v-on:save','save');
    message.attr('v-on:delete_q','deleteQ');
    message.attr('v-on:logic','logic');
    message.attr('v-on:edit_title', 'editTitle');
    message.attr('v-on:edit_description', 'editDescription');
    message.attr('v-on:check','check');

    $('#survey_container').append(message);

    var obj = item || {
        itemId: total + 1,
        itemKey: '',
        index: actived + 1,
        active: true,
        editing: false,
        options: {},
        theClass: '',
        words_restrict: '',
        ordericon: '',
        suffix: '',
        title: {
            name:'请输入您的姓名',
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
        depend: {},
        need: {},
        jump: {}
    };
    //obj.title = obj.title[type[0]];
    questions.push(obj);

    createMessageVue(obj,total + 1)
}

//创建元素节点
function createNode(type,form,noc,nor){

    var node = $(document.createElement('node'));

    //赋属性值
    node.attr('id','q' + (total + 1));
    node.attr(':index','index');
    node.attr(':ordericon','ordericon');
    node.attr(':item_id','itemId');
    node.attr(':type','type');
    node.attr(':form','form');
    node.attr(':title','title');
    node.attr(':description','description');
    node.attr(':required','required');
    node.attr(':editing','editing');
    node.attr(':options','options');
    node.attr(':words_restrict','words_restrict');
    node.attr(':suffix', 'suffix');
    node.attr(':sub_questions','sub_questions');
    node.attr(':need','need');
    node.attr(':jump','jump');
    node.attr(':depend','depend');
    node.attr(':quote','quote');
    node.attr(':relate','relate');
    node.attr(':evaluate','evaluate');
    node.attr(':the_class','theClass');

    //赋予方法属性
    node.attr('v-on:move_up','moveUp');
    node.attr('v-on:move_down','moveDown');
    node.attr('v-on:edit','edit');
    node.attr('v-on:delete_q','deleteQ');
    node.attr('v-on:logic','logic');
    node.attr('v-on:save','save');
    node.attr('v-on:cancel','cancel');
    node.attr('v-on:edit_title','editTitle');
    node.attr('v-on:edit_required','editRequired');
    node.attr('v-on:edit_description','editDescription');
    node.attr('v-on:delete_option','deleteOption');
    node.attr('v-on:edit_option','editOption');
    node.attr('v-on:edit_suffix', 'editSuffix');
    node.attr('v-on:edit_fillable','editFillable');
    node.attr('v-on:insert_option','insertOption');
    node.attr('v-on:check','check');
    node.attr('v-on:change_form','changeForm');
    node.attr('v-on:change_class','changeClass');
    node.attr('v-on:delete_sub_question','deleteSubQuestion');
    node.attr('v-on:drag_prefix','dragPrefix');
    node.attr('v-on:edit_prefix','editPrefix');
    node.attr('v-on:insert_sub_question','insertSubQuestion');
    node.attr('v-on:edit_sub_question','editSubQuestion');

    //填空题特殊方法
    node.attr('v-on:toggle_hour','toggleHour');
    node.attr('v-on:toggle_minute','toggleMinute');
    node.attr('v-on:toggle_second','toggleSecond');
    node.attr('v-on:toggle_year','toggleYear');
    node.attr('v-on:toggle_month','toggleMonth');
    node.attr('v-on:toggle_date','toggleDate');

    //评分题特殊方法
    node.attr('v-on:mark','mark');
    node.attr('v-on:edit_score','editScore');

    if (type === 'choice' || type === 'checks'){

        node.addClass('form-' + form + 's');

        if (form === 'row'){

            node.addClass('rows-' + noc)
        }
    }
    $('#survey_container').append(node);

    let actived = 0;

    for (let i = 0,l = questions.length; i < l; i++){

        if (questions[i].active === true){

            actived++
        }
    }

    createDetail(total + 1, actived + 1,type,form,noc,nor)
}

//创建Vue属性对象
function createDetail(id,index,type,form,noc,nor){

    if (typeof nor !== 'object'){
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
            need:{},
            jump: {},
            depend: {},
            quote: {},
            relate: {},
            evaluate: {}
        }
    } else {
        var thisObj = nor
    }
    if (type === 'choice' || type === 'checks'){

        if (!thisObj.options[1]){

            for (let i = 0; i < 2; i++){

                thisObj.options[i+1] = {
                    index: i+1,
                    optionId: i+1,
                    value: '',
                    fillable: false
                }
            }
        }
    } else if (type === 'sort'){

        if (!thisObj.options[1]){

            for (let i = 0; i < 5; i++){

                thisObj.options[i+1] = {
                    index: i+1,
                    optionId: i+1,
                    value: '',
                    score: '',
                    fillable: false
                }
            }
            thisObj.sorted = [{
                index: 'x',
                optionId: 'x',
                value: '',
                score: '',
                fillable: false
            }]
        }
    } else if (type === 'score'){

        if (!thisObj.options[1]){

            for (let i = 0; i < noc; i++){

                thisObj.options[i+1] = {
                    index: i+1,
                    optionId: i+1,
                    value: '',
                    score: i+1,
                    fillable: false
                }
            }
        }

    } else if (type === 'blank'){

        if (!thisObj.sub_questions[1]){

            for (let i = 0; i < 2; i++){

                thisObj.sub_questions[i+1] = {
                    index: i+1,
                    title: ''
                }
            }
        }
    } else if (type === 'matrix'){

        if (!thisObj.options[1]){
            switch (form){

                case 'row':

                    for (let i = 0; i < nor; i++){

                        thisObj.sub_questions[i+1] = {
                            index: i+1,
                            title: '',
                            prefix: ''
                        }
                    }
                    for (let i = 0; i < noc; i++){

                        thisObj.options[i+1] = {
                            index: i+1,
                            optionId: i+1,
                            value: ''
                        }
                    }
                    break;

                case 'col':

                    for (let i = 0; i < noc; i++){

                        thisObj.sub_questions[i+1] = {
                            index: i+1,
                            title: '',
                            prefix: ''
                        }
                    }
                    for (let i = 0; i < nor; i++){

                        thisObj.options[i+1] = {
                            index: i+1,
                            optionId: i+1,
                            value: ''
                        }
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

    createVue(thisObj,id)
}

//创建Vue方法对象
var funcs = {

    mounted: function(){
        $(this.$el).find('[contenteditable=true]').each(function(){
            let v = $(this).text();
            $(this).empty().text(v);
        })
    },

    trim: function(text){
        return text.replace(/^\s+|\s+$/g,'')
    },

    moveUp: function(e){

        if (this.index > 1){

            //取得vue根对象
            var t = $(e.target).parents('.inners');
            //dom中调换位置
            t.insertBefore($(t[0].previousSibling));
            //数据中两个对象交换index

            //var subtrahend = 2;//当前题目在数组中的序号是itemId-1,前一个应该是itemId-2

            //取questions中index值为this.index-1的取为pr
            for (let i = 0, l = questions.length; i < l; i++){
                if (questions[i].index === this.index - 1){
                    var pr = questions[i]
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

            let sorteds = {
                survey: sessionStorage.getItem('surveyId'),
                list: [this.$data,pr]
            };
            console.log(JSON.stringify(sorteds));

            $.ajax({
                url: realPath + '/questionnaire/sort',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(sorteds),
                success: function(d){
                    console.log(d)
                },
                error: function(e){
                    console.log(e)
                }
            })
        }
    },
    moveDown: function(e){

        var l = 0;

        for (let i = 0; i < total; i++){

            if (questions[i].active === true){

                l++
            }
        }

        if (this.index < l){

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
            for (let i = 0, l = questions.length; i < l; i++){
                if (questions[i].index === this.index + 1){
                    var nt = questions[i]
                }
            }

            //var nt = questions[this.itemId];

            var t_index = this.index,
                n_index = nt.index;

            var m_index = t_index;
            this.index = n_index;
            nt.index = m_index;

            let sorteds = {
                survey: sessionStorage.getItem('surveyId'),
                list: [this.$data,nt]
            };

            console.log(JSON.stringify(sorteds));

            $.ajax({
                url: realPath + '/questionnaire/sort',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(sorteds),
                success: function(d){
                    console.log(d)
                },
                error: function(e){
                    console.log(e)
                }
            })
        }
    },
    edit: function(e){
        this.editing = true
    },
    deleteQ: function(e){

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
                survey: idToDelete
            }),
            success: function(d){
                var result = d[0].errorCode
            },
            error: function(e){

            }
        });

        //取出所有活跃问题
        var actived = [];

        for (let i = 0; i < total; i++){

            if (questions[i].active === true){

                actived.push(questions[i])
            }
        }
        //将所有index值大于此vue的对象index属性-1
        for (let i = 0,l = actived.length; i < l; i++){

            if (actived[i].index > c){

                actived[i].index -= 1
            }
        }
        this.active = false;
        this.index = null;
    },
    logic: function(e){

        var t = $(e.target),
            qNow = this.itemId,
            model = `
                <div class="logic-control">
                    <div class="head">
                        <span class="title">添加逻辑控制</span>
                        <span class="close"></span>
                    </div>
                    <div class="main">
                        <div class="words-restrict">
                            <div>
                                <span>最少字数</span>
                                <span contenteditable="true" class="min"></span>
                            </div>
                            <div>
                                <span>最多字数</span>
                                <span contenteditable="true" class="max"></span>
                            </div>
                        </div>
                        <div class="depend">
                            <span>当题目</span>
                            <select class="depend_question">
                                <option value="">请选择</option>
                            </select>
                            <span>选中结果为</span>
                                <a class="depend_option" href="javascript: void(0);">
                                    <span class="initialed">点击选择选项</span>
                                    <span class="selected" picked_option="[]"></span>
                                </a>
                            <span>时,本题显示,否则本题隐藏</span>
                        </div>
                        <div class="relate">
                            <span>本题将引用题目</span>
                            <select class="relate_question">
                                <option value="">请选择</option>
                            </select>
                            <span>被选中的所有结果作为本题的备选项</span>
                        </div>
                        <div class="quote">
                            <span>本题将引用题目</span>
                            <select class="quote_question">
                                <option value="">请选择</option>
                            </select>
                            <span>的答题结果作为本题题干的一部分(请在题干中用[插入]标记出要插入的位置)</span>
                        </div>
                        <div class="jump">
                            <div class="jump_logics"><a href="javascript:void(0);">点击设置跳转逻辑</a></div>
                            <!--<span>当本题选中结果为</span>-->
                            <!--<select class="jump_option">-->
                                <!--<option value="">请选择</option>-->
                            <!--</select>-->
                            <!--<span>时,下一题将跳转到题目</span>-->
                            <!--<select class="jump_target">-->
                                <!--<option value="">请选择</option>-->
                                <!--<option value="over">问卷结束(判定无效)</option>-->
                            <!--</select>-->
                        </div>
                        <div class="evaluate">
                            <span>本题将根据题目</span>
                            <select class="evaluate_question">
                                <option value="">请选择</option>
                            </select>
                            <span>的答题结果不同,题干插入不同的内容(请在题干中用[赋值]标记出要插入的位置)</span>
                            <div class="evaluate_options">

                            </div>
                        </div>
                    </div>
                    <div class="foot">
                        <button class="cancel btn btn-sm btn-warning pull-right">取消</button>
                        <button class="save btn btn-sm btn-success pull-right">保存</button>
                    </div>
                </div>`;

        t.parents('.inner').append(model);

        var inner = t.parents('.inner');

        //判断填空题独有逻辑(字数限制)
        if (inner.hasClass('blank')){
            inner.find('.words-restrict').css('display','block');
            try {
                inner.find('.words-restrict .min').text(qNow.words_restrict.min);
                inner.find('.words-restrict .max').text(qNow.words_restrict.max)
            } catch(e){}
        } else {
            inner.find('.words-restrict').css('display','none')
        }

        //判断选择题独有逻辑(跳转逻辑&关联逻辑)
        if (inner.hasClass('choice') || inner.hasClass('checks') || inner.hasClass('matrix') || inner.hasClass('score')){

            //跳转
            inner.find('.logic-control .jump').css('display','block');

            //在新的框内设置跳转逻辑
            function createJumpBox(e){

                var jumpBox = $(`
                    <div class="jump_box">
                        <div class="head">请选择每个选项对应的跳转目标</div>
                        <span class="close_jump"></span>
                        <button class="btn btn-success btn-sm save_jump">保存</button>
                    </div>
                `),
                    options = this.options,
                    targets = ``;

                //按顺序组成列表
                for (let i in options){
                    var o = options[i];
                    jumpBox.append(`
                    <div class="jump_option">
                        <span class="option_value">选项` + o.index + '. ' + o.value.slice(0,5) + `...</span>
                        <select class="jump_target" option_id="` + o.optionId + `" option_value="` + o.value + `">
                            <option value="">请选择跳转目标</option>
                            <option value="over">问卷结束(判定无效)</option>
                        </select>
                    </div>
                    `);
                }
                //将可选目标填入select
                for (let i = 0,l = questions.length; i < l; i++){
                    let q = questions[i];
                    if (q.active === true && q.index > this.index){
                        targets += `<option value="` + q.itemId + `">` + q.index + `,` + q.title.slice(0,10) + `...</option>`
                    }
                }
                var jumpBoxs = jumpBox.find('.jump_target');

                jumpBoxs.each(function(){
                    let index = Array.prototype.indexOf.call(jumpBoxs,this);
                    $(this).append(targets);
                    try{
                        this.val(this.jump[index].target)
                    }catch(e){}
                });

                inner.append(jumpBox);

                function closeJump(){

                    jumpBox.remove();
                    jumpBox = null
                }
                function saveJump(e){
                    //保存跳转逻辑的设置
                    let self = this;

                    jumpBoxs.each(function(){

                        var optionId = $(this).attr('option_id');

                        self.jump[optionId] = {
                            optionId: optionId,
                            value: self.options[optionId]['value'],
                            target: $(this).val()
                        }
                    });
                    closeJump()
                }

                jumpBox.on('click','.close_jump',closeJump.bind(this));
                jumpBox.on('click','.save_jump',saveJump.bind(this));

                //jumpBoxs.on('')
            }

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
            inner.find('.logic-control').find('.relate').css('display','block');

            let s_relate_question = inner.find('.logic-control .relate_question');

            for (let i = 0,l = questions.length; i < l; i++){
                let q = questions[i];
                if (q.active === true && (q.type === 'choice' || q.type === 'checks') && q.index < this.index){
                    s_relate_question.append('<option value="'+ q.itemId +'">'+ q.index + ','+ q.title.slice(0,10) +'...</option>')
                }
            }
            try{
                s_relate_question.val(this.relate.itemId)
            } catch(e){}

        } else {
            inner.find('.logic-control').find('.jump').css('display','none');
            inner.find('.logic-control').find('.relate').css('display','none')
        }

        //显示逻辑选项
        if (this.type instanceof Array){
            inner.find('.depend').css('display','none')
        }
        let s_depend_question = inner.find('.logic-control .depend_question'),
            s_depend_option = inner.find('.logic-control .depend_option');

        for (let i = 0,l = questions.length; i < l; i++){
            let q = questions[i];
            if (q.active === true && (q.type === 'choice' || q.type === 'checks') && q.index < this.index ){
                s_depend_question.append('<option value="' + q.itemId + '">' + q.index + '.' + q.title.slice(0,10) + '...' + '</option>')
            }
        }

        function changeDependOption(e){


            //如果调用此方法的事件target是预设的主要目标
            if (e.originalEvent) e = e.originalEvent;

            if ($(e.currentTarget).hasClass('depend_option')){

                //创建一个元素(后来的弹出框)
                var dependBox = $(`
                    <div class="depend_box">
                        <div class="head">在哪个选项被选中时,此题显示,请勾选</div>
                        <span class="close_depend"></span>
                    </div>
                `),
                    dependQuestion = $(e.target).parents('.depend').find('.depend_question').val();

                //如果已经选择了依赖题目
                if (dependQuestion){
                    //将依赖题目的选项赋予option
                    var options = questions[dependQuestion - 1]['options'];
                    //否则就退出方法
                } else {
                    return false
                }

                //如果不是预设的主要目标,且设置过的depend属性
            } else if (this.depend.itemId) {

                //将设置好的depend.itemId值赋予s_depend_question,仅在逻辑界面链接内显示选中的选项
                s_depend_question.val(this.depend.itemId);

                //将设置好的depend.options显示出来
                var options = this.depend.options,
                    txt = inner.find('.depend_option>.selected');

                if (options.length > 0){

                    var str = '';

                    for (let i = 0,l = options.length; i < l; i ++){
                        str += options[i].slice(0,5) + '...; '
                    }
                    txt.text(str)
                        .attr('picked_option', JSON.stringify(options))
                        .siblings('.initialed').text('');
                }
                return false
            }



            for (let i in options){

                var ops = options[i];

                dependBox.append(`
                    <div class="depend_boxs">
                        <input class="pick_depend" type="checkbox" value="` + ops.value + `">
                        <span class="label_pick">` + ops.optionId + `. ` + ops.value.slice(0,5) + `...</span>
                    </div>
                `);
            }

            //向DOM添加节点
            inner.append(dependBox);

            function closeDepend(e){

                try{
                    if (dependBox){
                        var txt = inner.find('.depend_option>.selected'),
                            pickeds = dependBox.find('.pick_depend:checked');

                        txt.text('').attr('picked_option', '[]');

                        if (pickeds.length > 0){

                            inner.find('.depend_option>.initialed').text('');

                            pickeds.each(function(){

                                txt.text(txt.text() + $(this).siblings('.label_pick').text());

                                var ar = JSON.parse(txt.attr('picked_option'));

                                ar.push($(this).val());


                                txt.attr('picked_option', JSON.stringify(ar));
                            });

                        }
                    }
                    dependBox.remove();
                    dependBox = null
                } catch(e){
                    console.log(e);
                }
            }
            dependBox.on('click', '.close_depend', closeDepend.bind(this));
            inner.find('.logic-control .save').on('click', closeDepend.bind(this));
            inner.find('.logic-control .cancel').on('click', closeDepend.bind(this));

            try{

                if (this.depend.itemId){

                    let pickDepends = dependBox.find('.pick_depend'),
                        self = this;

                    pickDepends.each(function(){

                        if (self.depend.options.indexOf($(this).val()) > -1){

                            $(this).prop('checked', true)
                        }
                    })
                }
            } catch(e){}
        }

        function updateDependOption(e){

            if (this.depend.itemId){

                var txt = inner.find('.depend_option>.selected');

                if (this.depend.itemId === $(e.target).val()){

                    try {
                        var options = this.depend.options;

                        if (options.length > 0){

                            var str = '';

                            for (let i = 0,l = options.length; i < l; i ++){
                                str += options[i].slice(0,5) + '...; '
                            }
                            txt.text(str)
                                .attr('picked_option', JSON.stringify(options))
                                .siblings('.initialed').text('');
                        }
                    } catch (e){}
                } else {
                    txt.text('').siblings('.initialed').text('点击选择选项')
                }
            }
        }

        try{
            if (s_depend_question.val(this.depend.itemId)){
                changeDependOption.bind(this)(e)
            }
        } catch(e){}

        //if (true){
        //
        //}
        s_depend_question.on('change', updateDependOption.bind(this));
        s_depend_option.on('click',changeDependOption.bind(this));

        //引用逻辑选项
        let s_quote_question = inner.find('.logic-control .quote_question');

        for (let i = 0,l = questions.length; i < l; i++){
            let q = questions[i];
            if (q.active === true && (q.type === 'choice' || q.type === 'checks' || q.type === 'blank') && q.index < this.index){
                s_quote_question.append('<option value="'+ q.itemId +'">'+ q.index + ','+ q.title.slice(0,10) +'...</option>')
            }
        }
        try{
            s_quote_question.val(this.quote.itemId);
        } catch(e){}

        //赋值逻辑选项
        let s_evaluate_question = inner.find('.logic-control .evaluate_question');

        for (let i = 0,l = questions.length; i < l; i++){
            let q = questions[i];
            if (q.active === true && (q.type === 'choice' || q.type === 'checks') && q.index < this.index){
                s_evaluate_question.append('<option value="'+ q.itemId +'">'+ q.index + ','+ q.title.slice(0,10) +'...</option>')
            }
        }

        function changeEvaluate(e){

            if (e){
                if ($(e.target).val()){
                    var options = questions[$(e.target).val()].options
                }
            } else if (this.evaluate.itemId){
                var options = questions[this.evaluate.itemId - 1];
            }

            for (let i in options){

                let thisOption = $('' +
                    '<div class="evaluates">' +
                    '<span>选项 '+ options[i].index + '.'+ options[i].value.slice(0,5) +'...</span>' +
                    '<span contenteditable="true" class="input"></span>' +
                    '</div>');

                if (this.evaluate.matches){

                    if (this.evaluate.matches[options[i].optionId]){
                        thisOption.find('.input').text(this.evaluate.matches[options[i].optionId])
                    }
                }

                inner.find('.logic-control .evaluate_options').append(thisOption)
            }
        }

        try{
            s_evaluate_question.val(this.evaluate.itemId);
        } catch(e){}

        //if (true){
        //
        //}
        s_evaluate_question.on('change', changeEvaluate.bind(this));

        //保存按钮
        inner.find('.logic-control').on('click', '.save', function(e){

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
            if (q.evaluate.itemId){
                let nodes = inner.find('.evaluate_options>.evaluates'),
                    options = questions[q.evaluate.itemId - 1].options;

                q.evaluate.matches = {};

                for (let i in options){
                    q.evaluate.matches[options[i].optionId] = {
                        optionId: options[i].optionId,
                        value: options[i].value,
                        text: $(nodes[i]).find('.input').text()
                    }
                }
            }
            logics.remove()
        }.bind(this));

        //放弃按钮
        inner.find('.logic-control').on('click', '.cancel', function(e){
            inner.find('.logic-control').remove()
        });
    },
    save: function(e){

        this.editing = false;
        var data = {
            survey: sessionStorage.getItem('surveyId') || '',
            email: sessionStorage.getItem('surveyName'),
            singleQ: this.$data,
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
            success: function(d){
                var designNow = sessionStorage.getItem('surveyId');
                if (!designNow){
                    sessionStorage.setItem('surveyId', d[0].surveyId)
                }
                self.itemKey = d[0].itemId

            }
        })
    },
    cancel: function(e){
        this.editing = false;
    },
    editTitle: function(e){

        var t = $(e.target);

        if (this.type instanceof Array){
            var name = t.attr('name');
            this.title[name] = this.trim(t.text())
        }
        this.title = this.trim(t.text())
    },
    editRequired: function(e){

        var t = $(e.target);

        if (t.prop('checked') === true){

            this.required = true;

            t.siblings('label').find('.icon').addClass('checked')

        } else {

            this.required = false;

            t.siblings('label').find('.icon').removeClass('checked')
        }
    },
    editDescription: function(e){
        this.description = this.trim($(e.target).text())
    },
    deleteOption: function(option){

        var id = option.optionId;

        var ops = JSON.parse(JSON.stringify(this.options));

        delete(ops[id]);

        let index = 1;

        for (let i = 0, l = ops.length; i < l; i++){

            if (ops[i].index == 99){
                continue
            }
            ops[i].optionId = ops[i].index = index;
            index += 1
        }

        this.options = ops
    },
    editOption: function(e){

        this.options[$(e.target).attr('option_id')].value = this.trim($(e.target).text())
    },
    editSuffix: function(e){
        this.suffix = this.trim($(e.target).val())
    },
    editFillable: function(e){

        var t = $(e.target),
            id = t.attr('option_id');

        if (t.prop('checked') === true){

            this.options[id].fillable = true;
            this.options[id].index = 99;
            t.siblings('label').find('.icon').addClass('checked')

        } else {

            this.options[id].fillable = false;
            this.options[id].index = parseInt(id);
            t.siblings('label').find('.icon').removeClass('checked')
        }
    },
    insertOption: function(e){

        var ops = JSON.parse(JSON.stringify(this.options)),
            c = 0;

        for (let i in ops){

            let n = ops[i].optionId;

            if (n > c && n != 99){
                c = n
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

        if (this.$el.offsetHeight !== heightNow){

            scrollToDem(this.$el.offsetHeight - heightNow)
        }
        var clear = this.mounted;
        setTimeout(clear,100);
    },
    check: function(e){
        var t = $(e.target),
            icon = t.siblings('label').find('.icon');
        if (t.prop('checked') === true){
            icon.find('span').css('background-color','#5bc0ff')
        } else {
            icon.find('span').css('background-color','#ffffff')
        }
    },
    changeForm: function(e){

        var t = $(e.target);

        this.form = t.val()
    },
    changeClass: function(e){

        var t = $(e.target);

        this.theClass = t.val()
    },
    deleteSubQuestion: function(question){

        var id = question.questionId;

        var stq = JSON.parse(JSON.stringify(this.sub_questions));

        delete(stq[id]);

        let index = 1;

        for (let i = 0, l = stq.length; i < l; i++){

            if (stq[i].index == 99){
                continue
            }
            stq[i].index = index;
            index += 1
        }

        this.sub_questions = stq
    },
    dragPrefix: function(event){

        let start_coordinates = {//取起始坐标
            x: event.clientX,
            y: event.clientY
        },
            t = $(event.currentTarget),//取prefix行
            spread = false,
            edge = {bottom: -10, top: 42, divide: 16};

        //判断prefix是否展开
        if (t.css('height') === '32px'){
            spread = true;
            edge = {bottom: -42, top: 10, divide: -16}
        }


        //prefix边界随鼠标移动
        function dragRow(event){

            let move_coordinates = {//取鼠标移动的即时坐标
                x: event.clientX,
                y: event.clientY
            }, vector = move_coordinates.y - start_coordinates.y;//取鼠标即时的移动方向(正为向下,负为向上)

            if (vector >= edge.bottom && vector <= edge.top){

                var height = spread ? (32 + vector) : (4 + vector);
                t.css('height', height + 'px');
                t.find('.edit-prefix').css('height', height + 'px')
                    .css('fontSize', '0px')
            } else {
                endDrag(event);
            }
            if (vector < -10){
                console.log(vector)
            }
        }

        //抬时鼠标键或者鼠标拖出区域时,结束并解绑
        function endDrag(event){

            let move_coordinates = {//取鼠标移动的即时坐标
                x: event.clientX,
                y: event.clientY
            }, vector = move_coordinates.y - start_coordinates.y;

            if (vector <= edge.divide){
                t.find('.edit-prefix').animate({height: '4px'}, 150).attr('contenteditable', false);
                t.animate({height: '4px'}, 150);
            } else {
                t.animate({height: '32px'}, 150);
                t.find('.edit-prefix').animate({height: '32px'}).attr('contenteditable', true)
                    .css('fontSize', '14px')
                    .each(function(){var e=$(this).text();$(this).empty().text(e)})
            }
            $('body').off('mousemove').off('mouseup');
            return
        }

        $('body').on('mousemove', dragRow).on('mouseup', endDrag);//当拖动时,prefix行随之变动,抬起鼠标键时,解绑事件且结束
    },
    editPrefix: function(event){
        let t = $(event.target);
        this.sub_questions[t.attr('question_id')].prefix = this.trim(t.text())
    },
    insertSubQuestion: function(e){

        var stq = JSON.parse(JSON.stringify(this.sub_questions)),
            c = 0;

        for (let i in stq){

            let n = stq[i].index;

            if (n > c && n != 99){
                c = n
            }
        }
        c += 1;

        stq[c] = {
            index: c,
            title: ''
        };

        var heightNow = this.$el.offsetHeight;

        this.sub_questions = stq;

        if (this.$el.offsetHeight !== heightNow){

            scrollToDem(this.$el.offsetHeight - heightNow)
        }
        var clear = this.mounted;
        setTimeout(clear,100);
    },
    editSubQuestion: function(question){

        question.title = this.trim($(e.target).text())
    },


    toggleHour: function(e){

        var n = this.need.time;

        if ($(e.target).prop('checked') === true){

            n.push('hour')

        } else {

            try{
                n.splice(n.indexOf('minute'),1)

            } catch(e){}
        }
    },
    toggleMinute: function(e){

        var n = this.need.time;

        if ($(e.target).prop('checked') === true){

            n.push('minute')

        } else {

            try{
                n.splice(n.indexOf('minute'),1)

            } catch(e){}
        }
    },
    toggleSecond: function(e){

        var n = this.need.time;

        if ($(e.target).prop('checked') === true){

            n.push('second')

        } else {

            try{
                n.splice(n.indexOf('second'),1)

            } catch(e){}
        }
    },
    toggleYear: function(e){

        var n = this.need.date;

        if ($(e.target).prop('checked') === true){

            n.push('year')

        } else {

            try{
                n.splice(n.indexOf('year'),1)

            } catch(e){}
        }
    },
    toggleMonth: function(e){

        var n = this.need.date;

        if ($(e.target).prop('checked') === true){

            n.push('month')

        } else {

            try{
                n.splice(n.indexOf('month'),1)

            } catch(e){}
        }
    },
    toggleDate: function(e){

        var n = this.need.date;

        if ($(e.target).prop('checked') === true){

            n.push('date')

        } else {

            try{
                n.splice(n.indexOf('date'),1)

            } catch(e){}
        }
    },
    mark: function(e){

        var t = $(e.target);

        if (t.prop('checked') === true){


        }
    },
    editScore: function(e){

        var t = $(e.target),
            id = t.attr('option_id');

        this.options[id].score = this.trim(t.text())
    }
};

//当新建题目,新加选项时,自动滚动页面到最后面
function scrollToDem(t){

    var scrollTo;

    if (t instanceof Number){
        scrollTo = t
    } else {
        var $r = $('#room'),
            scrollTopNow = $r[0].scrollTop,
            height = t[0].offsetHeight;

        scrollTo = scrollTopNow + height;
    }

    $r.animate({scrollTop: scrollTo}, 200)
}

//创建Vue对象
function createVue(obj,id){

    var el = '#q' + id;

    vues.push(new Vue({

        el: el,

        data: obj,

        methods: funcs,

        mounted: function(){
            $(this.$el).find('[contenteditable=true]').each(function(){
                let v = $(this).text();
                $(this).empty().text(v);
            })
        }
    }));
    total += 1;
    //向下滚动到合适位置
    scrollToDem($(el));
}

function createMessageVue(obj,id){

    var el = '#q' + id;

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
//module.exports.createQuestion = createQuestion;
//module.exports.createMatrixQuestion = createMatrixQuestion;
//module.exports.createMessage = createMessage;
//module.exports.drawQuestion = drawQuestion;

