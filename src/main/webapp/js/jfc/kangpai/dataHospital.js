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
                		location.href ='./html/jfc/kangpai/dataHospital.html';
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
    };
    const vm = new Vue({
        el: '#root',
        data: data,
        methods: methods,
        mounted: mounted
    });
});