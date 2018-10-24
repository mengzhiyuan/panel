import initial from '../common/initial-survey.js';
import functions from '../common/functions.js';
import alerting from '../common/alerting.js';
import settings from './settings.js';

const toolbar = new Vue({
    el: '#toolbar',
    data: {
        survey_id: initial.survey_id,//问卷ID
        publish_status: initial.publish_status//问卷发布状态（是否发布）
    },
    methods: {
        togglePublish: function(){
            let result = functions.togglePublish(this.publish_status);
            if (result === this.publish_status){
                alerting.simpleAlert('网络错误，请稍后再试', '#f56c6c')
            }
        },
        editLogic: function(event,entry){
            functions.editLogic(event,workspace,entry)
        },
    }
});

export default toolbar;