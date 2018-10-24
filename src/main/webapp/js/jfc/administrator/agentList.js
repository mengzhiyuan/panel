/**
 * Created by wangxiangyang on 2018/1/29.
 */

var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;


const agent_data = {
    proId: '',
    parId: '',
    project_number: '',//项目编号
    project_agent: '',//代理/兼职
    project_title: '',//项目主题
    project_area: '',//项目区域
    project_manager: '',//项目经理
    project_type: '',//项目类型
    start_time: '',//项目开始日期
    end_time: '',//项目结束日期
    target_quantity: '',//目标样本量
    complete_quantity: '',//实际完成样本量
    agent_supervisor_name: '',//代理商督导姓名
    agent_supervisor_email: '',//代理商督导邮箱
    summarise: '',//总体分值
    summarise_remark: '',
    assessor: '',//评估人
    assess_date: '',//评估日期
    scores: {
        preparation: '',//准备工作
        preparation_remark: '',
        timeliness: '',//及时性
        timeliness_remark: '',
        quality: '',//质量
        quality_remark: '',
        standard: '',//规范性
        standard_remark: '',
        execution: '',//执行能力
        execution_remark: '',
        resource: '',//资源
        resource_remark: '',
        cooperative: '',//配合度
        cooperative_remark: '',
        communication: '',//沟通理解
        communication_remark: '',
        credibility: '',//信誉度
        credibility_remark: '',
        expense: '',//成本费用
        expense_remark: ''
    }
},
    agent_vm = new Vue({
        el: '#score',
        data: agent_data,
        methods: {
            save: function (event){
                $.ajax({
                    url: realPath + '/partTimeJob/evaluateAdd',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(agent_data),
                    success: function(data){
                        if (data[0].result > 0){
                            alert('保存成功。')
                        } else {
                            console.log(data);
                            alert('保存失败。')
                        }
                    },
                    error: function(e){
                        console.log(e);
                        alert('操作失败。')
                    }
                })
            }
        }
    });

