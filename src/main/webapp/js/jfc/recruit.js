var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	requestRecruit(1);
	var the_tr;
	function requestRecruit(pages){
		var page;
		if(pages >= 0){
			page = pages;
		}
		else{
			page = 1
		}
	  var to_send = {
			countPage: 10,
            currentPage: (page - 1)*10,
            keyword: $(".keyword").val() || ""
			
	  }
	  $.ajax({
          url: ""+realPath+"/recruit/search",
          type: "post",
          dataType: "json",
          async: true,
          contentType : "application/JSON;charset=utf-8",
          data:JSON.stringify(to_send),
          success: function(data){
        	  var $node = $("#department"),
        	  departments = data[0]["department"],
              str = '';
        	  $node.append('');
	          for (var i = 0,len = data[0]["department"].length; i < len; i++){
	              str += '<option value="' + departments[i]["id"] + '">' + departments[i]["departmentValue"] + '</option>'
	          }
	          $node.append(str);
	          var recruit = data[0]["jfc"],
	          len = recruit.length,
	            count = Math.ceil(data[0]["total"] / 10) || 1,
	            i;
	          var node = document.getElementById("the_table");
	          node.innerHTML = '';
	          for(i = 0; i < len; i++){
	        	  var tr = document.createElement("tr"),
	        	  recRequirement = document.createElement("td"),//招聘需求
	        	  number = document.createElement("td"),
	        	  department = document.createElement("td"),
	        	  state = document.createElement("td"),
	        	  recDescribe = document.createElement("td"),
	        	  method = document.createElement("td"),
	        	  endtime = document.createElement("td")
	        	// 修改
	  			var update_btn = document.createElement("button");
	  			var updateButton = document.createElement("i");
	  			// 停止招聘
	  			var stop_btn = document.createElement("button");
	  			var stopButton = document.createElement("i");
	  		    // 添加面试人
				var preview_btn = document.createElement("button");
				var previewButton = document.createElement("i");
	            //查看所有
				var see_btn = document.createElement("button");
				var seeBtn = document.createElement("i");
				
	              tr.className = 'table_row';
	        	  recRequirement.className = "recRequirement";
	        	  number.className = "number";
	        	  department.className = "department";
	        	  state.className = "state";
	        	  endtime.className = "endtime";
	        	  recDescribe.className = "recDescribe";
	        	
	        	tr.setAttribute("recId",recruit[i]['recId']);
	        	tr.setAttribute("recDescribe",recruit[i]['recDescribe']);
	        	tr.setAttribute("depId",recruit[i]['depId'] );
	        	tr.setAttribute("recNumber",recruit[i]['recNumber'] );
	        	tr.setAttribute("recRequirement",recruit[i]['recRequirement'] );
	        	tr.setAttribute("depId",recruit[i]['depId']);
	        	
	        	
	  			update_btn.className = "btn btn-xs btn-primary update_btn";
	  			updateButton.className = "glyphicon glyphicon-edit";
	  			update_btn.setAttribute("data-toggle", "modal");
	  			update_btn.setAttribute("title", "修改");
	  			update_btn.setAttribute("data-target", "#myModal");
	  			update_btn.style.margin = "5px";
	  			stop_btn.className = "btn btn-xs btn-danger stop_btn";
	  			stopButton.className = "glyphicon glyphicon-remove";
	  			stop_btn.setAttribute("data-toggle", "tooltip");
	  			stop_btn.setAttribute("title", "停止招聘");
	  			stop_btn.style.margin = "5px";
				preview_btn.className = "btn btn-xs btn-success preview_btn";
				previewButton.className = "glyphicon glyphicon-plus";
				preview_btn.setAttribute("data-toggle", "modal");
				preview_btn.setAttribute("title", "添加面试人");
				preview_btn.setAttribute("data-target", "#modal");
				preview_btn.style.margin = "5px";
				see_btn.className = "btn btn-xs btn-danger see_btn";
	  			seeBtn.className = "glyphicon glyphicon-share-alt";
	  			see_btn.setAttribute("data-toggle", "tooltip");
	  			see_btn.setAttribute("title", "查看所有面试人");
	  		
				
				
	        	  recRequirement.innerText = recruit[i]['recRequirement'];
	        	  number.innerText = recruit[i]['recNumber'];
	        	  department.innerText = recruit[i]['department']['departmentValue'];
	        	  if (recruit[i]['recStatus'] === '1') {
	        		  var span =document.createElement("span");
	        		  span.className = "label label-success";
	        		  span.innerText = "发布中";
	        		  state.appendChild(span);
	        	  }
	        	  if (recruit[i]['recStatus'] === '2') {
	        		  var span =document.createElement("span");
	        		  span.className = "label label-danger";
	        		  span.innerText = "已完成";
	        		  state.appendChild(span);
	        	  }
	        	  var birthday;
				  if (recruit[i]["endTime"] != null) {
					  birthday = recruit[i]["endTime"]["time"];
					  birthday = new Date(birthday);
					  var birth_month = birthday.getMonth() + 1;
					  var birth_day = birthday.getDate();
					  if (birth_month < 10)
					    	birth_month = "0" + birth_month;
					  if(birth_day<10){
						  birth_day = "0" + birth_day;
					  }
					  birthday = birthday.getFullYear() + "-" + birth_month + "-"
							+ birth_day;
				  }
				  tr.setAttribute("endTime",birthday);
				// 描述
				   var describe = document.createElement("button");
				  	describe.className = "btn btn-xs btn-success";
					describe.setAttribute("data-toggle", "tooltip");
					describe.setAttribute("title", recruit[i]["recDescribe"]);
					describe.setAttribute("data-placement",top);
					//describe.style.margin = "5px";
					describe.innerText = "查看";
					recDescribe.appendChild(describe);
					
					update_btn.appendChild(updateButton);
					method.appendChild(update_btn);

					stop_btn.appendChild(stopButton);
					method.appendChild(stop_btn);
					
					preview_btn.appendChild(previewButton);
					method.appendChild(preview_btn);
					
					see_btn.appendChild(seeBtn);
					method.appendChild(see_btn);
					
				    endtime.innerText=birthday;
					tr.appendChild(recRequirement);
					tr.appendChild(number);
					tr.appendChild(endtime);
					tr.appendChild(department);
					tr.appendChild(recDescribe);
					tr.appendChild(state);
					tr.appendChild(method);
					node.appendChild(tr);
	          }
	          $('#page').createPage({
	  			pageCount : count,
	  			current : page,
	  			backFn : function(p) {
	  				// 单击回调方法，p是当前页码
	  				requestRecruit(p);
	  			}
	  		});
			  
          },
          error: function(d1,d2,d3){
              console.log(d1);
              console.log(d2);
              console.log(d3);
          }
      })
	}
		
      
      /*发布页面*/
      $('#release').on('click', release);
	  function release(){
		  var to_send = {
				  the_tr:the_tr,
				department: $("#department").val(),
				position: $(".position").val(),
				describe:$(".describe").val(),
				number:$(".numbers").val(),
				end_time:$(".end_time").val()
	        }
		  $.ajax({
	          url: ""+realPath+"/recruit/release",
	          type: "post",
	          dataType: "json",
	          async: true,
	          contentType : "application/JSON;charset=utf-8",
	          data:JSON.stringify(to_send),
	          success: function(data){
	        	 if(data[0].code==1){
	        		 requestRecruit(1);
	        		 $("#myModal").modal('hide')
	        	 }
	          },
	          error: function(d1,d2,d3){
	              console.log(d1);
	              console.log(d2);
	              console.log(d3);
	          }
	      })
	  }
	  // 修改问卷
	$('#the_table').on('click', '.update_btn', updateBtnUpdate);

	function updateBtnUpdate() {
	    the_tr = $(this).parents('.table_row').attr('recId');
		var the_recDescribe = $(this).parents('.table_row').attr('recDescribe');
		var the_recNumber = $(this).parents('.table_row').attr('recNumber');
		var the_recRequirement = $(this).parents('.table_row').attr('recRequirement');
		var the_endTime = $(this).parents('.table_row').attr('endTime');
		var the_depId = $(this).parents('.table_row').attr('depId');
		$("#department").val(the_depId);
		$(".position").val(the_recRequirement);
		$(".describe").val(the_recDescribe);
		$(".numbers").val(the_recNumber);
		$(".end_time").val(the_endTime);
	}
	//创建问卷
	$(".create_button").click(function(){
		the_tr = '';
		$("#department").val('');
		$(".position").val('');
		$(".describe").val('');
		$(".numbers").val('');
		$(".end_time").val('');
	});
	// 停止招聘
	$('#the_table').on('click', '.stop_btn', stopBtnUpdate);
	function stopBtnUpdate(){
		the_tr = $(this).parents('.table_row').attr('recId');
		  var to_send = {
				  the_tr:the_tr
	        }
		  $.ajax({
	          url: ""+realPath+"/recruit/stopBtnUpdate",
	          type: "post",
	          dataType: "json",
	          async: true,
	          contentType : "application/JSON;charset=utf-8",
	          data:JSON.stringify(to_send),
	          success: function(data){
	        	 if(data[0].code==1){
	        		 requestRecruit(1);
	        	 }
	          },
	          error: function(d1,d2,d3){
	              console.log(d1);
	              console.log(d2);
	              console.log(d3);
	          }
	      })
	}
	
	/*添加面试人员*/
	$('#the_table').on('click', '.preview_btn', previewBtn);
	$('#interview').on('click', interviewBtnUpdate);
	function previewBtn(){
	      the_tr='';
		  $(".m_name").val('');
		  $(".m_describe").val('');
		  $(".m_email").val('');
		  $(".m_phone").val('');
		the_tr = $(this).parents('.table_row').attr('recId');
	}
	function interviewBtnUpdate(){
		
		  var to_send = {
				  the_tr:the_tr,
				  name:$(".m_name").val(),
				  describe:$(".m_describe").val(),
				  email:$(".m_email").val(),
				  phone:$(".m_phone").val(),
				  channel:$("#m_channel").val()
	        }
		  $.ajax({
	          url: ""+realPath+"/recruit/interviewBtnUpdate",
	          type: "post",
	          dataType: "json",
	          async: true,
	          contentType : "application/JSON;charset=utf-8",
	          data:JSON.stringify(to_send),
	          success: function(data){
	        	  $("#modal").modal('hide')
	          },
	          error: function(d1,d2,d3){
	              console.log(d1);
	              console.log(d2);
	              console.log(d3);
	          }
	      })
	}
	/*添加面试人员*/
	$('#the_table').on('click', '.see_btn', seeBtn);
	function seeBtn(){
		the_tr = $(this).parents('.table_row').attr('recId');
		sessionStorage.setItem("recId",the_tr); 
		window.location.href = "/jfcpanel/html/jfc/interview.html";
	}
	
});



