/**
 *
 * Created by wangxiangyang on 2018/5/17.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const data = {
    status: {
        checked_row: [],
        checked_id: []
    },
    granting: [],
    premium_cash: '',
    premium_bonus: '',
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
            checkbox: true,
            formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                return {
                    checked : self.status.checked_id.indexOf(row.id) > -1
                }
            }
        },{
            field: 'samId',
            title: 'Id'
            ,class: 'id'
        },{
            field: 'docName',
            title: '姓名'
            ,class: 'name'
        },{
            field: 'hosProvince',
            title: '省份',
            class: 'th-province'
        },{
            field: 'hosCity',
            title: '城市',
            class: 'th-city'
        },{
            field: 'hosName',
            title: '单位名称'
            ,class: 'nameComp'
        },{
            field: 'hosLelId',
            title: '单位级别',
            class: 'level'
        },{
            field: 'belongId',
            title: '所在科室'
            ,class: 'department'
        },{
            field: 'admiName',//--------------
            title: '行政职称'
            ,class: 'title'
        },{
            field: 'completed',//--------------
            title: '完成状态',
            class: 'completed'
        },{
            field: 'reasons',//--------------
            title: '原因记录',
            class: 'reasons'
        },{
            field: 'samEmail',
            title: '邮件次数',
            class: 'proClass'
        },{
            field: 'samWechat',
            title: '微信次数',
            class: 'depType'
        },{
            field: 'samMessage',
            title: '信息次数',
            class: 'depNature'
        },{
            field: 'counts',
            title: '参与项目',
            formatter : function(value, row, index) {
                return "<a class=\"participation-count\" title=\"参与项目\">"+ value +"</a>";
            },
            events : self.bootstrap_table.eventHandler,
            class: 'counts'
        },{
            field: 'samCash',
            title: '现金激励',
            editable: {
                type: 'text',
                title: '现金激励',
                validate: function (v) {
                    if (!v || !parseFloat(v)) return '不能为空';

                }
            },
            class: 'samCash'
        }, {
            field: 'samIntegration',
            title: '积分激励',
            editable: {
                type: 'text',
                title: '积分激励',
                validate: function (v) {
                    if (!v || !parseFloat(v)) return '不能为空';

                }
            },
            class: 'samCash'
        }]
    },
    handler_members: function(data){
        return data[0].result;
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
                responseHandler: self[handler],
                onEditableSave: function (field, row, oldValue, $el) {
                    $.ajax({
                        type: "post",
                        url: realPath + '/management/grant',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify({
                            sId: [row.samId],
                            samCash: row.samCash,
                            samIntegration: row.samIntegration
                        }),
                        dataType: 'JSON',
                        success: function (data, status) {
                            if (data[0].result > 0){
                                simpleAlert('发放完成');
                                location.reload()
                            } else {
                                simpleAlert('操作失败, 请重试');
                            }
                        },
                        error: function (e) {
                            console.log(e);
                            simpleAlert('操作失败, 请重试')
                        }
                    });
                }
            });
        $("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
            .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                self.examine(e.type,datas);                              // 保存到全局 Array() 里
            })
    },
    beforeGrant: function(){
        if (this.status.checked_id.length){
        	this.multiInputAlert.alert();
            this.granting = this.status.checked_id
        }
    },
    grantExecute: function(){

        $.ajax({
            type : "post",
            url : realPath + "/management/grant",
            dataType : "json",
            contentType : "application/JSON;charset=utf-8",
            data : JSON.stringify({
            	sId: this.granting,
                samCash: this.premium_cash,
                samIntegration: this.premium_bonus
            }),
            success : function(data) {
                if (data[0].result > 0){
                    simpleAlert('发放完成');
                    location.reload()
                } else {
                    simpleAlert('操作失败, 请重试');
                }
            },
            error: function(e){
                console.log(e);
                simpleAlert('操作失败, 请重试')
            }
        });
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
            kId: sessionStorage.getItem('premium_k_id')
        }
    };
    self.tableInit('result',realPath + '/management/memberInquiry','field_members','handler_members')
};
const beforeCreate = function(){
    this.multiInputAlert = new MultiInputAlert({
        title: '请输入激励数额',
        list: [{
            label: '现金激励',
            field: 'premium_cash'
        },{
            label: '积分激励',
            field: 'premium_bonus'
        }],
        confirm: 'grantExecute'
    })
};
const watch = {};
const vm = new Vue({
    el: '#root',
    data: data,
    methods: methods,
    beforeCreate: beforeCreate,
    mounted: mounted,
    watch: watch
});