/**
 * Created by wangxiangyang on 2018/4/12.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
    const data = {
        categId_options: [],//科室类别
        department_list: [],//科室级别
        natId_options: [],//科室性质
        admiId_options: [],//行政职称
        liveId_options: [],//会员活跃度
        attrId_options: [],//数据属性
        catId_options: [],//职称类别
        title_level_list: [],//职称级别
        professional_list: [],//专业领域
        status: {
            checked_row: [],
            checked_id: []
        },
        form_now: 'fuzzy',
        spreading: '',
        fuzzy: {
            keyword: '',
            field: ''
        },
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
        quick: {
            options_participate: [],
            options_membId: [],
            options_display: '',
            data_chunk: {
            	hosName:'',//单位名称
                hosProvince: '',//省份
                hosCity: '',//城市
                attriName: '',//数据属性
                hoslelId: '',//单位级别
                hosgraId: '',//单位等级
                typeId: '',//单位类型
                propertyId: '',//单位属性
                catName: '',//职称类别
                levId: '',//职称级别
                admiName: '',//行政职称
                natName: '',//科室性质
                belongId: '',//所在科室
                kolId: '',//KOL属性
                categName: '',//科室类别
                specId: '',//专业领域
                payerId: '',//Payer属性
                docOld: '',//年龄
                docSex: '',//性别
                purchId: '',//采购属性
                docEmploymentTime: '',//医龄--从业时间
                docPostageTime: '',//岗位年龄
                membId: '',//荣誉属性
                participate: '',//参与项目--
                docEmail: '',//会员邮件
                other_property: '',//其他属性--
                coorId: '',//数据配合度
                liveId: '',//数据活跃度
                ImportId: ''//数据重要性
            }
        },
        precise: {
            member_index: '',
            nickname: '',
            member_name: '',
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
                name: '邮箱',
                id: 'docEmail',
                type: 'member'
            },{
                name: '职称类别',
                id: 'catName',
                type: 'member',
                list: []
            },{
                name: '职称级别',
                id: 'levId',
                type: 'member',
                list: []
            },{
                name: '科室性质',
                id: 'natName',
                type: 'member',
                list: []
            },{
                name: '专业领域',
                id: 'specId',
                type: 'member',
                list: []
            },{
                name: '行政职称',
                id: 'admiName',
                type: 'member',
                list: []
            },{
                name: '科室类别',
                id: 'categName',
                type: 'member',
                list: []
            },{
                name: '所在科室',
                id: 'belongId',
                type: 'member',
                list: []
            },{
                name: '数据属性',
                id: 'attriName',
                type: 'member',
                list: []
            },{
                name: '数据活跃度',
                id: 'active',
                type: 'member',
                list: []
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
            },
            //    {
            //    name: '成立时间',
            //    id: 'hosEstablishmentTime',
            //    type: 'organization'
            //},{
            //    name: '法人',
            //    id: 'hosLegalPerson',
            //    type: 'organization'
            //},{
            //    name: '注册资金',
            //    id: 'hosRegisteredCapital',
            //    type: 'organization'
            //},
                {
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
                backing: {},
                fields: []
            },
            chosen: [],
            temps: [],
            conditions: [{
                relation: 'none',
                field: '',
                field_name: '',
                operator: '等于',
                value: ''
            }],
            option_display: null,
            options: []
        },
        visible_field: [],
        eventHandler: {
            'click .consult_btn': function(e, value, row, index){
                sessionStorage.setItem('memberDetail', JSON.stringify(row));
                sessionStorage.setItem('detailStatus','consult');
                window.open('./dataDetail.html')
            },
            'click .update_btn': function (e, value, row, index) {
                sessionStorage.setItem('memberDetail', JSON.stringify(row));
                sessionStorage.setItem('detailStatus','update');
                window.open('./dataDetail.html')
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
        },
        email_address: [],
        email_title: '',
        email_container: null,
        temporary:{}
    };
    const methods = {
        activateForm: function(form){
            this.form_now = form
        },
        triggerSpreading: function(spreading){
            this.spreading = this.spreading === spreading ? '' : spreading
        },
        activeCheck: function(alt){
            this.precise.status.active = alt
        },
        changeCheck: function(alt){
            if (this.precise.status.checked.indexOf(alt) === -1){
                this.precise.status.checked.push(alt)
            } else {
                this.precise.status.checked.splice(this.precise.status.checked.indexOf(alt), 1)
            }
        },
        checkAll: function(){
            if ($(event.currentTarget).prop('checked')){
                this.precise.status.checked = [];
                for (let i = 0; i < this.precise.alters.length; i++){
                    this.precise.status.checked.push(this.precise.alters[i])
                }
            } else {
                this.precise.status.checked = []
            }
        },
        choseSingle: function(alt){
            this.precise.chosen.push(alt);
            this.disableButtons()
        },
        choseMulti: function(){
            for (let i = 0, c = this.precise.status.checked; i < c.length; i++){
                if (c[i].type === this.precise.status.active_label){
                    let self = this;
                    setTimeout(function(i){c.splice(i, 1); console.log(self)},0);
                    this.precise.chosen.push(c[i])
                }
            }
            this.disableButtons()
        },
        pickAll: function(event){
            if ($(event.currentTarget).prop('checked')){
                this.precise.status.picked = [];
                for (let i = 0; i < this.precise.chosen.length; i++){
                    this.precise.status.picked.push(this.precise.chosen[i])
                }
            } else {
                this.precise.status.picked = []
            }
        },
        activePick: function(ch){
            this.precise.status.backing = ch
        },
        changePick: function(ch){
            if (this.precise.status.picked.indexOf(ch) === -1){
                this.precise.status.picked.push(ch)
            } else {
                this.precise.status.picked.splice(this.precise.status.picked.indexOf(ch), 1)
            }
        },
        backSingle: function(ch){
            this.precise.chosen.splice(this.precise.chosen.indexOf(ch), 1);
            this.disableButtons()
        },
        backMulti: function(){
            for (let i = 0, p = this.precise.status.picked; i < p.length; i++){
                setTimeout(function(i){p.splice(i, 1);},0);
                this.precise.chosen.splice(this.precise.chosen.indexOf(p[i]), 1)
            }
            this.disableButtons()
        },
        disableButtons: function(){
            let chosing = $('#chose'),
                flag = false;
            if (this.precise.chosen.length === 0){
                if (!chosing.find('.back-button').hasClass('disabled')){
                    chosing.find('.back-button').addClass('disabled')
                }
            } else {
                try {
                    chosing.find('.back-button').removeClass('disabled')
                } catch (e) {}
            }
            for (let i = 0; i < this.precise.alters.length; i++){
                if (this.precise.alters[i].type === this.precise.status.active_label && this.precise.chosen.indexOf(this.precise.alters[i]) === -1){
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
        minus: function(con){
            if (this.precise.conditions.length > 1) {
                this.precise.conditions.splice(this.precise.conditions.indexOf(con), 1)
            }
        },
        plus: function(con){
            this.precise.conditions.splice(this.precise.conditions.indexOf(con) + 1, 0, {
                relation: 'yu',
                field: '',
                field_name: '',
                operator: '等于',
                value: ''
            })
        },
        changeFieldName: function(event, con){
            let field = $(event.currentTarget).val();
            con.field = field;
            con.field_name = $(event.currentTarget).find('option:selected').text();
            this.precise.status.fields = [];
            for (let i = 0; i < this.precise.conditions.length; i++){
                let cc = this.precise.conditions[i];
                for (let j = 0; j < cc.length; j++){
                    if (this.precise.status.fields.indexOf(cc[j].field) === -1 && cc[j].field !== ''){
                        this.precise.status.fields.push(cc[j].field)
                    }
                }
            }
        },
        displayOption: function(event, con){
            event.stopPropagation();
            //if ($('.options').length > 0) $('.options').remove();

            let option = [];//取得信息类别+++++++++++++++++++++++++++++++++

            for (let o = 0; o < this.precise.chosen.length; o++){
                if (this.precise.chosen[o].id === con.field){
                    if (this.precise.chosen[o].list){
                        option = this.precise.chosen[o].list;
                        break;
                    }
                }
            }

            this.precise.options = [];
            for (let i = 0, l = option.length; i < l; i++){
                this.precise.options.push(option[i])
            }
            this.precise.option_display = con
        },
        stretchOption: function(event, to_stretch){
            event.stopPropagation();
            this.quick.options_display = to_stretch
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
            $('.email-warning').fadeOut();
            setTimeout(function(){
                $('.email-warning').remove()
            },1000);
            this.precise.option_display = null;
            this.quick.options_display = ''
        },
        assignment: function(con,opt){
            con.value = opt;
            this.precise.options_display = null
        },
        assignmentQuick: function(property,opt){
            this.quick.data_chunk[property] = opt;
            this.quick.options_display = ''
        },
        fuzzyQuery: function(){
            let self = this;
            this.queryParams = function(){
                return {
                    classification: self.fuzzy.field,
                    keyword: self.fuzzy.keyword,
                    limit: this.pageSize,
                    offset: (this.pageNumber-1) *this.pageSize,
                    sort: this.sortName,      //排序列名
                    sortOrder: this.sortOrder
                }
            };
            this.tableInit(realPath + '/doctor/fuzzySearch');
            self.spreading = ''
        },
        quickQuery: function(){
            let self = this;
            this.queryParams = function(){
                let to_send = JSON.parse(JSON.stringify(self.quick.data_chunk));
                to_send.limit = this.pageSize;
                to_send.offset = (this.pageNumber-1) * this.pageSize;
                to_send.sort = this.sortName;
                to_send.sortOrder = this.sortOrder;
                return to_send
            };
            this.tableInit(realPath + '/doctor/accuracySearch');
            self.spreading = ''
        },
        preciseQuery: function(){
            let self = this;
            this.queryParams = function(){
                return {
                    conditions: self.precise.conditions,
                    docName: self.precise.member_name,
                    hosName: self.precise.nickname,
                    medicalNumber: self.precise.member_index,
                    limit: this.pageSize,
                    offset: (this.pageNumber-1) * this.pageSize,
                    sort: this.sortName,      //排序列名
                    sortOrder: this.sortOrder
                }
            };
            this.tableInit(realPath + '/doctor/precisionSearch');
            self.spreading = ''
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
                    sortable: true,                     // 是否启用排序
                    sortOrder: "asc",                   // 排序方式
                    queryParams: self.queryParams,// 传递参数（*）
                    sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                    pageNumber:1,                       // 初始化加载第一页，默认第一页
                    pageSize: 10,                       // 每页的记录行数（*）
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
                        title: 'Id',
                        visible: false
                        ,class: 'id'
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
                        title: '区县',
                        visible: false
                        ,class: 'th-district'
                    },{
                        field: 'nameComp',
                        title: '单位名称'
                        ,class: 'nameComp'
                    },{
                        field: 'source',
                        title: '数据属性',
                        visible: false
                        ,class: 'source'
                    },{
                        field: 'level',
                        title: '单位级别'
                        ,class: 'level'
                    },{
                        field: 'grade',
                        title: '单位等级',
                        visible: false
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
                        field: 'proType',
                        title: '职称类别',
                        visible: false
                        ,class: 'proType'
                    },{
                        field: 'proClass',
                        title: '职称级别'
                        ,class: 'proClass'
                    },{
                        field: 'title',
                        title: '行政职称',
                        visible: false
                        ,class: 'title'
                    },{
                        field: 'name',
                        title: '姓名'
                        ,class: 'name'
                    },{
                        field: 'mobile',
                        title: '手机'
                        ,class: 'mobile'
                        ,sortable: true
                    },{
                        field: 'tel1',
                        title: '联系电话1'
                        ,class: 'tel1'
                        ,sortable: true
                    },{
                        field: 'tel2',
                        title: '联系电话2',
                        visible: false
                        ,class: 'tel2'
                        ,sortable: true
                    },{
                        field: 'email',
                        title: '邮箱'
                        ,class: 'email'
                        ,sortable: true
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
                        title: '从业时间',
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
                                c = "<button class=\"btn btn-xs btn-info email_btn\" data-toggle=\"modal\" data-target=\"#sending_email\" title=\"发送邮件\"><i class=\"glyphicon glyphicon-envelope\"></i></button>";
                                //d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
                            return a + b + c

                        }
                        ,class: 'control'
                        ,events : self.eventHandler
                    }],
                    responseHandler: function(data){
                        let member_list = data[0].result;
                        data.total = data[0].total;
                        data.rows = [];


                        for (let i = 0, len = member_list.length; i < len; i++){
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
                            });
                            //data.total += 1
                        }
                        $('#tools').find('.numbers').html(`共查询到数据<span style="font-size: 14px;color: #f00;;">` + data.total + `</span>条`);
                        
                        return data;
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
                email = JSON.parse(sessionStorage.getItem('sysUser')).email,
                userName = JSON.parse(sessionStorage.getItem('sysUser')).userName,
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
                    email_content: email_content,
                    email : JSON.parse(sessionStorage.getItem('sysUser')).email,
                    userName : JSON.parse(sessionStorage.getItem('sysUser')).userName
                }),
                success: function(d){
                	var result = d[0].result;
                },
                error: function(error){

                }
            })
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
        exportApply: function(){
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
                            最多选择20个字段导出
                        </div>`);
                $('#root').append(warning);
                warning.fadeIn();
                //alert('最多选择20个字段导出。');
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
                        if (data[0].result > 0){
                            simpleAlert('提交成功', '#00db00')
                        } else {
                            simpleAlert('操作失败', '#f56c6c')
                        }
                    },
                    error: function(e){
                        simpleAlert('操作失败', '#f56c6c')
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
                    	window.open(realPath + data[0].result);
                    }
                });
            }
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
    const watch = {
        'quick.data_chunk.catName': function(v){
            for (let i = 0, categories = this.catId_options; i < categories.length; i++){
                if (v === categories[i].catName){
                    this.title_level_list = categories[i].levelList;
                    break
                }
            }
        },
        'quick.data_chunk.categName': function(v){
            for (let i = 0, departments = this.categId_options; i <departments.length; i++){
                if (v === departments[i].categName){
                    this.department_list = departments[i].belongedList;
                    break
                }
            }
        }
    };
    const mounted = function(){

        let self = this;

        $("#result").on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
            var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
            self.examine(e.type,datas);                              // 保存到全局 Array() 里
        });

        $.ajax({
            url : realPath + "/doctor/dataEchoSearch",
            type : "post",
            dataType : "json",
            async : false,
            contentType : "application/JSON;charset=utf-8",
            success : function(data) {
                let result = data[0];

                self.categId_options = result.departmentCategory;//科室类别->科室级别
                self.natId_options = result.nature;//科室性质
                self.admiId_options = result.administrative;//行政职称
                self.liveId_options = result.liveness;//会员活跃度
                self.attrId_options = result.attribute;//数据属性
                self.catId_options = result.category;//职称类别->职称级别
                self.professional_list = result.specializedList;//专业领域
                
                let catName,//职称类别
                    levId,//职称级别
                    natName,//科室性质
                    specId,//专业领域
                    admiName,//行政职称
                    categName,//科室类别
                    belongId,//所在科室
                    attriName,//数据属性
                    active;//数据活跃度

                for (let i = 0, alters = self.precise.alters; i < alters.length; i++){
                    
                    if (alters[i].id === 'catName'){
                        catName = alters[i];
                    } else if (alters[i].id === 'levId'){
                        levId = alters[i];
                    } else if (alters[i].id === 'natName'){
                        natName = alters[i];
                    } else if (alters[i].id === 'specId'){
                        specId = alters[i];
                    } else if (alters[i].id === 'admiName'){
                        admiName = alters[i];
                    } else if (alters[i].id === 'categName'){
                        categName = alters[i];
                    } else if (alters[i].id === 'belongId'){
                        belongId = alters[i];
                    } else if (alters[i].id === 'attriName'){
                        attriName = alters[i];
                    } else if (alters[i].id === 'active'){
                        active = alters[i];
                    }
                }
                for (let i = 0; i < self.catId_options.length; i++){
                    catName.list.push(self.catId_options[i].catName);
                    for (let j = 0; j < self.catId_options[i].levelList.length; j++){
                        levId.list.push(self.catId_options[i].levelList[j].levName)
                    }
                }
                for (let i = 0; i < self.natId_options.length; i++){
                    natName.list.push(self.natId_options[i].natName)
                }
                for (let i = 0; i < self.professional_list.length; i++){
                    specId.list.push(self.professional_list[i].specName)
                }
                for (let i = 0; i < self.admiId_options.length; i++){
                    admiName.list.push(self.admiId_options[i].admiName)
                }
                for (let i = 0; i < self.categId_options.length; i++){
                    categName.list.push(self.categId_options[i].categName);
                    for (let j = 0; j < self.categId_options[i].belongedList.length; j++){
                        belongId.list.push(self.categId_options[i].belongedList[j].belongName)
                    }
                }
                for (let i = 0; i < self.attrId_options.length; i++){
                    attriName.list.push(self.attrId_options[i].attriName)
                }
                for (let i = 0; i < self.liveId_options.length; i++){
                    active.list.push(self.liveId_options[i].liveName)
                }
            },
            error: function(e){
                console.error(e)
            }

        });

        laydate.render({
            elem: '#age',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.quick.data_chunk.docOld = value;
                //console.log(value);
                //console.log(date);
            }
        });
        laydate.render({
            elem: '#length_as_medic',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.quick.data_chunk.docEmploymentTime = value;
                //console.log(value);
                //console.log(date);
            }
        });
        laydate.render({
            elem: '#post_age',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.quick.data_chunk.docPostageTime = value;
                //console.log(value);
                //console.log(date);
            }
        });
        this.tableInit(realPath + '');

        try {
            this.email_container = UE.getEditor('email_container',{
                zIndex: 1060
            });
        } catch (e) {}
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        watch: watch,
        mounted: mounted
    });
});