/**
 * Created by wangxiangyang on 2018/4/19.
 */
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPath+projectName;
$(function(){
	var clock = '';
	var nums = 60;
	var btn;
	$("#verification_btn").click(function(){
		btn = this;
	    btn.disabled = true;
	    btn.value = nums+'秒后可重新获取';
	    clock = setInterval(doLoop, 1000); //一秒执行一次
		var to_send = {};
		var email = $("#email").val();
		to_send.email = email;
		if(email!=''){
			$.ajax({
                url: realPath + '/system/verification',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(to_send),
                success: function(d){
                    if (d[0].result > 0){
                    	show_err_msg('获取成功');
                    } else {
                    	show_err_msg('获取验证码失败');
              
                    }
                },
                error: function(e){
                }
            })

		}else{
			show_err_msg('用户名不能为空！');
			return false;
		}
		
	});
	
	 function doLoop()
	 {
	 nums--;
	 if(nums > 0){
	  btn.value = nums+'秒后可重新获取';
	 }else{
	  clearInterval(clock); //清除js定时器
	  btn.disabled = false;
	  btn.value = '点击发送验证码';
	  nums = 10; //重置时间
	 }
	 }
	 
	 
	 $("#conf_btn").click(function(){
		 var email = $("#email").val();
		 var ver = $("#ver").val();
		 var pass = $("#pass").val();
		 var password= $("#password").val();
		 if(email==''){
			 show_err_msg('邮箱不能为空！');
			 return false;
		 }else if(ver==''){
			 show_err_msg('验证码不能为空！');
			 return false;
		 }else if(pass==''){
			 show_err_msg('密码不能为空！');
			 return false;
		 }else if(password==''){
			 show_err_msg('确认密码不能为空！');
			 return false;
		 }else if(pass!= password){
			 show_err_msg('两次密码不一致');
			 return false;
		 }
		 
		 var to_send = {};
		 to_send.email = email;
		 to_send.ver = ver;
		 to_send.password = password;
		 $.ajax({
             url: realPath + '/system/updatePassWord',
             type: 'post',
             contentType: 'application/json;charset=utf-8',
             dataType: 'json',
             async: true,
             data: JSON.stringify(to_send),
             success: function(d){
                 if (d[0].result > 0){
                	 show_msg('修改成功',"" + realPath
								+ "/kolLogin");
                	 localtion.href("");
                 } else {
                 	show_err_msg('获取验证码失败');
           
                 }
             },
             error: function(e){
             }
         })
	 });
	
});








