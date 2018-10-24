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

                    q.insertBefore(buttons);
                    buttons.css('display','block');

                    //如果是排序题,则添加一个独特的sorted属性
                    if (o.type === 'sort'){
                        o.sorted = []
                    }

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

                if (o.relate.itemId){
                    let answer = this.answers[o.relate.itemId].values;

                    for (let i in o.options){
                        var thisO = o.options[i];
                        thisO.render = answer.indexOf(thisO.value) > -1
                    }
                }
            },
            //引用逻辑
            setQuote: function(o){

                if (o.quote.itemId){
                    var answer = this.answers[o.quote.itemId].values[0];
                    o.title.replace(/\[引用\]/g, answer)
                }
            },
            //赋值逻辑
            setEvaluate: function(o){

                if (o.evaluate.itemId){
                    var answer = this.answers[o.quote.itemId].values[0];

                    for (let i in o.evaluate.matches){

                        if (o.evaluate.matches[i].value === answer){

                            o.title.replace(/\[赋值\]/g, answer)
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
                        <span class="blank" contenteditable="true" v-show="option.fillable" @input="option.value=event.target.innerText"></span>
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
                        <span class="blank" contenteditable="true" v-show="option.fillable" @input="option.value=event.target.innerText"></span>
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
                        <tr class="prefix">
                        <td></td>
                        <td v-for="question in sub_questions" :key="question.index" :question_id="question.index" class="edit-prefix"></td>
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
                        <div class="sort" v-for="sort in sorted" :index="sort.index" :value="sort" @click="unsort(sort)">
                            {{ sorted.indexOf(sort) + '. ' + sort }}
                        </div>
                    </div>
                </div>
            </div>


            <div class="inners" :id="'q' + index" v-if="type instanceof Array">
            <div class="inner message name">

                <div class="question_head name" v-if="type.indexOf('name') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="name">{{ title.name }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers name" v-if="type.indexOf('name') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head sex" v-if="type.indexOf('sex') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="sex">{{ title.sex }}</span>
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
                    <span class="question_title" name="age">{{ title.age }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers age" v-if="type.indexOf('age') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head telephone" v-if="type.indexOf('telephone') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="telephone">{{ title.telephone }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers telephone" v-if="type.indexOf('telephone') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head email" v-if="type.indexOf('email') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="email">{{ title.email }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers email" v-if="type.indexOf('email') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head company" v-if="type.indexOf('company') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="company">{{ title.company }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers company" v-if="type.indexOf('company') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head job" v-if="type.indexOf('job') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="job">{{ title.job }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers job" v-if="type.indexOf('job') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head industry" v-if="type.indexOf('industry') > -1" >
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="industry">{{ title.industry }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers industry" v-if="type.indexOf('industry') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head address" v-if="type.indexOf('address') > -1">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="address">{{ title.address }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers address" v-if="type.indexOf('address') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head highschool" v-if="type.indexOf('highschool') > -1">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="highschool">{{ title.highschool }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers highschool" v-if="type.indexOf('highschool') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true" @input="fillBlank"></span>
                    </div>
                </div>

                <div class="question_head education" v-if="type.indexOf('education') > -1">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="highschool">{{ title.highschool }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="answers education" v-if="type.indexOf('education') > -1">
                    <div class="input">
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

                    var t = $(e.target),
                        c = t.siblings('input'),
                        optionId = c.attr('id').match(/_op(\d+)/)[1],
                        option = this.options[optionId];

                    if (!/\+/.test(c.val())){
                        c.val(c.val() + '+');
                    }
                    c.val(c.val().replace(/\+[\s\S]*/g, '+ ' + t.text()))
                },
                fillBlank: function(e){

                    var t = $(e.target),
                        f = this.form;

                    if (!displayFuncs.answers[this.index]){
                        displayFuncs.answers[this.index] = {itemId: this.idInSQL ,type: 'blank', form: f, codes:[], values: []};
                        if (displayFuncs.answers[this.index].codes.length === 0){
                            let k = 0;
                            for (let i in this.sub_questions){
                                displayFuncs.answers[this.index].codes[k] = this.sub_questions[i].index;
                                k++
                            }
                        }
                    }

                    if (f === 'single' || f === 'textarea'){
                        displayFuncs.answers[this.index]['values'][0] = t.text()
                    } else if (f === 'multi'){
                        displayFuncs.answers[this.index]['values'][displayFuncs.answers[this.index].codes.indexOf(parseInt(t.attr('index')))] = t.text();
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

                    var t = $(e.target);

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
                        if (options[n] === option){
                            delete(option[n])
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