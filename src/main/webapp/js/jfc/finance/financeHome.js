/**
 * Created by wangxiangyang on 2018/3/7.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const finance_data = {
    applied: {number: 0, link: ''},
    replied: {number: 0, link: ''},
    already_paid: {number: 0, link: ''},
    to_pay: {number: 0, link: ''},
    gap: {number: 0, link: ''},
    list: [
        {
            id: '',
            applicant: '',
            summer: '',//汇总人
            type: '',//费用类型
            project_number: '',//项目编号
            project_name: '',//项目名称
            project_status: '',//项目状态
            project_manager: '',//项目经理
            budget_amount: '',//预算金额
            completed_amount: '',//完成金额
            budget_cost: '',//预算成本
            final_cost: '',//决算成本
            apply_amount: '',//申请金额
            reply_amount: '',//批复金额
            paid: '',//已支付
            paying: '',//待支付
            gap_amount: '',//差额
            remark: ''//备注
        }
    ]
};
const finance_methods = {};
const finance_created = function(){
    let self = this;
    $.ajax({
        url: realPath + '/finance/financeList',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        async: true,
        data: JSON.stringify({
            nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName,
            applicant: JSON.parse(sessionStorage.getItem('sysUser')).id,
            email: JSON.parse(sessionStorage.getItem('sysUser')).email//登录邮箱
        }),
        success: function(data){

            if (data[0].finList.length === 0 ){
                alert('你没有权限。');
                return false;
            }

            var rows = [],
                list = ood[0].finList,
                gatherer = ood[0].listStaff,
                tasks =  ood[0].actRuTask,
                applying = 0,
                replied = 0,
                paid = 0,
                paying = 0,
                gap = 0,
                str = ``;

            for (let i = 0, l = list.length; i < l; i++){

                rows[i] = {
                    id: list[i].finId,
                    applicant: list[i].finApplicant,
                    summer: list[i].finSummary,//汇总人
                    type: list[i].finType,//费用类型
                    project_number: list[i].proNumber,//项目编号
                    project_name: list[i].proName,//项目名称
                    project_status: 0,//项目状态
                    project_manager: list[i].staId,//项目经理
                    budget_amount: list[i].infoSumMoney,//预算金额
                    completed_amount: list[i].accActualAmount,//完成金额
                    budget_cost: list[i].infoBudgetaryCost,//预算成本
                    final_cost: list[i].accFinalCost,//决算成本
                    apply_amount: list[i].finAppingAmount,//申请金额
                    reply_amount: list[i].finAppingReplied,//批复金额
                    paid: list[i].finPaid,//已支付
                    paying: list[i].finPaying,//待支付
                    gap_amount: '',//差额
                    remark: list[i].finRemark//备注
                };//初始化一行的数据
                for (let j = 0; j < gatherer.length; j++){
                    if (gatherer[j].staId == rows[i].applicant){
                        rows[i].applicant = gatherer[j].staName
                    }
                    if (gatherer[j].staId == rows[i].summer){
                        rows[i].summer = gatherer[j].staName
                    }
                }
                for (let k = 0; k < tasks.length; k++){
                    if (tasks[k].finId == rows[i].id){
                        rows[i].taskId = tasks[k].id;
                        rows[i].project_status = tasks[k].name;
                    }
                }
                applying += rows[i].apply_amount;
                replied += rows[i].reply_amount;
                paid += rows[i].paid;
                paying += rows[i].paying;
                gap += rows[i].gap_amount;
            }

            self['applied'].number = applying;
            self['replied'].number = replied;
            self['already_paid'].number = paid;
            self['paying'].number = paying;
            self['gap'].number = gap;

            self.list = rows
        },
        error: function(e){}
    })
};
const finance_vm = new Vue({
    el: '#root',
    data: finance_data,
    methods: finance_methods,
    created: finance_created
});