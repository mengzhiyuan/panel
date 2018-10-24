/**
 * Created by wangxiangyang on 2018/3/6.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const deploy_data = {
        management: [
            {
                id: '',
                name: '',
                time: ''
            }
        ],
        message: [
            {
                id: '',
                name: '',
                key: '',
                version: '',
                file: '',
                picture: '',
                deploy_id: '',
                link: ''
            }
        ],
        upload_url: realPath + '/workflow/newdeploy'
},
    deploy_methods = {
        deleteT: function(mgt){//删除----------------------------------------------------------------------------
            $.ajax({
                url: realPath + '/workflow/delDeployment',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    deploymentId: mgt.id
                }),
                async: false,
                success: function(data){},
                error: function(e){}
            })
        },
        check: function(msg){//查看流程图----------------------------------------------------------------------------
            $.ajax({
                url: realPath + '/workflow/viewImage',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    deploymentId: msg.deploy_id,
                    imageName: msg.picture
                }),
                async: false,
                success: function(data){},
                error: function(e){}
            })
        },
        timeString: function(time){
            if (time){
                var string = '';
                string += (time.year + 1900)
                    + '-' + (time.month + 1)
                    + '-' + time.date
                    + ' ' + time.hours
                    + ':' + time.minutes
                    + ':' + time.seconds;
                return string;
            } else {
                return undefined
            }
        }
    },
    deployCreated = function(){//初始化----------------------------------------------------------------------------
        let self = this;
        $.ajax({
            url: realPath + '/workflow/deployHome',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({}),
            async: false,
            success: function(data){
                let mgts = data[0].actReDeployment,
                    msgs = data[0].actReProcdef,
                    mgt_arr = [],
                    msg_arr = [],
                    lt = mgts.length,
                    ls = msgs.length,
                    i;
                for (i = 0; i < lt; i++){
                    mgt_arr.push({
                        id: mgts[i].id,
                        name: mgts[i].name,
                        time: self.timeString(mgts[i].deployTime)
                    })
                }
                for (i = 0; i < ls; i++){
                    let obj = {};
                    obj.id = msgs[i].id;
                    obj.name = msgs[i].name;
                    obj.key = msgs[i].key;
                    obj.version = msgs[i].version;
                    obj.file = msgs[i].resourceName;
                    obj.picture = msgs[i].dgrmResourceName;
                    obj.deploy_id = msgs[i].deploymentId;
                    obj.link = realPath + '/workflow/viewImage?deploymentId=' + obj.deploy_id + '&imageName=' + obj.picture;
                    msg_arr.push(obj)
                }
                self.management = mgt_arr;
                self.message = msg_arr;
            },
            error: function(e){}
        })
    },
    deploy_vm = new Vue({
        el: '#root',
        data: deploy_data,
        methods: deploy_methods,
        created: deployCreated
    });