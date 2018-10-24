/**
 * Created by wangxiangyang on 2017/12/11.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(function () {

// 1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

// 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

// });
    $('#project_search').on('click',function(){
        $("#datas").bootstrapTable('destroy');
        oTable.Init()
    });

});
timeRefresh();
function timeRefresh() {
    lay('.test_item').each(function() {
        laydate.render({
            elem : this,
            trigger : 'click'
        });
    });
}
$('#project_add').on('click',function(){
    document.location.href = './budgetBook.html';
});
window.operateEvents = {
    'click .read_btn' : function(e, value, row, index) {
        sessionStorage.setItem("quotationId", row.id);
        sessionStorage.setItem('method', 'readOnly');
        window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    },
    'click .update_btn' : function(e, value, row, index) {
        sessionStorage.setItem("proId", row.proId);
        //sessionStorage.setItem('method', 'write');
        window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    },
    'click .bell_btn' : function(e, value, row, index) {
        sessionStorage.setItem("quotationId", row.id);
        window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    },
    'click .lunch_btn' : function(e, value, row, index) {
        sessionStorage.setItem("quotationId", row.id);
        window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    },
    //'click .update_btn' : function(e, value, row, index) {
    //    $("#create_staff").removeAttr("proId");
    //    var hang = $("#beforeTable").find("tr").length;
    //    var han = $("#afterTable").find("tr").length;
    //    hang= parseInt(hang)-1;
    //    han = parseInt(han)-1
    //    if(hang>=1){
    //        $("#beforeTable tr").not(":eq("+hang+")").remove();
    //    }
    //    if(han>=1){
    //        $("#afterTable tr").not(":eq("+han+")").remove();
    //    }
    //
    //    $("#create_staff").attr("proId",row.proId);
    //    var send = {};
    //    send.proId = row.proId;
    //    $.ajax({
    //        url:  "" + realPath + "/project/detailsList",
    //        type : "post",
    //        dataType : "json",
    //        async : true,
    //        contentType : "application/JSON;charset=utf-8",
    //        data:JSON.stringify(send),
    //        success: function (data, status) {
    //            if (status == "success") {
    //                var proPrecost = data[0].proPrecost[0];
    //                $(".preBudget").val(proPrecost.preBudget);
    //                $(".preImplement").val(proPrecost.preImplement);
    //                $(".preNeed").val(proPrecost.preNeed);
    //                var proDetailsCharges = data[0].proDetailsCharges;
    //                for(var i=0;i<proDetailsCharges.length;i++){
    //                    if(proDetailsCharges[i].detAround=="1"){
    //                        $("#beforeTable").prepend("<tr><td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detName+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detType+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detDetails+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPrice+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detNumber+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detMoney+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPayee+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(proDetailsCharges[i].detTime)+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detRemark+"\"></td>");
    //                    }
    //                    if(proDetailsCharges[i].detAround=="0"){
    //                        $("#afterTable").prepend("<tr><td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detName+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detType+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detDetails+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPrice+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detNumber+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detMoney+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detPayee+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\" value=\""+timeToString(proDetailsCharges[i].detTime)+"\"></td>"+
    //                            "<td><input type=\"text\" class=\"input\" value=\""+proDetailsCharges[i].detRemark+"\"></td>");
    //                    }
    //                }
    //                timeRefresh();
    //            }
    //        },
    //        error: function () {
    //            alert('编辑失败');
    //        },
    //        complete: function () {
    //
    //        }
    //    });
    //}
};

var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#datas').bootstrapTable({
            url: "" + realPath+ "/project/budgetSearchInfo",         // 请求后台的URL（*）
            method: 'post',                      // 请求方式（*）
            toolbar: '#toolbar',                // 工具按钮用哪个容器
            striped: true,                      // 是否显示行间隔色
            cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   // 是否显示分页（*）
            sortable: true,                     // 是否启用排序
            sortOrder: "asc",                   // 排序方式
            queryParams: oTableInit.queryParams,// 传递参数（*）
            sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       // 初始化加载第一页，默认第一页
            pageSize: 10,                       // 每页的记录行数（*）
            pageList: [10, 25, 50, 100],        // 可供选择的每页的行数（*）
            search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  // 是否显示所有的列
            showRefresh: true,                  // 是否显示刷新按钮
            minimumCountColumns: 2,             // 最少允许的列数
            clickToSelect: true,                // 是否启用点击选中行
            height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     // 每一行的唯一标识，一般为主键列
            showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
            cardView: false,                    // 是否显示详细视图
            detailView: false,                   // 是否显示父子表
            columns: [{
                field: 'id',
                title: 'ID',
                visible: false
            }, {
                field: 'status',
                title: '预算状态'
            }, {
                field: 'create_time',
                title: '预算时间'
            }, {
                field: 'project_number',
                title: '项目编号'
            }, {
                field: 'project_theme',
                title: '项目主题',
                sortable: true
            }, {
                field: 'client_company',
                title: '客户公司',
                sortable: true
            }, {
                field: 'project_manager',
                title: '项目经理'
            }, {
                field: 'client_manager',
                title: '客户经理',
                sortable: true,
                visible: false
            }, {
                field: 'project_type',
                title: '项目类型',
                visible: false
            }, {
                field: 'project_method',
                title: '调查方法'
            }, {
                field: 'project_start_time',
                title: '项目开始时间',
                visible: false
            }, {
                field: 'project_end_time',
                title: '项目结束时间',
                visible: false
            }, {
                field: 'budget_complete',
                title: '预算完成金额',
                visible: false
            }, {
                field: 'final_complete',
                title: '实际完成金额',
                visible: false
            }, {
                field: 'budget_cost',
                title: '预算成本',
                visible: false
            }, {
                field: 'single_advance',
                title: '单独预付',
                visible: false
            }, {
                field: 'single_postpaid',
                title: '单独后付',
                visible: false
            }, {
                field: 'together_advance',
                title: '统一预付',
                visible: false
            }, {
                field: 'together_postpaid',
                title: '统一后付',
                visible: false
            }, {
                field: 'reply_cash',
                title: '批复现金',
                editable: {
                    type: 'text',
                    title: '名称',
                    validate: function (v) {
                        if (!v) return '不能为空';

                    }
                }
            }, {
                field: 'apply_cash',
                title: '申请现金',
                editable: {
                    type: 'text',
                    title: '名称',
                    validate: function (v) {
                        if (!v) return '不能为空';

                    }
                }
            }, {
                field: 'pay_cash',
                title: '支付现金',
                visible: false
            }, {
                field: 'need_cash',
                title: '需付现金',
                editable: {
                    type: 'text',
                    title: '名称',
                    validate: function (v) {
                        if (!v) return '不能为空';

                    }
                }
            }, {
                field: 'remark',
                title: '备注',
                editable: {
                    type: 'text',
                    title: '名称',
                    validate: function (v) {
                        if (!v) return '不能为空';

                    }
                }
            }, {
                field : 'control',
                title : '操作',
                align : 'center',
                formatter : function(value, row, index) {
                	if(row.status==="审核通过"||row.status==="待审核"){
                		 var a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>",
                         /*b = "<a class=\"btn btn-xs btn-success update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                         c = "<a class=\"btn btn-xs btn-warning bell_btn\" data-toggle=\"modal\" title=\"标记提醒\" ><i class=\"glyphicon glyphicon-bell\"></i></a>",
                         d = "<a class=\"btn btn-xs btn-primary lunch_btn\" data-toggle=\"modal\" title=\"项目启动\" ><i class=\"glyphicon glyphicon-briefcase\"></i></a>",*/
                         e = "<a class=\"btn btn-xs btn-default detail_btn\" data-toggle=\"modal\" data-target=\"#expenseDetail\" title=\"费用明细\" ><i class=\"glyphicon glyphicon-ban-circle\"></i></a>";
                       /*  f = "<a class=\"btn btn-xs btn-danger cancel_btn\" data-toggle=\"modal\" title=\"置为无效\" ><i class=\"glyphicon glyphicon-ban-circle\"></i></a>";*/
                		 return a+e;
                	}else{
                		 var a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>",
                         b = "<a class=\"btn btn-xs btn-success update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                         /*c = "<a class=\"btn btn-xs btn-warning bell_btn\" data-toggle=\"modal\" title=\"标记提醒\" ><i class=\"glyphicon glyphicon-bell\"></i></a>",
                         d = "<a class=\"btn btn-xs btn-primary lunch_btn\" data-toggle=\"modal\" title=\"项目启动\" ><i class=\"glyphicon glyphicon-briefcase\"></i></a>",*/
                         e = "<a class=\"btn btn-xs btn-default detail_btn\" data-toggle=\"modal\" data-target=\"#expenseDetail\" title=\"费用明细\" ><i class=\"glyphicon glyphicon-ban-circle\"></i></a>";
                       /*  f = "<a class=\"btn btn-xs btn-danger cancel_btn\" data-toggle=\"modal\" title=\"置为无效\" ><i class=\"glyphicon glyphicon-ban-circle\"></i></a>";*/
                		 return a+b+e;
                	}
                   
                   
                },
                events : operateEvents
            }],
            onEditableSave: function (field, row, oldValue, $el) {

                var dd;

                switch(field){
                    case 'remark':
                        dd = {
                            proId: row.proId,
                            remark: row.remark
                        };
                        break;
                    case 'reply_cash':
                        dd = {
                            proId: row.proId,
                            reply_cash: row.reply_cash
                        };
                        break;
                    case 'apply_cash':
                        dd = {
                            proId: row.proId,
                            apply_cash: row.apply_cash
                        };
                        break;
                    case 'need_cash':
                        dd = {
                            proId: row.proId,
                            need_cash: row.need_cash
                        };
                        break;
                }

                $.ajax({
                    type: "post",
                    url: realPath + '/project/budgetBookUpdateSingle',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(dd),
                    dataType: 'JSON',
                    success: function (data, status) {
                        var res = data[0]['result'];
                        if (res > 0){
                            $("#list").bootstrapTable('destroy');
                            oTable.Init();
                            alert('修改信息成功');
                        } else {
                            alert('修改信息失败,请重试')
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        alert('修改信息失败,请稍后重试')
                    }
                });
            },
            responseHandler: function(ood){
                let res = ood[0],
                    data = {};
                data.total = res.total;
                data.rows = [];

                function MakeRow(row){

                    this.id = row['BudgetInformatio'].infoId;//id
                    this.proId = row['BudgetInformatio'].infoProId;//proid

                    switch (row['BudgetInformatio'].infoStatus){//预算状态

                        case '0':
                            this.status = '待审核';
                            break;
                        case '1':
                            this.status = '审核通过';
                            break;
                        case '2':
                            this.status = '审核不通过';
                            break;
                        case '3':
                            this.status = '追加预算';
                            break;
                        default:
                            this.status = '-';
                            break;
                    }

                    function timeString(time){
                        if (time){
                            var string = '';
                            string += (time.year + 1900)
                                + '-' + (time.month + 1)
                                + '-' + time.date
                                + ' ' + time.hours
                                + ':' + time.minutes
                                + ':' + time.seconds;
                            return string;
                        } else {
                            return undefined
                        }
                    }
                    this.create_time = timeString(row['BudgetInformatio'].infoCreateTime) || '-';

                    this.project_number = row['project'][0].proNumber ||'-';//项目编号
                    this.project_theme = row['project'][0].proName ||'-';//项目主题
                    this.client_company = row['cusliaList'][0]['cusComList'].comName || '-';//客户公司
                    this.project_manager = row['jfcStaff'][0].staName || '-';//项目经理
                    this.client_manager = row['cusliaList'][0].liaName || '-';//客户经理
                    this.project_type = row['project'][0].type || '-';//项目类型
                    //this.quoIndustry = row.quoIndustry || '-';//研究行业
                    this.project_method = row['project'][0].investigation || '-';//调查方法
                    this.project_start_time = timeString(row['proTime'][0].starTime) || '-';//项目开始时间
                    this.project_end_time = timeString(row['proTime'][row['proTime'].length-1].starTime) || '-';//项目结束时间
                    this.budget_complete = row['BudgetInformatio'].infoSumMoney || '-';//预算完成金额
                    this.final_complete = row['BudgetInformatio'].infoActualMoney || '-';//实际完成金额
                    this.budget_cost = row['BudgetInformatio'].infoBudgetaryCost || '-';//预算成本

                    var budSum = row.budSum,
                        payment = {};

                    for (let i = 0; i < budSum.length; i++){
                        if (budSum[i].budRemarkOne === '单独预付'){
                            payment.single_advance = budSum[i].budSum;
                        } else if (budSum[i].budRemarkOne === '统一预付'){
                            payment.together_advance = budSum[i].budSum;
                        } else if (budSum[i].budRemarkOne === '单独后付'){
                            payment.single_postpaid = budSum[i].budSum;
                        } else if (budSum[i].budRemarkOne === '统一后付'){
                            payment.together_postpaid = budSum[i].budSum;
                        }
                    }

                    this.single_advance = payment.single_advance || '-';//单独预付
                    this.single_postpaid = payment.single_postpaid || '-';//单独后付
                    this.together_advance = payment.together_advance || '-';//统一预付
                    this.together_postpaid = payment.together_postpaid || '-';//统一后付
                    this.reply_cash = row['BudgetInformatio'].infoReplyCash || '-';//批复现金
                    this.apply_cash = row['BudgetInformatio'].infoApplyCash || '-';//申请现金
                    this.pay_cash = row['BudgetInformatio'].infoPayCash || '-';//支付现金
                    this.need_cash = row['BudgetInformatio'].infoNeedCash || '-';//需付现金
                    //try{
                    //    this.area = row['detailList'].area || '-';//区域
                    //
                    //    this.audienceOrRespondent = row['detailList'].audienceOrRespondent;//调查对象
                    //    this.sample = row['detailList'].sample;//样本配额
                    //    this.deliverables = row['detailList'].deliverables;//项目成果
                    //} catch(e){}
                    //this.currency = row.currency || '-';//币种
                    //this.total = row.total || '-';//总价

                    //this.comType = row['cusCompany'].comType || '-';//客户类型
                    //this.liaName = row['cusLiaison'].liaName || '-';//客户联系人
                    //this.liaPhone = row['cusLiaison'].liaPhone || row['cusLiaison'].liaTel || '-';//客户联系方式
                    //this.comEmail = row['cusLiaison'].comEmail || '-';//客户邮箱
                    this.remark = row['BudgetInformatio'].infoRemark || '-';
                }

                for (let i = 0, l = res.list.length; i < l; i++){
                    data.rows.push(new MakeRow(res.list[i]))
                }
                return data;
            }
        });
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            project_title: $('#project_title').val(),//项目主题-筛选
            project_client: $('#project_client').val(),//客户公司-筛选
            project_manager: $('#project_manager').val(),//客户经理-筛选
            project_during: $('#project_during').val(),//查询期限-筛选
            email:JSON.parse(sessionStorage.getItem('sysUser')).email,
            userName:JSON.parse(sessionStorage.getItem('sysUser')).userName,
            limit: params.limit,   // 页面大小
            offset: params.offset,  // 页码
            sort: params.sort,      //排序列名
            sortOrder: params.order
            //keyword: $("#keyword").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {
        // 初始化页面上面的按钮事件
    };

    return oInit;
};
$(".addbefore").click(function(){
    $("#beforeTable").prepend("<tr><td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>");
    timeRefresh();
});

