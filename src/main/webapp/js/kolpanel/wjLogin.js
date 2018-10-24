var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;


$(function() {
	$('#submit_btn').click(function() {
	  var dat = {
			username : $('#username').val(),
			password : $('#password').val()
		};
	  $.ajax({
			type : "post",
			url : "" + realPath + "/system/login",
			dataType : 'json',
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(dat),
			success : function(data) {
				if (data[0]['result'] == 1) {
					$("#Prompt").html('邮箱或者密码错误！');
				}
				if (data[0]['result'] == 2) {
					$("#Prompt").html('邮箱未注册或者被禁用');
				}
				if (data[0]['result'] == "success") {
					sessionStorage.setItem('surveyName',  $('#username').val());
					window.location.href=realPath+"/html/kolpanel/creating.html"; 
				}
			}
		});
	});
})