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

const purchase_data = {
    equipmentId: '',//物品名称
    eqs: [],//待选物品列表
    branch: '',//分部|运营平台
    purchase_date: '',//采购日期
    purchase_price: '',//采购单价
    purchase_number: '',//采购数量
    purchase_cost: ''//采购金额
    },
    adding_data = {
        equipment_name: '',
        equipment_type: '',
        equipment_size: '',
        total_number: '',
        stock_number: '',
        consume_number: '',
        branch: '',
        remark: ''
    },
    return_data = {
        number: '',
        equipmentId: '',
        useId: '',
        return_number: ''
    },
    purchase_vm = new Vue({
        el: '#equipment_purchase',
        data: purchase_data,
        mounted: function (){
            var self = this;
            setInterval(function(){
                self.purchase_date = $('#purchase_date').val()
            },500)
        },
        methods: {
            save: function (event){
                delete(purchase_data.eqs);
                $.ajax({
                    url: realPath + '/equipment/equipmentPurchaAdd',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(purchase_data),
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
        },
        watch: {
            purchase_price: {
                handler: function (val, old){
                    if (parseFloat(val) >= 0){
                        this.purchase_cost = val * this.purchase_number
                    }
                },
                deep: true
            },
            purchase_number: {
                handler: function (val, old){
                    if (parseFloat(val) >= 0){
                        this.purchase_cost = this.purchase_price * val
                    }
                },
                deep: true
            }
        }
    }),
    adding_vm = new Vue({
        el: '#equipment_adding',
        data: adding_data,
        methods: {
            save: function (event){
                $.ajax({
                    url: realPath + '/equipment/equipmentAdd',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(adding_data),
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
    }),
    return_vm = new Vue({
        el: '#equipment_return',
        data: return_data,
        methods: {
            save: function (event){
                delete(return_data.number);
                $.ajax({
                    url: realPath + '/equipment/restitution',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(return_data),
                    success: function(data){
                        if (data[0].result > 0){
                            alert('归还成功。')
                        } else {
                            alert('归还失败。')
                        }
                    },
                    error: function(e){
                        console.log(e);
                        alert('请求失败。')
                    }
                });
            }
        }
    });

laydate.render({
    elem: '#purchase_date',
    type: 'datetime'
});

$('#equipment_add').on('click', function(event){
    clearValue(adding_data)
});
$('#purchase_add').on('click', function(event){
    clearValue(purchase_data);
    $.ajax({
        url: realPath + '/equipment/equipmentListAll',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (data){
            console.log(data);
            try {
                let list = data[0].result;
                purchase_data['eqs'] = [{}];
                for (let i = 0, l = list.length; i < l; i++){
                    purchase_data['eqs'].push({
                        equipmentId: list[i].equipmentId,
                        equipmentName: list[i].equipmentName
                    })
                }
            } catch (e) {}
        },
        error: function (e){
            console.log(e);
            alert('操作失败')
        }
    })
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

    var oTableInit = new Object();
    // 初始化Table

    window.operateEvents = {
        'click .apply' : function(e, value, row, index) {
            clearValue(apply_data);
            apply_data.equipment_name = row.name;
            apply_data.equipment_type = row.type;
        },
        'click .return' : function(e, value, row, index) {
            return_data.useId = row.useId;
            return_data.equipmentId = row.id;
            return_data.number = row.number;
        },
        'click .purchase_status': function (e,value,row,index){
            $.ajax({
                url: realPath + '/equipment/procurementStatus',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    equipmentId: row.id
                }),
                success: function(data){
                	let detail = data;
                    if (detail[0].result.length > 0){
                        let value = detail[0].result[0],
                            purchase = $(`
                <div class="alert alert-warning alert-dismissible" id="purchase" role="alert">
                </div>
            `),
                            button = $(`<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`),
                            table = $(`<table>
                         <thead>
                             <tr>
                                 <th>日期</th>
                                 <th>采购单价</th>
                                 <th>采购数量</th>
                                 <th>采购金额</th>
                             </tr>
                         </thead>
                     </table>`),
                            tbody = $(`<tbody>
                         </tbody>`),
                            cor_x = e.pageX,
                            cor_y = e.pageY,
                            node = $(`
                <tr>
                    <td>`+ (value['purchaseDate'] ? (value['purchaseDate'].year + 1900) + (value['purchaseDate'].month + 1) + value['purchaseDate'].date : '') +`</td>
                    <td>`+ value.purchasePrice +`</td>
                    <td>`+ value.purchaseNumber +`</td>
                    <td>`+ (value.purchasePrice * value.purchaseNumber) +`</td>
                </tr>
            `);

                        tbody.append(node);
                        table.append(tbody);
                        purchase.append(button)
                            .append(table);
                        $('body').append(purchase);

                        let width = purchase[0].offsetWidth /2,
                            height = purchase[0].offsetHeight / 2;

                        purchase.css('display', 'block')
                            .css('position', 'absolute')
                            .css('left', cor_x - width + 'px')
                            .css('top', cor_y - height + 'px');
                        if (parseInt(purchase.css('right')) <= 5){
                            purchase.css('left', 'initial')
                                .css('right', '25px')
                        }
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
                url: realPath + '',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    equipment_id: row.id,
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
                            useId: inUse[j].useId,
                            name: list[i].equipmentName,
                            type: list[i].equipmentType,
                            size: list[i].equipmentSize,
                            number: inUse[j].useNumber,
                            recipient: inUse[j].useRecipient,
                            usage: inUse[j].useUsage,
                            taken_date: (inUse[j].useTakenDate.year + 1900) + '-' + (inUse[j].useTakenDate.month + 1) + '-' + (inUse[j].useTakenDate.date) + ' ' + inUse[j].useTakenDate.hours + ':' + inUse[j].useTakenDate.minutes,
                            return_date: (inUse[j].useReturnDate.year + 1900) + '-' + (inUse[j].useReturnDate.month + 1) + '-' + (inUse[j].useReturnDate.date) + ' ' + inUse[j].useReturnDate.hours + ':' + inUse[j].useReturnDate.minutes,
                            return_number: inUse[j].returnNumber,
                            remark: inUse[j].useRemark,
                            control: true
                        })
                    }
                }
            }
            //$('#controls').find('tbody').empty();
            //for (let i = 0,l = staffs.length; i < l; i++){
            //    let tr = $(`<tr>
            //                  </tr>`),
            //        departmentTd = $(`<th></th>`),
            //        staffTd = $(`<td></td>`);
            //    departmentTd.text(staffs[i].departmentValue);
            //    for (let s = 0, ar = staffs[i].staList, la = ar.length; s < la; s++){
            //        staffTd.append(`<a href="javascript: void(0);" jn="`+ ar[s].staEmail +`">【`+ ar[s].staName +`】</a>`)
            //    }
            //    tr.append(departmentTd)
            //        .append(staffTd);
            //    if (i === 0){
            //        tr.append(`<th rowspan="`+ l +`">
            //                <a href="javascript: void(0);" fn="holiday" data-toggle="modal" data-target="#holiday">设置假期</a>
            //                <a href="javascript: void(0);" fn="count">统计</a>
            //                <a href="javascript: void(0);" fn="import" data-toggle="modal" data-target="#import">导入</a>
            //                <a href="javascript: void(0);" fn="export">导出</a>
            //            </th>`)
            //    }
            //    $('#controls').find('tbody').append(tr)
            //}
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
                if (value){
                    return "<a class=\"btn btn-xs btn-info return\" data-toggle=\"modal\" data-target=\"#equipment_return\" >归还物品</a>";
                } else {
                    let a = "<a class=\"btn btn-xs btn-info purchase_status\" title=\"查看\" >采购状态</a>",
                        b = "<a class=\"btn btn-xs btn-info apply\" data-toggle=\"modal\" data-target=\"#apply\" title=\"查看\" >折旧状态</a>",
                        c = "<a class=\"btn btn-xs btn-info apply\" data-toggle=\"modal\" data-target=\"#apply\" title=\"查看\" >数量</a>",
                        d = "<a class=\"btn btn-xs btn-info apply\" data-toggle=\"modal\" data-target=\"#apply\" title=\"查看\" >修改</a>";
                    return a+b+c+d;
                }
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