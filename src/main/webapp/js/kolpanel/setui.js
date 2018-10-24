/**
 * Created by wangxiangyang on 2017/11/15.
 */


//收集设置渲染
function renderCollectControl(){
    //问卷收集部分的选项
    if (!sets){
        window.sets = {
            total_top: 0,
            total_bottom: 0,
            time_question: {
                restrict: false,
                time: null
            },
            time_survey: {
                restrict: false,
                time:null
            },
            clientOnly: false,
            disposableForClient: false,
            disposableForIp: false,
            disposableForDevice: false,
            passwordNeeded: false,
            verificationCodeNeeded: false,
            allocations: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [
                    {
                        index: 0,
                        question_id: '',
                        question_title: '',
                        options: {},
                        sum_top: 0,
                        sum_bottom: 0,
                        allocate_option: [
                            {
                                op_index: 0,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            },{
                                op_index: 1,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            }
                        ]
                    }
                ]
            },
            allocation_cross: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [
                    {
                        index: 0,
                        options: {},
                        conditionString: '',
                        allocate_bottom: 0,
                        allocate_top: 0,
                        percent_bottom: 0,
                        percent_top: 0,
                        percent_average: 0
                    },{
                        index: 1,
                        options: {},
                        conditionString: '',
                        allocate_bottom: 0,
                        allocate_top: 0,
                        percent_bottom: 0,
                        percent_top: 0,
                        percent_average: 0
                    }
                ]
            }
        };
    }
    sets.allocations.summary_bottom = sets.allocation_cross.summary_bottom = sets.total_bottom;
    sets.allocations.summary_top = sets.allocation_cross.summary_top = sets.total_top;

    var setsV = new Vue({
        el: '#collect_control',
        data: sets,
        methods: {
            updateTotalTop: function(event){
                this.allocations.summary_top = parseInt($(event.target).val());
                this.allocation_cross.summary_top = parseInt($(event.target).val())
            },
            updateTotalBottom: function(event){
                this.allocations.summary_bottom = parseInt($(event.target).val());
                this.allocation_cross.summary_bottom = parseInt($(event.target).val())
            }
        }
    });
}

