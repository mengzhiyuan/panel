/**
 * Created by wangxiangyang on 2017/7/13.
 */

var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(function() {
	
	laydate.render({
        elem: '#hosEstablishmentTime'
    });


    /*
	// 绑定搜索请求
	$('#search').on('click', requestHospital);
	// 请求表格数据
	function requestHospital(page, event) {

		if (parseInt(page) > 0) {
			var page = page
		} else {
			var page = 1
		}

		var to_send = {
			countPage : 10,
			currentPage : page - 1,
			keyword : $("#keyword").val() || ''
		};

		$.ajax({
			url : "" + realPath + "/hospital/search",// url待确认
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(to_send),
			success : function(data) {
				displayHospital(data, page);
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3)
			}
		})

	}
	requestHospital(1);
	// 表格渲染
	function displayHospital(data, page) {
		var hos = data[0]["result"], hospitallevel = data[0]['hospitallevel'], len = hos.length, count = Math
				.ceil(data[0]["total"] / 10) || 1, node = document
				.getElementById("the_table"), i;
		node.innerHTML = '';
		for (i = 0; i < len; i++) {
			// 依次创建标签元素
			var tr = document.createElement("tr"), center = document
					.createElement("td"), checks = document
					.createElement("input"), span = document
					.createElement("span"), hosName = document
					.createElement("td"), hosProvince = document
					.createElement("td"), hosCity = document
					.createElement("td"), hosDistrict = document
					.createElement("td"), hoslevName = document
					.createElement("td"), hosgraId = document.createElement("td"),
					typeId = document.createElement("td"), profitId = document
					.createElement("td"), propertyId = document
					.createElement("td"), method = document.createElement("td"), buttongroup = document
					.createElement("span"), update_btn = document
					.createElement("button"), edit = document
					.createElement("i"), delete_btn = document
					.createElement("button"), trash = document
					.createElement("i");

			// 给各个标签赋类值
			tr.className = 'table_row';
			center.className = 'center';
			checks.className = 'ace checks';
			checks.setAttribute('type', 'checkbox');// input类型为多选框
			span.className = 'lbl';
			hosName.className = 'hosName';
			hosProvince.className = 'hosProvince';
			hosCity.className = 'hosCity';
			hosDistrict.className = 'hosDistrict';
			hoslevName.className = 'hoslevName';
			hosgraId.className = "hosgraId";
			typeId.className = 'typeId';
			profitId.className = 'profitId';
			propertyId.className = 'propertyId';
			method.className = 'method';
			buttongroup.className = 'btn-group btngp';
			update_btn.className = 'btn btn-xs btn-info update_btn';
			update_btn.setAttribute("data-toggle", "modal");// 给按钮绑定弹出模态框的方法
			update_btn.setAttribute("data-target", "#updateOrAdd");
			edit.className = 'glyphicon glyphicon-edit';
			//delete_btn.className = 'btn btn-xs btn-danger delete_btn';
			//trash.className = 'icon-trash bigger-120';

			// 给tr绑定属性
			tr.setAttribute('hosId', hos[i]['hosId']);
			tr.setAttribute('hoslelId', hos[i]['hoslelId']);
			tr.setAttribute('hosTel', hos[i]['hosTel']);
			tr.setAttribute('hosWebsite', hos[i]['hosWebsite']);
			if (hos[i]['hosEstablishmentTime'] != null) {
				var hosEstablishmentTime = hos[i]['hosEstablishmentTime']["time"];
				hosEstablishmentTime = new Date(hosEstablishmentTime);
				var birth_month = hosEstablishmentTime.getMonth() + 1;
				if (birth_month < 10)
					birth_month = "0" + birth_month;
				var birth_day = hosEstablishmentTime.getDate();
				if (birth_day < 10)
					birth_day = "0" + birth_day;

				hosEstablishmentTime = hosEstablishmentTime.getFullYear() + "-"
						+ birth_month + "-" + birth_day;
			}
			tr.setAttribute('hosEstablishmentTime', hosEstablishmentTime);
			tr.setAttribute('hosLegalPerson', hos[i]['hosLegalPerson']);
			tr.setAttribute('hosRegisteredCapital',
					hos[i]['hosRegisteredCapital']);
			tr.setAttribute('hosgraId',hos[i]['hosgraId']);
			tr.setAttribute('typeId', hos[i]['typeId']);
			tr.setAttribute('profitId', hos[i]['profitId']);
			tr.setAttribute('propertyId', hos[i]['propertyId']);

			// td填充文字
			hosName.innerText = hos[i]['hosName'];
			hosProvince.innerText = hos[i]['hosProvince'];
			hosCity.innerText = hos[i]['hosCity'];
			hosDistrict.innerText = hos[i]['hosDistrict'];
			if (hos[i]['levelList'][0]) {
				hoslevName.innerText = hos[i]['levelList'][0]['hoslevName'];
			}
			//等级
			if (hos[i]['hosgraId'] == 1) {
				hosgraId.innerText = "甲等";
			} else if (hos[i]['hosgraId'] == 2) {
				hosgraId.innerText = "已等";
			} else if(hos[i]['hosgraId'] == 3){
				hosgraId.innerText = "丙等";
			}else{
				hosgraId.innerText = "未知";
			}
			// hoslelId.innerText = hos[i]['hoslelId'];
			if (hos[i]['typeId'] == 1) {
				typeId.innerText = "综合";
			} else if (hos[i]['typeId'] == 2) {
				typeId.innerText = "专科";
			} else {
				typeId.innerText = "未知/其他";
			}

			if (hos[i]['profitId'] == 1) {
				profitId.innerText = "盈利";
			} else if (hos[i]['profitId'] == 2) {
				profitId.innerText = "非盈利";
			} else {
				profitId.innerText = "未知/其他";
			}

			if (hos[i]['propertyId'] == 1) {
				propertyId.innerText = "公立";
			} else if (hos[i]['propertyId'] == 2) {
				propertyId.innerText = "私立";
			} else {
				propertyId.innerText = "未知/其他";
			}

			//typeId.innerText = hos[i]['typeId']; profitId.innerText =
			//hos[i]['profitId']; propertyId.innerText = hos[i]['propertyId'];
			//

			// 组合并向DOM内添加元素
			center.appendChild(checks);// center多选框
			center.appendChild(span);
			update_btn.appendChild(edit);// 编辑按钮
			//delete_btn.appendChild(trash);// 删除按钮
			buttongroup.appendChild(update_btn);
			//buttongroup.appendChild(delete_btn);
			method.appendChild(buttongroup);

			tr.appendChild(center);
			tr.appendChild(hosName);
			tr.appendChild(hosProvince);
			tr.appendChild(hosCity);
			tr.appendChild(hosDistrict);
			tr.appendChild(hoslevName);
			tr.appendChild(hosgraId);
			tr.appendChild(typeId);
			tr.appendChild(profitId);
			tr.appendChild(propertyId);
			tr.appendChild(method);

			node.appendChild(tr);
		}

		fillSelect(hospitallevel);

		$('#page').createPage({
			pageCount : count,
			current : page,
			backFn : function(p) {
				// 单击回调方法，p是当前页码
				requestHospital(p);
			}
		});
	}
    */


    function initWeb(){

        var TableInit = function() {
            var oTableInit = {};

            window.operateEvents = {
                'click .update_btn': function(e, value, row, index){
                    beforeUpdate(row)
                },
                'click .delete_btn': function(e, value, row, index){
                    singleDel(row)
                }
            };

            // 初始化Table
            oTableInit.Init = function () {
                $('#table-1').bootstrapTable({
                    url: realPath + "/hospital/search",         // 请求后台的URL（*）
                    method: 'post',                      // 请求方式（*）
                    toolbar: '#tools',                // 工具按钮用哪个容器
                    striped: true,                      // 是否显示行间隔色
                    cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   // 是否显示分页（*）
                    sortable: false,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: oTableInit.queryParams,// 传递参数（*）
                    sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                    pageNumber:1,                       // 初始化加载第一页，默认第一页
                    pageSize: 10,                       // 每页的记录行数（*）
                    pageList: [10, 25, 50, 100],        // 可供选择的每页的行数（*）
                    search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true,                  // 是否显示所有的列
                    showRefresh: true,                  // 是否显示刷新按钮
                    minimumCountColumns: 2,             // 最少允许的列数
                    clickToSelect: true,                // 是否启用点击选中行
                    height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "ID",                     // 每一行的唯一标识，一般为主键列
                    showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    // 是否显示详细视图
                    detailView: false,                   // 是否显示父子表
                    columns: [{
                        checkbox: false
                    }, {
                        field: 'hosName',
                        title: '医院名称'
                    }, {
                        field: 'hosProvince',
                        title: '所在省份'
                    }, {
                        field: 'hosCity',
                        title: '所在城市'
                    }, {
                        field: 'hosDistrict',
                        title: '所在区县'
                    },{
                        field: 'hosgraId',
                        title: '医院级别'
                    },{
                        field: 'hoslelId',
                        title: '医院等级'
                    },{
                        field: 'typeId',
                        title: '医院类型'
                    },{
                        field: 'profitId',
                        title: '盈利性质'
                    },{
                        field: 'propertyId',
                        title: '医院属性'
                    },{
                        field: 'control',
                        title: '操作',
                        formatter : function(value, row, index) {
                            var e = "<button class=\"btn btn-xs btn-primary update_btn\" data-toggle=\"modal\" title=\"更新数据\" data-target=\"#updateOrAdd\"><i class=\"glyphicon glyphicon-edit\"></i></button>";
                            var d = "<button class=\"btn btn-xs btn-danger delete_btn\" title=\"删除数据\"><i class=\"glyphicon glyphicon-trash\"></i></button>";
                            return e+d;
                        },
                        events : operateEvents
                    }],
                    responseHandler: function(ood){
                        let res = ood[0].result,
                            data = {};
                        data.total = ood[0].total;
                        data.rows = [];

                        for (let i = 0, l = res.length; i < l; i++){
                        	
                        	var this_row = {

                        			'hosId': res[i].hosId,
                                    'hosName': res[i].hosName,
                                    'hosProvince': res[i].hosProvince,
                                    'hosCity': res[i].hosCity,
                                    'hosDistrict': res[i].hosDistrict,
                                    'hosgraId': res[i].hosgraId,
                                    'hoslelId': res[i].hoslelId,
                                    'typeId': res[i].typeId,
                                    'profitId': res[i].profitId,
                                    'propertyId': res[i].propertyId,
                                    'hosEstablishmentTime': res[i].hosEstablishmentTime,
                                    'hosLegalPerson': res[i].hosLegalPerson,
                                    'hosRegisteredCapital': res[i].hosRegisteredCapital,
                                    'hosTel': res[i].hosTel,
                                    'hosWebsite': res[i].hosWebsite,
                            };
                        	
                        	if (this_row['typeId'] == 1) {
                        		this_row['typeId'] = "综合";
                			} else if (this_row['typeId'] == 2) {
                				this_row['typeId'] = "专科";
                			} else {
                				this_row['typeId'] = "未知/其他";
                			}

                			if (this_row['profitId'] == 1) {
                				this_row['profitId'] = "盈利";
                			} else if (this_row['profitId'] == 2) {
                				this_row['profitId'] = "非盈利";
                			} else {
                				this_row['profitId'] = "未知/其他";
                			}

                			if (this_row['propertyId'] == 1) {
                				this_row['propertyId'] = "公立";
                			} else if (this_row['propertyId'] == 2) {
                				this_row['propertyId'] = "私立";
                			} else {
                				this_row['propertyId'] = "未知/其他";
                			}
                			
                			if (this_row['hosEstablishmentTime']){
                				
                				var year = '' + (parseInt(this_row['hosEstablishmentTime'].year) + 1900),
                					month = '' + (parseInt(this_row['hosEstablishmentTime'].month) + 1),
                					date = '' + this_row['hosEstablishmentTime'].date;
                				
                				if (month.length < 2){
                					month = '0' + month
                				}
                				if (date.length < 2){
                					date = '0' + date
                				}
                				
                				this_row['hosEstablishmentTime'] = year + '-' + month + '-' + date;
                			}
                        	
                            data.rows.push(this_row)
                        }
                        return data;
                    }
                });
            };

            // 得到查询的参数
            oTableInit.queryParams = function (params) {
                return {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    countPage: params.limit,   // 页面大小
                    currentPage: params.offset,  // 页码
                    keyword: $("#keyword").val()
                };
            };
            return oTableInit;
        };


        var ButtonInit = function() {
            var oInit = {};
            var postdata = {};

            oInit.Init = function() {
                // 初始化页面上面的按钮事件
            };

            return oInit;
        };


        // 1.初始化Table
        var oTable = new TableInit();
        oTable.Init();

        // 2.初始化Button的点击事件
        var oButtonInit = new ButtonInit();
        oButtonInit.Init();

        $('#search').on('click',function(){
            $("#table-1").bootstrapTable('destroy');
            oTable.Init()
        });
        
        function clock (){
    		$.ajax({
    			url : "" + realPath + "/hospital/progress",// url待确认
    			type : "get",
    			dataType : "json",
    			async : true,
    			contentType : "application/JSON;charset=utf-8",
    			data : "",
    			success : function(data) {
    				var res = data[0]["result"];
    				var progress = data[0]["progress"];
    				$(".progress-bar").width(progress+"%");
    				$("#spa").html(progress+"%");
    				$(".progressbar-title").html("准备导入:"+data[0]["total"]+"条数据;&nbmp;已经处理:"+data[0]["current"]+"条数据;失败：0条;正在导入;请示后...");
    				if(data[0]["total"]==data[0]["current"]){
    					clearInterval(int);
    				}
    			},
    			error : function(d1, d2, d3) {
    				console.log(d1);
    				console.log(d2);
    				console.log(d3)
    			}
    		})

        }
    	var int;
    	// 导入excel的保存按钮
    	$("#excel_save").on("click", function(event) {
    		$("#uploadModal").css("display", "none");
    		$('.modal-backdrop').css("display", "none");
    		$(".demo").show();
    		int=setInterval(clock,3000);
    		var option = {
    			type : 'post',
    			url : realPath + '/hospital/ImportExcel',
    			dataType : "json",
    			clearForm : true,
    			resetForm : true,
    			success : function(data) {
    				var res = data[0]["result"];
    				clearInterval(int);
    				if (res > 0) {
    					$(".progress-bar").width("100%");
    					$("#spa").html("100%");
    					$("#uploadModal").css("display", "none");
    					$("#uploadModal").css("display", "none");
    					$('.modal-backdrop').css("display", "none");
//    					requestHospital(1);
    					alert('操作成功');
    				} else {
    					alert('操作失败,请重试')
    				}
    			}
    		};
    		$("#excelImport").ajaxSubmit(option);
    		return false;
    	});

    	// 绑定新增和修改前事件
    	$('#add').on('click', beforeAdd);
    	$('#the_table').on('click', '.update_btn', beforeUpdate);

    	// 新增(前)方法和修改(前)方法
    	function beforeAdd() {
    		$('#updateOrAdd').find('input').val('').end().find('select').val('');
    		$('#save').off('click').on('click', addSave);

    	}
    	function beforeUpdate(row) {

    		window.the_msg = {};

    		the_msg.hosId = row['hosId'];
    		the_msg.hoslelId = row['hoslelId'];
    		the_msg.hosName = row['hosName'];
    		the_msg.hosProvince = row['hosProvince'];
    		the_msg.hosCity = row['hosCity'];
    		the_msg.hosDistrict = row['hosDistrict'];
    		// the_msg.hoslelId = the_tr.find('.hoslelId').text();
    		the_msg.hosTel = row['hosTel'];
    		the_msg.hosWebsite = row['hosWebsite'];
    		the_msg.hosEstablishmentTime = row['hosEstablishmentTime'];
    		the_msg.hosLegalPerson = row['hosLegalPerson'];
    		the_msg.hosRegisteredCapital = row['hosRegisteredCapital'];
    		the_msg.typeId = row['typeId'];
    		the_msg.profitId = row['profitId'];
    		the_msg.propertyId = row['propertyId'];
    		the_msg.hosgraId = row['hosgraId'];
    		
    		if (the_msg['typeId'] == "综合") {
    			the_msg['typeId'] = 1;
    		} else if (the_msg['typeId'] == "专科") {
    			the_msg['typeId'] = 2;
    		} else {
    			the_msg['typeId'] = 3;
    		}

    		if (the_msg['profitId'] == "盈利") {
    			the_msg['profitId'] = 1;
    		} else if (the_msg['profitId'] == "非盈利") {
    			the_msg['profitId'] = 2;
    		} else {
    			the_msg['profitId'] = 3;
    		}

    		if (the_msg['propertyId'] == "公立") {
    			the_msg['propertyId'] = 1;
    		} else if (the_msg['propertyId'] == "私立") {
    			the_msg['propertyId'] = 2;
    		} else {
    			the_msg['propertyId'] = 3;
    		}

    		$('#hosName').val(the_msg.hosName);
    		$('#province').val(the_msg.hosProvince).change();
    		$('#city').val(the_msg.hosCity).change();
    		$('#district').val(the_msg.hosDistrict);
    		$('#hoslelId').val(the_msg.hoslelId);
    		if(the_msg.hosgraId==1){
    			$('#hosgraId').val("1");
    		}else if(the_msg.hosgraId==2){
    			$('#hosgraId').val("已等");
    		}else if(the_msg.hosgraId==3){
    			$('#hosgraId').val("丙等");
    		}else{
    			$('#hosgraId').val("未知");
    		}
    		
    		
    		$('#hosTel').val(the_msg.hosTel);
    		$('#hosWebsite').val(the_msg.hosWebsite);
    		$('#hosEstablishmentTime').val(the_msg.hosEstablishmentTime);
    		$('#hosLegalPerson').val(the_msg.hosLegalPerson);
    		$('#hosRegisteredCapital').val(the_msg.hosRegisteredCapital);
    		$('#typeId').val(the_msg.typeId);
    		$('#profitId').val(the_msg.profitId);
    		$('#propertyId').val(the_msg.propertyId);

    		$('#save').off('click').on('click', updateSave);

    	}
    	// 新增提交函数
    	function addSave() {

    		var to_send = {
    				hosName : $('#hosName').val(),
    				hosProvince : $('#province').val(),
    				hosCity : $('#city').val(),
    				hosDistrict : $('#district').val(),
    				hoslelId : $('#hoslelId').val(),
    				hosgraId : $('#hosgraId').val(),
    				hosTel : $('#hosTel').val(),
    				hosWebsite : $('#hosWebsite').val(),
    				hosEstablishmentTime : $('#hosEstablishmentTime').val(),
    				hosLegalPerson : $('#hosLegalPerson').val(),
    				hosRegisteredCapital : $('#hosRegisteredCapital').val(),
    				typeId : $('#typeId').val(),
    				profitId : $('#profitId').val(),
    				propertyId : $('#propertyId').val()
    			};
    		$.ajax({
    			url : "" + realPath + "/hospital/add",// url待确认
    			type : "post",
    			dataType : "json",
    			async : true,
    			contentType : "application/JSON;charset=utf-8",
    			data : JSON.stringify(to_send),
    			success : function(data) {
    				var res = data[0]["result"];
    				if (res > 0) {
    					var currentPage = $("#page").find(".current").text();
    					$("#updateOrAdd").css("display", "none");
    					$('.modal-backdrop').css("display", "none");
    					$("#table-1").bootstrapTable('destroy');
                        oTable.Init();
//    					requestHospital(currentPage);
    					alert('新增成功')
    				} else {
    					alert('新增失败,请重试')
    				}
    			},
    			error : function(d1, d2, d3) {
    				alert('新增失败,请稍后重试')
    				console.log(d1);
    				console.log(d2);
    				console.log(d3)
    			}
    		})
    	}
    	// 修改提交函数
    	function updateSave() {

    		var to_send = {
    			hosId : the_msg.hosId
    		};

    		if ($('#hosName').val() != the_msg.hosName)
    			to_send.hosName = $('#hosName').val();
    		if ($('#province').val() != the_msg.hosProvince)
    			to_send.hosProvince = $('#province').val();
    		if ($('#city').val() != the_msg.hosCity)
    			to_send.hosCity = $('#city').val();
    		if ($('#district').val() != the_msg.hosDistrict)
    			to_send.hosDistrict = $('#district').val();
    		if ($('#hoslelId').val() != the_msg.hoslelId)
    			to_send.hoslelId = $('#hoslelId').val();
    		if ($('#hosTel').val() != the_msg.hosTel)
    			to_send.hosTel = $('#hosTel').val();
    		if ($('#hosWebsite').val() != the_msg.hosWebsite)
    			to_send.hosWebsite = $('#hosWebsite').val();
    		if ($('#hosEstablishmentTime').val() != the_msg.hosEstablishmentTime)
    			to_send.hosEstablishmentTime = $('#hosEstablishmentTime').val();
    		if ($('#hosLegalPerson').val() != the_msg.hosLegalPerson)
    			to_send.hosLegalPerson = $('#hosLegalPerson').val();
    		if ($('#hosRegisteredCapital').val() != the_msg.hosRegisteredCapital)
    			to_send.hosRegisteredCapital = $('#hosRegisteredCapital').val();
    		if ($('#typeId').val() != the_msg.typeId)
    			to_send.typeId = $('#typeId').val();
    		if ($('#profitId').val() != the_msg.profitId)
    			to_send.profitId = $('#profitId').val();
    		if ($('#propertyId').val() != the_msg.propertyId)
    			to_send.propertyId = $('#propertyId').val();
    		if ($('#hosgraId').val() != the_msg.hosgraId)
    			to_send.hosgraId = $('#hosgraId').val();
    		$.ajax({
    			url : "" + realPath + "/hospital/update",// url待确认
    			type : "post",
    			dataType : "json",
    			async : true,
    			contentType : "application/JSON;charset=utf-8",
    			data : JSON.stringify(to_send),
    			success : function(data) {
    				var res = data[0]["result"];
    				if (res > 0) {
    					var currentPage = $("#page").find(".current").text();
    					$("#updateOrAdd").css("display", "none");
    					$('.modal-backdrop').css("display", "none");
    					$("#table-1").bootstrapTable('destroy');
                        oTable.Init();
//    					requestHospital(currentPage);
    					alert('修改成功')
    				} else {
    					alert('修改失败,请重试')
    				}
    			},
    			error : function(d1, d2, d3) {
    				alert('修改失败,请稍后重试');
    				console.log(d1);
    				console.log(d2);
    				console.log(d3)
    			}
    		})
    	}

    	// 删除事件绑定
    	//$("#the_table").on("click", ".delete_btn", singleDel);
    	$("#delete").on("click", multiDel);

    	// 单条删除
    	function singleDel(row) {
    		var to_del = [parseInt(row["hosId"])];
    		delSubmit(to_del)
    	}
    	// 多条删除
    	function multiDel(event) {
    		var to_del = [];
    		$("#the_table").find(".checks:checked").each(function() {
    			to_del.push($(this).parents(".table_row").attr("hosId"))
    		});
    		delSubmit(to_del)
    	}
    	// 提交删除
    	function delSubmit(to_del) {
    		var to_send = JSON.stringify(to_del);
    		$.ajax({
    			url : "" + realPath + "/hospital/delete",// url待确认
    			type : "post",
    			dataType : "json",
    			async : true,
    			contentType : "application/JSON;charset=utf-8",
    			data : to_send,
    			success : function(data) {
    				var res = data[0]["result"];
    				if (res > 0) {
    					var currentPage = $("#page").find(".current").text();
    					$('.modal-backdrop').css("display", "none");
    					$("#table-1").bootstrapTable('destroy');
                        oTable.Init();
//    					requestHospital(currentPage);
    					alert('删除成功');
    				} else {
    					alert('删除失败,请重试')
    				}
    			},
    			error : function(d1, d2, d3) {
    				alert('删除失败,请稍后重试');
    				console.log(d1);
    				console.log(d2);
    				console.log(d3)
    			}
    		})
    	}
    }

//    function fillSelect() {
//
//        $.ajax({
//            url: realPath + "/hospital/search",
//            type: 'post',
//            contentType: 'application/json;charset=utf-8',
//            dataType: 'json',
//            data: JSON.stringify({
//                countPage: 10,   // 页面大小
//                currentPage: 1,  // 页码
//                keyword: ''
//            }),
//            success: function(d){
//                console.log(d);
//
//                var data = d[0].hospitallevel;
//
//                var str = '', len = data.length, i;
//
//                for (i = 0; i < len; i++) {
//                    str += '<option value="' + data[i]["hoslelId"] + '">'
//                        + data[i]["hoslevName"] + '</option>';
//                }
//
//                $('#hoslelId').find('option:not(":first-child")').remove().end()
//                    .append(str)
//
//            },error:function(e){
//                console.log(e)
//            }
//        });
//    }

    initWeb();
//    fillSelect();

	
});