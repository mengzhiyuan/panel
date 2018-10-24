/**
 * Created by wangxiangyang on 2017/9/27.
 */


var func_analyse = {

    surveyList :[],
    indexList: [],
    data: [],

    //接收用户名下所有问卷
    //listSurvey: function(){
    //
    //    $.ajax({
    //        url: realPath + '/questionnaire/searchWjTitle',
    //        type : "post",
    //        dataType : "json",
    //        contentType : "application/JSON;charset=utf-8",
    //        data : JSON.stringify({
    //            email: sessionStorage.getItem('surveyName')
    //        }),
    //        async : true,
    //        success : function(data) {
    //            var object = data[0].result,
    //                select_survey = $('#select_survey');
    //
    //            select_survey.empty('option:not(:first-child)');
    //            this.surveyList = [];
    //
    //            for(var i= 0,l = object.length;i<l;i++){
    //                this.surveyList.push({wjId: object[i].wjId, title: object[i].title});
    //                if (!object[i].title){
    //                	object[i].title = '';
    //                }
    //                select_survey.append('<option value="'+ object[i].wjId +'">'+ object[i].wjId + '. ' + object[i].title.slice(0,10) +'...</option>')
    //            }
    //
    //        },
    //        error : function(d1, d2, d3) {
    //            console.log(d1);
    //            console.log(d2);
    //            console.log(d3);
    //        }
    //    })
    //},

    //整理数据,加载到左侧select中待选择
    packData: function(e){

        $.ajax({

            url: realPath + "/questionnaire/SearchwjQuestion",
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                survey: sessionStorage.getItem('surveyId')
            }),
            success: function(d){
                if (d[0].result){

                    let data = d[0]['result'];

                    this.showBox(data);

                } else {

                    this.warnNoResult()
                }
            },
            error: function(d){

                this.warnConnectedFailed()
            }
        });
    },

    showBox: function(data){

        let el = $('#pick_question_to_analyze'),
            pickData = {
                unpicks: data,
                pickeds: [],
                visible: false,
                mode: ['table']
            },
            pickMethods = {
                pick: function(event){
                    this.pickeds.push(this.unpicks.splice(this.unpicks.indexOf($(event.target).attr('item_id')),1))
                },
                unpick: function(event){
                    this.unpicks.push(this.pickeds.splice(this.pickeds.indexOf($(event.target).attr('item_id')),1))
                },
                checkMode: function(event){
                    let t = $(event.target),
                        c = t.prop('checked'),
                        v = t.val();
                    if (c){
                        this.mode.push(v)
                    } else {
                        this.mode.splice(this.mode.indexOf(v),1)
                    }
                },
                closeBox: function(event){
                    this.visible = false
                },
                saveBox: function(event){
                    this.closeBox();
                    func_analyse.startAnalyze(this.pickeds,this.mode)
                }
            };
        let pickingVue = new Vue({
            el: '#pick_question_to_analyze',
            data: pickData,
            methods: pickMethods
        })
    },

    startAnalyze: function(pickeds,mode){
        $.ajax({
            url: realPath + "/questionnaire/dataAnalysis",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true,
            data: JSON.stringify({
                itemId: pickeds
            }),
            success: function(data){

                for (let i = 0, l = data.length; i < l; i++){
                    let anc = 'an' + $('.anNode').length,
                        anNode = $(`<div id="`+ anc +`"></div>`);

                    $('#analysis').append(anNode);

                    switch (mode){
                        case 'table':
                            if (type === 'choice' || type === 'checks' || type === 'score'){
                                this.drawTableForChoice(data[i], mode, anc)
                            } else if (type === 'blank') {
                                this.drawTableForBlank(data[i], mode, anc)
                            } else if (type === 'matrix'){
                                this.drawTableForMatrix(data[i], mode, anc)
                            } else {
                                this.drawTableForSort(data[i], mode, anc)
                            }
                            break;
                        case 'bar':
                            this.drawBarsForChoice(data[i], mode, anc);
                            break;
                        case 'pie':
                            this.drawPiesForChoice(data[i], mode, anc);
                            break;
                    }
                }
            }
        })
    },

    //当选中不同的item时,下面的待选分析方式随之变化
    //updateFormWithType: function(e){
    //
    //    var type = $('#select_item').find('option:selected').attr('type'),
    //        forms = $('#select_form'),
    //        table = forms.find('.table'),
    //        bar = forms.find('.bar'),
    //        line = forms.find('.line'),
    //        pie = forms.find('.pie');
    //
    //    forms.find('option:not(:first-child)').css('display', 'none');
    //
    //    if (type === 'choice' || type === 'checks' || type === 'score'){
    //        table.css('display', 'inline-block');
    //        bar.css('display', 'inline-block');
    //        //line.css('display', 'inline-block');
    //        pie.css('display', 'inline-block');
    //    } else if (type === 'blank' || type === 'matrix' || type === 'sort'){
    //        table.css('display', 'inline-block');
    //    }
    //},

    //准备绘制图表
