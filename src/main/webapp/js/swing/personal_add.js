var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	var to_send = {};
	to_send.email =  JSON.parse(sessionStorage.getItem('information'))['iEmail'];
	$.ajax({
		type : "post",
		url : "" + realPath + "/contact/contact_add_search",
		dataType : 'json',
		async : true,
		contentType : "application/JSON;charset=utf-8",
		data : JSON.stringify(to_send),
		success : function(data) {
			var contact = data[0].result;
			for(var i=0;i<contact.length;i++){
				$(".add_filed").append("<label class=\"col-sm-3 control-label\">"+contact[i].addName+"</label>"+
						 "<div class=\"col-sm-9\">"+
						 "<input type=\"text\" class=\"form-control\" id=\" "+contact[i].addField+" \"></div>");
			}
			
		}
	});
	$("#submit").click(function(){
		var filed = $(".filed").val();
		if(filed==null || filed==''){
			$("#fi").html("字段名称不能为空");
			return false;
		}else{
			var aa = {};
            aa.filed =filed;
            aa.email = JSON.parse(sessionStorage.getItem('information'))['iEmail'];
            $.ajax({
                url:"http://10.0.0.12:8080/jfcpanel/contact/filed_add",
                type:"post",
                contentType : "application/JSON;charset=utf-8",
                data:JSON.stringify(aa),
                dataType:"json",
                success:function(data){
                	var result= data[0].result;
                	var filed = data[0].filed;
                	var value = data[0].value;
                	if(result===1){
                		$(".add_filed").append("<label class=\"col-sm-3 control-label\">"+value+"</label>"+
                							 "<div class=\"col-sm-9\">"+
                							 "<input type=\"text\" class=\"form-control\" id=\" "+filed+" \"></div>");
                	}
                }
            });
		}
	})
	
	$("#save").click(function(){
		var conName = $("#conName").val(); 
		var conCompany = $("#conCompany").val();
		var conPhone = $("#conPhone").val();
		var conSex = $("#conSex").val();
		var conBirthday = $("#conBirthday").val();
		var conPosition = $("#conPosition").val();
		var conEmail = $("#conEmail").val();
		var conTel = $("#conTel").val();
		var conRemark = $("#conRemark").val();
		var conAddress = $("#province").val()+","+$("#city").val()+","+$("#district").val()+","+$("#address").val();
		var redundant = [];
		if($(".add_filed").find(":input").length!=0){
			$(".add_filed").find(":input").each(function(){
				redundant.push($(this).attr("id")+","+$(this).val());
			});
		}
		
		var to_send = {};
		to_send.conName = conName;
		to_send.conCompany = conCompany;
		to_send.conPhone = conPhone;
		to_send.conSex = conSex;
		to_send.conBirthday = conBirthday;
		to_send.conPosition = conPosition;
		to_send.conEmail = conEmail;
		to_send.conTel = conTel;
		to_send.conRemark = conRemark;
		to_send.conAddress = conAddress;
		to_send.redundant = redundant;
		$.ajax({
		type : "post",
		url : "" + realPath + "/contact/contact_person",
		dataType : 'json',
		async : true,
		contentType : "application/JSON;charset=utf-8",
		data : JSON.stringify(to_send),
		success : function(data) {
			
		}
		});
	});
	
	
	
	
});















