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
    		form_now: 'fuzzy',
            spreading: '',
            fuzzy: {
                keyword: ''
            },
            quick: {
            	 data_chunk: {
            		 hosProvince:'',
            		 hosCity:'',
            		 hosDistrict:'',
            		 hoslelId:'',
            		 hosgraId:'',
            		 hosName:'',
            		 hosTel:'',
            		 typeId:'',
            		 propertyId:'',
            		 profitId:'',
            		 hosEstablishmentTime:'',
            		 hosLegalPerson:'',
            		 hosRegisteredCapital:'',
            	 }
            },
            precise: {
                 alters: [{
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
	            option_display: null,
	            options: []
            },
            eventHandler: {
                'click .consult_btn': function(e, value, row, index){
                    sessionStorage.setItem('memberDetail', JSON.stringify(row));
                    sessionStorage.setItem('detailStatus','consult');
                    document.location.href = './dataDetail.html'
                },
                'click .update_btn': function (e, value, row, index) {
                    //sessionStorage.setItem('memberDetail', JSON.stringify(row));
                    //sessionStorage.setItem('detailStatus','update')
                },
                'click .manage_btn': function (e, value, row, index) {
                    //deleteItem(row)
                }
            },
            email_address: [],
            email_title: '',
            email_container: null
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
                    keyword: self.fuzzy.keyword,
                    limit: this.pageSize,
                    offset: (this.pageNumber-1) *this.pageSize
                }
            };
            this.tableInit(realPath + '/hospital/search')
        },
        quickQuery: function(){
            let self = this;
            this.queryParams = function(){
                let to_send = JSON.parse(JSON.stringify(self.quick.data_chunk));
                to_send.limit = this.pageSize;
                to_send.offset = (this.pageNumber-1) * this.pageSize;
                return to_send
            };
            this.tableInit(realPath + '/hospital/accuracySearch')
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
                        checkbox: false
                    },{
                        field: 'id',
                        title: 'Id'
                    },{
                        field: 'hosName',
                        title: '单位名称',
                        visible: true
                    },{
                        field: 'hosProvince',
                        title: '省份'
                    },{
                        field: 'hosCity',
                        title: '城市'
                    },{
                        field: 'hosDistrict',
                        title: '区县'
                    },{
                        field: 'hoslelId',
                        title: '级别'
                    },{
                        field: 'hosgraId',
                        title: '等级',
                        visible: true
                    },{
                        field: 'hosTel',
                        title: '座机',
                        visible: false
                    },{
                        field: 'hosWebsite',
                        title: '网址',
                        visible: false
                    },{
                        field: 'hosEstablishmentTime',
                        title: '成立时间',
                        visible: false
                    },{
                        field: 'hosLegalPerson',
                        title: '法人',
                        visible: false
                    },{
                        field: 'hosRegisteredCapital',
                        title: '注册资金',
                        visible: false
                    },{
                        field: 'typeId',
                        title: '医院类型',
                        visible: false
                    },{
                        field: 'profitId',
                        title: '盈利性质',
                        visible: false
                    },{
                        field: 'propertyId',
                        title: '医院属性',
                        visible: false
                    },{
                        field: 'control',
                        title: '操作',
                        formatter : function(value, row, index) {
                            let a = "<button class=\"btn btn-xs btn-success consult_btn\" title=\"查看数据\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>",
                                b = "<button class=\"btn btn-xs btn-warning update_btn\" title=\"修改数据\"><i class=\"glyphicon glyphicon-edit\"></i></button>";
                                //c = "<button class=\"btn btn-xs btn-info email_btn\" data-toggle=\"modal\" data-target=\"#sending_email\" title=\"发送邮件\"><i class=\"glyphicon glyphicon-envelope\"></i></button>";
                                //d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
                            return a + b;

                        }
                        ,events : self.eventHandler
                    }],
                    responseHandler: function(data){
                        let member_list = data[0].result;
                        data.total = data[0].total;
                        data.rows = [];


                        for (let i = 0, len = member_list.length; i < len; i++){
                        	var da = {};
                        	da.id= member_list[i].hosId;//编号
                        	da.hosName=member_list[i].hosName;//会员名称
                        	da.hosProvince= member_list[i].hosProvince;//省份
                        	da.hosCity=member_list[i].hosCity;//城市
                        	da.hosDistrict=member_list[i].hosDistrict;//区县
                        	da.hoslelId=member_list[i].hoslelId;//姓名
                        	da.hosgraId=(member_list[i].hosgraId ? member_list[i].hosgraId : '');//数据属性
                        	da.hosTel=(member_list[i].hosTel ? member_list[i].hosTel: '');//职称类别
                        	da.hosWebsite=member_list[i].hosWebsite;//职称级别
                        	da.hosEstablishmentTime= (member_list[i].hosEstablishmentTime ? member_list[i].hosEstablishmentTime : '');//行政职称
                        	da.hosLegalPerson= member_list[i].hosLegalPerson;//所在科室
                        	da.hosRegisteredCapital=(member_list[i].hosRegisteredCapital ? member_list[i].hosRegisteredCapital: '');//科室类别
                        	if( member_list.length>0){
                        		if(member_list[i].typeId===1){
                               	    da.typeId ='综合';
                                }else if(member_list[i].typeId===2){
                                	da.typeId ='专科';
                                }else if(member_list[i].typeId===3){
                                	da.typeId ='未知/其他';
                                }else{
                                	da.typeId = '';
                                }
                        		if(member_list[i].profitId==1){
	                            	da.profitId='盈利';
	                            }else if(member_list[i].profitId==2){
	                            	da.profitId= '非盈利';
	                            }else if(member_list[i].profitId==3){
	                            	da.profitId='未知/其他';
	                            }else{
	                            	da.profitId= '';
	                            }
                        		if(member_list[i].propertyId==1){
 	                            	da.propertyId= '公立';
 	                            }else if(member_list[i].propertyId==2){
 	                            	da.propertyId= '私立';
 	                            }else if(member_list[i].propertyId==3){
 	                            	da.propertyId='未知/其他';
 	                            }else{
 	                            	da.propertyId='';
 	                            }
                        	}else{
                        		da.typeId ='';
                        		da.profitId= '';
                        		da.propertyId='';
                        	}
                        	data.rows.push(da);
                            data.total += 1
                        }
                        return data;
                    }
                });
        },
    };
    const mounted = function(){

        let self = this;

        try {
            $.ajax({
                url: realPath + '',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                success: function(d){

                },
                error: function(error){

                }
            })
        } catch (e) {}

        laydate.render({
            elem: '#hosEstablishmentTime',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.quick.data_chunk.hosEstablishmentTime = value;
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
        mounted: mounted
    });
});