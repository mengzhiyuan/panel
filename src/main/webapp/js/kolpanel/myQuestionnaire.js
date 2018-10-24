var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	if (sessionStorage.getItem("surveyName") == null) {
		location.href = realPath + "/wjLogin";
	}
	$("#download").click(function(){
		var data = {};
		data.survey = 187;
		$.ajax({
			url : "" + realPath + "/questionnaire/answerExceport",
			type : "post",
			dataType : "json",
			contentType : "application/JSON;charset=utf-8",
			async : true,
			data : JSON.stringify(data),
			success : function(data) {
				alert(data[0]['path']);
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		});
	});
    searchQuestion(1);
	//search();
	// 数据分析

	function search() {
		var data = {};
		
		var itemId = new Array();
		itemId.push(294);
		data.itemId = itemId;
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

	// 初始化
	function searchQuestion(page) {
		if (parseInt(page) > 0) {
			var page = page
		} else {
			var page = 1
		}
		var datas = {
			email : sessionStorage.getItem("surveyName"),
			countPage : 10,
			currentPage : (page - 1) * 10,
			keyword : $(".keyword").val() || ''
		};
		$.ajax({
			url : "" + realPath + "/questionnaire/searchWj",
			type : "post",
			dataType : "json",
			contentType : "application/JSON;charset=utf-8",
			async : true,
			data : JSON.stringify(datas),
			success : function(data) {
				displayQuestion(data, page);
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		});
	}

	// 表格渲染
	function displayQuestion(data, page) {
		var question = data[0]["result"], len = question.length, count = Math
				.ceil(data[0]["total"] / 10) || 1, node = document
				.getElementById("the_table"), i;
		node.innerHTML = '';
		for (i = 0; i < len; i++) {
			var tr = document.createElement("tr");
			var title = document.createElement("td");
			var type = document.createElement("td");
			var createTime = document.createElement("td");
			var schedule = document.createElement("td");
			var state = document.createElement("td");
			// 删除
			var method = document.createElement("td");
			var delete_btn = document.createElement("button");
			var deleteButton = document.createElement("i");
			var delete_btn = document.createElement("button");
			// 修改
			var update_btn = document.createElement("button");
			var updateButton = document.createElement("i");
			var update_btn = document.createElement("button");
			// 预览
			var preview_btn = document.createElement("button");
			var previewButton = document.createElement("i");
			var preview_btn = document.createElement("button");
			// 保存模板
			var save_btn = document.createElement("button");
			var saveButton = document.createElement("i");
			var save_btn = document.createElement("button");
			// 关闭
			var close_btn = document.createElement("button");
			var closeButton = document.createElement("i");
			var close_btn = document.createElement("button");
			// 分享链接
			var link_btn = document.createElement("button");
			var linkButton = document.createElement("i");
			var link_btn = document.createElement("button");
			// 复制
			var copy_btn = document.createElement("button");
			var copyButton = document.createElement("i");
			var copy_btn = document.createElement("button");
			// 复制
			var data_btn = document.createElement("button");
			var dataButton = document.createElement("i");
			var data_btn = document.createElement("button");

			tr.className = 'table_row';
			title.className = "title";
			type.className = "type";
			createTime.className = "createTime";
			schedule.className = "schedule";
			state.className = "state";
			// 删除
			delete_btn.className = "btn btn-xs btn-danger delete_btn";
			deleteButton.className = "glyphicon glyphicon-trash";
			delete_btn.setAttribute("data-toggle", "tooltip");
			delete_btn.setAttribute("title", "删除");
			// 修改
			update_btn.className = "btn btn-xs btn-primary update_btn";
			updateButton.className = "glyphicon glyphicon-edit";
			update_btn.setAttribute("data-toggle", "tooltip");
			update_btn.setAttribute("title", "修改");
			update_btn.style.margin = "5px";
			// 预览
			preview_btn.className = "btn btn-xs btn-success preview_btn";
			previewButton.className = "glyphicon glyphicon-eye-open";
			preview_btn.setAttribute("data-toggle", "tooltip");
			preview_btn.setAttribute("title", "预览");
			// 保存模板
			save_btn.className = "btn btn-xs btn-warning save_btn";
			saveButton.className = "glyphicon glyphicon-ok";
			save_btn.setAttribute("data-toggle", "tooltip");
			save_btn.setAttribute("title", "保存模板");
			save_btn.style.margin = "5px";
			// 关闭
			close_btn.className = "btn btn-xs btn-info close_btn";
			closeButton.className = "glyphicon glyphicon-off";
			close_btn.setAttribute("data-toggle", "tooltip");
			close_btn.setAttribute("title", "关闭");

			// 分享链接
			link_btn.className = "btn btn-xs btn-info link_btn";
			linkButton.className = "glyphicon glyphicon-share-alt";
			link_btn.setAttribute("data-toggle", "tooltip");
			link_btn.setAttribute("title", "分享链接");
			// 复制
			copy_btn.className = "btn btn-xs btn-warning copy_btn";
			copyButton.className = "glyphicon glyphicon-cutlery";
			copy_btn.setAttribute("data-toggle", "tooltip");
			copy_btn.setAttribute("title", "复制");
			copy_btn.style.margin = "5px";
			// 数据分析
			data_btn.className = "btn btn-xs btn-success data_btn";
			dataButton.className = "glyphicon glyphicon-stats";
			data_btn.setAttribute("data-toggle", "tooltip");
			data_btn.setAttribute("title", "数据分析");

			title.innerText = question[i]['title'];
			type.innerText = question[i]['type'];
			var birthday;
			if (question[i]["createTime"] != null) {
				birthday = question[i]["createTime"]["time"];
				birthday = new Date(birthday);
				var birth_month = birthday.getMonth() + 1;
				if (birth_month < 10)
					birth_month = "0" + birth_month;
				birthday = birthday.getFullYear() + "-" + birth_month + "-"
						+ birthday.getDate();
			}
			createTime.innerText = birthday;
			schedule.innerText = question[i]['schedule'];
			tr.setAttribute("wjId", question[i]['wjId']);
			if (question[i]['state'] === '1') {
				state.innerText = "创建中";
				delete_btn.appendChild(deleteButton);
				method.appendChild(delete_btn);

				update_btn.appendChild(updateButton);
				method.appendChild(update_btn);

				preview_btn.appendChild(previewButton);
				method.appendChild(preview_btn);

				save_btn.appendChild(saveButton);
				method.appendChild(save_btn);

				close_btn.appendChild(closeButton);
				method.appendChild(close_btn);

			}
			if (question[i]['state'] === '2') {
				state.innerText = "收集中";
				link_btn.appendChild(linkButton);
				method.appendChild(link_btn);

				copy_btn.appendChild(copyButton);
				method.appendChild(copy_btn);

				data_btn.appendChild(dataButton);
				method.appendChild(data_btn);
			}
			if (question[i]['state'] === '3') {
				state.innerText = "已完成";
			}

			tr.appendChild(title);
			tr.appendChild(type);
			tr.appendChild(createTime);
			tr.appendChild(schedule);
			tr.appendChild(state);
			tr.appendChild(method);
			node.appendChild(tr);
		}
		$('#page').createPage({
			pageCount : count,
			current : page,
			backFn : function(p) {
				// 单击回调方法，p是当前页码
				searchQuestion(p);
			}
		});
	}

	// 分享链接点击事件
	$('#the_table').on('click', '.link_btn', linkBtnUpdate);
	function linkBtnUpdate() {
		var the_tr = $(this).parents('.table_row').attr('wjId');
		sessionStorage.setItem("link", realPath + "/display?wj=" + the_tr);
		window.location.href = realPath + "/html/kolpanel/PublicLink.html";
	}

	// 删除事件
	$('#the_table').on('click', '.delete_btn', deleteBtnUpdate);
	function deleteBtnUpdate() {
		var the_tr = $(this).parents('.table_row').attr('wjId');
		var data = {
			survey : the_tr
		};
		$.ajax({
			url : "" + realPath + "/questionnaire/deleteWj",
			type : "post",
			dataType : "json",
			contentType : "application/JSON;charset=utf-8",
			async : true,
			data : JSON.stringify(data),
			success : function(datas) {
				if (datas == 1) {
					searchQuestion(1);
				}
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);

			}
		})
	}
	// 关闭事件
	$('#the_table').on('click', '.close_btn', closeBtnUpdate);
	function closeBtnUpdate() {
		var the_tr = $(this).parents('.table_row').attr('wjId');
		var data = {
			survey : the_tr
		};
		$.ajax({
			url : "" + realPath + "/questionnaire/closeWj",
			type : "post",
			dataType : "json",
			contentType : "application/JSON;charset=utf-8",
			async : true,
			data : JSON.stringify(data),
			success : function(datas) {
				if (datas == 1) {
					searchQuestion(1);
				}
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);

			}
		})

	}
	// 修改问卷
	$('#the_table').on('click', '.update_btn', updateBtnUpdate);

	function updateBtnUpdate() {
		var the_tr = $(this).parents('.table_row').attr('wjId');
		sessionStorage.setItem("surveyId", the_tr);
		window.location.href = realPath + "/html/kolpanel/design.html";
	}
	$('#the_table').on('click', '.copy_btn', updateBtnUpdate);
	function updateBtnUpdate() {
		var the_tr = $(this).parents('.table_row').attr('wjId');
		sessionStorage.setItem("surveyId", the_tr);
		sessionStorage.setItem("copy", "copy");
		window.location.href = realPath + "/html/kolpanel/design.html";
	}
	
	//数据分析
	$('#the_table').on('click', '.data_btn', updateBtnUpdate);

	
});