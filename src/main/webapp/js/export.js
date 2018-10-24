/**
 * Created by wangxiangyang on 2018/6/12.
 */
$(function(){
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPath = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var realPath = localhostPath + projectName;


    $('#export').on('click', function(){
        $.ajax({
            url: realPath + '/questionnaire/answerExceport1',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(d){
            	var b=realPath + d[0].path.replace('/','\\');
                window.open(b)
            	//window.location.href(b);
            },
            error: function(e){

            }
        })
    });
//固定和滚动
    var right_div2 = document.getElementById("right_div2");
    right_div2.onscroll = function(){
        var right_div2_top = this.scrollTop;
        var right_div2_left = this.scrollLeft;
        document.getElementById("left_div2").scrollTop = right_div2_top;
        document.getElementById("right_div1").scrollLeft = right_div2_left;
    };
//设置右边div宽度
    document.getElementById("right_div").style.width=""+document.documentElement.clientWidth-130+"px";
    setInterval(function() {
        document.getElementById("right_div").style.width=""+document.documentElement.clientWidth-130+"px";
    }, 0);
    var right_div2 = document.getElementById("right_div2");
    right_div2.onscroll = function(){
        var right_div2_top = this.scrollTop;
        var right_div2_left = this.scrollLeft;
        document.getElementById("left_div2").scrollTop = right_div2_top;
        document.getElementById("right_div1").scrollLeft = right_div2_left;
    };
//设置右边div宽度
    document.getElementById("right_div").style.width=""+document.documentElement.clientWidth-130+"px";
    setInterval(function() {
        document.getElementById("right_div").style.width=""+document.documentElement.clientWidth-130+"px";
    }, 0);

    $.ajax({
        url: realPath + '/questionnaire/answerExceports',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(d){
            var data_result = d,
                left = $('#left_table2'),
                right = $('#right_table2'),
                data = data_result[0].result,
                len = data.length,
                blank_identity = [0,4,5,0,1,5,0,5,2,0,0,0,0,4,4,4,0,0,1],
                checks_identity = [3,9,10,11,12],
                template = '<tr>' +
                    '<td class="start-time"></td><td class="end-time"></td>' +//开始和结束时间
                    '<td class="n1"></td><td class="n2"></td><td class="n2 other"></td><td class="n3"></td><td class="n3 other"></td>' +//甄别题1~3
                    '<td class="n4"></td>' +//q1
                    '<td class="n5 o1"></td><td class="n5 o2"></td><td class="n5 o3"></td><td class="n5 o4"></td><td class="n5 o5"></td><td class="n5 other"></td>' +//q2
                    '<td class="n6"></td><td class="n6 other"></td>' +//q3
                    '<td class="n7"></td><td class="n7 other"></td>' +//q4
                    '<td class="n8"></td>' +//q5
                    '<td class="n9"></td>' +//q6
                    '<td class="n10 o1"></td><td class="n10 o2"></td><td class="n10 o3"></td><td class="n10 o4"></td><td class="n10 o5"></td>' +//q7
                    '<td class="n11 o1"></td><td class="n11 o2"></td><td class="n11 o3"></td><td class="n11 o4"></td><td class="n11 o5"></td>' +//q8
                    '<td class="n12"></td><td class="n12 other"></td>' +//q9
                    '<td class="n13 o1"></td><td class="n13 o2"></td><td class="n13 o3"></td><td class="n13 o4"></td><td class="n13 other"></td>' +//q10
                    '<td class="n14 o1"></td><td class="n14 o2"></td><td class="n14 o3"></td><td class="n14 o4"></td><td class="n14 other"></td>' +//q11
                    '<td class="n15 o1"></td><td class="n15 o2"></td><td class="n15 o3"></td><td class="n15 o4"></td><td class="n15 other"></td>' +//q12
                    '<td class="n16"></td>' +//q13
                    '<td class="n17"></td>' +//q14
                    '<td class="n18 other"></td>' +//q15
                    '</tr>',
                fixed_td = '<tr><td class="ip"></td></tr>',
                new_node,
                new_fixed,
                paper,
                answers,
                codes,
                the_other,
                start_time,
                end_time,
                ip,
                i,
                j,
                k;

            for (i = 0; i < len; i++){

                new_node = $(template);
                new_fixed = $(fixed_td);

                paper = data[i].wjCollect;
                ip = data[i].sitIp;
                start_time = (paper[0].createTime.year + 1900) + '-' + (paper[0].createTime.month + 1) + '-' + (paper[0].createTime.date) + ' ' + paper[0].createTime.hours + ':' + paper[0].createTime.minutes + ':' + paper[0].createTime.seconds;
                end_time = (paper[paper.length-1].createTime.year + 1900) + '-' + (paper[paper.length-1].createTime.month + 1) + '-' + (paper[paper.length-1].createTime.date) + ' ' + paper[paper.length-1].createTime.hours + ':' + paper[paper.length-1].createTime.minutes + ':' + paper[paper.length-1].createTime.seconds;

                new_fixed.find('.ip').text(ip);
                new_node.find('.start-time').text(start_time);
                new_node.find('.end-time').text(end_time);

                for (j = 0; j < paper.length; j++){
                    answers = paper[j].colAnswers.split(';');
                    codes = paper[j].codes.split(';');
                    if (j === 17){
                        new_node.find('.n18.other').text(answers[0]);
                        continue
                    }
                    if (checks_identity.indexOf(paper[j].itemId) > -1){
                        for (k = 0; k < codes.length; k++){
                            new_node.find('.n' + (j + 1) + '.o' + codes[k]).text(codes[k])
                        }
                    } else {
                        new_node.find('.n' + (j + 1)).text(codes[0])
                    }
                    if (codes.indexOf('' + blank_identity[j]) > -1){
                        the_other = answers[codes.indexOf('' + blank_identity[j])];
                        new_node.find('.n' + (j + 1) + '.other').text(the_other)
                    } else {
                        new_node.find('.n' + (j + 1) + '.other').text('')
                    }
                }
                left.append(new_fixed);
                right.append(new_node)
            }
        },
        error: function(e){

        }
    });
});