//    build: function(e){
//
//        var select = $('#select_item'),
//            itemId = select.val(),
//            type = select.find('option:selected').attr('type'),
//            form = $('#select_form').val();
//
//        if (!form) form = 'table';
//
//        $.ajax({
//            url : realPath + "/questionnaire/dataAnalysis",
//            type : "post",
//            dataType : "json",
//            contentType : "application/JSON;charset=utf-8",
//            async : true,
//            data : JSON.stringify({
//                surveyId: $('#select_item').val()
//            }),
//            success : function(data) {
//
//                var item = data[0];
////                    	this = func_
//
//                if (!itemId) return false;
//
//                switch (form){
//
//                    case 'table':
//
//                        if (type === 'choice' || type === 'checks' || type === 'score'){
//                            this.emptyArea();
//                            this.drawTableForChoice(item, type)
//                        } else if (type === 'blank') {
//                            this.emptyArea();
//                            this.drawTableForBlank(item, type)
//                        } else if (type === 'matrix'){
//                            this.emptyArea();
//                            this.drawTableForMatrix(item, type)
//                        } else {
//                            this.emptyArea();
//                            this.drawTableForSort(item, type)
//                        }
//                        break;
//
//                    case 'bar':
//                        this.emptyArea();
//                        this.drawBarsForChoice(item, type);
//                        break;
//
//                    case 'pie':
//                        this.emptyArea();
//                        this.drawPiesForChoice(item, type);
//                        break;
//                }
//            }.bind(this),
//            error : function(d1, d2, d3) {
//                console.log(d1);
//                console.log(d2);
//                console.log(d3);
//            }
//        });
//    },

    //给选择题||打分题绘制表格
    drawTableForChoice: function(it, t,n){


        var an = $('#' + n),
            title = it.title || '',
            index = it.itemIndex,
            options = it.mapData,
            total = it.total,
            sum = 0,
            table = $(`
                    <table>
                        <thead>
                        <tr>
                            <th></th><th>频数</th><th>百分比</th><th>回应率</th>
                        </tr>
                        </thead>
                    </table>
                `),
            tbody = $(`<tbody></tbody>`),
            type = '';

        for (let o in options){
            sum += options[o]
        }

        switch (t){

            case 'choice':
                type = '单选题';
                break;
            case 'checks':
                type = '多选题';
                break;
            case 'score':
                type = '评分题';
                break;
        }

        table.append(tbody);

        for (let o in options){

            let op = options[o];

            tbody.append(`
                    <tr>
                        <td>`+ o +`</td>
                        <td>`+ op +`</td>
                        <td>`+ Math.round((op / total) * 100) +`%</td>
                        <td>`+ Math.round((op / sum) * 100) + `%</td>
                    </tr>
                `)
        }

        an.append(`<div class="title">`+ index + `.` + title + `[` + type + `]</div>`);
        an.append(table);
    },

    //给填空题绘制表格
    drawTableForBlank: function(it, t, n){

        var an = $('#' + n),
            title = it.title,
            index = it.itemIndex,
            options = it.options,
            total = it.total,
            sum = 0,
            table = $(`
                    <table>
                        <thead>
                        <tr>
                            <th></th><th>频数</th><th>频率</th><th>有效频数</th><th>有效频率</th>
                        </tr>
                        </thead>
                    </table>
                `),
            tbody = $(`<tbody></tbody>`),
            type = '填空题';

        for (let o in options){
            sum += options[o]
        }

        table.append(tbody);

        for (let o in options){

            let op = options[o];

            tbody.append(`
                    <tr>
                        <td>`+ o +`</td>
                        <td>`+ op +`</td>
                        <td>`+ (op / sum).toFixed(2) * 100 +`%</td>
                        <td>`+ op +`</td>
                        <td>`+ (op / total).toFixed(2) * 100 + `%</td>
                    </tr>
                `)
        }

        an.append(`<div class="title">`+ index + `.` + title + `[` + type + `]</div>`);
        an.append(table);
    },

    //给矩阵题绘制表格
    drawTableForMatrix: function(it, t, n){

        var an = $('#' + n),
            title = it.title,
            index = it.itemIndex,
            subtitles = it.subtitles,
            options = it.options,
            //map = it.mapData,
            total = it.total,
            sum = 0,
            table = $(`
                    <table>
                        <thead>
                        </thead>
                    </table>
                `),
            thead = $(`<tr></tr>`),
            ttop = $(`<tr></tr>`),
            tbody = $(`<tbody></tbody>`),
            type = '矩阵题';

        for (let n = 0, l = options.length; n < l; n++){
            let sbn = options[n].subtitles_answers[0];
            for (let s in sbn){
                sum += sbn[s]
            }
        }


        //整理数据
        //var datas = {},
        //    counts = [];

        //for (let o in sub_questions){
        //    counts.push({
        //        title: sub_questions[o],
        //        count: 0
        //    })
        //}
        //
        //for (let o in options){
        //    datas[o] = {
        //        value: options[o],
        //        sub_question: counts.slice(0)
        //    }
        //}


        //for (let o in datas){
        //
        //    var value = datas[o].value;
        //
        //    for (let i in datas[o].sub_question){
        //
        //        var title = datas[o].sub_question[i].title;
        //
        //        for (let r in map){
        //
        //            if (map[r].value === value && map[r].sub_questions['title'] === title){
        //
        //                datas[o].sub_question.count = map[r].sub_questions['count'];
        //
        //                sum += map[r].sub_questions['count'];
        //            }
        //        }
        //    }
        //}

        thead.append(`<th></th>`);
        tbody.append(ttop);

        for (let s = 0,l = subtitles.length; s < l; s++){

            thead.append(`<th colspan="4">`+ s +`</th>`);
            ttop.append(`<td>频数</td><td>百分比</td><td>回应率</td>`)
        }

        for (let o in options){

            let op = options[o],
                opRow = $(`<tr></tr>`);

            opRow.append(`<td>`+ op.value +`</td>`);

            for (let s = 0,l = subtitles.length; s < l; s++){

                let q = op[subtitles_answers][0][subtitles[s]];

                opRow.append(`<td>`+ q +`</td><td>`+ Math.round((q / total) * 100) +`%</td><td>`+ Math.round((q / sum) * 100) +`</td>`)
            }
            tbody.append(opRow)
        }
        table.append(tbody);
        an.append(`<div class="title">`+ index + `.` + title + `[` + type + `]</div>`);
        an.append(table);
    },

    //给排序题绘制表格
    drawTableForSort: function(it, t, n){

        var an = $('#' + n),
            title = it.title,
            index = it.itemIndex,
            options = it.options,
            scores = new Array(options.length),
            table = $(`
                    <table>
                        <thead>
                        </thead>
                    </table>
                `),
            thead = $(`<tr></tr>`),
            ttop = $(`<tr></tr>`),
            tbody = $(`<tbody></tbody>`),
            type = '矩阵题';

        thead.append(`<th></th>`);
        tbody.append(ttop);

        for (let n= 0,l=scores.length; n < l; n++){
            scores[n] = n + 1
        }

        for (let s in scores){

            let sbq = scores[s];

            thead.append(`<th colspan="2">`+ sbq.title +`</th>`);
            ttop.append(`<th>频数</th><th>频率</th>`)
        }

        for (let o in options){

            let op = options[o],
                opRow = $(`<tr></tr>`);

            opRow.append(`<td>`+ op.value +`</td>`);

            for (let sb in options[scores]){

                let q = options[scores][sb];

                opRow.append(`<td>`+ q.count +`</td><td>`+ q.percent +`</td><td>`+ q.eCount +`</td><td>`+ q.ePercent +`</td>`)
            }
            tbody.append(opRow)
        }

        table.append(tbody);
        an.append(`<div class="title">`+ index + `.` + title + `[` + type + `]</div>`);
        an.append(table);
    },

    //为选择题&填空题&评分题绘制柱状图
    drawBarsForChoice: function(an, d, n){

        var options = [],
            counts = {
                type: 'bar',
                data: []
            };

        //从返回数据中取出本题每个选项的值和统计数量
        for (let o in an.mapData){

            var c = an.mapData[o];

            options.push(o);
            counts.data.push(c)
        }

        //构成echart选项
        let option = {
            title: {
                text: an.itemIndex + '. ' + an.title
            },
            tooltip: {},
            xAxis: {
                data: options
            },
            yAxis:{},
            series: [counts]
        };
        //绘制echart
        let myChart = echarts.init($('#' + n)[0]);
        myChart.setOption(option);
    },

    //为选择题&填空题&评分题绘制饼状图
    drawPiesForChoice: function(an, d, n){

        //构造echart需要的选项
        var option = {
            name: an.itemIndex + '. ' + an.title,
            type: 'pie',
            radius: '55%',
            data: []
        };

        //向选项中填空数据
        for (let o in an.mapData){

            var c = an.mapData[o];

            option.data.push({
                value: c,
                name: o
            })
        }
        //绘制echart
        let myChart = echarts.init($('#' + n)[0]);
        myChart.setOption({
            series: [option]
        })
    },

    //为选择题&填空题&评分题绘制线形图
    drawLineForChoice: function(an, d, n){

        //构造echart需要的选项
        var option = {
            title: {
                text: d.itemIndex + d.title
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value',
                axisPointer: {
                    snap: true
                }
            },
            series: [
                {
                    name:'用电量',
                    type:'line',
                    smooth: true,
                    data: []
                }
            ]
        };

        //向选项中填空数据
        for (let o in d.couse){

            var c = d.couse[o];

            for (let k in c){
                option.xAxis.data.push(k);
                option.series[o].data.push(c[k]);
            }
        }
        //绘制echart
        let myChart = echarts.init($('#' + n));
        myChart.setOption(option)
    },

    //请求无结果的警告
    warnNoResult: function(){

        window.warn_no_resulut = $(document.createElement('div'));

        this.warnRender(warn_no_resulut, '暂无数据')
    },

    //连接失败的警告
    warnConnectedFailed: function(){

        window.warn_connected_failed = $(document.createElement('div'));

        this.warnRender(warn_connected_failed, '请求失败,请稍后再试')
    },

    //警告渲染
    warnRender: function(obj,str){

        obj.text(str);

        var l = (str.length * 1.2 + 4) + 'rem';

        obj.css('width', l);

        obj.css('position','fixed');
        obj.css('left',this.getSize()[0] / 2 - 60 + 'px');
        obj.css('top',this.getSize()[0] / 2 - 15 + 'px');
        obj.css('display','none');
        obj.css('height','30px');
        obj.css('background-color','rgba(255,250,240,0.7)');
        obj.css('box-shadow','0 0 1px 0 #c9c9c9');
        obj.css('outline','1px solid #d9d9d9');
        obj.css('outline-offset','-3px');
        obj.css('text-align','center');
        obj.css('font-size','1.2rem');
        obj.css('line-height','30px');
        obj.css('z-index','1200');

        $('#survey_container').append(obj);
        obj.fadeIn(700);

        var warnDisappear = setTimeout(function(){
            obj.fadeOut(500, function(){
                var warnRemove = setTimeout(function(){
                    obj.remove();
                    obj = null
                },700)
            });
        }, 3000)
    },

    //为矩阵题&排序题绘制柱状图
    drawBarsForMatrix: function(an,d){

        //var option = {
        //    title: {
        //        text: 'ECharts 入门示例'
        //    },
        //    tooltip: {},
        //
        //    xAxis: {
        //        data: ['价格','搜索量','进货量']
        //    },
        //    yAxis: {},
        //    series: [{
        //        name: '衬衫',
        //        type: 'bar',
        //        data: [30, 5, 36]
        //    }, {
        //        name: '羊毛衫',
        //        type: 'bar',
        //        data: [5, 15, 45]
        //    }, {
        //        name: '雪纺衫',
        //        type: 'bar',
        //        data: [10, 30, 6]
        //    }, {
        //        name: '裤子',
        //        type: 'bar',
        //        data: [9, 20, 36]
        //    }, {
        //        name: '高跟鞋',
        //        type: 'bar',
        //        data: [15, 40, 26]
        //    }, {
        //        name: '袜子',
        //        type: 'bar',
        //        data: [40, 20, 16]
        //    }]
        //};
    },

    //取得当前浏览器的尺寸
    getSize: function(){

        return(
            [window.innerWidth,window.innerHeight]
        )
    }
};

//向后台进行请求,如果有收集收的数据,刚进行下一步,否则提示用户尚未收集到数据
//func_analyse.packData.bind(func_analyse)();



$('#select_survey').on('change', func_analyse.packData.bind(func_analyse));
//$('#select_item').on('change', func_analyse.updateFormWithType.bind(func_analyse));
//$('#build').on('click', func_analyse.build.bind(func_analyse));