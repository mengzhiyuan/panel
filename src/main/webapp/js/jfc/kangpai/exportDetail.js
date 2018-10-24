/**
 * Created by wangxiangyang on 2018/5/2.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const vm = new Vue({
    el: '#root',
    data: {
        fields: [],
        status: '',
        export_id: '',
        columns: [{
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
            }
//            ,{
//                field: 'control',
//                title: '操作',
//                formatter : function(value, row, index) {
//                    let a = "<button class=\"btn btn-xs btn-success consult_btn\" title=\"查看数据\"><i class=\"glyphicon glyphicon-eye-open\"></i></button>",
//                        b = "<button class=\"btn btn-xs btn-warning update_btn\" title=\"修改数据\"><i class=\"glyphicon glyphicon-edit\"></i></button>",
//                        c = "<button class=\"btn btn-xs btn-info email_btn\" data-toggle=\"modal\" data-target=\"#sending_email\" title=\"发送邮件\"><i class=\"glyphicon glyphicon-envelope\"></i></button>",
//                        d = "<button class=\"btn btn-xs btn-default manage_btn\" title=\"管理数据\"><i class=\"glyphicon glyphicon-cog\"></i></button>";
//                    return a + b + c + d
//
//                }
//                ,class: 'control'
//                ,events : self.eventHandler
//            }
            ]
    },
    methods: {
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
                    columns: self.columns,
                    responseHandler: function(data){
                        let member_list = data[0].result,
                        len = member_list.length;
                        data.total = data[0].total;
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
                        return data;
                    }
                })
        },
        exportExecute: function(){
            let self = this;
            $.ajax({
                url : realPath + '/doctor/derivedExport',
                type : "post",
                dataType : "json",
                async : true,
                crossDomain : true,
                data : JSON.stringify({
                    derId: self.export_id
                }),
                contentType : "application/JSON;charset=utf-8",
                success : function(data) {
                    window.open(realPath + data[0].result);
                    location.reload()
                },
                error: function(e){
                    console.log(e)
                }
            });
        },
        approve: function(){
            let self = this;
            $.ajax({
                url : realPath + '/doctor/passAndReject',
                type : "post",
                dataType : "json",
                async : true,
                crossDomain : true,
                data : JSON.stringify({
                    derId: self.export_id,
                    derStatus: 1
                }),
                contentType : "application/JSON;charset=utf-8",
                success : function(data) {
                    console.log(data);
                }
            });
        },
        decline: function(){
            let self = this;
            $.ajax({
                url : realPath + '/doctor/passAndReject',
                type : "post",
                dataType : "json",
                async : true,
                crossDomain : true,
                data : JSON.stringify({
                    derId: self.export_id,
                    derStatus: 2
                }),
                contentType : "application/JSON;charset=utf-8",
                success : function(data) {
                    console.log(data);
                }
            });
        }
    },
    mounted: function(){
        let self = this;
        self.status = sessionStorage.getItem('export_apply_status') - 0;
        self.export_id = sessionStorage.getItem('export_apply_id');
        self.fields = sessionStorage.getItem('export_apply_field').split(',');

        for (let i = 0; i < self.columns.length; i++){
            self.columns[i].visible = self.fields.indexOf(self.columns[i].field) > -1
        }
        self.queryParams = function(){
            return {
                derId: self.export_id,
                limit: this.pageSize,
                offset: (this.pageNumber-1) * this.pageSize
            }
        };
        self.tableInit(realPath + '/doctor/derivedSearch')
    }
});