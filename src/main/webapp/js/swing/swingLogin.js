var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	$("#loginWeibo").click(function(){
	    /* weiboAuthWin = window.open("https://api.weibo.com/oauth2/authorize?client_id=4038551749&response_type=code&redirect_uri=http://10.0.0.12:8080/jfcpanel/html/swing/swing.html",
	    		 +"微博授权登录",
	    		 +"width=770,height=600,menubar=0,scrollbars=1",
	    		 +"resizable=1,status=1,titlebar=0,toolbar=0,location=1");*/
	     weiboAuthWin =window.open("https://api.weibo.com/oauth2/authorize?client_id=4038551749&response_type=code&state=register&redirect_uri=http://10.0.0.12:8080/jfcpanel/html/swing/weibo.html",
                 '_parent','width=770,height=600,menubar=0,scrollbars=1,'+
        'resizable=1,status=1,titlebar=0,toolbar=0,location=1');

	});
	/*微信*/
	$("#loginWeixin").click(function(){
		 window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wx21d8d801d61c8255&redirect_uri=http%3A%2F%2Fwww.kolpanel.net%2Fjfcpanel%2fdownload%2Fweixin.html&response_type=code&scope=snsapi_userinfo&state=2ajfdh#wechat_redirect";
	});
	
	// 账号
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
					var dat = {
						username : $('#email').val(),
						password : $('#password').val()
					};
					$.ajax({
						type : "post",
						url : "" + realPath + "/party/swingLogin",
						dataType : 'json',
						async : true,
						contentType : "application/JSON;charset=utf-8",
						data : JSON.stringify(dat),
						success : function(data) {
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
								sessionStorage.setItem('information', JSON
										.stringify(data[0]['information']));
								window.location.href = "./home.html";
							}
						}
					});

				}
			});
	
});
