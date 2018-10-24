/**
 * Created by wangxiangyang on 2017/12/26.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){

    function iteration(arr, ulist){
        var len = arr.length,
            i,
            str = ``;
        str += ` <dd>
  		<div class="title anchor" href="/html/jfc/kangpai/index_kol.html" id="Administra">
		       	<span><img src="`+ '../../../images/JFC/icon/icon15.png' +`"></span>
		       	<a >首页</a>
	       </div>
	    </dd>`;
        for (i = 0; i < len; i++){

        	if( arr[i].menuName==='系统管理'){
        		
        	}else{
        		   str += `<dd>
       			<div class="title" href="`+ arr[i].menuCode +`">
			        	<span><img src="`+ realPath + arr[i].menuClass +`"></span>
			        	<a>`+ arr[i].menuName +`</a>
			        </div>
		        </dd>`;
        	}
         


            //每个数组项对应一个li,li下面包含label*1 + checkbox*1 [+ ul*1]
            //var listItem = document.createElement("dd"),
            //    item_anchor = document.createElement("a"),
            //    item_left = document.createElement("img"),
            //    item_mid = document.createElement("div");
            //    //item_right = document.createElement("b");
            //
            //item_anchor.href = arr[i]["menuCode"];
            //item_anchor.className = "dropdown-toggle";
            //item_anchor.setAttribute("target", "right");
            //item_left.src = arr[i]["menuClass"];
            //item_mid.className = "menu-text";
            //item_mid.innerText = arr[i]["menuName"];
            //item_right.className = "arrow icon-angle-down";

            //将label和checkbox添加到listItem下
            //listItem.appendChild(item_anchor);
            //item_anchor.appendChild(item_left);
            //item_anchor.appendChild(item_mid);
            //如果ul下有li,则把ul添加下listItem下,否则销毁ul
            //if (sub_list.hasChildNodes()){
            //    listItem.appendChild(sub_list);
            //    item_anchor.appendChild(item_right)
            //} else {
            //    sub_list = null;
            //    item_right = null
            //}

            //将listItem添加到目标位置
        }
        str += `<dd>
            		<div class="title anchor" href="`+realPath+ '/main' +`">
    			       	<span><img src="` + '../../../images/JFC/icon/icon20.png' +`"></span>
	    		       	<a>OA</a>
			       </div>
			    </dd>
			    <dd>
            		<div class="title anchor" href="`+ '/html/index.html' +`">
    			       	<span><img src="`+ '../../../images/JFC/icon/icon21.png' +`"></span>
	    		       	<a>KangPai</a>
			       </div>
			    </dd>`;

        $(ulist).append(str)
    }


//	var list = cc[0]["allMenuList"],
//		top_list = document.getElementById("side_top_list");
//	iteration(list, top_list);

    $.ajax({
        url : "" + realPath + "/system/firstLevelMenuKOlpanel",
        data: JSON.stringify({
            email: JSON.parse(sessionStorage.getItem('sysUser')).email
        }),
        type : "post",
        dataType : "json",
        async : true,
        contentType : "application/JSON;charset=utf-8",
        success : function(data) {
            var list = data[0]["allMenuList"],
                top_list = document.getElementById("leftmenu");
            iteration(list, top_list);

            $(top_list).on('click', 'div.title', function(event){

                event.preventDefault();
                event.stopPropagation();
                $(".leftmenu dd .active").removeClass("active");
                $(this).addClass("active");
                try {
                    if ($(event.currentTarget).hasClass('anchor')){
                    	//window.parent.location.href = $(event.currentTarget).attr('href')
                    	if($(event.currentTarget).attr('id')==="Administra"){
                    		$('#rightFrame', window.parent.document).attr("src",realPath+$(event.currentTarget).attr('href'));
                    	}else{
                    		window.parent.location.href = $(event.currentTarget).attr('href');
                    	}
                    } else {
                        $.ajax({
                            url: realPath + "/system/twoLevelMenuKOLpanel",
                            type: 'post',
                            contentType: 'application/json;charset=utf-8',
                            data: JSON.stringify({
                                email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                                parentMenucode:$(event.currentTarget).attr('href')
                            }),
                            dataType: 'json',
                            async: true,
                            success: function(data){
                            	window.parent.topFrame.topLogins.innerHTML='';
                                let nav_top = window.parent.topFrame.nav,
                                    nodes = ``;

                                for (let i = 0, l = data[0].allMenuList.length; i < l; i++){

                                    if (data[0].allMenuList[i].menuName === '首页'){
                                        right.location.href = data[0].allMenuList[i].dataUrl
                                    } else {
                                        nodes += `<li>
                                    <a href="`+ data[0].allMenuList[i].dataUrl +`" target="rightFrame">
                                        <img src="`+ data[0].allMenuList[i].menuClass +`" title="`+ data[0].allMenuList[i].title +`" />
                                        <h2>`+ data[0].allMenuList[i].menuName +`</h2>
                                    </a>
                                </li>`
                                    }
                                }
                                $(nav_top).html(nodes);
                                $(nav_top).find('li:first-child>a').addClass('selected').click();
                            },
                            error: function(error){
                                console.log(error)
                            }
                        })
                    }
                } catch (e){
                    console.log(e)
                }
            });
        }
    });
}());