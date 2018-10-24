/**
 * Created by wangxiangyang on 2017/12/11.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

$(function () {

// 1.初始化Table
var oTable = new TableInit();
oTable.Init();

// 2.初始化Button的点击事件
var oButtonInit = new ButtonInit();
oButtonInit.Init();

// });
$('#project_search').on('click',function(){
    $("#datas").bootstrapTable('destroy');
    oTable.Init()
});
//绑定时间
$("#staff_list").change(function(){
	if($(this).children('option:selected').val()==""){
		$("#confirm1").removeAttr("disabled");  
		$("#confirm2").removeAttr("disabled");  
		$("#confirm3").removeAttr("disabled");  
		$("#confirm4").attr("disabled","disabled");   
	}else{
		$("#confirm1").attr("disabled","disabled"); 
		$("#confirm2").attr("disabled","disabled");  
		$("#confirm3").attr("disabled","disabled"); 
		$("#confirm4").removeAttr("disabled");  
	}
});
});
$('#project_add').on('click',function(){
    document.location.href = './quotationEdit.html';
});
window.operateEvents = {
    'click .read_btn' : function(e, value, row, index) {
        sessionStorage.setItem("quotationId", row.id);
        sessionStorage.setItem('method', 'readOnly');
        window.location.href = "/jfcpanel/html/jfc/project/quotationEdit.html";
    },
    'click .update_btn' : function(e, value, row, index) {
        sessionStorage.setItem("quotationId", row.id);
        sessionStorage.setItem('method', 'write');
        window.location.href = "/jfcpanel/html/jfc/project/quotationEdit.html";
    },
    'click .bell_btn' : function(e, value, row, index) {
        sessionStorage.setItem("quotationId", row.id);
        window.location.href = "/jfcpanel/html/jfc/project/quotationEdit.html";
    },
    'click .lunch_btn' : function(e, value, row, index) {
    	$('#confirm1').unbind("click");
    	$('#confirm2').unbind("click");
    	$('#confirm3').unbind("click");
    	$('#confirm4').unbind("click");
    	$('#confirm1').one('click', confirm);
    	$('#confirm2').one('click', confirm2);
    	$('#confirm3').one('click', confirm);
    	$('#confirm4').one('click', confirm4);
        let id = row.id,
            number = row.project_number;
        	taskId = row.taskId;
        function confirm2(){
        	sessionStorage.setItem("quotationId", id);
            window.location.href = "/jfcpanel/html/jfc/project/quotationEdit.html";
        }
        function confirm4(){
        	if(taskId==null||taskId==''){
        		alert("没有此任务");
        		return;
        	}
            var to_send = {
                proId: id,
                nominee: $("#staff_list").children('option:selected').val(),
                outcome:$(this).html(),
                taskId:taskId
            };
            $.ajax({
                url: realPath + '/workflow/submitTask',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(to_send),
                async: true,
                success: function(data){
                	 $("#datas").bootstrapTable('destroy');
                	    oTable.Init()
                    /*if (data[0].result > 0){

                    } else {
                        $('#confirm').one('click', confirm)
                    }*/
                },
                error: function(e){
                    $('#confirm').one('click', confirm)
                }
            })
        }
        function confirm(){
        	if(taskId==null&&taskId==''){
        		alert("没有此任务");
        		return;
        	}
            var to_send = {
                proId: id,
                nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName,
                outcome:$(this).html(),
                taskId:taskId
            };
            $.ajax({
                url: realPath + '/workflow/submitTask',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(to_send),
                async: true,
                success: function(data){
                	 $("#datas").bootstrapTable('refresh');  
                    /*if (data[0].result > 0){

                    } else {
                        $('#confirm').one('click', confirm)
                    }*/
                },
                error: function(e){
                    $('#confirm').one('click', confirm)
                }
            })
        }

        $.ajax({
            url: realPath + '/quote/init',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(data){
                let appoint = $('#appoint'),
                    node = `<option value="">请选择</option>`,
                    list = data[0].jfcStaff,
                    len = list.length,
                    i;
                for (i = 0; i < len; i++){
                    node += `<option value="`+ list[i].staName +`">`+ list[i].staName +`</option>`
                }
                $('#staff_list').html(node);
                $('#confirm').one('click', confirm)
            },
            error: function(e){}
        })
    }
};

