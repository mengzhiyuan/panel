/**
 * Created by wangxiangyang on 2018/2/5.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;


function clearScore(data){
    for (let k in data){
        if (typeof data[k] === 'object'){
            for (let v in data[k]){
                data[k][v] = ''
            }
        }
    }
    $('#project_number').off('change');
}

$(function () {

// 1.初始化Table
    window.oTable = new TableInit();
    oTable.Init();

// 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

// });

});

var TableInit = function() {

    $('#gather').on('click', function(){
        var getSelectRows = $("#datas").bootstrapTable('getSelections', function (row) {
            return row;
        }),
            gatherer = $('#gatherer').val(),
            list = [];

        for (let i = 0; i < getSelectRows.length; i++){
            list.push(getSelectRows.id)
        }

        $.ajax({
            url: realPath + '/finance/financeSummary',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                finReply: gatherer,
                listPinId: list
            }),
            success: function(data){
                if (data[0].result > 0){
                    alert('保存成功。')
                } else {
                    console.log(data);
                    alert('保存失败。')
                }
            },
            error: function(e){
                console.log(e);
                alert('操作失败。')
            }
        })

    });

    $('#attendance_search').on('click',function(){
        oTableInit.queryParams = function (params) {
            var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                //plan_title: $('#plan_title').val(),//项目主题-筛选
                //plan_owner: $('#plan_owner').val(),//客户公司-筛选
                //plan_start_time: $('#plan_start').val(),//客户经理-筛选
                //plan_end_time: $('#plan_end').val(),//查询期限-筛选
                login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                staff_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                attendance_year: $('#attendance_year').val(),
                attendance_month: $('#attendance_month').val(),
                //limit: params.limit,   // 页面大小
                //offset: params.offset,  // 页码
                sort: params.sort,      //排序列名
                sortOrder: params.order
                //keyword: $("#keyword").val()
            };
            return temp;
        };
        $("#datas").bootstrapTable('destroy');
        oTable.Init()
    });

    var oTableInit = new Object();
    // 初始化Table

    window.operateEvents = {
        'click .launch_btn' : function(e, value, row, index) {
            $.ajax({
                url: realPath + '/workflow/startFinanceProcess',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    nominee: row.summer,
                    finId: row.id
                }),
                async: true,
                success: function(data){
                    if (data[0].result > 0){
                        $("#datas").bootstrapTable('destroy');
                        oTable.Init()
                    }
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        'click .deal_btn' : function(e, value, row, index){
            window.progress_finId = row.id;
            window.progress_staId = row.user;
            window.progress_taskId = row.taskId;
            window.progress_status = row.project_status;
            if (row.project_status === '批复'){
                $('#reply_amount').css('display', 'inline-block')
            } else {
                $('#reply_amount').css('display', 'none')
            }
            if (row.project_status === '支付'){
                $('#pay_amount').css('display', 'inline-block')
            } else {
                $('#pay_amount').css('display', 'none')
            }
        }
    };
    $('.progress_button').on('click', function(e){
        let to_send = {
            finId: window.progress_finId,
            taskId: window.progress_taskId,
            outcome: $(e.currentTarget).val(),
            status: window.progress_status,
            pId: window.progress_staId,
            nominee: $('#gatherer').val()
        };
        if (window.progress_status === '批复'){
            to_send.amount = $('#reply_amount').val()
        } else if (window.progress_status === '支付'){
            to_send.amount = $('#pay_amount').val()
        } else if (window.progress_status === '收款确认'){
            delete (to_send.pId);
            delete(to_send.nominee);
        }
        $.ajax({
            url: realPath + '/workflow/submitFinancdeTask',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                if (data[0].result > 0){
                    $("#datas").bootstrapTable('destroy');
                    oTable.Init()
                }
            },
            error: function(){
                console.log(e)
            }
        })
    });



    function bootstrapTableParameter(){

        function editFunction(field, row, oldValue, $el) {

            let to_send = {
                finId: row.id
            };

            to_send[field] = row[field];

            $.ajax({
                url: realPath + '/finance/financeUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(to_send),
                success: function (data){
                    if (data[0].result > 0){
                        alert('提交成功。')
                    } else {
                        console.log(data);
                        alert('提交失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            })
        }
        function dataHandler(ood){

            if (ood[0].finList.length === 0 ){
                alert('你没有权限。');
                return false;
            }

            var rows = [],
                list = ood[0].finList,
                gatherer = ood[0].listStaff,
                tasks =  ood[0].actRuTask,
                applying = 0,
                replied = 0,
                paid = 0,
                paying = 0,
                gap = 0,
                str = ``;

            for (let i = 0; i < gatherer.length; i++){
                str += `<option value="`+ gatherer[i].staName +`">`+ gatherer[i].staName +`</option>`
            }
            $('#gatherer')
                .find("option:not(':first-child')").remove()
                .end().append(str);

            for (let i = 0, l = list.length; i < l; i++){

                rows[i] = {
                    id: list[i].finId,
                    user: JSON.parse(sessionStorage.getItem('sysUser')).userName,
                    applicant: list[i].finApplicant,
                    summer: list[i].finSummary,//汇总人
                    type: list[i].finType,//费用类型
                    project_number: list[i].proNumber,//项目编号
                    project_name: list[i].proName,//项目名称
                    project_status: 0,//项目状态
                    project_manager: list[i].staId,//项目经理
                    budget_amount: list[i].infoSumMoney,//预算金额
                    completed_amount: list[i].accActualAmount,//完成金额
                    budget_cost: list[i].infoBudgetaryCost,//预算成本
                    final_cost: list[i].accFinalCost,//决算成本
                    apply_amount: list[i].finAppingAmount,//申请金额
                    reply_amount: list[i].finAppingReplied,//批复金额
                    paid: list[i].finPaid,//已支付
                    paying: list[i].finPaying,//待支付
                    gap_amount: '',//差额
                    remark: list[i].finRemark//备注
                };//初始化一行的数据
                for (let j = 0; j < gatherer.length; j++){
                    if (gatherer[j].staId == rows[i].applicant){
                        rows[i].applicant = gatherer[j].staName
                    }
                    if (gatherer[j].staId == rows[i].summer){
                        rows[i].summer = gatherer[j].staName
                    }
                    if (gatherer[j].staName == rows[i].user){
                        rows[i].user = gatherer[j].staId
                    }
                }
                for (let k = 0; k < tasks.length; k++){
                    if (tasks[k].finId == rows[i].id){
                        rows[i].taskId = tasks[k].id;
                        rows[i].project_status = tasks[k].name;
                    }
                }
                applying += rows[i].apply_amount;
                replied += rows[i].reply_amount;
                paid += rows[i].paid;
                paying += rows[i].paying;
                gap += rows[i].gap_amount;
            }
            $('#applying').text(applying);
            $('#replied').text(replied);
            $('#paid').text(paid);
            $('#paying').text(paying);
            $('#gap').text(gap);
            return {
                rows: rows
            }
        }

        var brief = {
            url: "" + realPath+ "/finance/financeList",         // 请求后台的URL（*）
            method: 'post',                      // 请求方式（*）
            toolbar: '#toolbar',                // 工具按钮用哪个容器
            striped: true,                      // 是否显示行间隔色
            cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   // 是否显示分页（*）
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
            columns: [],
            onEditableSave: editFunction,
            responseHandler: dataHandler
        };

        brief.columns = [{
            checkbox: true
        }, {
            field: 'type',
            title: '费用类型'
        }, {
            field: 'project_number',
            title: '项目编号'
        }, {
            field: 'project_name',
            title: '项目名称'
        }, {
            field: 'project_status',
            title: '项目状态',
            align : 'center',
            formatter : function(value, row, index) {
                if (row.project_status == '0'){
                    return "<span>未申请</span>";
                } else {
                    return "<span>"+ value +"</span>"
                }
            }
        }, {
            field: 'project_progress',
            title: '项目进度'
        }, {
            field: 'project_manager',
            title: '项目经理'
        }, {
            field: 'budget_amount',
            title: '预算金额'
        }, {
            field: 'completed_amount',
            title: '完成金额'
        }, {
            field: 'budget_cost',//个人可改,管理可改
            title: '预算成本'
        }, {
            field: 'final_cost',
            title: '决算成本'
        }, {
            field: 'apply_amount',
            title: '申请金额'
        }, {
            field: 'reply_amount',
            title: '批复金额'
        }, {
            field: 'paid',
            title: '已支付'
        }, {
            field: 'paying',
            title: '待支付'
        }, {
            field: 'gap_amount',
            title: '差额'
        }, {
            field: 'remark',
            title: '备注说明',
            editable: {
                type: 'text',
                title: '备注说明',
                validate: function (v) {
                    if (!v){
                        alert('请输入后提交');
                        return false
                    }
                }
            }
        }, {
            field: 'control',
            title: '操作',
            align : 'center',
            formatter : function(value, row, index) {
                if (row.project_status == '0'){
                    return "<a class=\"btn btn-xs btn-info launch_btn\" data-toggle=\"modal\" title=\"查看\" >启动项目</a>";
                } else {
                    return "<a class=\"btn btn-xs btn-info deal_btn\" data-toggle=\"modal\" data-target=\"#progress_control\" title=\"查看\" >处理任务</a>";
                }
            },
            events : operateEvents
        }];

        /*
        $.ajax({
            url: realPath + '/finance/jurisdiction',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: false,
            data: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem('sysUser')).email
            }),
            success: function (ood){

                const summary = ood[0].summary,
                    reply = ood[0].reply,
                    payment = ood[0].payment;

                if (summary === 'true'){
                    $('#gather').css('display', 'inline-block');
                    $('#gatherer').css('display', 'inline-block');

                    brief.columns[4] = {
                        field: 'paid',
                        title: '已付(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                    brief.columns[6] = {
                        field: 'paying',
                        title: '支付(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };

                } else {
                    $('#gather').css('display', 'none');
                    $('#gatherer').css('display', 'none');
                }

                if (reply === 'true'){
                    brief.columns[3] = {
                        field: 'total_amount',
                        title: '共计(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                    brief.columns[4] = {
                        field: 'paid',
                        title: '已付(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                    brief.columns[6] = {
                        field: 'apping_replied',
                        title: '批复(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                } else if (payment === 'true'){
                    brief.columns[3] = {
                        field: 'total_amount',
                        title: '共计(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                    brief.columns[4] = {
                        field: 'paid',
                        title: '已付(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                    brief.columns[6] = {
                        field: 'paying',
                        title: '支付(元)',
                        editable: {
                            type: 'text',
                            title: '备注说明',
                            validate: function (v) {
                                if (!v){
                                    alert('请输入后提交');
                                    return false
                                }
                            }
                        }
                    };
                }
            },
            error: function (e){
                console.log(e);
                alert('未检测到登录信息。')
            }
        });
        */


        return brief
    }



    oTableInit.Init = function () {
        $('#datas').bootstrapTable(bootstrapTableParameter());
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            //applicant: JSON.parse(sessionStorage.getItem('sysUser')).id,
            nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName,
            email: JSON.parse(sessionStorage.getItem('sysUser')).email//登录邮箱
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