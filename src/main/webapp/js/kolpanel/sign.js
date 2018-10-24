/**
 * Created by wangxiangyang on 2017/9/28.
 */
$(function(){
    //登录对象
    var sign = {

        $sign_out: $('.signout'),

        $sign_in: $('.signin'),

        signIn: function(e){

            $.ajax({
                url: '',
                type: 'post',
                data: {},
                contentType: 'application/json;charset=utf-8',
                dataType: 'text/json',
                success: function(d){
                    sign.$sign_in.find('.name').text(d[0].name);
                    sign.$sign_out.css('display','none');
                    sign.$sign_in.css('display','block')
                }
            })
        },

        signOut: function(e){

            $.ajax({
                url: '',
                type: 'post',
                data: {},
                contentType: 'application/json;charset=utf-8',
                dataType: 'text/json',
                success: function(d){
                    sign.$sign_in.find('.name').text('');
                    sign.$sign_in.css('display','none');
                    sign.$sign_out.css('display','block')
                }
            })
        },

        bind: function(){

            this.$sign_in.on('click',this.signOut);
            this.$sign_out.on('click',this.signIn)
        }
    };


    sign.bind()
});