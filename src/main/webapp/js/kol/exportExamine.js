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
        applies: [],
        leagues: []
    },
    methods: {
        jumpToDetail: function(ap){
            sessionStorage.setItem('export_apply_id', ap.id);
            sessionStorage.setItem('export_apply_field', ap.fields);
            sessionStorage.setItem('export_apply_status', ap.status==='to_export' ? '1' : '0');
            window.open('./exportDetail.html')
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
            url: realPath + '/doctor/reviewerSearch',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem('sysUser')).email
            }),
            success: function(d){
                let to_export = d[0].applicant,
                to_examine = d[0].DerivedData,
                    a, r, l, i, j;
                if (to_examine.length){
                	for (i = 0, l = to_examine.length; i < l; i++){
                        for (j = 0; j < self.leagues.length; j++){
                            if (self.leagues[j].email === to_examine[i].derApplicant){
                                a = self.leagues[j].name
                            }
                            if (self.leagues[j].email === to_examine[i].derReviewer){
                                r = self.leagues[j].name
                            }
                        }
                        self.applies.push({
                            id: to_examine[i].derId,
                            applicant: a,
                            reviewer: r,
                            indexes: to_examine[i].derDocId,
                            fields: to_examine[i].derField,
                            status: 'to_examine',
                            time: (to_examine[i].createTime.year + 1900) + '-' + (to_examine[i].createTime.month + 1) + '-' + to_examine[i].createTime.date + ' ' +
                            to_examine[i].createTime.hours + ':' + to_examine[i].createTime.minutes + ':' +to_examine[i].createTime.seconds
                        })
                    }
                }
                if (to_export.length){
                	for (i = 0, l = to_export.length; i < l; i++){
                        for (j = 0; j < self.leagues.length; j++){
                            if (self.leagues[j].email === to_export[i].derApplicant){
                                a = self.leagues[j].name
                            }
                            if (self.leagues[j].email === to_export[i].derReviewer){
                                r = self.leagues[j].name
                            }
                        }
                        self.applies.push({
                            id: to_export[i].derId,
                            applicant: a,
                            reviewer: r,
                            indexes: to_export[i].derDocId,
                            fields: to_export[i].derField,
                            status: 'to_export',
                            time: (to_export[i].createTime.year + 1900) + '-' + (to_export[i].createTime.month + 1) + '-' + to_export[i].createTime.date + ' ' +
                            to_export[i].createTime.hour + ':' + to_export[i].createTime.minute + ':' +to_export[i].createTime.second
                        })
                    }
                }
            },
            error: function(e){
                console.error(e)
            }
        })
    }
});