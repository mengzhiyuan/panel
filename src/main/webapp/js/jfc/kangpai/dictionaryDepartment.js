/**
 * Created by wangxiangyang on 2017/7/5.
 */
 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){

    function initWeb() {

        var TableInit = function () {
            var oTableInit = {};

            //列表项删除
            function deleteItem(row) {
                var to_send = {
                    categId: row.id
                };
                $.ajax({
                    url: realPath + '/dictionary/deleteDepartment',//路径待更正
                    type: 'post',
                    dataType: 'json',
                    async: true,
                    contentType: 'application/JSON;charset=utf-8',
                    data: JSON.stringify(to_send),
                    success: function (data) {
                        var res = data[0]['result'];
                        if (res > 0) {
                            $("#list").bootstrapTable('destroy');
                            oTable.Init();
                            alert('删除信息成功');
                        } else {
                            alert('删除信息失败,请重试')
                        }
                    },
                    error: function (d1, d2, d3) {
                        console.log(d1);
                        console.log(d2);
                        console.log(d3);
                        alert('删除信息失败,请稍后重试')
                    }
                })
            }

            function displaySublist(row){

                var row_id = row['id'],
                    row_name = row['name'],
                    sublist = row['belongedList'],
                    sub_list = $('#sublist_list'),
                    node = $('<tbody></tbody>'),
                    len = sublist.length,
                    i;

                for (i = 0; i < len; i++){
                    node.append('<tr>' +
                            '<td class="belong_id">'+ sublist[i].belongId +'：</td>' +
                            '<td class="belong_name">'+ sublist[i].belongName +'</td>' +
                            '<td>' +
                                '<button class="btn btn-xs btn-default belong_update">修改</button>' +
                                '<button class="btn btn-xs btn-default belong_delete">删除</button>' +
                            '</td>' +
                        '</tr>')
                }
                sub_list.html('').append(node);
                $('#sublist_title').text(row_name);

                $('#sublist').off('click').on('click', '.sub-add', function(event){

                    var mask = $(`<div class="mask-add"></div>`),
                        frame = $(`<div class="forms">
                                   <div class="row">
                                       <input type="text" class="form-control add_value">
                                   </div>
                                   <div class="row">
                                       <button class="btn btn-sm btn-warning add_cancel"">取消</button>
                                       <button class="btn btn-sm btn-success add_save">保存</button>
                                   </div>
                               </div>`);

                    mask.append(frame);
                    $('#sublist').append(mask);

                    frame.on('click', '.add_cancel', addCancel)
                        .on('click', '.add_save', addSave);

                    function addSave() {
                        var to_send = {
                                categId: row_id,
                                belongName: frame.find('.add_value').val()
                            };

                        $.ajax({
                            url: realPath + '/dictionary/insertSubDepartment',
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/JSON;charset',
                            data: JSON.stringify(to_send),
                            async: true,
                            success: function (data) {
                                var res = data[0]['result'];
                                if (res > 0) {
                                    mask.remove();
                                    $("#list").bootstrapTable('destroy');
                                    oTable.Init();
                                    alert('添加信息成功');
                                } else {
                                    alert('添加信息失败,请重试')
                                }
                            },
                            error: function (e) {
                                console.log(e);
                                mask.remove();
                                alert('添加信息失败,请稍后重试')
                            }
                        })
                    }

                    function addCancel() {

                        mask.remove();
                    }
                });

                node.off('click').on('click', '.belong_update', function(event){

                    var update_id = $(event.currentTarget).parents('tr').find('.belong_id').text(),
                        mask = $(`<div class="mask-add"></div>`),
                        frame = $(`<div class="forms">
                                   <div class="row">
                                       <input type="text" class="form-control update_value">
                                   </div>
                                   <div class="row">
                                       <button class="btn btn-sm btn-warning update_cancel"">取消</button>
                                       <button class="btn btn-sm btn-success update_save">保存</button>
                                   </div>
                               </div>`);

                    frame.find('.update_value')
                        .val($(event.currentTarget).parents('tr').find('.belong_name').text());
                    mask.append(frame);
                    $('#sublist').append(mask);

                    frame.on('click', '.update_cancel', updateCancel)
                        .on('click', '.update_save', updateSave);

                    function updateSave() {
                        var to_send = {
                                belongId: update_id,
                                belongName: frame.find('.update_value').val()
                            };

                        $.ajax({
                            url: realPath + '/dictionary/updateSubDepartment',
                            type: 'post',
                            dataType: 'json',
                            contentType: 'application/JSON;charset',
                            data: JSON.stringify(to_send),
                            async: true,
                            success: function (data) {
                                var res = data[0]['result'];
                                if (res > 0) {
                                    node.find('tr').each(function(){
                                        if ($(this).find('.belong_id') == update_id){
                                            $(this).find('.belong_name').text(frame.find('.update_value').val())
                                        }
                                    });
                                    mask.remove();
                                    $("#list").bootstrapTable('destroy');
                                    oTable.Init();
                                    alert('修改信息成功');
                                } else {
                                    alert('修改信息失败,请重试')
                                }
                            },
                            error: function (e) {
                                console.log(e);
                                mask.remove();
                                alert('修改信息失败,请稍后重试')
                            }
                        })
                    }

                    function updateCancel() {

                        mask.remove();
                    }
                })
                    .on('click', '.belong_delete', function(event){

                        var to_send = {
                            belongId: $(event.currentTarget).parents('tr').find('.belong_id').text()
                        };
                        $.ajax({
                            url: realPath + '/dictionary/deleteSubDepartment',//路径待更正
                            type: 'post',
                            dataType: 'json',
                            async: true,
                            contentType: 'application/JSON;charset=utf-8',
                            data: JSON.stringify(to_send),
                            success: function(data){
                                var res = data[0]['result'];
                                if (res > 0){
                                    node.find('tr').each(function(){
                                        if ($(this).find('.belong_id') == to_send.belongId){
                                            $(this).remove()
                                        }
                                    });
                                    alert('删除信息成功');
                                } else {
                                    alert('删除信息失败,请重试');
                                }
                            },
                            error: function(d1,d2,d3){
                                console.log(d1);
                                console.log(d2);
                                console.log(d3);
                                alert('删除信息失败,请稍后重试')
                            }
                        })
                    })
            }

            window.operateEvents = {
                'click .sub_btn': function(e, value, row, index){
                    displaySublist(row)
                },
                'click .delete_btn': function (e, value, row, index) {
                    deleteItem(row)
                }
            };

            // 初始化Table
            oTableInit.Init = function () {
                $('#list').bootstrapTable({
                    url: realPath + '/dictionary/departmentSearch',         // 请求后台的URL（*）
                    method: 'post',                      // 请求方式（*）
                    toolbar: '#tools',                // 工具按钮用哪个容器
                    striped: true,                      // 是否显示行间隔色
                    cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   // 是否显示分页（*）
                    sortable: false,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: oTableInit.queryParams,// 传递参数（*）
                    sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                       // 初始化加载第一页，默认第一页
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
                    showToggle: true,                    // 是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    // 是否显示详细视图
                    detailView: false,                   // 是否显示父子表
                    columns: [{
                        checkbox: false
                    }, {
                        field: 'id',
                        title: 'Id'
                    }, {
                        field: 'name',
                        title: '名称',
                        editable: {
                            type: 'text',
                            title: '名称',
                            validate: function (v) {
                                if (!v) return '不能为空';

                            }
                        }
                    }, {
                        field: 'control',
                        title: '操作',
                        formatter: function (value, row, index) {
                            var delete_btn = "<button class=\"btn btn-xs btn-danger delete_btn\" title=\"删除数据\"><i class=\"glyphicon glyphicon-trash\"></i></button>",
                                sub_btn = "<button class=\"btn btn-xs btn-default sub_btn\" data-toggle=\"modal\" data-target=\"#sublist\" title=\"子列表\"><i class=\"glyphicon glyphicon-list\"></i></button>"
                            return delete_btn + sub_btn
                        },
                        events: operateEvents
                    }],
                    onEditableSave: function (field, row, oldValue, $el) {
                        $.ajax({
                            type: "post",
                            url: realPath + '/dictionary/updateDepartment',
                            contentType: 'application/json;charset=utf-8',
                            data: JSON.stringify({
                                categId: parseInt(row.id),
                                categName: row.name
                            }),
                            dataType: 'JSON',
                            success: function (data, status) {
                                var res = data[0]['result'];
                                if (res > 0) {
                                    $("#list").bootstrapTable('destroy');
                                    oTable.Init();
                                    alert('修改信息成功');
                                } else {
                                    alert('修改信息失败,请重试');
                                }
                            },
                            error: function (e) {
                                console.log(e);
                                alert('修改信息失败,请稍后重试');
                            }
                        });
                    },
                    responseHandler: function (data) {
                        var department = data[0]['department'],//键名待更正
                            len = department.length,
                            i;
                        data.total = 0;
                        data.rows = [];

                        for (i = 0; i < len; i++) {
                            data.rows.push({

                                'id': department[i].categId,
                                'name': department[i].categName,
                                'belongedList': department[i].belongedList
                            });
                            data.total += 1
                        }
                        return data;
                    }
                });
            };

            // 得到查询的参数
            oTableInit.queryParams = function () {
                return null;
            };
            return oTableInit;
        };


        var ButtonInit = function () {
            var oInit = {};
            var postdata = {};

            oInit.Init = function () {
                // 初始化页面上面的按钮事件
            };

            return oInit;
        };


        // 1.初始化Table
        var oTable = new TableInit();
        oTable.Init();

        // 2.初始化Button的点击事件
        var oButtonInit = new ButtonInit();
        oButtonInit.Init();

        $('#search').off('click').on('click', function () {
            $("#list").bootstrapTable('destroy');
            oTable.Init()
        });
        $('#add').off('click').on('click', function () {

            var mask = $(`<div class="mask-add"></div>`),
                frame = $(`<div class="forms">
                                   <div class="row">
                                       <input type="text" class="form-control add_value">
                                   </div>
                                   <div class="row">
                                       <button class="btn btn-sm btn-warning add_cancel"">取消</button>
                                       <button class="btn btn-sm btn-success add_save">保存</button>
                                   </div>
                               </div>`);

            mask.append(frame);
            $('body').append(mask);

            frame.on('click', '.add_cancel', addCancel)
                .on('click', '.add_save', addSave);

            function addSave() {
                var valueText = frame.find('.add_value').val(),
                    to_send = {
                        categName: valueText
                    };

                $.ajax({
                    url: realPath + '/dictionary/insertDepartment',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/JSON;charset',
                    data: JSON.stringify(to_send),
                    async: true,
                    success: function (data) {
                        var res = data[0]['result'];
                        if (res > 0) {
                            mask.remove();
                            $("#list").bootstrapTable('destroy');
                            oTable.Init();
                            alert('添加信息成功')
                        } else {
                            alert('添加信息失败,请重试')
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        mask.remove();
                        alert('添加信息失败,请稍后重试')
                    }
                })
            }

            function addCancel() {

                mask.remove();
            }
        })
    }

    initWeb();
















    /*

    var listData = {},
    	this_categId = '';

    //载入列表Ajax部分
    function listRequest(){
        $.ajax({
            url: realPath + '/dictionary/departmentSearch',//url待定
            type: 'post',
            dataType: 'json',
            async: true,
            success: function(data){
                listData = data[0]['department'];
                listDisplay(listData)
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
            }
        })
    }

    //载入列表渲染部分
    function listDisplay(data){
    	
    	$('#list').empty();
    	$('#subList').empty();

        var len = data.length,
            str = '',
            i;

        for (i = 0; i < len; i++){
            str += '<li class="items datas" dataId="' + data[i]["categId"] + '"><span class="itemValue">' + data[i]["categName"] + '</span><span class="btns"><span class="extra_btn edit_btn"></span><span class="extra_btn delete_btn"></span></span></li>';
        }
        str += '<li class="items addParent"><span class="add_btn"></span></li>';
        $("#list").html(str)
    }

//载入二级列表渲染部分
    function subListDisplay(event){

        var categId = $(this).attr('dataId'),
            subList = $('#subList'),
            str = '',
            len = listData.length,
            i;

        for (i = 0; i < len; i++){
            if (listData[i]['categId'] == categId){//键名待定
                var subArray = listData[i]['belongedList'];//键名待定
                len = subArray.length;
                this_categId = categId;
                break
            }
        }

        for (i = 0; i < len; i++){
            str += '<li class="items" dataId="' + subArray[i]["belongId"] + '"><span class="itemValue">' + subArray[i]["belongName"] + '</span><span class="btns"><span class="extra_btn edit_btn"></span><span class="extra_btn delete_btn"></span></span></li>';
        }
        str += '<li class="items addParent"><span class="add_btn"></span></li>';
        subList.html(str)
    }

    //list列表项删除
    function deleteItem(event){
    	event.stopPropagation();
        var to_send = {
        		categId: parseInt($(this).parent().parent().attr('dataId'))
        };
        $.ajax({
            url: realPath + '/dictionary/deleteDepartment',//路径待更正
            type: 'post',
            dataType: 'json',
            async: true,
            contentType: 'application/JSON;charset=utf-8',
            data: JSON.stringify(to_send),
            success: function(data){
                var res = data[0]['result'];
                if (res > 0){
                    var dialog_delete = new TipBox({type:'success',str:'删除信息成功',hasBtn:true});
                    $('.okoButton').one('click', listRequest)
                } else {
                    var dialog_delete = new TipBox({type: 'error', str: '删除信息失败,请重试',hasBtn:true});
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_delete = new TipBox({type: 'error', str: '删除信息失败,请稍后重试',hasBtn:true});
            }
        })
    }
    //subList列表项删除
    function deleteSubItem(event){
        var to_send = {
        		belongId: parseInt($(this).parent().parent().attr('dataId'))
        };
        $.ajax({
            url: realPath + '/dictionary/deleteSubDepartment',//路径待更正
            type: 'post',
            dataType: 'json',
            async: true,
            contentType: 'application/JSON;charset=utf-8',
            data: JSON.stringify(to_send),
            success: function(data){
                var res = data[0]['result'];
                if (res > 0){
                    var dialog_delete = new TipBox({type:'success',str:'添加信息成功',hasBtn:true});
                    $('.okoButton').one('click', listRequest)
                } else {
                    var dialog_delete = new TipBox({type: 'error', str: '添加信息失败,请重试',hasBtn:true});
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_delete = new TipBox({type: 'error', str: '添加信息失败,请稍后重试',hasBtn:true});
            }
        })
    }

    //list列表项修改
    function updateItem(event){
    	
    	event.stopPropagation();

        var self = $(this).parent().parent(),
            id = self.attr('dataId'),
            value = self.find('.itemValue'),
            btns = self.find('.btns'),
            valueText = value.text();

        value.empty().html('<input class="itemUpdate" value="' + valueText + '">');
        var btnsChildren = btns.find('*').remove();
        btns.html('<span class="save_btn"></span><span class="giveUp_btn"></span>');

        self.on('click', '.save_btn', function(event){
            var valueText = $(this).parent().parent().find('.itemUpdate').val(),
                to_send = {
            		categId: id,
                    categName: valueText
                };

            $.ajax({
                url: realPath + '/dictionary/updateDepartment',
                type: 'post',
                dataType: 'json',
                async: true,
                contentType: 'application/JSON;charset=utf-8',
                data: JSON.stringify(to_send),
                success: function(data){
                    var res = data[0]['result'];
                    if (res > 0){
                        var dialog_update = new TipBox({type:'success',str:'修改信息成功',hasBtn:true});
                        $('.okoButton').one('click', listRequest)
                    } else {
                        var dialog_update = new TipBox({type: 'error', str: '修改信息失败,请重试',hasBtn:true});
                    }
                },
                error: function(d1,d2,d3){
                    console.log(d1);
                    console.log(d2);
                    console.log(d3);
                    var dialog_update = new TipBox({type: 'error', str: '修改信息失败,请稍后重试',hasBtn:true});
                }
            })
        });
        self.one('click', '.giveUp_btn',function(event){
            value.empty().html(valueText);
            btns.empty().html(btnsChildren);
            self.off('click')
        })
    }

    //subList列表项修改
    function subUpdateItem(event){

        var self = $(this).parent().parent(),
            id = self.attr('dataId'),
            value = self.find('.itemValue'),
            btns = self.find('.btns'),
            valueText = value.text();

        value.empty().html('<input class="itemUpdate" value="' + valueText + '">');
        var btnsChildren = btns.find('*').remove();
        btns.html('<span class="save_btn"></span><span class="giveUp_btn"></span>');

        self.on('click', '.save_btn', function(event){
            var valueText = $(this).parent().parent().find('.itemUpdate').val(),
                to_send = {
            		belongId: id,
                    belongName: valueText
                };

            $.ajax({
                url: realPath + '/dictionary/updateSubDepartment',
                type: 'post',
                dataType: 'json',
                async: true,
                contentType: 'application/JSON;charset=utf-8',
                data: JSON.stringify(to_send),
                success: function(data){
                    var res = data[0]['result'];
                    if (res > 0){
                        var dialog_update = new TipBox({type:'success',str:'修改信息成功',hasBtn:true});
                        $('.okoButton').one('click', listRequest)
                    } else {
                        var dialog_update = new TipBox({type: 'error', str: '修改信息失败,请重试',hasBtn:true});
                    }
                },
                error: function(d1,d2,d3){
                    console.log(d1);
                    console.log(d2);
                    console.log(d3);
                    var dialog_update = new TipBox({type: 'error', str: '修改信息失败,请稍后重试',hasBtn:true});
                }
            })
        });
        self.one('click', '.giveUp_btn',function(event){
            value.empty().html(valueText);
            btns.empty().html(btnsChildren);
            self.off('click')
        })
    }

    //list添加项函数
    function addItem(){
        var self = $(this).parent();
        self.empty().html('<input class="itemAdd"><span class="save_btn"></span><span class="giveUp_btn"></span>');
        self.on('click', '.save_btn', addSave);
        self.one('click', '.giveUp_btn', addGiveUp)
    }
    //subList添加项函数
    function subAddItem(){
        var self = $(this).parent();
        self.empty().html('<input class="itemAdd"><span class="save_btn"></span><span class="giveUp_btn"></span>');
        self.on('click', '.save_btn', subAddSave);
        self.one('click', '.giveUp_btn', addGiveUp)
    }

    //list添加的提交部分
    function addSave(event){
        var self = $(this).parent(),
            valueText = self.find('.itemAdd').val(),
            to_send = {
        		categName: valueText
            };

        $.ajax({
            url: realPath + '/dictionary/insertDepartment',
            type: 'post',
            dataType: 'json',
            contentType: 'application/JSON;charset',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                var res = data[0]['result'];
                if (res > 0){
                    var dialog_add = new TipBox({type:'success',str:'添加信息成功',hasBtn:true});
                    $('.okoButton').one('click', listRequest)
                } else {
                    var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请重试',hasBtn:true});
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请稍后重试',hasBtn:true});
            }
        })
    }

    //subList添加的提交部分
    function subAddSave(event){
        var self = $(this).parent(),
            valueText = self.find('.itemAdd').val(),
            to_send = {
        		categId: this_categId,
        		belongName: valueText
            };

        $.ajax({
            url: realPath + '/dictionary/insertSubDepartment',
            type: 'post',
            dataType: 'json',
            contentType: 'application/JSON;charset',
            data: JSON.stringify(to_send),
            async: true,
            success: function(data){
                var res = data[0]['result'];
                if (res > 0){
                    var dialog_add = new TipBox({type:'success',str:'添加信息成功',hasBtn:true});
                    $('.okoButton').one('click', listRequest)
                } else {
                    var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请重试',hasBtn:true});
                }
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
                var dialog_add = new TipBox({type: 'error', str: '添加信息失败,请稍后重试',hasBtn:true});
            }
        })
    }

    //添加的放弃部分
    function addGiveUp(event){
        var self = $(this).parent();
        self.empty().html('<span class="add_btn"></span>')
    }


    //初次渲染列表
    listRequest();

    var list = $('#list'),
        subList = $('#subList');
    //点击左侧列表的联动显示
    list.on('click', '.datas', subListDisplay);
    //左侧列表的增删改
    list.on('click', '.add_btn', addItem);
    list.on('click', '.delete_btn', deleteItem);
    list.on('click', '.edit_btn', updateItem);
    //右侧列表的增删改
    subList.on('click', '.add_btn', subAddItem);
    subList.on('click', '.delete_btn', deleteSubItem);
    subList.on('click', '.edit_btn', subUpdateItem);



    */


});