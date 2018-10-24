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
			var obtnLogin = document.getElementById("submit_btn")
			obtnLogin.click();
		}
	}
}
var $main = $cloud = mainwidth = null;
var offset1 = 450;
var offset2 = 0;
var offsetbg = 0;
$(function() {
        $("#email").val($.cookie("userName"));
        $("#password").val($.cookie("passWord"));
	  $main = $("#mainBody");
		$body = $("body");
      $cloud1 = $("#cloud1");
		$cloud2 = $("#cloud2");
      mainwidth = $main.outerWidth();
	$('#btn_add')
			.click(
					function() {
						$
								.ajax({
									url : "" + realPath + "/system/search",
									type : "post",
									dataType : "json",
									async : true,
									crossDomain : true,
									contentType : "application/JSON;charset=utf-8",
									success : function(data) {
										for (i = 0; i < data[0]["department"].length; i++) {
											$("#department_update")
													.append(
															"<option value=\""
																	+ data[0]["department"][i]["departmentKey"]
																	+ "\" >"
																	+ data[0]["department"][i]["departmentValue"]
																	+ "</option>");
										}
									}
								});
					});
	// 注册
	$('#update_save').click(function() {
		var myReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 邮件正则
		if ($('#email_update').val() == '') {
			show_err_msg('邮箱还没填呢！');
			$('#email_update').focus();
		} else if (!myReg.test($('#email_update').val())) {
			show_err_msg('您的邮箱格式错咯！');
			$('#email').focus();
		} else if ($('#password_update').val() == '') {
			show_err_msg('密码还没填呢！');
			$('#password_update').focus();
		} else if ($('#name_update').val() == '') {
			show_err_msg('用户名还没填呢！');
			$('#name_update').focus();
		} else {
			var dat = {
				userName : $("#name_update").val(),
				password : $("#password_update").val(),
				sex : $("#sex_update").val(),
				email : $("#email_update").val(),
				phone : $("#phone_update").val(),
				birthday : $("#birthday_update").val(),
				departmentKey : $("#department_update").val()
			};
			$.ajax({
				type : "post",
				url : "" + realPath + "/system/register",
				dataType : "json",
				contentType : "application/JSON;charset=utf-8",
				data : JSON.stringify(dat),
				success : function(data) {
					if (data[0]["userDeps"] >= 1) {
						show_err_msg('注册成功！');
						$("#myModal").modal('hide');
					} else {
						show_err_msg('注册失败！');
					}

				}
			});

		}
	});

	// 提交表单
	$('#submit_btn').click(
			function() {
				var myReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 邮件正则
				if ($('#email').val() == '') {
					show_err_msg('邮箱还没填呢！');
					$('#email').focus();
				} else if (!myReg.test($('#email').val())) {
					show_err_msg('您的邮箱格式错咯！');
					$('#email').focus();
				} else if ($('#password').val() == '') {
					show_err_msg('密码还没填呢！');
					$('#password').focus();
				} else if ($('#j_captcha').val() == '') {
					show_err_msg('验证码还没填呢！');
					$('#j_captcha').focus();
				} else {
					// $('#login_form').ajaxSubmit(function(data) { });

					// show_msg('登录成功咯！ 正在为您跳转...','/');
					// self.location.href = "/home";
					// var jsonuserinfo = $('#login_form').serializeObject();
					var dat = {
						username : $('#email').val(),
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
							  $.cookie("userName", $('#email').val(), { expires: 7 });
						      $.cookie("passWord", $('#password').val(),  { expires: 7 });
							if (data[0]['result'] == 1) {
								show_err_msg('邮箱或者密码错误！');
							}
							if (data[0]['result'] == 2) {
								show_err_msg('邮箱未注册或者被禁用');
							}
							if (data[0]['result'] == 3) {
								show_err_msg('验证码错误');
							}
							if (data[0]['result'] == "success") {
								sessionStorage.setItem('sysUser', JSON
										.stringify(data[0]['sysUser']));
								var index = curWwwPath .lastIndexOf("\/");  
								var strs  = curWwwPath .substring(index + 1, curWwwPath.length);
								if('kolLogin'===strs){
									show_msg('登录成功咯！  正在为您跳转...', "" + realPath
											+ "/main_kangpai");
								}else{
									show_msg('登录成功咯！  正在为您跳转...', "" + realPath
											+ "/html/jfc/main/center.html");
								}
								
							}
						}
					});

				}
			});
	
	  /// 飘动
    setInterval(function flutter() {
        if (offset1 >= mainwidth) {
            offset1 =  -580;
        }

        if (offset2 >= mainwidth) {
			 offset2 =  -580;
        }
		
        offset1 += 1.1;
		offset2 += 1;
        $cloud1.css("background-position", offset1 + "px 100px")
		
		$cloud2.css("background-position", offset2 + "px 460px")
    }, 70);
	
	
	setInterval(function bg() {
        if (offsetbg >= mainwidth) {
            offsetbg =  -580;
        }

        offsetbg += 0.9;
        $body.css("background-position", -offsetbg + "px 0")
    }, 90 );
	
});