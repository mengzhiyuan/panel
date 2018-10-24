import survey_template from '../survey/survey-template.js';

let curWwwPath = window.document.location.href,
    pathName = window.document.location.pathname,
    pos = curWwwPath.indexOf(pathName),
    localhostPath = curWwwPath.substring(0, pos),
    projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

let survey_data = {
    realPath: localhostPath+projectName,
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
        submit: function(){
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
        initialStyle: function(style_object){

        },
        getData: function(page){
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
                success: function(d){
                    console.log(d);
                    if (d[0]){
                        self.initialSurvey(d[0]);
                        self.page = page
                    }
                },
                error: function(e){
                    console.log(e)
                }
            });

            // this.initialSurvey(survey_object[0]);
        },
        initialSurvey: function(d){
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

            this.initialStyle(this.style_number,this.style);

            $('#title').text(this.survey_name);
            $('#remark').text(this.survey_remark);

            this.questions = d.wjSubject;

            this.answers_object.survey_id = 21;//--------------------------------待更改
            this.answers_array = this.answers_object.answers_now;
            survey_template.logic = this.logic = information.wjSavedLogic || {
                display_logic: [],
                jump_logic: []
            };
            for (let i = 0; i < this.logic.display_logic.length; i++){
                for (let j = 0; j < this.logic.display_logic[i].conditions.length; j++){
                    this.logic.display_logic[i].conditions[j].correspond = false
                }
            }
            for (let i = 0; i < this.logic.jump_logic.length; i++){
                for (let j = 0; j < this.logic.jump_logic[i].conditions.length; j++){
                    this.logic.jump_logic[i].conditions[j].correspond = false
                }
            }

            this.displayItem(this.questions)
        },
        displayItem: function(questions){
            if (questions.length){
                function compare(obj_a, obj_b){
                    return parseInt(obj_a['subIndex']) - parseInt(obj_b['subIndex'])
                }
                questions.sort(compare);

                for (let i = 0; i < questions.length; i++){
                    this.renderItem(questions[i])
                }
            }
        },
        renderItem: function(data){
            let id,
                sub_id,
                index,
                name,
                remark,
                number,
                breaking,
                type,
                options,
                sub_questions,
                config,
                template,
                methods,
                watcher,
                mounted,
                created,
                beforeCreate,
                answer_container;

            if (data.subConfig){

                let config = JSON.parse(data.subConfig)[0];

                if (!config.exist){
                    return
                }

                id = data.id = data.subPId;
                index = data.index = data.subIndex;
                name = data.name = data.subName;
                remark = data.remark = data.subRemark;
                number = data.number = data.subNumber;
                if (data.subOption){
                    data.options = JSON.parse(data.subOption);
                }
                if (data.subQuestions){
                    data.sub_questions = JSON.parse(data.subQuestions);
                }
                breaking = data.breaking = data.subBreak;
                type = data.type = data.subType;
                data.config = config;
                template = survey_template[type].template;
                methods = survey_template[type].methods;
                watcher = survey_template[type].watch || {};
                beforeCreate = survey_template[type].beforeCreate || function(){};
                mounted = survey_template[type].mounted || function(){};
                created = survey_template[type].created || function(){};

                if (data.options){
                    options = data.options
                }
                if (data.sub_questions){
                    sub_questions = data.sub_questions
                }

                switch (type){
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

                for (let i = 0; i < this.logic.display_logic.length; i++){
                    if (this.logic.display_logic[i].target === data.id){
                        data.correspond = false
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
                this.answering = data.id//待更改，把这个放到survey-template: answering.watch里面
            }
        },
        clearPage: function(){
            this.submit();
            $('#questions').html('')
        },
        previousPage: function(){
            this.clearPage();
            if (this.page > 1){
                this.getData(this.page - 1)
            }
        },
        nextPage: function(){
            this.clearPage();
            if (this.page < this.total_page){
                this.getData(this.page + 1)
            }
        },
        submitAll: function(){
            this.clearPage()
        }
    },
    mounted: function(){
        this.getData(1);
        if (sessionStorage.getItem('way') === 'print'){
            window.print()
        }
    },
    watch: {
        'logic.jump_logic': {
            handler: function(value,old){
                for (let i = 0; i < value.length; i++){
                    let flag = false;
                    for (let j = 0; j < value[i].conditions.length; j++){
                        if (value[i].conditions[j].correspond){
                            if (value[i].conditions[j].id === this.answering){
                                flag = true
                            }
                        } else {
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        let id = value[i].target;
                        //未完待续

                    }
                }
            },
            deep: true
        },
        'logic.display_logic': {
            handler: function(value,old){
                for (let i = 0; i < value.length; i++){
                    let flag = true;
                    for (let j = 0; j < value[i].conditions.length; j++){
                        if (!value[i].conditions[j].correspond){
                            flag = false;
                            break
                        }
                    }
                    if (flag){
                        let id = value[i].target;
                        //未完待续
                        for (let j = 0; j < this.question_array.length; j++){
                            if (this.question_array[j].id === id){
                                this.question_array[j].correspond = true
                            }
                        }
                    }
                }
            },
            deep: true
        }
    }
});


export default survey