function clearScore(data){
    for (let k in data){
        if (typeof data[k] === 'object'){
            for (let v in data[k]){
                data[k][v] = ''
            }
        }
    }
    $('#project_number').off('change');
}

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
                data = $(`
                <tr>
                    <td>`+ value.name +`</td>
                    <td>`+ value.contact_cellphone +`</td>
                    <td>`+ value.contact_telephone +`</td>
                    <td>`+ value.contact_address +`</td>
                    <td>`+ value.contact_address +`</td>
                    <td>`+ value.contact_email +`</td>
                </tr>
            `);

            tbody.append(data);
            table.append(tbody);
            contact.append(button)
                .append(table);
            $('body').append(contact);
            
            let width = contact[0].offsetWidth /2,
            	height = contact[0].offsetHeight / 2;
            
            contact.css('display', 'block')
            	.css('position', 'absolute')
            	.css('left', cor_x - width + 'px')
            	.css('top', cor_y - height + 'px');
            if (parseInt(contact.css('right')) <= 5){
            	contact.css('left', 'initial')
            		.css('right', '25px')
            }
        },
        'click .read_project' : function(e, value, row, index) {
            $.ajax({
                url: realPath + '/partTimeJob/evaluateSearch',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    parId: row.id
                }),
                success: function (data){
                    if (data[0].result.length > 0){
                        console.log(data);
                        agent_data.parId = row.id;
                        fillProject(data[0].result);
                    } else {
                        console.log(data);
                        alert('没有数据。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('异常')
                }
            });

            function fillProject(list){

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
                                <th>合作评价</th>
                            </tr>
                        </thead>
                    </table>`),
                    tbody = $(`<tbody>
                        </tbody>`),
                    cor_x = e.pageX,
                    cor_y = e.pageY;

                for (let i = 0, l = list.length; i < l; i++){
                    let project = list[i];
                    tbody.append(`<tr>
                        <td>`+ project.proNumber +`</td>
                        <td>`+ project.proName +`</td>
                        <td>`+ project['jfcStaff'].staName +`</td>
                        <td>`+ project.type +`</td>
                        <td>`+ (project['proTime'][0].starTime['year'] + 1900) + '-' + (project['proTime'][0].starTime['month'] + 1) + '-' + project['proTime'][0].starTime['date'] +`</td>
                        <td>`+ (project['proTime'][project.proTime.length - 1].endTime['year'] + 1900) + '-' + (project['proTime'][project.proTime.length - 1].endTime['month'] + 1) + '-' + project['proTime'][project.proTime.length - 1].endTime['date'] +`</td>
                        <td>
                            <a href="javascript: void(0);" assess_id="` + project['jfcEvaluate'].evaId + `" class="assess alert-link" data-toggle=\"modal\" data-target=\"#score\">合作评价</a>
                        </td>
                    </tr>`)
                }
                tbody.on('click', 'a.assess', function (event){
                    let assessId = $(event.currentTarget).attr('assess_id');
                    for (let i = 0, l = list.length; i < l; i++){
                        if (list[i]['jfcEvaluate'].evaId == assessId){
                            agent_data.proId = list[i].proId;
                            agent_data.parId = row.id;
                            agent_data.project_number = list[i].proNumber;//项目编号
                            agent_data.project_agent = '代理';//代理/兼职
                            agent_data.project_title = list[i].proName;//项目主题
                            agent_data.project_area = '';//项目区域
                            agent_data.project_manager = list[i]['jfcStaff'].staName;//项目经理
                            agent_data.project_type = list[i].type;//项目类型
                            agent_data.start_time = (list[i]['proTime'][0].starTime['year'] + 1900) + '-' + (list[i]['proTime'][0].starTime['month'] + 1) + '-' + list[i]['proTime'][0].starTime['date'];//项目开始日期
                            agent_data.end_time = (list[i]['proTime'][list[i].proTime.length - 1].endTime['year'] + 1900) + '-' + (list[i]['proTime'][list[i].proTime.length - 1].endTime['month'] + 1) + '-' + list[i]['proTime'][list[i].proTime.length - 1].endTime['date'];//项目结束日期
                            agent_data.target_quantity = list[i]['jfcEvaluate'].targetQuantity;//目标样本量
                            agent_data.complete_quantity = list[i]['jfcEvaluate'].completeQuantity;//实际完成样本量
                            agent_data.agent_supervisor_name = list[i]['jfcEvaluate'].agentSupervisorName;//代理商督导姓名
                            agent_data.agent_supervisor_email = list[i]['jfcEvaluate'].agentSupervisorEmail;//代理商督导邮箱
                            agent_data.summarise = list[i]['jfcEvaluate'].summarise;//总体分值
                            agent_data.assessor = list[i]['jfcEvaluate'].assessor;//评估人
                            agent_data.assess_date = (list[i]['jfcEvaluate'].assessDate['year'] + 1900) + '-' + (list[i]['jfcEvaluate'].assessDate['year'] + 1) + '-' + list[i]['jfcEvaluate'].assessDate['year'];//评估日期
                            agent_data.scores = JSON.parse(list[i]['jfcEvaluate'].scores)[0]
                        }
                    }
                });

                table.append(tbody);
                projects.append(button)
                    .append(table);
                $('body').append(projects);
                
                let width = projects[0].offsetWidth / 2,
                	height = projects[0].offsetHeight / 2;
                
                projects.css('position', 'absolute')
            		.css('display', 'block')
            		.css('left', cor_x - width + 'px')
            		.css('top', cor_y - height + 'px');
                if (parseInt(projects.css('right')) <= 5){
                	projects.css('left', 'initial')
                		.css('right', '25px')
                }
            }
        },
        'click .mark': function (e, value, row, index){

            clearScore(agent_data);

            $.ajax({
                url: realPath + '/partTimeJob/evaluateList',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    parId: row.id,
                    agent_type: row.agent_type
                }),
                success: function (data){
                    if (data[0].result.length === 0){
                        console.log(data);
                        alert('此代理还未参与过项目。');
                        $('#closeScore').click()
                    } else {
                        let score = $('#score'),
                            list = data[0].result,
                            str = ``;

                        if (data[0].partTimeJobList){
                            let agent = data[0].partTimeJobList[0];
                            score.find('.project_area').val(agent.parExecutionArea).prop('disabled', true)
                                .end().find('.agent_supervisor_name').val(agent.parName).prop('disabled', true)
                                .end().find('.agent_supervisor_email').val(agent.parMail).prop('disabled', true);
                        } else {
                            score.find('.project_area').prop('disabled', false)
                                .end().find('.agent_supervisor_name').prop('disabled', false)
                                .end().find('.agent_supervisor_email').prop('disabled', false);
                        }

                        for (let i = 0, l = list.length; i < l; i++){
                            str += `<option value="`+ list[i].proNumber +`">`+ (list[i].proName.length < 6 ? list[i].proName : list[i].proName.slice(0,5) + '...') +`</option>`
                        }
                        $('#project_number').find("option:not(':first-child')").remove()
                            .end().append(str)
                            .on('change', function(event){
                                for (let k = 0,h = list.length; k < h; k++){
                                    if (list[k].proNumber == $('#project_number').val()){
                                        let project = list[k];
                                        agent_data.proId = project.proId;
                                        agent_data.parId = row.id;
                                        agent_data.project_number = project.proNumber;
                                        agent_data.project_agent = project.project_agent;
                                        agent_data.project_title = project.proName;
                                        agent_data.project_area = project.city;
                                        agent_data.project_manager = project['jfcStaff'].staName;
                                        agent_data.project_type = project.type;
                                        agent_data.start_time = (project['proTime'][0].starTime.year + 1900) + '-' + (project['proTime'][0].starTime.month + 1) + '-' + (project['proTime'][0].starTime.date);
                                        agent_data.end_time = (project['proTime'][project['proTime'].length - 1].endTime.year + 1900) + '-' + (project['proTime'][project['proTime'].length - 1].endTime.month + 1) + '-' + (project['proTime'][project['proTime'].length - 1].endTime.date);
                                    }
                                }
                            });
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

            switch (field){

                case 'remark':
                    $.ajax({
                        url: realPath + '/partTimeJob/partTimeJobAddOrUpdate',
                        type: 'post',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        async: true,
                        data: JSON.stringify({
                            parId: row.id,
                            remark: row.remark
                        }),
                        success: function (data){
                            if (data[0].result > 0){
                                $("#datas").bootstrapTable('destroy');
                                oTable.Init();
                                alert('修改成功')
                            } else {
                                console.log(data);
                                alert('修改失败')
                            }
                        },
                        error: function (err){
                            console.log(err);
                            alert('操作失败。')
                        }
                    });
                    break;

                case 'recommendation':
                    $.ajax({
                        url: realPath + '/partTimeJob/partTimeJobAddOrUpdate',
                        type: 'post',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        async: true,
                        data: JSON.stringify({
                            parId: row.id,
                            recommendation: row.recommendation
                        }),
                        success: function (data){
                            if (data[0].result > 0){
                                $("#datas").bootstrapTable('destroy');
                                oTable.Init();
                                alert('修改成功')
                            } else {
                                console.log(data);
                                alert('修改失败')
                            }
                        },
                        error: function (err){
                            console.log(err);
                            alert('操作失败。')
                        }
                    });
                    break;
            }
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
            title: '使用推荐',
            editable: {
                type: 'number',
                title: '名称',
                validate: function (v) {
                    if (!parseInt(v) || parseInt(v) < 0 || parseInt(v) > 10){
                        alert('请输入1到10之间的整数');
                        return false
                    }
                }
            }
        }, {
            field: 'contact',
            title: '联系方式',
            formatter(value,row,index){
                return "<a class=\"btn btn-xs btn-info read_contact\" data-toggle=\"modal\" title=\"查看\" >查看</a>";
            },
            events : operateEvents
        }, {
            field: 'remark',
            title: '备注'
        }, {
            field: 'control',
            title: '操作',
            formatter(value,row,index){
                let a = "<a class=\"btn btn-xs btn-info read_project\" title=\"查看\" >查看</a>",
                    b = "<a class=\"btn btn-xs btn-info mark\" data-toggle=\"modal\" data-target=\"#score\" title=\"评估\" >评估</a>";
                return a + b;
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