/**
 * Created by wangxiangyang on 2017/7/5.
 */
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPaht=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPaht+projectName;

var user = JSON.parse(sessionStorage.getItem('sysUser'))['userName'];
$("#user").html(user);
$(function(){
    function iteration(arr, ulist){
        var len = arr.length,
            i;

        for (i = 0; i < len; i++){
            //每个数组项对应一个li,li下面包含label*1 + checkbox*1 [+ ul*1]
            var listItem = document.createElement("li"),
                sub_list = document.createElement("ul"),
                item_anchor = document.createElement("a"),
                item_left = document.createElement("i"),
				item_mid = document.createElement("span"),
				item_right = document.createElement("b"),
                sub_arr = arr[i]["subAuthorityList"];

			item_anchor.href = realPath+arr[i]["dataUrl"];
			item_anchor.className = "dropdown-toggle";
			item_anchor.setAttribute("target", "right");
			item_left.className = arr[i]["menuClass"];
			item_mid.className = "menu-text";
			item_mid.innerText = arr[i]["menuName"];
			item_right.className = "arrow icon-angle-down";

            ////给列表项的checkbox添加属性值
            //item_check.className = "checks";
            //item_check.setAttribute("data_url", arr[i]["dataUrl"]);
            //item_check.type = "checkbox";
            //item_label.innerText = arr[i]["menuName"];
			sub_list.className = "submenu";

            //如果子数组有数组项,则迭代处理(arg1:子数组,arg2:li下的ul元素)
            if (sub_arr.length > 0) {
                iteration(sub_arr, sub_list);
            }

            //将label和checkbox添加到listItem下
            listItem.appendChild(item_anchor);
			item_anchor.appendChild(item_left);
			item_anchor.appendChild(item_mid);
            //如果ul下有li,则把ul添加下listItem下,否则销毁ul
            if (sub_list.hasChildNodes()){
                listItem.appendChild(sub_list);
				item_anchor.appendChild(item_right)
            } else {
                sub_list = null;
				item_right = null
            }

            //将listItem添加到目标位置
            ulist.appendChild(listItem)
        }
    }


//	var list = cc[0]["allMenuList"],
//		top_list = document.getElementById("side_top_list");
//	iteration(list, top_list);
    $.ajax({
        type : "post",
        url : ""+realPath+"/system/menuKOLPanel",
        contentType : "application/JSON;charset=utf-8",
        dataType: "json",
        success : function(data) {
            var list = data[0]["allMenuList"],
				top_list = document.getElementById("side_top_list");
			iteration(list, top_list);
			$('#side_top_list').append(`<li>
			<a href="/jfcpanel/home" class="dropdown-toggle" target="_top">
				<i class="glyphicon glyphicon-arrow-right"></i>
				<span class="menu-text">OA系统</span>
				</a>
		</li>`);
		$('#side_top_list').append(`<li>
		<a href="/jfcpanel/html/index.html" class="dropdown-toggle" target="_top">
			<i class="glyphicon glyphicon-arrow-right"></i>
			<span class="menu-text">调查平台</span>
			</a>
		</li>`);
    
        }
    });
});