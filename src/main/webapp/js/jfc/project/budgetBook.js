var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
    budgetBookSearch();
    buildBudget.buildFunc();
    $(window).on('unload',function(event){
        sessionStorage.removeItem('infoId');
        sessionStorage.removeItem('proId')
    });
     function budgetBookSearch(){
    	 var to_send = {};
    	 to_send.proId = sessionStorage.getItem("proId");
    	 $.ajax({
 			url : "" + realPath + "/project/budgetBookSearch",
 			type : "post",
 			dataType : "json",
 			async : true,
 			data:JSON.stringify(to_send), 
 			contentType : "application/JSON;charset=utf-8",
 			success : function(data) {

                if (data[0].budgetInfo && data[0].budgetInfo[0] && data[0].budgetInfo[0]['infoId']){
                    sessionStorage.setItem('infoId',data[0].budgetInfo[0]['infoId']);
                }

 				var list = data[0].proList[0],
                    staff = data[0].jfcStaff[0],
                    jfc=data[0].jfc,
                    contact = data[0].cusliaList[0];
 				//审核人
 				var selDom = $("#staff_list");//根据id获取select的jquery对象
 				selDom.append("<option value=''>选择审核人</option>");//添加option
 				for(var m=0;m<jfc.length;m++){
 					selDom.append("<option value="+jfc[m].staName+">"+jfc[m].staName+"</option>");//添加option
 				}
 				$(".proNumber").val(list.proNumber);
 				$(".proName").val(list.proName);
 				$(".proManager").val(staff.staName);
                $('#operating_type').val(list.investigation);
                $('#budgetedPerformance').val(list.info_sum_money);
                $('#info_actual_money').val(list.info_actual_money);
                $('#info_budgetary_cost').val(list.info_budgetary_cost);
 				//var proRequirement = JSON.parse(list.proRequirement)[0];
 				$(".remarks").val(list.remarks);
 				$(".type").val(list.type);
 				$(".cusManger").val(contact.liaName);
 				$(".cusCompany").val(contact.cusComList.comName);
 				$(".cusLinName").val(contact.liaName);
 				$(".cusLinPhone").val(contact.liaPhone);
 				$(".cusLinType").val(contact.cusComList.comType);
 				$(".cusIndustry").val(contact.cusComList.comIndustry);
 				//项目要求
 				$(".objective").val(list.objective);
 				$(".respondents").val(list.respondents);
 				$(".proOthers").val(list.proothers);
 				$(".dataResult").val(list.dataresult);
 				/*//项目配额 
 				var proQuota = JSON.parse(list.proQuota)[0];
 				var quotaList = proQuota.list;
 				var html;
 				for(var i=2;i<=proQuota.lie;i++){
 					for(var j=2;j<=proQuota.hang;j++){
 						var hang='';
 						var lie='';
 						var value;
 						for(var f=0;f<quotaList.length;f++){
 							if(quotaList[f].id==i+'/1'){
 								lie = quotaList[f].value;
 							}
 							if(quotaList[f].id=='1/'+j){
 								hang = quotaList[f].value;
 							}
 							if(quotaList[f].id==j+"/"+i){
 								value = quotaList[f].value;
 							}
 						}
 						html+="<tr><td>"+hang+"+"+lie+"</td><td>danjia</td><td>"+value+"</td></tr>"
 					}
 				}
 				$("#the_proQuota").append(html);*/

 				var d = data;
//----------------//预算审批信息//----------------------------------------------------------------------------------------//
                let receivedData = d[0].budSum;

                if (receivedData != undefined && receivedData.length > 0){
                	
                	var budgetData = [];

                    for (let i = 0, l = receivedData.length; i < l; i++){

                        let t = receivedData[i];
                        budgetData[i] = {};

                        budgetData[i].budId = t.budId;
                        budgetData[i].brief = t.budAbstract;
                        budgetData[i].supplementaryBudget = JSON.parse(t.budAdditional);
                        budgetData[i].surplus = t.budBalance;
                        budgetData[i].budget = t.budBudget;
                        budgetData[i].finalAccount = t.budFinalAccounts;
                        budgetData[i].kind = t.budList;
                        budgetData[i].category = t.budMainTitle;
                        budgetData[i].remark1 = t.budRemarkOne;
                        budgetData[i].remark2 = t.budRemarkTwo;
                        budgetData[i].type = t.budSubtitle;
                        budgetData[i].proId = t.proId;
                        budgetData[i].supplementaryBudget = JSON.parse(t.budAdditional);

                    }

                    buildBudget.budgetData.sum = JSON.parse(d[0].budgetInfo[0]['infoSum'])[0];
                    buildBudget.budgetData.sample = JSON.parse(d[0].budgetInfo[0]['infoSample'])[0];
                    buildBudget.budgetData.average = JSON.parse(d[0].budgetInfo[0]['infoAverage'])[0];
                    buildBudget.budgetData.budgets = budgetData;
                }

                //buildBudget.buildFunc();
                setTimeout(function(){
                    $('.selectpicker').selectpicker('refresh');
                },1000);
//----------------//个别信息//----------------------------------------------------------------------------------------//

//----------------//配额审批信息//----------------------------------------------------------------------------------------//
                let allocation = d[0]['proQuota'],
                    tds = $('#project_allocate').find('td');

                if (allocation && allocation.length > 0){
                	if (allocation.length > 6){

                        let gap = Math.ceil((allocation.length - 6) / 2);

                        for (let i = 0; i < gap; i++){
                            addRow();
                        }
                    }
                    for (let i = 0, l = allocation.length; i < l; i++){
                    	
                    	let o = i * 3;

                        $(tds[o]).find('input').attr('index', i + 1);
                        //$(tds[o]).find('input').attr('col', 'type');
                        $(tds[o]).find('input').val(allocation[i].quoName);
                        $(tds[o]).find('input').prop('disabled', true);

                        $(tds[o + 1]).find('input').attr('index', i + 1);
                        //$(tds[o + 1]).find('input').attr('col', 'unit_price');
                        $(tds[o + 1]).find('input').val(allocation[i].quoPrice);
                        $(tds[o]).find('input').prop('disabled', true);

                        $(tds[o + 2]).find('input').attr('index', i + 1);
                        //$(tds[o + 2]).find('input').attr('col', 'number');
                        $(tds[o + 2]).find('input').val(allocation[i].quoNumber);
                        $(tds[o]).find('input').prop('disabled', true);

                    }
                    calcCompleteAmount();
                }

//----------------//赋值审批信息//----------------------------------------------------------------------------------------//
                if (d[0].budgetInfo && d[0].budgetInfo[0]){

                    $('#budgetedPerformance').val(d[0].budgetInfo[0]['infoSumMoney']);

                	let examine = JSON.parse(d[0].budgetInfo[0]['infoApproval'])[0],
                    examine_budget = examine['budget'],
                    examine_supplementary = examine['supplementary'],
                    examine_overspending = examine['overspending'],
                    examine_final_account = examine['final_account'],
                    $examine = $('#examine'),
                    $examine_budget = $examine.find('.budget'),
                    $examine_supplementary = $examine.find('.supplementary'),
                    $examine_overspending = $examine.find('.overspending'),
                    $examine_final_account = $examine.find('.final_account');

                if (examine_supplementary.length > 1){

                    for (let i = 1; i < examine_supplementary.length; i++){

                        $(`<tr class="supplementary">
                        <td>追加预算</td>
                        <td><input type="text" class="input applicant_input applicant_signature_supplementary" placeholder="请输入申请人姓名"></td>
                        <td class="time_supplementary"></td>
                        <td>
                            <span class="signature_area manager_supplementary"></span>
                            <button class="btn btn-sm btn-success manager_button">经理签名</button>
                        </td>
                        <td>
                            <span class="signature_area director_supplementary"></span>
                            <button class="btn btn-sm btn-info director_button">总监签名</button>
                        </td>
                        <td class="time_manager"></td>
                        <td class="time_director"></td>
                    </tr>`).insertBefore($examine_overspending);
                    }
                }

                $('#applicant_signature_budget').val(examine_budget['applicant']);
                $('#time_budget').text(examine_budget['date']);
                $('#manager_budget').text(examine_budget['signature_manager']);
                $('#director_budget').text(examine_budget['signature_director']);
                $('#budget_time_manager').text(examine_budget['date_manager']);
                $('#budget_time_director').text(examine_budget['date_director']);

                for (let i = 0; i < examine_supplementary.length; i++){

                    $($examine_supplementary[i]).find('.applicant_signature_supplementary').val(examine_supplementary[i].applicant);
                    $($examine_supplementary[i]).find('.time_supplementary').text(examine_supplementary[i].date);
                    $($examine_supplementary[i]).find('.manager_supplementary').text(examine_supplementary[i].signature_manager);
                    $($examine_supplementary[i]).find('.director_supplementary').text(examine_supplementary[i].signature_director);
                    $($examine_supplementary[i]).find('.time_manager').text(examine_supplementary[i].date_manager);
                    $($examine_supplementary[i]).find('.time_director').text(examine_supplementary[i].date_director);
                }
                $('#applicant_signature_overspending').val(examine_budget['applicant']);
                $('#time_overspending').text(examine_budget['date']);
                $('#manager_overspending').text(examine_budget['signature_manager']);
                $('#director_overspending').text(examine_budget['signature_director']);
                $('#overspending_time_manager').text(examine_budget['date_manager']);
                $('#overspending_time_director').text(examine_budget['date_director']);

                $('#applicant_signature_final_account').val(examine_budget['applicant']);
                $('#time_final_account').text(examine_budget['date']);
                $('#manager_final_account').text(examine_budget['signature_manager']);
                $('#director_final_account').text(examine_budget['signature_director']);
                $('#final_account_time_manager').text(examine_budget['date_manager']);
                $('#final_account_time_director').text(examine_budget['date_director']);
                }

//----------------//申请原因信息//----------------------------------------------------------------------------------------//
                if (d[0].budgetInfo && d[0].budgetInfo[0]){
                	let reasonsSupplementary = JSON.parse(d[0].budgetInfo[0]['infoReasonssupplementary'])[0],
                    reasonsOverspending = JSON.parse(d[0].budgetInfo[0]['infoReasonsoverspending'])[0];

                $('#reason_before_supplementary').text(reasonsSupplementary['reasons']);
                $('#reason_now_overspending').val(reasonsOverspending['reasons']);

                $('#reason_supplementary_manager').text(reasonsSupplementary['signature_manager']);
                $('#reason_supplementary_director').text(reasonsSupplementary['signature_director']);

                $('#reason_overspending_manager').text(reasonsOverspending['signature_manager']);
                $('#reason_overspending_director').text(reasonsOverspending['signature_director']);
                }



            },
 			error : function(d1, d2, d3) {
 				console.log(d1);
 				console.log(d2);
 				console.log(d3);
 			}
 		})
     }
     //$("#add_proNumber").click(function(){
    	// var index = $("#the_number tr").index($(this));
    	// var html = "<tr><td><div class=\"col-sm-8\">\<select class=\"selectpicker  form-control\""+
		//							"data-live-search=\"true\">\<option value=\"项目经理PM\">请选择</option>"+
		//							"<option value=\"项目经理PM\">项目经理PM</option>"+
		//							"<option value=\"执行督导\">执行督导</option>"+
		//							"<option value=\"QC督导\">QC督导</option>"+
		//							"<option value=\"长期兼职\">长期兼职</option><option value=\"研究经理\">研究经理</option>"+
		//							"<option value=\"研究员\">研究员</option><option value=\"长期兼职\">长期兼职</option>"+
		//							"<option value=\"其他\">其他</option></select></div>"+
		//							"<div class=\"col-sm-4\" id=\"add_proNumber\"><span class=\"glyphicon glyphicon-plus\"></span>"+
		//							"<span class=\"glyphicon glyphicon-minus\"></span></div></td>"+
		//							"<td><input type=\"text\" class=\"input\"></td>"+
		//							"<td><input type=\"text\" class=\"input\"></td>"+
		//							"<td><input type=\"text\" class=\"input\"></td>"+
		//							"<td><input type=\"text\" class=\"input\"></td>"+
		//							"<td><select class=\"selectpicker  form-control\ data-live-search=\"true\">"+
		//							"<option value=\"\">请选择</option>"+
		//							"<option value=\"单独预付\">单独预付</option>"+
		//							"<option value=\"单独后付\">单独后付</option>"+
		//							"<option value=\"统一预付\">统一预付</option>"+
		//							"<option value=\"统一后付\">统一后付</option>"+
		//							"</select></td><td><input type=\"text\" class=\"input\"></td></tr>";
		// $("#the_number tr").eq(index).after(html);
		// $('.selectpicker').selectpicker('refresh');
     //});


    //配额部份加行自动添加序号属性
    function addRow(event){
    	
//        let n = node || $(event.currentTarget);
        let n = $('#insert_buttons'),
            previousIndex = n.prev().find('td:last-child').find('input').attr('index');
        //添加节点
        $(`<tr>
            <td><input type="text" col="type" class="input"></td>
            <td><input type="number" col="unit_price" class="input"></td>
            <td><input type="number" col="number" class="input"></td>
            <td><input type="text" col="type" class="input"></td>
            <td><input type="number" col="unit_price" class="input"></td>
            <td><input type="number" col="number" class="input"></td>
        </tr>`).insertBefore(n);

        //赋属性值和序号
        var toAdd = n.prev().find('td');

        for (let i = 0, l = toAdd.length; i < l; i++){

            let t = Math.ceil((i + 1) / 3);

            $(toAdd[i]).find('input').attr('index', parseInt(previousIndex) + t);
        }
    }

    //配额部分减行
    function removeRow(event){
        let n = $('#insert_buttons');
        n.prev().prev().length && n.prev().remove();
    }

    //配额部分改变会导致$('#info_actual_money')实际完成项目额的变化
    function calcCompleteAmount(event){

        var ts = $('#project_allocate .input[col=number]'),
            ev = $('#info_actual_money'),
            number = 0;

        ts.each(function(){
            number += ($(this).val() && $(this).parent().prev().find('input').val()) && $(this).val() * $(this).parent().prev().find('input').val()
        });
        ev.val(number);
        //税费
        calcFax(number);
        //销售奖金
        calcSellBonus();
        //毛利润
        $('#gross_profit').val(number - $('#fax').val() - $('#sell_bonus').val() - $('#final_cost').val());
        //毛利润率
        $('#gross_profit').attr('title', $('#gross_profit').val() / number);
        //项目奖金比例
        $('#project_bonus').attr('title',parseFloat($('#gross_profit').attr('title')) < 0.5 ? 0.03 : 0.05);
        $('#project_bonus').val($('#gross_profit').val() * $('#project_bonus').attr('title'))
    }

    //税费
    function calcFax(number){
        $('#fax').val(number * 0.06)
    }
    //销售奖金
    function calcSellBonus(){
        $('#sell_bonus').val($('#info_actual_money').val() * $('#bonus_ratio').val())
    }

    $('body').on('click', '.addGoods', addRow)
        .on('click', '.removeGoods', removeRow)
        .on('input', '#project_allocate .input:not([col=type])', calcCompleteAmount);

    $('#bonus_ratio').on('change',calcSellBonus);


    //提交方法(取值)
    function submitAll(event){
    	if($("#staff_list").find("option:selected").val()===""){
    		alert("请选择审核人");
    		return;
    	}
        let date = new Date(),
            dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

        //配额部份
        let tds = $('#project_allocate').find('td'),
            allocation = new Array(tds.length / 3);

        for (let i = 0, l = allocation.length; i < l; i++){
            allocation[i] = {
                type: $(tds[i * 3]).find('input').val(),
                unit_price: $(tds[i * 3 + 1]).find('input').val(),
                number: $(tds[i * 3 + 2]).find('input').val()
            }
        }

        //for (let i = 0, l = tds.length; i < l; i++){
        //    allocation[$(tds[i]).find('input').attr('index') - 1][$(tds[i]).find('input').attr('col')] = $(tds[i]).find('input').val()
        //}

        //审批信息部份
        let examine = $('#examine'),
            examineData = {
                budget: {},
                supplementary: [],
                overspending: {},
                final_account: {}
            },
            examine_budget = examine.find('tr.budget'),
            examine_supplementary = examine.find('tr.supplementary'),
            examine_overspending = examine.find('tr.overspending'),
            examine_final_account = examine.find('tr.final_account');


        //预算审批行
        examineData.budget.applicant = $('#applicant_signature_budget').val();
        examineData.budget.date = $('#time_budget').text() || dateString;
        examineData.budget.signature_manager = $('#manager_budget').text();
        examineData.budget.signature_director = $('#director_budget').text();

        if (examineData.budget.signature_manager){
            examineData.budget.date_manager = $('#budget_time_manager').text() || dateString;
        }
        if (examineData.budget.signature_director){
            examineData.budget.date_director = $('#budget_time_director').text() || dateString;
        }


        //追加预算审批行s
        for (let i = 0, l = examine_supplementary.length; i < l; i++){

            let thisTr = $(examine_supplementary[i]);

            examineData.supplementary[i] = {};

            examineData.supplementary[i].applicant = thisTr.find('.applicant_input').val();
            examineData.supplementary[i].date = thisTr.find('.time_supplementary').text() || dateString;
            examineData.supplementary[i].signature_manager = thisTr.find('.manager_supplementary').text();
            examineData.supplementary[i].signature_director = thisTr.find('.director_supplementary').text();

            if (examineData.supplementary[i].signature_manager){
                examineData.supplementary[i].date_manager = thisTr.find('.time_manager').text() || dateString;
            }
            if (examineData.supplementary[i].signature_director){
                examineData.supplementary[i].date_director = thisTr.find('.time_director').text() || dateString;
            }
        }

        //超支审批
        examineData.overspending.applicant = $('#applicant_signature_overspending').val();
        examineData.overspending.date = $('#time_overspending').text() || dateString;
        examineData.overspending.signature_manager = $('#manager_overspending').text();
        examineData.overspending.signature_director = $('#director_overspending').text();

        if (examineData.overspending.signature_manager){
            examineData.overspending.date_manager = $('#overspending_time_manager').text() || dateString;
        }
        if (examineData.overspending.signature_director){
            examineData.overspending.date_director = $('#overspending_time_director').text() || dateString;
        }

        //决算审批行
        examineData.final_account.applicant = $('#applicant_signature_final_account').val();
        examineData.final_account.date = $('#time_final_account').text() || dateString;
        examineData.final_account.signature_manager = $('#manager_final_account').text();
        examineData.final_account.signature_director = $('#director_final_account').text();

        if (examineData.final_account.signature_manager){
            examineData.final_account.date_manager = $('#final_account_time_manager').text() || dateString;
        }
        if (examineData.final_account.signature_director){
            examineData.final_account.date_director = $('#final_account_time_director').text() || dateString;
        }



        let data = {

            //operatingType: $('#operating_type').val(),
            info_sum_money: $('#budgetedPerformance').val(),
            info_actual_money: $('#info_actual_money').val(),
            info_budgetary_cost: $('#info_budgetary_cost').val(),
            allocation: allocation,
            budget: buildBudget.budgetData,
            sum: buildBudget.budgetData.sum,
            sample: buildBudget.budgetData.sample,
            average: buildBudget.budgetData.average,
            examine: examineData,
            reasonsSupplementary: {
                reasons: $('#reason_before_supplementary').text() + examine_supplementary.length + $('#reason_now_supplementary').val(),
                signature_manager: $('#reason_supplementary_manager').text(),
                signature_director: $('#reason_supplementary_director').text()
            },
            reasonsOverspending: {
                reasons: $('#reason_now_overspending').val(),
                signature_manager: $('#reason_overspending_manager').text(),
                signature_director: $('#reason_overspending_director').text()
            },
            proId:sessionStorage.getItem("proId"),
            infoId: sessionStorage.getItem('infoId') || '',
        };
        $.ajax({
            url: "" + realPath + "/project/budgetBookAdd",
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify(data),
            success: function(d){
            	if(d[0].result==="add"){
            		subTask();
                    document.location.href = './budgetList.html'
            	}
            	if(d[0].result==="update"){
            		subTaskUpdate();
                    document.location.href = './budgetList.html'
            	}
            	if(d[0].result==="error"){
            		alert("添加失败");
                    document.location.href = './budgetList.html'
            	}
            	
            },
            error: function(e){
                console.log(e);
                alert('保存失败。')
            }
        })
    }
    function subTaskUpdate(){
   	 let self = this,
        to_send = {
            taskId: JSON.parse(sessionStorage.getItem('taskId')),
            nominee:  $("#staff_list").find("option:selected").text(),
            outcome:'通过'
        };
    $.ajax({
        url: realPath + '/workflow/submitTask',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(to_send),
        async: true,
        success: function(data){
            if (data[0].result <= 0){
                alert('操作失败')
            }
        },
        error: function(e){
            alert('网络问题')
        }
    })
   }
    $('#submit_all').on('click',submitAll);
    function subTask(){
    	 let self = this,
         to_send = {
             taskId: JSON.parse(sessionStorage.getItem('taskId')),
             nominee:  $("#staff_list").find("option:selected").text()
         };
     $.ajax({
         url: realPath + '/workflow/submitTask',
         type: 'post',
         contentType: 'application/json;charset=utf-8',
         dataType: 'json',
         data: JSON.stringify(to_send),
         async: true,
         success: function(data){
             if (data[0].result <= 0){
                 alert('操作失败')
             }
         },
         error: function(e){
             alert('网络问题')
         }
     })
    }
