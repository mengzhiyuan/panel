/**
 * Created by wangxiangyang on 2018/4/26.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const data = {
    status: {
        active_board: 'duplicate_check',
        method: '',
        checked_row: [],
        checked_id: []
    },
    boards: [
        //{
        //    title: 'duplicate_check',
        //    name: '查重'
        //}
        //,{
        //    title: 'update',
        //    name: '修改'
        //},{
        //    title: 'delete',
        //    name: '删除'
        //}
        //,{
        //    title: 'approve',
        //    name: '审批'
        //}
    ],
    spreading: '',
    hospital_options: [],
    categId_options: [],//科室类别
    department_list: [],//所在科室
    natId_options: [],//科室性质
    admiId_options: [],//行政职称
    liveId_options: [],//会员活跃度
    attrId_options: [],//数据属性
    catId_options: [],//职称类别
    title_level_list: [],//职称级别
    professional_list: [],//专业领域
    options_in_updating: '',
    to_insert: {
        hosName: '',//医院名称
        hoslelId: '',//级别
        hosgraId: '',//等级
        hosProvince: '',//省
        hosCity: '',//市
        hosDistrict: '',//县
        foundTime: '',//成立时间
        legalPerson: '',//法人
        capital: '',//注册资金
        typeId: '',//类型
        profitId: '',//盈利
        propertyId: ''//属性
    },
    to_update: {
        id: '', 
        iDLogin: '', 
        province: '', 
        city: '', 
        district: '', 
        name: '', 
        source: '', 
        proType: '', 
        proClass: '', 
        title: '', 
        department: '', 
        depType: '', 
        depNature: '', 
        profField: '',
        hosId: '',
        nameComp: '', 
        level: '', 
        grade: '', 
        type: '', 
        profit: '', 
        property: '', 
        mobile: '', 
        tel1: '', 
        tel2: '', 
        email: '', 
        sex: '', 
        old: '', 
        oldWork: '', 
        oldStation: '', 
        record: '', 
        idNumber: '', 
        proNumber: '', 
        kol: '', 
        payer: '', 
        purchase: '', 
        member: '', 
        payType: '', 
        payAccount: '', 
        payName: '', 
        pay1: '', 
        pay2: '', 
        pay3: '', 
        pay4: '', 
        pay5: '', 
        check: '', 
        communication: '', 
        credit: '', 
        project: '', 
        dimportant: '', 
        cooperate: '', 
        active: '', 
        date: '', 
        update: '', 
        note: ''
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
        options_display: null,
        options: []
    },
    duplicate: {
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
            name: '邮箱',
            id: 'docEmail',
            type: 'member'
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
            list: []
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
            list: []
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
        button_disabled: 'back-button',
        chosen: [],
        checking: [],
        picking: []
    }
};
const methods = {
    switchBoard: function(event){
        this.status.active_board = $(event.target).attr('target');
        if ($(event.target).attr('method')){
            this.status.method = $(event.target).attr('method')
        }
        if (this.status.active_board === 'duplicate_check'){
            $('#method_merge').css('display', 'inline-block');
            $('#method_update').css('display', 'inline-block');
            $('#method_delete').css('display', 'inline-block');
            this.status.checked_id = [];
            this.status.checked_row = []
        } else if (this.status.active_board === 'dictionary') {
            $.ajax({
                url: realPath + '/system/dictionary',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    email: JSON.parse(sessionStorage.getItem('sysUser')).email
                }),
                async: true,
                success: function(d){
                    let ul = $('#link_dictionary'),
                        list = d[0].allMenuList,
                        len = list.length,
                        i;

                    ul.html('');
                    for (i = 0; i < len; i++){
                        ul.append(`<li>
                                <a href="`+ list[i].dataUrl +`">`+ list[i].menuName +`</a>
                            </li>`)
                    }
                },
                error: function(e){}
            });
            $('#method_merge').css('display', 'none');
            $('#method_update').css('display', 'none');
            $('#method_delete').css('display', 'none');
        } else {
            $('#method_merge').css('display', 'none');
            if (this.status.active_board === 'query') {
                if ($(event.target).attr('method') === 'update') {
                    $('#method_update').css('display', 'inline-block');
                    $('#method_delete').css('display', 'none');
                    this.status.checked_id = [];
                    this.status.checked_row = []
                } else {
                    $('#method_update').css('display', 'none');
                    $('#method_delete').css('display', 'inline-block');
                }
            }
        }
    },
    triggerSpreading: function(spreading){
        this.spreading = this.spreading === spreading ? '' : spreading
    },
    changeCheck: function(alt){
        let index = this.duplicate.checking.indexOf(alt);
        if (index === -1){
            this.duplicate.checking.push(alt)
        } else {
            this.duplicate.checking.splice(index, 1)
        }
    },
    changePick: function(ch){
        let index = this.duplicate.picking.indexOf(ch);
        if (index === -1){
            this.duplicate.picking.push(ch)
        } else {
            this.duplicate.picking.splice(index, 1)
        }
    },
    checkAll: function(){
        let arr = [];
        for (let i = 0, alters = this.duplicate.alters; i < alters.length; i++){
            arr.push(alters[i])
        }
        this.duplicate.checking = arr
    },
    pickAll: function(){
        let arr = [];
        for (let i = 0, chosen = this.duplicate.chosen; i < chosen.length; i++){
            arr.push(chosen[i])
        }
        this.duplicate.picking = arr
    },
    chooseMulti: function(){
        this.duplicate.chosen = this.duplicate.chosen.concat(this.duplicate.checking);
        this.duplicate.checking = []
    },
    backMulti: function(){
        for (let i = 0, picking = this.duplicate.picking; i < picking.length; i++){
            this.duplicate.chosen.splice(picking[i])
        }
        this.duplicate.picking = []
    },
    chooseSingle: function(alt){
        this.duplicate.chosen.push(alt)
    },
    backSingle: function(ch){
        this.duplicate.chosen.splice(this.duplicate.chosen.indexOf(ch))
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
                offset: (this.pageNumber-1) * this.pageSize
            }
        };
        this.tableInit(realPath + '/doctor/precisionSearch');
    },
    resetDuplicate: function(){
        this.duplicate.checking = [];
        this.duplicate.picking = [];
        this.duplicate.chosen = []
    },
    duplicateCheck: function(){
        let chosen = this.duplicate.chosen,
            keywords = [],
            len = chosen.length,
            i = 0;
        for (;i < len; i++){
            keywords.push(chosen[i].id)
        }
        this.queryParams = function(){
            return {
                list: keywords,
                limit: this.pageSize,
                offset: (this.pageNumber-1) * this.pageSize
            }
        };
        this.tableInit(realPath + '/doctor/weight');
    },
    queryParams: function(){},
    tableInit: function(url){
        let self = this;
        if (!self.duplicate.chosen.length) return;
        $("#result").bootstrapTable('destroy')
            .bootstrapTable({
                url: url,         // 请求后台的URL（*）
                method: 'post',                      // 请求方式（*）
                toolbar: '#button_table',                // 工具按钮用哪个容器
                striped: true,                      // 是否显示行间隔色
                cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   // 是否显示分页（*）
                sortable: false,                     // 是否启用排序
                sortOrder: "asc",                   // 排序方式
                queryParams: self.queryParams,// 传递参数（*）
                sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,                       // 初始化加载第一页，默认第一页
                pageSize: 20,                       // 每页的记录行数（*）
                pageList: [10, 20, 50, 100],        // 可供选择的每页的行数（*）
                search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: true,                  // 是否显示所有的列
                showRefresh: true,                  // 是否显示刷新按钮
                minimumCountColumns: 2,             // 最少允许的列数
                clickToSelect: true,                // 是否启用点击选中行
                height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "id",                     // 每一行的唯一标识，一般为主键列
                showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                    // 是否显示详细视图
                detailView: false,                   // 是否显示父子表
                columns: [{
                    checkbox: true,
                    formatter: function (value,row) {            // 每次加载 checkbox 时判断当前 row 的 id 是否已经勾选
                        return {
                            checked : self.status.checked_id.indexOf(row.id) > -1
                        }
                    }
                },{
                    field: 'id',
                    title: 'Id'
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
                    title: '区县'
                    ,class: 'th-district'
                },{
                    field: 'name',
                    title: '姓名'
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
                    }
                    //,{
                    //    field: 'control',
                    //    title: '操作',
                    //    formatter : function(value, row, index) {
                    //        let a = "<button class=\"btn btn-xs btn-success consult_btn\" title=\"查看数据\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>",
                    //            b = "<button class=\"btn btn-xs btn-warning update_btn\" title=\"修改数据\"><i class=\"glyphicon glyphicon-edit\"></i></button>",
                    //            c = "<button class=\"btn btn-xs btn-info email_btn\" data-toggle=\"modal\" data-target=\"#sending_email\" title=\"发送邮件\"><i class=\"glyphicon glyphicon-envelope\"></i></button>";
                    //        //d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
                    //        return a + b + c
                    //
                    //    }
                    //    ,class: 'control'
                    //    ,events : self.eventHandler
                    //}
                ],
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
                            sex: (member_list[i].docSex === 1 ? '男' : '女'),//性别
                            old: member_list[i].docOld,//年龄
                            oldWork: member_list[i].docEmploymentTime,//医龄--从业时间
                            oldStation: member_list[i].docPostageTime,//岗位年龄
                            record: member_list[i].docEducation,//学历
                            idNumber: member_list[i].docIdentity,//身份证
                            proNumber: member_list[i].docPronumber,//资质证
                            kol: (member_list[i].kolId === 1 ? '是' : '否'),//kol属性
                            payer: (member_list[i].payerId === 1 ? '是' : '否'),//payer属性
                            purchase: (member_list[i].purchId === 1 ? '是' : '否'),//采购属性
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
                            dimportant: (member_list[i].importId === 1 ? '重要' : (member_list[i].importId === 2 ? '普通' : '不清楚')),//数据重要性
                            cooperate: (member_list[i].coorId === 1 ? '高' : (member_list[i].coorId === 2 ? '普通' : '低')),//数据配合度
                            active: member_list[i].liveId,//数据活跃度
                            date: member_list[i].docCreateTime,//数据创建日期
                            update: member_list[i].docUpdateTime,//数据更新日期
                            //other: member_list[i].,//其他
                            note: member_list[i].docRemark//备注
                        });
                    }
                    return data;
                }
            });
        $("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
            .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                self.examine(e.type,datas);                              // 保存到全局 Array() 里
            });
    },
    changeCheck_query: function(alt){
        if (this.precise.status.checked.indexOf(alt) === -1){
            this.precise.status.checked.push(alt)
        } else {
            this.precise.status.checked.splice(this.precise.status.checked.indexOf(alt), 1)
        }
    },
    checkAll_query: function(){
        if ($(event.currentTarget).prop('checked')){
            this.precise.status.checked = [];
            for (let i = 0; i < this.precise.alters.length; i++){
                this.precise.status.checked.push(this.precise.alters[i])
            }
        } else {
            this.precise.status.checked = []
        }
    },
    activeCheck_query: function(alt){
        this.precise.status.active = alt
    },
    chooseSingle_query: function(alt){
        this.precise.chosen.push(alt);
        this.disableButtons_query()
    },
    chooseMulti_query: function(){
        for (let i = 0, c = this.precise.status.checked; i < c.length; i++){
            if (c[i].type === this.precise.status.active_label){
                let self = this;
                setTimeout(function(i){c.splice(i, 1); console.log(self)},0);
                this.precise.chosen.push(c[i])
            }
        }
        this.disableButtons_query()
    },
    pickAll_query: function(event){
        if ($(event.currentTarget).prop('checked')){
            this.precise.status.picked = [];
            for (let i = 0; i < this.precise.chosen.length; i++){
                this.precise.status.picked.push(this.precise.chosen[i])
            }
        } else {
            this.precise.status.picked = []
        }
    },
    activePick_query: function(ch){
        this.precise.status.backing = ch
    },
    changePick_query: function(ch){
        if (this.precise.status.picked.indexOf(ch) === -1){
            this.precise.status.picked.push(ch)
        } else {
            this.precise.status.picked.splice(this.precise.status.picked.indexOf(ch), 1)
        }
    },
    backSingle_query: function(ch){
        this.precise.chosen.splice(this.precise.chosen.indexOf(ch), 1);
        this.disableButtons_query()
    },
    backMulti_query: function(){
        for (let i = 0, p = this.precise.status.picked; i < p.length; i++){
            setTimeout(function(i){p.splice(i, 1);},0);
            this.precise.chosen.splice(this.precise.chosen.indexOf(p[i]), 1)
        }
        this.disableButtons_query()
    },
    disableButtons_query: function(){
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
    minus_query: function(con){
        if (this.precise.conditions.length > 1) {
            this.precise.conditions.splice(this.precise.conditions.indexOf(con), 1)
        }
    },
    plus_query: function(con){
        this.precise.conditions.splice(this.precise.conditions.indexOf(con) + 1, 0, {
            relation: 'yu',
            field: '',
            field_name: '',
            operator: '等于',
            value: ''
        })
    },
    changeFieldName_query: function(event, con){
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
    displayOption_query: function(event, con){
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
        this.precise.options_display = con
    },
    stretchOption: function(event, to_stretch){
        event.stopPropagation();
        this.options_in_updating = to_stretch
    },
    reverse_query: function(str){
        //if (){
        //    return true
        //} else {
        //    return false
        //}
        return $('#' + str).position().top > 160
    },
    removeOption_query: function(event){
        //$('.email-warning').fadeOut();
        //setTimeout(function(){
        //    $('.email-warning').remove()
        //},1000);
        this.precise.options_display = '';
        //this.quick.options_display = ''
    },
    assignment_query: function(con,opt){
        if (con.field === 'docSex'){
            con.value = opt === '男' ? '1' : '0'
        } else {
            con.value = opt;
        }
        this.precise.options_display = null
    },
    assignmentPrecise_query: function(opt){
        this.to_update['nameComp'] = opt;
        this.precise.options_display = ''
    },
    preciseQuery_query: function(){
        let self = this;
        this.queryParams = function(){
            return {
                conditions: self.precise.conditions,
                docName: self.precise.member_name,
                hosName: self.precise.nickname,
                medicalNumber: self.precise.member_index,
                limit: this.pageSize,
                offset: (this.pageNumber-1) * this.pageSize
            }
        };
        this.tableInit_query(realPath + '/doctor/precisionSearch');
    },
    queryParams_query: function(){},
    tableInit_query: function(url){
        let self = this;
        $("#result").bootstrapTable('destroy')
            .bootstrapTable({
                url: url,         // 请求后台的URL（*）
                method: 'post',                      // 请求方式（*）
                toolbar: '#button_table',                // 工具按钮用哪个容器
                striped: true,                      // 是否显示行间隔色
                cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   // 是否显示分页（*）
                sortable: false,                     // 是否启用排序
                sortOrder: "asc",                   // 排序方式
                queryParams: self.queryParams,// 传递参数（*）
                sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
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
                            checked : self.status.checked_id.indexOf(row.id) > -1
                        }
                    }
                },{
                    field: 'id',
                    title: 'Id'
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
                    }
                    //,{
                    //    field: 'control',
                    //    title: '操作',
                    //    formatter : function(value, row, index) {
                    //        let a = "<button class=\"btn btn-xs btn-success consult_btn\" title=\"查看数据\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>",
                    //            b = "<button class=\"btn btn-xs btn-warning update_btn\" title=\"修改数据\"><i class=\"glyphicon glyphicon-edit\"></i></button>",
                    //            c = "<button class=\"btn btn-xs btn-info email_btn\" data-toggle=\"modal\" data-target=\"#sending_email\" title=\"发送邮件\"><i class=\"glyphicon glyphicon-envelope\"></i></button>";
                    //        //d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
                    //        return a + b + c
                    //
                    //    }
                    //    ,class: 'control'
                    //    ,events : self.eventHandler
                    //}
                ],
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
                            hosId: (member_list[i].hospital ? member_list[i].hospital.hosId : ''),//单位id
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
                    }
                    return data;
                }
            });
        $("#result").off('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table')
            .on('uncheck.bs.table check.bs.table check-all.bs.table uncheck-all.bs.table',function(e,rows){
                var datas = $.isArray(rows) ? rows : [rows];        // 点击时获取选中的行或取消选中的行
                self.examine(e.type,datas);                              // 保存到全局 Array() 里
            });
    },
    updateMulti: function(){
        this.status.active_board = 'update';
        setTimeout(function () {
            chainReact();
            laydate.render({
                elem: '#age_to_update',
                type: 'date',
                istime: true,
                done: function (value, date) {
                    self.to_update.old = value;
                    //console.log(value);
                    //console.log(date);
                }
            });
            laydate.render({
                elem: '#length_as_medic_to_update',
                type: 'date',
                istime: true,
                done: function (value, date) {
                    self.to_update.oldWork = value;
                    //console.log(value);
                    //console.log(date);
                }
            });
            laydate.render({
                elem: '#post_age_to_update',
                type: 'date',
                istime: true,
                done: function (value, date) {
                    self.to_update.oldStation = value;
                    //console.log(value);
                    //console.log(date);
                }
            });
        }, 0);
    },
    deleteMulti: function(){
        let self = this;
        $.ajax({
            url: realPath + '/doctor/deleteDoctor',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                docId: self.status.checked_id
            }),
            success: function(d){
                d[0].result > 0 && window.location.reload(true)
            },
            error: function(e){
                console.log(e)
            }
        })
    },
    mergeMulti: function(){
        $.ajax({
            url: realPath + '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify(this.status.checked_id),
            success: function(){},
            error: function(){}
        })
    },
    assign: function(row, field){
        if (row[field]){
            switch (field){
                case 'sex':
                    this.to_update['sex'] = row['sex'] == '男' ? '1' : '0';
                    break;
                case 'kol':
                    this.to_update['kol'] = row['kol'] == '是' ? '1' : '0';
                    break;
                case 'payer':
                    this.to_update['payer'] = row['payer'] == '是' ? '1' : '0';
                    break;
                case 'purchase':
                    this.to_update['purchase'] = row['purchase'] == '是' ? '1' : '0';
                    break;
                case 'dimportant':
                    this.to_update['dimportant'] = row['dimportant'] == '重要' ? '1' : (row['dimportant'] == '普通' ? '2' : '3');
                    break;
                case 'cooperate':
                    this.to_update['cooperate'] = row['cooperate'] == '高' ? '1' : (row['cooperate'] == '普通' ? '2' : '3');
                    break;
                default:
                    row[field] && (this.to_update[field] = row[field]);
                    break;
            }
        }
    },
    assignDirect: function(field, value){
        this.to_update[field] = value;
        this.options_in_updating = ''
    },
    assignmentQuick: function(opt){
        this.to_update.hosId = opt.id;
        this.to_update.nameComp = opt.name;
        this.precise.options_display = ''
    },
    queryHospital: function(v){
        if (v.length >=4){
            let self = this;
            self.precise.options_display = 'hospital';
            $.ajax({
                url : "" + realPath + "/hospital/retrieval",
                type : "post",
                dataType : "json",
                async : true,
                crossDomain : true,
                data : v,
                contentType : "application/JSON;charset=utf-8",
                success : function(data) {
                    self.hospital_options = [];
                    for (let i = 0, list = data[0].result; i < list.length; i++){
                        self.hospital_options.push({
                            name: list[i].hosName,
                            id: list[i].hosId,
                            tab: list[i].hosTab
                        })
                    }
                }
            })
        }
    },
    toInsertHospital: function(){},
    updateHospital: function(){
        let self = this;
        $.ajax({
            url: realPath + '/hospital/add',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(self.to_insert),
            async: true,
            success: function(d){
                let hospital_name = self.to_insert.hosName,
                    hospital_id = d[0].result;
                self.to_update.hosId = hospital_id;
                self.to_update.nameComp = hospital_name;
                alert('医院信息创建成功')
            },
            error: function(e){
                console.log(e)
            }
        })
    },
    submitUpdate: function(){
        let data = {},
            source = this.to_update;

        if (this.to_insert.hosName && !source.hosId){
            alert('新的医院信息正在创建中,请稍后重试')
        }

        //idLogin = source.docIdentity,//会员名称
        //province = member_list[i].hospital.hosProvince;//省份
        //city = member_list[i].hospital.hosCity;//城市
        //district = member_list[i].hospital.hosDistrict;//区县
        //nameComp = member_list[i].hospital.hosName;//单位名称
        //level = member_list[i].hospital.hoslelId;//单位级别
        //grade = member_list[i].hospital.hosgraId;
        //type = member_list[i].hospital.typeId;//单位类型
        //profit = member_list[i].hospital.profitId;//盈利性质
        //property = member_list[i].hospital.propertyId;//单位属性


        data.hosId = source.hosId;//医院id
        data.docName= source.name;//姓名
        data.attrId= source.source;//数据属性
        data.catId= source.proType;//职称类别
        data.levId= source.proClass;//职称级别
        data.admiId= source.title;//行政职称
        data.belongId= source.department;//所在科室
        data.categId= source.depType;//科室类别
        data.natId= source.depNature;//科室性质
        data.specId= source.profField;//专业领域
        data.docPhone1= source.mobile;//手机
        data.docPhone2= source.tel1;//联系电话1
        data.docPhone3= source.tel2;//联系电话2
        //data.= source.tel3;//联系电话3
        data.docEmail= source.email;//邮箱
        data.docSex= source.sex;//性别
        data.docOld= source.old;//年龄
        data.docEmploymentTime= source.oldWork;//医龄--从业时间
        data.docPostageTime= source.oldStation;//岗位年龄
        data.docEducation= source.record;//学历
        data.docIdentity= source.idNumber;//身份证
        data.docPronumber= source.proNumber;//资质证
        data.kolId= source.kol;//kol属性
        data.payerId= source.payer;//payer属性
        data.purchId= source.purchase;//采购属性
        data.membId= source.member;//荣誉属性
        //data.payType= source.payType;//支付类型---------------------------------待定
        //data.payAccount= source.payAccount;//支付账号---------------------------------待定
        //data.payName= source.payName;//账号名称---------------------------------待定
        //data.pay1= source.pay1;//支付记录1---------------------------------待定
        //data.pay2= source.pay2;//支付记录2---------------------------------待定
        //data.pay3= source.pay3;//支付记录3---------------------------------待定
        //data.pay4= source.pay4;//支付记录4---------------------------------待定
        //data.pay5= source.pay5;//支付记录5---------------------------------待定
        //data.check= source.check;//审核信息---------------------------------待定
        // data.communication= source.communication;//沟通信息---------------------------------待定
        //data.credit= source.credit;//积分信息---------------------------------待定
        //data.project= source.project;//项目信息---------------------------------待定
        data.importId= source.dimportant;//数据重要性
        data.coorId= source.cooperate;//数据配合度
        data.liveId= source.active;//数据活跃度
        //data.docCreateTime= source.date;//数据创建日期
        //data.docUpdateTime= source.update;//数据更新日期
        //data.other= source.other;//其他
        data.docRemark= source.note;//备注
        data.docId = this.status.checked_id;

        $.ajax({
            url: realPath + '/doctor/insertTemp',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            async: true,
            success: function(data){
                if(data[0].result>0){
                    window.location.reload(true)
                }
            },
            error: function(){}
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
    let self = this;

    try{
        self.tableInit(realPath + '');//生成table

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
                self.categId_options = result.departmentCategory;
                self.natId_options = result.nature;
                self.admiId_options = result.administrative;
                self.liveId_options = result.liveness;
                self.attrId_options = result.attribute;
                self.catId_options = result.category;
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
                console.log(e)
            }

        });
    }catch(e){}

    //$.ajax({
    //    url: realPath + '/system/dictionary',
    //    type: 'post',
    //    contentType: 'application/json;charset=utf-8',
    //    dataType: 'json',
    //    data: JSON.stringify({
    //        email: JSON.parse(sessionStorage.getItem('sysUser')).email
    //    }),
    //    async: true,
    //    success: function(d){
    //        let ul = $('#link_dictionary'),
    //            list = d[0].allMenuList,
    //            len = list.length,
    //            i;
    //
    //        for (i = 0; i < len; i++){
    //            ul.append(`<li>
    //                <a href="`+ list[i].dataUrl +`">`+ list[i].menuName +`</a>
    //            </li>`)
    //        }
    //    },
    //    error: function(e){}
    //})
};
const watch = {
    'duplicate.chosen': {
        handler: function(){
            if (this.duplicate.chosen.length === this.duplicate.alters.length){
                this.duplicate.button_disabled = 'choose-button'
            } else if (!this.duplicate.chosen.length){
                this.duplicate.button_disabled = 'back-button'
            } else {
                this.duplicate.button_disabled = ''
            }
        },
        deep: true
    },
    'to_update.proType': function(v){
        for (let i = 0, categories = this.catId_options; i < categories.length; i++){
            if (v === categories[i].catName){
                this.title_level_list = categories[i].levelList;
                break
            }
        }
    },
    'to_update.depType': function(v){
        for (let i = 0, departments = this.categId_options; i <departments.length; i++){
            if (v === departments[i].categName){
                this.department_list = departments[i].belongedList;
                break
            }
        }
    }
};
const vm = new Vue({
    el: '#root',
    data: data,
    methods: methods,
    mounted: mounted,
    watch: watch
});