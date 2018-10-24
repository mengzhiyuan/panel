var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(function() {
	// 1.初始化Table
	window.oTable = new TableInit();
	oTable.Init();

	// 2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
	// search按钮绑定查询事件
	$('#search').click(function() {
		$("#the_table").bootstrapTable('destroy');
		oTable.Init();
	});
	$("#this_proNumber").click(function(){
		alert("a");
	});
});
window.operateEvents = {
    'click .project-cost' : function(e, value, row, index) {
        sessionStorage.setItem("proId", row.id);
        sessionStorage.setItem('method', 'readOnly');
        window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    },
    'click .read_quality' : function(e, value, row, index) {

        $('#quality_control').find('input').prop('disabled', true);
        $('#quality_control').find('select').prop('disabled', true);
        $('#release').css('display','none');

        $('#project_id').val(row.id);
        $('#project_number').val(row.project_number);
        $('#project_name').val(row.project_title);
        $('#project_status').val(row.project_status);
        $('#project_start_time').val(row.project_start_time);
        $('#project_end_time').val(row.project_end_time);
        $('#budget_samples_number').val(row.budget_samples_number);
        $('#completed_samples_number').val(row.completed_samples_number);
        $('#project_managor').val(row.project_manager);
        $('#execution_area').val(row.execution_area);

//        $('#release').off('click', qualitySend);

        $.ajax({
            url: realPath + '/progres/qcList',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({proId: row.id}),
            success: function(d){

                if (d[0].result == 'error'){
                    alert('请求失败。');
                    return false
                }

                var data = d[0].result[0];

                $('#inspector').val(data.qcMember);
                $('#inspection_method').val(data.qcMethod);
                $('#inspection_ratio').val(data.qcProportion);
                $('#inspection_results').val(data.qcAchievements);
                $('#inspection_status').val(data.qcStatus);
                $('#inspection_conclusion').val(data.qcQuality);
                $('#inspection_remark').val(data.qcRemark);
            },
            error: function(err){
                console.log(err);
                alert('请求失败')
            }
        })

    },
    'click .update_quality' : function(e, value, row, index) {

        $('#quality_control').find('input').prop('disabled', false);
        $('#quality_control').find('select').prop('disabled', false);
        $('#release').css('display','inline-block');

        var qcId = '';

        $('#project_id').val(row.id);
        $('#project_number').val(row.project_number);
        $('#project_name').val(row.project_title);
        $('#project_status').val(row.project_status);
        $('#project_start_time').val(row.project_start_time);
        $('#project_end_time').val(row.project_end_time);
        $('#budget_samples_number').val(row.budget_samples_number);
        $('#completed_samples_number').val(row.completed_samples_number);
        $('#project_managor').val(row.project_manager);
        $('#execution_area').val(row.execution_area);

        $.ajax({
            url: realPath + '/progres/qcList',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({proId: row.id}),
            success: function(d){

                if (d[0].result == 'error'){
                    alert('请求失败。');
                    return false
                }

                var data = d[0].result[0];

                qcId = data.qcId;
                $('#inspector').val(data.qcMember);
                $('#inspection_method').val(data.qcMethod);
                $('#inspection_ratio').val(data.qcProportion);
                $('#inspection_results').val(data.qcAchievements);
                $('#inspection_status').val(data.qcStatus);
                $('#inspection_conclusion').val(data.qcQuality);
                $('#inspection_remark').val(data.qcRemark);
            },
            error: function(err){
                console.log(err);
                alert('请求失败')
            }
        });

        $('#release').on('click', qualitySend);

        function qualitySend(event){

            var sending_data = {
                proId: row.id,
                qcId: qcId,
                inspector: $('#inspector').val(),
                inspection_method: $('#inspection_method').val(),
                inspection_ratio: $('#inspection_ratio').val(),
                inspection_results: $('#inspection_results').val(),
                inspection_status: $('#inspection_status').val(),
                inspection_conclusion: $('#inspection_conclusion').val(),
                inspection_remark: $('#inspection_remark').val()
            };

            $.ajax({
                url: realPath + '/progres/progressQC',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(sending_data),
                success: function(d){
                    if (d[0].result > 0){
                        $('#release').off('click', qualitySend);
                        alert('操作成功。');
                        $('#close').click();
                    } else {
                        alert('请求失败。')
                    }
                },
                error: function(err){
                    console.log('请求失败')
                }
            })
        }

    },
    'click .add_cooperation' : function(e, value, row, index) {

        $('#business_cooperation').find('input').prop('disabled', false);
        $('#business_cooperation').find('select').prop('disabled', false);
        $('#release_cooperation').css('display','inline-block')
            .on('click', saveCooperation);

        var business_cooperation = row.business_cooperation ? JSON.parse(row.business_cooperation)[0] : {};

        $('#business_amount').val(business_cooperation.business_amount || '');
        $('#contract').val(business_cooperation.contract || '');
        $('#invoice').val(business_cooperation.invoice || '');
        $('#paid').val(business_cooperation.paid || '');

        function saveCooperation(event){
            $.ajax({
                url: realPath + "/progres/progressAdd",
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    proId: row.id,
                    greId: row.greId,
                    business_cooperation: {
                        business_amount: $('#business_amount').val(),
                        contract: $('#contract').val(),
                        invoice: $('#invoice').val(),
                        paid: $('#paid').val()
                    }
                }),
                success: function(d){
                    if (d[0].result > 0){
                        $('#release_cooperation').off('click', saveCooperation);
                        $("#the_table").bootstrapTable('destroy');
                        oTable.Init();
                        $('#close_cooperation').click();
                        alert('操作成功。')
                    } else {
                        alert('请求失败。');
                        return false
                    }
                },error: function(e){
                    console.log(e);
                    alert('请求失败。')
                }
            })
        }
    },
    'click .read_cooperation' : function(e, value, row, index) {
        $('#business_cooperation').find('input').prop('disabled', true);
        $('#business_cooperation').find('select').prop('disabled', true);
        $('#release_cooperation').css('display','none');
            //.off('click', saveCooperation);

        var business_cooperation = row.business_cooperation ? JSON.parse(row.business_cooperation)[0] : {};

        $('#business_amount').val(business_cooperation.business_amount || '');
        $('#contract').val(business_cooperation.contract || '');
        $('#invoice').val(business_cooperation.invoice || '');
        $('#paid').val(business_cooperation.paid || '');
    },
    'click .follow_btn' : function(e, value, row, index) {
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({proId: row.id,method: 'follow'}),
            async: true,
            success: function(data){
                if (data[0].result > 0){
                    $("#the_table").bootstrapTable('destroy');
                    oTable.Init();
                } else {
                    alert('操作失败')
                }
            },
            error: function(err){
                alert('操作失败')
            }

        })
    },
    'click .unfollow_btn' : function(e, value, row, index) {
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({proId: row.id,method: 'unfollow'}),
            async: true,
            success: function(data){
                if (data[0].result > 0){
                    $("#the_table").bootstrapTable('destroy');
                    oTable.Init();
                } else {
                    alert('操作失败')
                }
            },
            error: function(err){
                alert('操作失败')
            }

        })
    },
    'click .event_btn' : function(e, value, row, index) {
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({proId: row.id,method: 'event'}),
            async: true,
            success: function(data){
                if (data[0].result > 0){
                    $("#the_table").bootstrapTable('destroy');
                    oTable.Init();
                } else {
                    alert('操作失败')
                }
            },
            error: function(err){
                alert('操作失败')
            }

        })
    }
};
searchProject();
function searchProject(){
	 $.ajax({
          url: ""+realPath+"/project/searchProject",
          type: "post",
          dataType: "json",
          async: true,
          contentType : "application/JSON;charset=utf-8",
          /*data:JSON.stringify(to_send),*/
          success: function(data){
        	  var pro = data[0].projectList;
        	  for(var i=0;i<pro.length;i++){
        		  $("#this_proNumber").append("<option value=\"" +pro[i].proNumber + "\" >" + pro[i].proNumber+ "</option>");
        	  }
        	 
          },
          error: function(d1,d2,d3){
              console.log(d1);
              console.log(d2);
              console.log(d3);
          }
      })
}
timeRefresh();
function timeRefresh() {
	lay('.test_item').each(function() {
		laydate.render({
			elem : this,
			trigger : 'click'
		});
	});
	
}

