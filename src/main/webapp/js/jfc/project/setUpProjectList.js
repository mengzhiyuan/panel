var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {

	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
	// search按钮绑定查询事件
	$('#project_search').click(function() {
		$("#tb_departments").bootstrapTable('destroy');
		oTable.Init();
	});
    $('#project_add').on('click',function(){
        document.location.href = './setUpProject.html';
    });
    $.ajax({
        url: realPath + '/quote/init',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(data){
            let appoint = $('#appoint'),
                node = `<option value="">请选择</option>`,
                list = data[0].jfcStaff,
                len = list.length,
                i;
            for (i = 0; i < len; i++){
                node += `<option value="`+ list[i].staName +`">`+ list[i].staName +`</option>`
            }
            $('#staff_list').html(node);
            $('#confirm').one('click', confirm)
        },
        error: function(e){}
    })
});
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#tb_departments')
				.bootstrapTable(
						{
							url : "" + realPath
									+ "/setUpProject/setUpProjectList", // 请求后台的URL（*）
							method : 'post', // 请求方式（*）
							toolbar : '#toolbar', // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : true, // 是否启用排序
							sortOrder : "asc", // 排序方式
							queryParams : oTableInit.queryParams,// 传递参数（*）
							sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
							pageNumber : 1, // 初始化加载第一页，默认第一页
							pageSize : 10, // 每页的记录行数（*）
							pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
							search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
							strictSearch : true,
							showColumns : true, // 是否显示所有的列
							showRefresh : true, // 是否显示刷新按钮
							minimumCountColumns : 2, // 最少允许的列数
							clickToSelect : false, // 是否启用点击选中行
							height : 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
							uniqueId : "proId", // 每一行的唯一标识，一般为主键列
							showToggle : true, // 是否显示详细视图和列表视图的切换按钮
							cardView : false, // 是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [{
                                field : 'id',
                                title : 'ID'
                            }, {
                                field : 'taskId',
                                title : '任务ID'
                            }, {
                                field : 'status',
                                title : '立项状态'
                            }, {
                                field : 'set_up_time',
                                title : '立项时间'
                            }, {
                                field : 'project_number',
                                title : '项目编号'
                            }, {
                                field : 'project_theme',
                                title : '项目主题',
                                sortable: true
                            }, {
                                field : 'project_manager',
                                title : '项目经理'
                            }, {
                                field : 'client_manager',
                                title : '客户经理',
                                sortable: true
                            }, {
                                field : 'project_background',
                                title : '项目背景',
                                visible: false
                            }, {
                                field : 'project_type',
                                title : '项目类型'
                            }, {
                                field : 'method',
                                title : '调查方法'
                            }, {
                                field : 'area',
                                title : '执行区域'
                            }, {
                                field : 'audienceOrRespondent',
                                title : '调查对象',
                                visible: false
                            }, {
                                field : 'allocation',
                                title : '样本配额',
                                visible: false
                            }, {
                                field : 'project_start_time',
                                title : '项目开始时间',
                                visible: false
                            }, {
                                field : 'project_end_time',
                                title : '项目结束时间',
                                visible: false
                            }, {
                                field : 'deliverables',
                                title : '项目成果',
                                visible: false
                            }, {
                                field : 'comName',
                                title : '客户公司',
                                sortable: true
                            }, {
                                field : 'liaName',
                                title : '客户联系人'
                            }, {
                                field : 'remark',
                                title : '备注',
                                editable: {
                                    type: 'text',
                                    title: '名称',
                                    validate: function (v) {
                                        if (!v) return '不能为空';

                                    }
                                }
                            }, {
                                field : 'control',
                                title : '操作',
                                align : 'center',
                                formatter : function(value, row, index) {
                                	var a='',b='',c='';
                                	if(row.status=="立项完成"){
                                		 a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>";
                                         b = "<a class=\"btn btn-xs btn-success update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
                                	}else{
                                		 a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>";
                                         b = "<a class=\"btn btn-xs btn-success update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
                                         c = "<a class=\"btn btn-xs btn-warning bell_btn\" data-toggle=\"modal\" data-target=\"#appoint\" title=\"立项启动\" ><i class=\"glyphicon glyphicon-bell\"></i></a>";
                                	}
                                   
                                    return a+b+c;
                                },
                                events : operateEvents
                            }
                                //    ,{
                            //    field : 'proName',
                            //    title : '项目名称',
                            //    cellStyle : formatTableUnit,
                            //    formatter : operateOpinionFormatter,
                            //    visible : false
                            //}, {
                            //    field : 'proCreateTime',
                            //    title : '创建时间',
                            //    formatter : operateTMSRPFormatter,
                            //}, {
                            //    field : 'type',
                            //    title : '类型',
                            //}, {
                            //    field : 'investigation',
                            //    title : '调查方法',
                            //    visible : false
                            //}, {
                            //    title : '操作',
                            //    field : 'id',
                            //    align : 'center',
                            //    formatter : function(value, row, index) {
                            //        var e = "<a class=\"btn btn-xs btn-primary update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
                            //        return e;
                            //    },
                            //    events : operateEvents,
                            //}
                            ],
                            onEditableSave: function (field, row, oldValue, $el) {
                                $.ajax({
                                    type: "post",
                                    url: realPath + '/remark',
                                    contentType: 'application/json;charset=utf-8',
                                    data: JSON.stringify({
                                        id: row.id,
                                        remark: row.remark
                                    }),
                                    dataType: 'JSON',
                                    success: function (data, status) {
                                        var res = data[0]['result'];
                                        if (res > 0){
                                            $("#list").bootstrapTable('destroy');
                                            oTable.Init();
                                            alert('修改信息成功');
                                        } else {
                                            alert('修改信息失败,请重试')
                                        }
                                    },
                                    error: function (e) {
                                        console.log(e);
                                        alert('修改信息失败,请稍后重试')
                                    }
                                });
                            },
							responseHandler : responseHandler

						});

	};
	window.operateEvents = {
        'click .read_btn' : function(e, value, row, index) {
            sessionStorage.setItem("proId", row.id);
            sessionStorage.setItem('method', 'readOnly');
            window.location.href = "/jfcpanel/html/jfc/project/setUpProject.html";
        },
        'click .update_btn' : function(e, value, row, index) {
            sessionStorage.setItem("proId", row.id);
            sessionStorage.setItem('method', 'write');
            window.location.href = "/jfcpanel/html/jfc/project/setUpProject.html";
        },
        'click .bell_btn' : function(e, value, row, index) {
        	$('#confirm').unbind("click");
        	$('#confirm').one('click', confirm);
        	$('#confirm1').unbind("click");
        	$('#confirm1').one('click', confirm);
        	//var taskId = row
        	function confirm(){
        		if(row.taskId==null||row.taskId==''){
            		alert("没有此任务");
            		return;
            	}
        		 var to_send = {};
        		 to_send.taskId = row.taskId;
        		 to_send.nominee =$("#staff_list").children('option:selected').val();
        		 to_send.outcome = $(this).html();
        		 to_send.proId = row.id;
     	        $.ajax({
     	            url: realPath + '/workflow/submitTask',
     	            type: 'post',
     	            contentType: 'application/json;charset=utf-8',
     	            dataType: 'json',
     	            data: JSON.stringify(to_send),
     	            async: true,
     	            success: function(data){
     	                if (data[0].result >= 0){
     	                	document.location.href = './setUpProjectList.html';
     	                }else{
     	                	alert("失败");
     	                }
     	            },
     	            error: function(e){
     	                alert('网络连接问题。')
     	            }
     	        })
            }
        	
        },
       /* 'click .budget_btn' : function(e, value, row, index) {
            sessionStorage.setItem("proId", row.id);
            window.location.href = "/jfcpanel/html/jfc/project/setUpProject.html";
        },*/
        //'click .check_btn': function(e,value,row,index){
        //    function confirm(){
        //        let to_send = {
        //            proId: row.id,
        //            taskId: row.quoId,
        //            nominee: $('#staff_list').val()
        //        };
        //        $.ajax({
        //            url: realPath + '/workflow/submitTask',
        //            type: 'post',
        //            contentType: 'application/json;charset=utf-8',
        //            dataType: 'json',
        //            data: JSON.stringify(to_send),
        //            async: true,
        //            success: function(data){
        //                if (data[0].result > 0){
        //
        //                } else {
        //                    $('#confirm').one('click', confirm)
        //                }
        //            },
        //            error: function(e){
        //                $('#confirm').one('click', confirm)
        //            }
        //        })
        //    }
        //    $.ajax({
        //        url: realPath + '/quote/init',
        //        type: 'post',
        //        contentType: 'application/json;charset=utf-8',
        //        dataType: 'json',
        //        async: true,
        //        success: function(data){
        //            let node = `<option value="">请选择</option>`,
        //                list = data[0].jfcStaff,
        //                len = list.length,
        //                i;
        //            for (i = 0; i < len; i++){
        //                node += `<option value="`+ list[i].staName +`">`+ list[i].staName +`</option>`
        //            }
        //            $('#staff_list').html(node);
        //            $('#confirm').one('click', confirm)
        //        },
        //        error: function(e){
        //
        //        }
        //    })
        //}
	};

	// 设备厂商悬浮
	function formatTableUnit(value, row, index) {
		var front_color = 'red';
		var bg_color = 'white';
		return {
			css : {
				"color" : 'red',
				"background-color" : bg_color,
				"overflow" : 'hidden',
				"text-overflow" : 'ellipsis',
				"white-space" : 'nowrap'
			}
		};
	}
	function operateOpinionFormatter(value, row, index) {
		if (value.length > 5) {
			return "<span title='" + value + "'>" + value.substring(0, 5)
					+ "..." + "</span>";
		} else {
			return "<span title='" + value + "'>"
					+ value.substring(0, value.length) + "</span>";
		}
	}
	// 数据格式化
	function responseHandler(ood) {
        let res = ood[0].result,
            data = {};
        data.total = ood[0].total;
        data.rows = [];
        var task = ood[0].task;
        function MakeRow(row){

            this.id = row.proId;//id
            this.quoId = row.quoId;
            
            /**
             * 循环task
             */
            for(var i = 0;i<task.length;i++){
            	if(task[i].quoId===row.quoId){
            		this.taskId = task[i].taskId;
            		break;
            	}
            }
            switch (row.status){//报价状态

                case '0':
                    this.status = '立项';
                    break;
                case '1':
                    this.status = '立项完成';
                    break;
            }

            if (row.proCreateTime){//创建报价时间

                var timeString = '';
                timeString += (row.proCreateTime.year + 1900)
                    + '-' + (row.proCreateTime.month + 1)
                    + '-' + row.proCreateTime.date
                    + ' ' + row.proCreateTime.hours
                    + ':' + row.proCreateTime.minutes
                    + ':' + row.proCreateTime.seconds;

                this.set_up_time = timeString

            } else {
                this.set_up_time = '-'
            }

            var startTimeObject = row.proTime[0].starTime,
                endTimeObject = row.proTime[row.proTime.length-1].endTime;

            this.project_start_time = '' + (startTimeObject.year + 1900) + '-' + (startTimeObject.month+1) + '-' + startTimeObject.date;
            this.project_end_time = '' + (endTimeObject.year + 1900) + '-' + (endTimeObject.month+1) + '-' + endTimeObject.date;

            this.client_manager = row['cusLiaison'].liaName || '-';//客户经理
            this.project_number = row.proNumber || '-';//项目编号
            this.project_theme = row.proName ||'-';//项目主题
            this.project_manager = row['jfcStaff'].staName;
            this.project_background = row.objective;
            this.project_type = row.type;
            this.method = row.investigation;
            this.area = row.city;
            //this.quoIndustry = row.quoIndustry || '-';//研究行业
            this.audienceOrRespondent = row.respondents;
            this.allocation = row.sample;
            this.deliverables = row.dataresult;//项目成果
            this.currency = row.currency || '-';//币种
            //this.total = row.total || '-';//总价
            this.comName = row['cusCompany'].comName || '-';//客户公司
            //this.comType = row['cusCompany'].comType || '-';//客户类型
            this.liaName = row['cusLiaison'].liaName || '-';//客户联系人
            //this.liaPhone = row['cusLiaison'].liaPhone || row['cusLiaison'].liaTel || '-';//客户联系方式
            //this.comEmail = row['cusLiaison'].comEmail || '-';//客户邮箱
            this.remark = row.remarks || '-';
        }

        for (let i = 0, l = res.length; i < l; i++){
            data.rows.push(new MakeRow(res[i]))
        }
        return data;
	}
	// 格式化时间
	function operateTMSRPFormatter(value, row, index) {
		var birthday = row.proCreateTime;
		var html = null;
		if (birthday != null) {
			birthday = birthday.time;
			birthday = new Date(birthday);
			var birth_month = birthday.getMonth() + 1;
			if (birth_month < 10)
				birth_month = "0" + birth_month;
			birthday = birthday.getFullYear() + "-" + birth_month + "-"
					+ birthday.getDate();
			html = ('<span>' + birthday + '</span>');
		}

		return html;
	}
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            project_title: $('#project_title').val(),//项目主题-筛选
            project_client: $('#project_client').val(),//客户公司-筛选
            project_manager: $('#project_manager').val(),//客户经理-筛选
            project_during: $('#project_during').val(),//查询期限-筛选
            userName:JSON.parse(sessionStorage.getItem('sysUser')).userName,
            email:JSON.parse(sessionStorage.getItem('sysUser')).email,
            limit: params.limit,   // 页面大小
            offset: params.offset,  // 页码
            sort: params.sort,      //排序列名
            sortOrder: params.order
            //keyword: $("#keyword").val()
		};
		return temp;
	};
	return oTableInit;
};

var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function() {
		// 初始化页面上面的按钮事件
	};

	return oInit;
};
