/**
 * Created by wangxiangyang on 2018/3/6.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const project_data = {
    period: '',
    to_approve: {number: 0, link: ''},
    approved: {number: 0, link: ''},
    to_set: {number: 0, link: ''},
    already_set: {number: 0, link: ''},
    executing: {number: 0, link: ''},
    to_close: {number: 0, link: ''},
    already_close: {number: 0, link: ''},
    list: [
        {
            id: '',
            number: '',
            name: '',
            status: '',
            manager: '',
            department: '',
            client: '',
            contact: '',
            area: '',
            start: '',
            end: '',
            sample: '',
            progress: '',
            remark1: '',
            budget: '',
            completed: '',
            fee: '',
            quality: '',
            cooperator: '',
            remark2: ''
        }
    ],
    staff_list: [],
    alerting_quotation: {
        id: '',
        taskId: '',
        staff: '',
        client: '',
        amount: ''
    },
    alerting_setup: {
        id: '',
        taskId: '',
        staff: ''
    },
    alerting_number: {
        quoId: '',
        proId: '',
        taskId: '',
        project_number: '',
        staff: ''
    },
    alerting_budget: {
        infoId: '',
        proId: '',
        taskId: '',
        staffs: '',
        staff: '',
    },
    alerting_append: {
        taskId: '',
        staff: ''
    },
    alerting_final: {
        proId: '',
        taskId: '',
        staff: ''
    },
    alerting_close: {
        taskId: '',
        staff: ''
    }
};
const project_methods = {
    search: function(){
        let self = this;
//        try{
            $.ajax({
                url: realPath + '/workflow/startProjectInit',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName
                }),
                async: false,
                success: function(data){
                    let list = data[0].projectHome,
                        jfc = data[0].jfc,
                        numbers = data[0].ma,
                        to_approve = 0,
                        approved = 0,
                        to_set = 0,
                        already_set = 0,
                        executing,
                        to_close = 0,
                        already_close = 0,
                        arr = [],
                        ln = list.length,
                        i;
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
                   /* for (let n = 0; n < numbers.length; n++){
                        switch(numbers[n].status){
                            //case '':
                            //    break;
                            //case '':
                            //    break;
                            case '报价':
                                to_set += 1;
                                break;
                            case '立项':
                                already_set += 1;
                                break;
                            case '决算':
                                to_close += 1;
                                break;
                            case '结项':
                                already_close += 1;
                                break;
                            //case '':
                            //    break;
                        }
                    }*/
                  /*  executing = numbers.length;
                    self.to_set.number = to_set;
                    self.already_set.number = already_set;
                    self.to_close.number = to_close;
                    self.already_close.number = already_close;
                    self.executing.number = executing;*/
                    for (i = 0; i < ln; i++){
                        let newObj = {
                            id: list[i].quoId,
                            proId: list[i].proId || '',
                            infoId: list[i].infoId,
                            number: list[i].proNumber,
                            name: list[i].proName,
                            //manager: list[i].staId,
                            client: list[i].comName,
                            contact: list[i].liaName,
                            area: list[i].city,
                            progress: list[i].greProgress,
                            remark1: list[i].greRemark,
                            budget: list[i].infoBudgetaryCost,
                            completed: list[i].infoSumMoney,
                            fee: '',
                            quality: list[i].proQC,
                            cooperator: list[i].greBusiness || ''
                        };
                        for(var m=0;i<jfc.length;m++){
                        	if(list[i].staId===""){
                        		break;
                        	}
                        	if(parseInt(list[i].staId)===jfc[m].staId){
                        		newObj.manager=jfc[m].staName;
                        		break;
                        	}
                        }
                        try {
                        	newObj.start = timeString(list[i].proTime[0].starTime);
                            newObj.end = timeString(list[i].proTime[list[i].proTime.length - 1].endTime);
                        } catch (e){}
                        try {
                            let sample = parseInt(list[i].infoSample[0].budget),
                                supplementary = list[i].infoSample[0].supplementarySample;
                            for (let v = 0; v < supplementary.length; v++){
                                sample += (supplementary[v].supplementary || 0)
                            }
                            newObj.sample = sample
                        } catch (e) {}
                        for (let j = 0; j < numbers.length; j++){
                            if (numbers[j].quoId === newObj.id){
                                newObj.status = numbers[j].status;
                                newObj.taskId = numbers[j].taskId;
                                break;
                            }
                        }
                        arr.push(newObj);
                    }
                    self.list = arr;
                },
                error: function(e){}
            });
