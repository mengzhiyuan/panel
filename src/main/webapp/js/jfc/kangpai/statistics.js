/**
 * Created by wangxiangyang on 2018/4/11.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){

    let forms,
        conditions,
        relations = {},
//        field_arr = [],
        field = [];



    function createDisplay(node, list, forms, conditions){

        let table_container = $('#table_container'),
            container = $('#graphs'),
            //vary_id = conditions[0].conditions[conditions[0].conditions.length - 1].field,
            //vary_name = conditions[0].conditions[conditions[0].conditions.length - 1].field_name,
            //vary_operator = conditions[0].conditions[conditions[0].conditions.length - 1].operator,
            //constant_first_id = conditions[0].conditions[0].field,
            //constant_first_name = conditions[0].conditions[0].field_name,
            //constant_first_operator = conditions[0].conditions[0].operator,
            //constant_first_value = conditions[0].conditions[0].value,
            //constant_last_id = conditions[0].conditions[1].field,
            //constant_last_name = conditions[0].conditions[1].field_name,
            //constant_last_operator = conditions[0].conditions[1].operator,
            //constant_last_value = conditions[0].conditions[0].value,
            pack = [];

        for (let k in list){
            let index = parseInt(k.match(/\_(\d+)$/)[1]),
                theCondition = conditions[index],
                condition_string = '',
                count = list[k][0].count;

            for (let m = 0; m < theCondition.conditions.length; m++){
                let con = theCondition.conditions[m];
                condition_string += con.relation === 'none' ? '' : (con.relation === 'yu' ? '且' : '或');
                condition_string += con.field_name;
                condition_string += con.operator;
                condition_string += con.value
            }

            pack.push({
                //vary: vary_value,
                condition: condition_string,
                count: count
            })
        }
        let option;
        //let constant_group = constant_first_name + constant_first_operator + pack[0].constant[0] + '且' + constant_last_name + constant_last_operator + pack[0].constant[1];

        if (forms.indexOf('table') > -1){

            let wrap = $(`<div class="wrap"></div>`),
                table = $(`<table></table>`),
                thead = $(`<thead></thead>`),
                thr = $(`<tr></tr>`),
                tbody = $(`<tbody></tbody>`),
                tbr = $(`<tr></tr>`),
//                cox = field_arr[0],
//                coy = field_arr[1],
                cox_ar = [],
                coy_ar = [],
                i;



            for (let j = 0; j < pack.length; j++){
                thr.append(`<th class="cox">`+ pack[j].condition +`</th>`);
                tbr.append(`<td class="cox">`+ pack[j].count +`</td>`)
            }
            thead.append(thr);
            tbody.append(tbr);
            table.append(thead)
                .append(tbody);
            wrap.append(table);
            table_container.append(wrap)
        }
        if (forms.indexOf('bars') > -1){

            let seriesLabel = {
                normal: {
                    show: true,
                    textBorderColor: '#333',
                    textBorderWidth: 2
                }
            },
                dom = $(`<div class="graphy"></div>`);
            container.append(dom);

            option = {
                title: {
                    text: '条形图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: 100
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'value',
                    name: 'Days',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    data: ['']
                },
                series: []
            };

            for (let n = 0; n < pack.length; n++){
                option.legend.data.push(pack[n].condition);
                option.series.push({
                    name: pack[n].condition,
                    type: 'bar',
                    label: seriesLabel,
                    data: [pack[n].count]
                })
            }

            let myChart = echarts.init(dom[0]);
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

        }
        if (forms.indexOf('charts') > -1){

            var labelOption = {
                normal: {
                    show: true,
                    formatter: '{c}  {name|{a}}',
                    fontSize: 16,
                    rich: {
                        name: {
                            textBorderColor: '#fff'
                        }
                    }
                }
            };
            let dom = $(`<div class="graphy"></div>`);
            container.append(dom);

            option = {
                title: {
                    text: '柱形图'
                },
                color: ['#4cabce', '#e5323e'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: []
            };
            for (let n = 0; n < pack.length; n++){
                option.legend.data.push(pack[n].condition);
                option.series.push({
                    name: pack[n].condition,
                    type: 'bar',
                    barGap: 20,
                    label: labelOption,
                    data: [pack[n].count]
                })
            }

            let myChart = echarts.init(dom[0]);
            if (option && typeof option === "object") {
                myChart.setOption(option, true)
            }
        }
        if (forms.indexOf('pie') > -1){

            let dom = $(`<div class="graphy"></div>`);
            container.append(dom);

            option = {
                title : {
                    text: '饼状图',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:[]
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'',
                        type:'pie',
                        radius : [20, 110],
                        center : ['50%', '50%'],
                        roseType : 'radius',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[]
                    }
                ]
            };
            for (let n = 0; n < pack.length; n++){
                option.legend.data.push(pack[n].condition);
                option.series[0].data.push({
                    name: pack[n].condition,
                    value: pack[n].count
                })
            }

            let myChart = echarts.init(dom[0]);
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }
        if (forms.indexOf('doughnut') > -1){

            let dom = $(`<div class="graphy"></div>`);
            container.append(dom);

            option = {
                title: {
                    text: '环形图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[]
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]
                    }
                ]
            };
            for (let n = 0; n < pack.length; n++){
                option.legend.data.push(pack[n].condition);
                option.series[0].data.push({
                    name: pack[n].condition,
                    value: pack[n].count
                })
            }
            let myChart = echarts.init(dom[0]);
            if (option && typeof option === "object") {
                myChart.setOption(option, true)
            }
        }
        if (forms.indexOf('lines') > -1){

            let dom = $(`<div class="graphy"></div>`);
            container.append(dom);

            option = {
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                title: {
                    text: '线形图'
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line'
                }]
            };
            for (let n = 0; n < pack.length; n++){
                option.xAxis.data.push(pack[n].condition);
                option.series[0].data.push(pack[n].count)
            }
            let myChart = echarts.init(dom[0]);
            if (option && typeof option === "object") {
                myChart.setOption(option, true)
            }
        }
    }

    try {
        forms = JSON.parse(sessionStorage.getItem('forms'));
        conditions = JSON.parse(sessionStorage.getItem('conditions')).list;
    } catch (e) {
        alert('没有足够的筛选条件。');
        return
    }
    //for (let i = 0, l = conditions.length; i < l; i++){
    //    if (field.indexOf(conditions[i].field) === -1){
    //        field.push(conditions[i].field);
    //        field_arr.push(conditions[i])
    //    }
    //}
    relations.conditions = conditions;
    //relations.field = JSON.parse(sessionStorage.getItem('conditions')).fields;
    
    try {

        $.ajax({
            url : "" + realPath + "/kolHome/moreInformation",
            type : "post",
            dataType : "json",
            async : true,
            data : JSON.stringify({
            	conditions: conditions
            }),
            contentType : "application/JSON;charset=utf-8",
            success : function(data) {
                console.info(data);

                let list = data[0];
                createDisplay($('#graphs'), list, forms, conditions);
            },
            error: function(e){
                console.log(e);
                alert('网络错误。')
            }
        });

    } catch (e) {
        alert('网络错误。')
    }
});