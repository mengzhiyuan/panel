/**
 * Created by wangxiangyang on 2017/7/5.
 */
 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;

$(function(){

    //标签页切换方法
    $("#labels").on("click", "li", function(event){
        if (!$(this).hasClass("active")){
            var active_class = $(this).attr("class");
            $(this).addClass("active").siblings().removeClass("active");
            $("#criteria").find("." + active_class).addClass("active").siblings().removeClass("active")
        }
    });


    //#more点击按钮的显示/隐藏方法
    function expand(event){
        if ($(this).attr("expanded") == "false"){
            $("#criteria #expand").css("display","block");
            $("#criteria #expand div").css("display", "block");
            $("#extra div").css("display", "inline-block");
            $(this).attr("expanded", "true")
        } else {
            $("#criteria #expand").css("display","none");
            $("#criteria #expand div").css("display", "none");
            $(this).attr("expanded", "false")
        }
    }

    //列表部分请求方法(模糊查询)
    function requestDoctor(pages){
    	var page;
    	if(pages >= 0){
    		page = pages;
    	}
    	else{
    		page = 1
    	}
        var to_send = {
            countPage: 10,
            currentPage: page - 1,
            keyword: $("#keyword").val() || ""
        };

        $.ajax({
            url: ""+realPath+"/doctor/search",
            type: "post",
            dataType: "json",
            async: true,
            contentType : "application/JSON;charset=utf-8",
            data:JSON.stringify(to_send),
            success: function(data){
                displayDoctor(data,page)
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
            }
        })
    }

    function request(page){
        requestDoctor(page);
    }

    $("#fuzzy_go").on("click",function(event){
        requestDoctor(1);
        sessionStorage.setItem("request","requestDoctor");
        request = function(page){
            requestDoctor(page);
        }
    });

    $("#accurate_go").on("click", function(event){
        exactQuery(1);
        sessionStorage.setItem("request","exactQuery");
        request = function(page){
            exactQuery(page);
        }
    });

    //列表部分请求方法(精确查询)
    function exactQuery(pages){
    	var page;
    	if(pages >= 0){
    		page = pages;
    	}
    	else{
    		page = 1
    	}
        var to_send = {
            countPage: 10,
            currentPage: page - 1 || 0
        },
            value;
        //省
        value = $('#province').val();
        if (value != ''){
            to_send.province = value;
        }
        //市
        value = $('#city').val();
        if (value != ''){
            to_send.city = value;
        }
        //区县
        value = $('#district').val();
        if (value != ''){
            to_send.district = value;
        }
        //医院级别
        value = $('#hospital_level').val();
        if (value != ''){
            to_send.hospitallevel = value;
        }
        value = $('#hospital_grade').val();
        if (value != ''){
            to_send.hospitalGrade = value;
        }
        val = $('#hospital_level').find('option:selected').text();
        if (val != ''){
        	if(val!='请选择'){
        		 to_send.hospitallevelName = val;
        	}
        }
        //医院类别
        value = $('#type_id').val();
        if (value != ''){
            to_send.typeId = value;
        }
        //盈利性质
        value = $('#property_id').val();
        if (value != ''){
            to_send.propertyId = value;
        }
        //职称类别
        value = $('#category').val();
        if (value != ''){
            to_send.category = value;
        }
        //职称级别
        value = $('#level').val();
        if (value != ''){
            to_send.level = value;
        }
        //行政职称
        value = $('#administrative').val();
        if (value != ''){
            to_send.administrative = value;
        }
        //科室类别
        value = $('#departmentCategory').val();
        if (value != ''){
            to_send.departmentCategory = value;
        }
        //所在科室
        value = $('#departmentBelonged').val();
        if (value != ''){
            to_send.departmentBelonged = value;
        }
        //科室性质
        value = $('#nature').val();
        if (value != ''){
            to_send.nature = value;
        }
        //专业领域
        value = $('#spec').val();
        if (value != ''){
            to_send.spec = value;
        }
        //医生性别
        value = $('#doc_sex').val();
        if (value != ''){
            to_send.docSex = value;
        }
        //医生年龄
        value = $('#doc_old').val();
        if (value != ''){
            to_send.docOld = value;
        }
        //医龄
        value = $('#docPostageTime').val();
        if (value != ''){
            to_send.docPostageTime = value;
        }
        //学历
        value = $('#doc_education').val();
        if (value != ''){
            to_send.docEducation = value;
        }
        //岗位年龄
        value = $('#docEmploymentTime').val();
        if (value != ''){
            to_send.docEmploymentTime = value;
        }
        //数据重要度
        value = $('#importance').val();
        if (value != ''){
            to_send.importance = value;
        }
        //数据配合度
        value = $('#coor_id').val();
        if (value != ''){
            to_send.coorId = value;
        }
        //数据活跃度
        value = $('#liveness').val();
        if (value != ''){
            to_send.liveness = value;
        }
        //数据创建时间
        value = $('#doc_createTime').val();
        if (value != ''){
            to_send.docCreateTime = value;
        }
        //数据更新时间
        value = $('#doc_updateTime').val();
        if (value != ''){
            to_send.docUpdateTime = value;
        }
        //kol属性
        value = $('#kol').val();
        if (value != ''){
            to_send.kol = value;
        }
        //payer属性
        value = $('#payer').val();
        if (value != ''){
            to_send.payer = value;
        }
        //采购属性
        value = $('#purchase').val();
        if (value != ''){
            to_send.purchId = value;
        }

        $.ajax({
            url: ""+realPath+"/doctor/searchSelect",
            type: "post",
            dataType: "json",
            async: true,
            contentType : "application/JSON;charset=utf-8",
            data:JSON.stringify(to_send),
            success: function(data){
                displayDoctor(data,page)
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
            }
        })
    }

    
    //request(1);
    //现修改为根据sessionStorage内的request方法和页码进行操作
    (function(){
        if (sessionStorage.getItem("request") == null){
            requestDoctor(1);
        } else {
            var currentPage = sessionStorage.getItem("currentPage");
            if (sessionStorage.getItem("request") == "requestDoctor"){
                requestDoctor(currentPage)
            } else if (sessionStorage.getItem("request") == "exactQuery"){
                exactQuery(currentPage)
            }
            sessionStorage.setItem("currentPage", null);
        }
    }());
    
    //列表部分渲染方法
    function displayDoctor(data,page){
    	$("#totals").append(" <li class=\"disabled\"><span>共"+data[0]["total"] +"条数据</span></li>");
        var doc = data[0]["result"],
            len = doc.length,
            count = Math.ceil(data[0]["total"] / 10) || 1,
            i;
        var node = document.getElementById("the_table");
        node.innerHTML = '';
        for (i = 0; i < len; i++){
            var tr = document.createElement("tr"),//tr
                center = document.createElement("td"),//第一列
                check = document.createElement("input"),//第一列的checkbox
                span = document.createElement("span"),//第一列的span
                name = document.createElement("td"),
                province = document.createElement("td"),
                city = document.createElement("td"),
                hospital = document.createElement("td"),
                level = document.createElement("td"),
                telephone = document.createElement("td"),
                belong = document.createElement("td"),
                levId = document.createElement("td"),
                method = document.createElement("td"),
                buttongroup = document.createElement("span"),
                update_btn = document.createElement("button"),
                edit = document.createElement("i"),
                //delete_btn = document.createElement("button"),
                sear_btn = document.createElement("button"),
                trash = document.createElement("i"),
                sendEmail = document.createElement("button"),
                envelope = document.createElement("i");

            //tr的类和属性
            tr.className = 'table_row';
            tr.setAttribute("this_id", doc[i]["docId"] || "");  //主键
            tr.setAttribute("this_email", doc[i]["docEmail"] || "");  //邮箱
            tr.setAttribute("docIdentity", doc[i]["docIdentity"]||"");  //资质证
            tr.setAttribute("docPronumber", doc[i]["docPronumber"]||"");  //身份证
            tr.setAttribute("docRecommender", doc[i]["docRecommender"]||""); //学历
            tr.setAttribute("kol", doc[i]["kolId"]||"");
            tr.setAttribute("payer", doc[i]["payerId"]||"");
            tr.setAttribute("purchase",doc[i]["purchId"]||"");
            tr.setAttribute("category", doc[i]["catId"]||"");
            //tr.setAttribute("levId", doc[i]["levId"]||"");
            //tr.setAttribute("hosgraId", doc[i]["hosgraId"]||"");
            tr.setAttribute("phone2", doc[i]["docPhone2"]||"");  //电话2
            tr.setAttribute("phone3", doc[i]["docPhone3"]||"");  //电话3
            tr.setAttribute("admiId", doc[i]["admiId"]||"");
            if (doc[i]["departmentCategory"]){                    //科室类别
            	tr.setAttribute("departmentCategory", doc[i]["departmentCategory"]["categId"]||"");
            } else {
            	tr.setAttribute("departmentCategory", "");
            }
            tr.setAttribute("departmentBelonged", doc[i]["belongId"]||"");   //所在科室
            tr.setAttribute("natId", doc[i]["natId"]||"");                //科室性质
            tr.setAttribute("specId", doc[i]["specId"]||"");              //专业领域
            tr.setAttribute("docSex", doc[i]["docSex"]||"");              //性别
            tr.setAttribute("docOld", doc[i]["docOld"]||"");              //年龄
            tr.setAttribute("docPostageTime", doc[i]["docPostageTime"]||"");  //医龄
            tr.setAttribute("docEducation", doc[i]["docEducation"]||"");      //学历
            tr.setAttribute("docEmploymentTime", doc[i]["docEmploymentTime"]||"");  //
            tr.setAttribute("importId", doc[i]["importId"]||"");                   //数据重要性
            tr.setAttribute("coorId", doc[i]["coorId"]||"");                      //医生配合度
            tr.setAttribute("attri", doc[i]["attrId"]||"");                     //数据属性
            tr.setAttribute("liveId", doc[i]["liveId"]||"");                     //医生活跃度
            //显示
            if(doc[i]["category"]){
            	tr.setAttribute("catName", doc[i]["category"]["catName"]||"");     //职称类别
            }else{
            	tr.setAttribute("catName", "");
            }
            	tr.setAttribute("levName", doc[i]["levId"]||"");                //职称级别
            if(doc[i]["administrative"]){
            	tr.setAttribute("admiName", doc[i]["administrative"]["admiName"]||"");  //行政职称
            }else{
            	tr.setAttribute("admiName", "");
            }
            
            if(doc[i]["nature"]){
            	tr.setAttribute("natName", doc[i]["nature"]["natName"]||"");   //科室性质
            }else{
            	tr.setAttribute("natName", "");
            }
            if(doc[i]["departmentCategory"]){
            	tr.setAttribute("categName", doc[i]["departmentCategory"]["categName"]||"");  //科室类别
            }else{
            	tr.setAttribute("categName", "");
            }
            	tr.setAttribute("belongName", doc[i]["belongId"]||""); //所在科室
            //第一列的类和属性
            center.className = 'center';
            check.className = 'ace checks';
            check.setAttribute("type", "checkbox");
            span.className = 'lbl';
            //第二列的类和属性
            name.className = 'this_name';
            name.innerText = doc[i]["docName"] || '';
            city.className = 'this_city';
            province.innerText = doc[i]["hospital"]["hosProvince"] || '';
            province.className='this_province';
            city.innerText = doc[i]["hospital"]["hosCity"] || '';
            //医院信息,类,属性
            hospital.className = 'this_hospital';
            hospital.innerText = doc[i]["hospital"]["hosName"]||"";
            hospital.setAttribute("hosId", doc[i]["hospital"]["hosId"]||"");
            hospital.setAttribute("hosName", doc[i]["hospital"]["hosName"]||"");
            hospital.setAttribute("hosTel", doc[i]["hospital"]["hosTel"]||"");
            hospital.setAttribute("hosProvince", doc[i]["hospital"]["hosProvince"]||"");
            hospital.setAttribute("hosCity", doc[i]["hospital"]["hosCity"]||"");
            hospital.setAttribute("hosDistrict", doc[i]["hospital"]["hosDistrict"]||"");
            hospital.setAttribute("typeId", doc[i]["hospital"]["typeId"]||"");
            hospital.setAttribute("profitId", doc[i]["hospital"]["profitId"]||"");
            hospital.setAttribute("propertyId", doc[i]["hospital"]["propertyId"]||"");
            //等级
            hospital.setAttribute("hosgraId", doc[i]["hospital"]["hosgraId"]||"");
            hospital.setAttribute("hoslelId", doc[i]["hospital"]["hoslelId"]||"");
            //级别
           // level.className = 'this_level';
            if (doc[i]['hospital']){
            	var lev = doc[i]["hospital"]["hoslelId"]||"";
            	var gra = doc[i]["hospital"]["hosgraId"]||"";
            	if(gra==1){
            		gra = "甲等";
            	}else if(gra==2){
            		gra = "已等";
            	}else if(gra==3){
            		gra = "丙等";
            	}
            	
            	if(lev==1){
            		lev = "一级";
            	}else if(lev==2){
            		lev="二级";
            	}else if(lev==3){
            		lev="三级";
            	}
            	level.innerText = lev+gra;
            }
            /*if (doc[i]['hospitallevel']){
            	level.setAttribute("hoslelId", doc[i]["hospitallevel"]["hoslelId"]||"");
            }*/
            telephone.className = 'this_telephone';
            telephone.innerText = doc[i]["docPhone1"]||"";
            belong.className ='this_belong';
            belong.innerText = doc[i]["belongId"]||"";
            levId.className = 'this_levId';
            levId.innerText = doc[0]['levId']||"";
            //按钮组
            method.className = 'this_method';
            buttongroup.className = 'btn-group btngp';
            update_btn.className = 'btn btn-xs btn-info update_btn';
            update_btn.setAttribute("data-toggle", "tooltip");
            update_btn.setAttribute("title", "编辑本条数据");
            edit.className = 'glyphicon glyphicon-edit';
            //delete_btn.className = 'btn btn-xs btn-danger delete_btn';
            sear_btn.className = 'btn btn-xs btn-danger sear_btn';
            sear_btn.setAttribute("data-toggle", "modal");// 给按钮绑定弹出模态框的方法
            sear_btn.setAttribute("data-target", "#uploadModals");
           /* sear_btn.setAttribute("data-toggle", "tooltip");*/
            sear_btn.setAttribute("title", "查看本条数据");
            
            trash.className = 'glyphicon glyphicon-fire';
            sendEmail.className = 'btn btn-xs btn-info sendEmail';
            envelope.className = 'glyphicon glyphicon-envelope';
            sendEmail.setAttribute("data-toggle", "tooltip");
            sendEmail.setAttribute("title", "发送邮件");

            //添加标签
            center.appendChild(check);
            center.appendChild(span);
            update_btn.appendChild(edit);
            //delete_btn.appendChild(trash);
            sear_btn.appendChild(trash);
            sendEmail.appendChild(envelope);
            buttongroup.appendChild(update_btn);
            //buttongroup.appendChild(delete_btn);
            buttongroup.appendChild(sear_btn);
            buttongroup.appendChild(sendEmail);
            method.appendChild(buttongroup);

            tr.appendChild(center);
            tr.appendChild(name);
            tr.appendChild(city);
            tr.appendChild(hospital);
            tr.appendChild(level);
            tr.appendChild(telephone);
            tr.appendChild(belong);
            tr.appendChild(levId);
            //tr.appendChild(time);
            tr.appendChild(method);
            node.appendChild(tr);

        }

        //分页部分
        $('#page').createPage({
            pageCount: count,
            current:page,
            backFn:function(p){
                //单击回调方法，p是当前页码
                request(p);
            }
        });
    }
    $('#the_table').on('click', '.sear_btn', searBtn);
   function searBtn(){
	   var pro = $(this).parents(".table_row").find(".this_hospital").attr("hosProvince");
	   var city = $(this).parents(".table_row").find(".this_hospital").attr("hosCity");
	   var dis = $(this).parents(".table_row").find(".this_hospital").attr("hosDistrict");
	   $("#prov").html("省份:"+pro+",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"城市："+city+",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"地区："+dis);
	   $("#nam").html("单位："+$(this).parents(".table_row").find(".this_hospital").attr("hosName"));
	   var lev = $(this).parents(".table_row").find(".this_hospital").attr("hoslelId");
	   if(lev==1)  $("#leel").html("级别:一级");
	   if(lev==2)  $("#leel").html("级别:二级");
	   if(lev==3)  $("#leel").html("级别:三级");
	   if(lev==4)  $("#leel").html("级别:未知");
	  var gra = $(this).parents(".table_row").find(".this_hospital").attr("hosgraId");
	   if(gra==1)  $("#grad").html("等级:甲等");
	   if(gra==2)  $("#grad").html("等级:乙等");
	   if(gra==3)  $("#grad").html("等级:丙等");
	   if(gra==4)  $("#grad").html("等级：未知");
       var type = $(this).parents(".table_row").find(".this_hospital").attr("typeId");
       var profit= $(this).parents(".table_row").find(".this_hospital").attr("profitId");
	   $("#tell").html("电话:"+$(this).parents(".table_row").find(".this_hospital").attr("hosTel"));
	   if(type==1) $("#lei").html("医院类型:综合");
	   if(type==2) $("#lei").html("医院类型:专科");
	   if(type==3) $("#lei").html("医院类型:其他");
	   if(profit==1)   $("#shu").html("医院属性:公立");
	   if(profit==2)   $("#shu").html("医院属性:私立");
	   if(profit==3)   $("#shu").html("医院属性:其他");
	   var sex = $(this).parents(".table_row").attr("docSex");
	   if(sex==1) $("#bie").html("性别:男");
	   if(sex==0) $("#bie").html("性别:女");
	   $("#xing").html("姓名:"+$(this).parents(".table_row").find(".this_name").text());
	   $("#dian").html("电话:"+$(this).parents(".table_row").find(".this_telephone").text());
	   $("#you").html("邮箱:"+$(this).parents(".table_row").attr("this_email"));
	   $("#qq").html("身份证:"+$(this).parents(".table_row").attr("docIdentity"));
	   $("#zuo").html("座机:"+$(this).parents(".table_row").attr("phone2"));
	   $("#shengf").html("QQ:"+$(this).parents(".table_row").attr("phone3"));
	   $("#nian").html("年龄:"+$(this).parents(".table_row").attr("docOld"));
	   $("#xueli").html("学历:"+ $(this).parents(".table_row").attr("docEducation"));
	   $("#yi").html("医龄:"+$(this).parents(".table_row").attr("docPostageTime"));
	   $("#leibie").html("职称类别:"+$(this).parents(".table_row").attr("catName"));
	   $("#jibi").html("职称类别:"+ $(this).parents(".table_row").attr("levName"));
	   $("#zhicheng").html("行政职称:"+$(this).parents(".table_row").attr("admiName"));
	   
	   $("#nut").html("科室性质:"+$(this).parents(".table_row").attr("natName"));
	   $("#dec").html("科室类别:"+ $(this).parents(".table_row").attr("categName"));
	   $("#deb").html("所在科室:"+$(this).parents(".table_row").attr("belongName"));
	   $("#docId").html( $(this).parents('.table_row').attr('this_id'));
	/*  
       docPronumber = $(this).parents(".table_row").attr("docPronumber"),
       docRecommender = $(this).parents(".table_row").attr("docRecommender"),
       kolId = $(this).parents(".table_row").attr("kol"),
       payerId = $(this).parents(".table_row").attr("payer"),
       purchId = $(this).parents(".table_row").attr("purchase"),
       departmentCategory = $(this).parents(".table_row").attr("departmentCategory"),
       departmentBelonged = $(this).parents(".table_row").attr("departmentBelonged"),
       natId = $(this).parents(".table_row").attr("natId"),
       specId = $(this).parents(".table_row").attr("specId"),
       docEmplymentTime = $(this).parents(".table_row").attr("docEmploymentTime"),
       importId = $(this).parents(".table_row").attr("importId"),
       coorId = $(this).parents(".table_row").attr("coorId"),
       liveId = $(this).parents(".table_row").attr("liveId"),
       */
	 
   }
    var int;
    //导入excel的保存按钮
    $("#excel_save").on("click", function(event){
    	$("#uploadModal").css("display", "none");
		$('.modal-backdrop').css("display", "none");
		$(".demo").show();
		//int=setInterval(clock,3000);
        var option = {
        		url: ""+realPath+"/doctor/ImportExcel",
        		type: 'post',
            dataType:"json",
            clearForm: true,
            resetForm: true,
            success: function(data){
                var res = data[0]["result"];
				//clearInterval(int);
                if (res > 0){
                	$(".progress-bar").width("100%");
					$("#spa").html("100%");
                    $("#uploadModal").css("display", "none");
                    var dialog_excel = new TipBox({type:'success',str:'操作成功',hasBtn:true});
                    $(".okoButton").one("click", function(){
                    	 requestDoctor(1);
                    	 $(".demo").hide();
                    	 $(".progress-bar").width("0%");
     					$("#spa").html("0%");
                        $("#uploadModal").css("display", "none");
                        $(".modal-backdrop").css("display", "none");
                    });
                } else {
                    var dialog = new TipBox({type: 'error', str: '操作失败,请重试',hasBtn:true});
                }
            }
        };
        $("#excelImport").ajaxSubmit(option);
        return false;
    });

    //匹配搜索
    $("#btn_matching").on("click", function(event){
    	$(".demo").show();
    	var match = {
    		url: ""+realPath+"/doctor/matching",
    		type: 'post',
            dataType:"json",
            clearForm: true,
            resetForm: true,
            success: function(data){
                var res = data[0]["results"];
                if (res > 0){
                	
                	$(".progress-bar").width("100%");
					$("#spa").html("100%");
                    var dialog_excel = new TipBox({type:'success',str:'操作成功',hasBtn:true});
                    $(".okoButton").one("click", function(){
                    	displayDoctor(data,1);
                    	 $(".demo").hide();
                    	 $(".progress-bar").width("0%");
     					$("#spa").html("0%");
                    });
                } else {
                    var dialog = new TipBox({type: 'error', str: '操作失败,请重试',hasBtn:true});
                }
            }
        };
    	 $("#matching").ajaxSubmit(match);
         return false;
    });

    //发送邮件(单个)
    function singleSend(event){
        var email_address = $(this).parents(".table_row").attr("this_email"),
        arr = [email_address];
        sendEmail(arr)
    }
    //发送邮件(多个)
    function multiSend(event){
        var checked_checkbox = $("#the_table").find(".checks:checked"),
            arr = [];
        checked_checkbox.each(function(){
            arr.push($(this).parents(".table_row").attr("this_email"))
        });
        sendEmail(arr)
    }

    $("#the_table").on("click", ".sendEmail", singleSend);
    $("#mail").on("click", multiSend);

    //发送邮件&群发邮件(请求部分)
    function sendEmail(addresses){
        var to_send = JSON.stringify(addresses);
        $.ajax({
            url:""+realPath+"/doctor/sendEmail",
            type: 'post',
            dataType: 'json',
            contentType: 'application/JSON;charset=utf-8',
            async: true,
            data: to_send,
            success: function(data){
                if (data[0]['result'] > 0){
                    var dialog_email = new TipBox({type:'success',str:'发送邮件成功',hasBtn:true});
                } else {
                    var dialog_email = new TipBox({type: 'error', str: '发送失败,请稍后重试',hasBtn:true});
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_email = new TipBox({type: 'error', str: '发送失败,请稍后重试',hasBtn:true});
            }

        })
    }


    //绑定展开更多选项按钮
    $("#more").on("click", expand);
    $("#more").one("click", fillAllOptions);

    //selects填充的ajax部分
    function fillAllOptions(){
        $.ajax({
            url:""+realPath+"/doctor/echoList",
            type: "post",
            dataType: "json",
            async: true,
            success: function(data){
                window.optionData = data;
                sessionStorage.setItem("optionsData", JSON.stringify(data));
                fillOptions(data);
            }
        })
    }
    
    fillAllOptions();

    //绑定单个和多个删除的事件处理函数
    $('#delete').on('click', multiDel);
    //$('#the_table').on('click', '.delete_btn', singleDel);
    $('.delete_btn').on('click', singleDel);
    //单个删除的数据
    function singleDel(event){
        //var the_id = $(this).parents('.table_row').attr('this_id');
    	 var the_id = $("#docId").html();
        var to_del = [the_id];
        deleteSubmit(to_del)
    }
    //多个删除的数据
    function multiDel(event){
        var to_del = [];
        $('#the_table').find('.checks:checked').each(function(){
            to_del.push($(this).parents('.table_row').attr('this_id'))
        });
        deleteSubmit(to_del)
    }


    //删除的提交部分
    function deleteSubmit(to_del){
        var arr_toDel = JSON.stringify(to_del);
        $.ajax({
            url: ""+realPath+"/doctor/delete",
            type: 'post',
            dataType: 'json',
            async: true,
            data: arr_toDel,
            contentType: 'application/JSON;charset=utf-8',
            success: function(data){
                var res = data[0]['result'];//字段待确认
                if (res/1 > 0){
                	$('#uploadModals').modal('hide');
                	document.location.href = ""+realPath+"/html/kangpai/doctor.html";
                } else {
                	$('#uploadModals').modal('hide');
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_del = new TipBox({type:'error',str:'删除失败',hasBtn:true});
            }
        })
    }

    //点击更新,跳转前的操作
    function beforeUpdate(event){
        sessionStorage.setItem("currentPage", $("#page").find(".current").text());
        var thisId = $(this).parents(".table_row").attr("this_id"),
            method = "update",
            attri = $(this).parents(".table_row").attr("attri"),
            docPhone1 = $(this).parents(".table_row").find(".this_telephone").text(),
            docPhone2=$(this).parents(".table_row").attr("phone2"),
            docPhone3=$(this).parents(".table_row").attr("phone3"),
            docEmail = $(this).parents(".table_row").attr("this_email"),
            docIdentity = $(this).parents(".table_row").attr("docIdentity"),
            docPronumber = $(this).parents(".table_row").attr("docPronumber"),
            docRecommender = $(this).parents(".table_row").attr("docRecommender"),
            kolId = $(this).parents(".table_row").attr("kol"),
            payerId = $(this).parents(".table_row").attr("payer"),
            purchId = $(this).parents(".table_row").attr("purchase"),
            province = $(this).parents(".table_row").find(".this_hospital").attr("hosProvince"),
            hosId = $(this).parents(".table_row").find(".this_hospital").attr("hosId"),
            city = $(this).parents(".table_row").find(".this_hospital").attr("hosCity"),
            district = $(this).parents(".table_row").find(".this_hospital").attr("hosDistrict"),
            hospital_level = $(this).parents(".table_row").find(".this_hospital").attr("hoslelId"),
            hosgraId = $(this).parents(".table_row").find(".this_hospital").attr("hosgraId"),
            hosTel = $(this).parents(".table_row").find(".this_hospital").attr("hosTel"),
            type_id = $(this).parents(".table_row").find(".this_hospital").attr("typeId"),
            profit_id = $(this).parents(".table_row").find(".this_hospital").attr("profitId"),
            property_id = $(this).parents(".table_row").find(".this_hospital").attr("propertyId"),
            category = $(this).parents(".table_row").attr("category"),
            levId = $(this).parents(".table_row").attr("levName"),
            admiId = $(this).parents(".table_row").attr("admiId"),
            departmentCategory = $(this).parents(".table_row").attr("departmentCategory"),
            departmentBelonged = $(this).parents(".table_row").attr("departmentBelonged"),
            natId = $(this).parents(".table_row").attr("natId"),
            specId = $(this).parents(".table_row").attr("specId"),
            docSex = $(this).parents(".table_row").attr("docSex"),
            docOld = $(this).parents(".table_row").attr("docOld"),
            docPostageTime = $(this).parents(".table_row").attr("docPostageTime"),
            docEducation = $(this).parents(".table_row").attr("docEducation"),
            docEmplymentTime = $(this).parents(".table_row").attr("docEmploymentTime"),
            importId = $(this).parents(".table_row").attr("importId"),
            coorId = $(this).parents(".table_row").attr("coorId"),
            liveId = $(this).parents(".table_row").attr("liveId"),
            docName = $(this).parents(".table_row").find(".this_name").text(),
            hosId = $(this).parents(".table_row").find(".this_hospital").attr("hosId"),
            hosName = $(this).parents(".table_row").find(".this_hospital").attr("hosName");

        var datas = {
                method: method,
                hosId:hosId,
                attri: attri,
                docId: thisId,
                docName: docName,
                docEmail: docEmail,
                docIdentity: docIdentity,
                docPronumber: docPronumber,
                docRecommender: docRecommender,
                docPhone1: docPhone1,
                docPhone2: docPhone2,
                docPhone3: docPhone3,
                province: province,
                city: city,
                hosTel:hosTel,
                hosId:hosId,
                district: district,
                hospitallevel: hospital_level,
                hosgraId:hosgraId,
                propertyId: property_id,
                typeId: type_id,
                profitId: profit_id,
                category: category,
                level: levId,
                administrative: admiId,
                departmentCategory: departmentCategory,
                departmentBelonged: departmentBelonged,
                nature: natId,
                spec: specId,
                docSex:docSex,
                docOld: docOld,
                docPostageTime: docPostageTime,
                docEducation: docEducation,
                docEmploymentTime: docEmplymentTime,
                importId: importId,
                coorId: coorId,
                liveness: liveId,
                hosName: hosName,
                kolId: kolId,
                payerId: payerId,
                purchId: purchId
            };

        sessionStorage.setItem("datas", JSON.stringify(datas));
        sessionStorage.setItem("currentPage", $("#page").find(".current").text() / 1);

        document.location.href = ""+realPath+"/html/kangpai/doctorEdit.html";
    }

    function beforeAdd(){
        sessionStorage.setItem("datas", JSON.stringify({method: "add"}));
        document.location.href = ""+realPath+"/doctorEdit";
    }

    //$("#departmentCategory").on("change", departmentCategoryReact);
    $("#category").on("change", categoryReact);
    $("#add").on("click", beforeAdd);
    $("#the_table").on("click", ".update_btn", beforeUpdate)



});


