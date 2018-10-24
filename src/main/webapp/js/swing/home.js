var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(function() {
	function setCookie(name, value, time) {
		var strsec = getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec * 1);
		document.cookie = name + "=" + escape(value) + ";expires="
				+ exp.toGMTString();
	}
	function getsec(str) {
		var str1 = str.substring(1, str.length) * 1;
		var str2 = str.substring(0, 1);
		if (str2 == "s") {
			return str1 * 1000;
		} else if (str2 == "h") {
			return str1 * 60 * 60 * 1000;
		} else if (str2 == "d") {
			return str1 * 24 * 60 * 60 * 1000;
		}
	}
	$('body').on('click','.progress_btn',function() {
		sessionStorage.setItem('survey_id', $(this).parent().parent()
				.find("td").eq(0).attr("survey"))
		window.location.href = "./design.html";
	})
	$('body').on('click','.progress_btn_list',function() {
		sessionStorage.setItem('survey_id', $(this).parent().attr("survey"));
		window.location.href = "./design.html";
	})
	$('body').on('click','.edit_btn_list',function() {
		sessionStorage.setItem('survey_id', $(this).parent().parent().attr("survey"));
		window.location.href = "./design.html";
	})
	
	
	$('body').on('click','.setting_btn',function() {
		sessionStorage.setItem('survey_id', $(this).parent().parent().find("td").eq(0).attr("survey"))
		window.location.href = "./collect.html";
	})
	
	$('body').on('click','.setting_btn_list',function() {
		sessionStorage.setItem('survey_id', $(this).parent().parent().find("td").eq(0).attr("survey"))
		window.location.href = "./collect.html";
	})
	
	
	$('body').on('click','.statistcs_btn',function() {
		sessionStorage.setItem('survey_id', $(this).parent().parent().find("td").eq(0).attr("survey"));
		window.location.href = "./statistics.html";
	})
	$('body').on('click','.statistcs_btn_list',function() {
		sessionStorage.setItem('survey_id', $(this).parent().parent().find("td").eq(0).attr("survey"));
		window.location.href = "./statistics.html";
	})
	
	
	$('body').on('click','.open_btn',function() {
		// sessionStorage.setItem('survey_id',$(this).parent().parent().find("td").eq(0).attr("survey"))
		setCookie("survey_id", $(this).parent().parent().find("td").eq(
				0).attr("survey"), "h3");
		window.location.href = "./preview.html";
	})
	$('body').on('click','.copy_btn',function() {
				var to_send = {};
				to_send.survey_id = $(this).parent().parent().find("td").eq(0)
						.attr("survey");
				$.ajax({
					type : "post",
					url : "" + realPath + "/survey/copy_survey",
					dataType : 'json',
					async : true,
					contentType : "application/JSON;charset=utf-8",
					data : JSON.stringify(to_send),
					success : function(data) {
						sessionStorage.setItem('survey_id', data[0].survey_id);
						window.location.href = "./design.html";
					}
				});
			})
	$('body').on('click','.trash_btn',function() {
				var to_send = {};
				to_send.survey_id = $(this).parent().parent().find("td").eq(0)
						.attr("survey");
				$.ajax({
					type : "post",
					url : "" + realPath + "/survey/trash_survey",
					dataType : 'json',
					async : true,
					contentType : "application/JSON;charset=utf-8",
					data : JSON.stringify(to_send),
					success : function(data) {
						window.location.href = "./home.html";
					}
				});
			})
	$('body').on('click','#empty_data',function() {
				var to_send = {};
				to_send.survey_id = $(this).parent().parent().parent().parent()
						.parent().find("td").eq(0).attr("survey")
				$.ajax({
					type : "post",
					url : "" + realPath + "/survey/empty_data",
					dataType : 'json',
					async : true,
					contentType : "application/JSON;charset=utf-8",
					data : JSON.stringify(to_send),
					success : function(data) {
						alert("清空数据成功");
					}
				});
			})
	$('body').on('click','#export_questionnaire',function() {
				sessionStorage.setItem('survey_id', $(this).parent().parent()
						.parent().parent().parent().find("td").eq(0).attr(
								"survey"))
				window.location.href = "./design.html";
			})
	$('body').on('click','#print_questionnaire',function() {
				// sessionStorage.setItem('survey_id',$(this).parent().parent().parent().parent().parent().find("td").eq(0).attr("survey"))
				setCookie("survey_id", $(this).parent().parent().parent()
						.parent().parent().find("td").eq(0).attr("survey"),
						"h3");
				window.location.href = "./preview.html";
			})

	$("#names").html(
			JSON.parse(sessionStorage.getItem('information'))['iUserName']
					+ "，欢迎使用SWING首问调查平台!!!");
	/*var to_send = {};
	to_send.usr_email = JSON.parse(sessionStorage.getItem('information'))['iEmail'];
	$.ajax({
				type : "post",
				url : "" + realPath + "/survey/survey_search",
				dataType : 'json',
				async : true,
				contentType : "application/JSON;charset=utf-8",
				data : JSON.stringify(to_send),
				success : function(data) {
					var data = data[0].result;
					for (var i = 0; i < data.length; i++) {
						var nTime = (new Date().getTime() - data[i].createTime.time) / 1000;
						var day = parseInt(nTime / (24 * 60 * 60));// 计算整数天数
																	// =======================================
						var afterDay = nTime - day * 24 * 60 * 60;// 取得算出天数后剩余的秒数
						var hour = parseInt(afterDay / (60 * 60));// 计算整数小时数==================================
						var afterHour = nTime - day * 24 * 60 * 60 - hour * 60
								* 60;// 取得算出小时数后剩余的秒数
						var min = parseInt(afterHour / 60);// 计算整数分================================================
						var afterMin = parseInt(nTime - day * 24 * 60 * 60
								- hour * 60 * 60 - min * 60);// 取得算出分后剩余的秒数================
						var td4 = '';
						var li4 = '';
						var li1 = "<li style=\"margin-left: 20px;\" survey="+ data[i].wjId +"><span class=\"bt\">"+data[i].wjName+"</span>" ;
						var li2 = "<span class=\"nr\">"+day+"天"+hour+"小时"+min+"分"+afterMin+"秒前</span>";
						var li3 = "<span class=\"nr glyphicon glyphicon-asterisk progress_btn_list\" data-toggle=\"tooltip\ data-placement=\"top\" title=\"设计\"></span><div class=\"state\">";
							
						if (data[i].wjStatus === '1') {
							td4 = "<td><select class=\"form-control\" style=\"width:50%;margin-left:30%\"><option value=\"2\" selected=\"selected\">未发布</option><option value=\"1\">发布中</option><option value=\"3\">已结束</option></select></td>";
							li4 = "<span class=\"closed_icon\" style=\"color:#43BD4C\">发布</span> <em><span></span>";
						}else{
							td4 = "<td><select class=\"form-control\" style=\"width:50%;margin-left:30%\"><option value=\"2\">未发布</option><option value=\"1\" selected=\"selected\">发布中</option><option value=\"3\">已结束</option></select></td>";
							li4 = "<span class=\"closed_icon\"><i></i>未发布</span> <em><span></span>";
						}
						var li5 = data[i].wjPageviews+"份数据</em></div>";
						var li6 = "<div class=\"operate_bar dropup\"><a class=\"jf_ico edit_btn_list\"> <i class=\"glyphicon glyphicon-edit btn-lg\"></i>";
						var li7 = "<span>编辑</span></a> <a class=\"jf_ico setting_btn_list\"> <i class=\"glyphicon glyphicon-text-height btn-lg\"></i> <span>发布</span>";
						var li8 = "</a> <a class=\"jf_ico statistcs_btn_list\"> <i class=\"glyphicon glyphicon-barcode btn-lg\"></i> <span>数据</span></a>";
						var li9 = "<div class=\"btn-group dropup\" style=\"margin-top:20px;\">";
						var li10 = "<button class=\"btn btn dropdown-toggle\" data-toggle=\"dropdown\" title=\"更多\"><i class=\"glyphicon glyphicon-circle-arrow-up\"></i></button>";
						var li11 = "<ul class=\"dropdown-menu\" role=\"menu\">";
						var li12 = "<li><a href=\"#\">预览</a></li>";
						var li13 = "<li><a href=\"#\">复制</a></li>";
						var li14 = "<li><a href=\"#\">删除</a></li>";
						var li15 = "<li><a href=\"#\">提醒</a></li>";
						var li16 = "<li><a href=\"#\">分享</a></li>";
						var li17 = "<li><a href=\"#\">清空数据</a></li>";
						var li18 = "<li><a href=\"#\">导出问卷</a></li>";
						var li19 = "<li><a href=\"#\">打印问卷</a></li>";
						var li20 = "</ul> </div> </div> </li> ";
						$("#listHz").append(li1+li2+li3+li4+li5+li6+li7+li8+li9+li10+li11+li12+li13+li14+li15+li16+li17+li18+li19+li20);
						
						var tr = "<tr style=\"height: 51px;border-bottom: 1px solid #ebebeb;font-size: 13px;color: #767676;\"> ";
						var td1 = "<td survey=" + data[i].wjId + ">" + i + 1
								+ "</td>";
						var year = data[i].createTime.year + 1990;
						var month = data[i].createTime.month + 1;
						var date = data[i].createTime.date;
						var td2 = "<td> <a>" + data[i].wjName
								+ "</a><span>[ID:" + data[i].wjId
								+ "]</span> <p>" + year + "-" + month + "-"
								+ date + "    " + data[i].createTime.hours
								+ ":" + data[i].createTime.minutes
								+ " </p> </td>"
						if (data[i].updateTime !== null) {
							var year1 = data[i].updateTime.year + 1990;
							var month1 = data[i].updateTime.month + 1;
							var td3 = "<td>" + year1 + "-" + month1 + "-"
									+ data[i].updateTime.date + "    "
									+ data[i].updateTime.hours + ":"
									+ data[i].updateTime.minutes + " </td>";
						} else {
							var td3 = "<td> </td>";
						}
						var td5 = "<td>" + data[i].wjPageviews + "/" + 0
								+ "</td>";
						var td6 = "<td><button class=\"btn btn-xs progress_btn\" title=\"设计\"><i class=\"glyphicon glyphicon-edit\"></i></button></td>";
						var td7 = "<td><button class=\"btn btn-xs setting_btn\" title=\"收集设置\"><i class=\"glyphicon glyphicon-text-height\"></i></button></td>";
						var td8 = "<td><button class=\"btn btn-xs  statistcs_btn\" title=\"数据管理\"><i class=\"glyphicon glyphicon-barcode\"></i></button></td>";
						var td9 = "<td><button class=\"btn btn-xs open_btn\" title=\"预览\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>"
								+ "<button class=\"btn btn-xs copy_btn\" title=\"复制\"><i class=\"glyphicon glyphicon-road\"></i></button> "
								+ "<button class=\"btn btn-xs trash_btn\" title=\"删除\"><i class=\"glyphicon glyphicon-trash \"></i></button>"
								+ "<span class=\"glyphicon glyphicon-folder-open\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"文件夹\"></span> "
								+ " <span style=\"font-size:18px\" class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">"
								+ "... <span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"#\">提醒</a></li>"
								+ "<li><a href=\"#\">分享</a></li><li><a href=\"#\">模板</a></li><li><a href=\"#\" id=\"empty_data\">清空数据</a></li>"
								+ "<li><a href=\"#\" id=\"export_questionnaire\">导出问卷</a></li><li><a href=\"#\" id=\"print_questionnaire\">打印问卷</a></li><li><a href=\"#\">重命名</a></li></ul></span></td></tr>";
						$("#tbody").append( tr + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + td9);
					}// //-----------------for

				}
			});*/
	init('','');
	$('body').on('change','.filed_order',function() {
		init($(this).val(),$("#keyWord").val());
	})
	$('body').on('change','.status_chan',function() {
		var to_send = {};
		to_send.status = $(this).val();
		to_send.survey_id = $(this).parent().parent().find("td").eq(0).attr("survey");
		$.ajax({
			type : "post",
			url : "" + realPath + "/survey/update_status",
			dataType : 'json',
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(to_send),
			success : function(data) {
				alert('修改成功');
			}
		})
	})
	$('body').on('click','#search',function() {
		init($(".filed_order").val(),$("#keyWord").val());
	})
	function init(order,keyWord){
		var to_send = {};
		to_send.usr_email = JSON.parse(sessionStorage.getItem('information'))['iEmail'];
		to_send.order = order;
		to_send.keyWord = $("#keyWord").val();
		$.ajax({
			type : "post",
			url : "" + realPath + "/survey/survey_search",
			dataType : 'json',
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(to_send),
			success : function(data) {
				$("#listHz").find("li").not(":eq(0)").remove(); 
				$("#tbody").empty(); 
				var data = data[0].result;
				for (var i = 0; i < data.length; i++) {
					var nTime = (new Date().getTime() - data[i].createTime.time) / 1000;
					var day = parseInt(nTime / (24 * 60 * 60));// 计算整数天数
																// =======================================
					var afterDay = nTime - day * 24 * 60 * 60;// 取得算出天数后剩余的秒数
					var hour = parseInt(afterDay / (60 * 60));// 计算整数小时数==================================
					var afterHour = nTime - day * 24 * 60 * 60 - hour * 60
							* 60;// 取得算出小时数后剩余的秒数
					var min = parseInt(afterHour / 60);// 计算整数分================================================
					var afterMin = parseInt(nTime - day * 24 * 60 * 60
							- hour * 60 * 60 - min * 60);// 取得算出分后剩余的秒数================
					var td4 = '';
					var li4 = '';
					var li1 = "<li style=\"margin-left: 20px;\" survey="+ data[i].wjId +"><span class=\"bt\">"+data[i].wjName+"</span>" ;
					var li2 = "<span class=\"nr\">"+day+"天"+hour+"小时"+min+"分"+afterMin+"秒前</span>";
					var li3 = "<span class=\"nr glyphicon glyphicon-asterisk progress_btn_list\" data-toggle=\"tooltip\ data-placement=\"top\" title=\"设计\"></span><div class=\"state\">";
						
					if (data[i].wjStatus === '1') {
						td4 = "<td><select class=\"form-control status_chan\" style=\"width:50%;margin-left:30%\"><option value=\"2\">未发布</option><option value=\"1\" selected=\"selected\">发布中</option><option value=\"3\">已结束</option></select></td>";
						li4 = "<span class=\"closed_icon\" style=\"color:#43BD4C\">发布</span> <em><span></span>";
					}else{
						td4 = "<td><select class=\"form-control status_chan\" style=\"width:50%;margin-left:30%\"><option value=\"2\" selected=\"selected\">未发布</option><option value=\"1\">发布中</option><option value=\"3\">已结束</option></select></td>";
						li4 = "<span class=\"closed_icon\"><i></i>未发布</span> <em><span></span>";
					}
					var li5 = data[i].wjPageviews+"份数据</em></div>";
					var li6 = "<div class=\"operate_bar dropup\"><a class=\"jf_ico edit_btn_list\"> <i class=\"glyphicon glyphicon-edit btn-lg\"></i>";
					var li7 = "<span>编辑</span></a> <a class=\"jf_ico setting_btn_list\"> <i class=\"glyphicon glyphicon-text-height btn-lg\"></i> <span>发布</span>";
					var li8 = "</a> <a class=\"jf_ico statistcs_btn_list\"> <i class=\"glyphicon glyphicon-barcode btn-lg\"></i> <span>数据</span></a>";
					var li9 = "<div class=\"btn-group dropup\" style=\"margin-top:20px;\">";
					var li10 = "<button class=\"btn btn dropdown-toggle\" data-toggle=\"dropdown\" title=\"更多\"><i class=\"glyphicon glyphicon-circle-arrow-up\"></i></button>";
					var li11 = "<ul class=\"dropdown-menu\" role=\"menu\">";
					var li12 = "<li><a href=\"#\">预览</a></li>";
					var li13 = "<li><a href=\"#\">复制</a></li>";
					var li14 = "<li><a href=\"#\">删除</a></li>";
					var li15 = "<li><a href=\"#\">提醒</a></li>";
					var li16 = "<li><a href=\"#\">分享</a></li>";
					var li17 = "<li><a href=\"#\">清空数据</a></li>";
					var li18 = "<li><a href=\"#\">导出问卷</a></li>";
					var li19 = "<li><a href=\"#\">打印问卷</a></li>";
					var li20 = "</ul> </div> </div> </li> ";
					$("#listHz").append(li1+li2+li3+li4+li5+li6+li7+li8+li9+li10+li11+li12+li13+li14+li15+li16+li17+li18+li19+li20);
					
					var tr = "<tr style=\"height: 51px;border-bottom: 1px solid #ebebeb;font-size: 13px;color: #767676;\"> ";
					var td1 = "<td survey=" + data[i].wjId + ">" + i + 1
							+ "</td>";
					var year = data[i].createTime.year + 1990;
					var month = data[i].createTime.month + 1;
					var date = data[i].createTime.date;
					var td2 = "<td> <a>" + data[i].wjName
							+ "</a><span>[ID:" + data[i].wjId
							+ "]</span> <p>" + year + "-" + month + "-"
							+ date + "    " + data[i].createTime.hours
							+ ":" + data[i].createTime.minutes
							+ " </p> </td>"
					if (data[i].updateTime !== null) {
						var year1 = data[i].updateTime.year + 1990;
						var month1 = data[i].updateTime.month + 1;
						var td3 = "<td>" + year1 + "-" + month1 + "-"
								+ data[i].updateTime.date + "    "
								+ data[i].updateTime.hours + ":"
								+ data[i].updateTime.minutes + " </td>";
					} else {
						var td3 = "<td> </td>";
					}
					var td5 = "<td>" + data[i].wjPageviews + "/" + 0
							+ "</td>";
					var td6 = "<td><button class=\"btn btn-xs progress_btn\" title=\"设计\"><i class=\"glyphicon glyphicon-edit\"></i></button></td>";
					var td7 = "<td><button class=\"btn btn-xs setting_btn\" title=\"收集设置\"><i class=\"glyphicon glyphicon-text-height\"></i></button></td>";
					var td8 = "<td><button class=\"btn btn-xs  statistcs_btn\" title=\"数据管理\"><i class=\"glyphicon glyphicon-barcode\"></i></button></td>";
					var td9 = "<td><button class=\"btn btn-xs open_btn\" title=\"预览\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>"
							+ "<button class=\"btn btn-xs copy_btn\" title=\"复制\"><i class=\"glyphicon glyphicon-road\"></i></button> "
							+ "<button class=\"btn btn-xs trash_btn\" title=\"删除\"><i class=\"glyphicon glyphicon-trash \"></i></button>"
							+ "<span class=\"glyphicon glyphicon-folder-open\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"文件夹\"></span> "
							+ " <span style=\"font-size:18px\" class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">"
							+ "... <span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"#\">提醒</a></li>"
							+ "<li><a href=\"#\">分享</a></li><li><a href=\"#\">模板</a></li><li><a href=\"#\" id=\"empty_data\">清空数据</a></li>"
							+ "<li><a href=\"#\" id=\"export_questionnaire\">导出问卷</a></li><li><a href=\"#\" id=\"print_questionnaire\">打印问卷</a></li><li><a href=\"#\">重命名</a></li></ul></span></td></tr>";
					$("#tbody").append( tr + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + td9);
				}// //-----------------for

			}
		});
	}
});