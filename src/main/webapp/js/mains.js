$(function(){
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPath = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var realPath = localhostPath + projectName;
    var values = {
        surveyId: 100,
        availability: 0,
        completion: 0,
        sitId: '',
        completed: false,
        s1: {
            itemId: '1',
            type: 'choice',
            1: {
                number: 1,
                text: '17岁及以下'
            },
            2: {
                number: 2,
                text: '18-29岁'
            },
            3: {
                number: 3,
                text: '30-45岁'
            },
            4: {
                number: 4,
                text: '46-65岁'
            },
            5: {
                number: 5,
                text: '66岁及以上'
            },
            99: {
                number: 99,
                text: '拒答'
            }
        },
        s2: {
            itemId: '2',
            type: 'choice',
            1: {
                number: 1,
                text: '政府工作人员'
            },
            2: {
                number: 2,
                text: '企业职员'
            },
            3: {
                number: 3,
                text: '高校、科研机构从业人员'
            },
            4: {
                number: 4,
                text: ''
            }
        },
        s3: {
            itemId: '3',
            type: 'choice',
            1: {
                number: 1,
                text: '高级管理人员'
            },
            2: {
                number: 2,
                text: '普通管理人员（部门/科室负责人）'
            },
            3: {
                number: 3,
                text: '资深技术人员/专家'
            },
            4: {
                number: 4,
                text: '普通职员/一般技术人员'
            },
            5: {
                number: 5,
                text: ''
            }
        },
        q1: {
            itemId: '4',
            type: 'choice',
            1: {
                number: 1,
                text: '经常（平均每月>=2次）'
            },
            2: {
                number: 2,
                text: '偶尔'
            }
        },
        q2: {
            itemId: '5',
            type: 'checks',
            1: {
                number: 1,
                text: '节省时间'
            },
            2: {
                number: 2,
                text: '行车安全'
            },
            3: {
                number: 3,
                text: '收费标准'
            },
            4: {
                number: 4,
                text: '出行服务（收费站、服务区、出行信息等）'
            },
            5: {
                number: 5,
                text: ''
            }
        },
        q3: {
            itemId: '6',
            type: 'choice',
            1: {
                number: 1,
                text: '应该征收车辆通行费，谁使用谁付费'
            },
            2: {
                number: 2,
                text: '不应该收费，通过提高公共财政负担（所有纳税人承担）'
            },
            3: {
                number: 3,
                text: '不应该收费，通过提高车辆购置税负担（购车者承担）'
            },
            4: {
                number: 4,
                text: '不应该收费，通过提高燃油税负担（燃油使用者承担）'
            },
            5: {
                number: 5,
                text: ''
            }
        },
        q4: {
            itemId: '7',
            type: 'choice',
            1: {
                number: 1,
                text: '基本合理'
            },
            2: {
                number: 2,
                text: ''
            }
        },
        q5: {
            itemId: '8',
            type: 'choice',
            1: {
                number: 1,
                text: '价格可以接受'
            },
            2: {
                number: 2,
                text: '价格偏高'
            }
        },
        q6: {
            itemId: '9',
            type: 'choice',
            1: {
                number: 1,
                text: '赞同'
            },
            2: {
                number: 2,
                text: '不赞同'
            }
        },
        q7: {
            itemId: '10',
            type: 'checks',
            1: {
                number: 1,
                text: '建设成本'
            },
            2: {
                number: 2,
                text: '运营管理成本'
            },
            3: {
                number: 3,
                text: '养护成本'
            },
            4: {
                number: 4,
                text: '融资成本'
            },
            5: {
                number: 5,
                text: '没有压缩空间'
            }
        },
        q8: {
            itemId: '11',
            type: 'checks',
            1: {
                number: 1,
                text: '到期后停止收费，提高燃油税税率'
            },
            2: {
                number: 2,
                text: '降低收费标准，延长收费年限'
            },
            3: {
                number: 3,
                text: '以省为单位，对高速公路实行统一收费、统一管理'
            },
            4: {
                number: 4,
                text: '平时保持现行收费标准，拥堵时提高收费标准'
            },
            5: {
                number: 5,
                text: '平时保持现行收费标准，拥堵时降低收费标准'
            }
        },
        q9: {
            itemId: '12',
            type: 'choice',
            1: {
                number: 1,
                text: '提高车购税征收比例，取消通行费'
            },
            2: {
                number: 2,
                text: '提高燃油税征收比例，取消通行费'
            },
            3: {
                number: 3,
                text: '使用者付费，继续收取通行费'
            },
            4: {
                number: 4,
                text: ''
            }
        },
        q10: {
            itemId: '13',
            type: 'checks',
            1: {
                number: 1,
                text: '合理'
            },
            2: {
                number: 2,
                text: '不合理，免费通行需要对货物查验核实，影响通行效率'
            },
            3: {
                number: 3,
                text: '不合理，对高速公路经营企业不公平，加大了企业负担'
            },
            4: {
                number: 4,
                text: ''
            }
        },
        q11: {
            itemId: '14',
            type: 'checks',
            1: {
                number: 1,
                text: '合理'
            },
            2: {
                number: 2,
                text: '不合理，影响了出行体验，节假日公路更堵了'
            },
            3: {
                number: 3,
                text: '不合理，对高速公路经营企业不公平，加大了企业负担'
            },
            4: {
                number: 4,
                text: ''
            }
        },
        q12: {
            itemId: '15',
            type: 'choice',
            1: {
                number: 1,
                text: '窗口人工支付'
            },
            2: {
                number: 2,
                text: 'ETC支付'
            },
            3: {
                number: 3,
                text: '手机扫码支付'
            },
            4: {
                number: 4,
                text: ''
            }
        },
        q13: {
            itemId: '16',
            type: 'choice',
            1: {
                number: 1,
                text: '建设过多过快，道路资源有闲置'
            },
            2: {
                number: 2,
                text: '基本合理'
            },
            3: {
                number: 3,
                text: '规模仍然不够，应加大建设'
            }
        },
        q14: {
            itemId: '17',
            type: 'choice',
            1: {
                number: 1,
                text: '严重，应引起相关部门重视'
            },
            2: {
                number: 2,
                text: '债务问题基本可控'
            },
            3: {
                number: 3,
                text: '不太了解'
            }
        },
        q15: {
            itemId: '18',
            type: 'text',
            1: [{
                number: 1,
                text: ''
            }]
        }
        //,
        //q16: {
        //    itemId: '19',
        //    type: 'message',
        //    1: {
        //        number: 1,
        //        text: ''
        //    },
        //    2: {
        //        number: 2,
        //        text: ''
        //    },
        //    3: {
        //        number: 3,
        //        text: ''
        //    }
        //}
    };
    var answers = {};
    var question_now = 's1';

    $('input').on('change', function(){

        if ($(this).hasClass('other')){
            event.stopPropagation();
            var option_number = $(this).attr('name').match(/\-(\S+)$/)[1];
            values[question_now][option_number].text = $(this).val();
            return
        }

        var v = $(this).val();

        switch (values[question_now].type) {
            case 'choice':
                answers[question_now] = [values[question_now][v]];
                $(this).parents('.option-wrap').addClass('checked')
                    .siblings('.option-wrap').removeClass('checked');
                if ($(this).hasClass('open-ended')){
                    $(this).parents('div.question').find('input.other').css('display', 'inline-block');
                } else {
                    $(this).parents('div.question').find('input.other').css('display', 'none');
                }
                break;
            case 'checks':
                if ($(this).prop('checked')){
                    if (answers[question_now]){
                        answers[question_now].push(values[question_now][v])
                    } else {
                        answers[question_now] = [values[question_now][v]]
                    }
                    $(this).parents('.option-wrap').addClass('checked');
                    if ($(this).hasClass('open-ended')){
                        $(this).parents('div.question').find('input.other').css('display', 'inline-block');
                    }
                } else {
                    answers[question_now].splice(answers[question_now].indexOf(values[question_now][v]), 1);
                    $(this).parents('.option-wrap').removeClass('checked');
                    if ($(this).hasClass('open-ended')){
                        $(this).parents('div.question').find('input.other').css('display', 'none');
                    }
                }
                break;
            //case 'blank':
            //    values['q2'][1][0].text = $(this).val().replace(/\;/g, '；');
            //    answers['q2'] = values['q2'][1];
            //    break;
            case 'message':
                var message_number = $(this).attr('name')[1];
                if (v.match(/\S/)){
                    values[question_now][message_number] = v;
                    if (answers[question_now]){
                        answers[question_now].push(values[question_now][message_number])
                    } else {
                        answers[question_now] = [values[question_now][message_number]]
                    }
                    $(this).parents('.option-wrap').addClass('checked')
                } else {
                    values[question_now][message_number] = '';
                    answers[question_now].splice(answers[question_now].indexOf(values[question_now][message_number]), 1);
                }
        }
        var this_question = $('#' + question_now);
        if ($(this).attr('name') === 'q2'){
            if (answers[question_now].length >= 2){
                this_question.find('input[type=checkbox]:not(:checked)').prop('disabled',true);
            } else {
                this_question.find('input').prop('disabled',false);
            }
        } else if ($(this).attr('name') === 'q10' || $(this).attr('name') === 'q11'){
            if (answers[question_now].length > 0){
                for (var y = 0; y < answers[question_now].length; y++){
                    if (answers[question_now][y].number === 1){
                        this_question.find('input[value=1]').prop('disabled',false);
                        this_question.find('input:not([value=1])').prop('disabled',true);
                        break
                    } else if (answers[question_now][y].number === 2 || answers[question_now][y].number === 3 || answers[question_now][y].number === 4){
                        this_question.find('input[value=1]').prop('disabled',true);
                        this_question.find('input:not([value=1])').prop('disabled',false);
                        break
                    }
                }
            } else {
                this_question.find('input').prop('disabled',false);
            }
        }
    });
    $('textarea').on('change', function(){
        values['q15'][1][0].text = $(this).val().replace(/\;/g, '；');
        answers['q15'] = values['q15'][1]
    });

    $('#start').on('click', function(){

        $('.header').css('display', 'none');
        $('#cover').css('display', 'none');
        $('#buttons').css('display', 'block');
        $('#s1').css('display', 'block');

        var scrollTo = $('#s1').position().top;
        try {
            window.scroll({top: scrollTo,behavior: 'smooth'});
        } catch (e) {}
    });
    $('.next').on('click', function(){//下一题事件

        if (!answers[question_now] || !answers[question_now].length){
            $('#' + question_now).find('.tips').text('您还未作答');
            return
        } else if (answers['s1'][0].number === 99 || answers['s1'][0].number === 1){
            document.location.href = './html/invalid.html';
            return
        } else if (question_now === 'q2' && answers['q2'].length < 2){
            $('#' + question_now).find('.tips').text('此题需要选择2个选项');
            var out_label = $('#' + question_now).find('span.out');
            if (!out_label.hasClass('twinkle')){
                out_label.addClass('twinkle');
                setTimeout(function(){out_label.removeClass('twinkle')},2000)
            }
            return
        }
        else {
            for (var k = 0; k < answers[question_now].length; k++){
                if (answers[question_now][k].text === ''){
                    var input_node = $('#' + question_now).find('input.blank');
                    if (!input_node.hasClass('twinkle')){
                        input_node.addClass('twinkle');
                        setTimeout(function(){input_node.removeClass('twinkle')},2000)
                    }
                    return
                }
            }
        }

        var to_send = {
            surveyId: values.surveyId,
            availability: values.availability,
            sitId: values.sitId,
            itemIds: values[question_now].itemId,
            //type: values[question_now].type,
            codes: [],
            colAnswers: []
        };
        for (var i = 0; i < answers[question_now].length; i++){
            to_send.codes.push(answers[question_now][i].number);
            to_send.colAnswers.push(answers[question_now][i].text)
        }
        to_send.codes = to_send.codes.join(';');
        to_send.colAnswers = to_send.colAnswers.join(';');

        console.log(JSON.stringify(to_send));

        $.ajax({
            url: realPath + '/questionnaire/collects',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(to_send),
            async: true,
            success: function(d){
                console.log(d);
                var sitId = d[0].sitId,//答卷id
                    result = d[0].result,//返回状态
                    value_now = values[question_now],//此题所有选项
                    statistics = d[0].statistics,//此题的回答结果
                    len = statistics.length,
                    total = 0,//此题所有选项次数之和
                    i,
                    j;

                if (!values.sitId){
                    values.sitId = sitId;//储存答卷id
                }
                if (result === 'success'){
                    $('#' + question_now).find('.tips').text('');
                    var next = '';
                    if (question_now === 's3'){//答完甄别题后,跳转到正题第一题q1
                        next = 'q1'
                    } else if (question_now === 'q15'){//答完最后一个正题q15后,跳转到完成页面
                        document.location.href = './html/completed.html';
                        return
                    } else if (question_now.match(/^s/)){//其他的甄别题和正式题都递加
                        next = 's' + (parseInt(question_now.match(/\d+/g)[0]) + 1)
                    } else if (question_now.match(/^q/)){
                        next = 'q' + (parseInt(question_now.match(/\d+/g)[0]) + 1)
                    }
                    $('#' + question_now).find('input').each(function(){//答完后禁用此题
                        $(this).prop('disabled', true)
                    });
                    $('#' + next).css('display', 'block');//显示下一题

                    for (i = 0; i < len; i++){
                        total += parseInt(statistics[i].count)
                    }
                    for (var o in value_now){
                        for (j = 0; j < len; j++){
                            if (statistics[j].codes.split(';').indexOf('' + value_now[o].number) > -1){
                                var option = $('#' + question_now).find('input[value='+ value_now[o].number +']').parents('.option-wrap'),
                                    ratios = (statistics[j].count * 100 / total).toFixed(2);
                                option.find('.statistics.number').text(statistics[j].count);
                                option.find('.statistics .filled').css('width', ratios + '%');
                                option.find('.statistics .filled b').text(ratios + '%');
                            }
                        }
                    }

                    $('#' + question_now).find('p.statistics').css('display', 'block');
                    $('#' + question_now).find('b.statistics').css('display', 'inline-block');

                    question_now = next;//最后更新当前题号

                    if (question_now === 'q15'){
                        values.availability = 1;
                        $('#next').css('display', 'none');
                        $('#submit').css('display', 'inline-block')
                    }
                    //滚动到下一题
                    var scrollTo = $('#' + question_now).position().top;
                    try {
                    	window.scroll({top: scrollTo,behavior: 'smooth'});
                    } catch (e) {}
                }
            },
            error: function(e){

            }
        })
    })
});