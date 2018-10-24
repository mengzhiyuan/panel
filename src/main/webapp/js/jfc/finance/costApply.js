/**
 * Created by wangxiangyang on 2018/2/5.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const costApply_data = {
    email: '',//申请人
    apply_date: '',//申请日期
    due_date_start: '',//使用周期-开始
    due_date_end: '',//使用周期-结束
    amount_need: '',//需要金额
    amount_in_account: '',//现有金额
    amount_to_apply: '',//申请金额
    staId: '',
    events: [{
        proId: '',
        proName: ''
    }],
    staffs: [{
        staId: '',
        staName: ''
    }],
    list: [//下面的表格
        {
            type: '',//类型
            detail: '',//明细
            relation: '',//关联事件
            total: '',//共计/元
            paid: '',//已付/元
            applyingAmount: '',//本次申请/元
            amountReplied: '',//批复/元
            paying: '',//支付/元
            remark: ''//备注
        }
    ]
},
    costApply_vm = new Vue({
        el: '#root',
        data: costApply_data,
        mounted: function(){
            //初始化日期-时间控件
            laydate.render({
                elem: '#due_date_start',
                type: 'datetime'
            });
            laydate.render({
                elem: '#due_date_end',
                type: 'datetime'
            });
            //定时将laydate中时间赋给vue数据
            let self = this;
            setInterval(function(){
                let d = new Date();
                self.apply_date =
                    '' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +
                    ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                self.due_date_start = $('#due_date_start').val();
                self.due_date_end = $('#due_date_end').val()
            },500);
            //填充提交对象和项目
            $.ajax({
                url: realPath + '/finance/financeProjectSeach',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify({
                    staId: JSON.parse(sessionStorage.getItem('sysUser')).id
                }),
                success: function (data){
                    let staffs = data[0].listStaff,
                        projects = data[0].listProject;

                    for (let i = 0; i < staffs.length; i++){
                        self.staffs.push({
                            staId: staffs[i].staId,
                            staName: staffs[i].staName
                        })
                    }
                    for (let j = 0; j < projects.length; j++){
                        self.events.push({
                            proId: projects[j].proId,
                            proName: projects[j].proName
                        })
                    }

                },
                error: function (e){
                    console.log(e)
                }
            })
        },
        watch:{
            list: {
                handler: function (val, old){
                    let to_apply = 0;
                    for (let i = 0; i < this.list.length; i++){
                        let this_apply = 0;
                        if (parseFloat(this.list[i].total > 0)){
                            this_apply = this.list[i].total
                        }
                        to_apply += this_apply
                    }
                    this.amount_need = to_apply;
                },
                deep: true
            }
        },
        methods:{
            submit: function (event){
                delete(costApply_data.events);
                delete(costApply_data.staffs);
                try {
                    costApply_data.email = JSON.parse(sessionStorage.getItem('sysUser'))['email'];
                } catch (e) {
                    alert('没有检测到登录信息。');
                    return false
                }
                $.ajax({
                    url: realPath + '/finance/financeAdd',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    async: true,
                    data: JSON.stringify(costApply_data),
                    success: function (data){
                        if (data[0].result > 0){
                            alert('提交成功。')
                        } else {
                            console.log(data);
                            alert('提交失败')
                        }
                    },
                    error: function (e){
                        console.log(e);
                        alert('操作失败。')
                    }
                })
            },
            insertAfter: function (r){
                this.list.splice(this.list.indexOf(r) + 1, 0, {
                    type: '',//类型
                    detail: '',//明细
                    relation: '',//关联事件
                    total: '',//共计/元
                    paid: '',//已付/元
                    applyingAmount: '',//本次申请/元
                    amountReplied: '',//批复/元
                    paying: '',//支付/元
                    remark: ''//备注
                });
            },
            deleteThis: function (r){
                if (this.list.length <= 1) return;
                this.list.splice(this.list.indexOf(r), 1)
            }
        }
    });