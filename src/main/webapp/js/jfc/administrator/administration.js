/**
 * Created by wangxiangyang on 2018/3/7.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;

const administration_data = {
    messages: [
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''},
        {type: 'msg', id: '', text: ''}
    ],
    informs: [
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''},
        {type: 'inf', id: '', text: ''}
    ],
    links: [
        {
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        }
    ],
    checked: [],
    menus: [
        {
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        },{
            menName: '',//
            menUrl: '',//
            menStaId: '',//
            menImg: ''//
        }
    ]
};
const administration_methods = {
    jump: function(t){//信息、公告中转
        document.location.href = t.menUrl
    },
    beforeAppend: function(){
        let self = this;
        $.ajax({
            url: realPath + '/system/allLevelMenu',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
            	email: JSON.parse(sessionStorage.getItem('sysUser')).email
            }),
            success: function(data){
                let d = data[0].allMenuList,
                    arr = [],
                    staId = JSON.parse(sessionStorage.getItem('sysUser')).id;
                for (let i = 0, l = d.length; i < l; i++){
                    arr.push({
                        menName: d[i].menuName,//
                        menUrl: d[i].dataUrl,//
                        menStaId: staId,//
                        menImg: d[i].menuClass//
                    })
                }
                self.links = arr
            },
            error: function(e){
                console.log(e)
            }
        })
    },
    changeChecked: function(l){
        if (this.checked.indexOf(l.menName) === -1){
            this.checked.push(l.menName)
        } else {
            this.checked.splice(this.checked.indexOf(l.menName), 1)
        }
    },
    appendChecked: function(){
        let to_send = {
            menStaId: JSON.parse(sessionStorage.getItem('sysUser')).id,
            checked: []
        },
            links = this.links,
            l = links.length,
            i;
        for (i = 0; i < l; i++){
            if (this.checked.indexOf(links[i].menName) > -1){
                to_send.checked.push(links[i])
            }
        }
        $.ajax({
            url: realPath + '/adminHome/adminHomeSaveOrUpdate',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify(to_send),
            success: function(data){
                let d = data[0]
            },
            error: function(e){}
        })
    }
};
const administration_created = function(){
    let self = this;
    $.ajax({
        url: realPath + '/adminHome/adminHomeInit',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({
            menStaId: JSON.parse(sessionStorage.getItem('sysUser')).id,
            nominee: JSON.parse(sessionStorage.getItem('sysUser')).userName
        }),
        success: function(data){
            let d = data[0].jfcMenuSettings,
                m = data[0].actRuTask,
                msg = [],
                arr = [],
                list = [];
            for (let i = 0; i < d.length; i++){
                arr.push(d[i].menName);
                list.push({
                    menName: d[i].menName,//
                    menUrl: d[i].menUrl,//
                    menStaId: d[i].menStaId,//
                    menImg: d[i].menImg//
                })
            }
            for (let a = 0; a < m.length; a++){
                msg.push({
                    id: m[a].id,
                    name: m[a].name,
                    time: (m[a].createTime.year+1900) + '.' + (m[a].createTime.month+1) + '.' + (m[a].createTime.date) + ' ' + (m[a].createTime.hours) + ':' + (m[a].createTime.minutes) + ':' + (m[a].createTime.seconds)
                })
            }
            self.checked = arr;
            self.menus = list;
            self.messages = msg;
        },
        error: function(e){}
    })
};
const administration_vm = new Vue({
    el: '#root',
    data: administration_data,
    methods: administration_methods,
    created: administration_created
});