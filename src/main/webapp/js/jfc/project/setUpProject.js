var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(window).on('beforeunload', clearSession);
function clearSession(){
	sessionStorage.removeItem("proId"); 
	sessionStorage.removeItem("quoId"); 
	sessionStorage.removeItem("taskId"); 
}
$('#back').on('click',function(event){
    document.location.href = './setUpProjectList.html';
});
$('#see').on('click',function(event){
	sessionStorage.setItem("quotationId", sessionStorage.getItem("quoId"));
    window.location.href = "/jfcpanel/html/jfc/project/quotationEdit.html";
});
$(function() {

    //根据method决定是否disabled
    var method = sessionStorage.getItem('method');

    if (method === 'readOnly'){
    	$('input').prop('disabled', true);
    	$('select').prop('disable', true);
    	$('button').prop('disabled', true);
        setTimeout(function(){
        	$('input').prop('disabled', true);
        	$('select').prop('disable', true);
        	$('button').prop('disabled', true);
        },1000);
        setTimeout(function(){
        	$('input').prop('disabled', true);
        	$('select').prop('disable', true);
        	$('button').prop('disabled', true);
        },2000);
        setTimeout(function(){
        	$('input').prop('disabled', true);
        	$('select').prop('disable', true);
        	$('button').prop('disabled', true);
        },3000)
    }

	function timeToString(dataTime){
		if (dataTime != null) {
			birthday = dataTime.time;
			birthday = new Date(birthday);
			var birth_month = birthday.getMonth() + 1;
			if (birth_month < 10)
				birth_month = "0" + birth_month;
			birthday = birthday.getFullYear() + "-" + birth_month + "-"
					+ birthday.getDate();
			return birthday;
		}else{
			return "";
		}
	}
	//回显数据
	if(sessionStorage.getItem("proId")!=null){
		var to_send = {};
		to_send.proId = sessionStorage.getItem("proId");
		$.ajax({
			url : "" + realPath + "/setUpProject/singleSetUp",
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
		    data:JSON.stringify(to_send), 
			success : function(data) {
				var result = data[0]['result'][0];
				var data = data[0]['jfcStaff'];
				for (var i = 0; i < data.length; i++) {
					var staPhone = data[i].staPhone;
					var staEmail = data[i].staEmail;
					var staTel = data[i].staTel;
					if (staPhone == '' || staPhone == null) {
						staPhone = 'null';
					}
					if (staEmail == '' || staEmail == null) {
						staEmail = 'null';
					}
					if (staTel == '' || staTel == null) {
						staTel = 'null';
					}
					var s = data[i].staId + "," + staPhone + "," + staEmail
							+ "," + staTel + "," + data[i].staName;
					$(".selectpicker").append(
							"<option value=\"" + s + "\" >" + data[i].staName
									+ "</option>");
				}
				$('.selectpicker').selectpicker('refresh');
				
				
				$(".proName").val(result.proName);
				$("#select").find("option").each(function(){//proMember
					var val = $(this).val();
					if(result.staId==val.split(",")[0]){//1,null,25648456@qq.com,010-45455466,孟志远
						$('#select').selectpicker('val',$(this).val());
						//项目成员
						$("#the_pro").find("tr:eq(0)").find("td:eq(1)").find("input").val(val.split(",")[4]);
						$("#the_pro").find("tr:eq(0)").find("td:eq(2)").find("input").val(val.split(",")[3]);
						$("#the_pro").find("tr:eq(0)").find("td:eq(3)").find("input").val(val.split(",")[2]);
						$("#the_pro").find("tr:eq(0)").find("td:eq(4)").find("input").val(val.split(",")[1]);
						return false;
					}
				});
				//立项时间
				$("#createTime").val(timeToString(result.proCreateTime));
				//项目要求
				//var proRequirement =JSON.parse(result.proRequirement)[0];
				$(".objective").val(result.objective);
				$(".type").val(result.type);
			    $(".investigation").val(result.investigation);
				$(".tools").val(result.tools);
			    $(".city").val(result.city);
				$(".sample").val(result.sample);
				$(".accessLength").val(result.accesslength);
				$(".others").val(result.others);
				$(".remarks").val(result.remarks);
				$(".respondents").val(result.respondents);
				$(".dataResult").val(result.dataresult);
				$(".proOthers").val(result.proothers);
				$(".toReview").val(result.toreview);
				//项目成源
				var member =result.proMember;
				//("#time_table  tr").not(":eq("+index +")").
				$("#the_pro  tr").not(":eq(0)").each(function() {
					var thisi = $(this);
					var staId = ""; 
					for(var i=0;i<member.length;i++){
						if(member[i].memPost==thisi.find("td:eq(0)").html()){
							staId = member[i].staId;
							break;
						}
					}
					var ss = "";
					$("#select").find("option").each(function(){
						var val = $(this).val();
						if(staId==val.split(",")[0]){
							ss = val;
						}
					});
					$(this).attr("id",ss.split(",")[0]);
					$(this).find("td:eq(1)").find("select").selectpicker('val',ss);
					$(this).find("td:eq(2)").find("input").val(ss.split(",")[3]);
					$(this).find("td:eq(3)").find("input").val(ss.split(",")[2]);
					$(this).find("td:eq(4)").find("input").val(ss.split(",")[1]);
				});
				//配额
				var proQuota = JSON.parse(result.proQuota)[0];
				var col = proQuota.hang;
				var row = proQuota.lie;
				$("#quota").val(proQuota.quoName);
				var createTable = document.getElementById("createTable");
				createTable.innerHTML = '<table  class="table table-bordered table-hover"><tbody id="tables"></tbody></table>';
				var table = document.getElementById("tables");
				for (var i = 1; i <= col; i++) {
					var cols = document.createElement("tr");
					cols.id = i;
					for (var j = 1; j <= row; j++) {
						var cell = document.createElement("td");
						var textarea = document
								.createElement("textarea");
						textarea.className = 'textarea ';
						textarea
								.setAttribute("onpropertychange",
										"this.style.height = this.scrollHeight + 'px';");
						textarea
								.setAttribute("oninput",
										"this.style.height = this.scrollHeight + 'px';");
						cell.id = i + "/" + j;
						for(var m = 0;m<proQuota.list.length;m++){
							if(proQuota.list[m].id== (i + "/" + j)){
								textarea.value =proQuota.list[m].value;
								break;
							}
						}
						cell.appendChild(textarea);
						cols.appendChild(cell);
					}
					table.appendChild(cols);
				}
				//时间
				var proTime = result.proTime;
				var time_table =$("#time_table");
				$("#time_table tr").not(":eq(3)").remove();
				for(var i=0;i<proTime.length;i++){
					$("#time_table").prepend(
							"<tr><td><input type=\"text\" class=\"input\" value=\""+proTime[i].timProcess+"\"></td>"+
						"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(proTime[i].starTime)+"\"></td>"+
						"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(proTime[i].endTime)+"\"></td>"+
						"<td><input class=\"input\" value=\""+proTime[i].timDepart+"\"></td>"+
						"<td><input type=\"text\" class=\"input\" value=\""+proTime[i].timRemark+"\"></td></tr>"
					);
					
					timeRefresh();
				}
				//物品提交
				var goodsTable = result.proGoods;
				var time_table =$("#goodsTable");
				$("#goodsTable tr").not(":eq(3)").remove();
				for(var i=0;i<goodsTable.length;i++){
					$("#goodsTable").prepend(
							"<tr><td><input type=\"text\" class=\"input\" value=\""+goodsTable[i].gooContent+"\"></td>"+
						"<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(goodsTable[i].gooTime)+"\"></td>"+
						"<td><input class=\"input\" value=\""+goodsTable[i].gooRemark+"\"></td>"
					);
					
					timeRefresh();
				}
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		})
	}else{
		init();
	}
	
	timeRefresh();
	function timeRefresh() {
		lay('.test_item').each(function() {
			laydate.render({
				elem : this,
				trigger : 'click'
			});
		});
	}

	$('.span1').mouseover(function() {
		var col = $(this).attr('col');
		var row = $(this).attr('row');
		$("#spa").attr('col', col);
		$("#spa").attr('row', row);
		$("#spa").html(col + "*" + row);
		$('#spa').css('color', '#27a9e3');
		$('#spa').css('margin-left', '10px');
		$('.span1').each(function() {
			if ($(this).attr('col') <= col && $(this).attr('row') <= row) {
				$(this).css('background-color', '#27a9e3');
			} else {
				$(this).css('background-color', 'transparent')
			}
		});
	});
	$(".spas").hide();
	$('.span1').mouseout(function() {
		$('.span1').css('background-color', 'transparent');
		$("#spa").html("");
	});
	$(".show").mouseover(function() {
		$(".spas").show();
	});
	// 创建
	$('.span1')
			.click(
					function() {
						var col = $(this).attr('col');
						var row = $(this).attr('row');
						$(".spas").hide();
						var createTable = document
								.getElementById("createTable");
						createTable.innerHTML = '<table  class="table table-bordered table-hover"><tbody id="tables"></tbody></table>';
						var table = document.getElementById("tables");
						for (var i = 1; i <= col; i++) {
							var cols = document.createElement("tr");
							cols.id = i;
							for (var j = 1; j <= row; j++) {
								var cell = document.createElement("td");
								var textarea = document
										.createElement("textarea");
								textarea.className = 'textarea ';
								textarea
										.setAttribute("onpropertychange",
												"this.style.height = this.scrollHeight + 'px';");
								textarea
										.setAttribute("oninput",
												"this.style.height = this.scrollHeight + 'px';");
								cell.id = i + "/" + j;
								cell.appendChild(textarea);
								cols.appendChild(cell);
							}
							table.appendChild(cols);
						}

					});
	// 添加行
	$(".addRow")
			.click(
					function() {
						var row = document.getElementById("tables").insertRow(
								document.getElementById("tables").rows.length);
						var rowCount = document.getElementById("tables").rows.length;
						var countCell = document.getElementById("tables").rows
								.item(0).cells.length;
						row.id = rowCount;
						for (var i = 0; i < countCell; i++) {
							var cell = row.insertCell(i);
							var textarea = document.createElement("textarea");
							textarea.className = 'textarea ';
							textarea
									.setAttribute("onpropertychange",
											"this.style.height = this.scrollHeight + 'px';");
							textarea
									.setAttribute("oninput",
											"this.style.height = this.scrollHeight + 'px';");
							cell.id = (rowCount) + "/" + (i + 1);
							cell.appendChild(textarea);
						}
					});
	// 删除行
	$(".deleteRow")
			.click(
					function() {
						document
								.getElementById("tables")
								.deleteRow(
										document
												.getElementById(document
														.getElementById("tables").rows.length).rowIndex);
					});
	/* 添加列，采用insertCell(列位置)方法 */
	$(".addCell")
			.click(
					function() {
						/*
						 * document.getElementById("table").rows.item(0).cells.length
						 * 用来获得表格的列数
						 */
						var countCell = document.getElementById("tables").rows
								.item(0).cells.length;

						for (var i = 0; i < document.getElementById("tables").rows.length; i++) {
							var cell = document.getElementById("tables").rows[i]
									.insertCell(countCell);
							var textarea = document.createElement("textarea");
							textarea.className = 'textarea ';
							textarea
									.setAttribute("onpropertychange",
											"this.style.height = this.scrollHeight + 'px';");
							textarea
									.setAttribute("oninput",
											"this.style.height = this.scrollHeight + 'px';");
							cell.id = (i + 1) + "/" + (countCell + 1);
							cell.appendChild(textarea);
						}
					});
	/* 删除列，采用deleteCell(列位置)的方法 */
	$(".removeCell")
			.click(
					function() {
						var countCell = document.getElementById("tables").rows
								.item(0).cells.length;
						for (var i = 0; i < document.getElementById("tables").rows.length; i++) {
							document.getElementById("tables").rows[i]
									.deleteCell((countCell - 1));
						}
					});

	$('.input').bind('input propertychange', function() {
		var $this = $(this);
		console.log($this);
		var text_length = $this.val().length;// 获取当前文本框的长度
		var current_width = parseInt(text_length) * 16;// 该16是改变前的宽度除以当前字符串的长度,算出每个字符的长度
		console.log(current_width)
		$this.css("width", current_width + "px");
	});

	// 添加行
	$(".addTime").click(
			function() {
				var row = document.getElementById("time_table").insertRow(
						document.getElementById("time_table").rows.length - 1);
				var countCell = document.getElementById("time_table").rows
						.item(0).cells.length;
				for (var i = 0; i < countCell; i++) {
					if (i == 1 || i == 2) {
						var cell = row.insertCell(i);
						var input = document.createElement("input");
						input.className = 'form-control test_item';
						input.setAttribute("type", "text");
						input.setAttribute("placeholder", "请输入日期");
						cell.appendChild(input);
					} else {
						var cell = row.insertCell(i);
						var input = document.createElement("input");
						input.className = 'input ';
						input.setAttribute("type", "text");
						cell.appendChild(input);
					}

				}
				timeRefresh();
			});
	// 删除行
	$(".removetime").click(function() {
		var tr = $("#time_table").find("tr:eq(-2)")
		tr.remove();
	});

	// 添加行
	$(".addGoods").click(
			function() {
				var row = document.getElementById("goodsTable").insertRow(
						document.getElementById("goodsTable").rows.length - 1);
				var countCell = document.getElementById("goodsTable").rows
						.item(0).cells.length;
				for (var i = 0; i < countCell; i++) {
					if (i == 1) {
						var cell = row.insertCell(i);
						var input = document.createElement("input");
						input.className = 'form-control test_item';
						input.setAttribute("type", "text");
						input.setAttribute("placeholder", "请输入日期");
						cell.appendChild(input);
					} else {
						var cell = row.insertCell(i);
						var input = document.createElement("input");
						input.className = 'input ';
						cell.appendChild(input);
					}

				}
				timeRefresh();
			});
	// 删除行
	$(".removeGoods").click(function() {
		var tr = $("#goodsTable").find("tr:eq(-2)")
		tr.remove();
	});
	/**
	 * 首页访问
	 */
	
	function init() {
		$.ajax({
			url : "" + realPath + "/setUpProject/init",
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
			success : function(data) {
				$("#select").html("");
				$(".proNumber").val(data[0]['pronumber']);
				var data = data[0]['jfcStaff'];
				for (var i = 0; i < data.length; i++) {
					var staPhone = data[i].staPhone;
					var staEmail = data[i].staEmail;
					var staTel = data[i].staTel;
					if (staPhone == '' || staPhone == null) {
						staPhone = 'null';
					}
					if (staEmail == '' || staEmail == null) {
						staEmail = 'null';
					}
					if (staTel == '' || staTel == null) {
						staTel = 'null';
					}
					var s = data[i].staId + "," + staPhone + "," + staEmail
							+ "," + staTel + "," + data[i].staName;
					$(".selectpicker").append(
							"<option value=\"" + s + "\" >" + data[i].staName
									+ "</option>");
				}
				$('.selectpicker').selectpicker('refresh');
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		})
	}
	// 改变事件
	$("#select").change(function() {
		var info = $(this).val().split(",");
		var tdArr = $("#the_pro tr:eq(0)").children();
		$("#the_pro tr:eq(0)").attr("id", info[0]);
		tdArr.eq(1).find('input').val(info[4]);
		tdArr.eq(2).find('input').val(info[1]);
		tdArr.eq(3).find('input').val(info[2]);
		tdArr.eq(4).find('input').val(info[3]);
	});
	$(".selectpicker").change(function() {
		if ($(this).attr("id") == "select") {
			return;
		}
		var info = $(this).val().split(",");
		var tdArr = $(this).parent().parent().parent().children();
		$(this).parent().parent().parent().attr("id", info[0]);
		tdArr.eq(1).find('input').val(info[4]);
		tdArr.eq(2).find('input').val(info[1]);
		tdArr.eq(3).find('input').val(info[2]);
		tdArr.eq(4).find('input').val(info[3]);
	});

	$(".create_button").click(function() {
		var data = {};
		data.proId = sessionStorage.getItem("proId");
        data.quoId = sessionStorage.getItem('quoId');
		data.proName = $(".proName").val();
		data.proManager = $("#select").val();
		data.proCreateTime = $("#createTime").val();
		data.proNumber = $(".proNumber").val();
		//var proRequirement = {};
		data.objective = $(".objective").val();
		data.type = $(".type").val();
		data.investigation = $(".investigation").val();
		data.tools = $(".tools").val();
		data.city = $(".city").val();
		data.sample = $(".sample").val();
		data.accessLength = $(".accessLength").val();
		data.others = $(".others").val();
		data.remarks = $(".remarks").val();
		data.respondents = $(".respondents").val();
		data.dataResult = $(".dataResult").val();
		data.proOthers = $(".proOthers").val();
		data.toReview = $(".toReview").val();
		// 项目要求
		//data.proRequirement = proRequirement;
		// 项目成员
        data.project_manager_id = $('#select').val().split(',')[0];

		var proMember = [];
		$("#the_pro").find("tr").each(function() {
			var member = {};
			if (typeof ($(this).attr("id")) != "undefined") {
				member.staId = $(this).attr("id");
				member.post = $(this).find("td:first").html();
				proMember.push(member);
			}

		});
		data.proMember = proMember;
		// 配额设置
		var proQuota = {};
		proQuota.quoName = $("#quota").val();

		var list = [];
		$("#tables  tr").find("td").each(function() {
			var option = {};
			option.id = $(this).attr("id");
			option.value = $(this).children().val();
			list.push(option);
		});
		proQuota.list = list;
		proQuota.hang = $("#tables").find("tr").length;
		proQuota.lie = $("#tables").find("tr:first").find("td").length;
		data.proQuota = proQuota;
		// 时间要求
		var timeRequirements = [];
		var index = $("#time_table").find("tr").length-1;
		$("#time_table  tr").not(":eq("+index +")").each(function() {
			var timeRequList = [];
			$(this).find("td").each(function(){
				timeRequList.push($(this).find("input").val());
			});
			timeRequirements.push(timeRequList);
		});
		data.timeRequirements = timeRequirements;
		//物品管理
		var goodsSubmit = [];
		var indexs = $("#goodsTable").find("tr").length-1;
		$("#goodsTable  tr").not(":eq("+index +")").each(function() {
			var goodsRequList = [];
			$(this).find("td").each(function(){
				goodsRequList.push($(this).find("input").val());
			});
			goodsSubmit.push(goodsRequList);
		});
		data.goodsSubmit=goodsSubmit;
			$.ajax({
				url : "" + realPath + "/setUpProject/setUpProjectAdd",
				type : "post",
				dataType : "json",
				async : true,
				contentType : "application/JSON;charset=utf-8",
			    data:JSON.stringify(data), 
				success : function(datas) {
					if (datas[0].result > 0){
                        //document.location.href = './setUpProjectList.html'
						subtask();
                    } else {
                        alert('添加失败,请重试。')
                    }
				},
                error: function(err){
                    console.log(err);
                    alert('添加失败,请重试。')
                }
			});
		
	});
	$("#word_button").click(function(){
		var data = {};
		data.proId = sessionStorage.getItem("proId");
		$.ajax({
			url : "" + realPath + "/setUpProject/wordImport",
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
		    data:JSON.stringify(data), 
			success : function(datas) {
				alert(datas[0]['result']);
			}
		});
	});
	function subtask(){
		   var to_send = {
	                taskId: JSON.parse(sessionStorage.getItem('taskId')),
	                nominee:JSON.parse(sessionStorage.getItem('sysUser')).userName,//指定人员,缺少select
	                outcome: ''
	            };
	        $.ajax({
	            url: realPath + '/workflow/submitTask',
	            type: 'post',
	            contentType: 'application/json;charset=utf-8',
	            dataType: 'json',
	            data: JSON.stringify(to_send),
	            async: true,
	            success: function(data){
	                if (data[0].result >= 0){
	                	document.location.href = './setUpProjectList.html';
	                }else{
	                	alert("失败");
	                }
	            },
	            error: function(e){
	                alert('网络连接问题。')
	            }
	        })
	}
});
