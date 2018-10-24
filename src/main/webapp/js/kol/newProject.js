/**
 * Created by wangxiangyang on 2018/5/14.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const vm = new Vue({
    el: '#root',
    data: {
        inserting: false,
        creating: false,
        complete_confirm: false,
        premium_confirm: false,
        once_more: false,
        staffs: [],
        members: [],
        members_email: [],
        display_project: '',
        displaying: {
            project_number: '',//项目编号
            project_title: '',//项目主题
            project_manager: '',//项目经理
            project_members: '',//项目成员
            execution_domain: '',//执行区域
            respondent: '',//调查对象
            sample_quota: '',//样本配额
            sample_number: '',//样本数量
            sample_complete: '',//完成数量
            premium_number: '',//激励数量
            project_cycle_start: '',//项目周期-开始
            project_cycle_end: '',//项目周期-结束
            executive_cycle_start: '',//执行周期-开始
            executive_cycle_end: '',//执行周期-结束
            project_premium: '',//项目激励
            bonus_premium: '',//积分激励
            remark: ''//备注
        }
    },
    computed: {
        ended: function(){
            return this.complete_confirm && this.premium_confirm
        },
        complete_ratio: function(){
            if (this.displaying.sample_quota > 0){
                return (100 * this.displaying.sample_complete / this.displaying.sample_quota).toFixed(2)
            } else {
                return 0
            }
        },
        premium_ratio: function(){
            if (this.displaying.sample_complete > 0){
                return (100 * this.displaying.premium_number / this.displaying.sample_complete).toFixed(2)
            } else {
                return 0
            }
        }
    },
    watch: {
        'displaying.project_cycle_start': function(v,o){
            this.isBigger(v,this.displaying.project_cycle_end) === 'bigger' &&
            (this.displaying.project_cycle_start = o, simpleAlert('初始时间应小于结束时间', '#f56c6c'))
        },
        'displaying.project_cycle_end': function(v,o){
            this.isBigger(this.displaying.project_cycle_start,v) === 'bigger' &&
            (this.displaying.project_cycle_end = o, simpleAlert('结束时间应大于初始时间', '#f56c6c'))
        },
        'displaying.executive_cycle_start': function(v,o){
            this.isBigger(v,this.displaying.executive_cycle_end) === 'bigger' &&
            (this.displaying.executive_cycle_start = o, simpleAlert('初始时间应小于结束时间', '#f56c6c'))
        },
        'displaying.executive_cycle_end': function(v,o){
            this.isBigger(this.displaying.executive_cycle_start,v) === 'bigger' &&
            (this.displaying.executive_cycle_end = o, simpleAlert('结束时间应大于初始时间', '#f56c6c'))
        }
    },
    beforeCreate: function(){
        this.alert = new BranchAlert({
            title: '是否发放激励',
            left: 'save_premium',
            right: 'save_finish',
            left_text: '是',
            right_text: '否'
        })
    },
    methods: {
        queryProject: function(e){
            if (e.keyCode === 13){
                if (this.display_project){
                    this.queryExecute(true);
                    this.creating = true
                }
            }
        },
        queryExecute: function(v){
            let self = this,
                param = {},
                url = v ? 'retrieveTheProject' : 'proUpdatelist';
            param[v ? 'kNumber' : 'kId'] = self.display_project;
            $.ajax({
                url: realPath + '/management/' + url,
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(param),
                success: function(d){
                    let data = d[0].result[0],
                        time1 = data.kReleaseTime || data.proTime[0].starTime,
                        time2 = data.kEndTime || data.proTime[data.proTime.length-1].endTime,
                        time3 = data.kPerformStartTime || '',
                        time4 = data.kPerformEndTime || '';

                    self.members_email = data.kEmail ? data.kEmail.split(',') : [JSON.parse(sessionStorage.getItem('sysUser')).email];
                    for (let i = 0; i < self.members_email.length; i++){
                        if (self.staffs.length){
                            for (let j = 0; j < self.staffs.length; j++){
                                if (self.staffs[j].staEmail === self.members_email[i]){
                                    self.members.push(self.staffs[j])
                                }
                            }
                        } else {
                            simpleAlert('员工列表尚未加载完成,请稍候')
                        }
                    }

                    self.displaying.k_id = data.kId || '';
                    self.display_project = self.displaying.project_number = data.kNumber || data.proNumber;
                    self.displaying.project_title = data.kTheme || data.proName;
                    self.displaying.project_manager_id = data.staId || '';
                    self.displaying.project_manager = data.staName;
                    self.displaying.project_members = data.kMembers;

                    self.displaying.execution_domain = data.kArea || data.city;
                    self.displaying.respondent = data.kRespondents || data.audienceOrRespondent;
                    self.displaying.sample_quota = data.kSampleSize;
                    self.displaying.sample_number = data.kSampleNumber;
                    //self.displaying.premium_number = data. ||;//----------------------------------------------------------
                    self.displaying.project_cycle_start = (time1.year + 1900) + '-' + (time1.month + 1) + '-' + time1.date;
                    self.displaying.project_cycle_end = (time2.year + 1900) + '-' + (time2.month + 1) + '-' + time2.date;

                    self.displaying.project_premium = data.kProjectIncentive || '';
                    self.displaying.bonus_premium = data.kIntegralIncentives || '';
                    self.displaying.executive_cycle_start = time3 && (time3.year + 1900) + '-' + (time3.month + 1) + '-' + time3.date;
                    self.displaying.executive_cycle_end = time4 && (time4.year + 1900) + '-' + (time4.month + 1) + '-' + time4.date;

                    self.displaying.remark = data.kRemark || '';
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        beforeInsertMember: function(e){
            e.stopPropagation();
            this.inserting = !this.inserting
        },
        insertMember: function(st){
            this.members.push(st);
            this.members_email.push(st.staEmail);
            this.concealOption()
        },
        removeMember: function(m){
            let email = m.staEmail;
            this.members_email.splice(this.members.indexOf(email), 1);
            for (let i = 0; i < this.members.length; i++){
                if (this.members[i].staEmail === email){
                    this.members.splice(i, 1)
                }
            }
        },
        concealOption: function(){
            this.inserting = false
        },
        getValue: function(v){

            if (v){
                return {
                    year: v.match(/^(\d+)\-/) ? parseInt(v.match(/^(\d+)\-/)[1]) : 0,
                    month: v.match(/\-(\d+)\-/) ? parseInt(v.match(/\-(\d+)\-/)[1]) : 0,
                    date: v.match(/\-(\d+)$/) ? parseInt(v.match(/\-(\d+)$/)[1]) : 0
                }
            } else {
                return null
            }
        },
        isBigger: function(t,o){
            if (!t || !o) {
                return 'blank'
            } else if (this.getValue(t).year >= this.getValue(o).year && this.getValue(t).month >= this.getValue(o).month && this.getValue(t).date >= this.getValue(o).date){
                return 'bigger'
            } else {
                return 'smaller'
            }
        },
        save_finish: function(){
            $.ajax({
                url: realPath + '/management/staCompletion',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    kId: this.displaying.k_id,
                    kStatus: '已经完成'
                }),
                success: function(d){
                    let data = d[0].result;
                    if (data){
                        simpleAlert('操作成功', '#00db00');
                        setTimeout(function(){
                            document.location.href = './projectManage.html'
                        },500)
                    } else {
                        simpleAlert('操作失败', '#f56c6c')
                    }
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        save_premium: function(){
            let self = this;
            $.ajax({
                url: realPath + '/management/staCompletion',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    kId: self.displaying.k_id,
                    kStatus: '项目激励'
                }),
                success: function(d){
                    let data = d[0].result;
                    if (data){
                        simpleAlert('操作成功', '#00db00');
                        setTimeout(function(){
                            sessionStorage.setItem('premium_k_id',self.displaying.k_id);
                            document.location.href = './grantPremium.html'
                        },500)
                    } else {
                        simpleAlert('操作失败', '#f56c6c')
                    }
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        beforeClose: function(){
            let self = this;
            $.ajax({
                url: realPath + '/management/closeInquiry',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    kId: self.displaying.k_id
                }),
                async: true,
                success: function(d){
                    self.displaying.sample_complete = d[0].completion;
                    self.displaying.premium_number = d[0].incentive;
                    self.displaying.sample_number = d[0].kRecruitmentNumber;
                    self.displaying.sample_quota = d[0].kSampleNumber
                },
                error: function(e){
                    simpleAlert('请求失败', '#f56c6c')
                }
            })
        },
        changeToggle: function(v){
            this.once_more = v
        },
        save_close: function(){
            $.ajax({
                url: realPath + '/management/close',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    kId: this.displaying.k_id,
                    kStatus: '项目关闭',
                    kSleep: (this.once_more === true ? 1 : 0)
                }),
                success: function(d){
                    let data = d[0].result;
                    if (data){
                        simpleAlert('操作成功', '#00db00');
                        setTimeout(function(){
                            document.location.href = './projectManage.html'
                        },500)
                    } else {
                        simpleAlert('操作失败', '#f56c6c')
                    }
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        save: function(status){
            let self = this,
                displaying = self.displaying,
                to_new = {};

            to_new.kId = displaying.k_id;

            to_new.kStatus = status;

            if (status === '已经完成') {
                this.alert.branchAlter();
                return
            } else if (status === '项目激励') {
                self.save_premium();
                return
            } else if (status === '项目关闭') {
                self.save_close();
                return
            }

            to_new.kNumber = displaying.project_number;
            to_new.kTheme = displaying.project_title;
            to_new.kManager = displaying.project_manager_id;
            to_new.email = self.members_email.join(',');

            to_new.kArea = displaying.execution_domain;
            to_new.kRespondents = displaying.respondent;
            to_new.kSampleSize = displaying.sample_quota;
            to_new.kReleaseTime = displaying.project_cycle_start;
            to_new.kEndTime = displaying.project_cycle_end;


            to_new.kProjectIncentive = displaying.project_premium;
            to_new.kIntegralIncentives = displaying.bonus_premium;
            to_new.kSampleNumber = displaying.sample_number;
            to_new.kPerformStartTime = displaying.executive_cycle_start;
            to_new.kPerformEndTime = displaying.executive_cycle_end;

            to_new.kRemark = displaying.remark;

            $.ajax({
                url: realPath + '/management/proAddOrUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(to_new),
                success: function(d){
                    let data = d[0].result,
                        data1 = d[0].result1;
                    if (data >= 1 || data1==1){
                        //e.preventDefault();
                        //e.stopPropagation();
                        let warning = $(`<div class="email-warning" style="position: fixed;
                        							left:`+ ($(window).width()/2-25 + 'px') +`;
                        							top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #00db00;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            保存成功
                        </div>`);
                        $('#root').append(warning);
                        warning.show();
                            //.on('click',function(){
                            //    warning.fadeOut(750);
                            //    setTimeout(function(){
                            //        warning.remove()
                            //    },750)
                            //})
                        if (status === '正在进行'){
                            sessionStorage.setItem('k_id', data ? data:  self.displaying.k_id);
                            document.location.href = './sampling.html';
                        } else {
                            document.location.href = './projectManage.html'
                        }
                    } else {
                        //e.preventDefault();
                        //e.stopPropagation();
                        let warning = $(`<div class="email-warning" style="position: fixed;
                        							left:`+ ($(window).width()/2-25 + 'px') +`;
                        							top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            保存失败
                        </div>`);
                        $('#root').append(warning);
                        warning.fadeIn()
                            .on('click',function(){
                                warning.fadeOut(1500);
                                setTimeout(function(){
                                    warning.remove()
                                },750)
                            })
                    }
                },
                error: function(e){
                    console.log(e)
                }
            })
        }
    },
    mounted: function(){

        let self = this;

        //try {
            $.ajax({
                url: realPath + '/setUpProject/init',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: false,
                success: function(d){
                    self.staffs = d[0].jfcStaff
                },
                error: function(e){
                    console.error(e)
                }
            });
        //} catch (e) {}

        if (sessionStorage.getItem('project_id')){
            let project_id = sessionStorage.getItem('project_id');
            $(window).on('unload', function(){
                sessionStorage.removeItem('project_id')
            });
            this.display_project = project_id;
            this.queryExecute(false)
        }

        laydate.render({
            elem: '#project_cycle_start',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.displaying.project_cycle_start = value;
            }
        });
        laydate.render({
            elem: '#project_cycle_end',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.displaying.project_cycle_end = value;
            }
        });
        laydate.render({
            elem: '#executive_cycle_start',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.displaying.executive_cycle_start = value;
            }
        });
        laydate.render({
            elem: '#executive_cycle_end',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.displaying.executive_cycle_end = value;
            }
        });
    }
});