//        }catch(e){}
    },
    controlIt: function(li,e){
        let self = this;
 
        if (li.status === '待立项'){//----------------------------------如果在立项状态,则看有没有proId,如没有则中转立项页面进行编辑,如有则直接审核
        	sessionStorage.setItem('taskId', li.taskId);
        	sessionStorage.setItem('quoId', li.id);
        	window.location.href = './setUpProject.html'
        
        } else if (li.status === '批复编号'){//---------------------------------批复编号
            self.alerting_number.quoId = li.id;
            self.alerting_number.proId = li.proId;
            self.alerting_number.taskId = li.taskId;
            self.alerting_number.staff = li.manager;
        } else if (li.status === '预算'){
        	 sessionStorage.setItem('proId', li.proId);
             sessionStorage.setItem('quoId', li.id);
             sessionStorage.setItem('taskId', li.taskId);
             window.location.href = './budgetBook.html'
        } else if (li.status === '申请费用'){
        	  self.alerting_budget.infoId = li.infoId;
              self.alerting_budget.taskId = li.taskId;
              self.alerting_budget.staffs = li.manager;
           /* self.alerting_append.taskId = li.taskId;
            if (li.infoId){
                $.ajax({
                    url: realPath + '/quote/init',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    success: function(data){
                        let arr = [{staId: '请指定员工', staName: '请指定员工'}],
                            list = data[0].jfcStaff,
                            len = list.length,
                            i;
                        for (i = 0; i < len; i++){
                            arr.push({staId: list[i].staName, staName: list[i].staName})
                        }
                        self.staff_list = arr
                    },
                    error: function(e){
                        console.log(e)
                    }
                })
            } else {
                sessionStorage.setItem('proId', li.proId);
                sessionStorage.setItem('quoId', li.id);
                window.location.href = './budgetBook.html'
            }*/
        }else if (li.status === '预算审批'){
            self.alerting_budget.infoId = li.infoId;
            self.alerting_budget.taskId = li.taskId;
            self.alerting_budget.staffs = li.manager;
        	/* infoId: self['alerting_budget'].infoId,
             taskId: self['alerting_budget'].taskId,
             nominee: self['alerting_budget'].staff,
             sp_remark:$(sp_remark).val(),
             outcome: outcome*/
        }  else if (li.status === '决算'){
            self.alerting_final.quoId = li.id;
            self.alerting_final.proId = li.proId;
            self.alerting_final.taskId = li.taskId;
            $.ajax({
                url: realPath + '/quote/init',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                success: function(data){
                    let arr = [{staId: '请指定员工', staName: '请指定员工'}],
                        list = data[0].jfcStaff,
                        len = list.length,
                        i;
                    for (i = 0; i < len; i++){
                        arr.push({staId: list[i].staName, staName: list[i].staName})
                    }
                    self.staff_list = arr
                },
                error: function(e){
                    console.log(e)
                }
            })
        } else if (li.status === '结项'){
            self.alerting_close.taskId = li.taskId;
            $.ajax({
                url: realPath + '/quote/init',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                success: function(data){
                    let arr = [{staId: '请指定员工', staName: '请指定员工'}],
                        list = data[0].jfcStaff,
                        len = list.length,
                        i;
                    for (i = 0; i < len; i++){
                        arr.push({staId: list[i].staName, staName: list[i].staName})
                    }
                    self.staff_list = arr
                },
                error: function(e){
                    console.log(e)
                }
            })
        }
        return false
    },
    actionQuotation: function(outcome){
        let self = this,
            to_send = {
                proId: self['alerting_quotation'].id,
                taskId: self['alerting_quotation'].taskId,
                nominee: self['alerting_quotation'].staff,//指定人员,缺少select
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作未成功。')
                }
            },
            error: function(e){
                alert('网络连接问题。')
            }
        })
    },
    actionSetup: function(outcome){
        let self = this,
            to_send = {
                proId: self['alerting_setup'].proId,
                taskId: self['alerting_setup'].taskId,
                nominee: self['alerting_setup'].staff,
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    },
    actionNumber: function(outcome){
        let self = this,
            to_send = {
                status: '批复编号',
                pId: self['alerting_number'].proId,
                //proId: self['alerting_number'].quoId,
                taskId: self['alerting_number'].taskId,
                project_number: self['alerting_number'].project_number,
                nominee: self['alerting_number'].staff,
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }else{
                	window.location.href = './projectHome.html'
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    },
    actionBudget: function(outcome){
        let self = this,
            to_send = {
                infoId: self['alerting_budget'].infoId,
                taskId: self['alerting_budget'].taskId,
                nominee:self['alerting_budget'].staff,
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    },
    actionBudgetSQ: function(outcome){
        let self = this,
        to_send = {
    		infoId: self['alerting_budget'].infoId,
            taskId: self['alerting_budget'].taskId,
            nominee: self['alerting_budget'].staffs,
            outcome: outcome
        };
	    $.ajax({
	        url: realPath + '/workflow/submitTask',
	        type: 'post',
	        contentType: 'application/json;charset=utf-8',
	        dataType: 'json',
	        data: JSON.stringify(to_send),
	        async: true,
	        success: function(data){
	            if (data[0].result <= 0){
	                alert('操作失败')
	            }else{
	            	//sessionStorage.setItem("proId", row.proId);
	            	window.location.href = './projectHome.html'
	            }
	        },
	        error: function(e){
	            alert('网络问题')
	        }
	    })
	},
    actionBudgetSP: function(outcome){
        let self = this,
            to_send = {
        		infoId: self['alerting_budget'].infoId,
                taskId: self['alerting_budget'].taskId,
                nominee: self['alerting_budget'].staffs,
                sp_remark:$("#sp_remark").val(),
                status:"预算审批",
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }else{
                	window.location.href = './projectHome.html'
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    },
    actionAppend: function(outcome){
        let self = this,
            to_send = {
                taskId: self['alerting_append'].taskId,
                nominee: self['alerting_append'].staff,
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }else{
                	window.location.href = './projectHome.html'
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    },
    actionFinal: function(outcome){
        let self = this,
            to_send = {
                proId: self['alerting_final'].proId,
                taskId: self['alerting_final'].taskId,
                nominee: self['alerting_final'].staff,
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    },
    actionClose: function(outcome){
        let self = this,
            to_send = {
                taskId: self['alerting_close'].taskId,
                nominee: self['alerting_close'].staff,
                outcome: outcome
            };
        $.ajax({
            url: realPath + '/workflow/submitTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result <= 0){
                    alert('操作失败')
                }
            },
            error: function(e){
                alert('网络问题')
            }
        })
    }
};
const project_created = function(){
    this.search();
};
const project_vm = new Vue({
    el: '#root',
    data: project_data,
    methods: project_methods,
    created: project_created
});