/**
 * Created by wangxiangyang on 2017/12/5.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
var keys_id = sessionStorage.getItem('quotationId'),
    method = sessionStorage.getItem('method');


$(window).on('unload', function(){
    sessionStorage.removeItem('quotationId');
});

if (!keys_id){

    const quotationData = {
        quoId: null,
        client_company_id: '',//客户识别符---
        client_company: '',//客户公司
        client_type: '',//客户类型(选择)
        client_linkman: '',//客户联系人
        client_contact: '',//客户联系方式
        client_email: '',//客户邮箱
        receipt_time: '',//接收需求时间
        project_title: '',//项目名称或主题
        project_industry: '',//研究行业(选择)
        account_manager_id: '',//客户经理识别符
        account_manager_name: '',//客户经理姓名
        account_manager_contact: '',//客户经理联系方式
        account_manager_email: '',//客户经理邮箱
        send_quotation_time: '',//发送报价时间
        sample_total: 0,//样本总量
        userName:JSON.parse(sessionStorage.getItem('sysUser')).userName,
        email:JSON.parse(sessionStorage.getItem('sysUser')).email,
        total: 0,
        currency: '',//币种
        project_detail: [
            {
                area: '',//区域
                method: '',//调查方式
                qnr_type: '',//问卷形式
                during: 0,//问卷长度
                audience_or_respondent: '',//调查对象
                sample: 0,//样本配额量
                other_requirement: '',//其他
                deliverables: ''//项目成果
            }
        ],
        project_list: {
            manage_fee_rate: '0',
            tax_fee_rate: 0.06,
            brief:[
                {
                    project_manage_fee: 0,
                    tax_fee: 0,
                    total_cost: 0,
                    sample_number: 0,
                    unit_cost: 0,
                    city_list: '',
                    timeline: ''
                }
            ],
            quotation_list: [
                {
                    key: 1,
                    remark: "",
                    name: "recruitment",
                    cn_name: '召募',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 2,
                    remark: "",
                    name: "interview",
                    cn_name: '访问',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 3,
                    remark: "",
                    name: "incentive",
                    cn_name: '礼金',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 4,
                    remark: "",
                    name: "data_entry",
                    cn_name: '录入',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 5,
                    remark: "",
                    name: "facility_normal_fgd",
                    cn_name: '会议室-普通',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 6,
                    remark: "",
                    name: "facility_fv_fgd",
                    cn_name: '会议室-FV',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 7,
                    remark: "",
                    name: "location_rent",
                    cn_name: '场地租赁',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 8,
                    remark: "",
                    name: "equipment_rent",
                    cn_name: '设备租赁',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 9,
                    remark: "",
                    name: "printing_cost",
                    cn_name: '印刷费',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 10,
                    remark: "",
                    name: "food_respondent",
                    cn_name: '食品费-被访者',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 11,
                    remark: "",
                    name: "food_client",
                    cn_name: '食品费-客户',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 12,
                    remark: "",
                    name: "moderator",
                    cn_name: '主持人',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 13,
                    remark: "",
                    name: "transcript_chinese",
                    cn_name: '笔录-中文',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 14,
                    remark: "",
                    name: "transcript_english",
                    cn_name: '笔录-英文',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 15,
                    remark: "",
                    name: "simultaneous_translation",
                    cn_name: '同传',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 16,
                    remark: "",
                    name: "material_translation",
                    cn_name: '材料翻译',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 17,
                    remark: "",
                    name: "accompany",
                    cn_name: '陪同访问',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 18,
                    remark: "",
                    name: "coding_chinese",
                    cn_name: '编码-中文',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 19,
                    remark: "",
                    name: "programming",
                    cn_name: '编程',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 20,
                    remark: "",
                    name: "traveling",
                    cn_name: '交通费用',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 21,
                    remark: "",
                    name: "qc",
                    cn_name: '质控',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 22,
                    remark: "",
                    name: "postal_fee",
                    cn_name: '快递费',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 23,
                    remark: "",
                    name: "vid_aud_mat",
                    cn_name: '材料费',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 24,
                    remark: "",
                    name: "briefing",
                    cn_name: '培训费',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 25,
                    remark: "",
                    name: "content_analysis",
                    cn_name: '研究分析',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 26,
                    remark: "",
                    name: "reporting",
                    cn_name: '研究报告',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                },{
                    key: 27,
                    remark: "",
                    name: "others",
                    cn_name: '其他',
                    allocate: [
                        {
                            unit: 0,
                            number: 0,
                            total: 0
                        }
                    ]
                }
            ]
        },
        timeline: [//项目周期进度
            {
                duration: 1,//周数
                expected: 1,//进度预估
                perCity: '',
                total: 0
            },{
                duration: 2,
                expected: 2,
                perCity: '',
                total: 0
            },{
                duration: 3,
                expected: 3,
                perCity: '',
                total: 0
            },{
                duration: 4,
                expected: 4,
                perCity: '',
                total: 0
            }
        ]
    };
    createVue(quotationData);

} else {

    $.ajax({
        url: realPath+ "/quote/quoteUpdateSearch",
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({quoId: keys_id}),
        success: function(d){

            var data = d[0].result[0],
                sortedData = {};

            sortedData.quoId = data.quoId;
            sortedData.client_company_id = data.liaId;
            sortedData.client_company = data['cusCompany'].comName;
            sortedData.client_type = data['cusCompany'].comType;
            sortedData.client_linkman = data['cusLiaison'].liaName;
            sortedData.client_contact = data['cusLiaison'].liaPhone;
            sortedData.client_email = data['cusLiaison'].liaEmail;
            if (data.receiptTime){

                let timeString = '',
                    t = data.receiptTime;

                timeString += (t.year + 1900) + '-'
                    + (t.month + 1) + '-'
                    + t.date
                    + ' '
                    + t.hours + ':'
                    + t.minutes + ':'
                    + t.seconds;

                sortedData.receipt_time = timeString;
            }
            sortedData.project_title = data.quoTheme;
            sortedData.project_industry = data.quoIndustry;
            sortedData.account_manager_id = data['jfcStaff'].staId;
            sortedData.account_manager_name = data['jfcStaff'].staName;
            sortedData.account_manager_contact = data['jfcStaff'].staPhone || data['jfcStaff'].staTel;
            sortedData.account_manager_email = data['jfcStaff'].staEmail;
            if (data.sendTime){

                let timeString = '',
                    t = data.sendTime;

                timeString += (t.year + 1900) + '-'
                    + (t.month + 1) + '-'
                    + t.date
                    + ' '
                    + t.hours + ':'
                    + t.minutes + ':'
                    + t.seconds;

                sortedData.send_quotation_time = timeString;
            }
            sortedData.sample_total = data.sampleTotal;
            sortedData.total = data.total;
            sortedData.currency = data.currency;
            sortedData.project_detail = [];

            for (var i = 0, l = data.detail.length; i < l; i++){
                sortedData.project_detail.push({
                    area: data.detail[i].area,//区域
                    method: data.detail[i].method,//调查方式
                    qnr_type: data.detail[i].qnrType,//问卷形式
                    during: data.detail[i].during,//问卷长度
                    audience_or_respondent: data.detail[i].audienceOrRespondent,//调查对象
                    sample: data.detail[i].sample,//样本配额量
                    other_requirement: data.detail[i].otherRequirement,//其他
                    deliverables: data.detail[i].deliverables//项目成果
                })
            }

            sortedData.project_list = JSON.parse(data.quoEstimate)[0];
            sortedData.timeline = JSON.parse(data.quoProject);



            createVue(sortedData);
            if (method == 'readOnly'){
                $('input').prop('disabled', true);
                $('select').prop('disabled', true);
                $('button').prop('disabled', true);
            }
            //if (keys_auth[1]){
            //    let examine = $(`<div></div>`),
            //        decline = $(`<button class="btn btn-sm btn-warning">打回</button>`),
            //        approach = $(`<button class="btn btn-sm btn-success">通过</button>`);
            //    $('body').append(examine);
            //    examine.append(decline)
            //        .append(approach);
            //
            //    decline.on('click',function(event){});
            //    approach.on('click',function(event){})
            //
            //}
        },
        error: function(e){
            console.log(e)
        }
    })
}

function createVue(quotationData){
    const quotationVue = new Vue({
        el: '#main',
        data: quotationData,
        mounted: function(){
        	
        	var self = this;

        	var timeUpdater = setInterval(function(){
        		self.receipt_time = $('#receipt_time').val();
        		self.send_quotation_time = $('#send_quotation_time').val();
        	},1000)
        	
            $.ajax({
                url:"" + realPath+ "/quote/init",//初始化
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                success: function(d){
                    if (d[0]){
                    	self.company_choices = d[0].cusLiaison;
                    	self.account_manager_choices = d[0].jfcStaff;
                        
                        let option_companies = self.company_choices,
                        option_account_manager = self.account_manager_choices,

                        select_company = $('#client_company'),
                        select_account_manager = $('#account_manager_name'),

                        nodes_company = ``,
                        nodes_account_manager = ``;

                        for (let i = 0, l = option_companies.length; i < l; i++){
                            nodes_company += `<option value="`+ option_companies[i].liaId +`">`+ option_companies[i].cusComList.comName +`</option>`
                        }
                        for (let i = 0, l = option_account_manager.length; i < l; i++){
                            nodes_account_manager += `<option value="`+ option_account_manager[i].staId +`">`+ option_account_manager[i].staName +`</option>`
                        }

                        select_company.append(nodes_company);
                        select_account_manager.append(nodes_account_manager);

                        select_company.on('changed.bs.select', function(event){
                            let v = $(event.currentTarget).val();

                            for (let k = 0; k < option_companies.length;k++){
                                if (option_companies[k].liaId == v){
                                	self.client_company_id = option_companies[k].liaId;
                                	self.client_company = option_companies[k].cusComList.comName;
                                	self.client_type = option_companies[k].cusComList.comType;
                                	self.client_linkman = option_companies[k].liaName;
                                	self.client_contact = option_companies[k].liaPhone || option_companies[k].liaTel;
                                	self.client_email = option_companies[k].liaEmail;
                                	self.industry = option_companies[k].cusComList.comIndustry;
                                    break;
                                }
                            }
                            $('.selectpicker').selectpicker('refresh');
                        }.bind(this));
                        select_account_manager.on('changed.bs.select', function(event){
                            let v = $(event.currentTarget).val();

                            for (let k = 0; k < option_account_manager.length; k++){
                                if (option_account_manager[k].staId == v){
                                	self.account_manager_name = option_account_manager[k].staName;
                                	self.account_manager_contact = option_account_manager[k].staPhone || option_account_manager[k].staTel;
                                	self.account_manager_email = option_account_manager[k].staEmail
                                }
                            }
                            $('.selectpicker').selectpicker('refresh');
                        }.bind(this));
                        
                        $('#client_company').val(self.client_company_id);
                        $('#account_manager_name').val(self.account_manager_id);
                    }
                    $('.selectpicker').selectpicker('refresh');
                },
                error: function(e){
                    console.log(e)
                }
            });
           
            /*company-start*/

            
            /*company-end*/
            /*client_manager-start*/

            /*client_manager-end*/
        },
        methods: {
            updateTime: function(event){
//                let e = event;
//                setTimeout(function(e){
//                    return(function(){
//                        let t = $(e.target),
//                            id = t.attr('id'),
//                            v = t.val();
//                        switch (id){
//                            case 'receipt_time':
//                                this.receipt_time = v;
//                                break;
//                            case 'send_quotation_time':
//                                this.send_quotation_time = v;
//                                break;
//                        }
//                    }.bind(this))
//                }.bind(this)(e),10000)
            },
            getSum: function(ar){
                let sum = 0;
                for (let o = 0,lt = ar.length; o < lt; o++){
                    sum += ar[o]
                }
                return sum
            },
            addCol: function(detail){
                this.project_detail.splice(this.project_detail.indexOf(detail) + 1, 0, {
                    area: '',//区域
                    method: '',//调查方式
                    qnr_type: '',//问卷形式
                    during: 0,//问卷长度
                    audience_or_respondent: '',//调查对象
                    sample: 0,//样本配额量
                    other_requirement: '',//其他
                    deliverables: ''//项目成果
                });
                this.project_list.brief.splice(this.project_detail.indexOf(detail) + 1, 0,{
                    project_manage_fee: 0,
                    tax_fee: 0,
                    total_cost: 0,
                    sample_number: 0,
                    unit_cost: 0,
                    city_list: '',
                    timeline: ''
                });
                for (let i = 0, l = this.project_list.quotation_list.length; i < l; i++){
                    this.project_list.quotation_list[i].allocate.splice(this.project_detail.indexOf(detail) + 1, 0, {
                        unit: 0,
                        number: 0,
                        total: 0
                    })
                }
            },
            deleteCol: function(detail){
                console.log(detail);
                console.log(this.project_detail.indexOf(detail));

                if (this.project_detail.length <= 1){
                    return
                }
                this.project_detail.splice(this.project_detail.indexOf(detail),1);
                this.project_list.brief.splice(this.project_detail.indexOf(detail),1);

                for (let i = 0, l = this.project_list.quotation_list.length; i < l; i++){
                    this.project_list.quotation_list[i].allocate.splice(this.project_detail.indexOf(detail),1)
                }
            },
            submit: function(){
                let datas = quotationData;
                $.ajax({
                    url: "" + realPath+ "/quote/quoteAdd",//add方法
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(datas),
                    async: true,
                    success: function(d){
                        if (d[0].result >= 1){
                            document.location.href = './quotationList.html';
                        } else {
                            alert('保存失败。')
                        }
                    },
                    error: function(e){
                        console.log(e);
                        alert('保存失败。')
                    }
                })
            },
            back: function(){
                document.location.href = './quotationList.html';
            },
            addTime: function(time){
                this.timeline.splice(this.timeline.indexOf(time) + 1, 0 , {
                    duration: this.timeline.indexOf(time) + 2,
                    expected: this.timeline.indexOf(time) + 2,
                    perCity: '',
                    total: 0
                })
            },
            deleteTime: function(time){
                if (this.timeline.length > 1){
                    this.timeline.splice(this.timeline.indexOf(time), 1)
                }
            }
        },
        watch: {
            'project_list.quotation_list': {

                handler: function(val,old){

                    for (let i = 0, l = this.project_list.brief.length; i < l; i++){

                        let detail = this.project_list.brief[i],
                            sum = 0;

                        for (let j = 0, ln = this.project_list.quotation_list.length; j < ln; j++){

                            sum += parseFloat(this.project_list.quotation_list[j].allocate[i].total);
                        }
                        detail.project_manage_fee = parseFloat((sum * parseFloat(this.project_list.manage_fee_rate)).toFixed(2));
                        detail.tax_fee = parseFloat(((detail.project_manage_fee + sum) * 0.06).toFixed(2));
                        detail.total_cost = parseFloat((detail.tax_fee + detail.project_manage_fee + sum).toFixed(2))
                    }
                },
                deep: true
            },
            'project_list.manage_fee_rate': {

                handler: function(val,old){

                    for (let i = 0, l = this.project_list.brief.length; i < l; i++){

                        let detail = this.project_list.brief[i],
                            sum = 0;

                        for (let j = 0, ln = this.project_list.quotation_list.length; j < ln; j++){

                            sum += parseFloat(this.project_list.quotation_list[j].allocate[i].total);
                        }
                        detail.project_manage_fee = parseFloat((sum * parseFloat(this.project_list.manage_fee_rate)).toFixed(2));
                        detail.tax_fee = parseFloat(((detail.project_manage_fee + sum) * 0.06).toFixed(2));
                        detail.total_cost = parseFloat((detail.tax_fee + detail.project_manage_fee + sum).toFixed(2))
                    }
                },
                deep: true
            },
            'project_list.brief': {

                handler: function(val,old){

                    var total = 0;

                    for (let i = 0, l = this.project_list.brief.length; i < l; i++){

                        let detail = this.project_list.brief[i];
                        total += detail.total_cost;

                        if (detail.sample_number){
                            detail.unit_cost = parseFloat((detail.total_cost / detail.sample_number).toFixed(2))
                        }
                    }
                    this.total = total;
                },
                deep: true
            },
            'timeline': {
                handler: function(val, old){

                    for (let i = 0, l = this.timeline.length; i < l; i++){

                        this.timeline[i]['duration'] = this.timeline[i]['expected'] = i + 1
                    }
                },
                deep: true
            }
        }
    })
}


//thi