//点击到设置配额界面时,加载数据
function renderAllocateControl(){

        var allocationV = new Vue({
            el: '#allocate_basic',
            data: sets.allocations,
            methods: {
                updateSummaryBottom: function(event){
                    sets.total_bottom = this.summary_bottom = $(event.target).val()
                },
                updateSummaryTop: function(event){
                    sets.total_bottom = this.summary_top = $(event.target).val()
                },
                findTP: function(event){
                    let t = $(event.target),
                        p = t.parents('.allocation').attr('index');
                    return [t,p]
                },
                findTPG: function(event){
                    let t = $(event.target),
                        p = t.parents('tr').attr('op_index'),
                        g = t.parents('.allocation').attr('index');
                    return [t,p,g]
                },
                selectQuestion: function(event){
                    let [t,p] = this.findTP(event);
                    this.allocatings[p].question_id = t.val();
                    this.allocatings[p].options = this.question_list[t.val() - 1].options ? this.question_list[t.val() - 1].options : {}
                },
                selectOption: function(event){
                    let [t,p,g] = this.findTPG(event);
                    this.allocatings[g].allocate_option[p].value = t.val()
                },
                editAllocationBottom: function(event){
                    let [t,p,g] = this.findTPG(event),
                        allocatings = this.allocatings,
                        options = allocatings[g].allocate_option,
                        sum_bottom = 0,
                        allocate_bottom = 0;

                    options[p].allocation_bottom = parseInt(t.val());

                    options[p].percent_bottom = Math.round(options[p].allocation_bottom * 100 / this.summary_bottom);

                    for (let i in options){
                        sum_bottom += options[i].allocation_bottom
                    }
                    allocatings[g].sum_bottom = sum_bottom;

                    for (let i in allocatings){
                        allocate_bottom += allocatings[i].sum_bottom
                    }
                    this.allocate_bottom = allocate_bottom

                },
                editAllocationTop: function(event){
                    let [t,p,g] = this.findTPG(event),
                        allocatings = this.allocatings,
                        options = allocatings[g].allocate_option,
                        sum_top = 0,
                        allocate_top = 0;

                    options[p].allocation_top = parseInt(t.val());

                    options[p].percent_top = Math.round(options[p].allocation_top * 100 / this.summary_top);

                    for (let i in options){
                        sum_top += options[i].allocation_top
                    }
                    allocatings[g].sum_top = sum_top;

                    for (let i in allocatings){
                        allocate_top += allocatings[i].sum_top
                    }
                    this.allocate_top = allocate_top
                },
                insertAllocation: function(event){
                    let [t,p] = this.findTP(event),
                        allocations = this.allocatings[p].allocate_option;
                    allocations.push({
                        op_index: allocations.length,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    })
                },
                deleteAllocation: function(event){
                    let [t,p,g] = this.findTPG(event),
                        options = this.allocatings[g].allocate_option,
                        option = options[p];
                    options.splice(options.indexOf(option),1);
                },
                insertTable: function(event){
                    let allocatings = this.allocatings,
                        t = event.target;
                    allocatings.push({
                        index: allocatings.length,
                        question_id: '',
                        question_title: '',
                        options: {},
                        sum_top: 0,
                        sum_bottom: 0,
                        allocate_option: [
                            {
                                op_index: 0,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            },{
                                op_index: 1,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            }
                        ]
                    });
                    setTimeout(function(){t.scrollIntoView(false)},100)
                }
            }
        });

        var allocation_cross = new Vue({
            el: '#allocate_cross',
            data: sets.allocation_cross,
            mounted: function(){
                $(this.$el).find('.writable').each(function(){
                    let v = $(this).text();
                    $(this).empty().text(v);
                })
            },
            methods: {
                findTP: function(event){
                    let t = $(event.target),
                        p = t.parents('tr').attr('index');
                    return [t,p]
                },
                moveToEnd: function(that){
                    if(document.all){
                        that.range=document.selection.createRange();
                        that.range.select();
                        that.range.moveStart("character",-1);
                    }else{
                        that.range=window.getSelection().getRangeAt(0);
                        that.offset = that.range.startOffset;

                        return that.offset;
                    }
                },
                middlePostion: function(event, char){
                    event.preventDefault();
                    let t = $(event.target),
                        p = t.parents('.conditions'),
                        g = t.parents('tr').attr('index');
                    if(document.all){
                        return;
                        //t.range=document.selection.createRange();
                        //t.range.select();
                        //t.range.moveStart("character",-1);
                    }else{
                        t.range = window.getSelection().getRangeAt(0);
                        t.index = Array.prototype.indexOf.call(t[0].childNodes, t.range.startContainer);
                        t.container = t.range.startContainer;
                        t.offset= t.range.startOffset;
                        let arr = t.text().split('');
                        arr.splice(c.offset,0,char);
                        let text = arr.join('');
                        t.text(text);
                        this.allocatings[g].conditionString = text;
                        t.focus();
                        t.range.setStart($(t.range.startContainer)[0].childNodes[t.index], t.offset+1);
                    }
                },
                editExpression: function(event){
                    let [t,p] = this.findTP(event),
                        v = t.text();
                    this.allocatings[p].conditionString = v;
                },
                keysFuncs: function(event){

                    let n = event.keyCode,
                        c = event.ctrlKey,
                        a = event.altKey,
                        m = event.metaKey,
                        s = event.shiftKey;

                    $(event.target).parents('.conditions').find('.questions-in-expression').hide();

                    if (n === 32){
                        let [t,p] = this.findTP(event);
                        event.preventDefault();
                        if (document.all){} else {

                            t.range = window.getSelection().getRangeAt(0);

                            if(/q$/.test(t.range.startContainer.data.slice(0,t.range.startOffset))){
                                this.chooseQuestion(event)

                            } else if (t.range.startContainer.data.slice(0,t.range.startOffset).match(/q(\d+)=$/)){
                                this.chooseAnswer(event, t.range.startContainer.data.slice(0,t.range.startOffset).match(/q(\d+)=$/)[1])
                            }
                        }
                    } else if (n === 40 || n === 65288){
                        this.openBracket(event)
                    } else if (n === 41 || n === 65289){
                        this.closeBracket(event)
                    } else if (n === 61){
                        //this.chooseAnswer(event)
                    } else if (n === 38){
                        this.insertAnd(event)
                    } else if (n === 124){
                        this.insertOr(event)
                    } else if (n === 33 || n === 65281){
                        this.insertNot(event)
                    }
                },
                chooseQuestion: function(event){
                    $(event.target).parents('.conditions').find('.questions-in-expression').show()
                },
                pickQuestion: function(event){
                    let t = $(event.target),
                        question_id = t.attr('item_id'),
                        l = question_id.length,
                        p = t.parents('.conditions'),
                        c = p.find('.express'),
                        g = t.parents('tr').attr('index');

                    t.parents('.questions-in-expression').hide();

                    if(document.all){
                        return;
                        //t.range=document.selection.createRange();
                        //t.range.select();
                        //t.range.moveStart("character",-1);
                    }else{
                        c.range = window.getSelection().getRangeAt(0);
                        c.index = Array.prototype.indexOf.call(c[0].childNodes, c.range.startContainer);
                        c.offset= c.range.startOffset;
                        let arr = c[0].childNodes[c.index].data.split('');
                        arr.splice(c.offset,0,question_id);
                        let text = arr.join('');
                        c[0].childNodes[c.index].data = text;
                        this.allocatings[g].conditionString = c.html();
                        c.focus();
                        c.range.setStart(c[0].childNodes[c.index], c.offset+parseInt(l));
                    }
                },
                openBracket: function(event){
                    this.middlePostion(event,'(')
                },
                closeBracket: function(event){
                    this.middlePostion(event, ')')
                },
                chooseAnswer: function(event, itemid){
                    this.allocatings[$(event.target).parents('tr').attr('index')].options = this.question_list[itemid-1].options;
                    $(event.target).parents('.conditions').find('.options-in-expression').show()
                },
                pickAnswer: function(event){
                    if (event.type === 'keypress'){
                        if (event.keyCode !== 13){
                            $(event.target).attr('title', $(event.target).text());
                            return
                        }
                    }
                    let t = $(event.target),
                        v = t.attr('title'),
                        l = v.length,
                        p = t.parents('.conditions'),
                        c = p.find('.express'),
                        g = t.parents('tr').attr('index');

                    t.parents('.options-in-expression').hide();

                    if(document.all){
                        return;
                        //t.range=document.selection.createRange();
                        //t.range.select();
                        //t.range.moveStart("character",-1);
                    }else{
                        c.range = window.getSelection().getRangeAt(0);
                        c.index = Array.prototype.indexOf.call(c[0].childNodes, c.range.startContainer);
                        c.offset= c.range.startOffset;
                        let arr = c[0].childNodes[c.index].data.split('');
                        arr.splice(c.offset,0,v);
                        let text = arr.join('');
                        c[0].childNodes[c.index].data = text;
                        this.allocatings[g].conditionString = c.html();
                        c.focus();
                        c.range.setStart(c[0].childNodes[c.index], c.offset+parseInt(l));
                    }
                },
                insertAnd: function(event){
                    event.preventDefault();
                    this.insertRelation(event, '&&')
                },
                insertOr: function(event){
                    event.preventDefault();
                    this.insertRelation(event, '||')
                },
                insertNot: function(event){
                    event.preventDefault();
                    this.insertRelation(event, ' !')
                },
                insertRelation: function(event, char){
                    let t = $(event.target),
                        p = t.parents('tr').attr('index'),
                        nodes = t[0].childNodes,
                        l = nodes.length + 1;
                    nodes[l-2].data += ' ';
                    t.append(`<b>` + char + `</b>`)
                        .append(document.createTextNode(' q'));
                    this.allocatings[p].conditionString = t.html();
                    t.range = window.getSelection().getRangeAt(0);
                    t.range.setStart(nodes[l],2);
                },
                editEdge: function(event){
                    let t = $(event.target),
                        cls = t.className,
                        al = this.allocatings[t.parents('tr').attr('index')];

                    al['allocate_'+ cls] = t.val();
                    al['percent_' + cls] = Math.round(al['allocate_'+ cls] * 100 / this['summary_' + cls]);

                    if (al.percent_bottom === 0){
                        al.precent_average = al.percent_top
                    } else if (al.percent_top === 0){
                        al.percent_average = al.percent_bottom
                    } else {
                        al.percent_average = Math.round((al.percent_bottom + al.percent_top) / 2)
                    }
                },
                insertCondition: function(event){
                    let allocatings = this.allocatings,
                        index = allocatings.length;
                    allocatings.push({
                        index: index,
                        options: {},
                        conditionString: '',
                        allocate_bottom: 0,
                        allocate_top: 0,
                        percent_bottom: 0,
                        percent_top: 0,
                        percent_average: 0
                    })

                }
            }
        });
    //}
}

