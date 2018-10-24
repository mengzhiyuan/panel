/**
 * Created by wangxiangyang on 2018/2/7.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const salary_data = {
    tabs: 'staff_manage',
    checkedDepartment: '',
    departments: [{
        departmentId: 0,
        departmentName: 'All',
        staffs: []
    }],
    staffs: [],
    pickeds: [],
    checked: {
        pickeds: [],
        total: {
            project_bonus: '',
            sell_bonus: '',
            extra_bonus: '',
            sum_bonus: ''
        },
        selectedStaffs: []
    },
    paying: {
        id: '',
        project_number: '',
        staff_id: '',
        staff_name: '',
        amount: ''
    },
    newInsuranceSetting: {
        branch: '',
        endowment: '',
        medical: '',
        unemployment: '',
        employment_injury: '',
        maternity: '',
        housing_provident_fund: '',
        extra1: '',
        extra2: '',
        total: ''
    }
},
    salary_methods = {
        switchTab: function (tag){

            let self = this;

            self.tabs = tag;

            if (tag === 'bonus'){
                $.ajax({
                    url: realPath + '/finance/financeWelfareInit',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify({
                        email: JSON.parse(sessionStorage.getItem('sysUser'))['email']
                    }),
                    success: function (data){
                        if (data[0].result.length > 0){
                            for (let rs = data[0].result, i = 0, l = rs.length; i < l; i++){
                                self['checked'].pickeds.push({
                                    staId: rs[i].picStaId,
                                    staName: rs[i].picStaName
                                })
                            }
                        } else {
                            console.log(data);
                            alert('数据出错。')
                        }
                    },
                    error: function (e){
                        console.log(e);
                        alert('操作失败。')
                    }
                })
            }
        },
        selectDepartment: function (d){

            this.checkedDepartment = d.departmentId;

            if (this.checkedDepartment === 0){

                let ars = [];

                for (let n = 0; n < this.departments.length; n++){

                    let sts = this.departments[n].staffs;

                    for (let s = 0; s < sts.length; s++){
                        ars.push({
                            staId: sts[s].staId,
                            staName: sts[s].staName
                        })
                    }
                }
                this.staffs = ars;
                return
            }

            let arr = [],
                pickedId = [];

            for (let j = 0, ld = this.pickeds.length; j < ld; j++){
                pickedId.push(this.pickeds[j].staId)
            }

            for (let i = 0, l = d.staffs.length; i < l; i++){
                if (pickedId.indexOf(d.staffs[i].staId) === -1){
                    arr.push({
                        staId: d.staffs[i].staId,
                        staName: d.staffs[i].staName
                    })
                }
            }
            this.staffs = arr
        },
        checkStaff: function (s){
            this.staffs.splice(this.staffs.indexOf(s),1);
            let arr = [];
            for (let i = 0; i < this.pickeds.length; i++){
            	arr.push(this.pickeds[i])
            }
            arr.push(s);
            this.pickeds = arr;
        },
        removePicked: function (p){
            let canceled = this.pickeds.splice(this.pickeds.indexOf(p),1);
            this.staffs.push(p)
        },
        resetStaffs: function (){
            this.pickeds = [];

            let d;

            for (let j = 0, ld = this.departments.length; j < ld; j++){
                if (this.departments[j].departmentId === this.checkedDepartment){
                    d = this.departments[j]
                }
            }

            let arr = [],
                staffs = d.staffs;
            for (let i = 0, l = staffs.length; i < l; i++){
                arr.push({
                    staId: staffs[i].staId,
                    staName: staffs[i].staName
                })
            }
            this.staffs = arr
        },
        cancelStaffs: function (){

        },
        confirmStaffs: function (){

            let to_send = salary_data.pickeds;

            $.ajax({
                url: realPath + '/finance/financeStaffAdd',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    email: JSON.parse(sessionStorage.getItem('sysUser'))['email'],
                    pickeds: to_send
                }),
                success: function (data){
                    if (data[0].result > 0){
                        alert('保存成功。')
                    } else {
                        console.log(data);
                        alert('保存失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            })
        },
        changeSelect: function (st){
            if (this['checked'].selectedStaffs.indexOf(st.staId) === -1) {
                this['checked'].selectedStaffs.push(st.staId)
            } else {
                this['checked'].selectedStaffs.splice(this['checked'].selectedStaffs.indexOf(st.staId), 1)
            }
            $("#data").bootstrapTable('destroy');
            oTable.Init();
        },
        pay: function (){
            $.ajax({
                url: realPath + '/finance/financePerformanceUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    perId: this.paying.id,
                    status: 1
                }),
                success: function (data){
                    if (data[0].result > 0){
                        $("#data").bootstrapTable('destroy');
                        oTable.Init();
                        alert('发放记录成功。')
                    } else {
                        console.log(data);
                        alert('记录失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            })
        },
        addInsurance: function (){

            let to_send = {};

            function assign (o,k){

                if (k === 'branch'){
                    to_send[k] = o[k];
                } else {
                    to_send[k] = parseFloat(o[k])
                }
            }

            for (let k in this.newInsuranceSetting){
                assign(this.newInsuranceSetting, k);
                if (k === 'branch'){
                    function assign(o,k){
                        to_send[k] = parseFloat(o[k])
                    }
                }
            }

            let self = this;

            $.ajax({
                url: realPath + '/finance/finInsuranceAdd',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(to_send),
                success: function (data){
                    if (data[0].result > 0){
                        $("#insurance_set").bootstrapTable('destroy');
                        oInsuranceTable.Init();
                        for (let k in self.newInsuranceSetting){
                            self.newInsuranceSetting[k] = ''
                        }
                        alert('设置成功。')
                    } else {
                        console.log(data);
                        alert('设置失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            })
        }
    },
    salary_mounted = function(){
        try {
            let self = this;
            $.ajax({
                url: realPath + '/finance/financeStaffAll',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    email: JSON.parse(sessionStorage.getItem('sysUser'))['email']
                }),
                success: function (data){
                    let picked = data[0].picked,
                        department = data[0].list;
                    if (picked.length > 0){
                        for (let i = 0, l = picked.length; i < l; i++){
                            self.pickeds.push({
                                staId: picked[i].picStaId,
                                staName: picked[i].picStaName
                            })
                        }
                    }
                    for (let j = 0, ld = department.length; j < ld; j++){
                        self.departments.push({
                            departmentId: department[j].id,
                            departmentName: department[j].departmentValue,
                            staffs: department[j].staList
                        })
                    }
                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    salary_watch = {
        newInsuranceSetting: {
            handler: function(){
                let t = 0;
                for (let k in this.newInsuranceSetting){
                    if (k !== 'total'){
                    	t += parseFloat(this.newInsuranceSetting[k]) || 0
                    }
                }
                this.newInsuranceSetting['total'] = t
            },
            deep: true
        }
    },
    salary_vm = new Vue({
        el: '#root',
        data: salary_data,
        mounted: salary_mounted,
        methods: salary_methods,
        watch: salary_watch
    });

window.operateEvents = {
    'click .update_btn' : function(e, value, row, index) {
        sessionStorage.setItem("proId", row.proId);
        sessionStorage.setItem('method', 'update');
        window.location.href = "../../../html/jfc/project/projectBonus.html";
    },
    'click .read_btn' : function(e, value, row, index) {
        sessionStorage.setItem("proId", row.proId);
        sessionStorage.setItem('method', 'readOnly');
        window.location.href = "../../../html/jfc/project/projectBonus.html";
    },
    'click .pay_btn' : function(e, value, row, index) {
        let paying =  salary_data.paying;
        paying.id=row.id;
        paying.project_number = row.project_number;
        paying.staff_id = row.sta_id;
        paying.staff_name = row.sta_name;
        paying.amount = row.sum_bonus
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
                    $("#wage_accounting").bootstrapTable('destroy');
                    oWageTable.Init();
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
    }
};

var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#data').bootstrapTable({
            url: "" + realPath+ "/finance/financePerformanceScheme",         // 请求后台的URL（*）
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
                field: 'project_number',
                title: '项目编号'
            }, {
                field: 'close_time',
                title: '结项日期'
            }, {
                field: 'duty',
                title: '项目岗位'
            }, {
                field: 'project_bonus',
                title: '项目奖金'
            }, {
                field: 'sell_bonus',
                title: '销售奖金'
            }, {
                field: 'extra_bonus',
                title: '特殊奖励',
                editable: {
                    type: 'number',
                    title: '特殊奖励',
                    validate: function (v) {
                        if (!v) return '不能为空';

                    }
                }
            }, {
                field: 'sum_bonus',
                title: '奖金合计'
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
                        b = "<a class=\"btn btn-xs btn-info update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                        c = "<a class=\"btn btn-xs btn-success pay_btn\" data-toggle=\"modal\" data-target=\"#expenseDetail\" title=\"发放\" ><i class=\"glyphicon glyphicon-gift\"></i></a>";
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
                            $("#data").bootstrapTable('destroy');
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
                    data = {},
                    total_project_bonus = 0,
                    total_sell_bonus = 0,
                    total_extra_bonus = 0,
                    total_sum_bonus = 0;
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

                    this.id = row.perId;
                    this.proId = row.proId;
                    this.sta_id = row.staId;
                    this.sta_name = row.perName;
                    this.close_time = timeString(row.proEntryBook) || '-';
                    this.project_number = row['proProject'].proNumber ||'-';//项目编号
                    this.duty = row.perDuty ||'-';//项目主题
                    this.project_bonus = row.perSummarise || 0;//项目经理
                    this.sell_bonus = row.perSell || 0;//客户经理
                    this.extra_bonus = row.perSpecial || 0;//项目类型
                    this.sum_bonus = row.perTotal || 0;//调查方法
                    this.remark = row.perRemark || '-';//预算完成金额

                    total_project_bonus += (parseFloat(this.project_bonus) || 0);
                    total_sell_bonus += (parseFloat(this.sell_bonus) || 0);
                    total_extra_bonus += (parseFloat(this.extra_bonus) || 0);
                    total_sum_bonus += (parseFloat(this.sum_bonus) || 0)
                }

                if (res && res.length > 0){
                    for (let i = 0, l = res.length; i < l; i++){
                        data.rows.push(new MakeRow(res[i]))
                    }
                }

                salary_data['checked'].total.project_bonus = total_project_bonus;
                salary_data['checked'].total.sell_bonus = total_sell_bonus;
                salary_data['checked'].total.extra_bonus = total_extra_bonus;
                salary_data['checked'].total.sum_bonus = total_sum_bonus;

                return data;
            }
        });
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            staffs: salary_data['checked'].selectedStaffs
        };
        return temp;
    };
    return oTableInit;
},
    insuranceSetTableInit = function() {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#insurance_set').bootstrapTable({
                url: "" + realPath+ "/finance/finInsuranceSearch",         // 请求后台的URL（*）
                method: 'post',                      // 请求方式（*）
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
                height: 200,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "ID",                     // 每一行的唯一标识，一般为主键列
                showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                    // 是否显示详细视图
                detailView: false,                   // 是否显示父子表
                columns: [{
                    field: 'branch',
                    title: '分公司'
                }, {
                    field: 'endowment',
                    title: '养老保险',
                    editable: {
                        type: 'text',
                        title: '养老保险',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'medical',
                    title: '医疗保险',
                    editable: {
                        type: 'text',
                        title: '医疗保险',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'unemployment',
                    title: '失业保险',
                    editable: {
                        type: 'text',
                        title: '失业保险',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'employment_injury',
                    title: '工伤保险',
                    editable: {
                        type: 'text',
                        title: '工伤保险',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'maternity',
                    title: '生育保险',
                    editable: {
                        type: 'text',
                        title: '生育保险',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'housing_provident_fund',
                    title: '住房公积金',
                    editable: {
                        type: 'text',
                        title: '住房公积金',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'extra1',
                    title: '其他1',
                    editable: {
                        type: 'text',
                        title: '其他1',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'extra2',
                    title: '其他2',
                    editable: {
                        type: 'text',
                        title: '其他2',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'total',
                    title: '合计'
                }, {
                    field : 'control',
                    title : '操作',
                    align : 'center',
                    formatter : function(value, row, index) {
                        return "<a class=\"btn btn-xs btn-info add_insurance_btn\" title=\"删除\" ><i class=\"glyphicon glyphicon-delete\"></i></a>";
                    },
                    events : operateEvents
                }],
                onEditableSave: function (field, row, oldValue, $el) {

                    var newValue = parseFloat(row[field]) || 0,
                        gap = newValue - parseFloat(oldValue),
                        dd = {};

                    row.total = (parseFloat(row.total) || 0) + gap;

                    dd.insId = row.id;
                    dd[field] = newValue;
                    dd.total = row.total;

                    $.ajax({
                        type: "post",
                        url: realPath + '/finance/finInsuranceUpdate',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(dd),
                        dataType: 'JSON',
                        success: function (data, status) {
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
                    });
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

                        this.id = row.insId;
                        this.branch = row.insBranch;
                        this.endowment = row.insEndowment;
                        this.medical = row.insMedical;
                        this.unemployment = row.insUnemployment;
                        this.employment_injury = row.insEmploymentInjury;//项目编号
                        this.maternity = row.insMaternity;//项目主题
                        this.housing_provident_fund = row.insHousingProvidentFund;//项目经理
                        this.extra1 = row.insExtra1;//客户经理
                        this.extra2 = row.insExtra2;//项目类型
                        this.total = row.insTotal;//调查方法
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
            return null;
        };
        return oTableInit;
    },
    wageAccountingInit = function() {
        var oTableInit = new Object();
        // 初始化Table
        oTableInit.Init = function () {
            $('#wage_accounting').bootstrapTable({
                url: "" + realPath+ "/finance/finSalarySearch",         // 请求后台的URL（*）
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
                    field: 'branch',
                    title: '分公司'
                }, {
                    field: 'staName',
                    title: '姓名'
                }, {
                    field: 'wage',
                    title: '工资基础'
                }, {
                    field: 'basePay',
                    title: '基本工资',
                    editable: {
                        type: 'text',
                        title: '基本工资',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'postWage',
                    title: '岗位工资',
                    editable: {
                        type: 'text',
                        title: '岗位工资',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'meritPay',
                    title: '绩效工资',
                    editable: {
                        type: 'text',
                        title: '绩效工资',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'float',
                    title: '浮动工资'
                }, {
                    field: 'bonus',
                    title: '绩效奖金',
                    editable: {
                        type: 'text',
                        title: '绩效奖金',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'others',
                    title: '其他',
                    editable: {
                        type: 'text',
                        title: '其他',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'chargeback',
                    title: '本月扣款'
                }, {
                    field: 'personalTax',
                    title: '个税',
                    editable: {
                        type: 'text',
                        title: '个税',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'insurances',
                    title: '五险费用'
                }, {
                    field: 'housingProvidentFund',
                    title: '住房公积金'
                }, {
                    field: 'extra',
                    title: '其他'
                }, {
                    field: 'netPayment',
                    title: '实发工资'
                }, {
                    field: 'transferAccounts',
                    title: '转账支付',
                    editable: {
                        type: 'text',
                        title: '转账支付',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'cashPay',
                    title: '现金支付',
                    editable: {
                        type: 'text',
                        title: '现金支付',
                        validate: function (v) {
                            if (!parseFloat(v)) return '请输入数字';
                        }
                    }
                }, {
                    field: 'sign',
                    title: '签字',
                    align : 'center',
                    formatter : function(value, row, index) {

                        let a = value ? ("<span>"+ value +"</span>") : "<a class=\"btn btn-xs btn-info sign_btn\" title=\"签字\" >签字</a>"

                        return a;
                    },
                    events : operateEvents
                }, {
                    field: 'remark',
                    title: '备注说明',
                    editable: {
                        type: 'text',
                        title: '备注说明',
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
                            b = "<a class=\"btn btn-xs btn-info update_btn\" data-toggle=\"modal\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                            c = "<a class=\"btn btn-xs btn-success pay_btn\" data-toggle=\"modal\" data-target=\"#expenseDetail\" title=\"发放\" ><i class=\"glyphicon glyphicon-gift\"></i></a>";
                        return a+b+c;
                    },
                    events : operateEvents
                }, {
                    field: 'workingHours',
                    title: '工作时长/天'
                }, {
                    field: 'extras',
                    title: '其他',
                    editable: {
                        type: 'text',
                        title: '其他',
                        validate: function (v) {
                            if (!v) return '不能为空';
                        }
                    }
                }, {
                    field: 'remarks',
                    title: '备注',
                    editable: {
                        type: 'text',
                        title: '备注',
                        validate: function (v) {
                            if (!v) return '不能为空';
                        }
                    }
                }],
                onEditableSave: function (field, row, oldValue, $el) {

                    var dd = {};

                    dd.salId = row.id;
                    dd.staId = row.staId;
                    dd[field] = row[field];

                    $.ajax({
                        type: "post",
                        url: realPath + '/finance/finSalaryUpdate',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(dd),
                        dataType: 'JSON',
                        success: function (data) {
                            var res = data[0]['result'];
                            if (res > 0){
                                $("#wage_accounting").bootstrapTable('destroy');
                                oWageTable.Init();
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

                        let salary = row.finSalary || {},
                            insurance = row.finInsurance;

                        this.branch = insurance.insBranch;
                        this.staId = row.picStaId;
                        this.staName = row.picStaName;

                        this.id = salary.salId;
                        this.basePay = salary.salBasePay;
                        this.postWage = salary.salPostWage;
                        this.meritPay = salary.salMeritPay;
                        this.wage = parseFloat(this.basePay) + parseFloat(this.postWage) + parseFloat(this.meritPay);//工资基础

                        this.bonus = parseFloat(salary.salBonus) || 0;
                        this.others = parseFloat(salary.salOthers) || 0;
                        this.float = parseFloat(this.salBonus) + parseFloat(this.salOthers);//浮动工资

                        this.personalTax = salary.sal_personal_tax || 0;
                        this.insurances = (parseFloat(insurance.insEndowment)||0) + (parseFloat(insurance.insMedical)||0) + (parseFloat(insurance.insUnemployment)||0) + (parseFloat(insurance.insEmploymentInjury)||0) + (parseFloat(insurance.insMaternity)||0);
                        this.housingProvidentFund = insurance.insHousingProvidentFund || 0;
                        this.extra = (parseFloat(insurance.insExtra1)||0) + (parseFloat(insurance.insExtra2)||0);
                        this.chargeback = this.personalTax + this.insurances + this.housingProvidentFund + this.extra;//扣款

                        this.netPayment = this.wage + this.bonus - this.chargeback;

                        this.transferAccounts = parseFloat(salary.salTransferAccounts) || 0;
                        this.cashPay = parseFloat(salary.salCashPay) || 0;

                        this.sign = salary.salSign;
                        this.remark = salary.salRemark;
                        this.remarks = salary.salRemarks;
                        this.date = salary.salTime;

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
                email: JSON.parse(sessionStorage.getItem('sysUser'))['email']
            };
            return temp;
        };
        return oTableInit;
    };

var oTable = new TableInit(),
    oInsuranceTable = new insuranceSetTableInit(),
    oWageTable = new wageAccountingInit();
oTable.Init();
oInsuranceTable.Init();
oWageTable.Init();


//var ButtonInit = function() {
//    var oInit = new Object();
//    var postdata = {};
//
//    oInit.Init = function() {
//        // 初始化页面上面的按钮事件
//    };
//
//    return oInit;
//};