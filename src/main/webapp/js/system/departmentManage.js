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
	function updateSave(){
	}
	$('#btn_add').click(function(){
		 $("#departmentKey_add").val("");
	   	 $("#departmentValue_add").val("");
	   	 $("#superior_add").val("");
	   	 $("#description_add").val("");
	});
	//修改
	function updateSave(){
		 var dd = {
    			 departmentKey: $("#departmentKey_add").val(),
    			 departmentValue: $("#departmentValue_add").val(),
    			 superior: $("#superior_add").val(),
    			 description: $("#description_add").val(),
    			 departmentId:$("#this_id").val()
             };
    	  $.ajax({
              url: ""+realPath+"/department/update",
              type: "post",
              dataType: "json",
              async: true,
              contentType : "application/JSON;charset=utf-8",
              data: JSON.stringify(dd),
              success: function(data){
            	  if(data[0]["departments"]=='1'){
            			$("#the_table").bootstrapTable('destroy');
            			oTable.Init();
						$("#myModal").modal('hide');
						alert('修改成功！');
					}else{
						alert('修改失败！');
					}
					
            	  
              }
    	  });
	}
	//添加
	$("#update_save").click(function(){
		 var this_id = $("#this_id").val();
		 if(this_id!=null&&this_id!=''){
			 updateSave();
			 return;
		 }
		 var dd = {
    			 departmentKey: $("#departmentKey_add").val(),
    			 departmentValue: $("#departmentValue_add").val(),
    			 superior: $("#superior_add").val(),
    			 description: $("#description_add").val(),
             };
    	  $.ajax({
              url: ""+realPath+"/department/add",
              type: "post",
              dataType: "json",
              async: true,
              contentType : "application/JSON;charset=utf-8",
              data: JSON.stringify(dd),
              success: function(data){
            	  if(data[0]["departments"]=='1'){
            			$("#the_table").bootstrapTable('destroy');
            			oTable.Init();
						$("#myModal").modal('hide');
						alert('添加成功！');
					}else{
						alert('添加失败！');
					}
              }
    	  });
	});
	        
});
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#the_table')
				.bootstrapTable(
						{
							url : "" + realPath
									+ "/department/search", // 请求后台的URL（*）
							method : 'post', // 请求方式（*）
							toolbar : '#toolbar', // 工具按钮用哪个容器
							striped : true, // 是否显示行间隔色
							cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
							pagination : false, // 是否显示分页（*）
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
							uniqueId : "id", // 每一行的唯一标识，一般为主键列
							showToggle : true, // 是否显示详细视图和列表视图的切换按钮
							cardView : false, // 是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [
									{
										field : 'departmentKey',
										title : '部门编码',
									},
									{
										field : 'departmentValue',
										title : '部门名称',
									},
									{
										field : 'parentDepartmentkey',
										title : '上级部门',
									},
									{
										field : 'description',
										title : '部门描述',
									},
									{
										title : '操作',
										field : 'id',
										align : 'center',
										formatter : function(value, row, index) {
											var e = "<a class=\"btn btn-xs btn-primary update_btn\" data-toggle=\"modal\" data-target=\"#myModal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>";
											var d =  "<a class=\"btn btn-xs btn-danger delete_btn\" data-toggle=\"modal\" title=\"删除\" ><i class=\"glyphicon glyphicon-trash\"></i></a>";
											return e+d;
										},
										events : operateEvents,
									} ],
							responseHandler : responseHandler

						});

	};
	window.operateEvents = {
		'click .update_btn' : function(e, value, row, index) {
			 $("#departmentKey_add").val(row.departmentKey);
			 $("#departmentValue_add").val(row.departmentValue);
			 $("#superior_add").val(row.parentDepartmentkey);
			 $("#description_add").val(row.description);
			 $("#this_id").val(row.id);
		},
		'click .delete_btn' : function(e, value, row, index) {
			 var dd = {
					 departmentId: row.id
		         };
		    	 var msg = "您真的确定要删除吗？\n\n请确认！"; 
		    	 if (confirm(msg)==true){ 
		    	 }else{ 
		    	  return false; 
		    	 } 
				  $.ajax({
			         url: ""+realPath+"/department/delete",
			         type: "post",
			         dataType: "json",
			         async: true,
			         contentType : "application/JSON;charset=utf-8",
			         data: JSON.stringify(dd),
			         success: function(data){
			       	  if(data[0]["departments"]=='1'){
						alert('删除成功！');
						window.location.href = realPath+"/html/system/departmentManage.html";
					}else{
						alert('删除失败！');
					}
			         }
				  });
		}
	};

	// 数据格式化
	function responseHandler(res) {
		var department = res[0]['department'];
		var list = [];
		for(var i=0;i<department.length;i++){
			var dep=new Object();
			dep.departmentKey = department[i].departmentKey;
			dep.departmentValue = department[i].departmentValue;
			dep.description= department[i].description;
			dep.id= department[i].id;
			dep.parentDepartmentkey = department[i].parentDepartmentkey;
			list.push(dep);
		}
		return {
			"rows" : list
		// 数据
		}
	}
	// 得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			countPage : params.limit, // 页面大小
			currentPage : params.offset, // 页码
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