//try{
//    //填充数据(赋值)
//    function fillTable(){
//
//        $.ajax({
//            url: '',
//            type: 'post',
//            contentType: 'application/json;charset=utf-8',
//            dataType: 'json',
//            async: true,
//            data: data,
//            success: function(d){
//            },
//            error: function(e){}
//        })
//    }
//
//    fillTable();
//} catch(e){}


    function signExamine(event){

        $(event.currentTarget).prev('.signature_area').text(sessionStorage.getItem('roleName'));
    }

    $('#examine').on('click','.manager_button',signExamine)
        .on('click','.manager_button',signExamine);

    $('#sign_supplementary_manager').on('click', function(event){
        if (!$('#reason_supplementary_manager').text()) $('#reason_supplementary_manager').text(sessionStorage.getItem('roleName'))
    });
    $('#sign_supplementary_director').on('click', function(event){
        if (!$('#reason_supplementary_director').text()) $('#reason_supplementary_director').text(sessionStorage.getItem('roleName'))
    });

    $('#sign_overspending_manager').on('click', function(event){
        if (!$('#reason_overspending_manager').text()) $('#reason_overspending_manager').text(sessionStorage.getItem('roleName'))
    });
    $('#sign_overspending_director').on('click', function(event){
        if (!$('#reason_overspending_director').text()) $('#reason_overspending_director').text(sessionStorage.getItem('roleName'))
    });



//    projectApproval.approvalInit();

});
















