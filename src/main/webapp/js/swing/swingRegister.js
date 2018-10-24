var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
$("#register_btn").click(function(){
		if($("#email").val()==""){
			$("#tips").text("邮箱不能为空");
			return false;
		}
		if($("#phone").val()==""){
			$("#tips").text("电话不能为空");
			return false;
		}
		if($("#password").val()==""){
			$("#tips").text("密码不能为空");
			return false;
		}
		if($("#username").val()==""){
			$("#tips").text("用户名不能为空");
			return false;
		}
		if($("#password1").val()==""){
			$("#tips").text("确认密码不能为空");
			return false;
		}
		if($("#password").val()!=$("#password1").val()){
			$("#tips").text("两次密码不一样");
			return false;
		}
		var temp = {};
		temp.iEmail = $("#email").val();
		temp.iPhone = $("#phone").val();
		temp.iPassword = $("#password").val();
		temp.iUserName = $("#username").val();
		$.ajax({
			url : "" + realPath + "/party/swingRegister",
			type : "post",
			dataType : "json",
			async : true,
			crossDomain : true,
			data : JSON.stringify(temp),
			contentType : "application/JSON;charset=utf-8",
			success : function(data) {
				if (data[0]["result"] >= 1) {
					show_err_msg('注册成功！');
					window.location.href=realPath+ '/swingLogin.html';
				} else {
					show_err_msg('注册失败！');
				}
	
			}
		});
	});
});