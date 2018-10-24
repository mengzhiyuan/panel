/**
 * Created by wangxiangyang on 2017/7/11.
 */
 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
//依次处理每个select
function fillOptions(data){
    fillDepartmentCategory(data);
    //fillDepartmentBelonged(data);
    fillAdministrative(data);
    //fillSpecializedList(data);
    fillLiveness(data);
    //fillHospitallevel(data);
    fillAttribute(data);
    fillCategory(data);
    fillNature(data)

}
//DepartmentBelonged
function fillDepartmentBelonged(data){
    var $node = $("#departmentBelonged"),
        data = data[0]["departmentBelonged"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["belongId"] + '">' + data[i]["belongName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}
//DepartmentCategory
function fillDepartmentCategory(data){
    var $node = $("#departmentCategory"),
        data = data[0]["departmentCategory"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["categId"] + '">' + data[i]["categName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//Administrative
function fillAdministrative(data){
    var $node = $("#administrative"),
        data = data[0]["administrative"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["admiId"] + '">' + data[i]["admiName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//SpecializedList
function fillSpecializedList(data){
    var $node = $("#spec"),
        data = data[0]["specializedList"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["specId"] + '">' + data[i]["specName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//Liveness
function fillLiveness(data){
    var $node = $("#liveness"),
        data = data[0]["liveness"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["liveId"] + '">' + data[i]["liveName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//Hospitallevel
function fillHospitallevel(data){
    var $node = $("#hospital_level"),
        data = data[0]["hospitallevel"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["hoslelId"] + '">' + data[i]["hoslevName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//Attribute
function fillAttribute(data){
    var $node = $("#attr_id"),
        data = data[0]["attribute"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["attriId"] + '">' + data[i]["attriName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//Category
function fillCategory(data){
    var $node = $("#category"),
        data = data[0]["category"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["catId"] + '">' + data[i]["catName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//Nature
function fillNature(data){
    var $node = $("#nature"),
        data = data[0]["nature"],
        str = '';
    for (var i = 0,len = data.length; i < len; i++){
        str += '<option value="' + data[i]["natId"] + '">' + data[i]["natName"] + '</option>'
    }
    $node.find("option:not(':first-child')").remove()
        .end().append(str);
}

//selects单个填充方法(ES6 used)
//function fillSingleOption(options){
//    var node = $("#node"),
//        value = options["key"],
//        str = "";
//    for (let i = 0,len = value.length; i < len; i++){
//        str += ''
//    }
//    node.html(str)
//}





//动态填充选项departmentCategory&category
function departmentCategoryReact(event){
    var departmentCategory = $(this).val(),
        to_send = {
            departmentCategory: departmentCategory
        };
    $.ajax({
        url: ""+realPath+"/doctor/belongedList",
        type: 'post',
        dataType: 'json',
        async: false,
        contentType: 'application/JSON;charset=utf-8',
        data: JSON.stringify(to_send),
        success: function(data){
            var data = data[0]['levelList'],
                str = '';
            for (var i = 0,len = data.length; i < len; i++){
                str += '<option value="' + data[i]["belongId"] + '">' + data[i]["belongName"] + '</option>'
            }
            $("#departmentBelonged").find("option:not(':first-child')").remove()
                .end().append(str);
        },
        error: function(d1,d2,d3){
            console.log(d1);
            console.log(d2);
            console.log(d3);
        }
    })
}

function categoryReact(event){
    var category = $(this).val(),
        to_send = {
            category: category
        };
    $.ajax({
        url: ""+realPath+"/doctor/levelList",
        type: 'post',
        dataType: 'json',
        async: false,
        contentType: 'application/JSON;charset=utf-8',
        data: JSON.stringify(to_send),
        success: function(data){
            var data = data[0]['levelList'],
                str = '';
            for (var i = 0,len = data.length; i < len; i++){
                str += '<option value="' + data[i]["levId"] + '">' + data[i]["levName"] + '</option>'
            }
            $("#level").find("option:not(':first-child')").remove()
                .end().append(str);
        },
        error: function(d1,d2,d3){
            console.log(d1);
            console.log(d2);
            console.log(d3);
        }
    })
}