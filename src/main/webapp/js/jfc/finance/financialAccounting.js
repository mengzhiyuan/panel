/**
 * Created by wangxiangyang on 2018/2/24.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

laydate.render({
    elem: '#actDate',
    type: 'date'
});
laydate.render({
    elem: '#actRelatedDate',
    type: 'date'
});
laydate.render({
    elem: '#payTime',
    type: 'date'
});
setInterval(function(){
	accounting_data.accountingItem.actDate = $('#actDate').val();
	accounting_data.accountingItem.actRelatedDate = $('#actRelatedDate').val();
	accounting_data.paymentNow.payTime = $('#payTime').val();
},200);

const accounting_data = {
        tabs: 'running_account',
        accountingItem: {
            actId: '',
            actDate: '',//记账日期
            actMan: '',//记账人
            actMonth: '',//年度月份
            actBranch: '',//平台
            actType: '',//收支类型
            actFeeType: '',//费用类型
            actFeeDetail: '',//费用明细
            actAmount: '',//金额
            actRelatedProject: '',//关联项目
            actRelatedDepartment: '',//关联部门
            actRelatedStaff: '',//关联人员
            actRelatedDate: '',//关联日期
            actApplyAmount: '',//申请金额
            actSumAmount: '',//累计金额
            actSurplus: '',//当前结余
            actRemark: ''//备注
        },
        options: {
            departments: [],
            staffs: []
        },
        corresponding: {
            corId: '',
            corMonths: '',//年月
            corProject: '',//项目
            corProjectType: '',//项目类型
            corDepartment: '',//部门
            corSellManager: '',//销售经理
            corProjectManager: '',//项目经理
            corProjectPeriod: '',//项目周期
            corProjectAmount: '',//项目金额
            corTax: '',//税费
            corLabor: '',//人天成本
            corRelatedBudget: '',//关联预算
            corPaying: '',//付款金额
            corSurplus: '',//剩余金额
            corRelatedPay: '',//关联付款
            corClient: '',//客户
            corRelatedBusiness: '',//关联商务
            corRelatedAgent: '',//关联代理
            corRemark: ''//备注
        },
        paymentNow: {
            payAmount: '',//付款金额
            payTime: '',//付款时间
            payMode: '',//付款方式
            payNumber: '',//付款账号
            payCreateTime: '',//创建时间
            payUpdateTime: ''//修改时间
        },
        laborNow: [],
        calculating: {
            branch: '',
            department: '',
            period_happen: '',
            period_cycle: '',
            type: ''
        },
        calculate_result: []
    },
    accounting_methods = {
        switchTab: function (tag){

            let self = this;

            self.tabs = tag;
        },
        beforeInsert: function(){
            for (let k in this.accountingItem){
                this.accountingItem[k] = ''
            }
        },
        search: function(){
            $("#running_account").bootstrapTable('destroy');
            oTable.Init();
        },
        search_project: function(){
            $("#project_accounting").bootstrapTable('destroy');
            oProjectTable.Init();
        },
        updateAccount: function(){
            let self = this;
            $.ajax({
                url: realPath + '/finance/currentAccountSaveOrUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(self.accountingItem),
                success: function (data){
                    var res = data[0]['result'];
                    if (res > 0){
                        $("#running_account").bootstrapTable('destroy');
                        oTable.Init();
                        alert('操作成功');
                    } else {
                        alert('操作失败,请重试')
                    }
                },
                error: function(e){
                    console.log(e);
                    alert('网络错误')
                }
            })
        },
        updatePayment: function(){
            let self = this;
            $.ajax({
                url: realPath + '/finance/cusProjectSaveOrUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(self.paymentNow),
                success: function(data){
                    var res = data[0]['result'];
                    if (res > 0) {
                        $("#project_accounting").bootstrapTable('destroy');
                        oProjectTable.Init();
                        alert('操作成功');
                    }
                },
                error: function(e){
                    alert('操作失败,请重试')
                }
            })
        },
        calculate: function(){}
    },
    accounting_mounted = function(){
		let self = this;
        try {
            $.ajax({
                url: realPath + '/finance/currentAccountInIt',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                success: function (data){
                    let list1 = data[0].listStaff,
                        list2 = data[0].department,
                        ops1 = [{name: '请选择',id: ''}],
                        ops2 = [{name: '请选择',id: ''}],
                        options = self.options;

                    for (let i = 0; i < list1.length; i++){
                        ops1.push({id: list1[i].staId, name: list1[i].staName})
                    }
                    for (let j = 0; j < list2.length; j++){
                        ops2.push({id: list2[j].id, name: list2[j].departmentValue})
                    }
                    options.departments = ops2;
                    options.staffs = ops1
                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    accounting_watch = {
        newInsuranceSetting: {
            handler: function(){

            },
            deep: true
        }
    },
    accounting_vm = new Vue({
        el: '#root',
        data: accounting_data,
        created: accounting_mounted,
        methods: accounting_methods,
        watch: accounting_watch
    });

window.operateEvents = {
    'click .update_btn' : function(e, value, row, index) {
        let detail = accounting_data.accountingItem;
        detail.actId = row.actId;
        detail.actDate = row.actDate;//记账日期
        detail.actMan = row.actMan;//记账人
        detail.actMonth = row.actMonth;//年度月份
        detail.actBranch = row.actBranch;//平台
        detail.actType = row.actType;//收支类型
        detail.actFeeType = row.actFeeType;//费用类型
        detail.actFeeDetail = row.actFeeDetail;//费用明细
        detail.actAmount = row.actAmount;//金额
        detail.actRelatedProject = row.actRelatedProject;//关联项目
        detail.actRelatedDepartment = row.actRelatedDepartment;//关联部门
        detail.actRelatedStaff = row.actRelatedStaff;//关联人员
        detail.actRelatedDate = row.actRelatedDate;//关联日期
        detail.actApplyAmount = row.actApplyAmount;//申请金额
        detail.actSumAmount = row.actSumAmount;//累计金额
        detail.actSurplus = row.actSurplus;//当前结余
        detail.actRemark = row.actRemark;//备注
    },
    'click .delete_insurance_btn' : function (e, value, row, index) {
        $.ajax({
            url: realPath + '/finance/finInsuranceDelete',
            type: "post",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                insId: row.id
            }),
            dataType: 'JSON',
            success: function (data) {
                var res = data[0]['result'];
                if (res > 0){
                    $("#insurance_set").bootstrapTable('destroy');
                    oInsuranceTable.Init();
                    alert('修改信息成功');
                } else {
                    alert('修改信息失败,请重试')
                }
            },
            error: function (e) {
                console.log(e);
                alert('修改信息失败,请稍后重试')
            }
        })
    },
    'click .sign_btn': function(e,value,row,index){
        $.ajax({
            type: "post",
            url: realPath + '/finance/financePerformanceUpdate',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                salId: row.id,
                sign: JSON.parse(sessionStorage.getItem('sysUser'))['email']
            }),
            dataType: 'JSON',
            success: function (data) {
                var res = data[0]['result'];
                if (res > 0){
                    $("#running_account").bootstrapTable('destroy');
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
    'click .related_pay_btn': function(e,value,row,index){
        accounting_data.paymentNow = row.payment;
        accounting_data.paymentNow.payProId = row.corId;
    },
    'click .labor_btn': function(e,value,row,index){
        $.ajax({
            url: realPath + '/finance/proBudgetSearch',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({payProId: value}),
            async: true,
            success: function(data){

                let list = data[0].result,
                    labor = [],
                    l = list.length,
                    i;

                for (i = 0; i < l; i++){
                    labor.push({
                        title: list[i].budList,
                        amount: list[i].budRemarkTwo
                    })
                }
                accounting_data.laborNow = labor;
            },
            error: function(e){}
        })
    },
    'click .related_business_btn': function(e,value,row,index){
        //$.ajax({
        //    url: realPath + '/finance/',
        //    type: 'post',
        //    contentType: 'application/json;charset=utf-8',
        //    dataType: 'json',
        //    data: JSON.stringify({proId: value}),
        //    async: true,
        //    success: function(data){
        //
        //    },
        //    error: function(e){}
        //})
    },
    'click .related_agent_btn': function(e,value,row,index){
        //$.ajax({
        //    url: realPath + '/finance/',
        //    type: 'post',
        //    contentType: 'application/json;charset=utf-8',
        //    dataType: 'json',
        //    data: JSON.stringify({proId: value}),
        //    async: true,
        //    success: function(data){
        //
        //    },
        //    error: function(e){}
        //})
    },
    'click .bell_btn': function(e,value,row,index){
        //$.ajax({
        //    url: realPath + '/finance/',
        //    type: 'post',
        //    contentType: 'application/json;charset=utf-8',
        //    dataType: 'json',
        //    data: JSON.stringify({proId: value}),
        //    async: true,
        //    success: function(data){
        //
        //    },
        //    error: function(e){}
        //})
    },
    'click .download_btn': function(e,value,row,index){
        //$.ajax({
        //    url: realPath + '/finance/',
        //    type: 'post',
        //    contentType: 'application/json;charset=utf-8',
        //    dataType: 'json',
        //    data: JSON.stringify({proId: value}),
        //    async: true,
        //    success: function(data){
        //
        //    },
        //    error: function(e){}
        //})
    }
};


var TableInit = function() {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#running_account').bootstrapTable({
                url: "" + realPath+ "/finance/currentAccountSearch",         // 请求后台的URL（*）
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
                    field: 'actId',
                    title: 'ID'
                }, {
                    field: 'actDate',
                    title: '记账日期'
                }, {
                    field: 'actMan',
                    title: '记账人',
                    formatter : function(value, row, index) {
                        let v;
                        for (let i = 0,list = accounting_data.options.staffs; i < list.length; i++){
                            if (list[i].id == value){
                                v = list[i].name
                            }
                        }
                        return '<span>'+ v +'</span>'
                    }
                }, {
                    field: 'actMonth',
                    title: '年度月份'
                }, {
                    field: 'actBranch',
                    title: '平台'
                }, {
                    field: 'actType',
                    title: '收支类型'
                }, {
                    field: 'actFeeType',
                    title: '费用类型'
                }, {
                    field: 'actFeeDetail',
                    title: '费用明细'
                }, {
                    field: 'actAmount',
                    title: '金额'
                }, {
                    field: 'actRelatedProject',
                    title: '关联项目'
                }, {
                    field: 'actRelatedDepartment',
                    title: '关联部门',
                    formatter : function(value, row, index) {
                        let v;
                        for (let i = 0,list = accounting_data.options.departments; i < list.length; i++){
                            if (list[i].id == value){
                                v = list[i].name
                            }
                        }
                        return '<span>'+ v +'</span>'
                    }
                }, {
                    field: 'actRelatedStaff',
                    title: '关联人员',
                    formatter : function(value, row, index) {
                        let v;
                        for (let i = 0,list = accounting_data.options.staffs; i < list.length; i++){
                            if (list[i].id == value){
                                v = list[i].name
                            }
                        }
                        return '<span>'+ v +'</span>'
                    }
                }, {
                    field: 'actRelatedDate',
                    title: '关联日期'
                }, {
                    field: 'actApplyAmount',
                    title: '申请金额'
                }, {
                    field: 'actSumAmount',
                    title: '累计金额'
                }, {
                    field: 'actSurplus',
                    title: '当前结余'
                }, {
                    field: 'actRemark',
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
                            b = "<a class=\"btn btn-xs btn-info update_btn\" data-toggle=\"modal\" data-target=\"#accounting_detail\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                            c = "<a class=\"btn btn-xs btn-success pay_btn\" data-toggle=\"modal\" title=\"发放\" ><i class=\"glyphicon glyphicon-gift\"></i></a>";
                        return a+b+c;
                    },
                    events : operateEvents
                }],
                onEditableSave: function (field, row, oldValue, $el) {

                    var dd;

                    switch(field){
                        case 'remark':
                            dd = {
                                perId: row.id,
                                remark: row.remark
                            };
                            break;
                        case 'extra_bonus':

                            row.sum_bonus += (parseFloat(row.sum_bonus) || 0) + (parseFloat(row.extra_bonus) ? parseFloat(row.extra_bonus) - oldValue : (parseFloat(row.sum_bonus) || 0));

                            dd = {
                                perId: row.id,
                                extra_bonus: row.extra_bonus || 0,
                                sum_bonus: row.sum_bonus || 0
                            };
                            break;
                        default:
                            break;
                    }

                    $.ajax({
                        type: "post",
                        url: realPath + '/finance/financePerformanceUpdate',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(dd),
                        dataType: 'JSON',
                        success: function (data, status) {
                            var res = data[0]['result'];
                            if (res > 0){
                                $("#running_account").bootstrapTable('destroy');
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
                    let res = ood[0].result,
                        data = {};
                    data.rows = [];
                    data.total = ood[0].total;

                    function MakeRow(row){

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

                        this.actId = row.actId;
                        this.actDate = timeString(row.actDate);//记账日期
                        this.actMan = row.actMan;//记账人
                        this.actMonth = row.actMonth;//年度月份
                        this.actBranch = row.actBranch;//平台
                        this.actType = row.actType;//收支类型
                        this.actFeeType = row.actFeeType;//费用类型
                        this.actFeeDetail = row.actFeeDetail;//费用明细
                        this.actAmount = row.actAmount;//金额
                        this.actRelatedProject = row.actRelatedProject;//关联项目
                        this.actRelatedDepartment = row.actRelatedDepartment;//关联部门
                        this.actRelatedStaff = row.actRelatedStaff;//关联人员
                        this.actRelatedDate = timeString(row.actRelatedDate);//关联日期
                        this.actApplyAmount = row.actApplyAmount;//申请金额
                        this.actSumAmount = row.actSumAmount;//累计金额
                        this.actSurplus = row.actSurplus;//当前结余
                        this.actRemark = row.actRemark;//备注
                    }

                    if (res && res.length > 0){
                        for (let i = 0, l = res.length; i < l; i++){
                            data.rows.push(new MakeRow(res[i]))
                        }
                    }

                    return data;
                }
            });
        };

        // 得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                staffs: ''
            };
            return temp;
        };
        return oTableInit;
    },
    projectTableInit = function() {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#project_accounting').bootstrapTable({
                url: "" + realPath+ "/finance/cusProjectSearch",         // 请求后台的URL（*）
                method: 'post',                      // 请求方式（*）
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
                height: 600,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "corId",                     // 每一行的唯一标识，一般为主键列
                showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                    // 是否显示详细视图
                detailView: false,                   // 是否显示父子表
                columns: [{
                    field: 'corId',
                    title: 'ID'
                }, {
                    field: 'corMonths',
                    title: '年月'
                }, {
                    field: 'corProject',
                    title: '项目'
                }, {
                    field: 'corProjectType',
                    title: '项目类型'
                }, {
                    field: 'corDepartment',
                    title: '部门'
                }, {
                    field: 'corSellManager',
                    title: '销售经理'
                }, {
                    field: 'corProjectManager',
                    title: '项目经理'
                }, {
                    field: 'corProjectPeriod',
                    title: '项目周期'
                }, {
                    field: 'corProjectAmount',
                    title: '项目金额'
                }, {
                    field: 'corTax',
                    title: '税费'
                }, {
                    field: 'corLabor',
                    title: '人天成本',
                    formatter : function(value, row, index) {
                        return "<a class=\"btn btn-xs btn-info labor_btn\" data-toggle=\"modal\" data-target=\"#labor_detail\" title=\"查看\" >查看</a>";
                    },
                    events : operateEvents
                }, {
                    field: 'corRelatedBudget',
                    title: '关联预算'
                }, {
                    field: 'corPaying',
                    title: '付款金额'
                }, {
                    field: 'corSurplus',
                    title: '剩余金额'
                }, {
                    field: 'corRelatedPay',
                    title: '关联付款',
                    formatter : function(value, row, index) {
                        return "<a class=\"btn btn-xs btn-info related_pay_btn\" data-toggle=\"modal\" data-target=\"#payment_detail\" title=\"查看|修改\" >查看|修改</a>";
                    },
                    events : operateEvents
                }, {
                    field: 'corClient',
                    title: '客户'
                }, {
                    field: 'corRelatedBusiness',
                    title: '关联商务',
                    formatter : function(value, row, index) {
                        return "<a class=\"btn btn-xs btn-info related_business_btn\" title=\"查看\" >查看</a>";
                    },
                    events : operateEvents
                }, {
                    field: 'corRelatedAgent',
                    title: '关联代理',
                    formatter : function(value, row, index) {
                        return "<a class=\"btn btn-xs btn-info related_agent_btn\" title=\"查看\" >查看</a>";
                    },
                    events : operateEvents
                }, {
                    field: 'corRemark',
                    title: '备注',
                    editable: {
                        type: 'text',
                        title: '其他2',
                        validate: function (v) {
                            if (!v) return '请输入';
                        }
                    }
                }, {
                    field : 'control',
                    title : '操作',
                    align : 'center',
                    formatter : function(value, row, index) {
                        let a = "<a class=\"btn btn-xs btn-info bell_btn\" title=\"提醒\" ><i class=\"glyphicon glyphicon-bell\"></i></a>",
                            b = "<a class=\"btn btn-xs btn-info download_btn\" title=\"导出\" ><i class=\"glyphicon glyphicon-download-alt\"></i></a>";
                        return a + b;
                    },
                    events : operateEvents
                }],
                onEditableSave: function (field, row, oldValue, $el) {

                    if (!row.payId){
                        alert('请先补充关联支付信息。');
                        return
                    }

                    $.ajax({
                        type: "post",
                        url: realPath + '/finance/cusProjectSaveOrUpdate',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify({
                            payId: row.payId,
                            payRemark: row.corRemark
                        }),
                        dataType: 'JSON',
                        success: function (data, status) {
                            var res = data[0]['result'];
                            if (res > 0){
                                $("#project_accounting").bootstrapTable('destroy');
                                oProjectTable.Init();
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
                    let res = ood[0].result,
                        list = ood[0].listStaff,
                        data = {};
                    data.rows = [];
                    data.total = ood[0].total;

                    function MakeRow(row){

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

                        this.payment = row.proPayment || {};
                        this.payment.payTime = timeString(this.payment.payTime) || '';
                        delete(this.payment.payCreateTime);
                        delete(this.payment.payUpdateTime);
                        this.corId = row.proId;
                        this.corMonths = timeString(row.accCreateTime);//年月
                        this.corProject = row.proName;//项目
                        this.corProjectType = row.type;//项目类型
                        this.corDepartment = '';//部门
                        let sellManagerId = row.staId,
                            projectManagerId = row.customer;

                        for (let i = 0; i < list.length; i++){
                            if (sellManagerId == list[i].staId){
                                this.corSellManager = list[i].staName;//销售经理
                            }
                            if (projectManagerId == list[i].staId){
                                this.corProjectManager = list[i].staName;//项目经理
                            }
                        }
                        this.corProjectPeriod = timeString(row.proTime[0].starTime) + '~' + timeString(row.proTime[row.proTime.length - 1].endTime);//项目周期
                        this.corProjectAmount = row.accActualAmount;//项目金额
                        this.corTax = row.accActualAmount * 0.06;//税费
                        this.corLabor = row.proId;//人天成本
                        this.corRelatedBudget = row.proId;//关联预算
                        this.corPaying = row.proPayment ? row.proPayment.payAmount : 0;//付款金额
                        this.corSurplus = row.accActualAmount - (row.proPayment ? row.proPayment.payAmount : 0);//剩余金额
                        this.corRelatedPay = row.proId;//关联付款
                        this.corClient = row.comName;//客户
                        this.corRelatedBusiness = row.proId;//关联商务
                        this.corRelatedAgent = row.proId;//关联代理
                        this.corRemark = this.payment.payRemark;//备注
                        this.payId = this.payment.payId;
                    }

                    if (res && res.length > 0){
                        for (let i = 0, l = res.length; i < l; i++){
                            data.rows.push(new MakeRow(res[i]))
                        }
                    }
                    return data;
                }
            });
        };

        // 得到查询的参数
        oTableInit.queryParams = function (params) {
            let p = {
                limit: params.limit,   // 页面大小
                offset: params.offset,  // 页码
                keyName: $('#key_name_project').val(),
                keyValue: $('#key_value_project').val()
            };
            return p
        };
        return oTableInit;
    },
    profitAccountingInit = function() {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#profit_accounting').bootstrapTable({
                url: "" + realPath+ "/finance/earningsSearch",         // 请求后台的URL（*）
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
                columns: [{
                    field: 'id',
                    title: 'ID'
                }, {
                    field: 'actDate',
                    title: '记录日期'
                }, {
                    field: 'actRelatedDate',
                    title: '发生日期'
                }, {
                    field: 'actMonth',
                    title: '年度月份'
                }, {
                    field: 'actBranch',
                    title: '平台'
                }, {
                    field: 'actType',
                    title: '收支类型'
                }, {
                    field: 'staId',
                    title: '项目经理'
                }, {
                    field: 'saleManager',
                    title: '销售经理'
                }, {
                    field: 'proName',
                    title: '项目名称'
                }, {
                    field: 'payAmount',
                    title: '实收金额'
                }, {
                    field: 'gap',
                    title: '应收金额'
                }, {
                    field: 'accActualAmount',
                    title: '创收金额'
                }, {
                    field: 'actFeeType',
                    title: '支出费用类型'
                }, {
                    field: 'actFeeDetail',
                    title: '费用明细'
                }, {
                    field: 'actAmount',
                    title: '支出金额'
                }, {
                    field: 'payRemark',
                    title: '备注'
                }, {
                    field : 'control',
                    title : '操作',
                    align : 'center',
                    formatter : function(value, row, index) {
                        return "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>";
                    },
                    events : operateEvents
                }],
                onEditableSave: function (field, row, oldValue, $el) {

                    //$.ajax({
                    //    type: "post",
                    //    url: realPath + '/finance/finSalaryUpdate',
                    //    contentType: 'application/json;charset=utf-8',
                    //    data: JSON.stringify(dd),
                    //    dataType: 'JSON',
                    //    success: function (data) {
                    //        var res = data[0]['result'];
                    //        if (res > 0){
                    //            $("#profit_accounting").bootstrapTable('destroy');
                    //            oProfitTable.Init();
                    //            alert('修改信息成功');
                    //        } else {
                    //            alert('修改信息失败,请重试')
                    //        }
                    //    },
                    //    error: function (e) {
                    //        console.log(e);
                    //        alert('修改信息失败,请稍后重试')
                    //    }
                    //});
                },
                responseHandler: function(ood){
                    let res = ood[0].result,
                        data = {};
                    data.rows = [];

                    function MakeRow(row){

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

                        this.id = row.actId;
                        this.actDate = timeString(row.actDate);
                        this.actRelatedDate = timeString(row.actRelatedDate);
                        this.actMonth = row.actMonth;
                        this.actBranch = row.actBranch;
                        this.actDepartment = '';
                        this.actType = row.actType;
                        this.staId = row.staId;
                        this.saleManager = row.saleManager;
                        this.proName = row.proName + ',' + row.proNumber;
                        this.payAmount = row.proPayment ? row.proPayment.payAmount : 0;
                        this.accActualAmount = row.accActualAmount;
                        this.gap = this.accActualAmount - this.payAmount;
                        this.actFeeType = row.actFeeType;
                        this.actFeeDetail = row.actFeeDetail;
                        this.actAmount = row.actAmount;
                        this.payRemark = row.payRemark;
                    }

                    if (res && res.length > 0){
                        for (let i = 0, l = res.length; i < l; i++){
                            data.rows.push(new MakeRow(res[i]))
                        }
                    }
                    return data;
                }
            });
        };

        // 得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                //email: JSON.parse(sessionStorage.getItem('sysUser'))['email']
            };
            return temp;
        };
        return oTableInit;
    };

var oTable = new TableInit(),
    oProjectTable = new projectTableInit(),
    oProfitTable = new profitAccountingInit();
setTimeout(function(){
	oTable.Init();
    oProjectTable.Init();
	oProfitTable.Init();
},500);