var TableInit = function() {
	var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function () {
        $('#datas').bootstrapTable({
            url: "" + realPath+ "/quote/search",         // 请求后台的URL（*）
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
            columns: [{
                field: 'id',
                title: 'ID'
            }, {
                field: 'taskId',
                title: '任务号'
            }, {
                field: 'status',
                title: '报价状态'
            }, {
                field: 'createTime',
                title: '报价时间'
            }, {
                field: 'staName',
                title: '客户经理',
                sortable: true
            }, {
                field: 'project_number',
                title: '项目编号'
            }, {
                field: 'quoTheme',
                title: '项目主题',
                sortable: true
            }, {
                field: 'quoIndustry',
                title: '研究行业',
                visible: false
            }, {
                field: 'area',
                title: '区域',
                visible: false
            }, {
                field: 'qnrType',
                title: '项目类型',
                visible: false
            }, {
                field: 'audienceOrRespondent',
                title: '调查对象',
                visible: false
            }, {
                field: 'sample',
                title: '样本配额',
                visible: false
            }, {
                field: 'deliverables',
                title: '项目成果',
                visible: false
            }, {
                field: 'currency',
                title: '币种',
                visible: false
            }, {
                field: 'total',
                title: '总价'
            }, {
                field: 'comName',
                title: '客户公司',
                sortable: true
            }, {
                field: 'comType',
                title: '客户类型',
                visible: false
            }, {
                field: 'liaName',
                title: '客户联系人'
            }, {
                field: 'liaPhone',
                title: '客户联系方式'
            }, {
                field: 'comEmail',
                title: '客户邮箱',
                visible: false
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
                field : 'control',
                title : '操作',
                align : 'center',
                formatter : function(value, row, index) {
                	var a='',b='',c;
                	if(row.status=="确认立项"){
                		a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>";
                		c = "<a class=\"btn btn-xs btn-success bell_btn\" data-toggle=\"modal\" title=\"下载\" ><i class=\"glyphicon glyphicon-download\"></i></a>";
                	}else{
                		b = "<a class=\"btn btn-xs btn-warning  lunch_btn\" data-toggle=\"modal\" data-target=\"#appoint\" title=\"项目启动\" ><i class=\"glyphicon glyphicon-bell\"></i></a>";
                		a = "<a class=\"btn btn-xs btn-info read_btn\" data-toggle=\"modal\" title=\"查看\" ><i class=\"glyphicon glyphicon-eye-open\"></i></a>";
                		c = "<a class=\"btn btn-xs btn-success bell_btn\" data-toggle=\"modal\" title=\"下载\" ><i class=\"glyphicon glyphicon-download\"></i></a>";
                	}
                    return a+b+c;
                },
                events : operateEvents
            }],
            onEditableSave: function (field, row, oldValue, $el) {
                $.ajax({
                    type: "post",
                    url: realPath + '/quote/remark',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify({
                        quoId: row.id,
                        remark: row.remark
                    }),
                    dataType: 'JSON',
                    success: function (data, status) {
                        var res = data[0]['result'];
                        if (res > 0){
                            $("#list").bootstrapTable('destroy');
                            oTable.Init();
                            alert('修改信息成功');
                        } else {
                            alert('修改信息失败,请重试')
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        alert('修改信息失败,请稍后重试')
                    }
                });
            },
            responseHandler: function(ood){
                let res = ood[0],
                    data = {};
                data.total = res.total;
                data.rows = [];
                var task =res.task;
                function MakeRow(row){
                    this.id = row['detailList'].quoId;//id
                    /**
                     * 循环task
                     */
                    for(var i = 0;i<task.length;i++){
                    	if(parseInt(task[i].quoId)===row['detailList'].quoId){
                    		this.taskId = task[i].taskId;
                    		break;
                    	}
                    }
                    switch (row.status){//报价状态

                        case '1':
                            this.status = '无效';
                            break;
                        case '2':
                            this.status = '再次报价';
                            break;
                        case '3':
                            this.status = '待确认';
                            break;
                        case '4':
                            this.status = '确认立项';
                            break;
                        case '5':
                            this.status = '已通过';
                            break;
                        default:
                            this.status = '-';
                            break;
                    }

                    if (row.createTime){//创建报价时间

                        var timeString = '';
                        timeString += (row.createTime.year + 1900)
                            + '-' + (row.createTime.month>=9 ? row.createTime.month + 1 : '0' + row.createTime.month + 1)
                            + '-' + row.createTime.date
                            + ' ' + row.createTime.hours
                            + ':' + row.createTime.minutes
                            + ':' + row.createTime.seconds;

                        this.createTime = timeString

                    } else {
                        this.createTime = '-'
                    }

                    this.staName = row['jfcStaff'].staName || '-';//客户经理
                    this.project_number = row.project_number || '-';//项目编号
                    this.quoTheme = row.quoTheme ||'-';//项目主题
                    this.quoIndustry = row.quoIndustry || '-';//研究行业
                    try{
                        this.area = row['detailList'].area || '-';//区域
                        this.qnrType = row['detailList'].qnrType;//项目类型
                        this.audienceOrRespondent = row['detailList'].audienceOrRespondent;//调查对象
                        this.sample = row['detailList'].sample;//样本配额
                        this.deliverables = row['detailList'].deliverables;//项目成果
                    } catch(e){}
                    this.currency = row.currency || '-';//币种
                    this.total = row.total || '-';//总价
                    this.comName = row['cusCompany'].comName || '-';//客户公司
                    this.comType = row['cusCompany'].comType || '-';//客户类型
                    this.liaName = row['cusLiaison'].liaName || '-';//客户联系人
                    this.liaPhone = row['cusLiaison'].liaPhone || row['cusLiaison'].liaTel || '-';//客户联系方式
                    this.comEmail = row['cusLiaison'].comEmail || '-';//客户邮箱
                    this.remark = row.remark || '-';
                }

                for (let i = 0, l = res.rows.length; i < l; i++){
                    data.rows.push(new MakeRow(res.rows[i]))
                }
                return data;
            }
        });
    };

    // 得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            project_title: $('#project_title').val(),//项目主题-筛选
            project_client: $('#project_client').val(),//客户公司-筛选
            project_manager: $('#project_manager').val(),//客户经理-筛选
            project_during: $('#project_during').val(),//查询期限-筛选
            email:JSON.parse(sessionStorage.getItem('sysUser')).email,
            userName:JSON.parse(sessionStorage.getItem('sysUser')).userName,
            limit: params.limit,   // 页面大小
            offset: params.offset,  // 页码
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
