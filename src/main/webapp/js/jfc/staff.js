var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	requestStaff(1);
	var staId;
	function requestStaff(pages){
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
            keyword: $("#keyword").val() || ""
			
	  }
	  $.ajax({
          url: ""+realPath+"/staff/search",
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
	          var staff = data[0]["jfcStaff"],
	          len = staff.length,
	            count = Math.ceil(data[0]["total"] / 10) || 1,
	            i;
	          var node = document.getElementById("the_table");
	          node.innerHTML = '';
	          for(i = 0; i < len; i++){
	        	  var tr = document.createElement("tr"),
	        	  name = document.createElement("td"),
	        	  inductionTime = document.createElement("td"),
	        	  staEmployment = document.createElement("td"),
	        	  staCity = document.createElement("td"),
	        	  staBirth = document.createElement("td"),
	        	  staUniversity = document.createElement("td"),
	        	  method = document.createElement("td"),
	        	  staPhone = document.createElement("td")
	        	  // 修改
	  			var update_btn = document.createElement("button");
	  			var updateButton = document.createElement("i");
	  			// 离职
	  			var stop_btn = document.createElement("button");
	  			var stopButton = document.createElement("i");
	        	
	  			update_btn.className = "btn btn-xs btn-primary update_btn";
	  			updateButton.className = "glyphicon glyphicon-edit";
	  			update_btn.setAttribute("data-toggle", "modal");
	  			update_btn.setAttribute("title", "修改");
	  			update_btn.setAttribute("data-target", "#myModal");
	  			update_btn.style.margin = "5px";
	  			stop_btn.className = "btn btn-xs btn-danger stop_btn";
	  			stopButton.className = "glyphicon glyphicon-remove";
	  			stop_btn.setAttribute("data-toggle", "tooltip");
	  			stop_btn.setAttribute("title", "离职");
	  			stop_btn.style.margin = "5px";
	  			update_btn.appendChild(updateButton);
				method.appendChild(update_btn);

				stop_btn.appendChild(stopButton);
//				/method.appendChild(stop_btn);
	        	  tr.className = 'table_row';
	        	  name.innerText = staff[i]['staName'];
	        	  var staInductionTime;
				  if (staff[i]["staInductionTime"] != null) {
					  birthday = staff[i]["staInductionTime"]["time"];
					  birthday = new Date(birthday);
					  var birth_month = birthday.getMonth() + 1;
					  var birth_day = birthday.getDate();
					  if (birth_month < 10)
					    	birth_month = "0" + birth_month;
					  if(birth_day<10){
						  birth_day = "0" + birth_day;
					  }
					  staInductionTime = birthday.getFullYear() + "-" + birth_month + "-"
							+ birth_day;
				  }
	        	  inductionTime.innerText = staInductionTime;
	        	  if(staff[i]["staEmployment"]==='1'){
	        		  var span =document.createElement("span");
	        		  span.className = "label label-success";
	        		  span.innerText = "正式";
	        		  staEmployment.appendChild(span);
	        	  }
	        	  if (staff[i]["staEmployment"] === '2') {
	        		  var span =document.createElement("span");
	        		  span.className = "label label-info";
	        		  span.innerText = "实习";
	        		  staEmployment.appendChild(span);
	        	  }
	        	  if (staff[i]["staEmployment"] === '3') {
	        		  var span =document.createElement("span");
	        		  span.className = "label label-danger";
	        		  span.innerText = "离职";
	        		  staEmployment.appendChild(span);
	        	  }
	        	  staCity.innerText = staff[i]["staCity"]
	        	  
	        	  var staBirthTime;
				  if (staff[i]["staBirthTime"] != null) {
					  birthday = staff[i]["staBirthTime"]["time"];
					  birthday = new Date(birthday);
					  var birth_month = birthday.getMonth() + 1;
					  var birth_day = birthday.getDate();
					  if (birth_month < 10)
					    	birth_month = "0" + birth_month;
					  if(birth_day<10){
						  birth_day = "0" + birth_day;
					  }
					  staBirthTime = birthday.getFullYear() + "-" + birth_month + "-"
							+ birth_day;
				  }
				  staBirth.innerText = staBirthTime;
				  staUniversity.innerText = staff[i]["staUniversity"] ;
				  staPhone.innerText = staff[i]["staPhone"];
				  
				  
				  tr.setAttribute("staId",staff[i]['staId']);
				  tr.setAttribute("name",staff[i]['staName']);
				  tr.setAttribute("staInductionTime",staInductionTime);
				  tr.setAttribute("staEmployment",staff[i]["staEmployment"]);
				  tr.setAttribute("staCity",staff[i]['staCity']);
				  tr.setAttribute("staBirthTime",staBirthTime);
				  tr.setAttribute("staUniversity",staff[i]['staUniversity']);
				  tr.setAttribute("staPhone",staff[i]['staPhone']);
				  tr.setAttribute("depId",staff[i]['depId']);
				  tr.setAttribute("staEducation",staff[i]['staEducation']);
				  tr.setAttribute("staNumber",staff[i]['staNumber']);
				  tr.setAttribute("staBankCark",staff[i]['staBankCark']);
				  tr.setAttribute("staCard",staff[i]['staCard']);
				  tr.setAttribute("staHaidon",staff[i]['staHaidon']);
				  tr.setAttribute("staTel",staff[i]['staTel']);
				  tr.setAttribute("staEmail",staff[i]['staEmail']);
				  
				 tr.appendChild(name);
				 tr.appendChild(inductionTime);
				 tr.appendChild(staEmployment);
				 tr.appendChild(staCity);
				 tr.appendChild(staBirth);
				 tr.appendChild(staUniversity);
				 tr.appendChild(staPhone);
				 tr.appendChild(method);
				 node.appendChild(tr);
	          }
	          $('#page').createPage({
		  			pageCount : count,
		  			current : page,
		  			backFn : function(p) {
		  				// 单击回调方法，p是当前页码
		  				requestStaff(p);
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
	//添加员工
	$("#addStaff").on('click',addStaff);	
	function addStaff(){
	  var to_send = {
			staId:staId,
			name : $(".sta_name").val(),
			inductionTime : $(".inductionTime").val(),
			staEmployment : $("#sta_employment").val(),
			staBirth : $(".sta_birth").val(),
			department : $("#department").val(),
			staCity : $(".sta_city").val(),
			staEducation : $(".sta_Education").val(),
			staNumber : $(".sta_number").val(),
			staBankCark : $(".sta_bank_cark").val(),
			staCard : $(".sta_card").val(),
			staUniversity : $(".sta_University").val(),
			staHaidon : $(".sta_haidon").val(),
			staPhone:$(".sta_phone").val(),
			staTel:$(".sta_tel").val(),
			staEmail:$(".sta_email").val()
		  }
	  $.ajax({
          url: ""+realPath+"/staff/addStaff",
          type: "post",
          dataType: "json",
          async: true,
          contentType : "application/JSON;charset=utf-8",
          data:JSON.stringify(to_send),
          success: function(data){
        	  requestStaff(1);
     		 $("#myModal").modal('hide');
     		 staId='';
     		 $(".sta_name").val('');
			 $(".inductionTime").val('');
			 $("#sta_employment").val('');
		     $(".sta_birth").val('');
			 $("#department").val('');
			 $(".sta_city").val('');
			 $(".sta_Education").val('');
			 $(".sta_number").val('');
			 $(".sta_bank_cark").val('');
			 $(".sta_card").val('');
		 	 $(".sta_University").val('');
			 $(".sta_haidon").val('');
			 $(".sta_phone").val('');
			 $(".sta_tel").val('');
			 $(".sta_email").val('')
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
	    staId = $(this).parents('.table_row').attr('staId');
		var the_name = $(this).parents('.table_row').attr('name');
		var the_staInductionTime = $(this).parents('.table_row').attr('stainductiontime');
		var the_staEmployment = $(this).parents('.table_row').attr('staEmployment');
		var the_staCity = $(this).parents('.table_row').attr('staCity');
		var the_staBirthTime = $(this).parents('.table_row').attr('stabirthtime');
		var the_staUniversity = $(this).parents('.table_row').attr('staUniversity');
		var the_staPhone = $(this).parents('.table_row').attr('staPhone');
		var the_depId = $(this).parents('.table_row').attr('depId');
		var the_staEducation = $(this).parents('.table_row').attr('staEducation');
		var the_staNumber = $(this).parents('.table_row').attr('staNumber');
		var the_staBankCark = $(this).parents('.table_row').attr('staBankCark');
		var the_staCard = $(this).parents('.table_row').attr('staCard');
		var the_staHaidon = $(this).parents('.table_row').attr('staHaidon');
		var the_tel = $(this).parents('.table_row').attr('staTel');
		var the_email = $(this).parents('.table_row').attr('staEmail');
		$(".sta_name").val(the_name);
		$(".inductionTime").val(the_staInductionTime);
		$("#sta_employment").val(the_staEmployment);
		$(".sta_birth").val(the_staBirthTime);
		$("#department").val(the_depId);
		$(".sta_city").val(the_staCity);
		$(".sta_Education").val(the_staEducation);
		$(".sta_number").val(the_staNumber);
		$(".sta_bank_cark").val(the_staBankCark);
		$(".sta_card").val(the_staCard);
		$(".sta_University").val(the_staUniversity);
		$(".sta_haidon").val(the_staHaidon);
		$(".sta_phone").val(the_staPhone);
		$(".sta_tel").val(the_tel);
		$(".sta_email").val(the_email);
	}
	$('#keyword').change(function(){ 
		requestStaff(1)
	});
	
});



