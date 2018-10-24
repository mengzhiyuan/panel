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

        stretching: '',
        title_level_list: [
            '住院医师','DIC主治医师','VCD副主任医师','CD主任医师',
            '药士','初级药师','主管药师','副主任药师','主任药师',
            '技师','主管技师','副主任技师','主任技师',
            '护士','护师','主管护师','副主任护师','主任护师'],
        department_list: [
            '普通内科','呼吸科','心血管内科','内分泌科','消化内科','血液科','肾脏内科','神经内科','过敏与免疫科','老年科/干部科','风湿科','血透室（血液透析中心）','介入科',
            '普通外科','骨科','心脏/胸外科','泌尿科','神经外科/脑外科','血管外科','整形外科','腺体外科（乳腺外科/胰腺外科）','消化外科','肛肠科','肝胆外科','结石科','器官移植','烧伤科','手足显微外科',
            '妇产科','儿科','不孕不育/生殖中心','男科','计划生育',
            '眼科','耳鼻喉科','口腔科',
            '化疗科','放疗科','肿瘤内科','肿瘤外科','肿瘤康复科','骨肿瘤科',
            '急诊科','ICU',
            '传染病','肝病','艾滋病','结核病','寄生虫病',
            '放射医学（放射科/核医学科）','影像科/超声科（B超/彩超/CT）','心电图室','心功能室','胃镜室','内镜室',
            '病理科','检验科','药剂科','药店','职业病','精神科','心理咨询科（心理医学科）',
            '设备科','信息科','采购科','系统管理',
            '实验室','麻醉科',
            '皮肤科','营养科','保健科','康复理疗/护理','全科','疼痛科','预防保健科','公共卫生与预防'
        ],
        professional_list: [
            '肿瘤/癌症领域','心脏器官','呼吸器官','运动器官','消化系统','内分泌系统','神经领域','精神/心理','肾脏/泌尿系统','血液','皮肤','风湿','眼科','耳鼻喉','妇产科','儿科','康复护理','疼痛'
        ]
    };
    const methods = {
        appendData: function(){
            let data_string = JSON.stringify(this.data_chunk);
            $.ajax({
                url: realPath + '/doctor/add',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: data_string,
                success: function(d){},
                error: function(e){}
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
                    self.categId_options = result.departmentCategory;
                    self.natId_options = result.nature;
                    self.admiId_options = result.administrative;
                    self.liveId_options = result.liveness;
                    self.attrId_options = result.attribute;
                    self.catId_options = result.category;
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
        mounted: mounted
    });
});