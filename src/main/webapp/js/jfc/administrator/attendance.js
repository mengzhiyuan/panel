/**
 * Created by wangxiangyang on 2018/1/22.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;



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
$('#plan_add').on('click',function(){
    document.location.href = './workPlanEdit.html';
});


function renderAboutHoliday(p){

    var node = p.node,
        button = p.button,
        close_button = p.close_button,
        get_url = p.get_url,
        send_url = p.send_url;

    var style = `<style>
        .cubes{
            font-size: 0;
        }
        .cubes th, .cubes td{
            font-size: 1rem;
            line-height: 50px;
            text-align: center;
            border: 1px solid #aaaaaa;
            cursor: pointer;
        }
        .cubes td.holiday{
            background-color: #ffcacb;
            border: 1px solid #ff9a9b;
        }
        .wait-border{
            position: absolute;
            top: 200px;
            left: 0;
            display: block;
            width: 100%;
            text-align: center;
        }
        .wait-label{
            display: inline-block;
            width: 120px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #aaaaaa;
            background-color: #ffffff;
            color: #000000;
            text-align: center;
        }
    </style>`,

        selects = $(`
            <div class="filter">
                <select class="form-control pull-left holiday-year" style="width:30%;"></select>
                <select class="form-control pull-right holiday-month" style="width:30%;"></select>
            </div>`),

        root = $(`
            <div style="width:100%;height:400px;padding:15px 0;clear:both;text-align:center;">
                <div class="cubes" style="display:inline-block;width:400px;height:360px;border:1px solid #aaaaaa;">
                    <table style="width:100%;"></table>
                </div>
            </div>`),

        head = `
            <thead>
                <tr>
                    <th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th>
                </tr>
            </thead>`,
        body = `
            <tbody>
                <tr>
                    <td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
                </tr>
                <tr>
                    <td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
                </tr>
                <tr>
                    <td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
                </tr>
                <tr>
                    <td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
                </tr>
                <tr>
                    <td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
                </tr>
                <tr>
                    <td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
                </tr>
            </tbody>`,
        wait_label = `
            <div class="wait-border">
                <span class="wait-label">
                    正在请求数据
                </span>
            </div>
        `;

    $('head').append(style);

    root.find('table').append(head)
        .append(body);
    node.empty().append(selects)
        .append(root);

    node.off('click').on('click', 'td[date]', function(event){
        var d = $(event.currentTarget);
        d.prop('holiday', !d.prop('holiday'))
            .toggleClass('holiday');
    });

    initialDays({
        yearSelect: $('.holiday-year'),
        monthSelect: $('.holiday-month')
    });
    function getHoliday(){

        node.append(wait_label);

        $.ajax({
            url: get_url,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true,
            data: JSON.stringify({
                attendance_year: node.find('.holiday-year').val(),
                attendance_month: node.find('.holiday-month').val()
            }),
            success: function(d){
                if (d[0].result){
                    node.find('.wait-label').remove();
                    fillHoliday(d[0].result)
                } else {
                    fillHoliday([])
                }
            },
            error: function(e){
                console.log(e);
                fillHoliday([]);
                alert('出错。')
            }
        })
    }
    function fillHoliday(p){

        root.find('table').empty()
            .append(head)
            .append(body);

        var arr = [];
        for (var i = 0; i < p.length; i++){
            arr.push(p[i].dayTime)
        }

        var year = node.find('.holiday-year').val(),
            month = parseInt($('.holiday-month').val()) >= 10 ? $('.holiday-month').val() : '0' + $('.holiday-month').val(),
            halfDate = year + '-' + month + '-';

        var firstDate = new Date(year,month - 1,'1'),
            lastDate = new Date(year,month,'0'),
            ds = node.find('.cubes').find('td'),
            beginDay = firstDate.getDay() - 1,
            l = lastDate.getDate();

        for (let i = 0; i < l; i++){
            let d = i > 8 ? i + 1 : '0' + (i + 1);
            $(ds[i + beginDay]).text(i + 1)
                .attr('date', halfDate + d);
            if (arr.indexOf(halfDate + d) > -1){
                $(ds[i + beginDay]).prop('holiday', true)
                    .addClass('holiday')
            }
        }
    }
    //fillHoliday(['2018-01-03','2018-01-05','2018-01-09','2018-01-20']);

    button.on('click', function(event){

        let arr = [];

        node.find('td').each(function(){

            if ($(this).prop('holiday')){
                arr.push($(this).attr('date'))
            }
        });

        if (arr.length === 0){
            alert('还没有选择假期。');
            return false
        }

        $.ajax({
            url: send_url,
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                attendance_year: node.find('.holiday-year').val(),
                attendance_month: node.find('.holiday-month').val(),
                holidays: arr
            }),
            success: function(d){
                if (d[0].result > 0){
                    alert('设置成功。');
                    try{
                        close_button.click();
                    } catch (e){}
                } else {
                    alert('操作失败')
                }
            },
            error: function(e){
                console.log(e);
                alert('操作失败。')
            }
        })
    });

    getHoliday();
    selects.off('change').on('change', '.holiday-month', getHoliday);
}

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

    //点击员工姓名切换列表内容
    $('#controls').on('click', '[jn]', function(event){
        console.log(oTableInit);
        let email = $(event.currentTarget).attr('jn');
        oTableInit.queryParams = function (params) {
            var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                //plan_title: $('#plan_title').val(),//项目主题-筛选
                //plan_owner: $('#plan_owner').val(),//客户公司-筛选
                //plan_start_time: $('#plan_start').val(),//客户经理-筛选
                //plan_end_time: $('#plan_end').val(),//查询期限-筛选
                login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                staff_email: email,
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
        //oTableInit.queryParams.staff_email = $(event.currentTarget).attr('jn');
        $("#datas").bootstrapTable('destroy');
        oTable.Init()
    })
        .on('click', '[fn]', function(event){

            var fn = $(event.currentTarget).attr('fn');
            console.log(fn);

            switch(fn){
                case 'holiday':
                    renderAboutHoliday({//待填充url
                        node: $('#holidays'),
                        get_url: realPath + '/attendance/monthHoliday',
                        send_url: realPath + '/attendance/monthHolidayAddOrUpdate',
                        button: $('#save_holiday'),
                        close_button: $('#close_holiday')
                    });
                    break;
                case 'count':
                    document.location.href = './attendanceTable.html';
                    break;
                case 'import':
                    break;
                case 'export':
                    break;
            }
        });

    //导入按钮
    $("#attendance").on("click", function(event){
        var option = {
            url: ""+realPath+"/attendance/ImportTxt",
            type: 'post',
            dataType:"json",
            clearForm: true,
            resetForm: true,
            success: function(data){

                if (data[0].result > 0){
                    alert('导入成功。')
                } else {
                    alert('操作失败。')
                }
            }
        };
        $("#excelImport").ajaxSubmit(option);
        $('#closeImport').click();
        return false;
    });


    var oTableInit = new Object();
    // 初始化Table

    window.operateEvents = {
        'click .morning_confirm' : function(e, value, row, index) {
            $.ajax({
                url: realPath + '/attendance/updateStatus',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    time_string: row.the_time_morning,
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
        'click .nightfall_confirm' : function(e, value, row, index) {
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
            $.ajax({
                url: realPath + '/attendance/updateStatus',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    time_string: row.the_time_nightfall,
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
        'click .update_mark': function(e, value, row, index){

            let t = $(e.currentTarget),
                time;

            if (t.hasClass('morning')){

                time = row.the_time_morning;
                var unusual_mark = value,
                    unusual_explain = row.unusual_explain_morning,
                    unusual_mark_old = row.unusual_mark_morning,
                    unusual_time_old = row.unusual_time_morning;

                $('#attendance_mark').val(unusual_mark);
                $('#attendance_time').val(unusual_time_old);
                $('#attendance_explain').val(unusual_explain)

            } else if (t.hasClass('nightfall')){

                time = row.the_time_nightfall;
                var unusual_mark = value,
                    unusual_explain = row.unusual_explain_morning,
                    unusual_mark_old = row.unusual_mark_nightfall,
                    unusual_time_old = row.unusual_time_morning;

                $('#attendance_mark').val(unusual_mark);
                $('#attendance_time').val(unusual_time_old);
                $('#attendance_explain').val(unusual_explain)
            }

            $('#save_mark').off('click')
                .on('click', function(event){
                    $.ajax({
                        url: realPath +'/attendance/updateRemark',
                        type: 'post',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify({
                            time_string: time,
                            old_mark: unusual_mark_old,
                            old_length: unusual_time_old,
                            unusual_mark: $('#attendance_mark').val(),
                            remark: $('#attendance_explain').val(),
                            unusual_time: $('#attendance_time').val()
                        }),
                        async: true,
                        success: function(d){
                            if (d[0].result === 'success'){
                                $("#datas").bootstrapTable('destroy');
                                oTable.Init();
                                $('#close_mark').click();
                                alert('提交成功。')
                            } else {
                                alert('提交失败')
                            }
                        },
                        error: function(e){
                            console.log(e);
                            alert('请求失败。')
                        }
                    })
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
                list_morning = ood[0].minPerson,
                list_nightfall = ood[0].maxPerson,
                list_detail = ood[0].today,
                staffs = ood[0].list,
                lm = list_morning.length,
                ln = list_nightfall.length,
                role = ood[0].role;

            for (let i = 0; i < lm; i++){

                rows[i] = {};//初始化一行的数据
                let timestamp = list_morning[i].attTime['time'],//时间戳
                    morning_time = list_morning[i].attTime,//时间对象
                    the_date = list_morning[i].attTime['date'];//date
                rows[i].hid = list_morning[i].staHaidon;
                rows[i].role = role;
                rows[i].the_time_morning = timestamp;//好像没用
                rows[i].day = new Date(timestamp).getDay();//day
                rows[i].date = (morning_time.year + 1990) + '-' + (morning_time.month + 1) + '-' + morning_time.date;//日期字符串
                rows[i].punching_card_morning = morning_time.hours + ':' + morning_time.minutes + ':' + morning_time.seconds;//时间字符串
                rows[i].unusual_explain_morning = list_morning[i].attRemark || '';
                rows[i].remark_confirm_morning = list_morning[i].attStatus;

                if (rows[i].remark_confirm_morning == 0 || rows[i].remark_confirm_morning == 3){

                    rows[i].unusual_mark_morning = list_morning[i].attUnusual;
                    rows[i].unusual_time_morning = list_morning[i].attLength;

                    //if (list_morning[i].attUnusual){//异常状态
                    //    rows[i].unusual_mark_morning = list_morning[i].attUnusual;//存在异常状态值,则直接取出
                    //} else {//否则按上班打卡时间判断是否迟到
                    //    if (morning_time.hours >=9){
                    //        rows[i].unusual_mark_morning = '迟到'
                    //    } else {
                    //        rows[i].unusual_mark_morning = '正常'
                    //    }
                    //}
                    //
                    //if (list_morning[i].attLength){
                    //    rows[i].unusual_time_morning = list_morning[i].attLength
                    //} else {
                    //    let hours_gap = (morning_time.hours - 9) * 60;
                    //    if (hours_gap <= 0){
                    //        let minutes_gap = morning_time.minutes;
                    //        rows[i].unusual_time_morning = hours_gap + minutes_gap
                    //    }
                    //}
                } else {
                    rows[i].unusual_mark_morning = list_morning[i].attUnusualTwo;
                    rows[i].unusual_time_morning = list_morning[i].attLengthTwo;
                }

                for (let j = 0; j < ln; j++){

                    if(list_nightfall[j]['attTime'].date === the_date){

                        let nightfall_time = list_nightfall[j]['attTime'],
                            timestamp_nightfall = nightfall_time.time;
                        rows[i].the_time_nightfall = timestamp_nightfall;//好像没用
                        rows[i].punching_card_nightfall = nightfall_time.hours + ':' + nightfall_time.minutes + ':' + nightfall_time.seconds;
                        rows[i].unusual_explain_nightfall = list_nightfall[j].attRemark || '';
                        rows[i].remark_confirm_nightfall = list_nightfall[j].attStatus;

                        if (rows[i].remark_confirm_nightfall == 0 || rows[i].remark_confirm_nightfall == 3){

                            rows[i].unusual_mark_nightfall = list_nightfall[j].attUnusual;
                            rows[i].unusual_time_nightfall = list_nightfall[j].attLength;

                            if (timestamp_nightfall === rows[i].the_time_morning){
                                if (nightfall_time.hours >= 12){
                                    rows[i].punching_card_morning = '';
                                    rows[i].unusual_time_morning = '-';
                                    rows[i].unusual_mark_morning = '未打卡'
                                } else {
                                    rows[i].punching_card_nightfall = '';
                                    rows[i].unusual_time_nightfall = '-';
                                    rows[i].unusual_mark_nightfall = '未打卡'
                                }
                            }

                            //if (list_nightfall[j].attUnusual){//异常状态
                            //    rows[i].unusual_mark_nightfall = list_nightfall[j].attUnusual;//存在异常状态值,则直接取出
                            //} else {//否则按下班打卡时间判断正常、早退还是加班
                            //    if (18 <= nightfall_time.hours && nightfall_time.hours <= 19){
                            //        rows[i].unusual_mark_nightfall = '正常'
                            //    } else {
                            //        if (nightfall_time.hours < 18){
                            //            rows[i].unusual_mark_nightfall = '早退'
                            //        } else if (nightfall_time.hours > 19){
                            //            rows[i].unusual_mark_nightfall = '加班'
                            //        }
                            //    }
                            //}
                            //
                            //if (list_nightfall[j].attLength){
                            //    rows[i].unusual_time_nightfall = list_nightfall[j][i].attLength
                            //} else {
                            //    let hours_gap = (18 - nightfall_time.hours) * 60,
                            //        hours_over = (nightfall_time.hours - 19) * 60;
                            //    if (hours_gap > 0){
                            //        let minutes_gap = 60 - nightfall_time.minutes;
                            //        rows[i].unusual_time_nightfall = hours_gap + minutes_gap
                            //    } else if (hours_over > 0){
                            //        let minutes_over = nightfall_time.minutes - 0;
                            //        rows[i].unusual_time_nightfall = hours_over + minutes_over
                            //    } else {
                            //        rows[i].unusual_time_nightfall = 0
                            //    }
                            //}
                        } else {
                            rows[i].unusual_mark_nightfall = list_nightfall[j].attUnusualTwo;
                            rows[i].unusual_time_nightfall = list_nightfall[j].attLengthTwo;
                        }
                        break;
                    }
                }
                for (let k = 0, lk = list_detail.length; k < lk; k++){
                    if (list_detail[k]['toTime'].date === the_date){
                        rows[i].detailId = list_detail[k].toId;
                        rows[i].deadline = list_detail[k].toEndTime;
                        rows[i].late_hours = list_detail[k].toLate;
                        rows[i].earlier = list_detail[k].toEarly;
                        rows[i].business = list_detail[k].toOut;
                        rows[i].leave = list_detail[k].toLeave;
                        rows[i].off = list_detail[k].toOff;
                        rows[i].overtime = list_detail[k].toOvertime;
                        rows[i].deposit = list_detail[k].toDeposit;
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
                            <a href="javascript: void(0);" fn="holiday" data-toggle="modal" data-target="#holiday">设置假期</a>
                            <a href="javascript: void(0);" fn="count">统计</a>
                            <a href="javascript: void(0);" fn="import" data-toggle="modal" data-target="#import">导入</a>
                            <a href="javascript: void(0);" fn="export">导出</a>
                        </th>`)
                }
                $('#controls').find('tbody').append(tr)
            }
            return {
                rows: rows
            }
        }

        var brief = {
            url: "" + realPath+ "/attendance/personalCheckIn",         // 请求后台的URL（*）
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
            field: 'day',
            title: '星期'
        }, {
            field: 'date',
            title: '日期',
            sortable: true
        }, {
            field: 'punching_card_morning',
            title: '上班时间'
        }, {
            field: 'unusual_mark_morning',
            title: '异常状态',
            align : 'center',
            formatter : function(value, row, index) {
                return "<a class=\"btn btn-xs btn-info update_mark morning\" data-toggle=\"modal\" data-target=\"#update_mark\" title=\"查看\" >"+ value +"</a>";
            },
            events : operateEvents
            //,
            //editable: {
            //    type: 'select',
            //    title: '异常状态',
            //    source:[
            //        {value:"正常",text:"正常"}
            //        ,{value:"迟到",text:"迟到"}
            //        ,{value:"早退",text:"早退"}
            //        ,{value:"外出",text:"外出"}
            //        ,{value:"请假",text:"请假"}
            //        ,{value:"调休",text:"调休"}
            //    ]
            //}
        }, {
            field: 'unusual_time_morning',
            title: '具体时长'
        }, {
            field: 'unusual_explain_morning',
            title: '异常说明'
        }, {
            field: 'remark_confirm_morning',
            title: '异常确认',
            align : 'center',
            formatter : function(value, row, index) {

                if (row.role == 0){

                    switch (value){

                        case '0':
                            return '<span>未修改</span>';
                        case '1':
                            return '<span>已提交</span>';
                        case '2':
                            return '<span>审核通过</span>';
                        case '3':
                            return '<span>未通过</span>';
                        default:
                            break;
                    }
                } else if (row.role == 1) {

                    switch (value){

                        case '0':
                            return '<span>无提交信息</span>';
                        case '1':
                            return '<a class="btn btn-xs btn-info morning_confirm" title="通过">通过<a>' +
                                '<a class="btn btn-xs btn-info morning_decline" title="拒绝">拒绝</a>';
                        case '2':
                            return '<span>已审核通过</span>';
                        case '3':
                            return '<span>已拒绝</span>';
                    }
                }
            },
            events : operateEvents
        }, {
            field: 'punching_card_nightfall',
            title: '下班时间'
        }, {
            field: 'unusual_mark_nightfall',
            title: '异常状态',
            align : 'center',
            formatter : function(value, row, index) {
                return "<a class=\"btn btn-xs btn-info update_mark nightfall\" data-toggle=\"modal\" data-target=\"#update_mark\" title=\"查看\" >"+ value +"</a>";
            },
            events : operateEvents
            //,
            //editable: {
            //    type: 'select',
            //    title: '异常状态',
            //    source:[
            //        {value:"正常",text:"正常"}
            //        ,{value:"迟到",text:"迟到"}
            //        ,{value:"早退",text:"早退"}
            //        ,{value:"外出",text:"外出"}
            //        ,{value:"请假",text:"请假"}
            //        ,{value:"调休",text:"调休"}
            //    ]
            //}
        }, {
            field: 'unusual_time_nightfall',
            title: '具体时长'
        }, {
            field: 'unusual_explain_nightfall',
            title: '异常说明'
        }, {
            field: 'remark_confirm_nightfall',
            title: '异常确认',
            align : 'center',
            formatter : function(value, row, index) {

                if (row.role == 0){

                    switch (value){

                        case '0':
                            return '<span>未修改</span>';
                        case '1':
                            return '<span>已提交</span>';
                        case '2':
                            return '<span>审核通过</span>';
                        case '3':
                            return '<span>未通过</span>';
                        default:
                            break;
                    }
                } else if (row.role == 1) {

                    switch (value){

                        case '0':
                            return '<span>无提交信息</span>';
                        case '1':
                            return '<a class="btn btn-xs btn-info nightfall_confirm" title="通过">通过<a>' +
                                '<a class="btn btn-xs btn-info nightfall_decline" title="拒绝">拒绝</a>';
                        case '2':
                            return '<span>已审核通过</span>';
                        case '3':
                            return '<span>已拒绝</span>';
                    }
                }
            },
            events : operateEvents
        }, {
            field: 'late_hours',
            title: '迟到'
        }, {
            field: 'earlier',
            title: '早退'
        }, {
            field: 'business',
            title: '外出'
        }, {
            field: 'leave',
            title: '请假'
        }, {
            field: 'off',
            title: '调休'
        }, {
            field: 'overtime',
            title: '加班'
        }, {
            field: 'deposit',
            title: '存假'
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