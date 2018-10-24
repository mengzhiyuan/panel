/**
 * Created by wangxiangyang on 2018/1/30.
 */

var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;


const agent_data = {
    parId: '',
    province: '',//省份
    city: '',//城市
    execution_area: '',//执行区域
    contact_name: '',//联系人姓名
    contact_cellphone: '',//联系人手机
    contact_telephone: '',//联系人座机
    contact_address: '',//联系人地址
    contact_website: '',//联系人网址
    contact_email: '',//联系人邮箱
    agent_name: '',//代理名称
    agent_type: '',//代理类型
    project_type: '',//代理项目类型
    main_industry: '',//特长行业
    facility: '',//设施
    importance: '',//优先度
    account_bank: '',//开户行
    account_name: '',//开户名
    account_number: '',//账号
    remark: ''//备注
},
    agent_vm = new Vue({
        el: '#new_agent',
        data: agent_data,
        methods: {
            save: function(event){
                $.ajax({
                    url: realPath + '/partTimeJob/partTimeJobAddOrUpdate',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(agent_data),
                    success: function(data){
                        if (data[0].result > 0){
                            clearScore(agent_data);
                            $('#newScore').click();
                            alert('成功。')
                        } else {
                            console.log(data);
                            alert('失败。')
                        }
                    },
                    error: function(e){
                        console.log(e);
                        alert('失败。')
                    }
                })
            },
            close: function(event){
                clearScore(agent_data)
            }
        }
    });

