/**
 * Created by wangxiangyang on 2018/4/19.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
    const data = {
        email_title: '',
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
        caches: [
        //    {
        //    name: '4awtgrfz',
        //    list: []
        //},{
        //    name: '4tay5s6',
        //    list: []
        //},{
        //    name: 'judtyrt',
        //    list: []
        //},{
        //    name: 'gsdxgfn',
        //    list: []
        //},{
        //    name: 'kdjsr',
        //    list: []
        //},{
        //    name: 'vssSD',
        //    list: []
        //}
        ],
        fields: [
            {
                id: 'id',
                name: '编号',
                type: 'common'
            },
            {
                id: 'idLogin',
                name: '会员名称',
                type: 'confidential'
            },
            {
                id: 'province',
                name: '省份',
                type: 'common'
            },
            {
                id: 'city',
                name: '城市',
                type: 'common'
            },
            {
                id: 'district',
                name: '区县',
                type: 'common'
            },
            {
                id: 'name',
                name: '姓名',
                type: 'common'
            },
            {
                id: 'source',
                name: '数据属性',
                type: 'common'
            },
            {
                id: 'proType',
                name: '职称类别',
                type: 'common'
            },
            {
                id: 'proClass',
                name: '职称级别',
                type: 'common'
            },
            {
                id: 'administrative',
                name: '行政职称',
                type: 'common'
            },
            {
                id: 'department',
                name: '所在科室',
                type: 'common'
            },
            {
                id: 'depType',
                name: '科室类别',
                type: 'common'
            },
            {
                id: 'depNature',
                name: '科室性质',
                type: 'common'
            },
            {
                id: 'profid',
                name: '专业领域',
                type: 'common'
            },
            {
                id: 'nameComp',
                name: '单位名称',
                type: 'common'
            },
            {
                id: 'level',
                name: '单位级别',
                type: 'common'
            },
            {
                id: 'grade',
                name: '单位等级',
                type: 'common'
            },
            {
                id: 'type',
                name: '单位类型',
                type: 'common'
            },
            {
                id: 'profit',
                name: '盈利性质',
                type: 'common'
            },
            {
                id: 'property',
                name: '单位属性',
                type: 'common'
            },
            {
                id: 'mobile',
                name: '手机',
                type: 'confidential'
            },
            {
                id: 'tel1',
                name: '联系电话1',
                type: 'confidential'
            },
            {
                id: 'tel2',
                name: '联系电话2',
                type: 'confidential'
            },
            {
                id: 'tel3',
                name: '联系电话3',
                type: 'confidential'
            },
            {
                id: 'email',
                name: '邮箱',
                type: 'confidential'
            },
            {
                id: 'sex',
                name: '性别',
                type: 'confidential'
            },
            {
                id: 'old',
                name: '年龄',
                type: 'confidential'
            },
            {
                id: 'oldWork',
                name: '从业时间',
                type: 'confidential'
            },
            {
                id: 'oldStation',
                name: '岗位年龄',
                type: 'confidential'
            },
            {
                id: 'record',
                name: '学历',
                type: 'confidential'
            },
            {
                id: 'idNumber',
                name: '身份证',
                type: 'confidential'
            },
            {
                id: 'proNumber',
                name: '资质证',
                type: 'confidential'
            },
            {
                id: 'kol',
                name: 'KOL属性',
                type: 'confidential'
            },
            {
                id: 'payer',
                name: 'Payer属性',
                type: 'confidential'
            },
            {
                id: 'purchase',
                name: '采购属性',
                type: 'confidential'
            },
            {
                id: 'member',
                name: '荣誉属性',
                type: 'confidential'
            },
            {
                id: 'payType',
                name: '支付类型',
                type: 'confidential'
            },
            {
                id: 'payAccount',
                name: '支付账号',
                type: 'confidential'
            },
            {
                id: 'payName',
                name: '账号名称',
                type: 'confidential'
            },
            {
                id: 'pay1',
                name: '支付记录1',
                type: 'confidential'
            },
            {
                id: 'pay2',
                name: '支付记录2',
                type: 'confidential'
            },
            {
                id: 'pay3',
                name: '支付记录3',
                type: 'confidential'
            },
            {
                id: 'pay4',
                name: '支付记录4',
                type: 'confidential'
            },
            {
                id: 'pay5',
                name: '支付记录5',
                type: 'confidential'
            },
            {
                id: 'check',
                name: '审核信息',
                type: 'confidential'
            },
            {
                id: 'communication',
                name: '沟通信息',
                type: 'confidential'
            },
            {
                id: 'credit',
                name: '积分信息',
                type: 'confidential'
            },
            {
                id: 'project',
                name: '项目信息',
                type: 'confidential'
            },
            {
                id: 'dimportant',
                name: '数据重要性',
                type: 'common'
            },
            {
                id: 'cooperate',
                name: '数据配合度',
                type: 'common'
            },
            {
                id: 'active',
                name: '数据活跃度',
                type: 'common'
            },
            {
                id: 'date',
                name: '数据创建日期',
                type: 'common'
            },
            {
                id: 'update',
                name: '数据更新日期',
                type: 'common'
            },
            {
                id: 'other',
                name: '其他',
                type: 'common'
            },
            {
                id: 'note',
                name: '备注',
                type: 'common'
            }
        ],
        common_checked: [],
        confidential_checked: [],
        caches_content: {},
        status: {
            filtering: false,
            active_label: 'member',
            choosing: [],
            picking: [],
            checked_row: [],
            checked_id: []
        },
        temps: [],
        checked: [],
        picked: [],
        conditions: [],
        bootstrap_table: {
            eventHandler: {
                'click .consult_btn': function(e, value, row, index){
                    //displaySublist(row)
                },
                'click .update_btn': function (e, value, row, index) {
                    //deleteItem(row)
                },
                'click .email_btn': function (e, value, row, index) {
                    if (!row.email){
                        e.preventDefault();
                        e.stopPropagation();
                        let warning = $(`<div class="email-warning" style="position: fixed;
                        							left:`+ ($(window).width()/2-25 + 'px') +`;
                        							top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            请补充邮箱信息后再改善邮件
                        </div>`);
                        $('#root').append(warning);
                        warning.fadeIn();
                        //alert('这条信息里没有邮箱地址。')
                    }
                    vm.email_address = [row.email];
                },
                'click .manage_btn': function (e, value, row, index) {
                    //deleteItem(row)
                }
            }
        }
    };
    const methods = {
        removeOption: function(event){
            $('.email-warning').fadeOut();
            setTimeout(function(){
                $('.email-warning').remove()
            },1000);
        },
        switchLabel: function(event, label){
            let target = $(event.currentTarget);
            if (!target.hasClass('active')){
                target.addClass('active')
                    .siblings('.switch').removeClass('active');
                this.status.active_label = label
            }
        },
        displayTemp: function(ch){

            try {
                this.temps = ch.list || []
            } catch (e) {}
        },
        changeChoose: function(alt){
            if (this.status.choosing.indexOf(alt) === -1){
                this.status.choosing.push(alt)
            } else {
                this.status.choosing.splice(this.status.choosing.indexOf(alt), 1)
            }
        },
        chooseAll: function(){
            if ($(event.currentTarget).prop('checked')){
                this.status.choosing = [];
                for (let i = 0; i < this.alters.length; i++){
                    this.status.choosing.push(this.alters[i])
                }
            } else {
                this.status.choosing = []
            }
        },
        checkSingle: function(alt){
            this.checked.push(alt);

            for (let i = 0; i < this.conditions.length; i++){
                if (!this.conditions[i].field){
                    this.conditions[i].field = alt.id;
                    this.conditions[i].field_name = alt.name;
                    return
                }
            }
            this.conditions.push({
                relation: 'yu',
                field: alt.id,
                field_name: alt.name,
                operator: '等于',
                value: ''
            });
            this.disableButtons()
        },
        checkMulti: function(){
            for (let i = 0, c = this.status.choosing; i < c.length; i++){
                if (c[i].type === this.status.active_label){

                    this.checked.push(c[i]);

                    for (let j = 0; j < this.conditions.length; j++){
                        if (!this.conditions[j].field){
                            this.conditions[j].field = c[i].id;
                            this.conditions[j].field_name = c[i].name;
                            c[i] = null;
                            break;
                        }
                    }
                    if (c[i]){
                        this.conditions.push({
                            relation: 'yu',
                            field: c[i].id,
                            field_name: c[i].name,
                            operator: '等于',
                            value: ''
                        })
                    }
                }
            }
            this.status.choosing = [];
            this.disableButtons()
        },
        removeChecked: function(con){
            for (let i = 0, p = this.checked; i < p.length; i++){
                if (p[i].id === con.field){
                    con.field = '';
                    con.field_name = '';
                    p.splice(i, 1)
                }
            }
            this.disableButtons()
        },
        pickAll: function(event){
            if ($(event.currentTarget).prop('checked')){
                this.status.picking = [];
                for (let i = 0; i < this.caches.length; i++){
                    this.status.picking.push(this.caches[i])
                }
            } else {
                this.status.picking = []
            }
        },
        changePick: function(cache){
            if (this.status.picking.indexOf(cache) === -1){
                this.status.picking.push(cache)
            } else {
                this.status.picking.splice(this.status.picking.indexOf(cache), 1)
            }
        },
        pickSingle: function(cache){
            for (let i = 0; i < this.conditions.length; i++){
                if (!this.conditions[i].value){
                    this.conditions[i].value = cache.title;
                    this.picked.push(cache);
                    return
                }
            }
            this.disableButtons()
        },
        pickMulti: function(){
            for (let i = 0, p = this.status.picking; i < p.length; i++){
                for (let j = 0; j < this.conditions.length; j++){
                    if (!this.conditions[j].value){
                        this.picked.push(p[i]);
                        this.conditions[j].value = p[i].title;
                        p[i] = null;
                        break;
                    }
                }
            }
            this.status.picking = [];
            this.disableButtons()
        },
        removePicked: function(con){
            for (let i = 0, p = this.picked; i < p.length; i++){
                if (p[i].title === con.value){
                    con.value = '';
                    p.splice(i, 1)
                }
            }
            this.disableButtons()
        },
        disableButtons: function(){
            let choose_button = $('#choose_button'),
                pick_button = $('#pick_button'),
                flag = false;
            if (this.picked.length === 0){
                if (!pick_button.hasClass('disabled')){
                    pick_button.addClass('disabled')
                }
            } else {
                try {
                    pick_button.removeClass('disabled')
                } catch (e) {}
            }
            for (let i = 0; i < this.alters.length; i++){
                if (this.alters[i].type === this.status.active_label && this.checked.indexOf(this.alters[i]) === -1){
                    flag = true;
                    break
                }
            }
            if (!flag){
                if (!choose_button.hasClass('disabled')){
                    choose_button.addClass('disabled')
                }
            } else {
                try {
                    choose_button.removeClass('disabled')
                } catch (e) {}
            }
        },
        submit: function(){
            let list = this.caches_content,
                field_list = [],
                matching = {};
            for (let i = 0, c = this.conditions; i < c.length; i++){
                field_list.push({
                    relation: c[i].relation,
                    field: c[i].field,
                    operator: c[i].operator
                });
                matching[c[i].value] = c[i].field
            }
            this.queryParams = function(){
                return {
                    matching: matching,
                    list: list,
                    field_list: field_list,
                    limit: this.pageSize,
                    offset: (this.pageNumber-1) * this.pageSize
                }
            };
            this.tableInit(realPath + '/doctor/matching')
        },
        reset: function(){
            this.conditions = [];
            this.checked = [];
            this.picked = []
        },
        changeCommonField: function(i,t){
            $(t).prop('checked') ? this.common_checked.push(i) : this.common_checked.splice(this.common_checked.indexOf(i),1)
        },
        changeConfidentialField: function(f,t){
            $(t).prop('checked') ? this.confidential_checked.push(f) : this.confidential_checked.splice(this.confidential_checked.indexOf(f),1)
        },
        toSetExport: function(e){
            if (!this.status.checked_id.length){
                e.preventDefault();
                e.stopPropagation();
                let warning = $(`<div class="email-warning" style="position: fixed;
                                                    left:`+ ($(window).width()/2-25 + 'px') +`;
                                                    top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            请先选择要导出的数据
                        </div>`);
                $('#root').append(warning);
                warning.fadeIn();
                //alert('请先选择要导出的数据');
                return false
            } else if (this.status.checked_id.length > 1000){
                e.preventDefault();
                e.stopPropagation();
                let warning = $(`<div class="email-warning" style="position: fixed;
                                                    left:`+ ($(window).width()/2-25 + 'px') +`;
                                                    top:`+ ($(window).height()/2-120 + 'px') +`;
                                                    display: none;
                                                    width: 240px;
                                                    height: 50px;
                                                    line-height: 50px;
                                                    background-color: #fff;
                                                    /*border: 1px solid #999;*/
                                                    -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
                                                    -webkit-box-shadow: 0 0 5px 0 #999;-moz-box-shadow: 0 0 5px 0 #999;box-shadow: 0 0 5px 0 #999;
                                                    color: #f56c6c;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    z-index: 1999;">
                            最多选择1000条数据
                        </div>`);
                $('#root').append(warning);
                warning.fadeIn();
                //alert('最多选择1000条数据');
                return false
            }
            $('#export_real').click();
        },
        exportApply: function(e){
            //let columns = $('#result').bootstrapTable('getOptions').columns[0],
            //    len = columns.length,
            //    checked = [],
            //    to_send = {};
            //for (let i = 0; i < len; i++){
            //    columns[i].visible && checked.push(columns[i].field)
            //}
            //to_send.derApplicant = JSON.parse(sessionStorage.getItem('sysUser')).email;
            //to_send.userName = JSON.parse(sessionStorage.getItem('sysUser')).userName;
            //to_send.derField = checked.join(',');
            //to_send.derDocId = this.status.checked_id.join(',');
            //to_send.derReviewer = 'Zero.Liu@jfcmc.com';//---------------------------------------------------------------暂定固定刘欢邮箱
            //
            //$.ajax({
            //    url : realPath + "/doctor/derivedInseart",
            //    type : "post",
            //    dataType : "json",
            //    async : true,
            //    //crossDomain : true,
            //    data : JSON.stringify(to_send),
            //    contentType : "application/JSON;charset=utf-8",
            //    success : function(data) {
            //        console.log(data);
            //    }
            //});
            let columns = /*$('#result').bootstrapTable('getOptions').columns[0]*/this.common_checked.concat(this.confidential_checked),
                len = columns.length,
            //checked = [],
                to_send = {};
            //for (let i = 0; i < len; i++){
            //    columns[i].visible && checked.push(columns[i].field)
            //}
            if (len > 20){
                e.preventDefault();
                e.stopPropagation();
                simpleAlert('最多选择20个字段导出','#f56c6c');
                return false
            }

            to_send.derApplicant = JSON.parse(sessionStorage.getItem('sysUser')).email;
            to_send.userName = JSON.parse(sessionStorage.getItem('sysUser')).userName;
            to_send.derField = columns.join(',');
            to_send.derDocId = this.status.checked_id.join(',');
            to_send.derReviewer = 'Zero.Liu@jfcmc.com';//---------------------------------------------------------------暂定固定刘欢邮箱

            if (this.confidential_checked.length){
                $.ajax({
                    url : realPath + "/doctor/derivedInseart",
                    type : "post",
                    dataType : "json",
                    async : true,
                    //crossDomain : true,
                    data : JSON.stringify(to_send),
                    contentType : "application/JSON;charset=utf-8",
                    success : function(data) {
                        console.log(data);
                        if (data[0].result > 0){
                            simpleAlert('提交成功','#00db00')
                        } else {
                            simpleAlert('操作失败','#f56c6c')
                        }
                    },
                    error: function(e){
                        simpleAlert('操作失败','#f56c6c')
                    }
                });
            } else {
                $.ajax({
                    url : realPath + "/doctor/derivedExportExamine",
                    type : "post",
                    dataType : "json",
                    async : true,
                    //crossDomain : true,
                    data : JSON.stringify(to_send),
                    contentType : "application/JSON;charset=utf-8",
                    success : function(data) {
                        window.open(realPath + data[0].result)
                    }
                });
            }
        },
        queryParams: function(){},
        tableInit: function(url){
            let self = this;
            $("#result").bootstrapTable('destroy')
                .bootstrapTable({
                    url: url,         // 请求后台的URL（*）
                    method: 'post',                      // 请求方式（*）
                    toolbar: '#tools',                // 工具按钮用哪个容器
                    striped: true,                      // 是否显示行间隔色
                    cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   // 是否显示分页（*）
                    sortable: false,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: self.queryParams,// 传递参数（*）
                    sidePagination: "client",           // 分页方式：client客户端分页，server服务端分页（*）
                    pageNumber:1,                       // 初始化加载第一页，默认第一页
                    pageSize: 20,                       // 每页的记录行数（*）
                    pageList: [10, 20, 50, 100],        // 可供选择的每页的行数（*）
                    search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true,                  // 是否显示所有的列
                    showRefresh: true,                  // 是否显示刷新按钮
                    minimumCountColumns: 2,             // 最少允许的列数
                    clickToSelect: true,                // 是否启用点击选中行
                    //height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "id",                     // 每一行的唯一标识，一般为主键列
                    showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    // 是否显示详细视图
                    detailView: false,                   // 是否显示父子表
                    columns: [{
                        checkbox: true,
                        formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                            return {
                                checked : self.status.checked_row.indexOf(row.id) > -1
                            }
                        }
                    },{
                        field: 'id',
                        title: 'Id'
                        ,class: 'id'
                    },{
                        field: 'iDLogin',
                        title: '会员名称',
                        visible: false
                        ,class: 'iDLogin'
                    },{
                        field: 'province',
                        title: '省份'
                        ,class: 'th-province'
                    },{
                        field: 'city',
                        title: '城市'
                        ,class: 'th-city'
                    },{
                        field: 'district',
                        title: '区县'
                        ,class: 'th-district'
                    },{
                        field: 'name',
                        title: '名称'
                        ,class: 'name'
                    },{
                        field: 'source',
                        title: '数据属性',
                        visible: false
                        ,class: 'source'
                    },{
                        field: 'proType',
                        title: '职称类别',
                        visible: false
                        ,class: 'proType'
                    },{
                        field: 'proClass',
                        title: '职称级别',
                        visible: false
                        ,class: 'proClass'
                    },{
                        field: 'title',
                        title: '行政职称'
                        ,class: 'title'
                    },{
                        field: 'department',
                        title: '所在科室'
                        ,class: 'department'
                    },{
                        field: 'depType',
                        title: '科室类别',
                        visible: false
                        ,class: 'depType'
                    },{
                        field: 'depNature',
                        title: '科室性质',
                        visible: false
                        ,class: 'depNature'
                    },{
                        field: 'profField',
                        title: '专业领域',
                        visible: false
                        ,class: 'profField'
                    },{
                        field: 'nameComp',
                        title: '单位名称'
                        ,class: 'nameComp'
                    },{
                        field: 'level',
                        title: '单位级别'
                        ,class: 'level'
                    },{
                        field: 'grade',
                        title: '单位等级'
                        ,class: 'grade'
                    },{
                        field: 'type',
                        title: '单位类型',
                        visible: false
                        ,class: 'type'
                    },{
                        field: 'profit',
                        title: '盈利性质',
                        visible: false
                        ,class: 'profit'
                    },{
                        field: 'property',
                        title: '单位属性',
                        visible: false
                        ,class: 'property'
                    },{
                        field: 'mobile',
                        title: '手机'
                        ,class: 'mobile'
                    },{
                        field: 'tel1',
                        title: '联系电话1'
                        ,class: 'tel1'
                    },{
                        field: 'tel2',
                        title: '联系电话2'
                        ,class: 'tel2'
                    },
                        //    {
                        //    field: 'tel3',
                        //    title: '联系电话3'
                        //},
                        {
                            field: 'email',
                            title: '邮箱'
                            ,class: 'email'
                        },{
                            field: 'sex',
                            title: '性别',
                            visible: false
                            ,class: 'sex'
                        },{
                            field: 'old',
                            title: '年龄',
                            visible: false
                            ,class: 'old'
                        },{
                            field: 'oldWork',
                            title: '医龄',
                            visible: false
                            ,class: 'oldWork'
                        },{
                            field: 'oldStation',
                            title: '岗位年龄',
                            visible: false
                            ,class: 'oldStation'
                        },{
                            field: 'record',
                            title: '学历',
                            visible: false
                            ,class: 'record'
                        },{
                            field: 'idNumber',
                            title: '身份证',
                            visible: false
                            ,class: 'idNumber'
                        },{
                            field: 'proNumber',
                            title: '资质证',
                            visible: false
                            ,class: 'proNumber'
                        },{
                            field: 'kol',
                            title: 'KOL属性',
                            visible: false
                            ,class: 'kol'
                        },{
                            field: 'payer',
                            title: 'Payer属性',
                            visible: false
                            ,class: 'payer'
                        },{
                            field: 'purchase',
                            title: '采购属性',
                            visible: false
                            ,class: 'purchase'
                        },{
                            field: 'member',
                            title: '荣誉属性',
                            visible: false
                            ,class: 'member'
                        },{
                            field: 'payType',
                            title: '支付类型',
                            visible: false
                            ,class: 'payType'
                        },{
                            field: 'payAccount',
                            title: '支付账号',
                            visible: false
                            ,class: 'payAccount'
                        },{
                            field: 'payName',
                            title: '账号名称',
                            visible: false
                            ,class: 'payName'
                        },{
                            field: 'pay1',
                            title: '支付记录1',
                            visible: false
                            ,class: 'pay1'
                        },{
                            field: 'pay2',
                            title: '支付记录2',
                            visible: false
                            ,class: 'pay2'
                        },{
                            field: 'pay3',
                            title: '支付记录3',
                            visible: false
                            ,class: 'pay3'
                        },{
                            field: 'pay4',
                            title: '支付记录4',
                            visible: false
                            ,class: 'pay4'
                        },{
                            field: 'pay5',
                            title: '支付记录5',
                            visible: false
                            ,class: 'pay5'
                        },{
                            field: 'check',
                            title: '审核信息',
                            visible: false
                            ,class: 'check'
                        },{
                            field: 'communication',
                            title: '沟通信息',
                            visible: false
                            ,class: 'communication'
                        },{
                            field: 'credit',
                            title: '积分信息',
                            visible: false
                            ,class: 'credit'
                        },{
                            field: 'project',
                            title: '项目信息',
                            visible: false
                            ,class: 'project'
                        },{
                            field: 'dimportant',
                            title: '数据重要性',
                            visible: false
                            ,class: 'dimportant'
                        },{
                            field: 'cooperate',
                            title: '数据配合度',
                            visible: false
                            ,class: 'cooperate'
                        },{
                            field: 'active',
                            title: '数据活跃度',
                            visible: false
                            ,class: 'active'
                        },{
                            field: 'date',
                            title: '数据创建日期',
                            visible: false
                            ,class: 'date'
                        },{
                            field: 'update',
                            title: '数据更新日期',
                            visible: false
                            ,class: 'update'
                        },
                        //    {
                        //    field: 'other',
                        //    title: '其他',
                        //    visible: false
                        //},
                        {
                            field: 'note',
                            title: '备注',
                            visible: false
                            ,class: 'note'
                        },{
                        field: 'control',
                        title: '操作',
                        formatter : function(value, row, index) {
                            let a = "<button class=\"btn btn-xs btn-success consult_btn\" title=\"查看数据\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>",
                                b = "<button class=\"btn btn-xs btn-warning update_btn\" title=\"修改数据\"><i class=\"glyphicon glyphicon-edit\"></i></button>",
                                c = "<button class=\"btn btn-xs btn-info email_btn\" data-toggle=\"modal\" data-target=\"#sending_email\" title=\"发送邮件\"><i class=\"glyphicon glyphicon-envelope\"></i></button>",
                                d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
                            return a + b + c + d

                        }
                        ,class: 'control'
                        ,events : self.eventHandler
                    }],
                    responseHandler: function(data){
                        let member_list = data[0].result,
                            len = member_list.length;
                        //data.total = len;
                        data.rows = [];

                        for (let i = 0; i < len; i++){
                            data.rows.push({
                                id: member_list[i].docId,//编号
                                idLogin: member_list[i].docIdentity,//会员名称
                                province: (member_list[i].hospital ? member_list[i].hospital.hosProvince : ''),//省份
                                city: (member_list[i].hospital ? member_list[i].hospital.hosCity: ''),//城市
                                district: (member_list[i].hospital ? member_list[i].hospital.hosDistrict : ''),//区县
                                name: member_list[i].docName,//姓名
                                source: (member_list[i].attribute ? member_list[i].attriName : ''),//数据属性
                                proType: (member_list[i].category ? member_list[i].category.catName : ''),//职称类别
                                proClass: member_list[i].levId,//职称级别
                                title: (member_list[i].administrative ? member_list[i].administrative.admiName : ''),//行政职称
                                department: member_list[i].belongId,//所在科室
                                depType: (member_list[i].departmentCategory ? member_list[i].departmentCategory.categName : ''),//科室类别
                                depNature: member_list[i].natId,//科室性质
                                profField: member_list[i].specId,//专业领域
                                nameComp: (member_list[i].hospital ? member_list[i].hospital.hosName : ''),//单位名称
                                level: (member_list[i].hospital ? member_list[i].hospital.hoslelId : ''),//单位级别
                                grade: (member_list[i].hospital ? member_list[i].hospital.hosgraId: ''),
                                type: (member_list[i].hospital ? member_list[i].hospital.typeId : ''),//单位类型
                                profit: (member_list[i].hospital ? member_list[i].hospital.profitId : ''),//盈利性质
                                property: (member_list[i].hospital ? member_list[i].hospital.propertyId: ''),//单位属性
                                mobile: member_list[i].docPhone1,//手机
                                tel1: member_list[i].docPhone2,//联系电话1
                                tel2: member_list[i].docPhone3,//联系电话2
                                //tel3: member_list[i].,//联系电话3
                                email: member_list[i].docEmail,//邮箱
                                sex: member_list[i].docSex,//性别
                                old: member_list[i].docOld,//年龄
                                oldWork: member_list[i].docEmploymentTime,//医龄--从业时间
                                oldStation: member_list[i].docPostageTime,//岗位年龄
                                record: member_list[i].docEducation,//学历
                                idNumber: member_list[i].docIdentity,//身份证
                                proNumber: member_list[i].docPronumber,//资质证
                                kol: member_list[i].kolId,//kol属性
                                payer: member_list[i].payerId,//payer属性
                                purchase: member_list[i].purchId,//采购属性
                                member: member_list[i].membId,//荣誉属性
                                payType: member_list[i].payType || '',//支付类型---------------------------------待定
                                payAccount: member_list[i].payAccount || '',//支付账号---------------------------------待定
                                payName: member_list[i].payName || '',//账号名称---------------------------------待定
                                pay1: member_list[i].pay1 || '',//支付记录1---------------------------------待定
                                pay2: member_list[i].pay2 || '',//支付记录2---------------------------------待定
                                pay3: member_list[i].pay3 || '',//支付记录3---------------------------------待定
                                pay4: member_list[i].pay4 || '',//支付记录4---------------------------------待定
                                pay5: member_list[i].pay5 || '',//支付记录5---------------------------------待定
                                check: member_list[i].check || '',//审核信息---------------------------------待定
                                communication: member_list[i].communication || '',//沟通信息---------------------------------待定
                                credit: member_list[i].credit || '',//积分信息---------------------------------待定
                                project: member_list[i].project || '',//项目信息---------------------------------待定
                                dimportant: member_list[i].importId,//数据重要性
                                cooperate: member_list[i].coorId,//数据配合度
                                active: member_list[i].liveId,//数据活跃度
                                date: member_list[i].docCreateTime,//数据创建日期
                                update: member_list[i].docUpdateTime,//数据更新日期
                                //other: member_list[i].,//其他
                                note: member_list[i].docRemark//备注
                            })
                        }
                        $('#tools').find('.numbers').html(`共查询到数据<span style="font-size: 14px;color: #f00;;">` +len + `</span>条`);

                        return data.rows;
                    }
                });
            $("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
                .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                    var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                    self.examine(e.type,datas);                              // 保存到全局 Array() 里
                });
        },
        sendEmail: function(){
            let email_address = this.email_address,
                email_title = this.email_title,
                email_content = this.email_container.getContent();
            $.ajax({
                url: realPath + '/doctor/sendEmail',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    email_address: email_address,
                    email_title: email_title,
                    email_content: email_content
                }),
                success: function(d){

                },
                error: function(error){

                }
            })
        },
        examine: function examine(type,datas){
            let self = this;
            if(type.indexOf('uncheck')==-1){
                for (let i = 0; i < datas.length; i++){
                    self.status.checked_row.indexOf(datas[i]) === -1 &&
                    self.status.checked_row.push(datas[i]), self.status.checked_id.push(datas[i].id)
                }
                //$.each(datas,function(i,v){
                //    // 添加时，判断一行或多行的 id 是否已经在数组里 不存则添加　
                //    self.status.checked_row.indexOf(v.id) == -1 ? self.status.checked_row.push(v.id) : -1;
                //});
            }else{
                for (let i = 0; i < datas.length; i++){
                    self.status.checked_id.splice(self.status.checked_id.indexOf(datas[i].id),1);
                    for (let j = 0; j < self.status.checked_row.length; j++){
                        self.status.checked_row[j].id === datas[i].id && self.status.checked_row.splice(j,1)
                    }
                }
                //$.each(datas,function(i,v){
                //    self.status.checked_row.splice(self.status.checked_row.indexOf(v.id),1);    //删除取消选中行
                //});
            }
        }
    };
    const mounted = function(){
        this.tableInit(realPath + '');

        $("#result").on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
            var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
            self.examine(e.type,datas);                              // 保存到全局 Array() 里
        });

        //js-xlsx
        $('#select_file').on('change', importf);

        let wb,//读取完成的数据
            rABS = false,//是否将文件读取为二进制字符串
            self = this;
        function importf(event) {//导入
            let obj = event.currentTarget;
            if(!obj.files) {
                return;
            }
            var f = obj.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var data = e.target.result;
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
//            document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
                    let resource = wb.Sheets[wb.SheetNames[0]],
                        table_head = {},
                        table_content = [],
                        count = 0;
                    for (let k in resource){
                        if (!k.match(/^\!/)){
                            let order = k.match(/^([A-Z]+)\d+/)[1],
                                number = k.match(/\d+$/)[0];
                            if ('1' === number){
                                table_head[order] = {
//                        order: order,
                                    count: count,
                                    title: resource[k].w,
                                    list: []
                                };
                                count ++
                            } else {
                                if (!table_content[number-2]){
                                    table_content[number-2] = {};
                                }
                                table_content[number-2][table_head[order].title] = resource[k].w;
                                if (table_head[order].list.indexOf(resource[k].w) === -1){
                                    table_head[order].list.push(resource[k].w)
                                }
                            }
                        }
                    }
                    //console.info(table_head);
                    //console.info(table_content);
                    self.caches = table_head;
                    self.caches_content = table_content
                } catch (e) {
                    simpleAlert('第一行有空白,请检查文件', '#f56c6c');
                    $('#select_file').val('')
                }
            };
            if(rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        }

        function fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        }

    };
    const watch = {
        conditions: {
            handler: function(val){
                for (let i = 0; i < val.length; i++){
                    if (!val[i].field && !val[i].value){
                        this.conditions.splice(i,1)
                    }
                }
                if (this.conditions[0]){
                    this.conditions[0].relation = 'none'
                }
            },
            deep: true
        }
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        mounted: mounted,
        watch: watch
    })
});