function prepareForProgressControl(){

    let surveyName = sessionStorage.getItem('surveyName');
    fillOptions(surveyName)
}

function prepareForQualityControl(){

    let surveyName = sessionStorage.getItem('surveyName');

    fillOptions(surveyName)
}

function fillOptions(surveyName){

    $.ajax({
        url: realPath + '/questionnaire/searchWjTitle',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({
            email: surveyName
        }),
        success: function(data){
            let options = `<option value="">请选择</option>`,
                ql = data[0].result;
            for (let i = 0, l = ql.length; i < l; i++){
                options += `<option value="`+ ql[i].wjId +`" title="`+ ql[i].title +`">`+ ql[i].wjId + `. ` + ql[i].title.slice(0,5) +`...</option>`;
            }
            $('.select_survey_by_name').html(options)
        }
    });
}

//进度控制
function renderProgressControl(event){

    let surveyId = $(event.target).parent().siblings('.select_survey_by_name').val();//取问卷id

    function displayProgress(data){

        $('#set_ui').find('.set.progress').css('display','block');

        let progressSumVue = new Vue({
            el: '#progress_basic',
            data: data[0].allocations
        }),
            progressCrossVue = new Vue({
                el: '#progress_cross',
                data: data[0].allocation_cross
            })
    }

    //请求数据
    $.ajax({
        url: realPath + '/questionnaire/progress',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({survey: surveyId}),
        success: function(data){
            displayProgress(data)
        }
    })
}

