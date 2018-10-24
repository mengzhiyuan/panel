/**
 * Created by wangxiangyang on 2018/2/8.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const bonus_data = {
    bonId: '',
    proId: '',
    about_project: {
        project_id: '',//id
        project_name: '',//项目名称
        budgeted_performance: '',//预算完成项目额
        final_performance: '',//实际完成项目额
        budgeted_cost: '',//预算成本
        final_cost: '',//决算成本
        gross_profit: '',//毛利润
        bonus_account: '',//项目奖金
        project_bonus: '',//项目奖金
        sell_bonus: ''//销售奖金
    },
    staffs: [{
        staId: '0',
        staName: '请选择'
    }],
    project_evaluation: {
        signature: '',//签名
        completing_director: '',//完成评价——主管
        completing_remark: '',//完成评价——说明
        cost_director: '',//成本评价——主管
        cost_remark: '',//成本评价——说明
        quality_director: '',//质量评价——主管
        quality_remark: '',//质量评价——说明
        overall_director: '',//总体评价——主管
        overall_remark: '',//总体评价——说明
        project_bonus_paying: '',//项目奖金发放计划
        sell_bonus_paying: ''//销售奖金发放计划
    },
    ratios: {
        manager: {
            id: '',//员工id
            name: '',//员工姓名
            duty: '项目经理PM',//项目岗位
            job: '',//人员类型
            budget_cost: '',//预算
            final_cost: '',//决算
            manage: '',//项目金额-管理
            work: '',//项目金额-工作
            summarise: '',//项目金额-合计
            work_quantity: '',//工作量分值
            work_efficiency: '',//工作效率分值
            work_attitude: '',//工作态度分值
            ratio: ''//奖金分配比例
        },
        members: [{
            id: '0',
            name: '',
            duty: '',
            job: '',
            budget_cost: '',
            final_cost: '',
            manage: '',
            work: '',
            summarise: '',
            work_quantity: '',
            work_efficiency: '',
            work_attitude: '',
            ratio: ''
        }],
        sum: {

            manage: '',
            work: '',
            summarise: '',
            work_quantity: '',
            ratio: '',
            bonus_total: '',
            percents_manage: '',
            percents_work: ''
        }
    }
},
    bonus_methods = {
        getSum: function(arr,key){

            let sum = 0;

            for (let i = 0, l = arr.length; i < l; i++){
                sum += (parseFloat(arr[i][key]) || 0)
            }
            return sum
        },
        getNameViaId: function (event,m){
            m.name = $(event.currentTarget).find('option:selected').text();
        },
        insertAfter: function (m){
            this.ratios.members.splice(this.ratios.members.indexOf(m) + 1, 0, {
                id: '0',
                name: '',
                duty: '',
                job: '',
                budget_cost: '',
                final_cost: '',
                manage: '',
                work: '',
                summarise: '',
                work_quantity: '',
                work_efficiency: '',
                work_attitude: '',
                ratio: ''
            })
        },
        inputName: function (m){
        	m.id = '0'
        },
        deleteThis: function (m){
            if (this.ratios.members.length <= 1) return;
            this.ratios.members.splice(this.ratios.members.indexOf(m), 1)
        },
        submit: function (event){
            $.ajax({
                url: realPath + '/progres/bonusAdd',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(bonus_data),
                success: function (data){
                    if (data[0].result){
                        console.log(data[0].result)
                    } else {
                        console.log(data);
                        alert('请求失败。')
                    }
                },
                error: function (e){
                    console.log(e);
                    alert('操作失败。')
                }
            })
        }
    },
    bonus_mounted = function(){

        let self = this;

        $.ajax({
            url: realPath + '/progres/bonusinit',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                proId: sessionStorage.getItem('proId')
            }),
            success: function (data){

                try {

                    if (data[0].bonusss && data[0].bonusss[0]){

                        let bonds = data[0].bonusss[0];

                        self.proId = bonds.proId;
                        self.bonId = bonds.bonId;
                        self.about_project = JSON.parse(bonds.aboutProject)[0];
                        self.project_evaluation = JSON.parse(bonds.projectEvaluation)[0];
                        self.ratios = JSON.parse(bonds.ratios)[0];
                        self.staffs = data[0].jfcStaff;

                    } else {

                        let manager = data[0].proProject[0].jfcStaff,
                            staffs = data[0].jfcStaff,
                            somes = data[0].proBudget[0],
                            acs = data[0].account[0];

                        self['ratios'].manager.id = manager.staId;
                        self['ratios'].manager.name = manager.staName;
                        self['ratios'].manager.job = '正式';

                        self['about_project'].project_id = somes.infoProId;
                        self.proId = somes.infoProId;
                        self['about_project'].project_name = somes.infoProName;//wait
                        self['about_project'].budgeted_performance = somes.infoSumMoney;
                        self['about_project'].final_performance = acs.accActualAmount;
                        self['about_project'].budgeted_cost = somes.infoBudgetaryCost;
                        self['about_project'].final_cost = acs.accFinalCost;
                        self['about_project'].gross_profit = acs.accGrossProfit;
                        self['about_project'].bonus_account = acs.accProjectBonus;

                        for (let i = 0, l = staffs.length; i < l; i++){
                            self.staffs.push({
                                staId: staffs[i].staId,
                                staName: staffs[i].staName
                            })
                        }

                    }

                } catch (e){
                    console.log(e);
                    alert('请求失败。')
                }
            },
            error: function (e){
                console.log(e);
                alert('操作失败。')
            }
        })
    },
    bonus_computed = {
        overall_computed: function(){

            let e = this.project_evaluation,
                c = parseFloat(e.completing_director),
                t = parseFloat(e.cost_director),
                q = parseFloat(e.quality_director),
                s = c * (t + q) / 2 || '';

            e.overall_director = s;

            return s
        },
        percents_manage_computed: function(){
            let m = parseFloat(this.ratios.sum.manage),
                s = parseFloat(this.ratios.sum.summarise),
                p = (m / s) ? (((m / s) / 100) + '%') : '';
            this.ratios.sum.percents_manage = p;
            return p
        },
        percents_work_computed: function(){
            let w = parseFloat(this.ratios.sum.work),
                s = parseFloat(this.ratios.sum.summarise),
                p = (w / s) ? (((w / s) / 100) + '%') : '';
            this.ratios.sum.percents_work = p;
            return p
        },
        manage_sum_computed: function(){
            let s = this.ratios.manager.manage || 0;

            s += this.getSum(this.ratios.members, 'manage');

            this.ratios.sum.manage = s;
            return s
        },
        work_sum_computed: function(){
            let s = this.ratios.manager.work || 0;

            s += this.getSum(this.ratios.members, 'work');

            this.ratios.sum.work = s;
            return s
        },
        summarise_sum_computed: function(){
            let s = this.ratios.manager.summarise || 0;

            s += this.getSum(this.ratios.members, 'summarise');

            this.ratios.sum.summarise = s;
            return s
        },
        percents_work_quantity_sum_computed: function(){
            let s = this.ratios.manager.work_quantity || 0;

            s += this.getSum(this.ratios.members, 'work_quantity');

            this.ratios.sum.work_quantity = s;
            return s
        },
        percents_ratios_sum_computed: function(){
            let s = this.ratios.manager.ratio || 0;

            s += this.getSum(this.ratios.members, 'ratio');

            this.ratios.sum.ratio = s;
            return s
        }
    },
    bonus_vm = new Vue({
        el: '#bonus',
        data: bonus_data,
        computed: bonus_computed,
        mounted: bonus_mounted,
        methods: bonus_methods,
        watch: {}
    });