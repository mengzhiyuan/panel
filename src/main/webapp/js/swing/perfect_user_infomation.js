var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	if(sessionStorage.getItem('information')!==null){
		var to_send = {};
		to_send.iEmail =  JSON.parse(sessionStorage.getItem('information'))['iEmail'];
		$.ajax({
			type : "post",
			url : "" + realPath + "/information/searInfomation",
			dataType : 'json',
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(to_send),
			success : function(data) {
				var result = data[0]['result'][0];
				if(data[0]['result'].length===1){
					$("#iEmail").val(result.iEmail);
					$("#iEmail").attr("iId",result.iId);
					$("#iPassword").val(result.iPassword);
					$("#iPhone").val(result.iPhone);
					$("#iUsername").val(result.iUserName);
					$("#iEmail").attr("disabled","disabled");
					$("#iPassword").attr("disabled","disabled");
					$("#iPhone").attr("disabled","disabled");
					$("#iUsername").attr("disabled","disabled");
				}
			}
		});
	}
	
	
	
	
	$("#perfect_user").click(function(){
		var iEmail  = $("#iEmail").val();
		var iId = $("#iEmail").attr("iId");
		var  iPassword = $("#iPassword").val();
		var  iPhone = $("#iPhone").val();
		var  iUsername = $("#iUsername").val();
		var iName  = $("#iName").val();
		var iIndustry  = $("#iIndustry").val();
		var iOccupation  = $("#iOccupation").val();
		var iCompany = $("#iCompany").val();
		var iDepartment  = $("#iDepartment").val();
		var iDemand  = $("#iDemand").val();
		var iIdentity  = $("#iIdentity").val();
		var iCity  = $("#iCity").val();
		var to_send = {};
		if(sessionStorage.getItem('information')===null){
			to_send.iEmail = iEmail;
			to_send.iPassword = iPassword;
			to_send.iPhone = iPhone;
			to_send.iUserName = iUsername;
			to_send.iId = "";
			
		}else{
			to_send.iId = iId;
		}
		to_send.iName = iName;
		to_send.iIndustry = iIndustry;
		to_send.iOccupation = iOccupation;
		to_send.iCompany = iCompany;
		to_send.iDepartment = iDepartment;
		to_send.iDemand = iDemand;
		to_send.iIdentity = iIdentity;
		to_send.iCity = iCity;
		$.ajax({
			type : "post",
			url : "" + realPath + "/information/savaOrUpdate",
			dataType : 'json',
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(to_send),
			success : function(data) {
				var result = data[0]['result'].result;
				if(result===1){
					window.location.href="./home.html"
				}
			}
		});
	});
});














