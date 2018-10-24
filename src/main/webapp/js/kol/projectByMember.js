/**
 * Created by wangxiangyang on 2018/5/23.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
    const data = {};
    const methods = {
        query: function(){
            let self = this;
            this.queryParams = function(){

                return {
                    docId: sessionStorage.getItem('query_samId')
                }
            };
            this.tableInit(realPath + '/management/projectInquiry')
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
                    sortable: false,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: self.queryParams,// 传递参数（*）
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
                        field: 'id',
                        title: 'Id'
                        ,class: 'id'
                    },{
                        field: 'project_number',
                        title: '项目编号'
                        ,class: 'project_number'
                    },{
                        field: 'project_title',
                        title: '项目主题'
                        ,class: 'project_title'
                    },{
                        field: 'project_manager',
                        title: '项目经理'
                        ,class: 'project_manager'
                    },{
                        field: 'project_status',
                        title: '项目状态'
                        ,class: 'project_status'
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
                        class: 'respondent'
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
                    }],
                    responseHandler: function(d){
                        let list = d[0].result,
                            len = list.length,
                            i,
                            rows = [];


                        for (i = 0; i < len; i++){
                            rows.push({
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
                        return rows;
                    }
                });
        }
    };
    const mounted = function(){
        this.query();
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        mounted: mounted
    });
});