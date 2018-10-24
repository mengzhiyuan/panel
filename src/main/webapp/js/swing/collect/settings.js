import initial from "../common/initial-survey";

var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPath+projectName;

const collect = new Vue({
    el: '#settings',
    data: {
        realPath: realPath,
        usr_email: initial.usr_email,//登录邮箱
        survey_id: initial.survey_id,//问卷ID,
        questions: [],
        survey_url: 'http://www.kolpanel.net/' + initial.survey_id,
        sub_id: initial.survey_id,
        survey_number: initial.survey_number,//问卷编号
        survey_name: initial.survey_name,//问卷名称
        survey_remark: initial.survey_remark,
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
                equipment: false,     //1一台设备  0其他
                wechat: false,        //1一个微信用户  0 其他
                ip: false
            },
            display_number: false
        },
        quotas: {
            total_limit: {
                max_value:'20',
                min_value:'10'
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
        switchTo: function(status){
            this.share_status = status
        },
        switchItemType: function(event, number){
            let container = $('#configs'),
                first = $('#set_quota'),
                second = $('#set_collect'),
                third = $('#manage_links'),
                forth = $('#reward');
            switch (number){
                case 1:
                    if(!second.is(':animated')){
                        second.animate({top: '390px'},300);
                        third.animate({top: '390px'},300);
                        forth.animate({top: '390px'},300);
                    }
                    break;
                case 2:
                    if(!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '390px'},300);
                        forth.animate({top: '390px'},300);
                    }
                    break;
                case 3:
                    if(!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '0px'},300);
                        forth.animate({top: '390px'},300);
                    }
                    break;
                case 4:
                    if (!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '0px'},300);
                        forth.animate({top: '0px'},300)
                    }
            }
        },
        copyLink: function(){
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
        beforeCreateLink: function(){
            this.creating_link = !this.creating_link;
        },
        createLink: function(){
            let self = this;
            $.ajax({
                url: self.realPath + '/survey/uniqueLink',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    survey_id: self.survey_id,
                    number: self.link_number,
                }),
                async: true,
                success: function(d){
                    self.links = d;
                    self.creating_link = false
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        getLink: function(){
            let self =this;
            $.ajax({
                url: self.realPath + '/survey/listWjLinks',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    survey_id: self.survey_id,
                    usr_email: initial.usr_email
                }),
                async: true,
                success: function(d){
                    self.links = d
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        switchBool: function(key, sub_key){
            if (sub_key){
                this.restrict[key][sub_key] = !this.restrict[key][sub_key]
            } else {
                this.restrict[key] = !this.restrict[key]
            }
        },
        switchHost: function(target){
            this.email.host = target
        },
        appendQuota: function(){
            this.quotas.quota_restriction.push({
                item: {},
                item_id: '',
                selected: '',
                min: 0,
                max: 0
            })
        },
        saveQuotas: function(){

        },
        saveSettings: function(){
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
                    usr_email: initial.usr_email
                }),
                success: function(d){

                },
                error: function(e){

                }
            });
            let to_send = {
                survey_id: initial.survey_id,
                collection: [{
                    g_set_name:'total_limit',//总数限制
                    g_set_value:{
                        min_value: this.quotas.total_limit.min_value,
                        max_value: this.quotas.total_limit.min_value

                    }
                }, {
                    g_set_name:'quota_restriction',//配额限制
                    g_set_value: this.quotas.quota_restriction//值王向阳定
                }]
            };
            for (let k in this.restrict){
                to_send.collection.push({
                    g_set_name: k,
                    g_set_value: this.restrict[k]
                })
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
                    usr_email: initial.usr_email
                }),
                success: function(d){

                },
                error: function(e){

                }
            })
        }
    },
    mounted: function(){
        let self = this,
            qr = new QRCode($('#qr')[0],{width:120, height: 120}),
            text = self.survey_url;
        if (text){
            qr.makeCode(text)
        }
        self.getLink();

        $.ajax({
            url: self.realPath + '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                survey_id: initial.survey_id,
                usr_email: initial.usr_email
            }),
            success: function(d){
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
            error: function(e){

            }
        })
    },
    watch: {
        'quotas': {
            handler: function(value,old){
                for (let i = 0; i < value.length; i++){
                    if (value[i].item_id){
                        for (let j = 0; j < this.questions.length; j++){
                            if (this.questions[j].sub_id === value[i].item_id){
                                value[i].item = this.questions[j]
                            }
                        }
                    }
                }
            },
            deep: true
        }
    }
});