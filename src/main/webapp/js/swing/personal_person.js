var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	$("#export").click(function(){
		var to_send = {};
		to_send.email = JSON.parse(sessionStorage.getItem('information'))['iEmail'];
		$.ajax({
			type : "post",
			url :realPath + "/contact/download_export",
			dataType : 'json',
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(to_send),
			success : function(data) {
				 window.open(realPath + data[0].result);
			}
		});
	});
	$("#download").click(function(){
		var to_send = {};
		to_send.email = JSON.parse(sessionStorage.getItem('information'))['iEmail'];
		$.ajax({
				type : "post",
				url :realPath + "/contact/download_template",
				dataType : 'json',
				async : true,
				contentType : "application/JSON;charset=utf-8",
				data : JSON.stringify(to_send),
				success : function(data) {
					 window.open(realPath + data[0].result);
				}
			});
	});
	
	$(".submit").click(function(){
		$("#email").val(JSON.parse(sessionStorage.getItem('information'))['iEmail']);
		var option = {
             url: ""+realPath+"/contact/ImportExcel",
             type: 'post',
             dataType:"json",
             clearForm: true,
             resetForm: true,
             success: function(data){
                 var res = data[0]["result"];
                 if (res > 0){
                     alert('批量添加成功。')
                 } else {
                     alert('操作失败。')
                 }
             }
         };
         $("#excelImport").ajaxSubmit(option);
	});	
	
});


	var to_send = {};
	to_send.email =  JSON.parse(sessionStorage.getItem('information'))['iEmail'];
	$.ajax({
		type : "post",
		url : "" + realPath + "/contact/contact_add_search",
		dataType : 'json',
		async : true,
		contentType : "application/JSON;charset=utf-8",
		data : JSON.stringify(to_send),
		success : function(data) {
			var columnsArray = [];
			var contact = data[0].result;
			/*columnsArray.push({ 
				 checkbox: true,
			});*/
			columnsArray.push({ "title": "编号","field": "iId",  switchable: true, sortable: true});
			columnsArray.push({"title": "姓名", "field": "conName", switchable: true, sortable: true});
			columnsArray.push({ "title": '公司', "field": 'conCompany', switchable: true, sortable: true});
			columnsArray.push({ "title": '电话', "field": 'conPhone', switchable: true, sortable: true});
			columnsArray.push({ "title": '性别', "field": 'conSex', switchable: true, sortable: true});
			columnsArray.push({ "title": '地址', "field": 'conAddress', switchable: true, sortable: true});
			columnsArray.push({ "title": '备注', "field": 'conRemark', switchable: true, sortable: true});
			columnsArray.push({ "title": '生日', "field": 'conBirthday', switchable: true, sortable: true});
			columnsArray.push({ "title": '职位', "field": 'conPosition', switchable: true, sortable: true});
			columnsArray.push({ "title": '邮箱', "field": 'conEmail', switchable: true, sortable: true});
			columnsArray.push({ "title": '座机', "field": 'conTel', switchable: true, sortable: true});
			for(var i=0;i<contact.length;i++){
				columnsArray.push({"title": contact[i].addName, "field": contact[i].addField, switchable: true, sortable: true});
			}
	       $('#tb_contact').bootstrapTable('destroy').bootstrapTable({
	            url: realPath+"/contact/contact_all",         //请求后台的URL（*）
	            method: 'post',                      //请求方式（*）
	            toolbar: '#toolbar',                //工具按钮用哪个容器
	            striped: true,                      //是否显示行间隔色
	            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	            pagination: true,                   //是否显示分页（*）
	            sortable: false,                     //是否启用排序
	            sortOrder: "asc",                   //排序方式
	            queryParams: queryParams,           //传递参数（*）
	            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	            pageNumber:1,                       //初始化加载第一页，默认第一页
	            pageSize: 10,                       //每页的记录行数（*）
	            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
	            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	            strictSearch: true,
	            showColumns: true,                  //是否显示所有的列
	            showRefresh: true,                  //是否显示刷新按钮
	            minimumCountColumns: 2,             //最少允许的列数
	            clickToSelect: true,                //是否启用点击选中行
	            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
	            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
	            cardView: false,                    //是否显示详细视图
	            detailView: false,                   //是否显示父子表
	            responseHandler: function(data){
	            	var contact = data[0].result;
	            	var t = data[0].total;
	            	var data ={};
	            	data.total = t;
	                data.rows = [];
	            	for(var i=0;i<contact.length;i++){
	            		data.rows.push({
	            			iId:contact[i].conId,
	            			conName:contact[i].conName,
		            		conCompany:contact[i].conCompany,
		            		conPhone:contact[i].conPhone,
		            		conSex:contact[i].conSex,
		            		conAddress:contact[i].conAddress,
		            		conRemark:contact[i].conRemark,
		            		conBirthday:contact[i].conBirthday,
		            		conPosition:contact[i].conPosition,
		            		conEmail:contact[i].conEmail,
		            		conTel:contact[i].conTel
	            		});
	            		if(contact[i].wjContactValue.length>=1){
	              			for(var j=0;j<=contact[i].wjContactValue.length;j++){
	              				var filed = contact[i].wjContactValue[j].valFiled;
	              				var value = contact[i].wjContactValue[j].valValue;
	              				data.rows.push({
	              					filed:value
	              				});
	              			}
	              		}
	            	}
	            	return data;
		        },
		        columns:columnsArray
	        });
		}
	});
	queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            email: JSON.parse(sessionStorage.getItem('information'))['iEmail']
        };
        return temp;
    };