$(".removebefore").click(function(){
    var hang = $("#beforeTable").find("tr").length;
    if((hang-1)==0){
        return;
    }
    $("#beforeTable tr").eq(hang-2).remove();
});

$(".addafter").click(function(){
    $("#afterTable").prepend("<tr><td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>"+
        "<td><input type=\"text\" class=\"form-control test_item\" placeholder=\"请输入日期\"></td>"+
        "<td><input type=\"text\" class=\"form-control\"></td>");
    timeRefresh();
});

$(".removeafter").click(function(){
    var hang = $("#afterTable").find("tr").length;
    if((hang-1)==0){
        return;
    }
    $("#afterTable tr").eq(hang-2).remove();
});
$("#addDetails").click(function(){
    var to_send = {};
    to_send.proId = $("#create_staff").attr("proId");
    to_send.preBudget = $(".preBudget").val();
    to_send.preImplement = $(".preImplement").val();
    to_send.preNeed = $(".preNeed").val();
    var before = [];
    var hang = $("#beforeTable").find("tr").length;
    var a = parseInt(hang)-1;
    $("#beforeTable tr").not(":eq("+a+")").each(function(){
        var tr = [];
        $(this).find("td").each(function(){
            tr.push($(this).find("input").val());
        });
        before.push(tr);
    });
    to_send.before=before;
    var after = [];
    var han = $("#afterTable").find("tr").length;
    var b = parseInt(han)-1;
    $("#afterTable tr").not(":eq("+b+")").each(function(){
        var tr = [];
        $(this).find("td").each(function(){
            tr.push($(this).find("input").val());
        });
        after.push(tr);
    });
    to_send.after=after;
    $.ajax({
        url : "" + realPath + "/project/details",
        type : "post",
        dataType : "json",
        async : true,
        contentType : "application/JSON;charset=utf-8",
        data:JSON.stringify(to_send),
        success : function(datas) {
            alert(datas[0]['result']);
        }
    });
});