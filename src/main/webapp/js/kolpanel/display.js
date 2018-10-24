/**
 * Created by wangxiangyang on 2017/9/27.
 */
 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){
       var name,value; 
       var details = {
              
            };
       var str=location.href; //取得整个地址栏
       var num=str.indexOf("?");
       str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

       var arr=str.split("&"); //各个参数放到数组里
       for(var i=0;i < arr.length;i++){ 
        num=arr[i].indexOf("="); 
        if(num>0){ 
         name=arr[i].substring(0,num);
         if(name=='wj'){
             details.kol = arr[i].substr(num+1);
         }
         if(name=='urlcode'){
             details.urlcode = arr[i].substr(num+1);
         }
         } 
        }



    var displayFuncs = {

            surveyId: '',
            availability: 0,
            completion: 0,
            list: [],
            qs: [],//问题列表
            vues: [],//vue对象列表
            answers: [],//回答列表
            now: 0,//当前的问题索引
            time_question: '',
            time_survey: '',
            question_number: '',
            passwordNeeded: '',
            verificationCodeNeeded: '',
            disposableForClient: '',
            disposableForIp: '',
            disposableForDevice: '',


            //开始按钮
            startQuestionnaire: function(){

                $('#cover').hide();

                this.countDown();

                this.putQuestions()
            },

            //展示大概信息
            displaySurvey: function(d){

                //解析setting字符串
                var setting = JSON.parse(d.setting)[0];
                //取出问卷基本信息
                var surveyId = d.wjId,
                    sitId = d.sitId || '',
                    question_number = d.count,
                    title = d.title,
                    subtitle = d.describe;

                this.qs = [];//问题列表
                this.vues = [];//vue对象列表
                this.answers = [];//回答列表
                this.now = 0;//当前的问题索引

                //过滤掉已被删除的问题(暂时无已删除问题)
                for (let i = 0,l = d.wjQuestion.length; i < l; i++){

                    //过滤条件
                    if (true){
                        this.qs.push(JSON.parse(d.wjQuestion[i]['itemContent'])[0]);
                        this.qs[this.qs.length - 1].idInSQL = d.wjQuestion[i].itemId
                    }
                }
                //按index属性值重新排序
                this.qs.sort(this.compare('index'));
                this.answers = new Array(this.qs.length + 1);

                //如果需要每题定时则引入定时器函数,否则设置「下一题」按钮始终可以点击
                if (setting.time_question && setting.time_question.restrict){
                    this.time_question = setting.time_question.time
                } else {
                    this.buttonInterval = function(){}
                }
                if (setting.time_survey && setting.time_survey.restrict){
                    this.time_survey = setting.time_survey.time
                } else {
                    this.countDown = function(){}
                }
                //将标题和副标题填入问卷
                $('#title').find('span').text(title);
                $('#subtitle').find('span').text(subtitle);


                sessionStorage.setItem('sitId', sitId);
                this.surveyId = surveyId;
                this.question_number = question_number;
                this.passwordNeeded = setting.passwordNeeded;
                this.verificationCodeNeeded = setting.verificationCodeNeeded;
                this.clientOnly = setting.clientOnly;
                this.disposableForClient = setting.disposableForClient;
                this.disposableForIp = setting.disposableForIp;
                this.disposableForDevice = setting.disppsableForDevice;


                //预留开始回答按钮
//                this.startQuestionnaire();
//                this.putQuestions();
            },

            //比较函数,用以排序
            compare: function(propertyName) {
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
            },
            countDown: function(){

                $('#save').prop('disabled', true);

                var totalMinutes = this.time_survey,
                    totalSeconds = totalMinutes * 60;

                var minutesNow = totalMinutes,
                    secondsNow = '00';

                var minutes = $('#time_long').find('.minutes'),
                    seconds = $('#time_long').find('.seconds');

                minutes.text(minutesNow);
                seconds.text(secondsNow);

                function decrease(){

                    if (totalSeconds <= 0){

                        //$('#start').css('display', 'none');
                        //$('#over_time').css('display', 'inline-block');
                        //$('#cover').show();
                        $('#save').prop('disabled', false);
                        return
                    }

                    if (totalSeconds % 60 === 0){

                        minutesNow -= 1;
                        secondsNow = 59;

                        minutes.text(minutesNow);
                        seconds.text(secondsNow)

                    } else {

                        secondsNow -= 1;
                        seconds.text(secondsNow)
                    }
                    totalSeconds -= 1

                }

                var countSecond = setInterval(decrease.bind(this),1000)
            },

            //回到上一题,进行修改
            previousQ: function(e){

                let list = this.qs,
                    now = this.now,
                    o = list[now],
                    a = this.answers[now + 1],
                    questionBefore = [];

                //获得所有答过的题目序号的列表(把没答过的非必答题也加进去)
                for (let i = 1, l = now + 1; i <= l; i++){

                    let thisAnswer = this.answers[i],
                        thisQuestion = list[i - 1];

                    if ((thisAnswer && thisAnswer.values && thisAnswer.values.length) || !thisQuestion.required){
                        questionBefore.push(i - 1)
                    }
                }

                //如果当前题目有答案,则将此答案提交
//                if (a && a.values && a.values.length){
//                    this.submitAnswers(e)
//                }

                $('#q' + (now+1)).remove();//移除当前题目节点
                this.now  = questionBefore[questionBefore.length - 1];
                this.putQuestions();//在新序号基础上准备渲染题目
            },

            //处理此题结果,并引入下一题
            nextQ: function(e){

                let list = this.qs,//取得本问卷的题目列表
                    now = this.now,//取得序号now = 当前题目在list内的index = 当前答案在answers内的index-1
                    o = list[now], //当前题目信息
                    a = this.answers[now + 1];//当前答案信息

                //检查是否已答题
                if (!a || !a.values || a.values.length === 0){
                    return false
                }

                $('#q' + (now + 1)).remove();
                
                //跳转逻辑
                let plan = false,
                    jumps = o.jump;

                for (let j in jumps){

                    if (j){
                        plan = true;
                        break;
                    }
                }

                //如果jump下有设置
                if (plan){

                    //遍历jump下的设置
                    for (let jo in jumps){

                        //如果此设置被填写
                        if (jumps[jo].target){

                            //如果些题回答中有预设的选项
                            if (a.values.indexOf(jumps[jo].value) > -1){

                                //判断是不是跳向结束页面(问卷失效)
                                if (jumps[jo].target === 'over'){

                                    //结束问卷,提交回答并跳转向新页面
                                    this.availability = 3;
                                    this.submitAnswers(e);
                                    document.location.href =realPath+'/html/kolpanel/endSurvey.html';
                                    return false;

                                    //否则跳转向设置的题目
                                } else {

                                    let newNow;

                                    for (let p = 0; p < list.length; p++){
                                        if (list[p].itemId == jumps[jo].target){
                                            newNow = list[p].index
                                        }
                                    }

                                    if (newNow){
                                        this.now = newNow - 1;
                                    } else {
                                        continue
                                    }
                                    this.putQuestions();
                                    return false
                                }
                            }
                        }
                    }
                }

                //如果没有操作设置界面||打开后未设置||预设选项未选中,则按顺序加载下一题
                this.submitAnswers(e);
                this.now++;
                this.putQuestions();
                return false;





                //if (o.jump.options && o.jump.target){
                //  if (o.jump.options.length > 0 && o.jump.target !==''){
                //        if (o.jump.options.indexOf(a.values[0]) > -1){
                //            if (o.jump.target === 'over'){
                //                this.availability = 0;
                //                this.submitAnswers();
                //                document.location.href = './endSurvey.html';
                //                //$('#save').css('display','inline-block');
                //                //$('#next').css('display','none');
                //                //$('#skip').css('display','none');
                //                return
                //            } else {
                //                this.now = parseInt(o.jump.target) - 1
                //            }
                //        } else {
                //            this.now++
                //        }
                //    } else {
                //        this.now++
                //    }
                //} else {
                //  this.now++;
                //}
                //this.putQuestions()
            },

            //展示题目
            putQuestions: function(){

                let list = this.qs,
                    now = this.now,
                    o = list[now],
                    self = this;
                
                function renderThisQuestion(){
                    
                    self.setRelate(o);//关联逻辑
                    self.setQuote(o);//引用逻辑
                    self.setEvaluate(o);//赋值逻辑

                    var q = $(document.createElement('qs')),
                        buttons = $('#buttons');

                    //如果必答,则「跳过」按钮不可用
                    $('#skip').prop('disabled', o.required);

                    //如果到达最后一题,则显示「提交问卷」按钮
                    let save = $('#save');
                    if (list.indexOf(o) === list.length - 1){
                        save.css('display','inline-block');
                        $('#next').css('display', 'none');
                        $('#skip').css('display', 'none');
                    } else {
                        save.css('display', 'none')
                    }

                    //给新节点赋值
                    q.attr('id', 'q' + o.index);
                    self.setAttr(q);
                    if (o.type==='sort') {
                        q.attr(':sorted','sorted')
                    }

                    q.insertBefore(buttons);
                    buttons.css('display','block');

                    //如果是排序题,则添加一个独特的sorted属性
                    //if (o.type === 'sort'){
                    //    o.sorted = []
                    //}

                    self.vues.push(new Vue({
                        el: '#q' + o.index,
                        data: o,
                        methods: self.funcs
                    }));

                    //定时,当时长足够时,解除「下一题」按钮的disabled状态
                    self.buttonInterval()
                }

                //显示逻辑
                if (o.depend.itemId){

                    let depended;

                    for (let p = 0; p < list.length; p++){
                        if (list[p].itemId == o.depend.itemId){
                            depended = list[p].index
                        }
                    }

                    let itemDepended = this.answers[depended],
                        rd = false;
                    
                    if (itemDepended){

                        for (let a in o.depend.options){

                            if (itemDepended.values.indexOf(o.depend.options[a]) > -1){

                                rd = true
                            }
                        }
                        if (rd){
                            renderThisQuestion()
                        } else {
                            this.now++;
                            this.putQuestions()
                        }
                    } 
                }else {
                    renderThisQuestion()
                }
            },
            //关联逻辑
            setRelate: function(o){

                if (o.relate){
                    if (o.relate.itemId){
                        let answer = this.answers[o.relate.itemId].values;

                        for (let i in o.options){
                            var thisO = o.options[i];
                            thisO.render = answer.indexOf(thisO.value) > -1
                        }
                    }
                }
            },
            //引用逻辑
            setQuote: function(o){

                if (o.quote){
                    if (o.quote.itemId){
                        var answer = this.answers[o.quote.itemId].values[0];
                        o.title.replace(/\[引用\]/g, answer)
                    }
                }
            },
            //赋值逻辑
            setEvaluate: function(o){

                if (o.evaluate){
                    if (o.evaluate.itemId){
                        var answer = this.answers[o.quote.itemId].values[0];

                        for (let i in o.evaluate.matches){

                            if (o.evaluate.matches[i].value === answer){

                                o.title.replace(/\[赋值\]/g, answer)
                            }
                        }
                    }
                }
            },

            //给新节点赋属性
            setAttr: function(q){

                q.attr(':index','index');
                q.attr(':item_id','itemId');
                q.attr(':title','title');
                q.attr(':type','type');
                q.attr(':form','form');
                q.attr(':need','need');
                q.attr(':the_class','theClass');
                q.attr(':required','required');
                q.attr(':description','description');
                q.attr(':options','options');
                q.attr(':sub_questions','sub_questions');

                q.attr('v-on:check','check');
                q.attr('v-on:fill_check','fillCheck');
                q.attr('v-on:fill_blank','fillBlank');
                q.attr('v-on:check_matrix','checkMatrix');
                q.attr('v-on:input_matrix','inputMatrix');
                q.attr('v-on:mark','mark');
                q.attr('v-on:sort','sort');
                q.attr('v-on:unsort','unsort');
            },

            //定时器函数
            buttonInterval: function(){

                var timeLeft = parseInt(this.time_question),
                    over = $('#next');

                if ($('#save').css('display') != 'none'){
                    over = $('#save');
                }

                var text = over.text();

                over.prop('disabled', true).text(timeLeft);

                function decrease(){

                    timeLeft -= 1;
                    over.text(timeLeft);

                    while (timeLeft <= 0){
                        $('#next').prop('disabled', false);
                        clearInterval(nextInterval);
                        over.text(text);
                        return
                    }
                }

                var nextInterval = setInterval(decrease.bind(this),1000)
            },

            //提交问卷回答
            submitAnswers: function(e){
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                 var  data={
                         surveyId: this.surveyId,//问卷id
                         availability:this.availability,//问卷是否有效   0 无效  1有效
                         completion:parseInt((this.answers.length - 1) * 100 / this.question_number) + '%',//问卷答题百分比
                         sitId: sessionStorage.getItem('sitId') || '',
                         sitName: '',  //问卷标识符   例如：邮箱、唯一链接
                         answers: this.answers[this.now + 1],//答案答案里加ItemId
                         completed: false
                     };
                 if (unescape(r[2])){
                     data.sitName = unescape(r[2])
                 } else if (sessionStorage.getItem('surveyName')) {
                     data.sitName = sessionStorage.getItem('surveyName')
                 }else{
                     data.sitName = "";
                 }

                if ($(e.target).attr('id') === 'save'){

                    //如果是最后一题
                    var end = true;//则跳转到完成页面

                    data.completed = true;//向后台传输的信息中,标注为已完成
                    data.availability = 1;
                }
                 
                $.ajax({
                    url: "" + realPath + "/questionnaire/collect",
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(data),
                        /**{
                        surveyId: this.surveyId,//问卷id
                        availability: this.availability,
                        completion: parseInt((this.answers.length - 1) * 100 / this.question_number) + '%',
                        sitName: location.href.match(/urlcode=(\d+)/) || sessionStorage.getItem('clientEmail'),//登录用户识别符
                        answers: this.answers//答案
                    },*/
                    /**答案对象格式为array,序号从1开始
                     * 一般this.answers[n]的格式为array,
                     * 如果答案(包括单选,单项填空,评分)只有一个元素,则存储在array[0]
                     * 如果多个元素,比如多选等,会依次存入
                     * 如果是多项填空题,则将子问题的question.index作为index存入数组,例如子问题question.index为3,则array[3]={title: '',value: ''}
                     * 如果是矩阵题(评分题同理),同样将子问题的question.index作为index存入数组,不同的是,其value属性为array,例如array[n] = {title: '',value: []}
                     * 同样,如果是矩阵单选/矩阵填空则value[0]为答案,如果是矩阵多选,则value依次存入答案
                    **/
                    success: function(d){

                        var sitId = d[0].sitId;

                        if (!sessionStorage.getItem('sitId')){
                            sessionStorage.setItem('sitId', sitId)
                        }

                        if (end){

                            if (d[0].result === 'success'){
                                document.location.href =realPath+ '/html/kolpanel/completeSurvey.html';
                            } else if (d[0].result === 'error'){
                                console.log(d)
                            }
                        }
                    },
                    error: function(e){
                        console.log(e)
                    }
                })
            },

            //问卷问题模板
            tpl: `
        <div class="inners" :id="'q' + index">
            <div class="inner choice" v-if="type==='choice'">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="answers">
                    <div class="input choice" v-for="option in options" :key="option.optionId">
                        <input :option_code="option.index" :id="'radio_q' + index + '_op' + option.optionId" :name="'q' + index" type="radio" :value="option.value" @change="check">
                        <label :for="'radio_q' + index + '_op' + option.optionId">
                            <i class="icon"><span></span></i>
                            <span class="option_text">{{ option.value }}</span>
                        </label>
                        <span class="blank" contenteditable="true" v-show="option.fillable" @input="fillCheck"></span>
                    </div>
                </div>
            </div>
            <div class="inner checks" v-if="type==='checks'">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="answers">
                    <div class="input checks" v-for="option in options" :key="option.optionId">
                        <input :option_code="option.index" :id="'checks_q' + index + '_op' + option.optionId" :name="'q' + index" type="checkbox" :value="option.value" @change="check">
                        <label :for="'checks_q' + index + '_op' + option.optionId">
                            <i class="icon"><span></span></i>
                            <span class="option_text">{{ option.value }}</span>
                        </label>
                        <span class="blank" contenteditable="true" v-show="option.fillable" @input="fillCheck"></span>
                    </div>
                </div>
            </div>
            <div class="inner blank" v-if="type==='blank'">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="answers single" v-show="form==='single'">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>
                <div class="answers multi" v-show="form==='multi'">
                    <div class="input blank">
                        <div class="questions" v-for="question in sub_questions" :key="question.index">
                            <span class="sub_question">{{ question.title }}<i>:</i></span>
                            <span :question_code="question.index" class="blank" contenteditable="true" :title="question.title" :index="question.index" @input="fillBlank"></span>
                        </div>
                    </div>
                </div>
                <div class="answers textarea" v-show="form==='textarea'">
                    <div class="input blank">
                        <div class="blank" contenteditable="true" input="fillBlank"></div>
                    </div>
                </div>
                <div class="answers time" v-show="form==='time'">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" form="hour" v-show="need.time.indexOf('hour') >= 0" @input="fillBlank"></span>
                        <span class="hour" v-show="need.time.indexOf('hour') >= 0">时</span>
                        <span class="blank" contenteditable="true" form="minute" v-show="need.time.indexOf('minute') >= 0" @input="fillBlank"></span>
                        <span class="hour" v-show="need.time.indexOf('minute') >= 0">分</span>
                        <span class="blank" contenteditable="true" form="second" v-show="need.time.indexOf('second') >= 0" @input="fillBlank"></span>
                        <span class="hour" v-show="need.time.indexOf('second') >= 0">秒</span>
                    </div>
                </div>
                <div class="answers date" v-show="form==='date'">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" form="year" v-show="need.date.indexOf('year') >= 0" @input="fillBlank"></span>
                        <span class="hour" v-show="need.date.indexOf('year') >= 0">年</span>
                        <span class="blank" contenteditable="true" form="month" v-show="need.date.indexOf('month') >= 0" @input="fillBlank"></span>
                        <span class="hour" v-show="need.date.indexOf('month') >= 0">月</span>
                        <span class="blank" contenteditable="true" form="date" v-show="need.date.indexOf('date') >= 0" @input="fillBlank"></span>
                        <span class="hour" v-show="need.date.indexOf('date') >= 0">日</span>
                    </div>
                </div>
            </div>
            <div class="inner matrix" v-if="type==='matrix'">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="answers matrix" v-if="form==='row'">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th v-for="option in options" :key="option.optionId">{{ option.value }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="question in sub_questions" :key="question.index">
                            <td>{{ question.title }}</td>
                            <td v-for="option in options" :key="option.optionId">
                                <input :index="question.index" :option_code="option.index" :name="question.title" :value="option.value" type="checkbox" v-if="the_class==='multi'" @change="checkMatrix">
                                <input :index="question.index" :option_code="option.index" :name="question.title" :value="option.value" type="radio" v-if="the_class==='single' || the_class==='score'" @change="checkMatrix">
                                <input :index="question.index" :option_code="option.index" :name="question.title" :sbt="option.value" type="text" v-if="the_class==='blank'" @change="inputMatrix">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="answers matrix" v-if="form==='col'">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th v-for="question in sub_questions" :key="question.index">{{ question.title }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="prefix" @mousedown="dragPrefix">
                        <td></td>
                        <td v-for="question in sub_questions" :key="question.index" :question_id="question.index" @input="editPrefix" class="edit-prefix"></td>
                        </tr>
                        <tr v-for="option in options" :key="option.optionId">
                            <td>{{ option.value }}</td>
                            <td v-for="question in sub_questions" :key="question.index">
                                <input :index="question.index" :option_code="option.index" :name="question.title" :value="option.value" type="checkbox" v-if="the_class==='multi'" @change="checkMatrix">
                                <input :index="question.index" :option_code="option.index" :name="question.title" :value="option.value" type="radio" v-if="the_class==='single' || the_class==='score'" @change="checkMatrix">
                                <input :index="question.index" :option_code="option.index" :name="question.title" :sbt="option.value" type="text" v-if="the_class==='blank'" @change="inputMatrix">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="inner score" v-if="type==='score'">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="answers score">
                    <div class="score" v-for="option in options" :key="option.optionId">
                        <input :option_code="option.optionId" :id="'score_q' + index + '_op' + option.optionId" :name="'q' + index" type="radio" :value="option.value" @change="mark">
                        <label :for="'score_q' + index + '_op' + option.optionId">
                            <span v-show="form==='text'">{{ option.value }}</span>
                            <span v-show="form==='number'">{{ option.score }}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="inner sort" v-if="type==='sort'">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="answers sort">
                    <div class="to-sort">
                        <div class="sort" v-for="option in options" :id="'checks_q' + index + '_op' + option.optionId" :name="'q' + index" :value="option.value" :key="option.optionId" @click="sort(option)">
                            {{ option.value }}
                        </div>
                    </div>
                    <div class="sorted">
                        <div class="sort" v-for="sort in sorted" :index="sort.index" :value="sort" @click="unsort(sort)" :key='sort.index'>
                            {{ sorted.indexOf(sort) + '. ' + sort.value }}
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="type instanceof Array">
            <div class="inner message name">

                <div class="question_head name" v-if="type.indexOf('name') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="name">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers name" v-if="type.indexOf('name') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head sex" v-if="type.indexOf('sex') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="sex">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers sex" v-if="type.indexOf('sex') > -1">
                    <div class="input choice">
                        <input option_code="1" :id="'radio_q' + index + '_op1'" :name="'q' + index + 'sex'" type="radio" value="男" @change="check">
                        <label :for="'radio_q' + index + '_op1'">
                            <i class="icon"><span></span></i>
                            <span class="option_text">男</span>
                        </label>
                    </div>
                    <div class="input choice">
                        <input option_code="2" :id="'radio_q' + index + '_op2'" :name="'q' + index + 'sex'" type="radio" value="女" @change="check">
                        <label :for="'radio_q' + index + '_op2'">
                            <i class="icon"><span></span></i>
                            <span class="option_text">女</span>
                        </label>
                    </div>
                </div>

                <div class="question_head age" v-if="type.indexOf('age') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="age">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers age" v-if="type.indexOf('age') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head telephone" v-if="type.indexOf('telephone') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="telephone">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers telephone" v-if="type.indexOf('telephone') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head email" v-if="type.indexOf('email') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="email">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers email" v-if="type.indexOf('email') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head company" v-if="type.indexOf('company') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="company">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers company" v-if="type.indexOf('company') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head job" v-if="type.indexOf('job') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="job">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers job" v-if="type.indexOf('job') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head industry" v-if="type.indexOf('industry') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="industry">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers industry" v-if="type.indexOf('industry') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head address" v-if="type.indexOf('address') > -1">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="address">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers address" v-if="type.indexOf('address') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head highschool" v-if="type.indexOf('highschool') > -1">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="highschool">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers highschool" v-if="type.indexOf('highschool') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head education" v-if="type.indexOf('education') > -1">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="highschool">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers education" v-if="type.indexOf('education') > -1">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `,
            funcs: {
                check: function(e){

                    var t = $(e.target),
                        icon = t.siblings('label').find('.icon'),
                        type = this.type;

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: '', codes: [], values: []};
                    }

                    if (type === 'choice'){
                        displayFuncs.answers[this.index]['type'] = 'choice';
                        if (t.prop('checked') === true){

                            displayFuncs.answers[this.index]['values'][0] = t.val();
                            displayFuncs.answers[this.index]['codes'][0] = t.attr('option_code');

                            t.parents('.answers').find('.icon').removeClass('picked');
                            icon.addClass('picked');

                        } else {
                            displayFuncs.answers[this.index]['values'] = [];
                            displayFuncs.answers[this.index]['codes'] = [];

                            icon.removeClass('picked')
                        }
                    } else if (type === 'checks') {
                        displayFuncs.answers[this.index]['type'] = 'checks';
                        if (t.prop('checked') === true){

                            displayFuncs.answers[this.index]['values'].push(t.val());
                            displayFuncs.answers[this.index]['codes'].push(t.attr('option_code'));

                            icon.addClass('picked');
                        } else {
                            displayFuncs.answers[this.index]['values'].splice(displayFuncs.answers[this.index]['values'].indexOf(t.val()), 1);
                            displayFuncs.answers[this.index]['codes'].splice(displayFuncs.answers[this.index]['codes'].indexOf(t.attr('option_code')), 1);

                            icon.removeClass('picked')
                        }
                    }
                },
                fillCheck: function(e){

                    var t = $(e.target);

                    t.siblings('input').val(t.text())
                },
                fillBlank: function(e){

                    var t = $(e.target),
                        f = this.form;

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: 'blank', form: f, codes:[], values: []};
                        if (!displayFuncs.answers[this.index].codes.length){
                            let k = 0;
                            for (let i in this.sub_questions){
                                displayFuncs.answers[this.index].codes[k] = '' + this.sub_questions[i].index;
                                k++
                            }
                        }
                    }

                    if (f === 'single' || f === 'textarea'){
                        displayFuncs.answers[this.index]['values'][0] = t.text()
                    } else if (f === 'multi'){
                        displayFuncs.answers[this.index]['values'][displayFuncs.answers[this.index].codes.indexOf(t.attr('index'))] = t.text();
                    } else if (f === 'time' || f === 'date'){
                        displayFuncs.answers[this.index]['values'][0] = {};
                        displayFuncs.answers[this.index]['values'][0][t.attr('form')] = t.text()
                    }
                },
                checkMatrix: function(e){

                    var t = $(e.target),
                        s = this.theClass,
                        subtitle = t.attr('name'),
                        option = t.attr('value');

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: 'matrix', form: s, values: []};
                    }
                    let answer = displayFuncs.answers[this.index].values;

                    //if (!displayFuncs.answers[this.index]['values'][t.attr('index')]){
                    //    displayFuncs.answers[this.index]['values'][t.attr('index')] = {title: t.attr('name')};
                    //}

                    if (s === 'single' || s === 'score'){
                        if (t.prop('checked') === true){
                            //displayFuncs.answers[this.index]['values'][t.attr('index')]['value'] = [t.val()]

                            for (let i = 0, l = answer.length; i < l; i++){
                                if (answer[i].subtitle === subtitle){
                                    answer.splice(i,1)
                                }
                            }
                            displayFuncs.answers[this.index].values[0] = {
                                subtitle: subtitle,
                                option: option,
                                coordinate: t.attr('index') + '-' + t.attr('option_code')
                                //value: ''
                            }
                        }
                    } else if (s === 'multi'){

                        //if (!displayFuncs.answers[this.index]['values'][t.attr('index')]['value']){
                        //    displayFuncs.answers[this.index]['values'][t.attr('index')]['value'] = [];
                        //}
                        if (t.prop('checked') === true){
                        //    displayFuncs.answers[this.index]['values'][t.attr('index')]['value'].push(t.val())
                        //} else {
                        //    displayFuncs.answers[this.index]['values'][t.attr('index')]['value'].splice(t.val(),1)
                            answer.push({
                                subtitle: subtitle,
                                option: option,
                                coordinate: t.attr('index') + '-' + t.attr('option_code')
                                //value: ''
                            })

                        } else {
                            for (let i = 0, l = answer.length; i < l; i++){
                                if (answer[i].subtitle === subtitle && answer.option === option){
                                    answer.splice(i,1)
                                }
                            }
                        }
                    }
                },
                inputMatrix: function(e){

                    var t = $(e.target),
                        s = this.theClass,
                        subtitle = t.attr('name'),
                        option = t.attr('sbt');

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: 'matrix', form: 'blank', values: []};
                    }
                    let answer = displayFuncs.answers[this.index].values;
                    //if (!displayFuncs.answers[this.index]['values'][t.attr('index')]){
                    //    displayFuncs.answers[this.index]['values'][t.attr('index')] = {title: t.attr('name')}
                    //}
                    //if (!displayFuncs.answers[this.index]['values'][t.attr('index')][t.attr('sbt')]){
                    //    displayFuncs.answers[this.index]['values'][t.attr('index')][t.attr('sbt')] = []
                    //}
                    //displayFuncs.answers[this.index]['values'][t.attr('index')]['value'][t.attr('index')][t.attr('sbt')] = [t.val()]
                    for (let i = 0, l = answer.length; i < l; i++){
                        if (answer[i].subtitle === subtitle && answer[i].option === option){
                            answer[i].value = t.val();
                            return;
                        }
                    }
                    answer.push({
                        subtitle: subtitle,
                        option: option,
                        coordinate: t.attr('index') + '-' + t.attr('option_code'),
                        value: t.val()
                    })
                },
                mark: function(e){

                    var t = $(e.target);

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: 'score', codes: [], values: []};
                    }
                    if (t.prop('checked') === true){
                        displayFuncs.answers[this.index]['values'] = [$(e.target).val()];
                        displayFuncs.answers[this.index]['codes'] = [$(e.target).attr('option_code')];

                        t.parents('.answers').find('label').removeClass('marked');
                        t.siblings('label').addClass('marked')
                    } else {
                        displayFuncs.answers[this.index]['values'] = [];
                        displayFuncs.answers[this.index]['codes'] = []
                    }
                },
                sort: function(option){

                    //var t = $(e.target);

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: 'sort', values: []};
                    }
                    //if (!this.sorted){
                    //    this.sorted = []
                    //}
                    var values = displayFuncs.answers[this.index]['values'],
                        v = option.value;

                    values.push(v);

                    for (let n in this.options){
                        if (this.options[n] === option){
                            delete(this.options[n])
                        }
                    }

                    this.sorted.push(option);
                    //else {
                    //    values.splice(values.indexOf(v),1);
                    //    i.text('');
                    //    t.parents('.answers').find('input').each(function(){
                    //        var item = $(this),
                    //            ids = values.indexOf(item.val());
                    //        if (ids > -1){
                    //            item.siblings('label').find('i').text(ids + 1);
                    //        }
                    //    })
                    //}
                },
                unsort: function(sort){

                    var values = JSON.parse(JSON.stringify(displayFuncs.answers[this.index]['values'])),
                        index = sort.index,
                        v = sort.value;

                    if (index === 'x') return;

                    values.splice(values.indexOf(v),1);
                    this.sorted.splice(this.sorted.indexOf(sort),1);
                    displayFuncs.answers[this.index]['values'] = values;

                    this.options[sort.index] = sort;

                    //var s = t.parents('answers.sort').find('to-sort').find('.sort[value='+ v +']');
                    //s.show().find('input').prop('checked',true);
                }
            }
        };






        Vue.component('qs',{
            props:['index', 'ordericon','item_id','title','type','form','the_class','active','description','required','options','sub_questions','need','jump','depend','quote','relate','evaluate', 'sorted'],
            template: displayFuncs.tpl,
            methods: {
                check: function(e){
                    this.$emit('check',e)
                },
                fillCheck: function(e){
                    this.$emit('fill_check',e)
                },
                fillBlank: function(e){
                    this.$emit('fill_blank',e)
                },
                checkMatrix: function(e){
                    this.$emit('check_matrix',e)
                },
                inputMatrix: function(e){
                    this.$emit('input_matrix',e)
                },
                mark: function(e){
                    this.$emit('mark',e)
                },
                sort: function(e){
                    this.$emit('sort',e)
                },
                unsort: function(e){
                    this.$emit('unsort',e)
                }
            }
        });
        $('#previous').on('click', displayFuncs.previousQ.bind(displayFuncs));
        $('#next').on('click', displayFuncs.nextQ.bind(displayFuncs));
        $('#start').on('click', displayFuncs.startQuestionnaire.bind(displayFuncs));
        $('#save').on('click',displayFuncs.submitAnswers.bind(displayFuncs));

    ///*
    //接收问卷题目
    $.ajax({
        url: "" + realPath + "/questionnaire/Default",
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify(details),
        success: function(d){
            if (d[0].result[0].state === "1"){
                alert("该问卷尚未编辑完成");
                return false
            }
            else if (d[0].result[0].state === "3"){
                alert("该问卷已停止收集");
                return false
            }
            else if (d[0].result[0].state === "4"){
                //alert("此链接已经失效");
                //document.location.href = realPath+'/html/kolpanel/completeSurvey.html';
                //return false
                displayFuncs.submitAnswers = function(e){}
            }
            if (d[0].linTag === "1"){
                alert("此链接已经失效");
                document.location.href = realPath+'/html/kolpanel/endSurvey.html';
                return false
            }
            else if (d[0].linTag === "3"){
                alert("此链接被提交完成");
                document.location.href = realPath+'/html/kolpanel/completeSurvey.html';
                return false
            }
    //var d = [{"result":[{"count":31,"counts":0,"createTime":{"date":3,"day":3,"hours":19,"minutes":14,"month":0,"seconds":27,"time":1514978067000,"timezoneOffset":-480,"year":118},"discribe":"测试版","email":"jason.zheng@jfcmc.com","schedule":0,"setting":"[{\"total_top\":\"150\",\"total_bottom\":\"100\",\"time_question\":{\"restrict\":false,\"time\":null},\"time_survey\":{\"restrict\":false,\"time\":null},\"clientOnly\":false,\"disposableForClient\":false,\"disposableForIp\":false,\"disposableForDevice\":false,\"passwordNeeded\":false,\"verificationCodeNeeded\":false,\"allocations\":{\"question_list\":null,\"summary_top\":150,\"summary_bottom\":100,\"allocate_top\":290,\"allocate_bottom\":220,\"collected\":0,\"allocatings\":[{\"index\":0,\"question_id\":\"933\",\"question_title\":\"\",\"options\":null,\"sum_top\":70,\"sum_bottom\":50,\"allocate_option\":[{\"op_index\":0,\"value\":\"是\",\"allocation_top\":50,\"percent_top\":33,\"allocation_bottom\":40,\"percent_bottom\":40,\"collected\":0},{\"op_index\":1,\"value\":\"否\",\"allocation_top\":20,\"percent_top\":13,\"allocation_bottom\":10,\"percent_bottom\":10,\"collected\":0}]},{\"index\":1,\"question_id\":\"935\",\"question_title\":\"\",\"options\":null,\"sum_top\":220,\"sum_bottom\":170,\"allocate_option\":[{\"op_index\":0,\"value\":\"三级综合医院\",\"allocation_top\":120,\"percent_top\":80,\"allocation_bottom\":100,\"percent_bottom\":100,\"collected\":0},{\"op_index\":1,\"value\":\"\",\"allocation_top\":100,\"percent_top\":67,\"allocation_bottom\":70,\"percent_bottom\":70,\"collected\":0}]}]},\"allocation_cross\":{\"question_list\":null,\"summary_top\":150,\"summary_bottom\":100,\"allocate_top\":0,\"allocate_bottom\":0,\"collected\":0,\"allocatings\":[{\"index\":0,\"options\":null,\"conditionString\":\"\",\"allocate_bottom\":0,\"allocate_top\":0,\"percent_bottom\":0,\"percent_top\":0,\"percent_average\":0},{\"index\":1,\"options\":null,\"conditionString\":\"\",\"allocate_bottom\":0,\"allocate_top\":0,\"percent_bottom\":0,\"percent_top\":0,\"percent_average\":0}]}}]","state":"2","title":"Project PAS 静脉/动脉/末梢采血产品市场调研甄别问卷","type":"","updateTime":{"date":3,"day":3,"hours":19,"minutes":14,"month":0,"seconds":27,"time":1514978067000,"timezoneOffset":-480,"year":118},"wjId":187,"wjQuestion":[{"itemContent":"[{\"active\":true,\"itemId\":1,\"itemKey\":null,\"index\":1,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"尊敬的女士/先生：您好，我们是益普索公司医药市场研究团队的访问员。我公司是一家专门从事医药和医疗器械产品市场调研的公司。现正在开展特殊静脉/动脉/末梢采血产品市场研究，目的是想了解特殊静脉/动脉/末梢采血产品的市场现状及未来市场潜力。今天希望能占用您45分钟左右的时间来采访您，希望能得到您的配合。访问中所涉及的个人信息和资料将被严格保密，绝对不会泄露给第三方或者作为它用。请问您是否同意接受本次访问?\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"是\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"否\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"是\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"否\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":933,"itemIdentification":"1","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":2,\"itemKey\":null,\"index\":2,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"所在城市选择\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"北京\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"上海\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"广州\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"成都\",\"score\":\"\",\"fillable\":false},\"5\":{\"index\":5,\"optionId\":5,\"value\":\"长沙\",\"score\":\"\",\"fillable\":false},\"6\":{\"index\":6,\"optionId\":6,\"value\":\"重庆\",\"score\":\"\",\"fillable\":false},\"7\":{\"index\":7,\"optionId\":7,\"value\":\"其它\",\"score\":\"\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"北京\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"上海\",\"target\":\"\"},\"3\":{\"optionId\":\"3\",\"value\":\"广州\",\"target\":\"\"},\"4\":{\"optionId\":\"4\",\"value\":\"成都\",\"target\":\"\"},\"5\":{\"optionId\":\"5\",\"value\":\"长沙\",\"target\":\"\"},\"6\":{\"optionId\":\"6\",\"value\":\"重庆\",\"target\":\"\"},\"7\":{\"optionId\":\"7\",\"value\":\"其它\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":934,"itemIdentification":"2","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":7,\"itemKey\":null,\"index\":5,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您目前就职于以下哪种类型的医院?  【单选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"三级综合医院\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"二甲综合医院\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"其他\",\"score\":\"\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"三级综合医院\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"二甲综合医院\",\"target\":\"\"},\"3\":{\"optionId\":\"3\",\"value\":\"其他\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":935,"itemIdentification":"7","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":8,\"itemKey\":\"936\",\"index\":6,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您所在的科室部门是? 【单选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"住院部儿科\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"住院部感染科\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"住院部呼吸科\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"急诊病房\",\"score\":\"\",\"fillable\":false},\"5\":{\"index\":5,\"optionId\":5,\"value\":\"麻醉科\",\"score\":\"\",\"fillable\":false},\"6\":{\"index\":6,\"optionId\":6,\"value\":\"其他\",\"score\":\"\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"住院部儿科\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"住院部感染科\",\"target\":\"\"},\"3\":{\"optionId\":\"3\",\"value\":\"住院部呼吸科\",\"target\":\"\"},\"4\":{\"optionId\":\"4\",\"value\":\"急诊病房\",\"target\":\"\"},\"5\":{\"optionId\":\"5\",\"value\":\"麻醉科\",\"target\":\"\"},\"6\":{\"optionId\":\"6\",\"value\":\"其他\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":936,"itemIdentification":"8","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":9,\"itemKey\":\"937\",\"index\":7,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您的职务是?【单选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"临床医生\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"其他\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"临床医生\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"其他\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"8\",\"options\":[\"住院部儿科\",\"住院部感染科\",\"住院部呼吸科\",\"急诊病房\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":937,"itemIdentification":"9","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":10,\"itemKey\":null,\"index\":8,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您的职务是?\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"麻醉师（高年资医师）\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"其他\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"麻醉师（高年资医师）\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"其他\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"8\",\"options\":[\"麻醉科\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":938,"itemIdentification":"10","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":11,\"itemKey\":null,\"index\":9,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您是否操作过动脉采血? 【单选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"是\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"否\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"是\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"否\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":939,"itemIdentification":"11","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":12,\"itemKey\":null,\"index\":10,\"ordericon\":\"\",\"type\":\"blank\",\"form\":\"single\",\"theClass\":\"single\",\"title\":\"请问您目前平均每天的动脉采血人次数?【记录个数】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"人次/天\",\"required\":true,\"editing\":false,\"options\":{},\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"\"},\"2\":{\"index\":2,\"title\":\"\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{},\"quote\":{},\"relate\":{},\"evaluate\":{}}]","itemId":940,"itemIdentification":"12","itemIndex":0,"itemType":"blank","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":13,\"itemKey\":null,\"index\":11,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您目前平均每天的动脉采血人次数?【圈选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"2人次及以上\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"2人次以下\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"2人次及以上\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"2人次以下\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":941,"itemIdentification":"13","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":14,\"itemKey\":null,\"index\":12,\"ordericon\":\"\",\"type\":\"blank\",\"form\":\"single\",\"theClass\":\"single\",\"title\":\"请问您目前每天的采血开单量是多少（含静脉，动脉，末梢）?【记录个数】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"人次/天\",\"required\":true,\"editing\":false,\"options\":{},\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"\"},\"2\":{\"index\":2,\"title\":\"\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":942,"itemIdentification":"14","itemIndex":0,"itemType":"blank","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":15,\"itemKey\":null,\"index\":13,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您目前每天的采血开单量是多少（含静脉，动脉，末梢）? 【圈选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"20人次及以上\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"20人次以下\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"20人次及以上\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"20人次以下\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":943,"itemIdentification":"15","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":17,\"itemKey\":null,\"index\":14,\"ordericon\":\"\",\"type\":\"blank\",\"form\":\"single\",\"theClass\":\"single\",\"title\":\"请问您在所在科室临床工作的年限是多少? 【记录年限】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"年\",\"required\":true,\"editing\":false,\"options\":{},\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"\"},\"2\":{\"index\":2,\"title\":\"\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{},\"quote\":{},\"relate\":{},\"evaluate\":{}}]","itemId":944,"itemIdentification":"17","itemIndex":0,"itemType":"blank","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":18,\"itemKey\":null,\"index\":15,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您在所在科室临床工作的年限是多少?【圈选】\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"5年以下\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"5年及以上\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"5年以下\",\"target\":\"over\"},\"2\":{\"optionId\":\"2\",\"value\":\"5年及以上\",\"target\":\"\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":945,"itemIdentification":"18","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":19,\"itemKey\":null,\"index\":16,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您所在科室过去12个月使用过下列哪些品牌的采血产品？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"BD/碧迪\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"KDL/康德莱\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"拱东\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"阳普\",\"score\":\"\",\"fillable\":false},\"5\":{\"index\":5,\"optionId\":5,\"value\":\"成都瑞琦\",\"score\":\"\",\"fillable\":false},\"6\":{\"index\":6,\"optionId\":6,\"value\":\"苏州施莱\",\"score\":\"\",\"fillable\":false},\"7\":{\"index\":7,\"optionId\":7,\"value\":\"Radiometer/雷度米特\",\"score\":\"\",\"fillable\":false},\"8\":{\"index\":8,\"optionId\":8,\"value\":\"威高/洁瑞\",\"score\":\"\",\"fillable\":false},\"9\":{\"index\":9,\"optionId\":9,\"value\":\"HTL/麦德伦斯\",\"score\":\"\",\"fillable\":false},\"10\":{\"index\":10,\"optionId\":10,\"value\":\"Smith/史密斯\",\"score\":\"\",\"fillable\":false},\"11\":{\"index\":11,\"optionId\":11,\"value\":\"其他\",\"score\":\"\",\"fillable\":true}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{},\"quote\":{},\"relate\":{},\"evaluate\":{}}]","itemId":946,"itemIdentification":"19","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":20,\"itemKey\":null,\"index\":17,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"在最近3个月内您是否参加过任何关于此类医疗产品的市场调研活动?\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"是\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"否\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"是\",\"target\":\"over\"},\"2\":{\"optionId\":\"2\",\"value\":\"否\",\"target\":\"\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":947,"itemIdentification":"20","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":21,\"itemKey\":\"948\",\"index\":18,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"您在过去3个月内是否参加过任何形式的市场调查呢？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"是\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"否\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"是\",\"target\":\"over\"},\"2\":{\"optionId\":\"2\",\"value\":\"否\",\"target\":\"\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":948,"itemIdentification":"21","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":22,\"itemKey\":null,\"index\":19,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您愿意参加这个调研活动吗?\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"Yes\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"No\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{\"1\":{\"optionId\":\"1\",\"value\":\"Yes\",\"target\":\"\"},\"2\":{\"optionId\":\"2\",\"value\":\"No\",\"target\":\"over\"}},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":949,"itemIdentification":"22","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":24,\"itemKey\":null,\"index\":20,\"ordericon\":\"\",\"type\":\"matrix\",\"form\":\"row\",\"theClass\":\"blank\",\"title\":\"请问您所在科室病床的总床位数_______张？；请问您所在科室的床位平均使用率是多少？ ；请问您所在科室的患者平均住院天数是多少？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"总床位数（张）\"},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"床位平均使用率（%）\"},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"平均住院天数（天）\"}},\"col\":\"4\",\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"\",\"prefix\":\"\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"8\",\"options\":[\"住院部儿科\",\"住院部感染科\",\"住院部呼吸科\",\"急诊病房\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":950,"itemIdentification":"24","itemIndex":0,"itemType":"matrix","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":25,\"itemKey\":null,\"index\":21,\"ordericon\":\"\",\"type\":\"matrix\",\"form\":\"row\",\"theClass\":\"blank\",\"title\":\"请问您所在科室，进行动脉采血的主要病人类型有哪些？；请问以上这些类型的病人在所有动脉采血病人中分别占多少比例？；请问以上每种类型的病人，平均每天进行动脉采血的频率是多少（次/天）？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"主要病人类型\"},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"占比（%）\"},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"频率（次/天）\"}},\"col\":\"5\",\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"病人类型1\",\"prefix\":\"\"},\"2\":{\"index\":2,\"title\":\"病人类型2\",\"prefix\":\"\"},\"3\":{\"index\":3,\"title\":\"病人类型3\",\"prefix\":\"\"},\"4\":{\"index\":4,\"title\":\"病人类型4\",\"prefix\":\"\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"8\",\"options\":[\"住院部儿科\",\"住院部感染科\",\"住院部呼吸科\",\"急诊病房\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":951,"itemIdentification":"25","itemIndex":0,"itemType":"matrix","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":26,\"itemKey\":null,\"index\":22,\"ordericon\":\"\",\"type\":\"matrix\",\"form\":\"row\",\"theClass\":\"blank\",\"title\":\"请问贵医院平均一天的手术量有__________台？；请问其中需要麻醉的手术量有__________台？；请问其中需要动脉采血的手术量有__________台？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"台\"}},\"col\":\"3\",\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"总手术量\",\"prefix\":\"\"},\"2\":{\"index\":2,\"title\":\"需要麻醉的手术量\",\"prefix\":\"\"},\"3\":{\"index\":3,\"title\":\"需要动脉采血的手术量\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"8\",\"options\":[\"麻醉科\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":952,"itemIdentification":"26","itemIndex":0,"itemType":"matrix","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":27,\"itemKey\":null,\"index\":23,\"ordericon\":\"\",\"type\":\"matrix\",\"form\":\"row\",\"theClass\":\"blank\",\"title\":\"请问在涉及动脉采血的手术中，全麻和半麻的比例分别有多少？；请问在全麻和半麻的手术中，平均分别需要进行几次动脉采血？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"%\"}},\"col\":\"5\",\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"全麻手术\",\"prefix\":\"\"},\"2\":{\"index\":2,\"title\":\"半麻手术\",\"prefix\":\"\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"8\",\"options\":[\"麻醉科\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":953,"itemIdentification":"27","itemIndex":0,"itemType":"matrix","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":28,\"itemKey\":null,\"index\":24,\"ordericon\":\"\",\"type\":\"matrix\",\"form\":\"row\",\"theClass\":\"blank\",\"title\":\"请问您所在科室，进行动脉采血的主要手术类型有哪些（如心脏手术等）？；请问以上这些手术类型占所有动脉采血手术的比例分别是多少？；请问以上每种类型的手术病人，平均每台手术进行动脉采血的频率是多少？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"手术类型\"},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"占所有动脉采血手术比例（加合100%）\"},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"进行动脉采血的频率（次/台）\"}},\"col\":\"5\",\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"手术类型1\",\"prefix\":\"\"},\"2\":{\"index\":2,\"title\":\"手术类型2\",\"prefix\":\"\"},\"3\":{\"index\":3,\"title\":\"手术类型3\",\"prefix\":\"\"},\"4\":{\"index\":4,\"title\":\"手术类型4\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"8\",\"options\":[\"麻醉科\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":954,"itemIdentification":"28","itemIndex":0,"itemType":"matrix","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":29,\"itemKey\":\"955\",\"index\":25,\"ordericon\":\"\",\"type\":\"checks\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"您所在的科室过去3年的动脉血检测量的变化情况，增加/减少的比例（%）\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"增加\",\"fillable\":true},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"减少\",\"fillable\":true},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"不变\",\"score\":\"\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{},\"quote\":{},\"relate\":{},\"evaluate\":{}}]","itemId":955,"itemIdentification":"29","itemIndex":0,"itemType":"checks","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":30,\"itemKey\":null,\"index\":26,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问动脉血检测量增加的主要原因有哪些？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"分级诊疗导致危重病人的增加\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"科室引入自己的血气分析仪\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"环境污染导致呼吸系统疾病的病人量增多\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"人口老龄化，导致年老病人数增多\",\"score\":\"\",\"fillable\":false},\"5\":{\"index\":5,\"optionId\":5,\"value\":\"医院扩建/床位数增加导致病人量增加\",\"score\":\"\",\"fillable\":false},\"6\":{\"index\":6,\"optionId\":6,\"value\":\"其他原因\",\"score\":\"\",\"fillable\":true}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"29\",\"options\":[\"增加\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":956,"itemIdentification":"30","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":31,\"itemKey\":null,\"index\":27,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问动脉血检测量减少的主要原因有哪些？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"病人量的减少，尤其是分级诊疗制度分流了病人\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"医院耗材控费\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"病人拒绝动脉血检测\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"其他原因\",\"score\":\"\",\"fillable\":true}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"29\",\"options\":[\"减少\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":957,"itemIdentification":"31","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":36,\"itemKey\":null,\"index\":28,\"ordericon\":\"\",\"type\":\"choice\",\"form\":\"col\",\"theClass\":\"single\",\"title\":\"请问您所在科室，您使用的采血器具有哪些？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"自制带肝素的注射器\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"动脉留置针\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"安全型动脉采血器（即具备防针刺伤功能的动脉采血器）\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"普通型动脉采血器（即不具备防针刺伤功能的动脉采血器）\",\"score\":\"\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{},\"quote\":{},\"relate\":{},\"evaluate\":{}}]","itemId":959,"itemIdentification":"36","itemIndex":0,"itemType":"choice","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":37,\"itemKey\":\"960\",\"index\":29,\"ordericon\":\"\",\"type\":\"blank\",\"form\":\"multi\",\"theClass\":\"single\",\"title\":\"请问您所在科室，这些采血器具的使用量占比分别是多少（%）？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{},\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"自制带肝素的注射器\"},\"2\":{\"index\":2,\"title\":\"动脉留置针\"},\"3\":{\"index\":3,\"title\":\"安全型动脉采血器（即具备防针刺伤功能的动脉采血器）\"},\"4\":{\"index\":4,\"title\":\"普通型动脉采血器（即不具备防针刺伤功能的动脉采血器）\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"\",\"options\":[]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":960,"itemIdentification":"37","itemIndex":0,"itemType":"blank","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":38,\"itemKey\":null,\"index\":30,\"ordericon\":\"\",\"type\":\"blank\",\"form\":\"multi\",\"theClass\":\"single\",\"title\":\"请问您所在科室使用的动脉留置针进行动脉采血的主要原因有哪些？\",\"description\":\"\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{},\"sub_questions\":{\"1\":{\"index\":1,\"title\":\"原因1\"},\"2\":{\"index\":2,\"title\":\"原因2\"}},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{\"itemId\":\"36\",\"options\":[\"动脉留置针\"]},\"quote\":{\"itemId\":\"\"},\"relate\":{\"itemId\":\"\"},\"evaluate\":{\"itemId\":\"\"}}]","itemId":961,"itemIdentification":"38","itemIndex":0,"itemType":"blank","wjId":187},{"itemContent":"[{\"active\":true,\"itemId\":41,\"itemKey\":\"962\",\"index\":31,\"ordericon\":\"\",\"type\":\"sort\",\"form\":\"click\",\"theClass\":\"single\",\"title\":\"请问，根据您的经验，您选择静脉采血针/动脉采血器/末梢采血针主要关注以下哪些方面？\",\"description\":\"请您对各因素影响重要性进行1-10排序？1为最重要，10为最不重要\",\"words_restrict\":{\"min\":\"\",\"max\":\"\"},\"suffix\":\"\",\"required\":true,\"editing\":false,\"options\":{\"1\":{\"index\":1,\"optionId\":1,\"value\":\"产品质量和可靠性\",\"score\":\"\",\"fillable\":false},\"2\":{\"index\":2,\"optionId\":2,\"value\":\"穿刺成功率\",\"score\":\"\",\"fillable\":false},\"3\":{\"index\":3,\"optionId\":3,\"value\":\"性价比\",\"score\":\"\",\"fillable\":false},\"4\":{\"index\":4,\"optionId\":4,\"value\":\"临床培训\",\"score\":\"\",\"fillable\":false},\"5\":{\"index\":5,\"optionId\":5,\"value\":\"售后服务\",\"score\":\"\",\"fillable\":false},\"6\":{\"index\":6,\"optionId\":6,\"value\":\"操作简便\",\"score\":\"\",\"fillable\":false},\"7\":{\"index\":7,\"optionId\":7,\"value\":\"安全性\",\"score\":\"\",\"fillable\":false},\"8\":{\"index\":8,\"optionId\":8,\"value\":\"出血量\",\"score\":\"\",\"fillable\":false},\"9\":{\"index\":9,\"optionId\":9,\"value\":\"穿刺疼痛性\",\"score\":\"\",\"fillable\":false}},\"sub_questions\":{},\"need\":{\"time\":[],\"date\":[]},\"jump\":{},\"depend\":{},\"quote\":{},\"relate\":{},\"evaluate\":{},\"sorted\":[{\"index\":10,\"optionId\":10,\"value\":\"临床应用经验\",\"score\":\"\",\"fillable\":false}]}]","itemId":962,"itemIdentification":"41","itemIndex":0,"itemType":"sort","wjId":187},{"itemContent":"[{\"itemId\":3,\"index\":3,\"active\":true,\"editing\":false,\"ordericon\":\"\",\"title\":\"请输入您的姓名\",\"required\":true,\"type\":[\"name\"],\"form\":\"single\",\"description\":\"\",\"sub_questions\":{},\"quote\":{},\"relate\":{},\"evaluate\":{},\"sorted\":[],\"depend\":{},\"options\":{},\"theClass\":\"\",\"words_restrict\":\"\",\"suffix\":\"\",\"need\":{},\"jump\":{},\"surveyId\":187,\"itemKey\":963}]","itemId":963,"itemIdentification":"3","itemIndex":0,"itemType":"[name]","wjId":187},{"itemContent":"[{\"itemId\":4,\"index\":4,\"active\":true,\"editing\":false,\"ordericon\":\"\",\"title\":\"请输入您的工作单位\",\"required\":true,\"type\":[\"company\"],\"sub_questions\":{},\"quote\":{},\"relate\":{},\"evaluate\":{},\"sorted\":{},\"form\":\"single\",\"description\":\"\",\"depend\":{},\"options\":{},\"theClass\":\"\",\"words_restrict\":\"\",\"suffix\":\"\",\"need\":{},\"jump\":{},\"surveyId\":187,\"itemKey\":964}]","itemId":964,"itemIdentification":"4","itemIndex":0,"itemType":"[company]","wjId":187}]}]}];
            displayFuncs.displaySurvey(d[0].result[0]);
        },
        error: function(e){

        }
    });
    //*/

    //用测试数据测试
    //displayFuncs.displaySurvey(result[0]);

    }());

/*





/*
//回答结果格式
var Answers = [];

//单选题
Answers[1] = {
    type: 'choice',
    values: ['answer']
};
//多选题
Answers[2] = {
    type: 'checks',
    values: ['answer1','answer2']
};
//填空题
Answers[3] = {
    type: 'blank',
    form: 'single/multi/textarea/time/date',
    values:
        //single单项填空
        ['answer']
        //multi多项填空
        [question.index:{'title1': 'answer1'},question.index: {'title2': 'answer2'}]
        //textarea多行文本
        ['answer']
        //time/date
        [{'time/date': 'answer'}]
};
//矩阵题
Answers[4] = {
    type: 'matrix',
    form: 'single/multi/input',
    values: [question.index:{'title1': 'answer1'},question.index: {'title2': 'answer2'}]
}
//评分题同单选
//排序题同矩阵
*/