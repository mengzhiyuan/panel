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

                    func_analyse.showBox(data);

                } else {

                	func_analyse.warnNoResult()
                }
            },
            error: function(d){

            	func_analyse.warnConnectedFailed()
            }
        });
    },

    showBox: function(data){
    	
    	let unpicks = [];
    	
    	for (let i = 0, l = data.length; i < l; i++){
    		unpicks.push({
    			itemId: data[i].itemId,
    			index: data[i].itemIndex,
    			type: data[i].itemType,
    			title: JSON.parse(data[i].itemContent)[0].title
    		})
    	}

        let pickData = {
                unpicks: unpicks,
                pickeds: [],
                pickedTypes: [],
                visible: false,
                mode: ['table']
            },
            pickMethods = {
                pick: function(event){
                	let iin = Array.prototype.indexOf.call($('#pick_question_to_analyze .unpick'),event.target);
                	this.pickedTypes.push(this.unpicks[iin].type);
                    this.pickeds.push(this.unpicks.splice(iin,1)[0]);
                },
                unpick: function(event){
                	let iin = Array.prototype.indexOf.call($('#pick_question_to_analyze .picked'),event.target);
                	this.pickedTypes.splice(iin,1);
                	this.unpicks.push(this.pickeds.splice(iin,1)[0]);
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
                    $('#pick_question_to_analyze').css('display','none');
                },
                downloadBox: function(event){
                    this.closeBox();
                    this.leadOut(this.pickeds)
                },
                saveBox: function(event){
                    this.closeBox();
                    func_analyse.startAnalyze(this.pickeds, this.pickedTypes,this.mode)
                },
                leadOut: function(ids){

                    let picking = [];

                    for (let i = 0, l = this.pickeds.length; i < l; i++){
                        picking.push(this.pickeds[i].itemId)
                    }
                    let dd = {
                    		itemId: picking
                    };
                    $.ajax({
                    	
                    	url : realPath + '/questionnaire/downloadData',
            			type : "post",
            			dataType : "json",
            			contentType : "application/JSON;charset=utf-8",
            			async : true,
                        data: JSON.stringify(dd),
                        success: function(data){
                            window.open(realPath + data[0].path)
                        },
                        error: function(e){
                            console.log(e)
                        }
                    })
                }
            };
        if (!window.pickingVue){
        	window.pickingVue = new Vue({
                el: '#pick_question_to_analyze',
                data: pickData,
                methods: pickMethods
            });
        }
        setTimeout(function(){
        	$('#pick_question_to_analyze').css('display','block')
        },100)
    },

    startAnalyze: function(pickeds,types,mode){
    	
    	let picking = [];
    	
    	for (let i = 0, l = pickeds.length; i < l; i++){
    		picking.push(pickeds[i].itemId)
    	}
    	
        $.ajax({
            url: realPath + "/questionnaire/dataAnalysis",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: true,
            data: JSON.stringify({
                itemId: picking
            }),
            success: function(data){

                for (let i = 0, l = data.length; i < l; i++){
                    let anc = 'an' + $('.an_node').length,
                        anNode = $(`<div id="`+ anc +`" class="an_node">
                        </div>`),
                        type = types[i];

                    $('#analysis').append(anNode);

                    for (let j = 0; j < mode.length; j++){
                    
                    	switch (mode[j]){
                        case 'table':
                            if (type === 'choice' || type === 'checks' || type === 'score'){
                            	func_analyse.drawTableForChoice(data[i], type, anc)
                            } else if (type === 'blank') {
                            	func_analyse.drawTableForBlank(data[i], type, anc)
                            } else if (type === 'matrix'){
                            	func_analyse.drawTableForMatrix(data[i], type, anc)
                            } else {
                            	func_analyse.drawTableForSort(data[i], type, anc)
                            }
                            break;
                        case 'bar':
                        	func_analyse.drawBarsForChoice(data[i], type, anc);
                            break;
                        case 'pie':
                        	func_analyse.drawPiesForChoice(data[i], type, anc);
                            break;
                    }
                    }
                }
            },
            error: function(e){console.log(e)}
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
            ttop = $(`<tr><td></td></tr>`),
            tbody = $(`<tbody></tbody>`),
            type = '矩阵题';

        for (let n = 0, l = options.length; n < l; n++){
            let sbn = options[n].subtitles_answers[0];
            for (let s in sbn){
                sum += sbn[s]
            }
        }

        thead.append(`<th></th>`);
        tbody.append(ttop);

        for (let s = 0,l = subtitles.length; s < l; s++){

            thead.append(`<th colspan="3">`+ subtitles[s] +`</th>`);
            ttop.append(`<td>频数</td><td>百分比</td><td>回应率</td>`)
        }

        for (let o in options){

            let op = options[o],
                opRow = $(`<tr></tr>`);

            opRow.append(`<td>`+ op.value +`</td>`);

            for (let s = 0,l = subtitles.length; s < l; s++){

                let q = op['subtitles_answers'][0][subtitles[s]];

                opRow.append(`<td>`+ q +`</td><td>`+ Math.round((q / total) * 100) +`%</td><td>`+ Math.round((q / sum) * 100) +`%</td>`)
            }
            tbody.append(opRow)
        }
        table.find('thead').append(thead);
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



$('#select_item').on('click', func_analyse.packData.bind(func_analyse));
//$('#select_item').on('change', func_analyse.updateFormWithType.bind(func_analyse));
//$('#build').on('click', func_analyse.build.bind(func_analyse));




//var data = [
//    {
//        mapData:{
//            上海:1,
//            广州:0,
//            其他:2,
//            北京:3
//        },
//        total:6,
//        itemIndex:1,
//        description: '',
//        title:'你所在的城市？'
//    },
//    {
//        mapData:{
//            '1.预检、登记【为新生婴儿登记造册等】':1,
//            '2.常规体检':3,
//            '4.负责二类疫苗的预约':3,
//            '7.负责具体接种注射工作':1,
//            '8.其它【收发钱、等】':1,
//            '3入户访视家长':3,
//            '5.解答家长对二类疫苗的相关问题或推荐二类疫苗的接种【包括电话接听或家长教育课堂等形式】':3,
//            '6.负责接种中心日常工作管理':2
//        },
//        total:6,
//        itemIndex:2,
//        description:'',
//        title:'请问过去三个月中，您从事过下列哪种工作？'
//    }
//],
//    mam = {
//        subtitles:[
//            '潘太欣(五联疫苗DTacP+Hib+IPV)',
//            'B型流感嗜血杆菌疫苗（Hib）',
//            '进口乙肝疫苗（HBV）',
//            '其他，请注明: '
//        ],
//        total:3,
//        itemIndex:4,
//        options:[
//            {
//                subtitles_answers:[
//                    {
//                        '进口乙肝疫苗（HBV）':0,
//                        'B型流感嗜血杆菌疫苗（Hib）':0,
//                        '潘太欣(五联疫苗DTacP+Hib+IPV)':3,
//                        '其他，请注明: ':1
//                    }
//                ],
//                value:'.是否使用过该疫苗'
//            },
//            {
//                subtitles_answers:[
//                    {
//                        '进口乙肝疫苗（HBV）':1,
//                        'B型流感嗜血杆菌疫苗（Hib）':3,
//                        '潘太欣(五联疫苗DTacP+Hib+IPV)':0,
//                        '其他，请注明: ' :0
//                    }
//                ],
//                value:'是否有该疫苗？'
//            },
//            {
//                subtitles_answers:[
//                    {
//                        '进口乙肝疫苗（HBV）':2,
//                        'B型流感嗜血杆菌疫苗（Hib）':0,
//                        '潘太欣(五联疫苗DTacP+Hib+IPV)':3,
//                        '其他，请注明: ':0
//                    }
//                ],
//                value:'告知哪些疫苗？'
//            },
//            {
//                subtitles_answers:[
//                    {
//                        '进口乙肝疫苗（HBV）':2,
//                        'B型流感嗜血杆菌疫苗（Hib）':2,
//                        '潘太欣(五联疫苗DTacP+Hib+IPV)':1,
//                        '其他，请注明: ':0
//                    }
//                ],
//                value:'告知率'
//            }
//        ],
//        description:'',
//        title:'1.  您是否有以下这些二类疫苗的使用经验？【可多选】'
//    },
//    mode = 'table',
//    type = 'choice';
//
//for (let i = 0, l = data.length; i < l; i++){
//    let anc = 'an' + $('.an_node').length,
//        anNode = $(`<div id="`+ anc +`" class="an_node"></div>`);
//
//    $('#analysis').append(anNode);
//
//    switch (mode){
//        case 'table':
//            if (type === 'choice' || type === 'checks' || type === 'score'){
//                func_analyse.drawTableForChoice(data[i], mode, anc)
//            } else if (type === 'blank') {
//                func_analyse.drawTableForBlank(data[i], mode, anc)
//            } else if (type === 'matrix'){
//                func_analyse.drawTableForMatrix(data[i], mode, anc)
//            } else {
//                func_analyse.drawTableForSort(data[i], mode, anc)
//            }
//            break;
//        case 'bar':
//            func_analyse.drawBarsForChoice(data[i], mode, anc);
//            break;
//        case 'pie':
//            func_analyse.drawPiesForChoice(data[i], mode, anc);
//            break;
//    }
//}
//
//
//let anc = 'an' + $('.an_node').length,
//    anNode = $(`<div id="`+ anc +`" class="an_node"></div>`);
//
//$('#analysis').append(anNode);
//func_analyse.drawTableForMatrix(mam, 'matrix',anc);