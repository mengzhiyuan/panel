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
            title: '批次号'
            ,class: 'saId'
        },{
            field: 'samDocId',
            title: '会员名称'
            ,class: 'saId'
        },{
            field: 'docName',
            title: '姓名',
            class: 'docName'
        },{
            field: 'hosProvince',
            title: '省份'
            ,class: 'hosProvince'
        },{
            field: 'hosCity',
            title: '城市',
            class: 'hosCity'
        },{
            field: 'hosName',
            title: '所在单位'
            ,class: 'hosName'
        },{
            field: 'hosLelId',//--------------
            title: '单位级别'
            ,class: 'hosLelId'
        },{
            field: 'belongId',//--------------
            title: '部门',
            class: 'belongId'
        },{
            field: 'admiName',//--------------
            title: '职称',
            class: 'admiName'

        },{
            field: 'staCompletion',//--------------
            title: '完成状态',
            class: 'staCompletion'
        },{
            field: 'reasons',
            title: '原因记录',
            class: 'reasons'
        },{
            field: 'samEmail',
            title: '邮件次数',
            class: 'samEmail'
        },{
            field: 'samWechat',
            title: '微信次数',
            class: 'samWechat'
        },{
            field: 'samMessage',
            title: '短信次数',
            class: 'samMessage'
        },{
            field: 'counts',
            title: '参与项目',
            formatter : function(value, row, index) {
                return "<a class=\"participation-count\" title=\"参与项目\">"+ value +"</a>";
            },
            events : self.bootstrap_table.eventHandler,
            class: 'counts'
        },{
            field: 'remark',
            title: '备注',
            class: 'remark'
        },{
            field: 'samPhone',
            title: '操作',
            editable: {
                type: 'select',
                title: '通话状态',
                source:[
                    {value:"同意",text:"同意"},
                    {value:"拒绝",text:"拒绝"},
                    {value:"未联系上",text:"未联系上"},
                    {value:"非本人",text:"非本人"},
                    {value:"须再次联系",text:"须再次联系"},
                    {value:"号码错误/停机/空号",text:"号码错误/停机/空号"},
                    {value:"符合条件",text:"符合条件"},
                    {value:"愿意推荐",text:"愿意推荐"},
                    {value:"其他",text:"其他"}
                ]
            }
        }]
    },
    handler_members: function(data){

        if (data[0].result.length){

            let r = data[0].result;

            //for (let i = 0; i < r.length; i++){
            //    let t = r[i].saTime;
            //    t = (t.year + 1900) + '-' + (t.month + 1) + '-' + t.date;
            //    r[i].saTime = t
            //}
            return r;
        } else {
            simpleAlert('没有记录', '#ff5400')
        }
    },
    query: function(v){
        let sample_manage_id = sessionStorage.getItem('sample_manage_id');
        if (v){
            this.queryParams = function(){
                return {
                    kId: sample_manage_id,
                    saId: $('#project_number').val(),
                    hosProvince: $('#province').val(),
                    hosCity: $('#city').val(),
                    contact_number: $('#contact_number').val(),
                    contact_type: $('#contact_type').val(),
                    status: $('#status').val(),
                    hosLelId: $('#unit_level').val(),
                    belongId: $('#department').val(),
                    admiName: $('#title').val()
                }
            }
        } else {
        	this.queryParams = function(){
                return {
                    kId: sample_manage_id
                }
            }
        }
        this.tableInit('result',realPath + '/management/memberInquiry','field_members','handler_members')
    },
    queryParams: function(){},
    tableInit: function(el,url,field,handler){
        let self = this;
        $("#"+el).bootstrapTable('destroy')
            .bootstrapTable({
                url: url,                            // 请求后台的URL（*）
                method: 'post',                      // 请求方式（*）
                toolbar: '#tools',                   // 工具按钮用哪个容器
                striped: true,                       // 是否显示行间隔色
                cache: false,                        // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: false,                   // 是否显示分页（*）
                sortable: false,                     // 是否启用排序
                sortOrder: "asc",                    // 排序方式
                queryParams: self.queryParams,// 传递参数（*）
                //sidePagination: "server",          // 分页方式：client客户端分页，server服务端分页（*）
                //pageNumber:1,                      // 初始化加载第一页，默认第一页
                //pageSize: 20,                      // 每页的记录行数（*）
                //pageList: [10, 20, 50, 100],       // 可供选择的每页的行数（*）
                search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: true,                   // 是否显示所有的列
                showRefresh: true,                   // 是否显示刷新按钮
                minimumCountColumns: 2,              // 最少允许的列数
                clickToSelect: true,                 // 是否启用点击选中行
                //height: 500,                       // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: 'kId',                     // 每一行的唯一标识，一般为主键列
                showToggle:true,                     // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                     // 是否显示详细视图
                detailView: false,                   // 是否显示父子表
                columns: self[field](),
                responseHandler: self[handler],
                onEditableSave: function (field, row, oldValue, $el) {
                    $.ajax({
                        type: "post",
                        url: realPath + '/management/callRecord',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify({
                            samId: row.samId,
                            samPhone: row.samPhone
                        }),
                        dataType: 'JSON',
                        success: function (data) {
                            if (data[0].result > 0){
                                simpleAlert('修改完成');
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
    self.query(false)
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