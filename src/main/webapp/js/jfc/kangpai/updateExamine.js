/**
 * Created by wangxiangyang on 2018/5/3.
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
        applies: [],
        leagues: []
    },
    methods: {
        //jumpToDetail: function(ap){
        //    sessionStorage.setItem('export_apply_id', ap.id);
        //    sessionStorage.setItem('export_apply_field', ap.fields);
        //    sessionStorage.setItem('export_apply_status', ap.status==='to_export' ? '1' : '0');
        //    window.open('./exportDetail.html')
        //}
        approve: function(ap){
            if (ap.resolve==='update'){
                if (ap.type==='mem'){
                    $.ajax({
                        url : realPath + '/doctor/passOrRefuse',
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            forTempId: ap.temp_id,
                            status: '通过'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                } else {
                    $.ajax({
                        url : realPath + '/hospital/passOrRefuse',
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            forTempId: ap.temp_id,
                            status: '通过'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                }
            } else if (ap.resolve==='delete') {
                if (ap.type==='mem'){
                    $.ajax({
                        url : "" + realPath + "/doctor/deletePassOrRefuse",
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            status: '通过'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                } else {
                    $.ajax({
                        url : "" + realPath + "/hospital/deletePassOrRefuse",
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            status: '通过'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                }
            }
        },
        decline: function(ap){
            if (ap.resolve==='update'){
                if (ap.type==='mem'){
                    $.ajax({
                        url : realPath + '/doctor/passOrRefuse',
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            forTempId: ap.temp_id,
                            status: '拒绝'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                } else {
                    $.ajax({
                        url : realPath + '/hospital/passOrRefuse',
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            forTempId: ap.temp_id,
                            status: '拒绝'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                }
            } else if (ap.resolve==='delete') {
                if (ap.type==='mem'){
                    $.ajax({
                        url : "" + realPath + "/doctor/deletePassOrRefuse",
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            status: '拒绝'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                } else {
                    $.ajax({
                        url : "" + realPath + "/hospital/deletePassOrRefuse",
                        type : "post",
                        dataType : "json",
                        async : true,
                        crossDomain : true,
                        data : JSON.stringify({
                            forId: ap.id,
                            forDocId: ap.indexes,
                            status: '拒绝'
                        }),
                        contentType : "application/JSON;charset=utf-8",
                        success : function(data) {
                            data[0].result === 'success' && location.reload()
                        }
                    });
                }
            }
        }
    },
    mounted: function(){
        let self = this;
        $.ajax({
            url: realPath + '/quote/init',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(d){
                let list = d[0].jfcStaff;
                for (let i = 0, l = list.length; i < l; i++){
                    self.leagues.push({
                        name: list[i].staName,
                        email: list[i].staEmail
                    })
                }
            }
        });
        $.ajax({
            url: realPath + '/doctor/modifyDeleteSearch',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                email: sessionStorage.getItem('sysUser').email
            }),
            success: function(d){
                let list = d[0].result,
                    len = list.length,
                    i;
                for (i = 0; i < len; i++){
                    self.applies.push({
                        id: list[i].forId,
                        applicant: list[i].forName,
                        reviewer: '刘欢',
                        indexes: list[i].forDocId,
                        number: list[i].forNumber,
                        temp_id: list[i].forTempId,
                        resolve: (list[i].forName.match(/\:(修改)$/) ? 'update' : 'delete'),
                        type: (list[i].forAttribution === '单位' ? 'org' : 'mem')
                    })
                }
            },
            error: function(e){
                console.error(e)
            }
        })
    }
});