var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#the_table')
				.bootstrapTable(
						{
							url : "" + realPath + "/progres/progressList", // 请求后台的URL（*）
							method : 'post', // 请求方式（*）
							toolbar : '#toolbar', // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : true, // 是否显示分页（*）
							sortable : false, // 是否启用排序
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
							responseHandler : responseHandler,
							columns : [
                                {
                                    field: 'id',
                                    title: 'ID',
                                    visible: false
                                },{
                                    field: 'project_number',
                                    title: '项目编号'
                                },{
                                    field: 'last_update',
                                    title: '最后修改时间'
                                },{
                                    field: 'project_title',
                                    title: '项目名称',
                                    sortable: true
                                },{
                                    field: 'project_status',
                                    title: '项目状态',
                                    visible: false
                                },{
                                    field: 'complete_or_not',
                                    title: '是否已完成',
                                    editable: {
                                        type: 'select',
                                        title: '是否已完成',
                                        source:[{value:"1",text:"已完成"},{value:"0",text:"未完成"}]
                                    }
                                },{
                                    field: 'balanced_or_not',
                                    title: '是否已决算',
                                    editable: {
                                        type: 'select',
                                        title: '是否已决算',
                                        source:[{value:"1",text:"已决算"},{value:"0",text:"未决算"}]
                                    }
                                },{
                                    field: 'project_manager',
                                    title: '项目经理'
                                },
                                //{
                                //    field: 'department',
                                //    title: '部门',
                                //    visible: false
                                //},
                                {
                                    field: 'client_company',
                                    title: '客户名称',
                                    sortable: true
                                },{
                                    field: 'client_contract',
                                    title: '客户联络人',
                                    sortable: true
                                },{
                                    field: 'execution_area',
                                    title: '执行区域'
                                },{
                                    field: 'project_start_time',
                                    title: '项目开始时间',
                                    visible: false
                                },{
                                    field: 'project_end_time',
                                    title: '项目结束时间',
                                    visible: false
                                },{
                                    field: 'budget_samples_number',
                                    title: '预算样本量'
                                },{
                                    field: 'completed_samples_number',
                                    title: '完成进度量',
                                    editable: {
                                        type: 'number',
                                        title: '备注',
                                        validate: function (v) {
                                            if (!v) return '不能为空';

                                        }
                                    }
                                },{
                                    field: 'budget_amount',
                                    title: '预算金额'
                                },{
                                    field: 'completed_amount',
                                    title: '完成金额'
                                },{
                                    field: 'project_cost',
                                    title: '项目费用',
                                    visible: false,
                                    formatter : function(value, row, index) {
                                        return "<a class=\"btn btn-xs btn-info project-cost\" data-toggle=\"modal\" title=\"项目费用\" >" + value + "</a>";
                                    },
                                    events : operateEvents
                                },{
                                    field: 'project_quality',
                                    title: '项目质量',
                                    visible: false,
                                    formatter : function(value, row, index) {
                                        var a = "<a class=\"btn btn-xs btn-info read_quality\" data-target='#quality_control' data-toggle=\"modal\" title=\"查看质量\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>",
                                            b = "<a class=\"btn btn-xs btn-success update_quality\" data-target='#quality_control' data-toggle=\"modal\" title=\"修改质量\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
                                        return a+b;
                                    },
                                    events : operateEvents
                                },{
                                    field: 'business_cooperation',
                                    title: '商务合作',
                                    visible: false,
                                    formatter : function(value, row, index) {
                                        var a = "<a class=\"btn btn-xs btn-info read_cooperation\" data-toggle=\"modal\" data-target=\"#business_cooperation\" title=\"查看\" ><i class=\"glyphicon glyphicon-search\"></i></a>",
                                            b = "<a class=\"btn btn-xs btn-success add_cooperation\" data-toggle=\"modal\" data-target=\"#business_cooperation\" title=\"新增\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
                                        return a+b;
                                    },
                                    events : operateEvents
                                },{
                                    field: 'remark',
                                    title: '备注',
                                    editable: {
                                        type: 'text',
                                        title: '备注',
                                        validate: function (v) {
                                            if (!v) return '不能为空';

                                        }
                                    }
                                },{
                                    field: 'control',
                                    title: '操作',
                                    formatter : function(value, row, index) {
                                        var a = "<a class=\"btn btn-xs btn-info follow_btn\" data-toggle=\"modal\" title=\"关注\" ><i class=\"glyphicon glyphicon-star-empty\"></i></a>",
                                            b = "<a class=\"btn btn-xs btn-info unfollow_btn\" data-toggle=\"modal\" title=\"取消关注\" ><i class=\"glyphicon glyphicon-star\"></i></a>",
                                            c = "<a class=\"btn btn-xs btn-success event_btn\" data-toggle=\"modal\" title=\"待办事项\" ><i class=\"glyphicon glyphicon-bookmark\"></i></a>";
                                        return a+b+c;
                                    },
                                    events : operateEvents
                                }
                            ],
							onEditableSave : function(field, row, oldValue, $el) {

                                var data_to_send = {
                                    proId: row.id,
                                    greId: row.greId
                                };
                                data_to_send[field] = row[field];

								 $.ajax({
					                    type: "post",
					                    url: "" + realPath + "/progres/progressAdd",
										dataType : "json",
										async : true,
										contentType : "application/JSON;charset=utf-8",
										data:JSON.stringify(data_to_send),
					                    success: function (data, status) {
					                        if (data[0].result > 0) {
                                                $("#the_table").bootstrapTable('destroy');
                                                oTable.Init();
                                                alert('编辑完成');
					                        }
					                    },
					                    error: function () {
					                        alert('编辑失败');
					                    },
					                    complete: function () {

					                    }
					                });
							}
						});

	};
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            project_title: $('#project_title').val(),//项目主题-筛选
            project_client: $('#project_client').val(),//客户公司-筛选
            project_manager: $('#project_manager').val(),//客户经理-筛选
            project_during: $('#project_during').val(),//查询期限-筛选
            limit: params.limit,   // 页面大小
            offset: params.offset,  // 页码
            sort: params.sort,      //排序列名
            sortOrder: params.order
            //keyword: $("#keyword").val()
        };
        return temp;
    };
	function timeToString(dataTime) {
		if (dataTime != null) {
			birthday = dataTime.time;
			birthday = new Date(birthday);
			var birth_month = birthday.getMonth() + 1;
			if (birth_month < 10)
				birth_month = "0" + birth_month;
			birthday = birthday.getFullYear() + "-" + birth_month + "-"
					+ birthday.getDate();
			return birthday;
		} else {
			return "-";
		}
	}
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
	function responseHandler(res) {

        var data = {};
        data.total = res[0].total;
        data.rows = [];

        for (var i = 0; i < res[0].result.length; i++){
            data.rows[i] = new CreateRows(res[0].result[i])
        }

        function CreateRows(r){
            this.id = r['proProject'][0].proId || '-';
            this.greId = r['proProgress'].length > 0 ? (r['proProgress'][0].greId || '') : '';
            this.project_number = r['proProject'][0].proNumber || '-';
            this.project_title = r['proProject'][0].proName || '-';

            switch (r['proBudget'].infoStatus){

                case '0':
                    this.status = '已保存';
                    break;
                case '1':
                    this.status = '待确认';
                    break;
                case '2':
                    this.status = '再次预算';
                    break;
                case '3':
                    this.status = '预算完成';
                    break;
                default:
                    this.status = '-';
                    break;
            }

            this.project_status = r['proProject'][0].status || '-';
            
            this.complete_or_not = r['proProgress'].length > 0 ? (r['proProgress'][0].greComplete || '-') : '-';
            this.balanced_or_not = r['proProgress'].length > 0 ? (r['proProgress'][0].greBusir || '-') : '-';
            this.completed_samples_number = r['proProgress'].length > 0 ? (r['proProgress'][0].greProgress || '-') : '-';
            
            this.project_manager = r['jfcStaff'][0].staName || '-';
            //this.department = r.department || '-';
            this.client_company = r['cusliaList'][0].cusComList.comName || '-';
            this.client_contract = r['cusliaList'][0].liaName || '-';
            this.execution_area = r['proProject'][0].city || '-';
            this.project_start_time = timeToString(r.proTime[0].starTime) || '-';
            this.project_end_time = timeToString(r.proTime[r.proTime.length-1].endTime) || '-';

            var budgetData = JSON.parse(r['proBudget'].infoSample)[0],
                sample_number = parseInt(budgetData.budget),
                supplementaries = budgetData.supplementarySample;

            for (let i = 0; i < supplementaries.length; i++){
                sample_number += parseInt(supplementaries[i].supplementary) || 0
            }

            this.budget_samples_number = sample_number || '-';
            //this.completed_samples_number = r.completed_samples_number || '-';//未接收值
            this.budget_amount = r['proBudget'].infoSumMoney || '-';
            this.completed_amount = r['proBudget'].infoActualMoney || '-';

            var amount_number = parseInt(budgetData.budget),
                amount_supplementaries = budgetData.supplementarySample;

            for (let i = 0; i < amount_supplementaries.length; i++){
                amount_number += parseInt(amount_supplementaries[i].supplementary) || 0
            }

            this.project_cost = amount_number || '-';
            this.project_quality = r.project_quality || '-';
            this.business_cooperation = r['proProgress'].length > 0 ? (r['proProgress'][0].greBusiness || '') : '';
            this.remark = r['proProgress'].length > 0 ? (r['proProgress'][0].greRemark || '-') : '-';
        }
        return data;
	}
	// 格式化时间
	function operateTMSRPFormatter(value, row, index) {
		var birthday = row.greExecuteTime;
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
	
	function operateTMSFormatter(value, row, index) {
		var birthday = row.greUpdateTime;
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
			limit : params.limit, // 页面大小
			offset : params.offset // 页码
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