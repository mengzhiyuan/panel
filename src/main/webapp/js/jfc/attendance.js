var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	
	/**
	 * 哈哈
	 */
	$("#zhli").on("click", function(event){
		 var to_send = {
				  year:$("#year").val(),
				  month:$("#month").val()
	        }
		  $.ajax({
	          url: ""+realPath+"/attendance/list",
	          type: "post",
	          dataType: "json",
	          async: true,
	          contentType : "application/JSON;charset=utf-8",
	          data:JSON.stringify(to_send),
	          success: function(data){
	        	  alert("整理成功");
	          },
	          error: function(d1,d2,d3){
	              console.log(d1);
	              console.log(d2);
	              console.log(d3);
	          }
	      })
	});
	/* */
	/**
	 * 根据日期字符串获取星期几
	 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
	 * @returns {String}
	 */
	function getWeek(dateString){
	    var date;
	    if(dateString == null || dateString == undefined || dateString == ''){
	    	  return "" ;
	    }else{
	        var dateArray = dateString.split("-");
	        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
	        return "星期" + "日一二三四五六".charAt(date.getDay());
	    }
	   
	};
	//首页
	requestList();
	function requestList(){
		var to_send = {
				year:$("#year").val(),
				  month:$("#month").val()
	        }
		  $.ajax({
	          url: ""+realPath+"/attendance/listAll",
	          type: "post",
	          dataType: "json",
	          async: true,
	          contentType : "application/JSON;charset=utf-8",
	          data:JSON.stringify(to_send),
	          success: function(data){
	        	  var result = data[0]['code'];
	        	  var node = document.getElementById("the_week");
		          node.innerHTML = ''
		          var tr = document.createElement("tr");  
		          var firstTd = document.createElement("td"),
		              firstDiv = document.createElement("div")
		              firstDiv.className = 'w-150';
		              firstTd.appendChild(firstDiv);
		              tr.appendChild(firstTd);
		          for(var i = 0;i<result[0].length;i++){
		        	  var week = result[0][i]['dayMonthTime'],
		        	   td = document.createElement("td"),
		        	   div = document.createElement("div");
		        	   td.className='w-120';
		        	   div.className = 'table-cell';
		        	   div.innerText = getWeek(week);
		        	   td.appendChild(div);
		        	   tr.appendChild(td);
		          }
		          for(var i=0;i<4;i++){
		        	   var td = document.createElement("td"),
		        	   div = document.createElement("div");
		        	   td.className='w-120';
		        	   div.className = 'table-cell';
		        	   div.innerText = "---";
		        	   td.appendChild(div);
		        	   tr.appendChild(td);
		          }
		          
		          node.appendChild(tr);
		          var the_row = document.getElementById("the_row");
		          the_row.innerHTML = ''
	        	  var trRow = document.createElement("tr");
	                  tdRow = document.createElement("td"),
	                  divRow = document.createElement("div"),
	              tdRow.className = 'w-150';
                  divRow.className = 'table-cell';
                  divRow.innerText = '';
	              tdRow.appendChild(divRow);
	              trRow.appendChild(tdRow);
	              the_row.appendChild(trRow);
	        	  for(var i =0;i<result.length;i++){
	        		  var jfc = result[i];
	        		//左侧固定列
	        		  var trRow1 = document.createElement("tr"),
	                  tdRow1 = document.createElement("td"),
	                  divRow1 = document.createElement("div");
        			  tdRow1.className = 'w-150';
                      divRow1.className = 'table-cell';
                      divRow1.innerText = jfc[i]['staName'];
    	              tdRow1.appendChild(divRow1);
    	              trRow1.appendChild(tdRow1);
    	              the_row.appendChild(trRow1);
	        		  var trTable = document.createElement("tr");
	        		  
	        		  var tdTableF = document.createElement("td"),
	        		  divtableF = document.createElement("div");
		              divtableF.className = 'w-150';
		              divtableF.innerText = "";
		              tdTableF.appendChild(divtableF);
		              trTable.appendChild(tdTableF);
	        		  for(var j = 0;j<jfc.length;j++){
	    	              //z主table行
	    	              var tdTable = document.createElement("td"),
	    	                  divtable = document.createElement("div"),
	    	                  button = document.createElement("button");
	    	              tdTable.className ='w-120';
	    	              divtable.className = 'table-cell';
	    	              if(jfc[j]['daySituation']=="ZC"){
	    	            	  button.className = "btn btn-xs btn-success";
	    	              }else if(jfc[j]['daySituation']=="JQ"){
	    	            	  button.className = "btn btn-xs btn-info";
	    	              }else if(jfc[j]['daySituation']=="C"){
	    	            	  button.className = "btn btn-xs btn-danger";
	    	              }else if(jfc[j]['daySituation']=="JB"){
	    	            	  button.className = "btn btn-xs";
	    	            	  button.style.background = "#00FF7F";
	    	              }else if(jfc[j]['daySituation']=="WO"){
	    	            	  button.className = "btn btn-xs btn-warning";
	    	              }else if(jfc[j]['daySituation']=="WT"){
	    	            	  button.className = "btn btn-xs btn-primary";
	    	              }else{
	    	            	  button.className = "btn btn-xs btn-default";
	    	              }
	    	             
	    	              button.setAttribute("data-toggle", "tooltip");
	    	              if(jfc[j]['dayFirstTime']!=null){
	    	            	  button.setAttribute("title",jsonDateFormat(jfc[j]['dayFirstTime'])+"--"+jsonDateFormat(jfc[j]['dayEndTime']));
	    	              }else{
	    	            	  button.setAttribute("title","未打卡");
	    	              }
	    	              
	    	              button.innerText = jfc[j]['daySituation'];
	    	              divtable.appendChild(button);
	    	              tdTable.appendChild(divtable);
	    	              
	    	              trTable.appendChild(tdTable);
	        		  }
	        		  var res = data[0]['JB'];
	        		  for(var f = 0;f<res.length;f++){
	        			  if(parseInt(res[f]['falHaidon'])===result[i][0]['dayHaidon']){
	        				  var tds2 = document.createElement('td'),
        				      divs2 = document.createElement('div');
	        				  tds2.className = 'w-120';
	        				  divs2.className='table-cell';
	        				  divs2.innerText=parseInt(res[f]['falJb']/60)+"小时";
	        				  tds2.appendChild(divs2);
	        				  trTable.appendChild(tds2);
	        				  var tds1 = document.createElement('td'),
        				      divs1 = document.createElement('div');
	        				  tds1.className = 'w-120';
	        				  divs1.className='table-cell';
	        				  divs1.innerText=parseInt(res[f]['falTx']/60)+"小时";
	        				  tds1.appendChild(divs1);
	        				  trTable.appendChild(tds1);
	        				  var tds = document.createElement('td'),
	        				      divs = document.createElement('div');
	        				  tds.className = 'w-120';
	        				  divs.className='table-cell';
	        				  divs.innerText=parseInt(res[f]['falFalseDeposit']/60)+"小时";
	        				  tds.appendChild(divs);
	        				  trTable.appendChild(tds)
	        				  break;
	        			  }
	        		  }
	        		  var zcj = data[0]['ZCJ'];
	        		  for(var g = 0;g<zcj.length;g++){
	        			  if(parseInt(zcj[f]['haidon'])===result[i][0]['dayHaidon']){
	        				  var tds = document.createElement('td'),
        				      divs = document.createElement('div');
	        				  tds.className = 'w-120';
	        				  divs.className='table-cell';
	        				  divs.innerText=parseInt(zcj[f]['ZCJ']/60)+"小时";
	        				  tds.appendChild(divs);
	        				  trTable.appendChild(tds)
	        				  break;
	        			  }
	        		  }
	        		  node.appendChild(trTable);
	        	  }
	          },
	          error: function(d1,d2,d3){
	              console.log(d1);
	              console.log(d2);
	              console.log(d3);
	          }
	      })
	}
	///有时分秒
	function jsonDateFormat(jsonDate) {//json日期格式转换为正常格式
		 var birthday;
		  if (jsonDate != null) {
			  birthday = jsonDate["time"];
			  birthday = new Date(birthday);
			  var birth_month = birthday.getMonth() + 1;
			  var birth_day = birthday.getDate();
			  var hours = birthday.getHours(); 
			  var min = birthday.getMinutes();
			  if (birth_month < 10)
			    	birth_month = "0" + birth_month;
			  if(birth_day<10){
				  birth_day = "0" + birth_day;
			  }
			  if(hours<10){
				  hours = "0" + hours;
			  }
			  if(min<10){
				  min = "0" + min;
			  }
			  birthday = birthday.getFullYear() + "-" + birth_month + "-"
					+ birth_day+" "+hours+":"+min;
			  return birthday;
		  }else{
			  return "未打卡";
		  }
	}
	 //导入excel的保存按钮
    $("#attendance").on("click", function(event){
        var option = {
        	url: ""+realPath+"/attendance/ImportTxt",
        	type: 'post',
            dataType:"json",
            clearForm: true,
            resetForm: true,
            success: function(data){
				alert(data);
            }
        };
        $("#excelImport").ajaxSubmit(option);
        return false;
    });
    
    //
    $("#month").change(function(){
    	requestList();
    });
});



