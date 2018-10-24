/**
 * Created by wangxiangyang on 2018/4/10.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
    const data = {
        statistics: {
            organization_number: 0,
            member_number: 0,
            project_number: 0,
            percentage_title: []
        },
        announcements: {
            page_number: 1,
            number_pages: 3,
            matrix: [{
                index: 1,
                list: []
            }
            ]
        },
        alters: [{
            name: '姓名',
            id: 'docName',
            type: 'member'
        },{
            name: '性别',
            id: 'docSex',
            type: 'member',
            list: ['男','女']
        },{
            name: '年龄',
            id: 'docOld',
            type: 'member'
        },{
            name: '学历',
            id: 'docEducation',
            type: 'member'
        },{
            name: '职称类别',
            id: 'catName',
            type: 'member',
            list: ['医师','药师','技师','护师','行政管理','采购管理','从事管理','医政人员','销售人员','其他']
        },{
            name: '职称级别',
            id: 'levId',
            type: 'member',
            list: ['住院医师','DIC主治医师','VCD副主任医师','CD主任医师','药士','初级药师','主管药量','副主任药师','主任药师','技师','主管技师','副主任技师','主任技师','护士','护师','主管护师','副主任护师','主任护师']
        },{
            name: '科室性质',
            id: 'natName',
            type: 'member',
            list: ['临床科室','医技科室','药剂科室','行政后勤','财务科','其他']
        },{
            name: '专业领域',
            id: 'specId',
            type: 'member',
            list: ['肿瘤/癌症领域','以及器官','呼吸器官','运动器官','消化系统','内分泌系统','神经领域','精神/心理','肾脏/泌尿系统','血液','皮肤','风湿','眼科','耳鼻喉','妇产科','儿科','康复护理','疼痛','其他']
        },{
            name: '邮箱',
            id: 'docEmail',
            type: 'member'
        },{
            name: '行政职称',
            id: 'admiName',
            type: 'member',
            list: ['无行政职称','科室副主任','科室主任','副院长','院长','护士长']
        },{
            name: '科室类别',
            id: 'categName',
            type: 'member',
            list: ['内科','外科','妇儿&生殖中心','中医','五官','肿瘤','急诊','传染病','影像功能','试剂器械药品','精神心理','设备信息采购','辅助临床科室','其他']
        },{
            name: '所在科室',
            id: 'belongId',
            type: 'member',
            list: ['普通内科','呼吸科','心血管内科','内分泌科','消化内科','血液科','肾脏内科','神经内科','过敏与免疫科','老年科/干部科','风湿科','血透室(血液透析中心)','介入科','普通外科','骨科','心脏/胸外科','泌尿科','神经外科/脑外科','血管外科','整形外科','腺体外科(乳腺外科/胰腺外科)','消化外科','肛肠科','肝胆外科','结石科','器官移植','烧伤科','手足显微外科','妇产科','儿科','不孕不育/生殖中心','男科','计划生育','眼科','耳鼻喉科','口腔科','化疗科','放疗科','肿瘤内科','肿瘤外科','肿瘤康复科','骨肿瘤科','急诊科','ICU','传染病','肝病','艾滋病','结核病','寄生虫病','放射医学(放射科/核医学科)','影像科/超声科(B超/彩超/CT)','心电图室','心功能室','胃镜室','内镜室','病理科','检验科','药剂科','药店','职业病','精神科','心理咨询科(心理医学科)','设备科','信息科','采购科','系统管理','实验室','麻醉科','皮肤科','营养科','保健科','康复理疗/护理','全科','疼痛科','预防保健科','公共卫生与预防']//75项
        },{
            name: '资质证',
            id: 'docPronumber',
            type: 'member'
        },{
            name: '身份证号',
            id: 'docIdentity',
            type: 'member'
        },{
            name: '从业时间',
            id: 'docEmploymentTime',
            type: 'member'
        },{
            name: '备注',
            id: 'docRemark',
            type: 'member'
        },{
            name: '推荐人',
            id: 'docRecommender',
            type: 'member'
        },{
            name: '积分',
            id: 'docIntegral',
            type: 'member'
        },{
            name: '联系方式',
            id: 'docPhone1',
            type: 'member'
        },{
            name: '数据属性',
            id: 'attriName',
            type: 'member',
            list: ['医院','药店','诊所','政府','社会组织',',实验室(独立)','商业公司','其他']
        },{
            name: '岗位医龄',
            id: 'docPostageTime',
            type: 'member'
        },{
            name: '数据重要性',
            id: 'dimportant',
            type: 'member',
            list: ['重要','普通','可清除']
        },{
            name: '数据配合度',
            id: 'cooperate',
            type: 'member',
            list: ['高','普通','低']
        },{
            name: '数据活跃度',
            id: 'active',
            type: 'member',
            list: ['未激活','无效会员' ,'休眠会员','边缘会员','活跃会员','忠诚会员','6月活跃','3月活跃']
        },{
            name: '医院名称',
            id: 'hosName',
            type: 'organization'
        },{
            name: '省份',
            id: 'hosProvince',
            type: 'organization',
            list: ['北京','上海','天津','重庆','湖南','湖北','广东','广西','河南','河北','山东','山西','四川','西藏','宁夏','辽宁','青海','甘肃','陕西','江苏','浙江','江西','黑龙江','新疆','云南','贵州','福建','吉林','安徽','内蒙古','湖南','香港','澳门','台湾']
        },{
            name: '城市',
            id: 'hosCity',
            type: 'organization',
            list: ['广州','深圳','杭州','南京','济南','青岛','大连','宁波','厦门','成都','武汉','哈尔滨','沈阳','西安','长春','长沙','福州','郑州','石家庄','苏州','佛山','东莞','无锡','烟台','太原','合肥','南昌','南宁','昆明','温州','淄博','唐山']
        },{
            name: '地区',
            id: 'hosDistrict',
            type: 'organization'
        },{
            name: '医院等级',
            id: 'hosgraId',
            type: 'organization',
            list: ['特等','甲等','乙等','丙等','未知']
        },{
            name: '医院级别',
            id: 'hoslelId',
            type: 'organization',
            list: ['三级','二级','未评级']
        },{
            name: '成立时间',
            id: 'hosEstablishmentTime',
            type: 'organization'
        },{
            name: '法人',
            id: 'hosLegalPerson',
            type: 'organization'
        },{
            name: '注册资金',
            id: 'hosRegisteredCapital',
            type: 'organization'
        },{
            name: '医院类型',
            id: 'typeId',
            type: 'organization',
            list: ['综合','专科','未知/其他']
        },{
            name: '盈利性质',
            id: 'profitId',
            type: 'organization',
            list: ['盈利','非盈利','未知/其他']
        },{
            name: '医院属性',
            id: 'propertyId',
            type: 'organization',
            list: ['公立','民营','未知/其他']
        }],
        status: {
            filtering: false,
            active_label: 'member',
            checked: [],
            active: {},
            picked: [],
            backing: {}
        },
        chosen: [],
        temps: [],
        packedConditions: {
            fields: [],
            list: [{
                index: 0,
                packed: false,
                conditions: [{
                    relation: 'none',
                    field: '',
                    field_name: '',
                    operator: '等于',
                    value: ''
                }]
            }]
        },
        options: [],
        spreading: {},
        form: ['table']
    };
    const methods = {
        getDetail: function(ann){},
        getAttachment: function(ann){},
        switchLabel: function(event, label){
            let target = $(event.currentTarget);
            if (!target.hasClass('active')){
                target.addClass('active')
                    .siblings('.switch').removeClass('active');
                this.status.active_label = label
            }
        },
        indicatePage: function(index){
            if (index != this.announcements.page_number && index >= 1 && index <= this.announcements.number_pages){
                this.announcements.page_number = index
            }
        },
        previousPage: function(){
            if (this.announcements.page_number >= 2){
                this.announcements.page_number--
            }
        },
        nextPage: function(){
            if (this.announcements.page_number < this.announcements.number_pages){
                this.announcements.page_number++
            }
        },
        triggerFilter: function(){
            this.status.filtering = !this.status.filtering
        },
        activeCheck: function(alt){
            this.status.active = alt
        },
        changeCheck: function(alt){
            if (this.status.checked.indexOf(alt) === -1){
                this.status.checked.push(alt)
            } else {
                this.status.checked.splice(this.status.checked.indexOf(alt), 1)
            }
        },
        checkAll: function(){
            if ($(event.currentTarget).prop('checked')){
                this.status.checked = [];
                for (let i = 0; i < this.alters.length; i++){
                    this.status.checked.push(this.alters[i])
                }
            } else {
                this.status.checked = []
            }
        },
        choseSingle: function(alt){
            this.chosen.push(alt);
            this.disableButtons()
        },
        choseMulti: function(){
            for (let i = 0, c = this.status.checked; i < c.length; i++){
                if (c[i].type === this.status.active_label){
                    let self = this;
                    setTimeout(function(i){c.splice(i, 1); console.log(self)},0);
                    this.chosen.push(c[i])
                }
            };
            this.disableButtons()
        },
        pickAll: function(event){
            if ($(event.currentTarget).prop('checked')){
                this.status.picked = [];
                for (let i = 0; i < this.chosen.length; i++){
                    this.status.picked.push(this.chosen[i])
                }
            } else {
                this.status.picked = []
            }
        },
        activePick: function(ch){
            this.status.backing = ch
        },
        changePick: function(ch){
            if (this.status.picked.indexOf(ch) === -1){
                this.status.picked.push(ch)
            } else {
                this.status.picked.splice(this.status.picked.indexOf(ch), 1)
            }
        },
        backSingle: function(ch){
            this.chosen.splice(this.chosen.indexOf(ch), 1);
            this.disableButtons()
        },
        backMulti: function(){
            for (let i = 0, p = this.status.picked; i < p.length; i++){
                setTimeout(function(i){p.splice(i, 1);},0);
                this.chosen.splice(this.chosen.indexOf(p[i]), 1)
            }
            this.disableButtons()
        },
        disableButtons: function(){
            let chosing = $('#chose'),
                flag = false;
            if (this.chosen.length === 0){
                if (!chosing.find('.back-button').hasClass('disabled')){
                    chosing.find('.back-button').addClass('disabled')
                }
            } else {
                try {
                    chosing.find('.back-button').removeClass('disabled')
                } catch (e) {}
            }
            for (let i = 0; i < this.alters.length; i++){
                if (this.alters[i].type === this.status.active_label && this.chosen.indexOf(this.alters[i]) === -1){
                    flag = true;
                    break
                }
            }
            if (!flag){
                if (!chosing.find('.chose-button').hasClass('disabled')){
                    chosing.find('.chose-button').addClass('disabled')
                }
            } else {
                try {
                    chosing.find('.chose-button').removeClass('disabled')
                } catch (e) {}
            }
        },
        displayTemp: function(ch){

            try {
                this.temps = ch.list || []
            } catch (e) {}
        },
        divide: function(conditions){
            conditions.packed = true;
            this.packedConditions.list.push({
                index: this.packedConditions.list.length,
                packed: false,
                conditions: [{
                    relation: 'none',
                    field: '',
                    field_name: '',
                    operator: '',
                    value: ''
                }]
            })
        },
        minus: function(conditions,con){
            if (conditions.conditions.length > 1) {
                conditions.conditions.splice(conditions.conditions.indexOf(con), 1)
            }
        },
        plus: function(conditions,con){
            conditions.conditions.splice(conditions.conditions.indexOf(con) + 1, 0, {
                relation: 'yu',
                field: '',
                field_name: '',
                operator: '等于',
                value: ''
            })
        },
        changeFieldName: function(event, con){
            let field = $(event.currentTarget).val();
            if (field && this.packedConditions.fields.indexOf(field) === -1 && this.packedConditions.fields.length >= 3){
                $(event.currentTarget).val(con.field);
                alert('最多筛选3个条件');
                event.stopPropagation();
                event.preventDefault();
                return
            }
            con.field = field;
            con.field_name = $(event.currentTarget).find('option:selected').text();
            this.packedConditions.fields = [];
            for (let i = 0; i < this.packedConditions.list.length; i++){
                let cc = this.packedConditions.list[i].conditions;
                for (let j = 0; j < cc.length; j++){
                    if (this.packedConditions.fields.indexOf(cc[j].field) === -1 && cc[j].field !== ''){
                        this.packedConditions.fields.push(cc[j].field)
                    }
                }
            }
        },
        displayOption: function(event, con){
            event.stopPropagation();
            //if ($('.options').length > 0) $('.options').remove();

            let option = [];//取得信息类别+++++++++++++++++++++++++++++++++

            for (let o = 0; o < this.chosen.length; o++){
                if (this.chosen[o].id === con.field){
                    if (this.chosen[o].list){
                        option = this.chosen[o].list;
                        break;
                    }
                }
            }

            this.options = [];
            for (let i = 0, l = option.length; i < l; i++){
                this.options.push(option[i])
            }
            this.spreading = con
        },
        reverse: function(str){
            //if (){
            //    return true
            //} else {
            //    return false
            //}
            return $('#' + str).position().top > 160
        },
        removeOption: function(event){
            this.spreading = null
        },
        assignment: function(con,opt){
            con.value = opt;
            this.spreading = null
        },
        selectForm: function(form){
            let index = this.form.indexOf(form);
            if (index === -1){
                this.form.push(form)
            } else {
                this.form.splice(index, 1)
            }
        },
        submitFilter: function(){
            sessionStorage.setItem('forms', JSON.stringify(this.form));
            sessionStorage.setItem('conditions', JSON.stringify(this.packedConditions));
            document.location.href = './statistics.html'
        },
        resetFilter: function(){
            this.status.active_label = 'member';
            this.status.checked = [];
            this.status.active = {};
            this.status.picked = [];
            this.status.backing = {};
            this.chosen = [];
            this.conditions = {
                fields: [],
                list: [{
                    index: 0,
                    packed: false,
                    conditions: [{
                        relation: 'none',
                        field: '',
                        field_name: '',
                        operator: '等于',
                        value: ''
                    }]
                }]
            };
            this.form = ['table']
        },
        cancelFilter: function(){
            this.status.filtering = false
        }
    };
    const mounted = function(){

        let self = this;

//        try {

            let email = JSON.parse(sessionStorage.getItem('sysUser')).email || '';

            $.ajax({
                url : "" + realPath + "/kolHome/init",
                type : "post",
                dataType : "json",
                async : false,
                crossDomain : true,
                data : JSON.stringify({
                    email: email
                }),
                contentType : "application/JSON;charset=utf-8",
                success : function(data) {

                    let arr = [],
                        notation = 0;

                    self.statistics = {
                    	organization_number: data[0].hosTotal || 0,
                        member_number: data[0].doctorTotal || 0,
                        project_number: data[0].projectTotal || 0,
                        percentage_title: data[0].category || []
                    };
                    for (let i = 0, l = data[0].noticeList.length; i < l; i++){
                        arr.push({
                            id: data[0].noticeList[i].notId,
                            time: (data[0].noticeList[i].notDate ? (data[0].noticeList[i].notDate.year + 1900)
                            + '-' + (data[0].noticeList[i].notDate.month + 1)
                            + '-' + (data[0].noticeList[i].notDate.date)
                            + ' ' + (data[0].noticeList[i].notDate.hours)
                            + ':' + (data[0].noticeList[i].notDate.minutes)
                            + ':' + (data[0].noticeList[i].notDate.seconds) : ''),
                            title: data[0].noticeList[i].notTheme,
                            source: data[0].noticeList[i].notSource,
                            remark: data[0].noticeList[i].notRemark,
                            link: data[0].noticeList[i].notLink
                        })
                    }
                    self.announcements.matrix = [];
                    while (arr.length > 0) {
                        notation++;
                        self.announcements.matrix.push({
                            index: notation,
                            list: arr.splice(0,10)
                        })
                    }
                    self.announcements.number_pages = notation
                },
                error: function(e){
                    alert('获取数据失败。')
                }
            })
//        } catch (e) {
//            alert('获取数据失败。')
//        }

        self.statistics.percentage_title = new Option(self.statistics.percentage_title);

        function Option(data){

            let self = this;

            self.title = {
                text: '职称类别分布',
                subtext: '',
                x: 'center'
            };
            self.tooltip = {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            };
            self.legend = {
                x : 'center',
                y : 'bottom',
                data: []
            };
            self.toolbox = {
                show : true,
                    feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                            type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            };
            self.calculable = true;
            self.series = [{
                name: '职称',
                type: 'pie',
                radius: [20, 110],
                center: ['50%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                    name: '',
                    value: 0
                }]
            }];

            for (let i = 0, l = data.length; i < l; i++){
                self.legend.data.push(data[i].catName);
//                self.selected[data[i].catName] = true;
                self.series[0].data.push({
                    name: data[i].catName,
                    value: data[i].count
                })
            }
        }


        let dom = $('.statistics-graph')[0];
        const myChart = echarts.init(dom);
        if (self.statistics.percentage_title && typeof self.statistics.percentage_title === "object") {
            myChart.setOption(self.statistics.percentage_title, true);
        }

    };
    const vm = new Vue({
        el: '#root',
        data: data,
        mounted: mounted,
        methods: methods
    })
});

