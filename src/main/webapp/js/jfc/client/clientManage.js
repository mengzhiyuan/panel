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
            company_name: '',//公司名称
            province: '',//省份
            city: '',//城市
            industry_type: '',//行业分类
            industry_separate: '',//行业细分
            client_type: '',//客户类型
            client_level: '',//客户分级
            ach_remark: '',//选择原因
            contact: '',//联系人姓名
            department: '',//部门
            duty: '',//职务
            cellphone: '',//手机
            telephone: '',//电话
            com_fax: '',//传真
            liaEmail: '',//电子邮箱
            com_website: '',//网址
            com_headquarters: '',//总部
            com_address: '',//地址
            com_code: '',//邮编
            // achAchievements: [],//接触情况
            com_remark: '',
            sta_id: ''//客户经理
        },
        news_list: [],
        new_news: {
            ach_sta_id: '',//
            ach_lia_id: '',//
            ach_situation: '',//
            ach_achievements: '',//
            ach_remark: ''//
        }
    },
    client_methods = {
        switchTab: function (tag){

            let self = this;

            self.tabs = tag;
        },
        search: function(){
            $("#client_list").bootstrapTable('destroy');
            oTable.Init();
        },
        beforeInsert: function(){
            for (let k in this.detail){
                this.detail[k] = ''
            }
            this.detail.sta_id = JSON.parse(sessionStorage.getItem('sysUser')).userName;
            $('#client_detail').find('input').prop('disabled', false);
            $('#client_detail').find('select').prop('disabled', false)
        },
        beforeExcel:function(){
        	 $.ajax({
                 url: realPath + '/customer/beforeExcel',
                 type: 'post',
                 contentType: 'application/json;charset=utf-8',
                 dataType: 'json',
                 data: JSON.stringify({
                     liaIds: this.status.checked_samId
                 }),
                 async: true,
                 success: function (data){
                     if (data[0].result!="error"){
                    	 window.open(realPath+data[0].result,"_blank");
                     }else{
                    	 alert("导出失败");
                     }
                 },
                 error: function (e){
                     console.log(e);
                     alert('网络错误。')
                 }
             })
        },
        insertClient: function(){
            let self = this;
            self.detail.liaId = self.detail.id;
            self.detail.email = JSON.parse(sessionStorage.getItem('sysUser')).email;
            $.ajax({
                url: realPath + '/customer/customerSaveOrUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(self.detail),
                success: function (data){
                    if (data[0].result > 0){
                        $("#client_list").bootstrapTable('destroy');
                        oTable.Init();
                        alert('修改信息成功');
                    }
                }
            })
        },
        updateNews: function(){
            let self = this;
            $.ajax({
                url: realPath + '/customer/achievementsInsearch',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(self.new_news),
                success: function (data){
                    if (data[0].result > 0){
                        $("#client_list").bootstrapTable('destroy');
                        oTable.Init();
                        alert('修改信息成功');
                    }
                }
            })
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
        //导入excel的保存按钮
        $("#excel_save").on("click", function(event){
            $('#closeImport').click();
            $('#email-upload').val(JSON.parse(sessionStorage.getItem('sysUser')).email);
            var option = {
                url: ""+realPath+"/customer/importCustomer",
                type: 'post',
                dataType:"json",
                clearForm: true,
                resetForm: true,
                success: function(data){
                    var res = data[0]["result"];
                    if (res > 0){
                        oTable.Init()
                    } else {
                        alert('操作失败,请重试')
                    }
                },
                error: function(e){
                    alert('操作失败,请重试')
                }
            };
            $("#excelImport").ajaxSubmit(option);
            return false;
        });
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
    'click .update_btn' : function(e, value, row, index) {
        let detail = client_data.detail;
        detail.id = row.id;
        detail.comId = row.com_id;
        detail.company_name = row.company_name;
        detail.province = row.province;
        setTimeout(function(){
            $('.province').change();
            detail.city = row.city;
        },0);
        detail.industry_type = row.industry_type;
        detail.industry_separate = row.industry_separate;
        detail.client_type = row.client_type;
        detail.client_level = row.client_level;
        detail.ach_remark = row.ach_remark;
        detail.contact = row.contact;
        detail.department = row.department;
        detail.duty = row.duty;
        detail.cellphone = row.cellphone;
        detail.telephone = row.telephone;
        detail.com_fax = row.com_fax;
        detail.com_website = row.com_website;
        detail.com_code = row.com_code;
        detail.com_headquarters = row.com_headquarters;
        detail.com_address = row.com_address;
        detail.liaEmail = row.email;
        detail.com_remark = row.com_remark;
        $('#client_detail').find('input').prop('disabled', false);
        $('#client_detail').find('select').prop('disabled', false)
    },
    'click .consult_btn' : function(e, value, row, index) {
        let detail = client_data.detail;
        detail.id = row.id;
        detail.comId = row.com_id;
        detail.company_name = row.company_name;
        detail.province = row.province;
        setTimeout(function(){
            $('.province').change();
            detail.city = row.city;
        },0);
        detail.industry_type = row.industry_type;
        detail.industry_separate = row.industry_separate;
        detail.client_type = row.client_type;
        detail.client_level = row.client_level;
        detail.ach_remark = row.ach_remark;
        detail.contact = row.contact;
        detail.department = row.department;
        detail.duty = row.duty;
        detail.cellphone = row.cellphone;
        detail.telephone = row.telephone;
        detail.com_fax = row.com_fax;
        detail.com_website = row.com_website;
        detail.com_code = row.com_code;
        detail.com_headquarters = row.com_headquarters;
        detail.com_address = row.com_address;
        detail.liaEmail = row.email;
        detail.com_remark = row.com_remark;
        $('#client_detail').find('input').prop('disabled', true);
        $('#client_detail').find('select').prop('disabled', true)
    },
    'click .delete_btn' : function(e, value, row, index) {

        let id = row.id;

        $.ajax({
            url: realPath + '/customer/deleteCustomer',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                liaId: id
            }),
            success: function(d){
                if (d[0].result > 0){
                    alert('删除成功');
                    document.location.reload(true)
                } else {
                    alert("删除失败")
                }
            },
            error: function(e){
                console.log(e);
                alert('网络错误')
            }
        })
    },
    'click .bell_btn' : function(e, value, row, index) {

        let id = row.id;

        $.ajax({
            url: realPath,
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                liaId: id
            }),
            success: function(d){
                if (d[0].result > 0){
                    alert('操作成功')
                } else {
                    alert('操作失败')
                }
            },
            error: function(e){
                console.log(e);
                alert('操作失败')
            }
        })
    },
    'click .news_btn': function(e,value,row,index){

        let new_news = client_data.new_news,
            list = row.news_list;

        for (let k in new_news){
            new_news[k] = ''
        }
        new_news.ach_sta_id = JSON.parse(sessionStorage.getItem('sysUser')).id;
        new_news.ach_lia_id = row.id;

        client_data.news_list = [];
        for (let n = 0; n < list.length; n++){
            client_data.news_list.push(list[n].achSituation)
        }
    }
};
function examine(type,datas){
    let self = client_data;
    if(type.indexOf('uncheck')==-1){
        for (let i = 0; i < datas.length; i++){
            self.status.checked_row.indexOf(datas[i]) === -1 &&
            self.status.checked_row.push(datas[i]), self.status.checked_samId.push(datas[i].id)
        }
        //$.each(datas,function(i,v){
        //    // 添加时，判断一行或多行的 id 是否已经在数组里 不存则添加　
        //    self.status.checked_row.indexOf(v.id) == -1 ? self.status.checked_row.push(v.id) : -1;
        //});
    }else{
        for (let i = 0; i < datas.length; i++){
            self.status.checked_samId.splice(self.status.checked_samId.indexOf(datas[i].id),1);
            for (let j = 0; j < self.status.checked_row.length; j++){
                self.status.checked_row[j].samId === datas[i].id && self.status.checked_row.splice(j,1)
            }
        }
        //$.each(datas,function(i,v){
        //    self.status.checked_row.splice(self.status.checked_row.indexOf(v.id),1);    //删除取消选中行
        //});
    }
};
var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#client_list').bootstrapTable({
            url: "" + realPath+ "/customer/customerSearch",         // 请求后台的URL（*）
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
            pageList: [10, 25, 30, 50, 100],        // 可供选择的每页的行数（*）
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
                checkbox: true,
                formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                    return {
                        checked : client_data.status.checked_samId.indexOf(row.id) > -1
                    }
                }
            }, {
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
                field: 'ach_remark',
                title: '选择原因'
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
                field: 'com_fax',
                title: '传真'
            }, {
                field: 'email',
                title: '电子邮箱'
            }, {
                field: 'com_headquarters',
                title: '总部'
            }, {
                field: 'com_website',
                title: '网址'
            }, {
                field: 'com_address',
                title: '地址'
            }, {
                field: 'com_code',
                title: '邮编'
            }, {
                field: 'first',
                title: '初次接触情况'
            }, {
                field: 'second',
                title: '干净接触情况'
            }, {
                field: 'third',
                title: '三次接触情况'
            }, {
                field: 'sta_id',
                title: '客户经理'
            }, {
                field: 'com_remark',
                title: '备注'
            }, {
                field : 'control',
                title : '操作',
                align : 'center',
                formatter : function(value, row, index) {
                    let a = "<a class=\"btn btn-xs btn-info consult_btn\" data-toggle=\"modal\" data-target=\"#client_detail\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>",
                        b = "<a class=\"btn btn-xs btn-info update_btn\" data-toggle=\"modal\" data-target=\"#client_detail\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                        c = "<a class=\"btn btn-xs btn-info delete_btn\" title=\"删除\" ><i class=\"glyphicon glyphicon-remove\"></i></a>",
                        d = "<a class=\"btn btn-xs btn-info bell_btn\" title=\"提醒\" ><i class=\"glyphicon glyphicon-bell\"></i></a>";
                    return a+b+c+d;
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
                    url: realPath + '/customer/financePerformanceUpdate',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(dd),
                    dataType: 'JSON',
                    success: function (data, status) {
                        var res = data[0]['result'];
                        if (res > 0){
                            $("#client_list").bootstrapTable('destroy');
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
                        this.last_connect_time = row.end;
                        this.connect_result = news.length ? news[news.length - 1].achAchievements : '';
                        this.industry_type = coms.comIndustry;
                        this.industry_separate = coms.comIndustrySeparate;
                        this.company_name = coms.comName;
                        this.client_type = coms.comType;
                        this.client_level = coms.comClassification;
                        this.ach_remark = news.length ? news[news.length - 1].achRemark : '';
                        this.province = coms.comProvince;
                        this.city = coms.comCity;
                        this.contact = row.liaName;
                        this.department = row.liaDepartment;
                        this.duty = row.liaPost;
                        this.cellphone = row.liaPhone;
                        this.telephone = row.liaTel;
                        this.com_fax = coms.comFax;
                        this.email = row.liaEmail;
                        this.com_headquarters = coms.comHeadquarters;
                        this.com_website = coms.comWebsite;
                        this.com_address = coms.comAddress;
                        this.com_code = coms.comCode;
                        this.first = news[0] ? news[0].achSituation : '';
                        this.second = news[1] ? news[1].achSituation : '';
                        this.third = news[2] ? news[2].achSituation : '';
                        this.com_remark = coms.comRemark;
                        this.sta_id = row.staId;
                    } catch (e) {}
                }

                if (res && res.length > 0){
                    for (let i = 0, l = res.length; i < l; i++){
                        data.rows.push(new MakeRow(res[i]))
                    }
                }
                return data;
            }
        });
        $("#client_list").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
            .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                examine(e.type,datas);                              // 保存到全局 Array() 里
            })
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            email: JSON.parse(sessionStorage.getItem('sysUser')).email,
            limit: params.limit,   // 页面大小
            offset: params.offset,  // 页码
            keyName: $('#key_name').val(),
            keyValue: $('#key_value').val()
        };
        return temp;
    };
    return oTableInit;
};

var oTable = new TableInit();
oTable.Init();