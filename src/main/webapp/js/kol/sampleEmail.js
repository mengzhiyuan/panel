/**
 * Created by wangxiangyang on 2018/5/25.
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
        checked_samId: [],
        link_type: '',
        link_address: '',
        sender_email: '',
        email_title: '',
        email_container: null
    },
    bootstrap_table: {
        eventHandler: {
            'click': function(e, value, row, index){

            }
        }
    }
};
const methods = {
    sendEmail: function (){

        let list = [];
        for (let i = 0; i < this.status.checked_row.length; i++){
            if (this.status.checked_row[i].docEmail.length > 0){
                list.push({
                    samId: this.status.checked_row[i].samId,
                    email: this.status.checked_row[i].docEmail
                })
            }
        }

        if (!list.length) {
            simpleAlert('选中的会员尚未录入邮箱信息', '#f56c6c');
            return
        } else if (this.status.email_container.getContent() === ''){
            simpleAlert('请输入邮件内容', '#f56c6c');
            return
        } else if (this.status.link_type === '') {
            simpleAlert('请选择链接类型', '#f56c6c');
            return
        } else if (this.status.link_address === '') {
            simpleAlert('请输入链接地址', '#f56c6c');
            return
        }

        $.ajax({
            url: realPath + '/management/batchLink',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                addPerson: JSON.parse(sessionStorage.getItem('sysUser')).userName,
                addType: this.status.link_type,
                linkAddress: this.status.link_address,
                list: list,
                email: this.status.sender_email,
                emailTitle: this.status.email_title,
                emailContent: this.status.email_container.getContent()
            }),
            success: function(d){
                if (d[0].result > 0){
                    simpleAlert('发送成功', '00db00');
                    document.location.href = './sampling.html'
                } else {
                    simpleAlert('发送失败', '#f56c6c')
                }
            },
            error: function(e){
                console.log(e);
                simpleAlert('发送失败', '#f56c6c')
            }
        })
    },
    field_members: function(){
        let self = this;
        return [{
            checkbox: true,
            formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                return {
                    checked : self.status.checked_samId.indexOf(row.id) > -1
                }
            }
        },{
            field: 'samId',
            title: '会员名称'
            ,class: 'samId'
        },{
            field: 'docName',
            title: '姓名',
            class: 'docName'
        },{
            field: 'docPhone1',//--------------
            title: '手机号码',
            class: 'docPhone1'
        },{
            field: 'docEmail',
            title: '邮箱地址',
            class: 'docEmail'
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
    query: function(){
        this.tableInit('result',realPath + '/management/batchNumberSearch','field_members','handler_members')
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
                height: 500,                       // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: 'kId',                     // 每一行的唯一标识，一般为主键列
                showToggle:true,                     // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                     // 是否显示详细视图
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
                self.status.checked_row.push(datas[i]), self.status.checked_samId.push(datas[i].samId)
            }
            //$.each(datas,function(i,v){
            //    // 添加时，判断一行或多行的 id 是否已经在数组里 不存则添加　
            //    self.status.checked_row.indexOf(v.id) == -1 ? self.status.checked_row.push(v.id) : -1;
            //});
        }else{
            for (let i = 0; i < datas.length; i++){
                self.status.checked_samId.splice(self.status.checked_samId.indexOf(datas[i].samId),1);
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

    try {
        self.status.email_container = UE.getEditor('email_container',{
            zIndex: 1060
        });
    } catch (e) {}

    self.queryParams = function(){
        return {
            saId: sessionStorage.getItem('batch_id')
        }
    };
    self.status.sender_email = JSON.parse(sessionStorage.getItem('sysUser')).email;
    self.query()
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