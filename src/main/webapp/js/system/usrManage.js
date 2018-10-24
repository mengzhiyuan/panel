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
	$('#btn_ref').click(function() {
		$("#the_table").bootstrapTable('destroy');
		oTable.Init();
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
	function updateSave(){
		 var dd = {
				 	id:$("#this_id").val(),
	                userName: $("#name_update").val(),
	                sex: $("#sex_update").val(),
	                email: $("#email_update").val(),
	                phone: $("#phone_update").val(),
	                birthday: $("#birthday_update").val(),
	                departmentKey: $("#department_update").val(),
	                roleId: $("#role_update").val(),
	                status: $("#status_update").val()
	            };
	            $.ajax({
	                url: ""+realPath+"/user/update",
	                type: "post",
	                dataType: "json",
	                async: true,
	                contentType : "application/JSON;charset=utf-8",
	                data: JSON.stringify(dd),
	                success: function(data){
	                	  $("#myModal").modal("hide");
	                	  
	                	  alert("修改成功");
	                	  window.location.href =realPath+ "/html/system/usrManage.html";
	                }
	            });
	}
	$('#btn_add').click(function(){
		   $("#name_update").val("");
           //$("#sex_update").val("");
           $("#email_update").val("");
           $("#phone_update").val("");
           $("#birthday_update").val("");
           //$("#department_update").html("");
           //$("#role_update").html("");
           //$("#status_update").val("");
           $("#this_id").val("");
	});
	//添加
	$("#update_save").click(function(){
		var this_id = $("#this_id").val();
		if(this_id!=null&&this_id!=''){
			updateSave();
			return false;
		}
		 var dd = {
	                userName: $("#name_update").val(),
	                sex: $("#sex_update").val(),
	                email: $("#email_update").val(),
	                phone: $("#phone_update").val(),
	                birthday: $("#birthday_update").val(),
	                departmentKey: $("#department_update").val(),
	                roleId: $("#role_update").val(),
	                status: $("#status_update").val()
	            };
	            $.ajax({
	                url: ""+realPath+"/user/add",
	                type: "post",
	                dataType: "json",
	                async: true,
	                contentType : "application/JSON;charset=utf-8",
	                data: JSON.stringify(dd),
	                success: function(data){
	                    var res = data[0]["userDeps"];
	                    $("#myModal").modal("hide");
	                    
	                    alert("添加成功");
	                    window.location.href =realPath+ "/html/system/usrManage.html";
	                    
	                    
	                },
	                error: function(d1,d2,d3){
	                    console.log(d1);
	                    console.log(d2);
	                    console.log(d3)
	                }

	            })
	        })
	        //修改n
	        
});
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#the_table')
				.bootstrapTable(
						{
							url : "" + realPath
									+ "/user/search", // 请求后台的URL（*）
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
							uniqueId : "id", // 每一行的唯一标识，一般为主键列
							showToggle : true, // 是否显示详细视图和列表视图的切换按钮
							cardView : false, // 是否显示详细视图
							detailView : false, // 是否显示父子表
							columns : [
									{
										field : 'userName',
										title : '姓名',
									},
									{
										field : 'sex',
										title : '性别',
									},
									{
										field : 'email',
										title : '邮箱',
									},
									{
										field : 'phone',
										title : '联系电话',
									},
									{
										field : 'departmentKey',
										title : '所属部门',
									},
									{
										field : 'roleValue',
										title : '角色',
									},
									{
										field : 'status',
										title : '是否禁用',
									},
									{
										field : 'lastTime',
										title : '最后登录',
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
			$("#name_update").val(row.userName);
			$("#this_id").val(row.id);
			$("#sex_update").find("option").each(function(){
				if($(this).text()==row.sex){
					$(this).attr("selected",true);
				}
			}); 
			$("#email_update").val(row.email);
			$("#phone_update").val(row.phone);
			$("#birthday_update").val(row.birthday);
			$("#department_update").find("option").each(function(){
				if($(this).val()==row.departmentKey){
					$(this).attr("selected",true);
				}
			}); 
			$("#role_update").find("option").each(function(){
				if($(this).text()==row.roleValue){
					$(this).attr("selected",true);
				}
			}); 
			$("#status_update").find("option").each(function(){
				if($(this).text()==row.status){
					$(this).attr("selected",true);
				}
			}); 
		},
		'click .delete_btn' : function(e, value, row, index) {
			        var to_del = [];
			        to_del.push(row.id);
			    	var msg = "您真的确定要删除吗？\n\n请确认！"; 
			    	 if (confirm(msg)==true){ 
			    	 }else{ 
			    	  return false; 
			    	 } 
			        var user_toDel = [];
			        for (var i = 0,len = to_del.length; i < len; i++){
			            user_toDel.push(to_del[i])
			        }
			        $.ajax({
			            url: ""+realPath+"/user/delete",
			            type: "post",
			            dataType: "json",
			            async: true,
			            contentType : "application/JSON;charset=utf-8",
			            data: JSON.stringify(user_toDel),
			            success: function(data){
			            	window.location.href =realPath+ "/html/system/usrManage.html";
			            },
			            error: function(d1,d2,d3){
			                console.log(d1);
			                console.log(d2);
			                console.log(d3)
			            }
			        })
			    }
	};

	// 数据格式化
	function responseHandler(res) {
		var list = [];
		var department = res[0]['department'];
		var role = res[0]['role'];
		var sysUser = res[0]['sysUser'];
		  for (var i = 0, len = role.length; i < len; i++){
	            var opt = document.createElement("option");
	            opt.value = role[i].id;
	            opt.innerText = role[i].roleValue;
	            document.getElementById("role_update").appendChild(opt);
	        }

	        for (i = 0, len = department.length; i < len; i++){
	            opt = document.createElement("option");
	            opt.value = department[i].departmentKey;
	            opt.innerText = department[i].departmentValue;
	            document.getElementById("department_update").appendChild(opt);
	        }
		for(var i = 0;i<sysUser.length;i++){
			var per=new Object();
			per.id = sysUser[i].id
			per.userName = sysUser[i].userName;
            var sex = sysUser[i]["sex"];
            switch (sex){
                case 1:
                    sex = "男";
                    break;
                case 0:
                    sex = "女";
                    break;
            }
            per.sex = sex;
            per.email = sysUser[i].email;
            per.phone = sysUser[i].phone;
            var birthday;
            if(sysUser[i]["birthday"]!=null){
            	birthday= sysUser[i]["birthday"]["time"];
                birthday = new Date(birthday);
                var birth_month = birthday.getMonth() + 1;
                if (birth_month < 10) birth_month = "0" + birth_month;
                birthday = birthday.getFullYear() + "-" + birth_month + "-" + birthday.getDate();
            }
            per.birthday=birthday;
            per.departmentKey = sysUser[i].departmentKey;
            per.roleValue = sysUser[i].roleValue;
            var status = sysUser[i]["status"];
            switch (status){
                case false:
                    status = "未禁用";
                    break;
                case true:
                    status = "已禁用";
                    break;
            }
            per.status = status;
            var lastTime;
            var last_month;
            if( sysUser[i]["lastLogintime"]===null){
            	lastTime = '';
            }else{
            	lastTime = sysUser[i]["lastLogintime"]["time"];
            	lastTime = new Date(lastTime);
            	last_month = lastTime.getMonth() + 1;
            	  if (last_month < 10) last_month = "0" + last_month;
                  lastTime = lastTime.getFullYear() + "-" + last_month + "-" + lastTime.getDate();
                  per.lastTime = lastTime;
            }
            
          
            list.push(per);
		}
		
		return {
			"total" :res[0].total,// 总页数
			"rows" : list
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
			countPage : params.limit, // 页面大小
			currentPage : params.offset, // 页码
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






