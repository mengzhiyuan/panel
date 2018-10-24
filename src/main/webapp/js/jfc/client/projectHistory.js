/**
 * Created by wangxiangyang on 2018/2/27.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const history_data = {
        detail: {
            hisId: '',
            hisIndustry: '',
            hisRegion: '',
            hisUnit: '',
            hisProjectName: '',
            hisContacts: '',
            hisPhone: '',
            hisBudget: '',
            hisBidName: '',
            hisAmountMoney: '',
            hisTime: '',
            hisSituation: '',
            hisRemark: '',
            hisCreateTime: ''
        }
    },
    history_methods = {
        search: function(){
            $("#history_list").bootstrapTable('destroy');
            oTable.Init();
        },
        beforeInsert: function(){
            for (let k in this.detail){
                this.detail[k] = ''
            }
        },
        insertHistory: function(){
            let self = this,
                now = new Date();

            self.detail.hisCreateTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

            $.ajax({
                url: realPath + '/customer/historicalSaveOrUpdate',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(self.detail),
                success: function (data){
                    if (data[0].result > 0){
                        $("#history_list").bootstrapTable('destroy');
                        oTable.Init();
                        alert('修改信息成功');
                    }
                }
            })
        }
    },
    history_mounted = function(){
        laydate.render({
            elem: '#time',
            type: 'date'
        });
        let self = this;
        setInterval(function(){
            self.detail.hisTime = $('#time').val()
        },200)
    },
    history_watch = {
    },
    history_vm = new Vue({
        el: '#root',
        data: history_data,
        mounted: history_mounted,
        methods: history_methods,
        watch: history_watch
    });

window.operateEvents = {
    'click .update_btn' : function(e, value, row, index) {
        let detail = history_data.detail;
        for (let k in row){
            detail[k] = row[k]
        }
    }
};

var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#history_list').bootstrapTable({
            url: "" + realPath+ "/customer/historicalSearch",         // 请求后台的URL（*）
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
                field: 'hisId',
                title: 'ID'
            }, {
                field: 'hisIndustry',
                title: '行业'
            }, {
                field: 'hisRegion',
                title: '区域'
            }, {
                field: 'hisUnit',
                title: '招标单位'
            }, {
                field: 'hisProjectName',
                title: '项目名称'
            }, {
                field: 'hisContacts',
                title: '联系人'
            }, {
                field: 'hisPhone',
                title: '电话'
            }, {
                field: 'hisBudget',
                title: '预算'
            }, {
                field: 'hisBidName',
                title: '中标单位'
            }, {
                field: 'hisAmountMoney',
                title: '中标金额'
            }, {
                field: 'hisTime',
                title: '中标时间'
            }, {
                field: 'hisSituation',
                title: '单位参与情况'
            }, {
                field: 'hisRemark',
                title: '备注'
            }, {
                field: 'control',
                title: '操作',
                formatter : function(value, row, index) {
                    return "<a class=\"btn btn-xs btn-info update_btn\" data-toggle=\"modal\" data-target=\"#history_detail\" title=\"修改\" >修改</a>";
                },
                events : operateEvents
            }],
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

                    try {
                        this.hisId = row.hisId;
                        this.hisIndustry = row.hisIndustry;
                        this.hisRegion = row.hisRegion;
                        this.hisUnit = row.hisUnit;
                        this.hisProjectName = row.hisProjectName;
                        this.hisContacts = row.hisContacts;
                        this.hisPhone = row.hisPhone;
                        this.hisBudget = row.hisBudget;
                        this.hisBidName = row.hisBidName;
                        this.hisAmountMoney = row.hisAmountMoney;
                        this.hisTime = timeString(row.hisTime);
                        this.hisSituation = row.hisSituation;
                        this.hisRemark = row.hisRemark;
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