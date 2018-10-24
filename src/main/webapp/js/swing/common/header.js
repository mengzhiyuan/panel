import initial from './initial-survey.js';
import functions from './functions.js';
import alerting from './alerting.js';

const header = new Vue({
    el: '#header',
    data: {
        active_step: 'design',//当前步骤
        survey_id: initial.survey_id,//问卷ID
        survey_number: initial.survey_number,//问卷编号
        survey_name: initial.survey_name,//问卷名称
        saved_name: initial.survey_name,//储存的问卷名称
        inputting: false,//问卷名是否处于编辑状态
    },
    methods: {
        goHome: function(){

        },
        goDesign: function(){

        },
        goCollect: function(){

        },
        goStatistics: function(){

        },
        editSurveyName: function(event){
            let parent = $(event.target).parent();
            this.inputting = true;
            this.saved_name = this.survey_name;
            setTimeout(function(){
                parent.find('.edit').focus()
            },0)
        },
        presentSurveyName: function(event){
            if (event.keyCode === 13){
                this.inputting = false;
                if (this.survey_name !== this.saved_name){
                    let result = functions.changeSurveyName(this.survey_id,this.survey_name);
                    if (result){
                        this.saved_name = this.survey_name;
                    } else {
                        this.survey_name = this.saved_name;
                        alerting.simpleAlert('网络错误，请稍后再试', '#f56c6c')
                    }
                }
            }
        }
    }
});

export default header;