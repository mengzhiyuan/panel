/**
 * Created by wangxiangyang on 2018/4/19.
 */
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPath+projectName;
$(function(){
    $(window).unload(function(){
        sessionStorage.removeItem('memberDetail');
        sessionStorage.removeItem('detailStatus');
    });
    const data = {
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
        data_chunk: {
            hosProvince: '',//省份province
            hosCity: '',//城市city
            hosDistrict: '',//区县district
            docName: '',//姓名name
            attrId: '',//数据属性source
            catId: '',//职称类别proType
            levId: '',//职称级别proClass
            admiId: '',//行政职称title
            belongId: '',//所在科室department
            categId: '',//科室类别depType
            natId: '',//科室性质depNature
            specId: '',//专业领域profField
            hosId: '',//单位id
            hosName: '',//单位名称nameComp
            hosgraId: '',//单位等级
            hosLelId: '',//单位级别level
            typeId: '',//单位类型type
            profitId: '',//盈利性质profit
            propertyId: '',//单位属性property
            docPhone1: '',//手机mobile
            docPhone2: '',//联系电话1tel1
            docPhone3: '',//联系电话2tel2
            docPhone4: '',//联系电话3tel3
            docEmail: '',//邮箱email
            docSex: '',//性别sex
            docOld: '',//年龄old
            docEmploymentTime: '',//医龄oldWork
            docPostageTime: '',//岗位年龄oldStation
            docEducation: '',//学历record
            docIdentity: '',//身份证idNumber
            docPronumber: '',//资质证proNumber
            kolId: '',//KOL属性kol
            payerId: '',//Payer属性payer
            purchId: '',//采购属性purchase
            membId: '',//荣誉属性member
            pay_methods: '',//支付类型payType
            account: '',//支付账号payAccount
            username: '',//账号名称payName
            payment1: '',//支付记录1pay1
            payment2: '',//支付记录2pay2
            payment3: '',//支付记录3pay3
            payment4: '',//支付记录4pay4
            payment5: '',//支付记录5pay5
            examine: '',//审核信息check
            communication: '',//沟通信息communication
            bonus: '',//积分信息credit
            project: '',//项目信息project
            importId: '',//数据重要性dimportant
            coorId: '',//数据配合度cooperate
            liveId: '',//数据活跃度active
            docCreateTime: '',//数据创建日期date
            docUpdateTime: '',//数据更新日期update
            others: '',//其他other
            docRemark: ''//备注note
        },
        categId_options: [],
        natId_options: [],
        admiId_options: [],
        liveId_options: [],
        attrId_options: [],
        catId_options: [],
        hospitals: [],

        stretching: '',
        title_level_list: [],
        department_list: [],
        professional_list: []
    };
    const methods = {
        searchHospital: function(c, t){
            if (c === 13 && t.value.length >= 4){
                let self = this;
                $.ajax({
                    url: realPath + '/hospital/retrieval',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: t.value,
                    success: function(d){
                        self.hospitals = d[0].result;
                    }
                })
            }
        },
        assignHospital: function(h){
            let self = this;
            self.data_chunk.hosName = h.hosName;
            self.data_chunk.hosId = h.hosId;
            self.data_chunk.hosProvince = h.hosProvince;
            setTimeout(function(){
                $('#province').change();
                self.data_chunk.hosCity = h.hosCity;
                setTimeout(function(){
                    $('#city').change();
                    self.data_chunk.hosDistrict = h.hosDistrict;
                },0)
            },0);
            self.data_chunk.hosgraId = h.hosgraId;
            self.data_chunk.hosLelId = h.hoslelId;
            self.data_chunk.profitId = h.profitId;
            self.data_chunk.propertyId = h.propertyId;
            self.data_chunk.typeId = h.typeId;
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
                    self.data_chunk.hosId = hospital_id;
                    self.data_chunk.hosName = hospital_name;
                    self.data_chunk.hosgraId = self.to_insert.hosgraId;
                    self.data_chunk.hosLelId = self.to_insert.hoslelId;
                    self.data_chunk.profitId = self.to_insert.profitId;
                    self.data_chunk.propertyId = self.to_insert.propertyId;
                    self.data_chunk.typeId = self.to_insert.typeId;
                    self.data_chunk.hosProvince = self.to_insert.hosProvince;
                    setTimeout(function(){
                        $('#province').change();
                        self.data_chunk.hosCity = self.to_insert.hosCity;
                        setTimeout(function(){
                            $('#city').change();
                            self.data_chunk.hosDistrict = self.to_insert.hosDistrict;
                        },50)
                    },50)
                    alert('医院信息创建成功')
                },
                error: function(e){
                    console.log(e)
                }
            })
        },
        appendData: function(){
            let data_chunk = this.data_chunk;
            if (!data_chunk.hosProvince || !data_chunk.hosCity || !data_chunk.docName || !data_chunk.catId || !data_chunk.levId || !data_chunk.belongId || !data_chunk.hosName || !data_chunk.hosLelId || !data_chunk.hosgraId || !data_chunk.typeId){
                alert('请将红色标签的信息补充完整');
                return
            }
            if (!data_chunk.docPhone1 && !data_chunk.docPhone2 && !data_chunk.docEmail){
                alert('至少补充手机号码、邮箱地址或一个联系电话信息');
                return
            }
            let data_string = JSON.stringify(data_chunk);
            if (this.to_insert.hosName && !this.data_chunk.hosId){
                alert('新的医院信息正在创建中,请稍后重试')
            }
            $.ajax({
                url: realPath + '/doctor/add',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: data_string,
                success: function(d){
                    if (d[0].doctors){
                        simpleAlert('操作成功', '#00db00');
                        location.href ='./dataDetail.html';
                    } else {
                        simpleAlert('操作失败', '#f56c6c')
                    }
                },
                error: function(e){
                    simpleAlert('操作失败', '#f56c6c')
                }
            })
        },
        stretchOptions: function(event, name){
            event.stopPropagation();
            event.preventDefault();
            this.stretching = name
        },
        shrinkOptions: function(){
            this.stretching = ''
        },
        assign: function(name, value){
            this.data_chunk[name] = value;
            this.stretching = ''
        },
        insert: function(){
            //$("#uploadModal").css("display", "none");
            //$('.modal-backdrop').css("display", "none");
            $(".demo").show();
            //int=setInterval(clock,3000);
            var option = {
                url: ""+realPath+"/doctor/ImportExcel",
                type: 'post',
                dataType:"json",
                clearForm: true,
                resetForm: true,
                success: function(data){
                    var res = data[0]["result"];
                    //clearInterval(int);
                    if (res > 0){
                        //$(".progress-bar").width("100%");
                        //$("#spa").html("100%");
                        //$("#uploadModal").css("display", "none");
                        //var dialog_excel = new TipBox({type:'success',str:'操作成功',hasBtn:true});
                        //$(".okoButton").one("click", function(){
                        //    requestDoctor(1);
                        //    $(".demo").hide();
                        //    $(".progress-bar").width("0%");
                        //    $("#spa").html("0%");
                        //    $("#uploadModal").css("display", "none");
                        //    $(".modal-backdrop").css("display", "none");
                        //});
                        alert('批量添加成功。')
                    } else {
                        //var dialog = new TipBox({type: 'error', str: '操作失败,请重试',hasBtn:true});
                        alert('操作失败。')
                    }
                }
            };
            $("#excelImport").ajaxSubmit(option);
            return false;
        }
    };
    const watch = {
        'data_chunk.catId': function(v){
            for (let i = 0, categories = this.catId_options; i < categories.length; i++){
                if (v === categories[i].catName){
                    this.title_level_list = categories[i].levelList;
                    break
                }
            }
        },
        'data_chunk.categId': function(v){
            for (let i = 0, departments = this.categId_options; i <departments.length; i++){
                if (v === departments[i].categName){
                    this.department_list = departments[i].belongedList;
                    break
                }
            }
        }
    };
    const mounted = function(){

//        try {
            let self = this;
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
                },
                error: function(e){
                	console.error(e)
                }

            });
