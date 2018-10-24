var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
var dat = {
		saEmPerson: '姓名',
		saName:'抽样名称',
		saCondition:'抽样条件（大白话）',
		saAdmCondition:'抽样条件（系统）',
		saNumber:'抽样人数',
		saActualNumber:'实际抽样人数',
		saBatch:'批次',
		
		samKid:'项目主键',
		samDocId:['会员主键'],
	};
	$.ajax({
		type : "post",
		url : "" + realPath + "/management/samplingPreservation",
		dataType : "json",
		contentType : "application/JSON;charset=utf-8",
		data : JSON.stringify(dat),
		success : function(data) {
		}
	});
