/**
 * Created by wangxiangyang on 2017/7/5.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPaht + projectName;

$(function() {
	$.ajax({
		type : "post",
		url : "" + realPath + "/dataAnalysis/categ",
		dataType : "json",
		contentType : "application/JSON;charset=utf-8",
		success : function(data) {
			var result = data[0]['result'];
			var title = new Array();
			var number = new Array();
			for (var i = 0; i < data[0]['result'].length; i++) {
				if (data[0]['result'][i]['names'] == '') {
					title[i] = "其他";
				} else {
					title[i] = data[0]['result'][i]['names'];
				}

				number[i] = data[0]['result'][i]['sumTotal'];
			}
			option = {
				title : {
					text : '样本库医生职称',
					subtext : '根据职称分类'
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
				// data:['蒸发量','降水量']
				},
				toolbox : {
					show : true,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					data : title
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : [ {
					name : '人数',
					type : 'bar',
					data : number,
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					}
				},

				]
			};

			// 初始化echarts实例
			var myChart = echarts.init(document.getElementById('chartmain'));

			// 使用制定的配置项和数据显示图表
			myChart.setOption(option);
		}
	});
});

$.ajax({
	type : "post",
	url : "" + realPath + "/dataAnalysis/sexSearch",
	dataType : "json",
	contentType : "application/JSON;charset=utf-8",
	success : function(data) {
		var result = data[0]['result'];
		var checkSex = new Array();
		for (var i = 0; i < data[0]['result'].length; i++) {
			if (data[0]['result'][i]['docSex'] == '1') {
				// checkSex[i] =
				// "{value:"+data[0]['result'][i]['sumTotal']+","+"name:男}";
				checkSex.push({
					value : data[0]['result'][i]['sumTotal'],
					name : '男'
				});
			} else if (data[0]['result'][i]['docSex'] == '0') {
				// checkSex[i] =
				// "{value:"+data[0]['result'][i]['sumTotal']+","+"name:女}";
				checkSex.push({
					value : data[0]['result'][i]['sumTotal'],
					name : '女'
				});
			} else {
				// checkSex[i] =
				// "{value:"+data[0]['result'][i]['sumTotal']+","+"name:未定义}";
				checkSex.push({
					value : data[0]['result'][i]['sumTotal'],
					name : '未定义'
				});
			}
		}
		option = {
			title : {
				text : '样本库男女比例',
				subtext : '根据那女比例分析',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				x : 'left',
				data : [ '男', '女', '未分类' ]
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'pie', 'funnel' ],
						option : {
							funnel : {
								x : '25%',
								width : '50%',
								funnelAlign : 'left',
								max : 1548
							}
						}
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			series : [ {
				name : '访问来源',
				type : 'pie',
				radius : '55%',
				center : [ '50%', '60%' ],
				data : checkSex
			} ]
		};
		// 初始化echarts实例
		var myChart = echarts.init(document.getElementById('chartsex'));

		// 使用制定的配置项和数据显示图表
		myChart.setOption(option);
	}
});

$.ajax({
	type : "post",
	url : "" + realPath + "/dataAnalysis/provinceSearch",
	dataType : "json",
	contentType : "application/JSON;charset=utf-8",
	success : function(data) {
		var result = data[0]['result'];
		var checkprovince = new Array();
		for (var i = 0; i < data[0]['result'].length; i++) {
			if (data[0]['result'][i]['province'] != '') {
				
				checkprovince.push({
					name : data[0]['result'][i]['province'].substr(0, 2) ,
					value : data[0]['result'][i]['sumTotal']
					
				});
			}
		}
		require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });
		 require(['echarts','echarts/chart/map'],function (ch) {
	            // 基于准备好的dom，初始化echarts图表
	            var myChart = ch.init(document.getElementById('main'));  
	            option = {
	            	    title : {
	            	        text: 'iphone销量',
	            	        subtext: '纯属虚构',
	            	        x:'center'
	            	    },
	            	    tooltip : {
	            	        trigger: 'item'
	            	    },
	            	    legend: {
	            	        orient: 'vertical',
	            	        x:'left',
	            	        data:['样本量']
	            	    },
	            	    dataRange: {
	            	        min: 0,
	            	        max: 2500,
	            	        x: 'left',
	            	        y: 'bottom',
	            	        text:['高','低'],           // 文本，默认为数值文本
	            	        calculable : true
	            	    },
	            	    toolbox: {
	            	        show: true,
	            	        orient : 'vertical',
	            	        x: 'right',
	            	        y: 'center',
	            	        feature : {
	            	            mark : {show: true},
	            	            dataView : {show: true, readOnly: false},
	            	            restore : {show: true},
	            	            saveAsImage : {show: true}
	            	        }
	            	    },
	            	    roamController: {
	            	        show: true,
	            	        x: 'right',
	            	        mapTypeControl: {
	            	            'china': true
	            	        }
	            	    },
	            	    series : [
	            	        {
	            	            name: '样本量',
	            	            type: 'map',
	            	            mapType: 'china',
	            	            roam: false,
	            	            itemStyle:{
	            	                normal:{label:{show:true}},
	            	                emphasis:{label:{show:true}}
	            	            },
	            	            data:checkprovince
	            	        }
	            	    ]
	            	};
	            // 为echarts对象加载数据 
	            myChart.setOption(option); 
	            }); 
		
	}
});










