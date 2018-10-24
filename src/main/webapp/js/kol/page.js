var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	$("#topLogin").html(JSON.parse(sessionStorage.getItem('sysUser')).userName+"，您好！欢迎您登陆SKY！");
	timeRefresh();
	function timeRefresh() {
		lay('.test_item').each(function() {
			laydate.render({
				elem : this,
				trigger : 'click'
			});
		});
	}
	var temp = {};
	temp.email = JSON.parse(sessionStorage.getItem('sysUser')).email;
	$.ajax({
		type : "post",
		url : "" + realPath + "/home/pageInit",
		dataType : 'json',
		async : true,
		data : JSON.stringify(temp),
		contentType : "application/JSON;charset=utf-8",
		success : function(data) {
			var d= data[0]['department'];
			//data[0]['staff'][0].email
			for(var i = 0;i<d.length;i++){
				$("#department_update").append("<option  value=" + d[i].id + ">" + d[i].departmentValue + "</option>");
			}
			$("#name_update").val(data[0]['staff'][0].userName);
			$("#sex_update").val(data[0]['staff'][0].sex);
			$("#email_update").val(data[0]['staff'][0].email);
			$("#phone_update").val(data[0]['staff'][0].phone);
			$("#form").attr("idss",data[0]['staff'][0].id);
			$("#department_update").val(data[0].departmentId);
		}
	});
	
	$("#update_save").click(function(){
		  var temp = {};
		  temp.id= $("#form").attr("idss");
		  temp.name = $("#name_update").val();
		  temp.sex = $("#sex_update").val();
		  temp.email = $("#email_update").val();
		  temp.phone = $("#phone_update").val();
		  temp.birthday = $("#birthday_update").val();
		  temp.department = $("#department_update").val();
		  temp.education = $("#education_update").val();
		  temp.administration = $("#administration_update").val();
		  temp.city = $("#city_update").val();
		  temp.bank_cark = $("#bank_cark_update").val();
		  temp.induction = $("#induction_update").val();
		  temp.number = $("#number_update").val();
		  $.ajax({
				type : "post",
				url : "" + realPath + "/home/pagePerfect",
				dataType : 'json',
				async : true,
				data : JSON.stringify(temp),
				contentType : "application/JSON;charset=utf-8",
				success : function(data) {
					var d= data[0]['result'];
					if(d>0){
						 window.parent.location.href = realPath+'/main_kangpai';
					}
				}
			});
		
	});
	
});



