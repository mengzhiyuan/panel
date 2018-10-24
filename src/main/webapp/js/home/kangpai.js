$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
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
var dat = {
		email: JSON.parse(sessionStorage.getItem('sysUser'))['email']
	};
	$.ajax({
		type : "post",
		url : "" + realPath + "/system/getUserByEmail",
		dataType : "json",
		contentType : "application/JSON;charset=utf-8",
		data : JSON.stringify(dat),
		success : function(data) {
			if (data[0]["userDeps"][0]["departmentKey"] == "") {
				show_err_msg('请先完善资料！');
			} else {
				$("#company").val(data[0]["userDeps"][0]["company"]);
				$('#departmentValue').val(data[0]["userDeps"][0]["departmentKey"]);
				
				$('#sex').val(data[0]["userDeps"][0]["sex"]);
				//$("#submit").attr("disabled",true);
				var birthday;
                if(data[0]["userDeps"][0]["birthday"]!=null){
                	birthday= data[0]["userDeps"][0]["birthday"]["time"];
                    birthday = new Date(birthday);
                    var birth_month = birthday.getMonth() + 1;
                    if (birth_month < 10) birth_month = "0" + birth_month;
                    birthday = birthday.getFullYear() + "-" + birth_month + "-" + birthday.getDate();
                    $('#calendar1').val(birthday);
                }
			}
		}
	});


// 完善注册
$('#submit').click(function() {
	if ($('#company').val() == '') {
		show_err_msg('公司还没填呢！');
		$('#company').focus();
	} else if ($('#departmentValue').val() == '') {
		show_err_msg('部门还没填呢！');
		$('#departmentValue').focus();
	} else if ($('#calendar1').val() == '') {
		show_err_msg('出生日期还没填呢！');
		$('#calendar1').focus();
	} else if ($('#sex').val() == '') {
		show_err_msg('性别还没填呢！');
		$('#sex').focus();
	} else {
		var dat = {
			email: JSON.parse(sessionStorage.getItem('sysUser'))['email'],
			company : $("#company").val(),
			departmentValue : $("#departmentValue").val(),
			sex : $("#sex").val(),
			birthday : $("#calendar1").val()
		};
		$.ajax({
			type : "post",
			url : "" + realPath + "/system/perfectRegister",
			dataType : "json",
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(dat),
			success : function(data) {
				if (data[0]["userDeps"] >= 1) {
					show_msg('完善成功！',"");
					top.location.href = realPath+"/home";
				} else {
					show_err_msg('注册失败！');
				}
			}
		});
	}
});