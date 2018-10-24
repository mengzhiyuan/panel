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
	$('#search').click(function() {
		$("#the_table").bootstrapTable('destroy');
		oTable.Init();
	});

});
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
							url : "" + realPath
									+ "/project/search", // 请求后台的URL（*）
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
										field : 'proNumber',
										title : '项目号',
										editable: {
						                    type: 'text',
						                    title: '项目号',
						                    validate: function (v) {
						                        if (!v) return '项目号不能为空';

						                    }
						                }
									},
									{
										field : 'cusName',
										title : '客户公司',
									},
									{
										field : 'cusManage',
										title : '经理人',
									},
									{
										field : 'proAmountMoney',
										title : '项目金额',
									},
									{
										field : 'staName',
										title : '项目经理',
									},
									{
										field : 'proName',
										title : '项目名称',
										cellStyle : formatTableUnit,
										formatter : operateOpinionFormatter,
										visible : false
									},
									{
										field : 'proCreateTime',
										title : '创建时间',
										formatter : operateTMSRPFormatter,

									},
									{
										field : 'type',
										title : '类型',
									},
									{
										field : 'investigation',
										title : '调查方法',
										visible : false
									},
									{
										title : '操作',
										field : 'id',
										align : 'center',
										formatter : function(value, row, index) {
											var e = "<button class=\"btn btn-xs btn-primary update_btn\" data-toggle=\"modal\" title=\"添加费用明细\" data-target=\"#myModal\"><i class=\"glyphicon glyphicon-usd\"></i></button>";
											var d = "<button class=\"btn btn-xs btn-primary budget_book\" data-toggle=\"modal\" title=\"添加预算书\"><i class=\"glyphicon glyphicon-plus\"></i></button>";
											return e+d;
										},
										events : operateEvents,
									} ],
							
								onEditableSave: function (field, row, oldValue, $el) {
									var send = {};
									send.proId = row.proId;
									send.proNumber = row.proNumber;
					                $.ajax({
					                    url:  "" + realPath + "/project/updateProNumber",
										type : "post",
										dataType : "json",
										async : true,
										contentType : "application/JSON;charset=utf-8",
									    data:JSON.stringify(send),
					                    success: function (data, status) {
					                        if (status == "success") {
					                            alert('提交数据成功');
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
	window.operateEvents = {
			'click .update_btn' : function(e, value, row, index) {
				$("#create_staff").removeAttr("proId");
				var hang = $("#beforeTable").find("tr").length;
				var han = $("#afterTable").find("tr").length;
				hang= parseInt(hang)-1;
				han = parseInt(han)-1
				if(hang>=1){
					$("#beforeTable tr").not(":eq("+hang+")").remove();
				}
				if(han>=1){
					$("#afterTable tr").not(":eq("+han+")").remove();
				}
				
				$("#create_staff").attr("proId",row.proId);
				var send = {};
				send.proId = row.proId;
                $.ajax({
                    url:  "" + realPath
					+ "/project/detailsList",
					type : "post",
					dataType : "json",
					async : true,
					contentType : "application/JSON;charset=utf-8",
				    data:JSON.stringify(send),
                    success: function (data, status) {
                        if (status == "success") {
                            var proPrecost = data[0].proPrecost[0];
                        	$(".preBudget").val(proPrecost.preBudget);
                        	$(".preImplement").val(proPrecost.preImplement);
                        	$(".preNeed").val(proPrecost.preNeed);
                        	var proDetailsCharges = data[0].proDetailsCharges;
                        	for(var i=0;i<proDetailsCharges.length;i++){
                        		if(proDetailsCharges[i].detAround=="1"){
                        			$("#beforeTable").prepend("<tr><td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detName+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detType+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detDetails+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPrice+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detNumber+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detMoney+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPayee+"\"></td>"+
        									"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(proDetailsCharges[i].detTime)+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detRemark+"\"></td>");
                        		}
                        		if(proDetailsCharges[i].detAround=="0"){
                        			$("#afterTable").prepend("<tr><td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detName+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detType+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detDetails+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPrice+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detNumber+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detMoney+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPayee+"\"></td>"+
        									"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(proDetailsCharges[i].detTime)+"\"></td>"+
        									"<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detRemark+"\"></td>");
                        		}
                        	}
                        	timeRefresh();
                        }
                    },
                    error: function () {
                        alert('编辑失败');
                    },
                    complete: function () {

                    }

                });
                
                
			},
			'click .budget_book' : function(e, value, row, index) {
				sessionStorage.setItem("proId", row.proId); 
				window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
			}
		};
	function timeToString(dataTime){
		if (dataTime != null) {
			birthday = dataTime.time;
			birthday = new Date(birthday);
			var birth_month = birthday.getMonth() + 1;
			if (birth_month < 10)
				birth_month = "0" + birth_month;
			birthday = birthday.getFullYear() + "-" + birth_month + "-"
					+ birthday.getDate();
			return birthday;
		}else{
			return "";
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
		return {
			"total" : res[0]['total'],// 总页数
			"rows" : res[0]['result']
		// 数据
		}
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
			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			keyword : $('#keyword').val()
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
$(".addbefore").click(function(){
	$("#beforeTable").prepend("<tr><td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>");
	timeRefresh();
});

$(".removebefore").click(function(){
	var hang = $("#beforeTable").find("tr").length;
	if((hang-1)==0){
		return;
	}
	$("#beforeTable tr").eq(hang-2).remove();
});

$(".addafter").click(function(){
	$("#afterTable").prepend("<tr><td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>"+
									"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\"></td>"+
									"<td><input type=\"text\" class=\"input\"></td>");
	timeRefresh();
});

$(".removeafter").click(function(){
	var hang = $("#afterTable").find("tr").length;
	if((hang-1)==0){
		return;
	}
	$("#afterTable tr").eq(hang-2).remove();
});
$("#addDetails").click(function(){
	var to_send = {};
	to_send.proId = $("#create_staff").attr("proId");
	to_send.preBudget = $(".preBudget").val();
	to_send.preImplement = $(".preImplement").val();
	to_send.preNeed = $(".preNeed").val();
	var before = [];
	var hang = $("#beforeTable").find("tr").length;
	var a = parseInt(hang)-1;
	$("#beforeTable tr").not(":eq("+a+")").each(function(){
		var tr = [];
		 $(this).find("td").each(function(){
			 tr.push($(this).find("input").val());
		 });
		 before.push(tr);
	});
	to_send.before=before;
	var after = [];
	var han = $("#afterTable").find("tr").length;
	var b = parseInt(han)-1;
	$("#afterTable tr").not(":eq("+b+")").each(function(){
		var tr = [];
		 $(this).find("td").each(function(){
			 tr.push($(this).find("input").val());
		 });
		 after.push(tr);
	});
	to_send.after=after;
	$.ajax({
		url : "" + realPath + "/project/details",
		type : "post",
		dataType : "json",
		async : true,
		contentType : "application/JSON;charset=utf-8",
	    data:JSON.stringify(to_send), 
		success : function(datas) {
			alert(datas[0]['result']);
		}
	});
});
















