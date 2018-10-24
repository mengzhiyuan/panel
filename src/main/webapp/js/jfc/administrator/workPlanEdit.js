/**
 *
 * Created by wangxiangyang on 2018/1/22.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(window).on('unload', function(){
	sessionStorage.removeItem('planId');
})

var tableData = {
    plan_id: '',
    sta_email: sessionStorage.getItem('sysUser') ? JSON.parse(sessionStorage.getItem('sysUser')).email : '',
    plan_title: '',
    plan_type: '',
    plan_date: '',
    plan_list: [
        {
            id: 1,
            content: '',
            related_event: '',
            status: '',
            reasons: '',
            review: ''
        }
    ],
    plan_start: '',
    plan_end: '',
    plan_bell: '',
    supervise: '',
    share: ''
},
    methods = {
        addPlan: function(plan){
            this.plan_list.splice(this.plan_list.indexOf(plan) + 1, 0, {
                id: 1,
                content: '',
                related_event: '',
                status: '',
                reasons: '',
                review: ''
            })
        },
        removePlan: function(plan){
            if (this.plan_list.length > 1){
                this.plan_list.splice(this.plan_list.indexOf(plan), 1)
            }
        },
        relateEvent: function(plan){
            plan.related_event = '某事件'
        },
        savePlan: function(event){
            $.ajax({
                url: realPath + '/work/addWork',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(this.$data),
                success: function(d){
                    if (d[0].result > 0){
                        alert('保存成功。');
                        document.location.href = './workPlanList.html'
                    } else {
                        alert('保存失败。')
                    }
                },
                error: function(e){
                    alert('操作失败。')
                }
            })
        }
    },
    tableVm = new Vue({
        el: '#root',
        data: tableData,
        methods: methods,
        mounted: function(){

            laydate.render({
                elem: '#plan_date',
                type: 'datetime'
            });
            laydate.render({
                elem: '#plan_start',
                type: 'datetime'
            });
            laydate.render({
                elem: '#plan_end',
                type: 'datetime'
            });

            var self = this,
                timeUpdater = setInterval(function(){
                    self.plan_date = $('#plan_date').val();
                    self.plan_start = $('#plan_start').val();
                    self.plan_end = $('#plan_end').val();
                },1000);

            $.ajax({
                url: realPath + '/work/workList',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    plan_id: sessionStorage.getItem('planId') || ''
                }),
                success: function(d){
                    if (d[0]){
                    	
                    	function timeString(time){
                            if (time){
                                var string = '';
                                string += (time.year + 1900)
                                    + '-' + (time.month + 1)
                                    + '-' + time.date
                                    + ' ' + time.hours
                                    + ':' + time.minutes
                                    + ':' + time.seconds;
                                return string;
                            } else {
                                return undefined
                            }
                        }

                        var staffList = d[0].staffList,
                            ops = ``;

                        for (let i = 0; i < staffList.length; i++){
                            ops += `<option value="`+ staffList[i].staId +`">`+ staffList[i].staName +`</option>`
                        }

                        $('#supervise').append(ops);
                        $('#share').append(ops);
                        $('.selectpicker').selectpicker('refresh')
                            .on('changed.bs.select', function(event){
                                switch ($(event.currentTarget).attr('id')){
                                    case 'supervise':
                                        self.supervise = $(event.currentTarget).val();
                                        $('#supervise').selectpicker('refresh');
                                        break;
                                    case 'share':
                                        self.share = $(event.currentTarget).val();
                                        $('#share').selectpicker('refresh');
                                        break;
                                    default:
                                        break;
                                }
                            });
                        
                        if (d[0].result.length == 0){
                        	return
                        }
                            
                        var plan = d[0].result[0],
                        	contentList = plan.workContent;
                        
                        function updateData(data,plan){
                        	data.plan_id = plan.worId;
                        	data.sta_email = plan.worStaEmail;
                        	data.plan_title = plan.worName;
                        	data.plan_type = plan.worType;
                        	data.plan_date = timeString(plan.createTime);
                        	data.plan_list = [];
                        	data.plan_start = timeString(plan.worCreateTime);
                        	data.plan_end = timeString(plan.worEndTime);
                        	data.plan_bell = plan.worStatus;
                        	data.supervise = plan.worSupervisor;
                        	data.share = plan.worShare;
                        	
                        	for (let i = 0; i < plan.workContent.length; i++){
                        		data.plan_list.push({
                        			id: plan.workContent[i].contId,
                    	            content: plan.workContent[i].contContent,
                    	            related_event: plan.workContent[i].contEnevt,
                    	            status: plan.workContent[i].contComplete,
                    	            reasons: plan.workContent[i].contReason,
                    	            review: plan.workContent[i].contExperience
                        		})
                        	}
                        }
                        
                        updateData(tableData,plan);

                    } else {
                        console.log(d[0])
                    }
                },
                error: function(e){
                    console.log(e)
                }
            })
        }
    });