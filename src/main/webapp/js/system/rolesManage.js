/**
 * Created by wangxiangyang on 2017/7/3.
 */
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
	timeRefresh();
	function timeRefresh() {
		lay('.test_item').each(function() {
			laydate.render({
				elem : this,
				trigger : 'click'
			});
		});
	}

	$('#btn_add').click(function() {
		$("#roleKey_add").val("");
		$("#roleValue_add").val("");
		$("#description_add").val("");
		$("#this_id").val("");
	});

	function updateSave() {
		var dd = {
			roleKey : $("#roleKey_add").val(),
			roleValue : $("#roleValue_add").val(),
			description : $("#description_add").val(),
			roleId : $("#this_id").val()
		};
		$.ajax({
			url : "" + realPath + "/role/update",
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(dd),
			success : function(data) {
				var res = data[0]["userDemp"];
				$("#addRole").modal("hide");
				$("#the_table").bootstrapTable('destroy');
				oTable.Init();
				alert("修改成功");

			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3)
			}

		})
	}
	// 添加
	$("#add_save").click(function() {
		var this_id = $("#this_id").val();
		if (this_id != null && this_id != '') {
			updateSave();
			return false;
		}
		var dd = {
			roleKey : $("#roleKey_add").val(),
			roleValue : $("#roleValue_add").val(),
			description : $("#description_add").val(),
		// roleId:$("#this_id").val()
		};
		$.ajax({
			url : "" + realPath + "/role/add",
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(dd),
			success : function(data) {
				var res = data[0]["userDemp"];
				$("#addRole").modal("hide");
				$("#the_table").bootstrapTable('destroy');
				oTable.Init();
				alert("添加成功");

			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3)
			}

		})

	});
	$("#update_save").click(
			function() {
				var this_key = window.this_key, checked = $("#role_rights")
						.find(".checks"), res = [], len = checked.length, i;

				for (i = 0; i < len; i++) {
					if ($(checked[i]).prop("checked") == true) {
						res.push(checked[i].getAttribute("menuCode"))
					}
				}

				var result = {
					roleKey : this_key,
					menuCodes : res
				};

				$.ajax({
					url : "" + realPath + "/role/addRole",
					type : "post",
					dataType : "json",
					contentType : "application/JSON;charset=utf-8",
					async : true,
					data : JSON.stringify(result),
					success : function(data) {
						var res = data[0]["userDemp"];
						if (parseInt(res) >= 1) {
							$("#myModal").modal("hide");
							alert("修改权限成功");
						} else {
							$("#myModal").modal("hide");
							alert("修改权限失败");
						}
					},
					error : function(d1, d2, d3) {
						console.log(d1);
						console.log(d2);
						console.log(d3);
						$("#myModal").modal("hide");
						alert("修改权限失败");
					}
				})

			});

});
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#the_table')
				.bootstrapTable(
						{
							url : "" + realPath + "/role/search", // 请求后台的URL（*）
							method : 'post', // 请求方式（*）
							toolbar : '#toolbar', // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : false, // 是否显示分页（*）
							sortable : false, // 是否启用排序
							sortOrder : "asc", // 排序方式
							queryParams : false,// 传递参数（*）
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
							uniqueId : "id", // 每一行的唯一标识，一般为主键列
							showToggle : true, // 是否显示详细视图和列表视图的切换按钮
							cardView : false, // 是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [
									{
										field : 'roleKey',
										title : '角色编码',
									},
									{
										field : 'roleValue',
										title : '角色名称',
									},
									{
										field : 'description',
										title : '角色描述',
									},
									{
										title : '操作',
										field : 'id',
										align : 'center',
										formatter : function(value, row, index) {
											var e = "<a class=\"btn btn-xs btn-primary update_btn\" data-toggle=\"modal\" data-target=\"#addRole\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
											var d = "<a class=\"btn btn-xs btn-danger delete_btn\" data-toggle=\"modal\" title=\"删除\" ><i class=\"glyphicon glyphicon-trash\"></i></a>";
											var f = "<a class=\"btn btn-xs btn-warning right_btn\" data-toggle=\"modal\" data-target=\"#myModal\" title=\"权限\" ><i class=\"glyphicon glyphicon-flag\"></i></a>";
											return e + d + f;
										},
										events : operateEvents,
									} ],
							responseHandler : responseHandler

						});

	};
	window.operateEvents = {
		'click .update_btn' : function(e, value, row, index) {
			$("#roleKey_add").val(row.roleKey);
			$("#roleValue_add").val(row.roleValue);
			$("#description_add").val(row.description);
			$("#this_id").val(row.id);
		},
		'click .delete_btn' : function(e, value, row, index) {
			var msg = "您真的确定要删除吗？\n\n请确认！";
			if (confirm(msg) == true) {
			} else {
				return false;
			}
			var toSend = {
				roleId : row.id
			};
			$.ajax({
				url : "" + realPath + "/role/delete",
				type : "post",
				dataType : "json",
				async : true,
				contentType : "application/JSON;charset=utf-8",
				data : JSON.stringify(toSend),
				success : function(data) {
					alert("删除成功");
				},
				error : function(d1, d2, d3) {
					console.log(d1);
					console.log(d2);
					console.log(d3)
				}
			})
		},
		'click .right_btn' : function(e, value, row, index) {
			var data = {
				roleKey : row.roleKey
			};
			window.this_key = data.roleKey;
			$.ajax({
				url : "" + realPath + "/role/menu",
				type : "post",
				dataType : "json",
				async : true,
				data : JSON.stringify(data),
				contentType : "application/JSON;charset=utf-8",
				success : function(data) {
					$('#sys_children li').remove();
					var array = data[0]["authorityList"], ulist = document
							.getElementById("sys_children");
					iteration(array, ulist);
				},
				error : function(d1, d2, d3) {
					console.log(d1);
					console.log(d2);
					console.log(d3);
				}
			})
		}
	};

	// 数据格式化
	function responseHandler(res) {
		var list = [];
		var role = res[0]['role'];
		for (var i = 0; i < role.length; i++) {
			var ro = new Object();
			ro.id = role[i].id;
			ro.roleKey = role[i].roleKey;
			ro.roleValue = role[i].roleValue;
			ro.description = role[i].description;
			list.push(ro);
		}
		return {
			"rows" : list
		// 数据
		}
	}
	return oTableInit;
};
// 处理多级列表的迭代函数(arg1:待处理数组,arg2:插入元素的位置)
function iteration(arr, ulist) {
	var len = arr.length, i;

	for (i = 0; i < len; i++) {
		// 每个数组项对应一个li,li下面包含label*1 + checkbox*1 [+ ul*1]
		var listItem = document.createElement("li"), sub_list = document
				.createElement("ul"), item_label = document
				.createElement("label"), item_check = document
				.createElement("input"), sub_arr = arr[i]["subAuthorityList"];

		// 给列表项的checkbox添加属性值
		item_check.className = "checks";
		item_check.setAttribute("menuCode", arr[i]["menuCode"]);
		if (arr[i]["status"] == true) {
			item_check.setAttribute("checked", true);
		}
		item_check.type = "checkbox";
		item_label.innerText = arr[i]["menuName"];

		// 如果子数组有数组项,则迭代处理(arg1:子数组,arg2:li下的ul元素)
		if (sub_arr.length > 0) {
			iteration(sub_arr, sub_list);
		}

		// 将label和checkbox添加到listItem下
		listItem.appendChild(item_check);
		listItem.appendChild(item_label);
		// 如果ul下有li,则把ul添加下listItem下,否则销毁ul
		if (sub_list.hasChildNodes()) {
			listItem.appendChild(sub_list)
		} else {
			sub_list = null
		}

		// 将listItem添加到目标位置
		ulist.appendChild(listItem)
	}
}
var ButtonInit = function() {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function() {
		// 初始化页面上面的按钮事件
	};

	return oInit;
};