var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	$("#topLogin").html(JSON.parse(sessionStorage.getItem('sysUser')).userName+"，您好！欢迎您登陆SKY！");
	$("#topLogins").html(JSON.parse(sessionStorage.getItem('sysUser')).userName+"，您好！欢迎您登陆康派-KOLPanel！");
	 $("#out").click(function(){
	　　　var userAgent = navigator.userAgent;
			$.ajax({
		        url: realPath + '/home/init',
		        type: 'post',
		        dataType: 'json',
		        contentType: 'application/json;charset=utf-8',
		        async: true,
		        data: JSON.stringify({
		            email: JSON.parse(sessionStorage.getItem('sysUser')).email,
		            id: JSON.parse(sessionStorage.getItem('sysUser')).id,
		            nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName
		        }),
		        success: function(data){
		        	  let d = data;
		        	  var task = d[0]["task"];
		        	  if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
		  				
						   var mymessage=confirm("您有"+task.length+"任务待处理，确认关闭么？");  
						   if(mymessage==true)  
						    {  
							   top.location.href="about:blank";
						    }  
						    else if(mymessage==false)  
						    {  
						        return;
						    }  
						  
						} else {
						   window.opener = null;
						   window.open("您有"+task.length+"待处理，确认关闭么？", "_self");
						   window.close();
						}
		        	  
		        }
			});
			
	 });
	 
});



