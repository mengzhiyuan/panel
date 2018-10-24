var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
document.onkeydown = function(e) {
	if ($(".bac").length == 0) {
		if (!e)
			e = window.event;
		if ((e.keyCode || e.which) == 13) {
			var obtnLogin = document.getElementById("register_btn")
			obtnLogin.click();
		}
	}
}
$(function(){
$("#register_btn").click(function(){
	var temp = {};
	temp.email = $("#email").val();
	temp.phone = $("#phone").val();
	temp.password = $("#password").val();
	temp.userName = $("#username").val();
	$.ajax({
		url : "" + realPath + "/system/register",
		type : "post",
		dataType : "json",
		async : true,
		crossDomain : true,
		data : JSON.stringify(temp),
		contentType : "application/JSON;charset=utf-8",
		success : function(data) {
			if (data[0]["userDeps"] >= 1) {
				show_err_msg('注册成功！');
				window.location.href=realPath+ '/kolLogin';
			} else {
				show_err_msg('注册失败！');
			}

		}
	});
});
});