/**
 * Created by wangxiangyang on 2018/3/2.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const timer = setInterval(function(){
    let now = new Date();
        try{

            let my_attendance = data.my_attendance,
                year = now.getFullYear(),
                month = now.getMonth(),
                date = now.getDate(),
                hour = now.getHours(),
                minute = now.getMinutes(),
                second = now.getSeconds(),
                day = now.getDay();

            my_attendance.year = year;
            my_attendance.month = month;
            my_attendance.date = date;
            my_attendance.hour = hour;
            my_attendance.minute = minute;
            my_attendance.second = second;
            my_attendance.day = day;

            switch (day){
                case 1:
                    day = '一';
                    break;
                case 2:
                    day = '二';
                    break;
                case 3:
                    day = '三';
                    break;
                case 4:
                    day = '四';
                    break;
                case 5:
                    day = '五';
                    break;
                case 6:
                    day = '六';
                    break;
                case 7:
                    day = '七';
                    break;
            }

          /*  if (my_attendance.status === 0){
                if (hour < 9){
                    my_attendance.current = 0;
                    my_attendance['clock_in'].punctual = true;//须优化
                    let earlier = my_attendance['clock_in'].earlier;
                    earlier.hours = 9 - hour;
                    earlier.minutes = 60 - minute;
                    earlier.seconds = 60 - second;
                } else {
                    my_attendance.current = 1;
                    my_attendance['clock_in'].punctual = false;//须优化
                    let later = my_attendance['clock_in'].later;
                    later.hours = hour - 9;
                    later.minutes = minute;
                    later.seconds = second;
                }
            } else if (my_attendance.status === 1){
                let working_hours = my_attendance.working_hours,
                    clock_in = my_attendance.clock_in;
                working_hours.hours = hour - clock_in.hour;
                working_hours.minutes = minute - clock_in.minute;
                working_hours.seconds = second - clock_in.second;
                if (hour < 18){
                    my_attendance.current = 2;
                    let earlier = my_attendance['clock_out'].earlier;
                    earlier.hours = (18 - hour) - 1;
                    earlier.minutes = 60 - minute;
                    earlier.seconds = 60 - second;
                } else if (hour < 19) {
                    my_attendance.current = 3;
                    let later = my_attendance['clock_out'].later;
                    later.minutes = minute;
                    later.seconds = second;
                } else {
                    my_attendance.current = 4;
                    let clock_out = my_attendance.clock_out,
                        extra = my_attendance['clock_out'].extra;
                    clock_out.overtime = true;
                    extra.hours = hour - 19;
                    extra.minutes = minute;
                    extra.seconds = second;
                }
            } else {
                my_attendance.current = 5
            }*/
        }catch(e){}
},50),
    data = {
        my_attendance: {
            status: 0,//0=未打卡;1=已签到;2=已签退
            current: 0,//0=休息时间;1=已迟到;2=已开工;3=已下班;4=正在加班;5=已休息
            getoff:0,
            button: '签到',
            year: 0,
            month: 0,
            data: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
            clock_in: {
                year: 0,
                month: 0,
                data: 0,
                hour: 0,
                minute: 0,
                second: 0,
                punctual: true,
                earlier: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },
                later: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            },
            working_hours: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            clock_out: {
                year: 0,
                month: 0,
                data: 0,
                hour: 0,
                minute: 0,
                second: 0,
                punctual: false,
                overtime: false,
                earlier: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },
                later: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },
                extra: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            }
        },
        my_follow: [{title: '', link: ''},{title: '', link: ''}],
        followedTitle: ['',''],
        to_follow: [{title: '', link: ''},{title: '', link: ''},{title: '', link: ''}],
        my_project: {
            to_approve: {number: 0, link: ''},
            approved: {number: 0, link: ''},
            to_set: {number: 0, link: ''},
            already_set: {number: 0, link: ''},
            executing: {number: 0, link: ''},
            to_close: {number: 0, link: ''},
            already_close: {number: 0, link: ''},
            list: ''
        },
        my_finance: {
            applied: {number: 0, link: ''},
            replied: {number: 0, link: ''},
            already_paid: {number: 0, link: ''},
            to_pay: {number: 0, link: ''},
            gap: {number: 0, link: ''},
            list: ''
        },
        my_to_do: [{title: '', link: ''}]
    },
    methods = {
	 changeChecked: function(fo){
	        if (this.followedTitle.indexOf(fo.title) === -1){
	            this.followedTitle.push(fo.title)
	        } else {
	            this.followedTitle.splice(this.followedTitle.indexOf(fo.title), 1)
	        }
	    },
	 save: function(){
	        let to_send = {
	            menStaId: JSON.parse(sessionStorage.getItem('sysUser')).id,
	            checked: []
	        },
	            links = this.to_follow,
	            l = links.length,
	            i;
	        for (i = 0; i < l; i++){
	            if (this.followedTitle.indexOf(links[i].title) > -1){
	                to_send.checked.push(  {
	                    menName: links[i].title,//
	                    menUrl: links[i].link,//
	                    menStaId:  JSON.parse(sessionStorage.getItem('sysUser')).id,//
	                    menImg: ''//
	                })
	            }
	        }
	        $.ajax({
	            url: realPath + '/adminHome/adminHomeSaveOrUpdate',
	            type: 'post',
	            contentType: 'application/json;charset=utf-8',
	            dataType: 'json',
	            async: true,
	            data: JSON.stringify(to_send),
	            success: function(data){
	            	window.location.href= realPath+'/html/jfc/main/center.html';
	            },
	            error: function(e){}
	        })
	    },
	beforeAppend: function(){
        let self = this;
        $.ajax({
            url: realPath + '/system/allLevelMenu',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
            	email: JSON.parse(sessionStorage.getItem('sysUser')).email
            }),
            success: function(data){
                let d = data[0].allMenuList,
                    arr = [],
                    staId = JSON.parse(sessionStorage.getItem('sysUser')).id;
                for (var i = 0, l = d.length; i < l; i++){
                    arr.push({
                        title: d[i].menuName,//
                        link: d[i].dataUrl//
                    })
                }
                self.to_follow = arr;
               
            },
            error: function(e){
                console.log(e)
            }
        })
    },
        punch: function(){//打卡
        	var temp = {};
        	temp.email = JSON.parse(sessionStorage.getItem('sysUser')).email;
        	$.ajax({
        		type : "post",
        		url : "" + realPath + "/home/signIn",
        		dataType : 'json',
        		async : true,
        		data : JSON.stringify(temp),
        		contentType : "application/JSON;charset=utf-8",
        		success : function(data) {
        			var d= data[0]['result'];
        			if(d>0){
        				window.location.href= realPath+'/html/jfc/main/center.html';
        			}
        			
        		}
        	});
         
        },
    },
    created = function(){
	 let my_attendance = this.my_attendance;
	 let self = this;
        try {
            $.ajax({
                url: realPath + '/home/init',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                async: true,
                data: JSON.stringify({
                    email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                    id: JSON.parse(sessionStorage.getItem('sysUser')).id,
                    nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName
                }),
                success: function(data){
                    let d = data;
                    if(d[0]["staff"].length>0){
                    	$("#fdiv").hide();
                    }
                    /*签-----------------------------------------------------------------到*/
                    if(d[0]['signIn'].size==0){
                    	my_attendance.current = 0;
                    }else if(d[0]['signIn'].length==1){
                    	if(d[0]['signIn'][0].attTime.hours-8>0){
                    		my_attendance.current = 1;
                            my_attendance.button = '下班';
                    		my_attendance.clock_in.later.hours = d[0]['signIn'][0].attTime.hours-8;
                    		my_attendance.clock_in.later.minutes = d[0]['signIn'][0].attTime.minutes;
                    		my_attendance.clock_in.later.seconds = d[0]['signIn'][0].attTime.seconds;
                    	}else{
                    		my_attendance.current = 2;
                    	}
                    }else if(d[0]['signIn'].length==2){
                    	my_attendance.status = 1;
                    	if(d[0]['signIn'][0].attTime.hours-8>0){
                    		my_attendance.current = 1;
                    		my_attendance.clock_in.later.hours = d[0]['signIn'][0].attTime.hours-8;
                    		my_attendance.clock_in.later.minutes = d[0]['signIn'][0].attTime.minutes;
                    		my_attendance.clock_in.later.seconds = d[0]['signIn'][0].attTime.seconds;
                    	}else{
                    		my_attendance.current = 2;
                    	}
                    	
                    	if(d[0]['signIn'][1].attTime.hours-19>0){
                    		my_attendance.getoff = 4;
                    		my_attendance.clock_out.extra.hours = d[0]['signIn'][1].attTime.hours-19;
                    		my_attendance.clock_out.extra.minutes = d[0]['signIn'][1].attTime.minutes;
                    		my_attendance.clock_out.extra.seconds = d[0]['signIn'][1].attTime.seconds;
                    	}else if(d[0]['signIn'][1].attTime.hours-18>0&&d[0]['signIn'][1].attTime.hours-19<0){
                    		my_attendance.getoff = 5;
                    	}else{
                    		my_attendance.getoff = 3;
                    		 my_attendance.clock_out.earlier.hours =18- d[0]['signIn'][1].attTime.hours;
                    		 my_attendance.clock_out.earlier.minutes = d[0]['signIn'][1].attTime.minutes;
                    		 my_attendance.clock_out.earlier.seconds = d[0]['signIn'][1].attTime.seconds;
                    	}
                    }
                    /*我的     ================================================关注*/
                    var followList = d[0]["followList"];
                    if(followList.length>0){
                    	var title = [];
                    	var my = [];
                    	for(var i=0;i<followList.length;i++){
                    		title.push(followList[i].menName);
                    		my.push({title: followList[i].menName, link: followList[i].menUrl});
                        }
                    }else{
                    	title = [''];
                    	my = [{title: '', link: ''}];
                    }
                    self.followedTitle = title;
                    self.my_follow = my;
                    /*我的     ================================================项目*/
                /*    my_project: {
                        to_approve: {number: 0, link: ''},报价[   
                        approved: {number: 0, link: ''},立项
                        to_set: {number: 0, link: ''},批复编号
                        already_set: {number: 0, link: ''},预算
                        executing: {number: 0, link: ''},追加预算
                        to_close: {number: 0, link: ''},决算
                        already_close: {number: 0, link: ''},结项
                        list: ''
                    }
                     my_finance: {
			            applied: {number: 0, link: ''},申请
			            replied: {number: 0, link: ''},批复
			            already_paid: {number: 0, link: ''},支付
			            to_pay: {number: 0, link: ''},待支付
			            gap: {number: 0, link: ''},
			            list: ''
			        },
			                    */
                   
                    var task = d[0]["task"];
                    /**设置**/
                    var to_approve = 0 ;
                    var approved = 0;
                    var to_set = 0;
                    var already_set = 0;
                    var executing = 0 ;
                    var to_close = 0;
                    var already_close = 0;
                    //财务
                    var applied = 0;
                    var replied = 0;
                    var already_paid = 0;
                    var to_pay = 0;
                    var tr;
                    for(var i = 0;i<task.length;i++){
                    	if(task[i].status==='报价'){
                    		to_approve = to_approve+1;
                    	}
                    	if(task[i].status==='立项'){
                    		approved = approved+1;
                    	}
                    	if(task[i].status==='批复编号'){
                    		to_set = to_set+1;
                    	}
                    	if(task[i].status==='预算'){
                    		already_set = already_set+1;
                    	}
                    	if(task[i].status==='追加预算'){
                    		executing = executing+1;
                    	}
                    	if(task[i].status==='决算'){
                    		to_close = to_close+1;
                    	}
                    	if(task[i].status==='结项'){
                    		already_close  = already_close+1;
                    	}
                    	
                    	if(task[i].status==='申请'){
                    		applied  = applied+1;
                    	}
                    	if(task[i].status==='批复'){
                    		replied  = replied+1;
                    	}
                    	if(task[i].status==='支付'){
                    		to_pay  =to_pay+1;
                    	}
                    	if(task[i].status==='收款确认'){
                    		already_paid  = already_paid+1;
                    	}
                    	tr =tr+ "<tr><td>"+task[i].taskId+"</td><td>"+task[i].status+"</td><td>"+task[i].quoId+"</td><td><a href='../../../html/jfc/project/projectHome.html'>详情</a></td></tr>";
                    }
                    var to_send = {
                    		  to_approve: {number: to_approve, link: '../../../html/jfc/project/projectHome.html'},
	                          approved: {number: approved, link: '../../../html/jfc/project/projectHome.html'},
	                          to_set: {number: to_set, link: '../../../html/jfc/project/projectHome.html'},
	                          already_set: {number:already_set, link: '../../../html/jfc/project/projectHome.html'},
	                          executing: {number: executing, link: '../../../html/jfc/project/projectHome.html'},
	                          to_close: {number: to_close, link: '../../../html/jfc/project/projectHome.html'},
	                          already_close: {number: already_close, link: '../../../html/jfc/project/projectHome.html'},
	                          list: '../../../html/jfc/project/projectHome.html'
                    };
                    self.my_project = to_send;
                    /*我的     ================================================财务*/
                    self.my_finance= {
			            applied: {number: applied, link: '../../../html/jfc/finance/financeHome.html'},
			            replied: {number: replied, link: '../../../html/jfc/finance/financeHome.html'},
			            already_paid: {number: already_paid, link: '../../../html/jfc/finance/financeHome.html'},
			            to_pay: {number: to_pay, link: '../../../html/jfc/finance/financeHome.html'},
			            gap: {number: 0, link: ''},
			            list: '../../../html/jfc/finance/financeHome.html'
			        };
                    /*我的     ================================================任务*/
                    $("#the_table").html(tr);
                },
                error: function(e){
                    console.log(e)
                }
            })
        } catch (e) {
            console.log(e)
        }
    },//从后台读取打卡信息&关注信息&项目信息&财务信息&待办信息
    watch = {},
    vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        created: created,
        watch: watch
    });