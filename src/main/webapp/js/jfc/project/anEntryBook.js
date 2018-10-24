var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	timeRefresh();
	function timeRefresh() {
		lay('.test_item').each(function() {
			laydate.render({
				elem : this,
				trigger : 'click'
			});
		});
	}
    $(window).on('unload',function(event){
        sessionStorage.removeItem('infoId');
        sessionStorage.removeItem('proId');
        sessionStorage.removeItem('accId');
    });
	search();
	function search(){
		var to_send = {};
		to_send.proId = sessionStorage.getItem('proId') || 17;
		$.ajax({
			url : "" + realPath + "/project/anEntryBookSearch",
			type : "post",
			dataType : "json",
			async : true,
			data: JSON.stringify(to_send),
			contentType : "application/JSON;charset=utf-8",
			success : function(data) {

                function timeString(time){
                    if (time){
                        var string = '';
                        string += (time.year + 1900)
                            + '-' + (time.month + 1)
                            + '-' + time.date
                            + ' ' + time.hours
                            + ':' + time.minutes
                            + ':' + time.seconds;
                        return string;
                    } else {
                        return undefined
                    }
                }

                var entriesBook = data[0].proEntryBook[0],
                    budget = data[0].budgetInfo[0],
                    staffies = data[0].jfcStaff[0],
                    project = data[0].project[0],
                    time = data[0].proTime,
                    clients = data[0].cusliaList[0],
                    allocate = data[0].proQuota;

                if (staffies){
                    $('#project_manager').text(staffies.staName);
                }

                if (project){
                    $('#project_type').text(project.type);//----------------------------------------------------项目类型
                    $('#project_set_time').val(timeString(project['proCreateTime']));
                }
                if (time){

                    var string = '';
                    string += timeString(time[0].starTime);
                    string += ' ~ ';
                    string += timeString(time[time.length-1].endTime);

                    $('#project_during').text(string);//----------------------------------------------------项目周期
                }

                if (budget){
                    $('#project_amount').text(budget.infoSumMoney);//----------------------------------------------------项目金额
                    $('#completed_amount').text(budget.infoSumMoney);//----------------------------------------------------完成金额
                    $('#final_amount').text(budget.infoActualMoney);//----------------------------------------------------决算金额
                }

                if (clients){
                    $('#client_company').text(clients.cusComList['comName']);//---------------------------------------单位名称
                    $('#client_manager').text(clients.liaName);//----------------------------------------------------客户经理
                    $('#client_type').text(clients.cusComList['comType']);//------------------------------------------客户类型
                }

                if (allocate){

                    var l = allocate.length,
                        h = Math.ceil(l / 2);

                    for (let i = 0; i < h; i++){
                        $('#allocate').append(`<tr>
                            <td class="type"></td>
                            <td class="price"></td>
                            <td class="number"></td>
                            <td class="type"></td>
                            <td class="price"></td>
                            <td class="number"></td>
                        </tr>`)
                    }
                    for (let k = 0; k < l; k++){
                    	$($('#allocate td')[k*3]).text(allocate[k].quoName);
                    	$($('#allocate td')[k*3+1]).text(allocate[k].quoPrice);
                    	$($('#allocate td')[k*3+2]).text(allocate[k].quoNumber);
                    }
                }

                if (entriesBook){

                    var entry = JSON.parse(entriesBook.antContent)[0],
                        t = '是';

                    function createSign(name){
                        return $(`<span style=\"color:red\">签字：` + name + `</span>`)
                    }
                    function valTrue(str){

                        var node = $('#'+str);

                        try {
                            node.prop('checked', true)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    
                    if (entry.project_sign){
                    	$('#project_set_confirm').html(createSign(entry.project_sign))
                    }

                    $('#project_required_time').val(entry.re_star_end);//要求开始~结束时间
                    if (entry.re_star_end_sign){
                    	$('#project_required_confirm').html(createSign(entry.re_star_end_sign))
                    }

                    $('#project_execute_time').val(entry.pr_star_end);//执行开始~结束时间
                    if (entry.pr_star_end_sign){
                    	$('#project_execute_confirm').html(createSign(entry.pr_star_end_sign))
                    }

                    if (entry.execution_cycle === t){//项目周期是否延时
                        valTrue('delay_true');
                        $('#delay_text').val(entry.execution_cycle_value)
                    } else {
                        valTrue('delay_false');
                    }

                    if (entry.budget === t){//项目预算是否及时
                        valTrue('budget_timely_true');
                    } else {
                        valTrue('budget_timely_false');
                        $('#budget_timely_text').val(entry.budget_day)
                    }

                    if (entry.final_accounts === t){//项目决算是否及时
                        valTrue('final_timely_true');
                    } else {
                        valTrue('final_timely_false');
                        $('#final_timely_text').val(entry.final_day)
                    }

                    if (entry.labor_cost === t){//人工超支否
                        valTrue('hours_overspend_true');
                        $('#hours_overspend_text').val(entry.labor_day)
                    } else {
                        valTrue('hours_overspend_false')
                    }

                    if (entry.cash === t) {//现金成本超支否
                        valTrue('cash_overspend_true');
                        $('#cash_overspend_text').val(entry.cash_day)
                    } else {
                        valTrue('cash_overspend_false')
                    }

                    if (entry.part_time === t){//使用兼职否
                        valTrue('part_time_true')
                    } else {
                        valTrue('part_time_false')
                    }
                    if (entry.part_time_sign){
                        $('#part_time_confirm').html(createSign(entry.part_time_sign))
                    }

                    if (entry.agent === t){//使用代理否
                        valTrue('agent_true')
                    } else {
                        valTrue('agent_false')
                    }
                    if (entry.agent_sign){
                        $('#agent_confirm').html(createSign(entry.agent_sign))
                    }

                    if (entry.goods === t){//领用物品归还否
                        valTrue('goods_return_true')
                    } else {
                        valTrue('goods_return_false')
                    }
                    if (entry.goods_sign){
                        $('#goods_return_confirm').html(createSign(entry.goods_sign))
                    }

                    if (entry.Reimbursement === t){//结算否
                        valTrue('balance_true')
                    } else {
                        valTrue('balance_false')
                    }
                    if (entry.Reimbursement_sign){
                        $('#balance_confirm').html(createSign(entry.Reimbursement_sign))
                    }

                    if (entry.need_to_pay === t){//其他费用交接
                        valTrue('gap_amount_true')
                    } else {
                        valTrue('gap_amount_false')
                    }
                    if (entry.need_to_pay_sign){
                        $('#gap_amount_confirm').html(createSign(entry.need_to_pay_sign))
                    }

                    if (entry.research_data === t){//研究资料接收否
                        valTrue('information_filed_true')
                    } else {
                        valTrue('information_filed_false')
                    }
                    if (entry.research_data_sign){
                        $('#information_filed_confirm').html(createSign(entry.research_data_sign))
                    }

                    if (entry.sound_recording === t){//录音等资料接收
                        valTrue('record_true')
                    } else {
                        valTrue('record_false')
                    }
                    if (entry.sound_recording_sign){
                        $('#record_confirm').html(createSign(entry.sound_recording_sign))
                    }

                    if (entry.inventory_property === t){//实物资料归档
                        valTrue('material_filed_true')
                    } else {
                        valTrue('material_filed_false')
                    }
                    if (entry.inventory_property_sign){
                        $('#material_filed_confirm').html(createSign(entry.inventory_property_sign))
                    }

                    if (entry.servey_results === t){//调查成果接收否
                        valTrue('result_true')
                    } else {
                        valTrue('result_false')
                    }
                    if (entry.servey_results_sign){
                        $('#result_confirm').html(createSign(entry.servey_results_sign))
                    }

                    if (entry.contact_information === t){//联络信息归档
                        valTrue('contact_true')
                    } else {
                        valTrue('contact_true')
                    }
                    if (entry.contact_information_sign){
                        $('#contact_confirm').html(createSign(entry.contact_information_sign))
                    }

                    if (entry.other_information_value){//其他资料归档
                        $('.other_information_value').val(entry.other_information_value)
                    }
                    if (entry.other_information === t){
                        valTrue('other_files_true')
                    } else {
                        valTrue('other_files_false')
                    }
                    if (entry.other_information_sign){
                        $('#other_files_confirm').html(createSign(entry.other_information_sign))
                    }

                    if (entry.customer_complaints === t){//客户投诉否
                        valTrue('complaints_true')
                    } else {
                        valTrue('complaints_false')
                    }
                    if (entry.customer_complaints_sign){
                        $('#complaints_confirm').html(createSign(entry.customer_complaints_sign))
                    }

                    if (entry.project_outcomes === t){//项目成果提交
                        valTrue('result_submit_true')
                    } else {
                        valTrue('result_submit_false')
                    }
                    if (entry.project_outcomes_sign){
                        $('#result_submit_confirm').html(createSign(entry.project_outcomes_sign))
                    }

                    if (entry.final_sample === t){//最终成本提交
                        valTrue('inspect_true')
                    } else {
                        valTrue('inspect_false')
                    }
                    if (entry.final_sample_sign){
                        $('#inspect_confirm').html(createSign(entry.final_sample_sign))
                    }

                    if (entry.manage_sign){//项目经理签字及时间
                        $('#signature_manager').html(createSign(entry.manage_sign));
                        $('#signature_manager_time').val(entry.manage_time)
                    }

                    if (entry.knot_sidn){//结项签字及时间
                        $('#signature_closing').html(createSign(entry.knot_sidn));
                        $('#signature_closing_time').val(entry.knot_time)
                    }
                }





			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		})
	}
	
	$(".btn-info").click(function(){
		var html = $(this).parent().prev().find("input");
		var type = $(this).parent().prev().find("input").attr("type");
		if(html.length>0){
			if(type=="text"){
				var ss = $(this).parent().prev().find("input").val();
				if(ss!=null&&ss!=""){
					var name = sessionStorage.getItem("sysUser");
					$(this).parent().html("<span style=\"color:red\">签字："+JSON.parse(name).userName+"</span>");
				}else{
					alert("请输入内容");
				}
			}
			if(type=="radio"){
				var name = $(this).parent().prev().find("input").attr("name");
				var list= $("input:radio[name="+name+"]:checked").val();
	            if(list==null){
	                alert("请选中一个!");
	                return false;
	            }else{
	            	var name = sessionStorage.getItem("sysUser");
					$(this).parent().html("<span style=\"color:red\">签字："+JSON.parse(name).userName+"</span>");
	            }
			}
		}else{
			var name = sessionStorage.getItem("sysUser");
			$(this).parent().html("<span style=\"color:red\">签字："+JSON.parse(name).userName+"</span>");
		}
	});
	
	$(".create_button").click(function(){
		var to_send = {};
		to_send.project = $('.project').val();//立项时间
		var project_sign = $('.project').parent().next().find('span').html();
		if(typeof(project_sign)!='undefined'){
			to_send.project_sign = project_sign;
		}else{
			to_send.project_sign = '';
		}
		to_send.re_star_end = $('.re_star_end').val();//要求开始-结束
		var re_star_end_sign = $('.re_star_end').parent().next().find('span').html();
		if(typeof(re_star_end_sign)!='undefined'){
			to_send.re_star_end_sign = re_star_end_sign;
		}else{
			to_send.re_star_end_sign = '';
		}
		to_send.pr_star_end = $('.pr_star_end').val();//执行开始-结束
		var pr_star_end_sign = $('.pr_star_end').parent().next().find('span').html();
		if(typeof(pr_star_end_sign)!='undefined'){
			to_send.pr_star_end_sign = pr_star_end_sign;
		}else{
			to_send.pr_star_end_sign = '';
		}
		
		to_send.execution_cycle = $("input:radio[name='execution_cycle']:checked").val();//项目执行周期是否延时:
		to_send.execution_cycle_value = $('.execution_cycle_value').val()//项目执行周期备注
		to_send.budget_day = $('.budget_day').val();//申请预算是否及时: 
		to_send.budget = $("input:radio[name='budget']:checked").val();//申请预算是否及时:
		to_send.final_accounts = $("input:radio[name='final_accounts']:checked").val();//提交决算是否及时
		to_send.final_day = $('.final_day').val();//提交决算是否及时
		to_send.labor_day = $('.labor_day').val();
		to_send.labor_cost = $("input:radio[name='labor_cost']:checked").val();//人工成本是否超支
		to_send.cash =  $("input:radio[name='cash']:checked").val();//现金是否超支
		to_send.cash_day = $('.cash_day').val();
		/**-----------------------------------------------------*/
		to_send.part_time =  $("input:radio[name='part_time']:checked").val();//兼职代理
		var part_time_sign = $("input:radio[name='part_time']").parent().parent().parent().next().find('span').html();
		if(typeof(part_time_sign)!='undefined'){
			to_send.part_time_sign = part_time_sign;
		}else{
			to_send.part_time_sign = '';
		}
		to_send.agent = $("input:radio[name='agent']:checked").val();//代理
		var agent_sign =$("input:radio[name='agent']").parent().parent().parent().next().find('span').html();
		if(typeof(agent_sign)!='undefined'){
			to_send.agent_sign = agent_sign;
		}else{
			to_send.agent_sign = '';
		}
		to_send.goods = $("input:radio[name='goods']:checked").val();//物品
		var goods_sign = $("input:radio[name='goods']").parent().parent().parent().next().find('span').html();
		if(typeof(goods_sign)!='undefined'){
			to_send.goods_sign = goods_sign;
		}else{
			to_send.goods_sign = '';
		}
		to_send.Reimbursement = $("input:radio[name='Reimbursement']:checked").val();//报销
		var Reimbursement_sign =  $("input:radio[name='Reimbursement']").parent().parent().parent().next().find('span').html();
		if(typeof(Reimbursement_sign)!='undefined'){
			to_send.Reimbursement_sign = Reimbursement_sign;
		}else{
			to_send.Reimbursement_sign = '';
		}
		to_send.need_to_pay = $("input:radio[name='need_to_pay']:checked").val();//需支付
		var need_to_pay_sign = $("input:radio[name='need_to_pay']").parent().parent().parent().next().find('span').html();
		if(typeof(need_to_pay_sign)!='undefined'){
			to_send.need_to_pay_sign = need_to_pay_sign;
		}else{
			to_send.need_to_pay_sign = '';
		}
		to_send.research_data = $("input:radio[name='research_data']:checked").val();//严爵资料
		var research_data_sign =  $("input:radio[name='research_data']").parent().parent().parent().next().find('span').html();
		if(typeof(research_data_sign)!='undefined'){
			to_send.research_data_sign = research_data_sign;
		}
		to_send.sound_recording =  $("input:radio[name='sound_recording']:checked").val();//录音录像
		var sound_recording_sign = $("input:radio[name='sound_recording']").parent().parent().parent().next().find('span').html();
		if(typeof(sound_recording_sign)!='undefined'){
			to_send.sound_recording_sign = sound_recording_sign;
		}else{
			to_send.sound_recording_sign = '';
		}
		to_send.inventory_property =  $("input:radio[name='inventory_property']:checked").val();//实物调查资料归档survey
		var inventory_property_sign = $("input:radio[name='inventory_property']").parent().parent().parent().next().find('span').html();
		if(typeof(inventory_property_sign)!='undefined'){
			to_send.inventory_property_sign = inventory_property_sign;
		}else{
			to_send.inventory_property_sign = '';
		}
		to_send.servey_results = $("input:radio[name='servey_results']:checked").val();//调查成果
		var servey_results_sign =  $("input:radio[name='servey_results']").parent().parent().parent().next().find('span').html();
		if(typeof(servey_results_sign)!='undefined'){
			to_send.servey_results_sign = servey_results_sign;
		}else{
			to_send.servey_results_sign = '';
		}
		to_send.contact_information = $("input:radio[name='contact_information']:checked").val();//联络信息
		var contact_information_sign = $("input:radio[name='contact_information']").parent().parent().parent().next().find('span').html();
		if(typeof(contact_information_sign)!='undefined'){
			to_send.contact_information_sign = contact_information_sign;
		}else{
			to_send.contact_information_sign = '';
		}
		to_send.other_information = $("input:radio[name='other_information']:checked").val();//联络信息
		var other_information_sign = $("input:radio[name='other_information']").parent().parent().parent().next().find('span').html();
		if(typeof(other_information_sign)!='undefined'){
			to_send.other_information_sign = other_information_sign;
		}else{
			to_send.other_information_sign = '';
		}
		to_send.other_information_value = $(".other_information_value").val();//联络信息
		var other_information_value_sign = $('.other_information_value').parent().parent().parent().next().find('span').html();
		if(typeof(other_information_value_sign)!='undefined'){
			to_send.other_information_value_sign = other_information_value_sign;
		}else{
			to_send.other_information_value_sign = '';
		}
		to_send.customer_complaints = $("input:radio[name='customer_complaints']:checked").val();//客户投诉
		var customer_complaints_sign = $("input:radio[name='customer_complaints']").parent().parent().parent().next().find('span').html();
		if(typeof(customer_complaints_sign)!='undefined'){
			to_send.customer_complaints_sign = customer_complaints_sign;
		}else{
			to_send.customer_complaints_sign = '';
		}
		to_send.project_outcomes = $("input:radio[name='customer_complaints']:checked").val();//>项目成果提交客户确认
		var project_outcomes_sign = $("input:radio[name='customer_complaints']").parent().parent().parent().next().find('span').html();
		if(typeof(project_outcomes_sign)!='undefined'){
			to_send.project_outcomes_sign = project_outcomes_sign;
		}else{
			to_send.project_outcomes_sign = '';
		}
		to_send.final_sample = $("input:radio[name='final_sample']:checked").val();//最终样本/费用等客户确认
		var final_sample_sign = $("input:radio[name='final_sample']").parent().parent().parent().next().find('span').html();
		if(typeof(final_sample_sign)!='undefined'){
			to_send.final_sample_sign = final_sample_sign;
		}else{
			to_send.final_sample_sign = '';
		}
		var myDate = new Date();
		to_send.manage_time = myDate.getFullYear()+"-"+(parseInt(myDate.getMonth())+1)+"-"+myDate.getDate()
		var manage_sign = $('.manage_time').parent().prev().find('span').html();
		if(typeof(manage_sign)!='undefined'){
			to_send.manage_sign = manage_sign;
		}else{
			to_send.manage_sign = '';
		}
		to_send.knot_time = myDate.getFullYear()+"-"+(parseInt(myDate.getMonth())+1)+"-"+myDate.getDate()
		var knot_sidn = $('.knot_time').parent().prev().find('span').html();
		if(typeof(knot_sidn)!='undefined'){
			to_send.knot_sidn = knot_sidn;
		}else{
			to_send.knot_sidn = '';
		}
		var to={}
		//return;
		to.content = to_send;
		to.proId = 6;
		$.ajax({
			url : "" + realPath + "/project/anEntryBookAdd",
			type : "post",
			dataType : "json",
			async : true,
			data: JSON.stringify(to),
			contentType : "application/JSON;charset=utf-8",
			success : function(data) {
				alert(data);
			},
			error : function(d1, d2, d3) {
				console.log(d1);
				console.log(d2);
				console.log(d3);
			}
		})
	});
});











