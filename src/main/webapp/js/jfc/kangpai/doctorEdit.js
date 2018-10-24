/**
 * Created by wangxiangyang on 2017/7/11.
 */
 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){
    //初始化(填充options并绑定联动事件)
    fillOptions(JSON.parse(sessionStorage.getItem("optionsData")));
    $("#category").on("change", categoryReact);

    function dateToStr(time){
        var time = new Date(time);
        var month = time.getMonth() + 1;
        if (month < 10) month = "0" + month;
        time = time.getFullYear() + "-" + month + "-" + time.getDate();
        return time;
    }

    //给表单赋值
    var datas = JSON.parse(sessionStorage.getItem("datas"));
    try {
    	var this_id = datas["docId"],
    	this_hosId = datas["hosId"],
        this_name = datas["docName"],
        this_method = datas["method"];
    } catch(e){
    	
    }

    $("input").each(function(){
        $(this).val("")
    });
    $("select").each(function(){
        $(this).val("")
    });

    if (this_method == "update"){
        $("#docName").val(datas["docName"]);
        $("#docEmail").val(datas["docEmail"]);
        $("#docIdentity").val(datas["docIdentity"]);
        $("#attr_id").val(datas["attri"]);
        $("#hosName").val(datas["hosName"]);
        $("#docPronumber").val(datas["docPronumber"]);
        $("#docRecommender").val(datas["docRecommender"]);
    	$("#province").val(datas["province"])
            .change();
        $("#city").val(datas["city"])
            .change();
        $("#district").val(datas["district"]);
        $("#hospital_level").val(datas["hospitallevel"]);
        $("#hosgraId").val(datas["hosgraId"]);
        $("#hosTel").val(datas["hosTel"]);
        $("#type_id").val(datas["typeId"]);
        $("#phone").val(datas["docPhone1"]);
        $("#phone2").val(datas["docPhone2"]);
        $("#phone3").val(datas["docPhone3"]);
        $("#profit_id").val(datas["profitId"]);
        $("#category").val(datas["category"])
            .change();
        $("#level").val(datas["level"]);
        $("#administrative").val(datas["administrative"]);
        $("#departmentCategory").val(datas["departmentCategory"])
            .change();
        $("#departmentBelonged").val(datas["departmentBelonged"]);
        $("#nature").val(datas["nature"]);
        $("#spec").val(datas["spec"]);
        $("#doc_sex").val(datas["docSex"]);
        $("#doc_old").val(datas["docOld"]);
        $("#docPostageTime").val(datas["docPostageTime"]);
        $("#doc_education").val(datas["docEducation"]);
        $("#docEmploymentTime").val(datas["docEmploymentTime"]);
        $("#importance").val(datas["importId"]);
        $("#coor_id").val(datas["coorId"]);
        $("#liveness").val(datas["liveness"]);
        $("#kol").val(datas["kolId"]);
        $("#payer").val(datas["payerId"]);
        $("#purchase").val(datas["purchId"]);
    }


    //提交update
    function update() {
        var to_send = {
            docId: this_id,
            hosId:this_hosId
        };
        //医院信息
        if ($("#hosName").val() != datas["hosName"]) to_send.hospitalName = $("#hosName").val();
        to_send.province = $("#province").val();
        to_send.city = $("#city").val();
        to_send.district = $("#district").val();
        to_send.hospitallevel = $("#hospital_level").val();
        to_send.hospitallevelName = $("#hosgraId").val();
        to_send.typeId = $("#type_id").val();
        to_send.propertyId = $("#profit_id").val();
        to_send.hosTel = $("#hosTel").val();
        //医生信息
        if ($("#docName").val() != datas["docName"]) to_send.docName = $("#docName").val();
        if ($("#docEmail").val() != datas["docEmail"]) to_send.docEmail = $("#docEmail").val();
        if ($("#docIdentity").val() != datas["docIdentity"]) to_send.docIdentity = $("#docIdentity").val();
        if ($("#attr_id").val() != datas["attri"]) to_send.attri = $("#attr_id").val();
        if ($("#phone").val() != datas["docPhone1"]) to_send.docPhone1 = $("#phone").val();
        if ($("#phone2").val() != datas["docPhone2"]) to_send.docPhone2 = $("#phone2").val();
        if ($("#phone3").val() != datas["docPhone2"]) to_send.docPhone3 = $("#phone3").val();
        if ($("#docPronumber").val() != datas["province"]) to_send.docPronumber = $("#docPronumber").val();
        if ($("#docRecommender").val() != datas["docRecommender"]) to_send.docRecommender = $("#docRecommender").val();
        if ($("#category").val() != datas["category"]) to_send.category = $("#category").val();
        if ($("#level").val() != datas["level"]) to_send.level = $("#level").val();
        if ($("#administrative").val() != datas["administrative"]) to_send.administrative = $("#administrative").val();
        if ($("#departmentCategory").val() != datas["departmentCategory"]) to_send.departmentCategory = $("#departmentCategory").val();
        if ($("#departmentBelonged").val() != datas["departmentBelonged"]) to_send.departmentBelonged = $("#departmentBelonged").val();
        if ($("#nature").val() != datas["nature"]) to_send.nature = $("#nature").val();
        if ($("#spec").val() != datas["spec"]) to_send.spec = $("#spec").val();
        if ($("#doc_sex").val() != datas["docSex"]) to_send.docSex = $("#doc_sex").val();
        if ($("#doc_old").val() != datas["docOld"]) to_send.docOld = $("#doc_old").val();
        if ($("#docPostageTime").val() != datas["docPostageTime"]) to_send.docPostageTime = $("#docPostageTime").val();
        if ($("#doc_education").val() != datas["docEducation"]) to_send.docEducation = $("#doc_education").val();
        if ($("#docEmploymentTime").val() != datas["docEmploymentTime"]) to_send.docEmploymentTime = $("#docEmploymentTime").val();
        if ($("#importance").val() != datas["importId"]) to_send.importId = $("#importance").val();
        if ($("#coor_id").val() != datas["coorId"]) to_send.coorId = $("#coor_id").val();
        if ($("#liveness").val() != datas["liveness"]) to_send.liveness = $("#liveness").val();
        if ($("#kol").val() != datas["kolId"]) to_send.kol = $("#kol").val();
        if ($("#payer").val() != datas["payerId"]) to_send.payer = $("#payer").val();
        if ($("#purchase").val() != datas["purchId"]) to_send.purchId = $("#purchase").val();


        $.ajax({
            url: ""+realPath+"/doctor/update",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true,
            data: JSON.stringify(to_send),
            success: function(data){
                var res = data[0]["doctors"];
                if (res/1 > 0){
                    var dialog_add = new TipBox({type:'success',str:'添加信息成功',hasBtn:true});
                    $(".okoButton").on("click", function(){
                        document.location.href = ""+realPath+"/doctor";
                    });
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请重试',hasBtn:true});
            }
        })
    }

    //提交Add
    function add(){
        var to_send = {
			hospitalName : $("#hosName").val(),
			province : $("#province").val(),
			city : $("#city").val(),
			district : $("#district").val(),
			hospitallevel : $("#hospital_level").val(),
			hospitallevelName : $("#hosgraId").val(),
			typeId : $("#type_id").val(),
			propertyId : $("#profit_id").val(),
			hosTel : $("#hosTel").val(),
			
			docName : $("#docName").val(),
			docEmail : $("#docEmail").val(),
            docIdentity: $("#docIdentity").val(),
            docPhone1: $("#phone").val(),
            docPronumber: $("#docPronumber").val(),
            docRecommender: $("#docRecommender").val(),
            attri: $("#attr_id").val(),
            province: $("#province").val(),
            city: $("#city").val(),
            district: $("#district").val(),
            category: $("#category").val(),
            level: $("#level").val(),
            administrative: $("#administrative").val(),
            departmentCategory: $("#departmentCategory").val(),
            departmentBelonged: $("#departmentBelonged").val(),
            nature: $("#nature").val(),
            spec: $("#spec").val(),
            docSex: $("#doc_sex").val(),
            docOld: $("#doc_old").val(),
            docPostageTime: $("#docPostageTime").val(),
            docEducation: $("#doc_education").val(),
            docEmploymentTime: $("#docEmploymentTime").val(),
            importId: $("#importance").val(),
            coorId: $("#coor_id").val(),
            liveness: $("#liveness").val(),
            kol: $("#kol").val(),
            payer: $("#payer").val(),
            purchId: $("#purchase").val()
        };

        $.ajax({
            url: ""+realPath+"/doctor/add",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true,
            data: JSON.stringify(to_send),
            success: function(data){
                var res = data[0]["doctors"];
                if (res/1 > 0){
                    var dialog_add = new TipBox({type:'success',str:'添加信息成功',hasBtn:true});
                    $(".okoButton").on("click", function(){
                        document.location.href = ""+realPath+"/doctor";
                    });
                } else {
                    var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请重试',hasBtn:true});
                }
            },
            error: function(d1,d2,d3){
                var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请重试',hasBtn:true});
                console.log(d1);
                console.log(d2);
                console.log(d3);
            }
        })
    }


    if (this_method == "update"){
        $("#add").off("click").on("click", update)
    } else {
        $("#add").off("click").on("click", add)
    }

    $("#giveUp").on("click",function(event){
        document.location.href = ""+realPath+"/doctor";
    })
});