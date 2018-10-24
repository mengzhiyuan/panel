/**
 * Created by wangxiangyang on 2018/5/21.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
    const data = {
        status: {
            checked_row: [],
            checked_id: []
        },
        param: {
            project_number: '',
            project_title: '',
            project_manager: '',
            project_status: '',
            launch_time: ''
        },
        eventHandler: {
            'click .project_number': function(e, value, row, index){
                sessionStorage.setItem('project_id', row.id);
                location.href = './newProject.html'
            },
            'click .project_title': function(e, value, row, index){
                sessionStorage.setItem('field', 'project_title');
                sessionStorage.setItem('value', value);
                location.href = './filterByField.html'
            },
            'click .project_manager': function(e, value, row, index){
                sessionStorage.setItem('field', 'project_manager');
                sessionStorage.setItem('value', value);
                location.href = './filterByField.html'
            },
            'click .respondent': function(e, value, row, index){
                sessionStorage.setItem('field', 'respondent');
                sessionStorage.setItem('value', value);
                location.href = './filterByField.html'
            },
            'click .progress_btn': function(e, value, row, index){
                sessionStorage.setItem('progress_k_id', row.id);
                //sessionStorage.setItem('detailStatus','consult');
                document.location.href = './projectProgress.html'
            },
            'click .update_btn': function (e, value, row, index) {
                //sessionStorage.setItem('memberDetail', JSON.stringify(row));
                //sessionStorage.setItem('detailStatus','update')
                sessionStorage.setItem('project_id', row.id);
                document.location.href = './newProject.html'
            },
            'click .sample_record': function (e, value, row, index) {
                sessionStorage.setItem('project_id', row.id);
                document.location.href = './sampleRecord.html'
            },
            'click .sample_manage': function (e, value, row, index) {
                sessionStorage.setItem('sample_manage_id', row.id);
                document.location.href = './sampleManage.html'
            }
        },
        email_address: [],
        email_title: '',
        email_container: null
    };
    const methods = {
        query: function(){
            let self = this;
            this.queryParams = function(){

                let pr = {},
                    field = sessionStorage.getItem('field'),
                    value = sessionStorage.getItem('value');
                //pr.kNumber = self.param.project_number;
                //pr.kTheme = self.param.project_title;
                //pr.kManager = self.param.project_manager;
                //pr.kStatus = self.param.project_status;
                switch (field){
                    case 'project_title':
                        pr.kTheme = value;
                        break;
                    case 'project_manager':
                        pr.kManager = value;
                        break;
                    case 'respondent':
                        pr.staName = value;
                        break;
                }

                pr.limit = this.pageSize;
                pr.offset = (this.pageNumber-1) *this.pageSize;
                return pr
            };
            this.tableInit(realPath + '/management/prolist')
        },
        queryParams: function(){},
        tableInit: function(url){
            let self = this;
            $("#result").bootstrapTable('destroy')
                .bootstrapTable({
                    url: url,         // 请求后台的URL（*）
                    method: 'post',                      // 请求方式（*）
                    toolbar: '#tools',                // 工具按钮用哪个容器
                    striped: true,                      // 是否显示行间隔色
                    cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   // 是否显示分页（*）
                    sortable: false,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: self.queryParams,// 传递参数（*）
                    sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                    pageNumber:1,                       // 初始化加载第一页，默认第一页
                    pageSize: 20,                       // 每页的记录行数（*）
                    pageList: [10, 20, 50, 100],        // 可供选择的每页的行数（*）
                    search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true,                  // 是否显示所有的列
                    showRefresh: true,                  // 是否显示刷新按钮
                    minimumCountColumns: 2,             // 最少允许的列数
                    clickToSelect: true,                // 是否启用点击选中行
                    //height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "id",                     // 每一行的唯一标识，一般为主键列
                    showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    // 是否显示详细视图
                    detailView: false,                   // 是否显示父子表
                    columns: [{
                        checkbox: true,
                        formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                            return {
                                checked : self.status.checked_row.indexOf(row.id) > -1
                            }
                        }
                    },{
                        field: 'id',
                        title: 'Id'
                        ,class: 'id'
                    },{
                        field: 'project_number',
                        title: '项目编号'
                        ,class: 'project_number',
                        formatter : function(value, row, index) {
                            return "<a class=\"btn btn-xs project_number\" title=\"修改\">"+ value +"</a>"
                        }
                        ,events : self.eventHandler
                    },{
                        field: 'project_title',
                        title: '项目主题'
                        ,class: 'project_title',
                        formatter : function(value, row, index) {
                            return "<a class=\"btn btn-xs project_title\" title=\"修改\">"+ value +"</a>"
                        }
                        ,events : self.eventHandler
                    },{
                        field: 'project_manager',
                        title: '项目经理'
                        ,class: 'project_manager',
                        formatter : function(value, row, index) {
                            return "<a class=\"btn btn-xs project_manager\" title=\"修改\">"+ value +"</a>"
                        }
                        ,events : self.eventHandler
                    },{
                        field: 'project_status',
                        title: '项目状态'
                        ,class: 'project_status',
                        formatter : function(value, row, index) {
                            return "<a class=\"btn btn-xs project_status\" title=\"修改\">"+ value +"</a>"
                        }
                        ,events : self.eventHandler
                    },{
                        field: 'start_time',
                        title: '发布时间',
                        class: 'start_time'
                    },{
                        field: 'end_time',
                        title: '结束时间',
                        class: 'end_time'
                    },{
                        field: 'data_feature',
                        title: '数据属性',
                        class: 'data_feature'
                    },{
                        field: 'project_premium',
                        title: '项目激励'
                        ,class: 'project_premium'
                    },{
                        field: 'bonus_premium',
                        title: '积分激励'
                        ,class: 'bonus_premium'
                    },{
                        field: 'respondent',
                        title: '调查对象',
                        class: 'respondent',
                        formatter : function(value, row, index) {
                            return "<a class=\"btn btn-xs respondent\" title=\"修改\">"+ value +"</a>"
                        }
                        ,events : self.eventHandler
                    },{
                        field: 'sample',
                        title: '样本量',
                        class: 'sample'
                    },{
                        field: 'recruit',
                        title: '招募数量',
                        class: 'recruit'
                    },{
                        field: 'complete_number',
                        title: '完成数量'
                        ,class: 'complete_number'
                    },{
                        field: 'remark',
                        title: '备注'
                        ,class: 'remark'
                    },{
                        field: 'control',
                        title: '操作',
                        formatter : function(value, row, index) {
                            let a = "<button class=\"btn btn-xs progress_btn\" title=\"项目进度\"><i class=\"glyphicon glyphicon-info-sign\"></i></button>",
                                b = "<button class=\"btn btn-xs sample_record\" title=\"抽样记录\"><i class=\"glyphicon glyphicon-share\"></i></button>",
                                c = "<button class=\"btn btn-xs sample_manage\" title=\"抽样会员管理\"><i class=\"glyphicon glyphicon-list\"></i></button>",
                                d = "<button class=\"btn btn-xs update_btn\" title=\"修改\"><i class=\"glyphicon glyphicon-edit\"></i></button>";
                            //e = "<button class=\"btn btn-xs check_btn\" title=\"修改数据\">查看</button>";
                            //d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
                            return a + b + c + d

                        }
                        ,class: 'control'
                        ,events : self.eventHandler
                    }],
                    responseHandler: function(data){
                        let list = data[0].result,
                            len = list.length,
                            i;
                        data.total = data[0].total;
                        data.rows = [];


                        for (i = 0; i < len; i++){
                            data.rows.push({
                                id: list[i].kId,
                                project_number: list[i].kNumber,
                                project_title: list[i].kTheme,
                                project_manager: list[i].staName,
                                project_status: list[i].kStatus,
                                start_time: (list[i].kReleaseTime.year + 1900) + '-' + (list[i].kReleaseTime.month + 1) + '-' + list[i].kReleaseTime.date,
                                end_time: (list[i].kEndTime.year + 1900) + '-' + (list[i].kEndTime.month + 1) + '-' + list[i].kEndTime.date,
                                data_feature: list[i].kAttribute,
                                project_premium: list[i].kProjectIncentive,
                                bonus_premium: list[i].kIntegralIncentives,
                                respondent: list[i].kRespondents,
                                sample: list[i].kSampleSize,
                                recruit: list[i].kRecruitmentNumber,
                                complete_number: list[i].kCompleteNumber,
                                remark: list[i].kRemark
                            });
                        }
                        $('#tools').find('.numbers').html(`共查询到数据<span style="font-size: 14px;color: #f00;;">` + data.total + `</span>条`);

                        return data;
                    }
                });
            $("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
                .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                    var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                    self.examine(e.type,datas);                              // 保存到全局 Array() 里
                });
        },
        changeCommonField: function(i,t){
            $(t).prop('checked') ? this.common_checked.push(i) : this.common_checked.splice(this.common_checked.indexOf(i),1)
        },
        changeConfidentialField: function(f,t){
            $(t).prop('checked') ? this.confidential_checked.push(f) : this.confidential_checked.splice(this.confidential_checked.indexOf(f),1)
        },
        toSetExport: function(e){
            if (!this.status.checked_id.length){
                e.preventDefault();
                e.stopPropagation();
                let warning = $(`<div class="email-warning" style="position: fixed;
                									left:`+ ($(window).width()/2-25 + 'px') +`;
                									top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            请先选择要导出的数据
                        </div>`);
                $('#root').append(warning);
                warning.fadeIn();
                //alert('请先选择要导出的数据');
                return false
            } else if (this.status.checked_id.length > 1000){
                e.preventDefault();
                e.stopPropagation();
                let warning = $(`<div class="email-warning" style="position: fixed;
                									left:`+ ($(window).width()/2-25 + 'px') +`;
                									top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            最多选择1000条数据
                        </div>`);
                $('#root').append(warning);
                warning.fadeIn();
                //alert('最多选择1000条数据');
                return false
            }
            $('#export_real').click();
        },
        exportApply: function(){
            let columns = /*$('#result').bootstrapTable('getOptions').columns[0]*/this.common_checked.concat(this.confidential_checked),
                len = columns.length,
            //checked = [],
                to_send = {};
            //for (let i = 0; i < len; i++){
            //    columns[i].visible && checked.push(columns[i].field)
            //}
            if (len > 20){
                e.preventDefault();
                e.stopPropagation();
                let warning = $(`<div class="email-warning" style="position: fixed;
                									left:`+ ($(window).width()/2-25 + 'px') +`;
                									top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            最多选择20个字段导出
                        </div>`);
                $('#root').append(warning);
                warning.fadeIn();
                //alert('最多选择20个字段导出。');
                return false
            }

            to_send.derApplicant = JSON.parse(sessionStorage.getItem('sysUser')).email;
            to_send.userName = JSON.parse(sessionStorage.getItem('sysUser')).userName;
            to_send.derField = columns.join(',');
            to_send.derDocId = this.status.checked_id.join(',');
            to_send.derReviewer = 'Zero.Liu@jfcmc.com';//---------------------------------------------------------------暂定固定刘欢邮箱

            if (this.confidential_checked.length){
                $.ajax({
                    url : realPath + "/doctor/derivedInseart",
                    type : "post",
                    dataType : "json",
                    async : true,
                    //crossDomain : true,
                    data : JSON.stringify(to_send),
                    contentType : "application/JSON;charset=utf-8",
                    success : function(data) {
                        console.log(data);
                    }
                });
            } else {
                $.ajax({
                    url : realPath + "/doctor/derivedExportExamine",
                    type : "post",
                    dataType : "json",
                    async : true,
                    //crossDomain : true,
                    data : JSON.stringify(to_send),
                    contentType : "application/JSON;charset=utf-8",
                    success : function(data) {
                        window.open(realPath + data[0].result);
                    }
                });
            }
        },
        examine: function examine(type,datas){
            let self = this;
            if(type.indexOf('uncheck')==-1){
                for (let i = 0; i < datas.length; i++){
                    self.status.checked_row.indexOf(datas[i]) === -1 &&
                    self.status.checked_row.push(datas[i]), self.status.checked_id.push(datas[i].id)
                }
                //$.each(datas,function(i,v){
                //    // 添加时，判断一行或多行的 id 是否已经在数组里 不存则添加　
                //    self.status.checked_row.indexOf(v.id) == -1 ? self.status.checked_row.push(v.id) : -1;
                //});
            }else{
                for (let i = 0; i < datas.length; i++){
                    self.status.checked_id.splice(self.status.checked_id.indexOf(datas[i].id),1);
                    for (let j = 0; j < self.status.checked_row.length; j++){
                        self.status.checked_row[j].id === datas[i].id && self.status.checked_row.splice(j,1)
                    }
                }
                //$.each(datas,function(i,v){
                //    self.status.checked_row.splice(self.status.checked_row.indexOf(v.id),1);    //删除取消选中行
                //});
            }
        }
    };
    const mounted = function(){

        let self = this;

        $("#result").on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
            var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
            self.examine(e.type,datas);                              // 保存到全局 Array() 里
        });

        //this.tableInit(realPath + '');
        this.query();
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        mounted: mounted
    });
});