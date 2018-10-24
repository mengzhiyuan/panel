/**
 * Created by wangxiangyang on 2018/2/24.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const client_data = {
        tabs: 'running_account',
        status: {
            checked_row: [],
            checked_samId: []
        },
        detail: {
            id: '',
            comId: '',
            company_name: '',
            province: '',
            city: '',
            industry_type: '',
            industry_separate: '',
            client_type: '',
            client_level: '',
            ach_remark: '',
            contact: '',
            department: '',
            duty: '',
            cellphone: '',
            telephone: '',
            com_fax: '',
            email: '',
            com_website: '',
            com_headquarters: '',
            com_address: '',
            com_code: '',
            achAchievements: [],
            com_remark: '',
            sta_id: ''
        },
        news_list: [],
        new_news: {
            ach_sta_id: '',
            ach_lia_id: '',
            ach_situation: '',
            ach_achievements: '',
            ach_remark: ''
        }
    },
    client_methods = {
        search: function(){
            $("#client_list").bootstrapTable('destroy');
            oTable.Init();
        }
    },
    client_mounted = function(){

        try {
            let self = this;
            $.ajax({
                url: realPath + '/finance/financeStaffAll',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({}),
                success: function (data){

                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    client_watch = {
        newInsuranceSetting: {
            handler: function(){

            },
            deep: true
        }
    },
    client_vm = new Vue({
        el: '#root',
        data: client_data,
        mounted: client_mounted,
        methods: client_methods,
        watch: client_watch
    });

window.operateEvents = {
    'click .approve_btn' : function(e, value, row, index) {
        $.ajax({
            url: realPath + '/customer/deleteCustomerTrue',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                liaId: row.id,
                comId: row.com_id
            }),
            success: function(d){
                if (d[0].result > 0){
                    alert('操作成功');
                    document.location.reload(true)
                } else {
                    alert('操作成功')
                }
            },
            error: function(e){
                alert('网络错误')
            }
        })
    },
    'click .decline_btn' : function(e, value, row, index) {
        $.ajax({
            url: realPath + '/customer/rejected',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                liaId: row.id
            }),
            success: function(d){
                if (d[0].result > 0){
                    alert('操作成功');
                    document.location.reload(true)
                } else {
                    alert('操作成功')
                }
            },
            error: function(e){
                alert('网络错误')
            }
        })
    }
};
var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#client_list').bootstrapTable({
            url: "" + realPath+ "/customer/auditQuery",         // 请求后台的URL（*）
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
                field: 'last_connect_time',
                title: '最后接触时间'
            }, {
                field: 'connect_result',
                title: '联络成果'
            }, {
                field: 'industry_type',
                title: '行业分类'
            }, {
                field: 'industry_separate',
                title: '行业细分'
            }, {
                field: 'company_name',
                title: '公司名称'
            }, {
                field: 'client_type',
                title: '客户类型'
            }, {
                field: 'client_level',
                title: '客户分级'
            }, {
                field: 'province',
                title: '省份'
            }, {
                field: 'city',
                title: '城市'
            }, {
                field: 'contact',
                title: '联系人姓名'
            }, {
                field: 'department',
                title: '部门'
            }, {
                field: 'duty',
                title: '职务'
            }, {
                field: 'cellphone',
                title: '手机'
            }, {
                field: 'telephone',
                title: '电话'
            }, {
                field: 'email',
                title: '电子邮箱'
            }, {
                field: 'com_remark',
                title: '备注'
            }, {
                field : 'control',
                title : '操作',
                align : 'center',
                formatter : function(value, row, index) {
                    let a = "<a class=\"btn btn-xs btn-info approve_btn\" title=\"通过\" ><i class=\"glyphicon glyphicon-ok\"></i></a>",
                        b = "<a class=\"btn btn-xs btn-info decline_btn\" title=\"拒绝\" ><i class=\"glyphicon glyphicon-remove\"></i></a>";
                    return a+b;
                },
                events : operateEvents
            }],
            responseHandler: function(ood){
                let res = ood[0].result,
                    data = {},
                    total_project_bonus = 0,
                    total_sell_bonus = 0,
                    total_extra_bonus = 0,
                    total_sum_bonus = 0;
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

                    try {

                        let coms = row.cusComList,
                            news = row.cusAchievements;

                        this.id = row.liaId;
                        this.com_id = row.comId;
                        this.last_connect_time = timeString(news[news.length - 1].achTime);
                        this.connect_result = news[news.length - 1].achAchievements;
                        this.industry_type = coms.comIndustry;
                        this.industry_separate = coms.comIndustrySeparate;
                        this.company_name = coms.comName;
                        this.client_type = coms.comType;
                        this.client_level = coms.comClassification;
                        this.province = coms.comProvince;
                        this.city = coms.comCity;
                        this.contact = row.liaName;
                        this.department = row.liaDepartment;
                        this.duty = row.liaPost;
                        this.cellphone = row.liaPhone;
                        this.telephone = row.liaTel;
                        this.email = row.liaEmail;
                        this.news = news[news.length - 1].achSituation;
                        this.remark = news[news.length - 1].achRemark;
                        this.news_list = news
                    } catch (e) {}
                }

                if (res && res.length > 0){
                    for (let i = 0, l = res.length; i < l; i++){
                        data.rows.push(new MakeRow(res[i]))
                    }
                }
                return data;
            }
        })
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            // email: JSON.parse(sessionStorage.getItem('sysUser')).email,
            limit: params.limit,   // 页面大小
            offset: params.offset  // 页码
        };
        return temp;
    };
    return oTableInit;
};

var oTable = new TableInit();
oTable.Init();