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
    const data = {
        data_chunk: {
        	hosId: '',
            hosProvince: '',
            hosCity: '',
            hosDistrict: '',
            hosName: '',
            hosgraId: '',
            hosLelId: '',
            typeId: '',
            profitId: '',
            propertyId: '',
            hosTel:'',
            hosWebsite:'',
            hosEstablishmentTime:'',
            hosLegalPerson:'',
            hosRegisteredCapital:'',
        }
    };
    const methods = {
        appendData: function(){
            let data_string = JSON.stringify(this.data_chunk);
            $.ajax({
                url: realPath + '/hospital/add',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: data_string,
                success: function(d){
                	if(d[0].result>=1){
                		window.location.reload(true)
                	}else{
                		alert("添加失败");
                	}
                },
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
            var option = {
                url: ""+realPath+"/hospital/ImportExcel",
                type: 'post',
                dataType:"json",
                clearForm: true,
                resetForm: true,
                success: function(data){
                    var res = data[0]["result"];
                    if (res > 0){
                        alert('批量添加成功。')
                    } else {
                        alert('操作失败。')
                    }
                }
            };
            $("#excelImport").ajaxSubmit(option);
            return false;
        }
    };
    const mounted = function(){
        laydate.render({
            elem: '#hosEstablishmentTime',
            type: 'date',
            istime: true,
            done: function(value, date){
                self.data_chunk.hosEstablishmentTime = value;
                //console.log(value);
                //console.log(date);
            }
        });
        let status = sessionStorage.getItem('detailStatus');

        if (status){
            if (status === 'consult'){
                $('input').prop('disabled', true);
                $('select').prop('disabled', true);
                $('button').prop('disabled', true);
            } else {
                $('input').prop('disabled', false);
                $('select').prop('disabled', false);
                $('button').prop('disabled', false);
            }
            let detail = JSON.parse(sessionStorage.getItem('memberDetail'));
            this.data_chunk.hosId = detail.id;
            this.data_chunk.hosProvince = detail.hosProvince;
            let self = this;
            setTimeout(function(){
                $('#hosProvince').change();
                self.data_chunk.hosCity = detail.hosCity;
                setTimeout(function(){
                    $('#hosCity').change();
                    self.data_chunk.hosDistrict = detail.hosDistrict
                },0)
            },0);
            this.data_chunk.hosName = detail.hosName;
            this.data_chunk.hosLelId = detail.hoslelId;
            this.data_chunk.hosgraId = detail.hosgraId;
            this.data_chunk.typeId = detail.typeId;
            this.data_chunk.profitId = detail.profitId;
            this.data_chunk.propertyId = detail.propertyId;
            this.data_chunk.hosTel = detail.hosTel;
            this.data_chunk.hosWebsite = detail.hosWebsite;
            this.data_chunk.hosLegalPerson = detail.hosLegalPerson;
            this.data_chunk.hosEstablishmentTime = detail.hosEstablishmentTime;
            this.data_chunk.hosRegisteredCapital = detail.hosRegisteredCapital;
        } else {
            $('input').prop('disabled', false);
            $('select').prop('disabled', false);
            $('button').prop('disabled', false);
        }
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        mounted: mounted
    });
});