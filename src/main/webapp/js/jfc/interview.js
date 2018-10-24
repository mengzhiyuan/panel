var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	 window.onbeforeunload=function(){
		 sessionStorage.removeItem("recId"); 
		}
	 requestInterview();
	 function requestInterview(){
		 var to_send = {
				 the_tr:sessionStorage.getItem("recId")
		 }
		 $.ajax({
	         url: ""+realPath+"/recruit/interviewSearch",
	         type: "post",
	         dataType: "json",
	         async: true,
	         contentType : "application/JSON;charset=utf-8",
	         data:JSON.stringify(to_send),
	         success: function(data){
	        	 interview = data[0]["interview"],
	             str = '';
		          var inter = data[0]["jfc"],
		          len = interview.length,
		            i;
		          var node = document.getElementById("the_table");
		          node.innerHTML = ''
		          for(i = 0; i < len; i++){
		        	  var tr = document.createElement("tr"),
		        	  name = document.createElement("td"),
		        	  phone = document.createElement("td"),
		        	  describe = document.createElement("td"),
		        	  time = document.createElement("td"),
		        	  email = document.createElement("td"),
		        	  method = document.createElement("td"),
		        	  channel = document.createElement("td"),
		        	  state = document.createElement("td")
		        	  // 录用
		  			var employment_btn = document.createElement("button");
		  			var employmentButton = document.createElement("i");
		  			
		  			employment_btn.className = "btn btn-xs btn-success employment_btn";
		  			employmentButton.className = "glyphicon glyphicon-ok";
		  			employment_btn.setAttribute("data-toggle", "tooltip");
		  			employment_btn.setAttribute("title", "录用");
		  			employment_btn.style.margin = "5px";
		  			employment_btn.appendChild(employmentButton);
					method.appendChild(employment_btn);
		  			
		  			// 拒绝
		  			var refuse_btn = document.createElement("button");
		  			var refuseButton = document.createElement("i");
		  			refuse_btn.className = "btn btn-xs btn-danger refuse_btn";
		  			refuseButton.className = "glyphicon glyphicon-remove";
		  			refuse_btn.setAttribute("data-toggle", "tooltip");
		  			refuse_btn.setAttribute("title", "拒绝");
		  			
		  			refuse_btn.appendChild(refuseButton);
					method.appendChild(refuse_btn);
					tr.className = 'table_row';
					tr.setAttribute("intId",interview[i]['intId']);
					tr.setAttribute("email",interview[i]['intEmail']);
		        	  name.innerText =interview[i]['intName'] ;
		        	  phone.innerText =interview[i]['intPhone'] ;
		        	  describe.innerText =interview[i]['intDescribe'] ;
		        	  email.innerText =interview[i]['intEmail'] ;
		        	  channel.innerText =interview[i]['intChannel'] ;
		        	  var birthday;
					  if (interview[i]["intTime"] != null) {
						  birthday = interview[i]["intTime"]["time"];
						  birthday = new Date(birthday);
						  var birth_month = birthday.getMonth() + 1;
						  if (birth_month < 10)
						    	birth_month = "0" + birth_month;
						  birthday = birthday.getFullYear() + "-" + birth_month + "-"
								+ birthday.getDate();
					  }
					  time.innerText =birthday;
					  if(interview[i]["intStatus"]=='1'){
						  var span =document.createElement("span");
		        		  span.className = "label label-success";
		        		  span.innerText = "审核中";
		        		  state.appendChild(span);
					  }
					  if(interview[i]["intStatus"]=='3'){
						  var span =document.createElement("span");
		        		  span.className = "label label-danger";
		        		  span.innerText = "已拒绝";
		        		  state.appendChild(span);
					  }
					  if(interview[i]["intStatus"]=='2'){
						  var span =document.createElement("span");
		        		  span.className = "label label-info";
		        		  span.innerText = "录用";
		        		  state.appendChild(span);
					  }
					  
					  
					  tr.appendChild(name);
					  tr.appendChild(phone);
					  tr.appendChild(describe);
					  tr.appendChild(time);
					  tr.appendChild(email);
					  tr.appendChild(channel);
					  tr.appendChild(state);
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
	// 录用
		$('#the_table').on('click', '.employment_btn', employmentBtnUpdate);
		function employmentBtnUpdate(){
			var the_tr = $(this).parents('.table_row').attr('intId');
			var email = $(this).parents('.table_row').attr('email');
			
			  var to_send = {
					  the_tr:the_tr
		        }
			  $.ajax({
		          url: ""+realPath+"/recruit/employmentBtnUpdate",
		          type: "post",
		          dataType: "json",
		          async: true,
		          contentType : "application/JSON;charset=utf-8",
		          data:JSON.stringify(to_send),
		          success: function(data){
		        	  requestInterview();
		        	  location.href="mailto:?cc="+email+"&subject=北京市场联合调查有限公司&body=您也被本公司录用呵呵";
		          },
		          error: function(d1,d2,d3){
		              console.log(d1);
		              console.log(d2);
		              console.log(d3);
		          }
		      })
		}
		// 拒绝
		$('#the_table').on('click', '.refuse_btn', refuseBtn);
		function refuseBtn(){
			var the_tr = $(this).parents('.table_row').attr('intId');
			var email = $(this).parents('.table_row').attr('email');
			
			  var to_send = {
					  the_tr:the_tr
		        }
			  $.ajax({
		          url: ""+realPath+"/recruit/refuseUpdate",
		          type: "post",
		          dataType: "json",
		          async: true,
		          contentType : "application/JSON;charset=utf-8",
		          data:JSON.stringify(to_send),
		          success: function(data){
		        	  requestInterview();
		          },
		          error: function(d1,d2,d3){
		              console.log(d1);
		              console.log(d2);
		              console.log(d3);
		          }
		      })
		}
	
});



