/**
 * Created by wangxiangyang on 2018/5/25.
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
        member_fields: [],
        member_data: [],
        k_id: '',
        complete: ''
        //,email_address: [],
        //email_title: '',
        //email_container: null
    };
    const methods = {
        eventHandler: function(){
            let self = this;
            return {
                //'click .progress_btn': function(e, value, row, index){
                //    sessionStorage.setItem('progress_k_id', row.id);
                //    //sessionStorage.setItem('detailStatus','consult');
                //    document.location.href = './projectProgress.html'
                //},
                'click .member': function(e, value, row, index){
                    $.ajax({
                        url: realPath + '/doctor/updateEcho',
                        type: 'post',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        async: true,
                        data: JSON.stringify({
                            docId: [row.samDocId]
                        }),
                        success: function(d){
                            if (d[0].doctor[0]){
                                let result = d[0].doctor[0];
                                self.member_data = [{
                                    name: result.docName,
                                    province: result['hospital'].hosProvince,
                                    city: result['hospital'].hosCity,
                                    title_level: result.levId,
                                    department: result.belongId,
                                    organization: result['hospital'].hosName,
                                    organization_level: result['hospital'].hoslelId,
                                    cellphone: result.docPhone1,
                                    email: result.docEmail
                                }];
                                self.member_fields = [{
                                    key: 'name',
                                    value: '会员名称'
                                },{
                                    key: 'province',
                                    value: '省份'
                                },{
                                    key: 'city',
                                    value: '城市'
                                },{
                                    key: 'title_level',
                                    value: '职称级别'
                                },{
                                    key: 'department',
                                    value: '所在科室'
                                },{
                                    key: 'organization',
                                    value: '单位名称'
                                },{
                                    key: 'organization_level',
                                    value: '单位级别'
                                },{
                                    key: 'cellphone',
                                    value: '手机'
                                },{
                                    key: 'email',
                                    value: '邮箱'
                                }];
                                self.alert.tableAlert()
                            } else {
                                simpleAlert('请求失败','#f56c6c')
                            }
                        },
                        error: function(e){
                            simpleAlert('请求失败','#f56c6c')
                        }
                    })
                }
            }
        },
        query: function(){
            let self = this;
            self.k_id = sessionStorage.getItem('project_id');
            this.queryParams = function(){
                return {
                    kId: self.k_id,
                    addStatus: self.complete
                }
            };
            this.tableInit(realPath + '/management/externalLinksSearch')
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
                    pagination: false,                   // 是否显示分页（*）
                    sortable: false,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: self.queryParams,// 传递参数（*）
                    //sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                    //pageNumber:1,                       // 初始化加载第一页，默认第一页
                    //pageSize: 20,                       // 每页的记录行数（*）
                    //pageList: [10, 20, 50, 100],        // 可供选择的每页的行数（*）
                    //search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
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
                    columns: [
                    //    {
                    //    checkbox: true,
                    //    formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                    //        return {
                    //            checked : self.status.checked_id.indexOf(row.id) > -1
                    //        }
                    //    }
                    //},
                        {
                        field: 'kNumber',
                        title: '项目ID'
                        ,class: 'kNumber'
                    },{
                        field: 'addStatus',
                        title: '完成状态',
                        editable: {
                            type: 'select',
                            title: '完成状态',
                            source:[
                                {value:"s",text:"甄别状态"},
                                {value:"q",text:"超配额状态"},
                                {value:"c",text:"完成状态"}
                            ]
                        }
                    },{
                        field: 'addAddress',
                        title: '链接内容'
                        ,class: 'addAddress'
                    },{
                        field: 'addType',
                        title: '类型'
                        ,class: 'addType'
                    },{
                        field: 'samDocId',
                        title: '会员ID'
                        ,class: 'samDocId',
                        formatter : function(value, row, index) {
                            return "<a class=\"btn btn-xs member\" title=\"会员ID\">"+ value +"</a>"
                        }
                        ,events : self.eventHandler()
                    },{
                        field: 'addPerson',
                        title: '发送人员',
                        class: 'addPerson'
                    },{
                        field: 'addCreateTime',
                        title: '发送日期',
                        class: 'addCreateTime'
                    },{
                        field: 'addReplyTime',
                        title: '回复日期',
                        class: 'addReplyTime'
                    },{
                        field: 'addIp',
                        title: '回复地址IP'
                        ,class: 'addIp'
                    }],
                    responseHandler: function(data){
                        let list = data[0].result;
                        for (let i = 0; i < list.length; i++){
                            let c = list[i].addCreateTime,
                                r = list[i].addReplyTime;
                            list[i].addCreateTime = (c.year + 1900) + '-' + (c.month + 1) + '-' + c.date;
                            list[i].addReplyTime = r ? ((r.year + 1900) + '-' + (r.month + 1) + '-' + r.date) : ''
                        }
                        $('#tools').find('.numbers').html(`共查询到数据<span style="font-size: 14px;color: #f00;;">` + list.length + `</span>条`);

                        return list;
                    },
                    onEditableSave: function (field, row, oldValue, $el) {
                        $.ajax({
                            type: "post",
                            url: realPath + '/management/upadateAddstatus',
                            contentType: 'application/json;charset=utf-8',
                            data: JSON.stringify({
                                addId: row.addId,
                                addStatus: row.addStatus
                            }),
                            dataType: 'JSON',
                            success: function (data, status) {
                                var res = data[0]['result'];
                                if (res > 0) {
                                    $("#result").bootstrapTable('destroy');
                                    self.query();
                                    simpleAlert('修改信息成功','#00db00');
                                } else {
                                    simpleAlert('修改信息失败,请重试', '#f56c6c')
                                }
                            },
                            error: function (e) {
                                console.log(e);
                                simpleAlert('修改信息失败,请稍后重试', '#f56c6c')
                            }
                        });
                    }
                });
            //$("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
            //    .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
            //        var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
            //        self.examine(e.type,datas);                              // 保存到全局 Array() 里
            //    });
        }
        //,toSetExport: function(e){
        //    if (!this.status.checked_id.length){
        //        e.preventDefault();
        //        e.stopPropagation();
        //        let warning = $(`<div class="email-warning" style="position: fixed;
        //        									left:`+ ($(window).width()/2-25 + 'px') +`;
        //        									top:`+ ($(window).height()/2-120 + 'px') +`;
        //                                            display: none;
        //                                            width: 240px;
        //                                            height: 50px;
        //                                            line-height: 50px;
        //                                            background-color: #fff;
        //                                            /*border: 1px solid #999;*/
        //                                            -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
        //                                            -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
        //                                            color: #f56c6c;
        //                                            font-size: 14px;
        //                                            text-align: center;
        //                                            z-index: 1999;">
        //                    请先选择要导出的数据
        //                </div>`);
        //        $('#root').append(warning);
        //        warning.fadeIn();
        //        //alert('请先选择要导出的数据');
        //        return false
        //    } else if (this.status.checked_id.length > 1000){
        //        e.preventDefault();
        //        e.stopPropagation();
        //        let warning = $(`<div class="email-warning" style="position: fixed;
        //        									left:`+ ($(window).width()/2-25 + 'px') +`;
        //        									top:`+ ($(window).height()/2-120 + 'px') +`;
        //                                            display: none;
        //                                            width: 240px;
        //                                            height: 50px;
        //                                            line-height: 50px;
        //                                            background-color: #fff;
        //                                            /*border: 1px solid #999;*/
        //                                            -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
        //                                            -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
        //                                            color: #f56c6c;
        //                                            font-size: 14px;
        //                                            text-align: center;
        //                                            z-index: 1999;">
        //                    最多选择1000条数据
        //                </div>`);
        //        $('#root').append(warning);
        //        warning.fadeIn();
        //        //alert('最多选择1000条数据');
        //        return false
        //    }
        //    $('#export_real').click();
        //},
        //exportApply: function(){
        //    let columns = /*$('#result').bootstrapTable('getOptions').columns[0]*/this.common_checked.concat(this.confidential_checked),
        //        len = columns.length,
        //    //checked = [],
        //        to_send = {};
        //    //for (let i = 0; i < len; i++){
        //    //    columns[i].visible && checked.push(columns[i].field)
        //    //}
        //    if (len > 20){
        //        e.preventDefault();
        //        e.stopPropagation();
        //        let warning = $(`<div class="email-warning" style="position: fixed;
        //        									left:`+ ($(window).width()/2-25 + 'px') +`;
        //        									top:`+ ($(window).height()/2-120 + 'px') +`;
        //                                            display: none;
        //                                            width: 240px;
        //                                            height: 50px;
        //                                            line-height: 50px;
        //                                            background-color: #fff;
        //                                            /*border: 1px solid #999;*/
        //                                            -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
        //                                            -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
        //                                            color: #f56c6c;
        //                                            font-size: 14px;
        //                                            text-align: center;
        //                                            z-index: 1999;">
        //                    最多选择20个字段导出
        //                </div>`);
        //        $('#root').append(warning);
        //        warning.fadeIn();
        //        //alert('最多选择20个字段导出。');
        //        return false
        //    }
        //
        //    to_send.derApplicant = JSON.parse(sessionStorage.getItem('sysUser')).email;
        //    to_send.userName = JSON.parse(sessionStorage.getItem('sysUser')).userName;
        //    to_send.derField = columns.join(',');
        //    to_send.derDocId = this.status.checked_id.join(',');
        //    to_send.derReviewer = 'Zero.Liu@jfcmc.com';//---------------------------------------------------------------暂定固定刘欢邮箱
        //
        //    if (this.confidential_checked.length){
        //        $.ajax({
        //            url : realPath + "/doctor/derivedInseart",
        //            type : "post",
        //            dataType : "json",
        //            async : true,
        //            //crossDomain : true,
        //            data : JSON.stringify(to_send),
        //            contentType : "application/JSON;charset=utf-8",
        //            success : function(data) {
        //                console.log(data);
        //            }
        //        });
        //    } else {
        //        $.ajax({
        //            url : realPath + "/doctor/derivedExportExamine",
        //            type : "post",
        //            dataType : "json",
        //            async : true,
        //            //crossDomain : true,
        //            data : JSON.stringify(to_send),
        //            contentType : "application/JSON;charset=utf-8",
        //            success : function(data) {
        //                window.open(realPath + data[0].result);
        //            }
        //        });
        //    }
        //}
    };
    const beforeCreate = function(){
        this.alert = new TableAlert({
            title: '会员名称',
            fields: 'member_fields',
            data: 'member_data'
        })
    };
    const mounted = function(){

        let self = this;

        self.query();

        //this.query();
        //$("#result").on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
        //    var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
        //    self.examine(e.type,datas);                              // 保存到全局 Array() 里
        //});

        //try {
        //    $.ajax({
        //        url: realPath + '',
        //        type: 'post',
        //        contentType: 'application/json;charset=utf-8',
        //        dataType: 'json',
        //        async: true,
        //        success: function(d){
        //
        //        },
        //        error: function(error){
        //
        //        }
        //    })
        //} catch (e) {}

        //laydate.render({
        //    elem: '#launch_time',
        //    type: 'date',
        //    istime: true,
        //    done: function(value, date){
        //        self.param.launch_time = value;
        //        //console.log(value);
        //        //console.log(date);
        //    }
        //});
        //this.tableInit(realPath + '');

        //try {
        //    this.email_container = UE.getEditor('email_container',{
        //        zIndex: 1060
        //    });
        //} catch (e) {}
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        beforeCreate: beforeCreate,
        mounted: mounted
    });
});