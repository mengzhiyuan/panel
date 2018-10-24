 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){
	if(sessionStorage.getItem("surveyName")==null){
	 	 location.href = realPath + "/wjLogin";
	  }
	
	var $distpicker = $('#distpicker');

	$distpicker.distpicker({
		autoSelect: false
	});
	 $("#fat-btn").on("click", function(){
		 $(this).button('loading').delay(1000).queue(function() {
		      if(isNaN($(".number").val())){
		    	  alert("份数请输入数字");
		    	  $("#fat-btn").button('reset').dequeue();
		    	  return;
		      } 
			  var data = {
					 linSingle:sessionStorage.getItem("link"),
					province: $(".province").val(),
		            city: $(".city").val(),
		            number:$(".number").val(),
		            remarks:$(".remarks").val()
			   };
			  $.ajax({
		            url: ""+realPath+"/questionnaire/createLink",
		            type: "post",
		            dataType: "json",
		            contentType: "application/JSON;charset=utf-8",
		            async: true,
		            data: JSON.stringify(data),
		            success: function(data){
		            	 searchLink(1);
		            	 $("#fat-btn").button('reset').dequeue();
		            	 $(".number").val("");
		            	 $(".remarks").val("");
		            	 $(".province").val();
		            	 $(".city").val();
		            },
		            error: function(d1,d2,d3){
		                console.log(d1);
		                console.log(d2);
		                console.log(d3);
		              
		            }
		        })
		});
	 });
	 
	 searchLink(1);
	  //初始化
    function searchLink(page){
    	if (parseInt(page) > 0) {
			var page = page
		} else {
			var page = 1
		}
		var data = {
			countPage : 10,
			currentPage : (page - 1)*10,
			keyword : $(".keyword").val() || ''
		};
        $.ajax({
            url: ""+realPath+"/questionnaire/searchLink",
            type: "post",
            dataType: "json",
            contentType: "application/JSON;charset=utf-8",
            async: true,
            data: JSON.stringify(data),
            success: function(data){
            	displayCreateLink(data, page);
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
            }
        });
    }
    $('#the_table').on('click', '.dis_able', beforeUpdate);
    function beforeUpdate(){
    	var the_tr = $(this).parents('.table_row').attr('linId');
    	  var data = {
    			  linId:the_tr
			   };
			  $.ajax({
		            url: ""+realPath+"/questionnaire/disableLink",
		            type: "post",
		            dataType: "json",
		            contentType: "application/JSON;charset=utf-8",
		            async: true,
		            data: JSON.stringify(data),
		            success: function(datas){
		            	 searchLink(1);
		            },
		            error: function(d1,d2,d3){
		                console.log(d1);
		                console.log(d2);
		                console.log(d3);
		              
		            }
		        })
    }
//表格渲染
function displayCreateLink(data, page) {
	var link = data[0]["result"], len = link.length, count = Math
			.ceil(data[0]["total"] / 10) || 1, node = document
			.getElementById("the_table"), i;
	node.innerHTML = '';
	for (i = 0; i < len; i++) {
		var tr = document.createElement("tr");
		var province = document.createElement("td");
		var city = document.createElement("td");
		var linkSingle = document.createElement("td");
		var remark = document.createElement("td");
		var linkInvalid = document.createElement("td");;
		var linkTag = document.createElement("td");
		var method = document.createElement("td");
		var tag_btn = document.createElement("button");
		var tagButton = document.createElement("i");
		var inv_btn = document.createElement("button");
		var invalid = document.createElement("i");
		
		tr.className = 'table_row';
		province.className="province";
		city.className="city";
		linkSingle.className="linkSingle";
		remark.className="remark";
		linkInvalid.className="linkInvalid";
		linkTag.className="linkTag";
		tag_btn.className="btn btn-xs btn-danger dis_able";
		tagButton.className = "glyphicon glyphicon-remove-sign";
		tag_btn.setAttribute("data-toggle","tooltip");
		tag_btn.setAttribute("title","禁用");
		
		tr.setAttribute("linId",link[i]['linId']);
	/*	tr.setAttribute("city",link[i]['linCity']);
		tr.setAttribute("linkSingle",link[i]['linSingle']);
		tr.setAttribute("remark",link[i]['linRemark']);
		tr.setAttribute("linkInvalid",link[i]['linInvalid']);
		tr.setAttribute("linkTag",link[i]['linkTag']);
		tr.setAttribute("linId",link[i]['linId']);*/
		
		province.innerText = link[i]['linProvince'];
		city.innerText = link[i]['linCity'];
		linkSingle.innerText = link[i]['linSingle'];
		remark.innerText = link[i]['linRemark'];
		//linkInvalid.innerText = link[i]['linInvalid'];
		//linkTag.innerText = link[i]['linkTag'];
		
		if(link[i]['linInvalid']!=''&&link[i]['linInvalid']=='1'){
			var inv =  document.createElement("span");
			inv.className = "glyphicon glyphicon-ok lg";
			inv.style.color="rgb(0, 255, 0)";
			linkInvalid.appendChild(inv);
		}else{
			var inv =  document.createElement("span");
			inv.className = "glyphicon glyphicon-remove lg";
			inv.style.color="rgb(255, 0,0)";
			linkInvalid.appendChild(inv);
		}
		if(link[i]['linTag']!=null&&link[i]['linTag']=='1'){
			var tag =  document.createElement("span");
			tag.innerText ="无效";
			tag.className = "label label-warning";
			linkTag.appendChild(tag);
		}else if(link[i]['linTag']!=null&&link[i]['linTag']=='2'){
			var tag =  document.createElement("span");
			tag.innerText ="有效";
			tag.className = "label label-success";
			linkTag.appendChild(tag);
			
		}else{
			var tag =  document.createElement("span");
			tag.innerText ="完成";
			tag.className = "label label-info";
			linkTag.appendChild(tag);
		}
		
		
		tag_btn.appendChild(tagButton);
		method.appendChild(tag_btn);
		tr.appendChild(province);
		tr.appendChild(city);
		tr.appendChild(remark);
		tr.appendChild(linkSingle);
		tr.appendChild(linkTag);
		tr.appendChild(linkInvalid);
		tr.appendChild(method);
		node.appendChild(tr);
	}
	$('#page').createPage({
		pageCount : count,
		current : page,
		backFn : function(p) {
			// 单击回调方法，p是当前页码
			 searchLink(p);
		}
	});
}



});








