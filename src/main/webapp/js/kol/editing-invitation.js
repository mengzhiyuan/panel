/**
 * Created by wangxiangyang on 2018/5/30.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const data = {
    status: {
        checked_row: [],
        checked_samId: [],
        link_type: '',
        link_address: '',
        sender_email: '',
        email_title: '',
        email_container: null
    },
    bootstrap_table: {
        eventHandler: {
            'click': function(e, value, row, index){

            }
        }
    }
};
const methods = {
    sendEmail: function (){

        if (this.status.email_container.getContent() === ''){
            simpleAlert('请输入邮件内容', '#f56c6c');
            return
        }

        $.ajax({
            url: '#',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                addPerson: JSON.parse(sessionStorage.getItem('sysUser')).userName,
                email: this.status.sender_email,
                emailContent: this.status.email_container.getContent()
            }),
            success: function(d){
                if (d[0].result > 0){
                    simpleAlert('发送成功', '00db00');
                    document.location.href = './sampling.html'
                } else {
                    simpleAlert('发送失败', '#f56c6c')
                }
            },
            error: function(e){
                console.log(e);
                simpleAlert('发送失败', '#f56c6c')
            }
        })
    }
};
const mounted = function(){


    let self = this;

    try {
        self.status.email_container = UE.getEditor('email_container',{
            zIndex: 1060
        });
    } catch (e) {}
};
const beforeCreate = function(){};
const watch = {};
const vm = new Vue({
    el: '#root',
    data: data,
    methods: methods,
    beforeCreate: beforeCreate,
    mounted: mounted,
    watch: watch
});