//质量控制
function renderQualityControl(){

    $('#set_ui').find('.set.quality').css('display','block');

    let surveyId = $(event.target).parent().siblings('.select_survey_by_name').val();//取问卷id

    function arrangeQuestion(data){
        var top_label = new Vue({
            el: '#toptable',
            data: data
        }),
            width = 0;
        for (let i = 0, l = data.question_list.length; i < l; i++){
            width += 202
        }

        return supposedWidth = width || 122 + 'px'
    }
    function fillAnswers(data){
        window.result_list = data;
        var main = new Vue({
            el: '#answers',
            data: result_list
        })
    }
    function programmingTable(){
        //最后整理框架样式
        //如果边框宽度一样，则宽度+1个右边框
        //否则要宽度+左边框宽度+右边框宽度-本身边框宽度
        var marginLeft = parseInt($("#toplefttbl").css('width').match(/\d+/g)[0]) + parseInt($("#toplefttbl").css("border-right-width").match(/\d+/g)[0]);
        var marginTop = parseInt($("#toplefttbl").css('height').match(/\d+/g)[0]) + parseInt($("#toplefttbl").css("border-bottom-width").match(/\d+/g)[0]);
        $("#toptable").css("margin-left", marginLeft + "px") //设置顶部栏距左距离
            .css('width', supposedWidth);
        //$("#lefttable").css("margin-top", marginTop + "px"); //设置左边栏距上距离
        //设置内容表格距左距上距离
        $("#datatable").css("margin-left", marginLeft + "px")
            .css("margin-top", marginTop + "px")
            .css('width',supposedWidth);
        //顶部栏外层DIV宽度为 总容器宽度-滚动轴宽度(16为滚动轴宽度)
        $("#topdv").css("width", $("#container").width() - 16);
        $("#leftdv").css("height", $("#container").height() - 16);
        //容器滚动事件
        $("#container").scroll(function () {
            var currentScrollTop = $(this).scrollTop();
            var currentScrollLeft = $(this).scrollLeft();
            $("#topdv").find(".table-mask").css("left", -currentScrollLeft + "px");
            $("#leftdv").find(".table-mask").css("top", -currentScrollTop + "px");

        });
    }

    $.ajax({
        url: realPath + '/questionnaire/qualityControl',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({survey: surveyId}),
        success: function(data){
            arrangeQuestion(data[0].questions);
            fillAnswers(data[0].answers);
            programmingTable();
        }
    });
    //var questions = {
    //    question_list: [
    //        {index: 1,title: '第一题'},
    //        {index: 2,title: '第二题'},
    //        {index: 3,title: '第三题'},
    //        {index: 4,title: '第四题'}
    //    ]
    //},
    //    results = {
    //        results: [
    //            {
    //                resultId: 1,
    //                availability: 1,
    //                reason: '',
    //                list: [23,34,43,21]
    //            },{
    //                resultId: 2,
    //                availability: 0,
    //                reason: '甄别题没过',
    //                list: [54,234,654,3]
    //            },{
    //                resultId: 3,
    //                availability: 1,
    //                reason: '',
    //                list: [15,63,84,412]
    //            }
    //        ]
    //    };
    //arrangeQuestion(questions);
    //fillAnswers(results);
    //programmingTable();
}