//        } catch (e) {}
        laydate.render({
            elem: '#age',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.data_chunk.docOld = value;
                //console.log(value);
                //console.log(date);
            }
        });
        laydate.render({
            elem: '#length_as_medic',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.data_chunk.docEmploymentTime = value;
                //console.log(value);
                //console.log(date);
            }
        });
        laydate.render({
            elem: '#post_age',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.data_chunk.docPostageTime = value;
                //console.log(value);
                //console.log(date);
            }
        });

        if (sessionStorage.getItem('memberDetail')){
            try {
                let dc = this.data_chunk,
                    data = JSON.parse(sessionStorage.getItem('memberDetail'));

                function assignName(receipt_name, send_name){
                    dc[receipt_name] = data[send_name] || ''
                }

                assignName('hosProvince','province');
                assignName('hosCity','city');
                assignName('hosDistrict','district');
                assignName('docName','name');
                assignName('attrId','source');
                assignName('catId','proType');
                assignName('levId','proClass');
                assignName('admiId','title');
                assignName('belongId','department');
                assignName('categId','depType');
                assignName('natId','depNature');
                assignName('specId','profField');
                assignName('hosName','nameComp');
                assignName('hosgraId','grade');
                assignName('hosLelId','level');
                assignName('typeId','type');
                assignName('profitId','profit');
                assignName('propertyId','property');
                assignName('docPhone1','mobile');
                assignName('docPhone2','tel1');
                assignName('docPhone3','tel2');
                assignName('docPhone4','tel3');
                assignName('docEmail','email');
                assignName('docSex','sex');
                assignName('docOld','old');
                assignName('docEmploymentTime','oldWork');
                assignName('docPostageTime','oldStation');
                assignName('docEducation','record');
                assignName('docIdentity','idNumber');
                assignName('docPronumber','proNumber');
                assignName('kolId','kol');
                assignName('payerId','payer');
                assignName('purchId','purchase');
                assignName('membId','member');
                assignName('pay_methods','payType');
                assignName('account','payAccount');
                assignName('username','payName');
                assignName('payment1','pay1');
                assignName('payment2','pay2');
                assignName('payment3','pay3');
                assignName('payment4','pay4');
                assignName('payment5','pay5');
                assignName('examine','check');
                assignName('communication','communication');
                assignName('bonus','credit');
                assignName('project','project');
                assignName('importId','dimportant');
                assignName('coorId','cooperate');
                assignName('liveId','active');
                assignName('docCreateTime','date');
                assignName('docUpdateTime','update');
                assignName('others','other');
                assignName('docRemark','docRemark');
            } catch (e) {}
            if (sessionStorage.getItem('detailStatus') === 'consult'){
                $('input').prop('disabled', true);
                $('select').prop('disabled', true);
                $('button').prop('disabled', true)
            } else {
                $('input').prop('disabled', false);
                $('select').prop('disabled', false);
                $('button').prop('disabled', false)
            }
        }
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        watch: watch,
        mounted: mounted
    });
});