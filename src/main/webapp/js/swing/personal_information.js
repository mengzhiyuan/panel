var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	if (sessionStorage.getItem('information') !== null) {
		var to_send = {};
		to_send.iEmail = JSON.parse(sessionStorage.getItem('information'))['iEmail'];
		$.ajax({
					type : "post",
					url : "" + realPath + "/information/searInfomation",
					dataType : 'json',//将服务器端返回的数据转换成指定类型
					async : true,    //是否异步
					contentType : "application/JSON;charset=utf-8", //即将发送信息至服务器的内容编码类型(默认: "application/x-www-form-urlencoded; charset=UTF-8")
					data : JSON.stringify(to_send),
					success : function(data) {
						var result = data[0]['result'][0];
						if (data[0]['result'].length === 1) {
							if (result.iUrl === "" || result.iUrl === null) {
								$("#url")
										.attr('src',
												"../../images/swing/new_project_ico.png");
							} else {
								$("#url").attr('src', result.iUrl);
							}
							var index=0;
							$(".modal-body").attr('iId', result.iId);
							if(result.iEmail!=null && result.iEmail!=''){
								index=index+1;
							}
							if(result.iUserName!=null && result.iUserName!=''){
								index=index+1;
							}
							if(result.iPhone!=null && result.iPhone!=''){
								index=index+1;
							}
							if(result.iName!=null && result.iName!=''){
								index=index+1;
							}
							if(result.iIndustry!=null && result.iIndustry!=''){
								index=index+1;
							}
							if(result.iOccupation!=null && result.iOccupation!=''){
								index=index+1;
							}
							if(result.iCompany!=null && result.iCompany!=''){
								index=index+1;
							}
							if(result.iDepartment!=null && result.iDepartment!=''){
								index=index+1;
							}
							if(result.iDemand!=null && result.iDemand!=''){
								index=index+1;
							}
							if(result.iIdentity!=null && result.iIdentity!=''){
								index=index+1;
							}
							if(result.iPassword!=null && result.iPassword!=''){
								index=index+1;
							}
							if(result.iWechat!=null && result.iWechat!=''){
								index=index+1;
								$("#iWechat").text("已绑定");
							}
							if(result.iWeibo!=null && result.iWeibo!=''){
								index=index+1;
								$("#iWeibo").text("已绑定");
							}
							if(result.iQq!=null && result.iQq!=''){
								index=index+1;
								$("#iQq").text("已绑定");
							}
							if(result.iUrl!=null && result.iUrl!=''){
								index=index+1;
								$("#url")
								.attr('src',result.iUrl);
							}
							if(result.iCity!=null && result.iCity!=''){
								index=index+1;
							}
							chart_too((index/16*100).toFixed(2)+"%",16-index);
							$(".userName").text(result.iUserName);
							$(".email").text(result.iEmail);
							$(".password").text("*******");
							$(".phone").text(result.iPhone);
							$(".name").text(result.iName);
							$(".city").text(result.iCity);
							$(".identity").text(result.iIdentity);
							$(".company").text(result.iCompany);
							$(".industry").text(result.iIndustry);
							$(".occupation").text(result.iOccupation);
							$(".department").text(result.iDepartment);
							$(".demand").text(result.iDemand);
						}
					}
				});
	}
	$("#userName")
			.click(
					function() {
						$("#myModalLabel").text("用户名修改");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"username\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#email")
			.click(
					function() {
						$("#myModalLabel").text("账号邮箱");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"email\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#password")
			.click(
					function() {
						$("#myModalLabel").text("密码");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"password\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#phone")
			.click(
					function() {
						$("#myModalLabel").text("电话");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"phone\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#name")
			.click(
					function() {
						$("#myModalLabel").text("姓名");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"name\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#city")
			.click(
					function() {
						$("#myModalLabel").text("城市");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"city\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#identity")
			.click(
					function() {
						$("#myModalLabel").text("身份");
						$(".modal-body")
								.html(
										"<select class=\"form-control\" style=\"width:50%\" id=\"identity\"><option value=\"个人\">个人</option><option value=\"公司\">公司</option></select>");
					});
	$("#company")
			.click(
					function() {
						$("#myModalLabel").text("公司");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"company\" class=\"form-control\" style=\"width:50%\">");
					});

	$("#industry")
			.click(
					function() {
						$("#myModalLabel").text("行业");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"industry\" class=\"form-control\" style=\"width:50%\">");
					});

	$("#occupation")
			.click(
					function() {
						$("#myModalLabel").text("职业信息");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"occupation\" class=\"form-control\" style=\"width:50%\">");
					});
	$("#department")
			.click(
					function() {
						$("#myModalLabel").text("部门");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"department\" class=\"form-control\" style=\"width:50%\">");
					});

	$("#demand")
			.click(
					function() {
						$("#myModalLabel").text("其他需求");
						$(".modal-body")
								.html(
										"<input type=\"text\" id=\"lantd\" name=\"demand\" class=\"form-control\" style=\"width:50%\">");
					});
	function chart_too(value,index){
		var myChart = echarts.init(document.getElementById("main"));
	     var labelTop = {//上层样式
	                normal : {
	                    color :'#08B2EF',
	                    label : {
	                        show : true,
	                        position : 'center',
	                        formatter : '{b}',
	                        textStyle: {
	                            baseline : 'bottom'
	                        }
	                    },
	                    labelLine : {
	                        show : false
	                    }
	                }
	            };
	          var labelFromatter = {//环内样式
	            normal : {//默认样式
	                label : {//标签
	                    formatter : function (){return '70%'},
	                   // labelLine.length：30,  //线长，从外边缘起计算，可为负值
	                    textStyle: {//标签文本样式
	                        color:'black',
	                        align :'center',
	                        baseline : 'top'//垂直对其方式
	                    }
	                }
	            },
	          };
	        var labelBottom = {//底层样式
	            normal : {
	                color: '#99ccff',
	                label : {
	                    show : true,
	                    position : 'center'
	                },
	                labelLine : {
	                    show : false
	                }
	            },
	            emphasis: {//悬浮式样式
	                color: 'rgba( 0,0,0,0)'
	            }
	        };
	        var radius = [42,65];// 半径[内半径，外半径]

		//环形图
		var BeforeCountOption = {
		 title : {
	        },
	        animation:false,
	        tooltip : {         // 提示框. Can be overwrited by series or data
	            trigger: 'axis',
	            //show: true,   //default true
	            showDelay: 0,
	            hideDelay: 50,
	            transitionDuration:0,
	            borderRadius : 8,
	            borderWidth: 2,
	            padding: 10,    // [5, 10, 15, 20]
	        },
		    series : [
						{
						    type : 'pie',
						    center : ['33.5%', '40%'],//圆心坐标（div中的%比例）
						    radius : radius,//半径
						    x: '0%', // for funnel
						    itemStyle :labelTop,//graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
						    data : [
						        {name:'已完成', value:index,itemStyle :labelBottom },
						        {name:value, value:16, itemStyle : labelTop}
						    ]
						},							  
					]
		    }
		myChart.setOption(BeforeCountOption);
	}
	$(".submit").click(function() {
		var val = $("#lantd").val();
		var filed = $("#lantd").prop("name");
		var iId = $(".modal-body").attr('iId');
		var send = {};
		send.val = val;
		send.filed = filed;
		send.iId = iId;
		$.ajax({
			url : "" + realPath + "/information/updateInformation",
			type : "post",
			dataType : "json",
			async : true,
			contentType : "application/JSON;charset=utf-8",
			data : JSON.stringify(send),
			success : function(data) {
				window.location.href = './personal_information.html'
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		})
	});

});
