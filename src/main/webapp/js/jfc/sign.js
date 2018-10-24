var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	 requestSign();
	function requestSign(){
		var to_send = {
				  year:$("#year").val(),
				  month:$("#month").val()
	       }
		  $.ajax({
	         url: ""+realPath+"/attendance/signListTime",
	         type: "post",
	         dataType: "json",
	         async: true,
	         contentType : "application/JSON;charset=utf-8",
	         data:JSON.stringify(to_send),
	         success: function(data){
	        	var result = data[0].jfcDayAttendances;
	        	var node = document.getElementById("the_tables");
		        node.innerHTML = ''
	        	for(var i=0;i<result.length;i++){
	        		var tr = document.createElement("tr"),
	        		dayMonthTime = document.createElement("td"),
	        		daySituation = document.createElement("td"),
	        		method = document.createElement("td")
	        		// 修改
	        		var update_btn = document.createElement("button");
		  			var updateButton = document.createElement("i");
	        		var span = document.createElement("span");
	                if(result[i]['daySituation']==="JQ"){
	                	span.className = "label label-danger";
	                	span.innerText = "假期";
	                	
	                	update_btn.className = "btn btn-xs btn-danger update_btn";
			  			updateButton.className = "glyphicon glyphicon-remove";
			  			update_btn.setAttribute("data-toggle", "tooltip");
			  			update_btn.setAttribute("title", "禁用假期");
			  			update_btn.appendChild(updateButton);
						method.appendChild(update_btn);
	                }else{
	                	span.className = "label label-success";
	                	span.innerText = "非假期";
	                	
	                	update_btn.className = "btn btn-xs btn-success update_btn";
			  			updateButton.className = "glyphicon glyphicon-ok";
			  			update_btn.setAttribute("data-toggle", "tooltip");
			  			update_btn.setAttribute("title", "是启用假期");
			  			update_btn.appendChild(updateButton);
						method.appendChild(update_btn);
	                }
	                daySituation.appendChild(span);
	        		tr.className = 'table_row';
	        		tr.setAttribute("dayId",result[i]['dayId']);  //主键
	        		dayMonthTime.innerText = result[i]['dayMonthTime'];
	        		tr.appendChild(dayMonthTime);
	                tr.appendChild(daySituation);
	                tr.appendChild(method);
	                node.appendChild(tr);
	        		
	        	}
	         },
	         error: function(d1,d2,d3){
	             console.log(d1);
	             console.log(d2);
	             console.log(d3);
	         }
	     })
	}
		 
	
	 $("#Sign").click(function(){
	    	var map, geolocation;
	    	//加载地图，调用浏览器定位服务
	    	map = new AMap.Map('', {
	    	    resizeEnable: true
	    	});
	    	map.plugin('AMap.Geolocation', function() {
	    	    geolocation = new AMap.Geolocation({
	    	        enableHighAccuracy: true,//是否使用高精度定位，默认:true
	    	        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
	    	        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	    	        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	    	        buttonPosition:'RB'
	    	    });
	    	    map.addControl(geolocation);
	    	    geolocation.getCurrentPosition();
	    	    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
	    	    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
	    	});
	    	//解析定位结果
	    	function onComplete(data) {
				  var to_send = {
						  address:data.formattedAddress,
						  sta:1
			        }
				  $.ajax({
			          url: ""+realPath+"/attendance/sign",
			          type: "post",
			          dataType: "json",
			          async: true,
			          contentType : "application/JSON;charset=utf-8",
			          data:JSON.stringify(to_send),
			          success: function(data){
			        	  alert("签到成功");
			          },
			          error: function(d1,d2,d3){
			              console.log(d1);
			              console.log(d2);
			              console.log(d3);
			          }
			      })
	    		
	    	}
	    	//解析定位错误信息
	    	function onError(data) {
	    	    //document.getElementById('tip').innerHTML = '定位失败';
	    	    alert("定位失败");
	    	}
	    });

	
	
	
	
});