function clearScore(data){
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

$('#newScore').on('click', function(event){
    clearScore(agent_data);
});
$('#agent_search').on('click', function (event){
    $("#datas").bootstrapTable('destroy');
    oTable.Init()
});


//年份月份筛选
function initialDays(p){
    var yearSelect = p.yearSelect,
        monthSelect = p.monthSelect,
        timeNow = new Date(),
        yearNow = timeNow.getFullYear(),
        monthNow = timeNow.getMonth() + 1,
        yearOption = `<option>请选择年份</option>`;

    for (let y = 2017; y <= yearNow; y++){
        yearOption += `<option>`+ y +`</option>`
    }
    yearSelect.empty().append(yearOption);

    yearSelect.off('change').on('change', function(event){

        let v = $(event.currentTarget).val(),
            monthOption = `<option>请选择月份</option>`;

        if (v){
            if (parseInt(v) === yearNow){
                for (let m = 1; m <= monthNow; m++){
                    monthOption += `<option>`+ m +`</option>`
                }
            } else {
                for (let m = 1; m <= 12; m++){
                    monthOption += `<option>`+ m +`</option>`
                }
            }
            monthSelect.empty().append(monthOption)
        }
    });

    yearSelect.val(yearNow).change();
    monthSelect.val(monthNow).change();
}

$(function () {

    initialDays({
        yearSelect: $('#attendance_year'),
        monthSelect: $('#attendance_month')
    });

// 1.初始化Table
    window.oTable = new TableInit();
    oTable.Init();

// 2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

// });

});

var TableInit = function() {

    $('#attendance_search').on('click',function(){
        oTableInit.queryParams = function (params) {
            var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                //plan_title: $('#plan_title').val(),//项目主题-筛选
                //plan_owner: $('#plan_owner').val(),//客户公司-筛选
                //plan_start_time: $('#plan_start').val(),//客户经理-筛选
                //plan_end_time: $('#plan_end').val(),//查询期限-筛选
                login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                staff_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                attendance_year: $('#attendance_year').val(),
                attendance_month: $('#attendance_month').val(),
                //limit: params.limit,   // 页面大小
                //offset: params.offset,  // 页码
                sort: params.sort,      //排序列名
                sortOrder: params.order
                //keyword: $("#keyword").val()
            };
            return temp;
        };
        $("#datas").bootstrapTable('destroy');
        oTable.Init()
    });

    var oTableInit = new Object();
    // 初始化Table

    window.operateEvents = {
        'click .read_contact' : function(e, value, row, index) {
        	$("#contact").remove();
            let contact = $(`
                <div class="alert alert-warning alert-dismissible" id="contact" role="alert">
                </div>
            `),
                button = $(`<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`),
                table = $(`<table>
                         <thead>
                             <tr>
                                 <th>姓名</th>
                                 <th>手机</th>
                                 <th>电话</th>
                                 <th>邮箱</th>
                                 <th>地址</th>
                                 <th>网址</th>
                             </tr>
                         </thead>
                     </table>`),
                tbody = $(`<tbody>
                         </tbody>`),
                cor_x = e.pageX,
                cor_y = e.pageY,
                width = contact.offsetWidth,
                height = contact.offsetHeight,
                data = $(`
                <tr>
                    <td>`+ value.name +`</td>
                    <td>`+ value.contact_cellphone +`</td>
                    <td>`+ value.contact_telephone +`</td>
                    <td>`+ value.contact_email +`</td>
                    <td>`+ value.contact_address +`</td>
                    <td>`+ value.contact_website +`</td>
                </tr>
            `);

            contact.css('display', 'block')
                .css('left', cor_x - width + 'px')
                .css('left', cor_y - height + 'px');

            tbody.append(data);
            table.append(tbody);
            contact.append(button)
                .append(table);
            
            $('body').append(contact);
        },
        'click .read_projects' : function(e, value, row, index) {
        	$("#projects").remove();
            $.ajax({
                url: realPath + '/partTimeJob/partTimeJobProject',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    parId: row.id
                }),
                success: function (data){
                    if (data[0].result < 0){
                        console.log(data);
                        fillProject(data[0].result);
                        alert('没有数据。')
                    } else {
                        console.log(data)
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('异常')
                }
            });

            function fillProject(list){

                let trs = ``;

                for (let i = 0, l = list.length; i < l; i++){
                    let project = list[i];
                    trs += `<tr>
                        <td>`+ project.proNumber +`</td>
                        <td>`+ project.proName +`</td>
                        <td>`+ project['jfcStaff'].staName +`</td>
                        <td>`+ project.type +`</td>
                        <td>`+ (project['proTime'][0].starTime['year'] + 1900) + '-' + (project['proTime'][0].starTime['month'] + 1) + '-' + project['proTime'][0].starTime['date'] +`</td>
                        <td>`+ (project['proTime'][project.proTime.length - 1].endTime['year'] + 1900) + '-' + (project['proTime'][project.proTime.length - 1].endTime['month'] + 1) + '-' + project['proTime'][project.proTime.length - 1].endTime['date'] +`</td>
                        <td>`+  +`</td>
                        <td><a href="javascript: void(0);" class="alert-link">合作评价</a></td>
                    </tr>`
                }
            }

            let projects = $(`
                <div class="alert alert-warning alert-dismissible" id="projects" role="alert">
                </div>
            `),
                button = $(`<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`),
                table = $(`<table>
                        <thead>
                            <tr>
                                <th>项目编号</th>
                                <th>项目主题</th>
                                <th>项目经理</th>
                                <th>项目类型</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>合作金额</th>
                                <th>付款状态</th>
                                <th>付款日期</th>
                                <th>付款金额</th>
                                <th>合作评价</th>
                            </tr>
                        </thead>
                    </table>`),
                tbody = $(`<tbody>
                        </tbody>`),
                cor_x = e.pageX,
                cor_y = e.pageY,
                width = projects.offsetWidth,
                height = projects.offsetHeight;

            projects.css('display', 'block')
                .css('left', cor_x - width + 'px')
                .css('left', cor_y - height + 'px');

            table.append(tbody);
            projects.append(button)
                .append(table);
            $('body').append(projects);
        },
        'click .read_account': function (e,value,row,index){
        	$("#account").remove();
            let account = $(`
                <div class="alert alert-warning alert-dismissible" id="account" role="alert">
                </div>
            `),
                button = $(`<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`),
                table = $(`<table>
                         <thead>
                             <tr>
                                 <th>开户行</th>
                                 <th>开户名</th>
                                 <th>账号</th>
                             </tr>
                         </thead>
                     </table>`),
                tbody = $(`<tbody>
                         </tbody>`),
                cor_x = e.pageX,
                cor_y = e.pageY,
                width = account.offsetWidth,
                height = account.offsetHeight,
                data = $(`
                <tr>
                    <td>`+ value.account_bank +`</td>
                    <td>`+ value.account_name +`</td>
                    <td>`+ value.account_number +`</td>
                </tr>
            `);

            account.css('display', 'block')
                .css('left', cor_x - width + 'px')
                .css('left', cor_y - height + 'px');

            tbody.append(data);
            table.append(tbody);
            account.append(button)
                .append(table);
            $('body').append(account);
        },
        'click .update': function (e,value,row,index){
            agent_data.parId = row.id;
            agent_data.province = row.province;//省份
            setTimeout(function(){
            	$('#new_province').change();
            	agent_data.city = row.city;//城市
            },500);
            agent_data.execution_area = row.execution_area;//执行区域
            agent_data.contact_name = row.contact.name;//联系人姓名
            agent_data.contact_cellphone = row.contact.contact_cellphone;//联系人手机
            agent_data.contact_telephone = row.contact.contact_telephone;//联系人座机
            agent_data.contact_address = row.contact.contact_address;//联系人地址
            agent_data.contact_website = row.contact.contact_website;//联系人网址
            agent_data.contact_email = row.contact.contact_email;//联系人邮箱
            agent_data.agent_name = row.agent_name;//代理名称
            agent_data.agent_type = row.agent_type;//代理类型
            agent_data.project_type = row.project_type;//代理项目类型
            agent_data.main_industry = row.main_industry;//特长行业
            agent_data.facility = row.facility;//设施
            agent_data.importance = row.recommendation;//优先度
            agent_data.account_bank = row.project_amount.account_bank;//开户行
            agent_data.account_name = row.project_amount.account_name;//开户名
            agent_data.account_number = row.project_amount.account_number;//账号
            agent_data.remark = row.remark;//备注
        },
        'click .delete': function (e,value,row,index){
            $.ajax({
                url: realPath + '/partTimeJob/parttimeDelete',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    parId: row.parId
                }),
                success: function (data){
                    if (data[0].result > 0){
                        $("#datas").bootstrapTable('destroy');
                        oTable.Init();
                        alert('删除完成。')
                    } else {
                        console.log(data);
                        alert('删除失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            })
        }
    };

    function bootstrapTableParameter(){

        function editFunction(field, row, oldValue, $el) {

        }
        function dataHandler(ood){

            if (ood[0].result == '0'){
                alert('你没有权限。');
                return false;
            }

            var rows = [],
                total = ood[0].total,
                list = ood[0].result;

            for (let i = 0, l = list.length; i < l; i++){

                rows[i] = {
                    id: list[i].parId,//id
                    province: list[i].parProvince,//省份
                    city: list[i].parCity,//城市
                    agent_type: list[i].parAgentType,//代理类型
                    agent_name: list[i].parAgentName,//代理姓名
                    execution_area: list[i].parExecutionArea,//执行区域
                    project_type: list[i].parProjectType,//项目类型
                    main_industry: list[i].parMainIndustry,//特长行业
                    facility: list[i].parFacility,//设施
                    recommendation: list[i].parImportance,//推荐度
                    contact: {//联系方式
                        name: list[i].parName,//联系人姓名
                        contact_cellphone: list[i].parCellphone,//手机
                        contact_telephone: list[i].parTelephone,//座机
                        contact_address: list[i].parAddress,//地址
                        contact_website: list[i].parWebsite,//网址
                        contact_email: list[i].parMail//邮箱
                    },
                    project_amount: {
                        account_bank: list[i].parAccountBank,
                        account_name: list[i].parAccountName,
                        account_number: list[i].parAccountNumber
                    },
                    remark: list[i].parRemark
                };//初始化一行的数据
            }
            return {
                rows: rows,
                total: total
            }
        }

        var brief = {
            url: "" + realPath+ "/partTimeJob/partTimeJobSearch",         // 请求后台的URL（*）
            method: 'post',                      // 请求方式（*）
            toolbar: '#toolbar',                // 工具按钮用哪个容器
            striped: true,                      // 是否显示行间隔色
            cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   // 是否显示分页（*）
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
            field: 'province',
            title: '省份'
        }, {
            field: 'city',
            title: '城市'
        }, {
            field: 'agent_type',
            title: '代理类型'
        }, {
            field: 'agent_name',
            title: '代理商名称'
        }, {
            field: 'execution_area',
            title: '执行区域'
        }, {
            field: 'project_type',
            title: '代理项目类型'
        }, {
            field: 'main_industry',
            title: '行业特长'
        }, {
            field: 'facility',
            title: '设施'
        }, {
            field: 'recommendation',
            title: '使用推荐'
        }, {
            field: 'contact',
            title: '联系方式',
            formatter(value,row,index){
                return "<a class=\"btn btn-xs btn-info read_contact\" data-toggle=\"modal\" title=\"查看\" >查看</a>";
            },
            events : operateEvents
        }, {
            field: 'project_number',
            title: '合作项目编号',
            formatter(value,row,index){
                return "<a class=\"btn btn-xs btn-success read_projects\" title=\"标记\" >查看详细</a>";
            },
            events : operateEvents
        }, {
            field: 'project_amount',
            title: '合作金额',
            formatter(value,row,index){
                return "<a class=\"btn btn-xs btn-success read_account\" title=\"标记\" >查看详细</a>";
            },
            events : operateEvents
        }, {
            field: 'remark',
            title: '备注',
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
            formatter(value,row,index){
                var c = "<a class=\"btn btn-xs btn-success update\" data-toggle=\"modal\" data-target=\"#new_agent\" title=\"修改\" >修改</a>",
                    d = "<a class=\"btn btn-xs btn-success delete\" title=\"删除\" >删除</a>";
                return c+d;
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
            //plan_title: $('#plan_title').val(),//项目主题-筛选
            //plan_owner: $('#plan_owner').val(),//客户公司-筛选
            //plan_start_time: $('#plan_start').val(),//客户经理-筛选
            //plan_end_time: $('#plan_end').val(),//查询期限-筛选
            login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,//登录邮箱
            province: $('#province').val(),//省份
            city: $('#city').val(),//城市
            agent_type: $('#key_agent_type').val(),//代理类型
            execution_area: $('#key_execution_area').val(),//执行区域
            main_industry: $('#key_main_industry').val()//特长行业

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