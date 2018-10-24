/**
 * Created by wangxiangyang on 2017/7/11.
 */
 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){
	
	var email = {};
	email.foxLoginEmail= JSON.parse(sessionStorage.getItem('sysUser')).email;
	 $.ajax({
         url: realPath + '/doctor/searchFoxMail',//路径待更正
         type: 'post',
         dataType: 'json',
         async: true,
         contentType: 'application/JSON;charset=utf-8',
         data: JSON.stringify(email),
         success: function (data) {
        	 var result = data[0].result;
        	 if(result!=null || result!=''){
        		$("#foxAccountNumber").val(result[0].foxAccountNumber);
        		$("#foxPassword").val(result[0].foxPassword);
            	$("#foxPickUp").val(result[0].foxPickUp);
            	$("#foxPickPort").val(result[0].foxPickPort);
            	$("#foxHairPiece").val(result[0].foxHairPiece);
            	$("#foxHairPort").val(result[0].foxHairPort);
            	$("#tbody").attr("foxId",result[0].foxId);
        	 }
         },
         error: function (d1, d2, d3) {
             console.log(d1);
             console.log(d2);
             console.log(d3);
         }
     })
     
     $("#submit").click(function(){
    	 var to_send = {};
    	 to_send.foxId=$("#tbody").attr("foxId");
    	 to_send.foxAccountNumber=$("#foxAccountNumber").val();
    	 to_send.foxPassword=$("#foxPassword").val();
    	 to_send.foxPickUp=$("#foxPickUp").val();
    	 to_send.foxPickPort=$("#foxPickPort").val();
    	 to_send.foxHairPiece=$("#foxHairPiece").val();
    	 to_send.foxHairPort=$("#foxHairPort").val();
    	 to_send.foxLoginEmail=JSON.parse(sessionStorage.getItem('sysUser')).email;
    	 $.ajax({
             url: realPath + '/doctor/insertFoxMail',//路径待更正
             type: 'post',
             dataType: 'json',
             async: true,
             contentType: 'application/JSON;charset=utf-8',
             data: JSON.stringify(to_send),
             success: function (data) {
            	 
             },
             error: function (d1, d2, d3) {
                 console.log(d1);
                 console.log(d2);
                 console.log(d3);
             }
         })
     });
})