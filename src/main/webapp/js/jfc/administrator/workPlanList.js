/**
 * Created by wangxiangyang on 2018/1/22.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(function () {

// 1.初始化Table
    window.oTable = new TableInit();
    oTable.Init();

// 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

// });
$('#plan_search').on('click',function(){
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
$('#plan_add').on('click',function(){
    document.location.href = './workPlanEdit.html';
});
window.operateEvents = {
    'click .read_btn' : function(e, value, row, index) {
        sessionStorage.setItem("planId", row.id);
        sessionStorage.setItem('method', 'readOnly');
        window.location.href = "/jfcpanel/html/jfc/administrator/workPlanEdit.html";
    },
    'click .update_btn' : function(e, value, row, index) {
        sessionStorage.setItem("planId", row.id);
        sessionStorage.setItem('method', 'write');
        window.location.href = "/jfcpanel/html/jfc/administrator/workPlanEdit.html";
    },
    'click .bell_btn' : function(e, value, row, index) {
        //sessionStorage.setItem("quotationId", row.id);
        //window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    },
    'click .lunch_btn' : function(e, value, row, index) {
        //sessionStorage.setItem("quotationId", row.id);
        //window.location.href = "/jfcpanel/html/jfc/project/budgetBook.html";
    }
};

var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#datas').bootstrapTable({
            url: "" + realPath+ "/work/workListContent",         // 请求后台的URL（*）
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
                title: 'ID'
            }, {
                field: 'plan_title',
                title: '主题'
            }, {
                field: 'plan_start_time',
                title: '开始时间'
            }, {
                field: 'plan_end_time',
                title: '结束时间'
            }, {
                field: 'plan_status',
                title: '计划状态'
            }, {
                field: 'reasons',
                title: '原因说明'
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
                    var a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>",
                        b = "<a class=\"btn btn-xs btn-success update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                        c = "<a class=\"btn btn-xs btn-warning bell_btn\" data-toggle=\"modal\" title=\"标记提醒\" ><i class=\"glyphicon glyphicon-bell\"></i></a>",
                        d = "<a class=\"btn btn-xs btn-primary delete_btn\" data-toggle=\"modal\" title=\"删除\" ><i class=\"glyphicon glyphicon-circle\"></i></a>";
                    return a+b+c+d;
                },
                events : operateEvents
            }],
            onEditableSave: function (field, row, oldValue, $el) {

                var dd= {
                    proId: row.id,
                    remark: row.remark
                };

                $.ajax({
                    type: "post",
                    url: realPath + '/project/budgetBookUpdateSingle',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(dd),
                    dataType: 'JSON',
                    success: function (data) {
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

                    this.id = row.worId;//id
                    this.contId = row.contId;
                    this.plan_title = row['workList'].worName;
                    //this.proId = row.proId;//proid
                    this.plan_owner = row['workList'].worStaEmail;
                    this.reasons = row.contReason;

                    switch (row['workList'].worStatus){//预算状态

                        case '0':
                            this.plan_status = '已保存';
                            break;
                        case '1':
                            this.plan_status = '待确认';
                            break;
                        case '2':
                            this.plan_status = '再次预算';
                            break;
                        case '3':
                            this.plan_status = '预算完成';
                            break;
                        default:
                            this.plan_status = '-';
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
                    this.plan_start_time = timeString(row['workList'].worCreateTime) || '-';//项目开始时间
                    this.plan_end_time = timeString(row['workList'].worEndTime) || '-';//项目结束时间
                    this.remark = row['workList'].worRemark || '-';
                }

                for (let i = 0, l = res.result.length; i < l; i++){
                    data.rows.push(new MakeRow(res.result[i]))
                }
                return data;
            }
        });
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            plan_title: $('#plan_title').val(),//项目主题-筛选
            plan_owner: $('#plan_owner').val(),//客户公司-筛选
            plan_start_time: $('#plan_start').val(),//客户经理-筛选
            plan_end_time: $('#plan_end').val(),//查询期限-筛选
            plan_during: $('#plan_during').val(),
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
}