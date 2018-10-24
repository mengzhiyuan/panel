/**
 * Created by wangxiangyang on 2018/6/19.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){

    let time_object = new Date(),
        year = time_object.getFullYear(),
        month = time_object.getMonth() + 1,
        date = time_object.getDate(),
        day = time_object.getDay(),
        hour = time_object.getHours(),
        minute = time_object.getMinutes(),
        second = time_object.getSeconds(),
        time_node = $(`<div class="time" style="float: left;margin: 0;padding-top: 20px;font-size: 14px;"></div>`),
        year_node =$(`<span class="year" style="margin-right: 2px;">`+ year +`年</span>`),
        month_node =$(`<span class="month" style="margin-right: 2px;">`+ month +`月</span>`),
        date_node =$(`<span class="date" style="margin-right: 20px;">`+ date +`日</span>`),
        day_node =$(`<span class="day" style="margin-right: 20px;"></span>`),
        hour_node =$(`<span class="hour" style="margin-right: 2px;">`+ hour +`时</span>`),
        minute_node =$(`<span class="minute" style="margin-right: 2px;">`+ minute +`分</span>`),
        second_node =$(`<span class="second" style="margin-right: 2px;">`+ second +`秒</span>`);

    $('.top_nav .navbar-right').css('width', '40%');

    function dayString(i){
        let day_string;
        switch (i){
            case 1:
                day_string = '星期一';
                break;
            case 2:
                day_string = '星期二';
                break;
            case 3:
                day_string = '星期三';
                break;
            case 4:
                day_string = '星期四';
                break;
            case 5:
                day_string = '星期五';
                break;
            case 6:
                day_string = '星期六';
                break;
            case 7:
                day_string = '星期日';
                break;
        }
        return day_string
    }

    day_node.text(dayString(day));
    time_node.append(year_node)
        .append(month_node)
        .append(date_node)
        .append(day_node)
        .append(hour_node)
        .append(minute_node)
        .append(second_node);
    $('.top_nav .nav_menu>nav').append(time_node);

    let clock = setInterval(function(){
        let time_clock = new Date(),
            year_clock = time_clock.getFullYear(),
            month_clock = time_clock.getMonth(),
            date_clock = time_clock.getDate(),
            day_clock = time_clock.getDay(),
            hour_clock = time_clock.getHours(),
            minute_clock = time_clock.getMinutes(),
            second_clock = time_clock.getSeconds();
        if (parseInt(second_node.text()) !== second_clock){
            second_node.text(second_clock + '秒');
            if (second_clock === 0){
                minute_node.text(minute_clock + '分');
                if (minute_clock === 0){
                    hour_node.text(hour_clock + '时');
                    if (hour_clock === 0){
                        date_node.text(date_clock + '日');
                        day_node.text(dayString(day_clock));
                        month_node.text(month_clock + '月');
                        year_node.text(year_clock + '年');
                    }
                }
            }
        }
    },100);

    //左侧菜单
    try {
        $.ajax({
            url : "" + realPath + "/system/menuOA",
            data: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem('sysUser')).email
            }),
            type : "post",
            dataType : "json",
            async : false,
            contentType : "application/JSON;charset=utf-8",
            success : function(data) {
                var list = data[0].allMenuList;
                listMenu(list)
            }
        });
        //listMenu(JSON.parse('[{"allMenuList":[{"dataUrl":"#","id":1,"menuClass":"/images/JFC/icon/icon01.png","menuCode":"systemmanagement","menuName":"系统管理","parentMenucode":"0","sequence":5,"status":false,"subAuthorityList":[{"dataUrl":"../../../html/jfc/main/usrManage.html","id":2,"menuClass":"../../../images/JFC/icon/icon02.png","menuCode":"sysuser","menuName":"用户管理","parentMenucode":"systemmanagement","sequence":1,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/main/departmentManage.html","id":3,"menuClass":"../../../images/JFC/icon/icon03.png","menuCode":"department","menuName":"部门管理","parentMenucode":"systemmanagement","sequence":2,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/main/rolesManage.html","id":5,"menuClass":"../../../images/JFC/icon/icon04.png","menuCode":"role","menuName":"角色权限管理","parentMenucode":"systemmanagement","sequence":4,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/main/listManage.html","id":6,"menuClass":"../../../images/JFC/icon/icon05.png","menuCode":"authority","menuName":"菜单管理","parentMenucode":"systemmanagement","sequence":5,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/main/progressDeploy.html","id":52,"menuClass":"../../../images/JFC/icon/icon06.png","menuCode":"proess","menuName":"流程部署","parentMenucode":"systemmanagement","sequence":10,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/index_kol.html","id":59,"menuClass":"../../../images/JFC/icon/icon06.png","menuCode":"home","menuName":"首页","parentMenucode":"systemmanagement","sequence":56,"status":false,"subAuthorityList":[]}]},{"dataUrl":"#","id":7,"menuClass":"/images/JFC/icon/icon06.png","menuCode":"doctorPanel","menuName":"会员管理","parentMenucode":"0","sequence":6,"status":false,"subAuthorityList":[{"dataUrl":"../../../html/jfc/kangpai/membership.html","id":8,"menuClass":"../../../images/JFC/icon/icon07.png","menuCode":"doctor","menuName":"查询","parentMenucode":"doctorPanel","sequence":7,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dataDetail.html","id":14,"menuClass":"../../../images/JFC/icon/icon08.png","menuCode":"doctorUpdate","menuName":"增加","parentMenucode":"doctorPanel","sequence":8,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/match.html","id":15,"menuClass":"../../../images/JFC/icon/icon09.png","menuCode":"matching","menuName":"匹配","parentMenucode":"doctorPanel","sequence":20,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/operationalCenter.html","id":60,"menuClass":"../../../images/JFC/icon/icon11.png","menuCode":"manager","menuName":"管理","parentMenucode":"doctorPanel","sequence":20,"status":false,"subAuthorityList":[]}]},{"dataUrl":"#","id":16,"menuClass":"/images/JFC/icon/icon10.png","menuCode":"dictionary","menuName":"数据字典","parentMenucode":"0","sequence":22,"status":false,"subAuthorityList":[{"dataUrl":"../../../html/jfc/kangpai/dictionaryDataAttribute.html","id":17,"menuClass":"../../../images/JFC/icon/icon11.png","menuCode":"attribute","menuName":"数据属性","parentMenucode":"dictionary","sequence":23,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dictionaryDepartment.html","id":18,"menuClass":"../../../images/JFC/icon/icon12.png","menuCode":"dictionaryDepartment","menuName":"科室级联","parentMenucode":"dictionary","sequence":24,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dictionaryCategory.html","id":19,"menuClass":"../../../images/JFC/icon/icon13.png","menuCode":"dictionaryCategory","menuName":"职称类别级别","parentMenucode":"dictionary","sequence":25,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dictionaryAdministritave.html","id":20,"menuClass":"../../../images/JFC/icon/icon14.png","menuCode":"dictionaryAdministritave","menuName":"行政职称","parentMenucode":"dictionary","sequence":27,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dictionaryNature.html","id":21,"menuClass":"../../../images/JFC/icon/icon15.png","menuCode":"dictionaryNature","menuName":"科室性质","parentMenucode":"dictionary","sequence":26,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dictionarySpecialField.html","id":22,"menuClass":"../../../images/JFC/icon/icon16.png","menuCode":"dictionarySpecialField","menuName":"专业领域","parentMenucode":"dictionary","sequence":28,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dictionaryLiveness.html","id":24,"menuClass":"../../../images/JFC/icon/icon18.png","menuCode":"dictionaryLiveness","menuName":"用户活跃度","parentMenucode":"dictionary","sequence":31,"status":false,"subAuthorityList":[]}]},{"dataUrl":"#","id":61,"menuClass":"/images/JFC/icon/icon10.png","menuCode":"hospital","menuName":"单位管理","parentMenucode":"0","sequence":30,"status":false,"subAuthorityList":[{"dataUrl":"../../../html/jfc/kangpai/membershipHospital.html","id":62,"menuClass":"../../../images/JFC/icon/icon12.png","menuCode":"hospitalSearch","menuName":"查询","parentMenucode":"hospital","sequence":31,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/dataHospital.html","id":63,"menuClass":"../../../images/JFC/icon/icon16.png","menuCode":"hospitalAdd","menuName":"添加","parentMenucode":"hospital","sequence":32,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/match.html","id":64,"menuClass":"../../../images/JFC/icon/icon08.png","menuCode":"hospitalmatching","menuName":"匹配","parentMenucode":"hospital","sequence":33,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/operationCenterHospital.html","id":65,"menuClass":"../../../images/JFC/icon/icon05.png","menuCode":"hospitalguanli","menuName":"管理","parentMenucode":"hospital","sequence":35,"status":false,"subAuthorityList":[]}]},{"dataUrl":"#","id":25,"menuClass":"../../../jfcpanel/images/JFC/icon/icon19.png","menuCode":"helpMe","menuName":"帮助","parentMenucode":"0","sequence":31,"status":false,"subAuthorityList":[{"dataUrl":"../../../html/jfc/kangpai/help.html","id":26,"menuClass":"../../../images/JFC/icon/icon05.png","menuCode":"help","menuName":"下载页面","parentMenucode":"helpMe","sequence":32,"status":false,"subAuthorityList":[]},{"dataUrl":"../../../html/jfc/kangpai/test.html","id":27,"menuClass":"../../../images/JFC/icon/icon06.png","menuCode":"test","menuName":"测试","parentMenucode":"helpMe","sequence":33,"status":false,"subAuthorityList":[]}]},null]}]')[0].allMenuList);

        $('.user-name').text(JSON.parse(sessionStorage.getItem('sysUser')).userName);
        $('.role').text("您好，"+JSON.parse(sessionStorage.getItem('sysUser')).roleValue);
        function listMenu(list){
            let ul = $('#side_menu'),
                len = list.length,
                i;
            for (i = 0; i < len; i++){

                if (list[i]){

                    if (list[i].menuName === '系统管理' || list[i].menuName === '帮助'){//单独处理设置菜单
                        if (list[i].subAuthorityList.length){
                            let sub_item = $('#menu2'),
                                sub = list[i].subAuthorityList,
                                l = sub.length,
                                j;
                            for (j = 0; j < l; j++){
                                if (sub[j]){
                                    if (sub[j].menuName==='首页'){
                                        continue
                                    }
                                    sub_item.append($(`<li><a href="`+ sub[j].dataUrl +`"><span class="message">`+ sub[j].menuName +`</span></a></li>`))
                                }
                            }
                            //ul.append(sub_item)
                        }
                        continue;
                    } else if (list[i].menuName === '数据字典'){
                        continue
                    }

                    let item = $(`<li>
                    <a`+ (list[i].dataUrl != '#' ? (' href="' + list[i].dataUrl + '"') : '') +`><i class="`+ list[i].menuClass +`"></i>`+ list[i].menuName +`<span class="fa fa-chevron-down"></span></a>
                </li>`);
                    if (list[i].subAuthorityList.length){
                        let sub_item = $(`<ul class="nav child_menu"></ul>`),
                            sub = list[i].subAuthorityList,
                            l = sub.length,
                            j;
                        for (j = 0; j < l; j++){
                            if (sub[j]){
                                sub_item.append($(`<li>
                                <a href="`+ sub[j].dataUrl +`">`+ sub[j].menuName +`</a>
                            </li>`))
                            }
                        }
                        item.append(sub_item)
                    }
                    ul.append(item)
                }
            }
            ul.append($(`<li><a href="//www.kolpanel.net/jfcpanel/html/login.html?target=kolpanel"><i class="fa fa-bar-chart-o"></i> KOLPanel </a>
                  </li>
                  <li>
                    <a href="//www.kolpanel.net/jfcpanel/html/login.html?target=swing"><i class="fa fa-laptop"></i>首问 Swing </a>
                  </li>`));
        }
    } catch (e) {

    }

    $('.profile_pic img').on('click', function(){
        window.open('./html/kol/edit-portrait.html')
    });
    let user_message = JSON.parse(sessionStorage.getItem('sysUser')),
        img_src = user_message.url,
        email = user_message.email,
        menu_node = $('#menu1'),
        link_export = `<li>
                                    <a>
                                        <span class="image"><img src="`+ img_src +`" alt="Profile Image" /></span>
                                        <span>
                                            <span>导出审核</span>
                                        </span>
                                    </a>
                                </li>`,
        link_update = `<li>
                                    <a>
                                        <span class="image"><img src="`+ img_src +`" alt="Profile Image" /></span>
                                        <span>
                                            <span>修改/删除审核</span>
                                        </span>
                                    </a>
                                </li>`;
    menu_node.html(link_export);

    if (email === 'Zero.Liu@jfcmc.com'){
        menu_node.append(link_update)
    }

    $('.profile_pic img').attr('src', img_src);
    $('.user-profile img').attr('src', img_src);
});