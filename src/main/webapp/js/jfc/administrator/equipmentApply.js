/**
 * Created by wangxiangyang on 2018/2/1.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;


$(function () {

// 1.初始化Table
    window.oTable = new TableInit();
    oTable.Init();

// 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();


// });

});

function clearValue(data){
    for (let k in data){
        if (typeof data[k] === 'object'){
            for (let v in data[k]){
                data[k][v] = ''
            }
        } else {
            data[k] = ''
        }
    }
}

const apply_data = {
        equipment_id: '',
        equipment_name: '',
        equipment_type: '',
        equipment_size: '',
        stock_number: '',
        apply_number: '',
        equipment_usage: '',//用途
        taken_date: '',//领用日期
        return_date: '',//归还日期
        recipient: ''//领用人
    },
    apply_vm = new Vue({
        el: '#equipment_apply',
        data: apply_data,
        mounted: function (){

            laydate.render({
                elem: '#taken_date',
                type: 'datetime'
            });
            laydate.render({
                elem: '#return_date',
                type: 'datetime'
            });

            setInterval(function(){
                apply_data.taken_date = $('#taken_date').val();
                apply_data.return_date = $('#return_date').val()
            },1000)
        },
        methods: {
            save: function (event){
                $.ajax({
                    url: realPath + '/equipment/equipmentUseAdd',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify({
                        equipmentId: apply_data.equipment_id,
                        apply_number: apply_data.apply_number,
                        recipient: apply_data.recipient,
                        taken_date: apply_data.taken_date,
                        return_date: apply_data.return_date,
                        equipment_usage: apply_data.equipment_usage
                    }),
                    success: function (data){
                        if (data[0].result > 0){
                            $("#datas").bootstrapTable('destroy');
                            oTable.Init();
                            alert('提交成功。')
                        } else {
                            console.log(data);
                            alert('提交失败。')
                        }
                    },
                    error: function (e){
                        console.log(e);
                        alert('操作失败。')
                    }
                })
            }
        }
    });

var TableInit = function() {

    $('#equipment_search').on('click',function(){
        oTableInit.queryParams = function (params) {
            var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                staff_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                search_key: $('#search_key').val(),
                search_value: $('#search_value').val(),
                limit: params.limit,   // 页面大小
                offset: params.offset,  // 页码
                sort: params.sort,      //排序列名
                sortOrder: params.order
            };
            return temp;
        };
        $("#datas").bootstrapTable('destroy');
        oTable.Init()
    });

    //点击员工姓名切换列表内容
    $('#controls').on('click', '[jn]', function(event){
            console.log(oTableInit);
            let email = $(event.currentTarget).attr('jn');
            oTableInit.queryParams = function (params) {
                var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                    staff_email: email,
                    search_key: $('#search_key').val(),
                    search_value: $('#search_value').val(),
                    limit: params.limit,   // 页面大小
                    offset: params.offset,  // 页码
                    sort: params.sort,      //排序列名
                    sortOrder: params.order
                };
                return temp;
            };
            //oTableInit.queryParams.staff_email = $(event.currentTarget).attr('jn');
            $("#datas").bootstrapTable('destroy');
            oTable.Init()
        })
        .on('click', '[fn]', function(event){

            var fn = $(event.currentTarget).attr('fn');
            console.log(fn);

            switch(fn){
                case 'all':
                    break;
                case 'reply':
                    document.location.href = './attendanceTable.html';
                    break;
                case 'manage':
                    document.location.href = './equipmentManage.html';
                    break;
                default:
                    break;
            }
        });

    var oTableInit = new Object();
    // 初始化Table

    window.operateEvents = {
        'click .apply' : function(e, value, row, index) {
            clearValue(apply_data);
            apply_data.equipment_id = row.id;
            apply_data.equipment_name = row.name;
            apply_data.equipment_type = row.type;
            apply_data.equipment_size = row.size;
            apply_data.stock_number = row.status;
        },
        'click .return' : function(e, value, row, index) {
            $.ajax({
                url: realPath + '/attendance/updateStatus',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    time_string: row.the_time_nightfall,
                    hid: row.hid,
                    operation: '1'
                }),
                success: function(data){
                    if (data[0].result > 0){
                        alert('确认成功。')
                    } else {
                        alert('确认失败。')
                    }
                },
                error: function(e){
                    console.log(e);
                    alert('请求失败。')
                }
            });
        },
        'click .morning_decline': function (e,value,row,index){
            $.ajax({
                url: realPath + '/attendance/updateStatus',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    time_string: row.the_time_morning,
                    hid: row.hid,
                    operation: '0'
                }),
                success: function(data){
                    if (data[0].result > 0){
                        alert('确认成功。')
                    } else {
                        alert('确认失败。')
                    }
                },
                error: function(e){
                    console.log(e);
                    alert('请求失败。')
                }
            });
        },
        'click .nightfall_decline': function (e,value,row,index){

        },
        'click .update_mark': function(e, value, row, index){

            $.ajax({
                url: realPath +'',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({}),
                async: true,
                success: function(d){

                },
                error: function(e){

                }
            })
        }
    };

    function bootstrapTableParameter(){

        function editFunction(field, row, oldValue, $el) {
            $.ajax({
                url: realPath + '/equipment/equipmentUpdateRemark',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    equipmentId: row.id,
                    remark: row.remark
                }),
                success: function (data){
                    if (data[0].result > 0){
                        $("#datas").bootstrapTable('destroy');
                        oTable.Init();
                        alert('提交成功。')
                    } else {
                        console.log(data);
                        alert('提交失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            });
        }
        function dataHandler(ood){

            if (ood[0].result.length == '0'){
                alert('你没有权限。');
                return false;
            }

            var rows = [],
                list = ood[0].result,
                staffs = ood[0].list,
                lm = list.length;

            for (let i = 0; i < lm; i++){

                let newEquipment = {};
                rows.push(newEquipment);//初始化一行的数据

                newEquipment.id = list[i].equipmentId;
                newEquipment.name = list[i].equipmentName;
                newEquipment.type = list[i].equipmentType;
                newEquipment.size = list[i].equipmentSize;
                newEquipment.status = list[i].applyNumber;
                newEquipment.number = list[i].applySum;
                newEquipment.remark = list[i].remark;

                let inUse = list[i].jfcEquipmentUse,
                    useId = inUse[0].useId;

                if (useId){
                    let ln = inUse.length;

                    for (let j = 0; j < ln; j++){
                        rows.push({
                            id: inUse[j].equipmentId,
                            name: list[i].equipmentName,
                            type: list[i].equipmentType,
                            size: list[i].equipmentSize,
                            number: inUse[j].useNumber,
                            recipient: inUse[j].useRecipient,
                            usage: inUse[j].useUsage,
                            taken_date: (inUse[j].useTakenDate.year + 1900) + '-' + (inUse[j].useTakenDate.month + 1) + '-' + (inUse[j].useTakenDate.date) + ' ' + inUse[j].useTakenDate.hours + ':' + inUse[j].useTakenDate.minutes,
                            return_date: (inUse[j].useReturnDate.year + 1900) + '-' + (inUse[j].useReturnDate.month + 1) + '-' + (inUse[j].useReturnDate.date) + ' ' + inUse[j].useReturnDate.hours + ':' + inUse[j].useReturnDate.minutes,
                            return_number: inUse[j].returnNumber,
                            remark: inUse[j].useRemark
                        })
                    }
                }
            }


            $('#controls').find('tbody').empty();
            for (let i = 0,l = staffs.length; i < l; i++){
                let tr = $(`<tr>
                              </tr>`),
                    departmentTd = $(`<th></th>`),
                    staffTd = $(`<td></td>`);
                departmentTd.text(staffs[i].departmentValue);
                for (let s = 0, ar = staffs[i].staList, la = ar.length; s < la; s++){
                    staffTd.append(`<a href="javascript: void(0);" jn="`+ ar[s].staEmail +`">【`+ ar[s].staName +`】</a>`)
                }
                tr.append(departmentTd)
                    .append(staffTd);
                if (i === 0){
                    tr.append(`<th rowspan="`+ l +`">
                            <a href="javascript: void(0);" fn="all">查看</a>
                            <a href="javascript: void(0);" fn="reply">批复</a>
                            <a href="javascript: void(0);" fn="manage">物品管理</a>
                        </th>`)
                }
                $('#controls').find('tbody').append(tr)
            }
            return {
                rows: rows,
                total: ood[0].total
            }
        }

        var brief = {
            url: "" + realPath+ '/equipment/equipmentList',         // 请求后台的URL（*）
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
            columns: [],
            onEditableSave: editFunction,
            responseHandler: dataHandler
        };

        brief.columns = [{
            field: 'id',
            title: 'ID'
        }, {
            field: 'name',
            title: '物品名称'
        }, {
            field: 'type',
            title: '类别',
            sortable: true
        }, {
            field: 'size',
            title: '规格'
        }, {
            field: 'status',
            title: '库存'
        }, {
            field: 'number',
            title: '总数量'
        }, {
            field: 'recipient',
            title: '领用人'
        }, {
            field: 'usage',
            title: '用途'
        }, {
            field: 'taken_date',
            title: '领用日期'
        }, {
            field: 'return_date',
            title: '归还日期'
        }, {
            field: 'return_number',
            title: '归还数量'
        }, {
            field: 'remark',
            title: '备注',
            editable: {
                type: 'text',
                title: '异常状态',
                validate: function (v) {
                    if (!v) return '不能为空';
                }
            }
        }, {
            field: 'control',
            title: '操作',
            align : 'center',
            formatter : function(value, row, index) {
                return "<a class=\"btn btn-xs btn-info apply\" data-toggle=\"modal\" data-target=\"#equipment_apply\" title=\"查看\" >领用物品</a>";
            },
            events : operateEvents
        }];
        return brief
    }



    oTableInit.Init = function () {
        $('#datas').bootstrapTable(bootstrapTableParameter());
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
            staff_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
            search_key: $('#search_key').val(),
            search_value: $('#search_value').val(),
            limit: params.limit,   // 页面大小
            offset: params.offset,  // 页码
            sort: params.sort,      //排序列名
            sortOrder: params.order
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function() {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function() {
        // 初始化页面上面的按钮事件
    };

    return oInit;
};