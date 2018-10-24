/**
 * Created by wangxiangyang on 2017/9/27.
 */



$(function(){

    //动画样式
    var ani = {

        $types: $('#types'),

        $type: $('#types').find('.type'),

        zoomIn: function(e){

            var t = $(this);

            //if (!t.is(':animated')){
            t.siblings().animate({width: '290px',height: '300px',top: '0'},100,function(){
                t.siblings().css('box-shadow','0 0 0 1px #5bc0ff').removeClass('active')
            });
            t.animate({width: '320px',height: '320px',top: '-10px'},100,function(){
                t.css('box-shadow','0 0 10px 1px #5bc0ff').addClass('active')
            });
            //}
        },

        zoomOut: function(e){

            var t = $(this);

            t.children().animate({width: '300px',height: '300px',top: '0'},100,function(){
                t.children().css('box-shadow','0 0 0 1px #5bc0ff')
            })
        },

        bind: function(){

            this.$type.on('mouseenter', this.zoomIn);

            this.$types.on('mouseleave', this.zoomOut)
        }
    };

    //链接对象
    var links = {

        $questionnaire: $('#questionnaire'),

        $panel: $('#panel'),

        $custom: $('#custom'),

        jump: function(e){

            switch (this.id){

                case 'questionnaire':
                    document.location.href = './types.html';
                    break;
                case 'panel':
                    alert('Wait, please.');
                    break;
                case 'custom':
                    alert('Wait, please.');
                    break
            }

        },

        bind: function(){

            this.$questionnaire.on('click', this.jump);
            this.$panel.on('click', this.jump);
            this.$custom.on('click', this.jump)
        }
    };

    ani.bind();
    links.bind();
});
