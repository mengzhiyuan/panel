/**
 * Created by wangxiangyang on 2018/5/7.
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
        checked_row: [],
        checked_id: []
    },
    spreading: '',
    to_update: {
        hosName: '',
        hosProvince: '',
        hosCity: '',
        hosDistrict: '',
        hoslelId: '',
        hosgraId: '',
        hosTel: '',
        hosWebsite: '',
        hosEstablishmentTime: '',
        hosLegalPerson: '',
        hosRegisteredCapital: '',
        typeId: '',
        profitId: '',
        propertyId: ''
    },
    precise: {
        alters: [{
            name: '医院名称',
            id: 'hosName',
            type: ''
        },{
            name: '医院等级',
            id: 'hosgraId',
            type: 'organization',
            list: ['甲等','乙等','丙等','未知']
        },{
            name: '医院级别',
            id: 'hoslelId',
            type: 'organization',
            list: ['一级','三级','二级','未评级']
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
            name: '医院电话',
            id: 'hosTel',
            type: 'organization'
        },{
            name: '医院网址',
            id: 'hosWebsite',
            type: 'organization'
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
            active_label: 'organization',
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
            name: '医院名称',
            id: 'hosName',
            type: ''
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
            name: '医院电话',
            id: 'hosTel',
            type: 'organization'
        },{
            name: '医院网址',
            id: 'hosWebsite',
            type: 'organization'
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
        if (this.status.active_board === 'duplicate_check'){
            $('#method_merge').css('display', 'none');
            $('#method_update').css('display', 'none');
            $('#method_delete').css('display', 'none');
            this.status.checked_id = [];
            this.status.checked_row = []
        } else {
            $('#method_merge').css('display', 'none');
            if (this.status.active_board === 'query') {
                if ($(event.target).attr('method') === 'update') {
                    $('#method_update').css('display', 'inline-block');
                    $('#method_delete').css('display', 'none');
                    this.status.checked_id = [];
                    this.status.checked_row = []
                } else if ($(event.target).attr('method') === 'delete') {
                	$('#method_update').css('display', 'none');
                    $('#method_delete').css('display', 'inline-block');
                }
            } else {
            	$('#method_update').css('display', 'none');
                $('#method_delete').css('display', 'none');
            }
        }
    },
    preciseQuery: function(){
        let self = this;
        this.queryParams = function(){
            return {
                conditions: self.precise.conditions,
                limit: this.pageSize,
                offset: (this.pageNumber-1) * this.pageSize
            }
        };
        this.tableInit(realPath + '/hospital/preciseSearch');
    },
    queryParams: function(){},
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
    stretchOption_query: function(event, to_stretch){
        event.stopPropagation();
        this.precise.options_display = to_stretch
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
        con.value = opt;
        this.precise.options_display = null
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
        this.tableInit_query(realPath + '/hospital/preciseSearch');
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
                    field: 'hId',
                    title: 'Id'
                    ,class: 'id'
                },{
                    field: 'hosName',
                    title: '单位名称'
                    ,class: 'hosName'
                },{
                    field: 'hoslelId',
                    title: '单位级别'
                    ,class: 'level'
                },{
                    field: 'hosgraId',
                    title: '单位等级'
                    ,class: 'grade'
                },{
                    field: 'hosProvince',
                    title: '省份'
                    ,class: 'th-province'
                },{
                    field: 'hosCity',
                    title: '城市'
                    ,class: 'th-city'
                },{
                    field: 'hosDistrict',
                    title: '区县'
                    ,class: 'th-district'
                },{
                    field: 'hosTel',
                    title: '医院电话',
                    class: 'hosTel'
                },{
                    field: 'hosWebsite',
                    title: '医院网址',
                    class: 'hosWebsite'
                },{
                    field: 'type',
                    title: '单位类型',
                    class: 'type'
                },{
                    field: 'profit',
                    title: '盈利性质',
                    class: 'profit'
                },{
                    field: 'property',
                    title: '单位属性',
                    class: 'property'
                },{
                    field: 'hosEstablishmentTime',
                    title: '成立时间',
                    class: 'hosEstablishmentTime'
                },{
                    field: 'hosLegalPerson',
                    title: '法人',
                    class: 'hosLegalPerson'
                },{
                    field: 'hosRegisteredCapital',
                    title: '注册资金',
                    class: 'hosRegisteredCapital'
                }],
                responseHandler: function(data){
                    let list = data[0].result;
                    data.total = data[0].total;
                    data.rows = [];


                    for (let i = 0, len = list.length; i < len; i++){
                        data.rows.push({
                            hId: list[i].hosId || '',//单位id
                            hosName:  list[i].hosName || '',//单位名称
                            hosProvince:  list[i].hosProvince || '',//省份
                            hosCity:  list[i].hosCity || '',//城市
                            hosDistrict:  list[i].hosDistrict || '',//区县
                            hoslelId:  list[i].hoslelId || '',//单位级别
                            hosgraId:  list[i].hosgraId || '',
                            typeId:  list[i].typeId || '',//单位类型
                            type: list[i].typeId == '1' ? '综合' : (list[i].typeId == 2 ? '专科' : '其他/未知'),
                            profitId:  list[i].profitId || '',//盈利性质
                            profit: list[i].profitId == '1' ? '盈利' : (list[i].profitId == 2 ? '非盈利' : '其他/未知'),
                            propertyId:  list[i].propertyId || '',//单位属性
                            property: list[i].propertyId == '1' ? '公立' : (list[i].propertyId == 2 ? '私立' : '其他/未知'),
                            hosEstablishmentTime:  list[i].hosEstablishmentTime || '',
                            hosLegalPerson:  list[i].hosLegalPerson || '',
                            hosRegisteredCapital:  list[i].hosRegisteredCapital || '',
                            hosTel:  list[i].hosTel || '',
                            hosWebsite:  list[i].hosWebsite || ''
                        });
                        data.total += 1
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
        $('#method_update').css('display', 'none');
        setTimeout(function () {
            chainReact();
            laydate.render({
                elem: '#hosEstablishmentTime_to_update',
                type: 'date',
                istime: true,
                done: function (value, date) {
                    self.to_update.hosEstablishmentTime = value;
                    //console.log(value);
                    //console.log(date);
                }
            })
        }, 0);
    },
    deleteMulti: function(){
        let self = this;
        $.ajax({
            url: realPath + '/hospital/deleteHospital',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
            	hId: self.status.checked_id
            }),
            success: function(d){
                d[0].result > 0 && location.reload()
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

    	field==='hosProvince'&&$('.province').change();
    	field==='hosCity'&&$('.city').change();
    	field==='hosDistrict'&&$('.district').change();

        row[field] && (this.to_update[field] = row[field]);

        field==='hosProvince'&&setTimeout(function(){$('.province').change()},0);
        field==='hosCity'&&setTimeout(function(){$('.city').change()},0);
        field==='hosDistrict'&&setTimeout(function(){$('.district').change()},0);
    },
    submitUpdate: function(){
        let data = {},
            source = this.to_update;

        //if (this.to_insert.hosName && !source.hId){
        //    alert('新的医院信息正在创建中,请稍后重试')
        //}

        data.hId = this.status.checked_id;//单位id
        data.hosName =  source.hosName || '';//单位名称
        data.hosProvince =  source.hosProvince || '';//省份
        data.hosCity =  source.hosCity || '';//城市
        data.hosDistrict =  source.hosDistrict || '';//区县
        data.hoslelId =  source.hoslelId || '';//单位级别
        data.hosgraId =  source.hosgraId || '';
        data.typeId =  source.typeId || '';//单位类型
        data.profitId =  source.profitId || '';//盈利性质
        data.propertyId =  source.propertyId || '';//单位属性
        data.hosEstablishmentTime =  source.hosEstablishmentTime || '';
        data.hosLegalPerson =  source.hosLegalPerson || '';
        data.hosRegisteredCapital =  source.hosRegisteredCapital || '';
        data.hosTel =  source.hosTel || '';
        data.hosWebsite =  source.hosWebsite || '';

        $.ajax({
            url: realPath + '/hospital/insertTemp',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            async: true,
            success: function(data){
                if(data[0].result>0){
                    location.href = './operationalCenter.html';
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
                self.status.checked_row.push(datas[i]), self.status.checked_id.push(datas[i].hId)
            }
            //$.each(datas,function(i,v){
            //    // 添加时，判断一行或多行的 id 是否已经在数组里 不存则添加　
            //    self.status.checked_row.indexOf(v.id) == -1 ? self.status.checked_row.push(v.id) : -1;
            //});
        }else{
            for (let i = 0; i < datas.length; i++){
                self.status.checked_id.splice(self.status.checked_id.indexOf(datas[i].hId),1);
                for (let j = 0; j < self.status.checked_row.length; j++){
                    self.status.checked_row[j].hId === datas[i].hId && self.status.checked_row.splice(j,1)
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
    }catch(e){}


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
    }
};
const vm = new Vue({
    el: '#root',
    data: data,
    methods: methods,
    mounted: mounted,
    watch: watch
});