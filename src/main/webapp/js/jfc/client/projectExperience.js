/**
 * Created by wangxiangyang on 2018/2/26.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const experience_data = {
    detail: {
        expId: '',
        expIndustry: '',//行业
        expContract_year: '',//合同年限
        expContract_date: '',//签订日期
        expArea: '',//区域
        expPartner: '',//合作伙伴
        expProject: '',//项目名称
        expClient_level: '',//客户级别
        expContact: '',//联系人
        expTelephone: '',//电话
        expAmount: '',//项目金额
        expPeriod_start: '',
        expPeriod_end: '',
        expPeriod: '',//项目周期
        expType: '',//项目类型
        expPosition: '',//实施地点
        expDomain: '',//项目范畴
        expContract_number: '',//采购合同编号
        expProject_content: '',//项目内容
        expScanned: '',//是否扫描
        expRemark: ''//备注
    }
},
    experience_methods = {
        search: function(){
            $("#experience").bootstrapTable('destroy');
            oTable.Init();
        },
        beforeInsert: function(){
            for (let k in this.detail){
                this.detail[k] = ''
            }
        },
        beforeExcel:function(){
        	 $.ajax({
                 url: realPath + '/customer/beforeExcelPerience',
                 type: 'post',
                 contentType: 'application/json;charset=utf-8',
                 dataType: 'json',
                 async: true,
                 success: function (data){
                     if (data[0].result!="error"){
                    	 window.open(realPath+data[0].result,"_blank");    
                     }else{
                    	 alert("导出失败");
                     }
                 }
             })
        },
        InsertExperience: function(){
            let self = this;

            $.ajax({
                url: realPath + '/customer/experienceSaveOrUpdate',
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
    experience_mounted = function(){
        laydate.render({
            elem: '#contract_date',
            type: 'date'
        });
        laydate.render({
            elem: '#period_start',
            type: 'date'
        });
        laydate.render({
            elem: '#period_end',
            type: 'date'
        });
        let self = this;
        setInterval(function(){
            self.detail.expContract_date = $('#contract_date').val();
            self.detail.expPeriod_start = $('#period_start').val();
            self.detail.expPeriod_end = $('#period_end').val();
            self.detail.expPeriod = self.detail.expPeriod_start + ' ~ ' + self.detail.expPeriod_end
        },200)
    },
    experience_watch = {},
    experience_vm = new Vue({
        el: '#root',
        data: experience_data,
        methods: experience_methods,
        mounted: experience_mounted,
        watch: experience_watch
    });

window.operateEvents = {
    'click .update_btn' : function(e, value, row, index) {
        let detail = experience_data.detail;
        detail.expId = row.id;
        detail.expIndustry = row.industry;//行业
        detail.expContract_year = row.contract_year;//合同年限
        detail.expContract_date = row.contract_date;//签订日期
        detail.expArea = row.area;//区域
        detail.expPartner = row.partner;//合作伙伴
        detail.expProject = row.project;//项目名称
        detail.expClient_level = row.client_level;//客户级别
        detail.expContact = row.contact;//联系人
        detail.expTelephone = row.telephone;//电话
        detail.expAmount = row.amount;//项目金额
        detail.expPeriod = row.period;//项目周期
        detail.expPeriod_start = row.period.match(/(\S+)\s\~/)[1];
        detail.expPeriod_end = row.period.match(/\~\s(\S+)/)[1];
        detail.expType = row.type;//项目类型
        detail.expPosition = row.position;//实施地点
        detail.expDomain = row.domain;//项目范畴
        detail.expContract_number = row.contract_number;//采购合同编号
        detail.expProject_content = row.project_content;//项目内容
        detail.expScanned = row.scanned;//是否扫描
        detail.expRemark = row.remark;//备注
    }
};

var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#experience').bootstrapTable({
            url: "" + realPath+ "/customer/experienceSearch",         // 请求后台的URL（*）
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
                field: 'industry',
                title: '行业'
            }, {
                field: 'contract_year',
                title: '合同年限'
            }, {
                field: 'contract_date',
                title: '签订日期'
            }, {
                field: 'area',
                title: '区域'
            }, {
                field: 'partner',
                title: '合作单位'
            }, {
                field: 'project',
                title: '项目名称'
            }, {
                field: 'contact',
                title: '联系人'
            }, {
                field: 'telephone',
                title: '电话'
            }, {
                field: 'amount',
                title: '项目金额(万元)'
            }, {
                field: 'period',
                title: '项目周期'
            }, {
                field: 'type',
                title: '项目类型'
            }, {
                field: 'position',
                title: '实施地点'
            }, {
                field: 'domain',
                title: '项目范畴(某区域或全国)'
            }, {
                field: 'contract_number',
                title: '采购项合同编号'
            }, {
                field: 'project_content',
                title: '合同内容描述'
            }, {
                field: 'scanned',
                title: '合同是否扫描'
            }, {
                field: 'remark',
                title: '备注'
            }, {
                field : 'control',
                title : '操作',
                align : 'center',
                formatter : function(value, row, index) {
                    let a = "<a class=\"btn btn-xs btn-info update_btn\" data-toggle=\"modal\" data-target=\"#experience_detail\" title=\"修改\" ><i class=\"glyphicon glyphicon-edit\"></i></a>",
                        b = "<a class=\"btn btn-xs btn-info upload_btn\" data-toggle=\"modal\" title=\"上传\" ><i class=\"glyphicon glyphicon-camera\"></i></a>";
                    return a + b;
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
                        this.id = row.expId;
                        this.industry = row.expIndustry;
                        this.contract_year = row.expContractYear;
                        this.contract_date = timeString(row.expContractDate);
                        this.area = row.expArea;
                        this.partner = row.expPartner;
                        this.project = row.expProject;
                        this.client_level = row.expClientLevel;
                        this.contact = row.expContact;
                        this.telephone = row.expTelephone;
                        this.amount = row.expAmount;
                        this.period = row.expPeriod;
                        this.type = row.expType;
                        this.position = row.expPosition;
                        this.domain = row.expDomain;
                        this.contract_number = row.expContractNumber;
                        this.project_content = row.expProjectContent;
                        this.scanned = row.expScanned;
                        this.remark = row.expRemark;
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