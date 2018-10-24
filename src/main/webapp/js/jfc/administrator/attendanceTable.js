var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function() {
	
	/**
	 * 哈哈
	 */

    //表格导出
    $('#attendance_export').on('click', exportTable);
    function exportTable(){
        $.ajax({
            url : realPath + '/attendance/downloadData',
            type : "post",
            dataType : "json",
            contentType : "application/JSON;charset=utf-8",
            async : true,
            data: JSON.stringify({
                login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                attendance_year: $('#year').val(),
                attendance_month: $('#month').val()
            }),
            success: function(data){
                window.open(realPath + data[0].path)
            },
            error: function(e){
                console.log(e)
            }
        })
    }

    //设置考勤备注截止时期
    $('#line_confirm').on('click', function(event){
        $.ajax({
            url: realPath +'',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                deadline: $('#remark_line').val()
            }),
            success: function(data){
                if (data[0].result > 0){
                    alert('设置成功。')
                } else {
                    alert('设置失败。')
                }
            },
            error: function(e){
                console.log(e);
                alert('请求失败。')
            }
        })
    })

    //年份月份筛选
    function initialDays(p){
        var yearSelect = p.yearSelect,
            monthSelect = p.monthSelect,
            timeNow = new Date(),
            yearNow = timeNow.getFullYear(),
            monthNow = timeNow.getMonth() + 1,
            yearOption = `<option>请选择年份</option>`;

        for (let y = 2017; y <= yearNow; y++){
            yearOption += `<option>`+ y +`</option>`
        }
        yearSelect.empty().append(yearOption);

        yearSelect.off('change').on('change', function(event){

            let v = $(event.currentTarget).val(),
                monthOption = `<option>请选择月份</option>`;

            if (v){
                if (parseInt(v) === yearNow){
                    for (let m = 1; m <= monthNow; m++){
                        monthOption += `<option>`+ m +`</option>`
                    }
                } else {
                    for (let m = 1; m <= 12; m++){
                        monthOption += `<option>`+ m +`</option>`
                    }
                }
                monthSelect.empty().append(monthOption)
            }
        });

        yearSelect.val(yearNow).change();
        monthSelect.val(monthNow).change();
    }

    initialDays({
        yearSelect: $('#year'),
        monthSelect: $('#month')
    });


	//$("#zhli").on("click", function(event){
	//	 var to_send = {
	//			  year:$("#year").val(),
	//			  month:$("#month").val()
	//        };
	//	  $.ajax({
	//          url: ""+realPath+"/attendance/list",
	//          type: "post",
	//          dataType: "json",
	//          async: true,
	//          contentType : "application/JSON;charset=utf-8",
	//          data:JSON.stringify(to_send),
	//          success: function(data){
	//        	  alert("整理成功");
	//          },
	//          error: function(d1,d2,d3){
	//              console.log(d1);
	//              console.log(d2);
	//              console.log(d3);
	//          }
	//      })
	//});
	/* */
	/**
	 * 根据日期字符串获取星期几
	 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
	 * @returns {String}
	 */
	function getWeek(dateString){
	    var date;
	    if(dateString == null || dateString == undefined || dateString == ''){
	    	  return "" ;
	    }else{
	        var dateArray = dateString.split("-");
	        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
	        return "星期" + "日一二三四五六".charAt(date.getDay());
	    }
	   
	};

    function fillTable(list){

        let tbody = document.getElementById('datas'),
            fixedLeft = document.getElementById('fixed_left'),
            fixedRight = document.getElementById('fixed_right');
        for (let i = 0, l = list.length; i < l; i++){
            let rowData = list[i],
                rowLeft = rowData.slice(0,1)[0],
                rowRight = rowData.slice(-6,-1),
                tr = document.createElement('tr'),
                trl = document.createElement('tr'),
                trr = document.createElement('tr');
            tbody.appendChild(tr);
            fixedLeft.appendChild(trl);
            fixedRight.appendChild(trr);
            for (let d = 0, ln = rowData.length; d < ln; d++){
                let td = document.createElement('td'),
                    dv = document.createElement('div'),
                    t = rowData[d];
                td.className = 'w-80';
                dv.className = 'table-cell';
                tr.appendChild(td);
                td.appendChild(dv);
                dv.innerText = t;
                switch (t) {
                    case 'ZC':
                        dv.className += ' normal';
                        break;
                    case 'JQ':
                        dv.className += ' holiday';
                        break;
                    case 'C':
                        dv.className += ' late';
                        break;
                    case 'JB':
                        dv.className += ' overtime';
                        break;
                    case 'WO':
                        dv.className += ' bug';
                        break;
                    case 'WT':
                        dv.className += ' absence';
                        break;
                    case 'LG':
                        dv.className += ' signed';
                        break;
                    case 'JJB':
                        dv.className += ' extra';
                        break;
                    case 'WC':
                        dv.className += ' business';
                        break;
                    case 'CC':
                        dv.className += ' trip';
                        break;
                    case 'N':
                        dv.className += ' annual-leave';
                        break;
                    case 'H':
                        dv.className += ' marital-leave';
                        break;
                    case 'S':
                        dv.className += ' private-affair';
                        break;
                    case 'B':
                        dv.className += ' sick-leave';
                        break;
                    case 'D':
                        dv.className += ' day-off';
                        break;
                    default:
                        break;
                }
            }
            let tdl = document.createElement('td'),
                dvl = document.createElement('div');
            tdl.className = 'w-80';
            dvl.className = 'table-cell';
            trl.appendChild(tdl);
            tdl.appendChild(dvl);
            dvl.innerText = rowLeft;
            for (let r = 0, lr = rowRight.length; r < lr; r++){
                let tdr = document.createElement('td'),
                    dvr = document.createElement('div'),
                    t = rowRight[r];
                tdr.className = 'w-60';
                dvr.className = 'table-cell';
                trr.appendChild(tdr);
                tdr.appendChild(dvr);
                dvr.innerText = t;
            }
        }
    }

	//首页
    function request(){
        var to_send = {
            login_email: JSON.parse(sessionStorage.getItem('sysUser')).email,
            attendance_year:$("#year").val(),
            attendance_month:$("#month").val()
        };
        $.ajax({
            url: ""+realPath+"/attendance/listAll",
            type: "post",
            dataType: "json",
            async: true,
            contentType : "application/JSON;charset=utf-8",
            data:JSON.stringify(to_send),
            success: function(data){
                fillTable(data[0].list)
            },
            error: function(d1,d2,d3){
                console.log(d1);
                console.log(d2);
                console.log(d3);
            }
        });
    }

	///有时分秒
	function jsonDateFormat(jsonDate) {//json日期格式转换为正常格式
		 var birthday;
		  if (jsonDate != null) {
			  birthday = jsonDate["time"];
			  birthday = new Date(birthday);
			  var birth_month = birthday.getMonth() + 1;
			  var birth_day = birthday.getDate();
			  var hours = birthday.getHours(); 
			  var min = birthday.getMinutes();
			  if (birth_month < 10)
			    	birth_month = "0" + birth_month;
			  if(birth_day<10){
				  birth_day = "0" + birth_day;
			  }
			  if(hours<10){
				  hours = "0" + hours;
			  }
			  if(min<10){
				  min = "0" + min;
			  }
			  birthday = birthday.getFullYear() + "-" + birth_month + "-"
					+ birth_day+" "+hours+":"+min;
			  return birthday;
		  }else{
			  return "未打卡";
		  }
	}
	 //导入excel的保存按钮
    $("#attendance").on("click", function(event){
        var option = {
        	url: ""+realPath+"/attendance/ImportTxt",
        	type: 'post',
            dataType:"json",
            clearForm: true,
            resetForm: true,
            success: function(data){
				alert(data);
            }
        };
        $("#excelImport").ajaxSubmit(option);
        return false;
    });
    
    //
    $("#month").change(function(){
        request();
    });
    $('#attendance_table_search').on('click', request);
    request();
});



