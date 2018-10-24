/**
 * Created by wangxiangyang on 2018/6/22.
 */
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPath+projectName;
$(function(){

    let active_gate = 'sky-oa',
        target = document.location.href.match(/\?target\=(\S+)$/);
    if (target) {
        active_gate = target[1]
    }
    /*-----页面样式-----*/
    $('#gates').on('click', 'a', switchTag);
    $('.switch').on('click', switchPath);
    $('#register_email').on('focus', highlight)
        .on('blur', highlight);
    $('#forgot_email').on('focus', highlight)
        .on('blur', highlight);
    /*-----oa,kolpanel,swing登录切换-----*/
    function switchTag(event){
        if (!$(this).attr('target')){
            event.stopPropagation();
            event.preventDefault();
            if (!$(this).hasClass('active')){
                let target = $(this).attr('href');
                $('#gates').find('.' + target).addClass('active')
                    .siblings().removeClass('active');
                $('#titles').find('.' + target).addClass('active')
                    .siblings().removeClass('active');
                $('#main').find('#login').css('display', 'block')
                    .siblings().css('display', 'none');
                active_gate = target
            }
        }
    }
    /*-----登录,注册,找回密码切换-----*/
    function switchPath(event){
        let target = $(this).attr('switch-target');
        $('#main').find('#' + target).css('display', 'block')
            .siblings().css('display', 'none');
    }
    /*-----邮箱这块的label高亮-----*/
    function highlight(event){
        if (event.type === 'focus'){
            $(this).siblings('label').css('backgroundColor', 'rgba(250,255,189,0.5)')
        } else {
            $(this).siblings('label').css('backgroundColor', 'rgba(250,255,189,0.3)')
        }
    }

    //根据来源切换当前状态
    $('#gates').find('.' + active_gate).find('a').click();

    /*-----登录动作-----*/
    $('#submit_login').on('click', function(){
        let email = $('#username').val(),
            password = $('#password').val(),
            bool_store = $('#store').prop('checked');
        if (email.match(/^\S+@\S+\.\S+$/)){
            if (password.length > 0){
                let to_send = {
                    username : email,
                    password : password
                };
                $.ajax({
                    type : "post",
                    url : realPath + "/system/login",
                    dataType : 'json',
                    async : true,
                    contentType : "application/JSON;charset=utf-8",
                    data : JSON.stringify(to_send),
                    success : function(data) {
                        if (data[0]['result'] == 1) {
                            show_err_msg('邮箱或者密码错误！');
                        }
                        if (data[0]['result'] == 2) {
                            show_err_msg('邮箱未注册或者被禁用');
                        }
                        if (data[0]['result'] == 3) {
                            show_err_msg('验证码错误');
                        }
                        if (data[0]['result'] == "success") {
                            if (bool_store){
                                $.cookie("userName", email, { expires: 7 });
                                $.cookie("passWord", password, { expires: 7 });
                            }
                            sessionStorage.setItem('sysUser', JSON
                                .stringify(data[0]['sysUser']));
                            if(active_gate==='kolpanel'){
                                show_msg('登录成功咯！  正在为您跳转...', realPath
                                    + "/main_kangpai");
                            }else if (active_gate==='sky-oa'){
                                show_msg('登录成功咯！  正在为您跳转...', realPath
                                    + "/html/jfc/main/center.html");
                            } else {
                                show_msg('登录成功咯！  正在为您跳转...', realPath
                                    + "/html/kolpanel/creating.html");
                            }

                        }
                    }
                });
                switch (active_gate){

                    case 'sky-oa':

                        break;
                    case 'kolpanel':

                        break;
                    case 'swing':

                        break;
                }
            } else {
                show_err_msg('请输入密码')
            }
        } else {
            show_err_msg('请输入格式正确的邮箱')
        }
    });

    /*-----自动填充账号密码-----*/
    $("#username").val($.cookie("userName"));
    $("#password").val($.cookie("passWord"));

    /*-----注册动作-----*/
    $('#submit_register').on('click', function(){
        let email = $('#register_email').val() + '@jfcmc.com',
            telephone = $('#register_telephone').val(),
            username = $('#register_username').val(),
            password = $('#register_password').val();
        if (email.match(/^\S+@\S+\.\S+$/)){
            if (telephone.length > 0){
                if (username.length > 0){
                    if (password.length > 0){
                        let to_send = {
                            email: email,
                            phone: telephone,
                            userName: username,
                            password: password
                        };
                        $.ajax({
                            url : realPath + "/system/register",
                            type : "post",
                            dataType : "json",
                            async : true,
                            crossDomain : true,
                            data : JSON.stringify(to_send),
                            contentType : "application/JSON;charset=utf-8",
                            success : function(data) {
                                if (data[0]["userDeps"] >= 1) {
                                    show_msg('注册成功！');
                                    //$('#switch_register').click()
                                    window.location.href = './login.html';
                                } else {
                                    show_err_msg('注册失败！');
                                }
                            },
                            error: function(e){
                                console.log(e);
                                show_err_msg('注册失败！');
                            }
                        });
                    } else {
                        show_err_msg('请输入密码')
                    }
                } else {
                    show_err_msg('请输入用户名')
                }
            } else {
                show_err_msg('请输入手机号码')
            }
        } else {
            show_err_msg('请输入格式正确的邮箱')
        }
    });

    /*-----重置密码动作-----*/
    /*-----获取验证码-----*/
    $('#verification').on('click', function(){
        let email = $('#forgot_email').val() + '@jfcmc.com',
            to_send = {
            email: email
        },
            button = $('#verification');
        if (email.match(/^\S+@\S+\.\S+$/)){
            $.ajax({
                url: realPath + '/system/verification',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                async: true,
                data: JSON.stringify(to_send),
                success: function(d){
                    if (d[0].result > 0){
                        let remain = 60;
                        button.text(remain);
                        let clock = setInterval(function(){
                            remain--;
                            if (remain <= 0){
                                clearInterval(clock);
                                button.text('获取验证码')
                            } else {
                                button.text(remain + 's')
                            }
                        },1000);
                        show_msg('获取成功');
                    } else {
                        show_err_msg('获取验证码失败');
                    }
                },
                error: function(e){
                    console.log(e);
                    show_err_msg('获取验证码失败')
                }
            })
        } else {
            show_err_msg('请输入格式正确的邮箱地址')
        }
    });
    /*-----修改密码-----*/
    $('#submit_forgot').on('click', function(){
        let email = $('#forgot_email').val(),
            verification = $('#forgot_verification').val(),
            password = $('#forgot_password').val(),
            password_repeat = $('#forgot_password_repeat').val();
        if (email.match(/^\S+@\S+\.\S+$/)){
            if (verification.length > 0){
                if (password.length > 0){
                    if (password_repeat === password){
                        let to_send = {
                            email: email,
                            ver: verification,
                            password: password
                        };
                        $.ajax({
                            url : realPath + "/system/updatePassWord",
                            type : "post",
                            dataType : "json",
                            async : true,
                            crossDomain : true,
                            data : JSON.stringify(to_send),
                            contentType : "application/JSON;charset=utf-8",
                            success : function(d) {
                                if (d[0].result > 0){
                                    show_msg('修改成功');
                                    $('#switch_forgot').click()
                                } else {
                                    show_err_msg('修改失败');
                                }
                            },
                            error: function(e){
                                console.log(e);
                                show_err_msg('修改失败！');
                            }
                        });
                    } else {
                        show_err_msg('两次密码不一致')
                    }
                } else {
                    show_err_msg('请输入密码')
                }
            } else {
                show_err_msg('请输入验证码')
            }
        } else {
            show_err_msg('请输入格式正确的邮箱')
        }
    })
});