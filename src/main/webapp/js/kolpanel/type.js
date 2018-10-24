/**
 * Created by wangxiangyang on 2017/9/27.
 */
$(function(){

    //模板/空白切换按钮
    var toggle = {

        $wrapper: $('#wrapper'),

        $emptyButton: $('#blank'),

        $filledButton: $('#filled'),

        $empty: $('#types .blanks'),

        $filled: $('#types .filled'),

        toggle: function(e){

            if (this.id === 'blank'){

                if (!toggle.$empty.hasClass('active')){

                    toggle.$filled.removeClass('active');

                    toggle.$empty.addClass('active');

                    if (!toggle.$wrapper.is('animated')){

                        toggle.$wrapper.animate({left: '0'},200)
                    }

                    toggle.focusLeft()
                }
            } else if (this.id === 'filled'){

                if (!toggle.$filled.hasClass('active')){

                    toggle.$empty.removeClass('active');

                    toggle.$filled.addClass('active');

                    if (!toggle.$wrapper.is('animated')){

                        toggle.$wrapper.animate({left: '-1200px'},200)
                    }

                    toggle.focusRight()
                }
            }
        },

        focusLeft: function(){

            $('#blank').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.5))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.5))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.5))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.5))');

            $('.leftside').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))');

            $('#filled').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0.3),rgba(91,192,255,0.1))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0.3),rgba(91,192,255,0.1))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0.3),rgba(91,192,255,0.1))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0.3),rgba(91,192,255,0.1))');

            $('.rightside').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))');
        },
        focusRight: function(){

            $('#blank').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.3))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.3))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.3))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0.3))');

            $('.leftside').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0),rgba(91,192,255,0.1))');

            $('#filled').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0.5),rgba(91,192,255,0.1))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0.5),rgba(91,192,255,0.1))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0.5),rgba(91,192,255,0.1))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0.5),rgba(91,192,255,0.1))');

            $('.rightside').css('background', '-webkit-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))')
                .css('background', '-o-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))')
                .css('background', '-moz-linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))')
                .css('background', 'linear-gradient(left,rgba(91,192,255,0.1),rgba(91,192,255,0))');
        },

        bind: function(){

            this.$emptyButton.on('click', this.toggle);

            this.$filledButton.on('click', this.toggle)
        }
    };

    //链接跳转对象
    var links = {

        $initial: $('#initial'),

        $research: $('#research'),

        $serve: $('#serve'),

        $staff: $('#staff'),

        $form: $('#form'),

        bind: function(){

            this.$initial.add(this.$research).add(this.$serve).add(this.$staff).add(this.$form).on('click', this.jump)
        },
        jump: function(e){

            if (this.id === 'initial'){

                sessionStorage.setItem('type', '');
                document.location.href = './design.html';
            } else {

                sessionStorage.setItem('type', this.id);
                document.location.href = './templates.html'
            }
        }
    };



    toggle.bind();
    links.bind()
});