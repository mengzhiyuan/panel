/**
 * Created by wangxiangyang on 2017/12/21.
 */
//构造数据结构

const buildBudget = {

    budgetVue: {},//vue对象的位置

    budgetData: {//数据格式

        budgets: [
            {
                category: 'operatingCost',
                type: '',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'travelExpenses',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'tableMoney',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'supportCosts',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'cashGift',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'serviceCharge',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'agentFee',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'qualityControl',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            },{
                category: 'cashCost',
                type: 'unpredictableCosts',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [{
                    index: '',
                    supplementary: 0
                }],
                finalAccount: 0,
                surplus: 0,
                remark1: '',
                remark2: ''
            }
        ],
        sum: {
            budget: 0,
            supplementaryBudget: [
                {
                    index: '',
                    supplementary: 0
                }
            ],
            finalAccount: 0,
            surplus: 0
        },
        sample: {
            budget: 0,
            supplementarySample: [
                {
                    index: '',
                    supplementary: 0
                }
            ],
            finalAccount: 0,
            surplus: 0
        },
        average: {
            budget: 0,
            supplementaryAverage: [
                {
                    index: '',
                    supplementary: 0
                }
            ],
            finalAccount: 0,
            surplus: 0
        }
    },
    budgetMethods: {//vue方法对象

        insertAfter: function(obj){

            let newObj = {
                category: '',
                type: '',
                kind: '',
                brief: '',
                budget: 0,
                supplementaryBudget: [],
                finalAccount: 0,
                surplus: 0,
                remark1: 0,
                remark2: 0
            };
            newObj.category = obj.category;
            newObj.type = obj.type;

            for (let i = 0, l = obj.supplementaryBudget.length; i < l; i++){
                newObj.supplementaryBudget.push({
                    index: '',
                    supplementary: 0
                })
            }

            this.budgets.splice(this.budgets.indexOf(obj) + 1, 0, newObj);
            setTimeout(function(){
                $('.selectpicker').selectpicker('refresh');
            },50)
        },
        deleteThis: function(obj){
            this.budgets.splice(this.budgets.indexOf(obj), 1);
            setTimeout(function(){
                $('.selectpicker').selectpicker('refresh');
            },50)
        },
        addBudget: function(obj){
            let index = this.sum.supplementaryBudget.indexOf(obj);
            this.sum.supplementaryBudget.splice(index + 1, 0, {index: '', supplementary: 0});
            this.sample.supplementarySample.splice(index + 1, 0, {index: '', supplementary: 0});
            this.average.supplementaryAverage.splice(index + 1, 0, {index: '', supplementary: 0});

            for (let i = 0, l = this.budgets.length; i < l; i++){
                this.budgets[i].supplementaryBudget.splice(index + 1, 0, {index: '', supplementary: 0})
            }

            //同步增加审批信息
            let examines = $('#examine').find('.supplementary');

            $(`<tr class="supplementary">
                        <td>追加预算</td>
                        <td><input id="applicant_signature_supplementary" type="text" class="input applicant_input" placeholder="请输入申请人姓名"></td>
                        <td class="time_supplementary"></td>
                        <td>
                            <span id="manager_supplementary" class="signature_area"></span>
                            <button class="btn btn-sm btn-success manager_button">经理签名</button>
                        </td>
                        <td>
                            <span id="director_supplementary" class="signature_area"></span>
                            <button class="btn btn-sm btn-info director_button">总监签名</button>
                        </td>
                        <td class="time_manager"></td>
                        <td class="time_director"></td>
                    </tr>`).insertAfter($(examines[index]));

            projectApproval.approvalInit();
        },
        deleteBudget: function(obj){
            let index = this.sum.supplementaryBudget.indexOf(obj);
            this.sum.supplementaryBudget.splice(index, 1);
            this.sample.supplementarySample.splice(index, 1);
            this.average.supplementaryAverage.splice(index, 1);

            for (let i = 0, l = this.budgets.length; i < l; i++){
                this.budgets[i].supplementaryBudget.splice(index, 1)
            }

            //同步删除审批信息
            let examines = $('#examine').find('.supplementary');

            $(examines[index]).remove();
        },
        getSum: function(arr,key,index){

            let sum = 0;

            for (let i = 0, l = arr.length; i < l; i++){
                sum += index > -1 ? parseFloat(arr[i][key][index].supplementary) : parseFloat(arr[i][key])
            }
            return sum
        },
        changeKind: function(item,event){
            item.kind = $(event.currentTarget).val();
            $(event.currentTarget).selectpicker('refresh');
        },
        changeRemark1: function(item,event){
            item.remark1 = $(event.currentTarget).val();
            $(event.currentTarget).selectpicker('refresh');
        },
        changeRemark2: function(item,event){
            item.remark2 = $(event.currentTarget).val();
            $(event.currentTarget).selectpicker('refresh');
        }
    },
    buildFunc: function(){//vue生成方法

        this.budgetVue = new Vue({
            el: '#about_budget',
            data: this.budgetData,
            methods: this.budgetMethods,
            watch: {
                budgets: {
                    handler: function(val,old){
                        this.sum.budget = this.getSum(this.budgets, 'budget');

                        for (let i = 0, l = this.sum.supplementaryBudget.length; i < l; i++){
                            this.sum.supplementaryBudget[i].supplementary = this.getSum(this.budgets, 'supplementaryBudget', i)
                        }
                    },
                    deep: true
                },
                sum: {
                    handler: function(val,old){
                        this.average.budget = this.sample.budget > 0 ? this.sum.budget / this.sample.budget : '';

                        for (let i = 0, l = this.sum.supplementaryBudget.length; i < l; i++){
                            this.average.supplementaryAverage[i].supplementary = this.sample.supplementarySample[i].supplementary > 0 ? this.sum.supplementaryBudget[i].supplementary / this.sample.supplementarySample[i].supplementary : ''
                        }
                        var total = 0;
                        total += parseFloat((this.sum.budget));
                        for (var i = 0; i < this.sum.supplementaryBudget.length; i++){
                            total += parseFloat(this.sum.supplementaryBudget[i].supplementary)
                        }
                        $('#info_budgetary_cost').val(total)
                    },
                    deep: true
                },
                sample: {
                    handler: function(val,old){
                        this.average.budget = this.sample.budget > 0 ? this.sum.budget / this.sample.budget : '';

                        for (let i = 0, l = this.sum.supplementaryBudget.length; i < l; i++){
                            this.average.supplementaryAverage[i].supplementary = this.sample.supplementarySample[i].supplementary > 0 ? this.sum.supplementaryBudget[i].supplementary / this.sample.supplementarySample[i].supplementary : ''
                        }
                    },
                    deep: true
                }
            }
        })
    }

    //申请人相关

};