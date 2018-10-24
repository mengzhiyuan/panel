/**
 * Created by wangxiangyang on 2018/5/24.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const data = {
    bootstrap_table: {
        eventHandler: {
            'click .participation-count': function(e, value, row, index){
                sessionStorage.setItem('query_samId', row.samDocId);
                document.location.href = './projectByMember.html'
            }
        }
    }
};
const methods = {
    field_members: function(){
        let self = this;
        return [{
            field: 'saId',
            title: '编号'
            ,class: 'id'
        },{
            field: 'saEmPerson',
            title: '抽样人员',
            class: 'sta-name'
        },
        //    {
        //    field: 'hosCity',
        //    title: '抽样类型',
        //    class: 'th-city'
        //},
            {
            field: 'saBatch',
            title: '批次'
            ,class: 'batch'
        },{
            field: 'saTime',
            title: '抽样时间',
            class: 'time'
        },{
            field: 'saName',
            title: '抽样名称'
            ,class: 'name'
        },{
            field: 'saCondition',//--------------
            title: '抽样条件'
            ,class: 'condition'
        },{
            field: 'saActualNumber',//--------------
            title: '抽样人数',
            class: 'number'
        },{
            field: 'samEmail',//--------------
            title: '邮件次数',
            class: 'email'
        },{
            field: 'samWechat',
            title: '微信次数',
            class: 'wechat'
        },{
            field: 'samMessage',
            title: '短信次数',
            class: 'message'
        },{
            field: 'count',
            title: '操作',
            formatter : function(value, row, index) {
                return "<a class=\"participation-count\" title=\"参与项目\">详细</a>";
            },
            events : self.bootstrap_table.eventHandler,
            class: 'count'
        }]
    },
    handler_members: function(data){

        let r = data[0].list;
        
        if (data[0].list.length){
            for (let i = 0; i < r.length; i++){
                let t = r[i].saTime;
                t = (t.year + 1900) + '-' + (t.month + 1) + '-' + t.date;
                r[i].saTime = t
            }

            return r;
        } else {
            simpleAlert('没有记录', '#ff5400')
        }
    },

    queryParams: function(){},
    tableInit: function(el,url,field,handler){
        let self = this;
        $("#"+el).bootstrapTable('destroy')
            .bootstrapTable({
                url: url,         // 请求后台的URL（*）
                method: 'post',                      // 请求方式（*）
                toolbar: '#tools',                // 工具按钮用哪个容器
                striped: true,                      // 是否显示行间隔色
                cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: false,                   // 是否显示分页（*）
                sortable: false,                     // 是否启用排序
                sortOrder: "asc",                   // 排序方式
                queryParams: self.queryParams,// 传递参数（*）
                //sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                //pageNumber:1,                       // 初始化加载第一页，默认第一页
                //pageSize: 20,                       // 每页的记录行数（*）
                //pageList: [10, 20, 50, 100],        // 可供选择的每页的行数（*）
                search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: true,                  // 是否显示所有的列
                showRefresh: true,                  // 是否显示刷新按钮
                minimumCountColumns: 2,             // 最少允许的列数
                clickToSelect: true,                // 是否启用点击选中行
                //height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: 'kId',                     // 每一行的唯一标识，一般为主键列
                showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                    // 是否显示详细视图
                detailView: false,                   // 是否显示父子表
                columns: self[field](),
                responseHandler: self[handler]
            });
        $("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
            .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                self.examine(e.type,datas);                              // 保存到全局 Array() 里
            })
    },
    examine: function examine(type,datas){
        let self = this;
        if(type.indexOf('uncheck')==-1){
            for (let i = 0; i < datas.length; i++){
                self.status.checked_row.indexOf(datas[i]) === -1 &&
                self.status.checked_row.push(datas[i]), self.status.checked_id.push(datas[i].samId)
            }
            //$.each(datas,function(i,v){
            //    // 添加时，判断一行或多行的 id 是否已经在数组里 不存则添加　
            //    self.status.checked_row.indexOf(v.id) == -1 ? self.status.checked_row.push(v.id) : -1;
            //});
        }else{
            for (let i = 0; i < datas.length; i++){
                self.status.checked_id.splice(self.status.checked_id.indexOf(datas[i].samId),1);
                for (let j = 0; j < self.status.checked_row.length; j++){
                    self.status.checked_row[j].samId === datas[i].samId && self.status.checked_row.splice(j,1)
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
    self.queryParams = function(){
        return {
            project: sessionStorage.getItem('project_id')
        }
    };
    self.tableInit('result',realPath + '/management/sampInit','field_members','handler_members')
};
const beforeCreate = function(){};
const watch = {};
const vm = new Vue({
    el: '#root',
    data: data,
    methods: methods,
    beforeCreate: beforeCreate,
    mounted: mounted,
    watch: watch
});