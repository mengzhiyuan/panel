 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){
 
	var type;
	searchWj();
	//查询所有问卷
	function searchWj(){
		var datas= {
			//email : sessionStorage.getItem("surveyName")
			email : '3228979148@qq.com'
		}
		$.ajax({
			url : "" + realPath + "/questionnaire/searchWjTitle",
			type : "post",
			dataType : "json",
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(datas),
			async : true,
			success : function(data) {
				var object = data[0].result;
				var selectid=document.getElementById("sevry");
				for(var i=1;i<=object.length;i++){
					selectid[i]=new Option(object[i-1].title,object[i-1].wjId);
				}
				
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		});
	}
	//查询某个问卷下的题目
	document.getElementById("sevry").onchange=function(){
	    var datas= {
	    		survey : $(this).val()
			}
			$.ajax({
				url : "" + realPath + "/questionnaire/SearchwjQuestion",
				type : "post",
				dataType : "json",
				contentType : "application/JSON;charset=utf-8",
				data : JSON.stringify(datas),
				async : true,
				success : function(data) {
					var object = data[0].result;
					var selectid=document.getElementById("question");
					for(var i=1;i<=object.length;i++){
						selectid[i]=new Option("第"+object[i-1].itemIndex+"题",object[i-1].itemId);
					}
					
				},
				error : function(d1, d2, d3) {
					console.log(d1);
					console.log(d2);
					console.log(d3);
				}
			});
	}
	//某个题目分析
	document.getElementById("question").onchange=function(){
		var data = {
				surveyId : 163
			};
			$.ajax({
				url : "" + realPath + "/questionnaire/dataAnalysis",
				type : "post",
				dataType : "json",
				contentType : "application/JSON;charset=utf-8",
				async : true,
				data : JSON.stringify(data),
				success : function(data) {
					alert(data);
				},
				error : function(d1, d2, d3) {
					console.log(d1);
					console.log(d2);
					console.log(d3);
				}
			});
	}

});








