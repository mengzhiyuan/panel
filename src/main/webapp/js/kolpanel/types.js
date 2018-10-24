/**
 * Created by wangxiangyang on 2017/9/29.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
$(function(){
     if(sessionStorage.getItem("surveyName")==null){
    	 location.href = realPath + "/wjLogin";
     }
    //链接绑定
    $('#initial').on('click', jump);

    function jump(e){

        document.location.href = './design.html'
    }
    //文本导入弹窗
    var frameImport = {

        $button: $('#import'),

        frame: `<div id="frame_import">
                    <div class="modals">
                        <div class="topbar">
                            <span class="pull-left">将问卷复制到左框</span>
                            <span class="close_button pull-right"></span>
                        </div>
                        <div class="main">
                            <div class="textbox" contenteditable="true">

                            </div>
                            <div class="preview">
                                <div class="label">预 览</div>
                            </div>
                            <div class="button">
                                <button class="format btn btn-info btn-sm">生成问卷</button>
                            </div>
                        </div>
                    </div>
                </div>`,

        displayFrame: function(e){

            $('body').append(frameImport.frame);

            var $frame = $('#frame_import');

            $frame.find('.close_button').on('click', function(e){

                $frame.find('.close_button').off('click');

                $frame.remove()
            })
        },

        bind: function(){

            this.$button.on('click', this.displayFrame)
        }
    };

    //选择模板弹窗
    var frameTemplate = {

        $button: $('.filled .button button'),

        frame: `<div id="frame_template">
                    <div class="modals">
                        <div class="topbar">
                            <span class="pull-left">选择问卷模板</span>
                            <span class="close_button pull-right"></span>
                        </div>
                        <div class="templates">
                            <div class="wrap public">
                                <div class="label personal">个人模板</div>
                                <div class="template">
                                    <div class="title">
                                        <span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
                                    </div>
                                    <div class="describe">
                                        <div class="number">
                                            <span>总题数 :</span>
                                            <span>42</span>
                                        </div>
                                        <div class="count">
                                            <span>总份数 :</span>
                                            <span>200</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="label public">公共模板</div>
                                <div class="template public"><span>1234</span></div>
                                <div class="template public"><span>2345</span></div>
                                <div class="template public"><span>3456</span></div>
                                <div class="template public"><span>4567</span></div>
                                <div class="template public"><span>5678</span></div>
                                <div class="template public"><span>6789</span></div>
                                <div class="template public"><span>7890</span></div>
                                <div class="template public"><span>0123</span></div>
                            </div>
                            <div class="wrap personal">
                                <div class="search">
                                    <div contenteditable="true"></div>
                                    <span></span>
                                </div>
                                <div class="template">
                                    <div class="title">
                                        <span></span>
                                    </div>
                                    <div class="describe">
                                        <span></span>
                                    </div>
                                </div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                                <div class="template"></div>
                            </div>
                        </div>
                    </div>
                </div>`,

        displayFrame: function(e){

            $('body').append(frameTemplate.frame);

            var $frame = $('#frame_template');

            frameTemplate.displayTemplates();

            $frame.find('.close_button').on('click', function(e){

                $frame.find('.close_button').off('click');

                $frame.remove()
            })
        },

        displayTemplates: function(){

            $.ajax({
                url: '',
                type: 'post',
                dataType: 'text/json',
                async: true,
                success: function(d){

                    var list = d[0]['list'].splice(0,4),
                        str = ``,
                        $label = $('#frame_template .templates .public .label');

                    for( var i = 0; i < 4; i++){

                        str += `<div class="template" index="` + list[i]['id'] + `">
                                    <div class="title">
                                        <span>` + list[i]['title'] + `</span>
                                    </div>
                                    <div class="describe">
                                        <div class="number">
                                            <span>总题数 :</span>
                                            <span>` + list[i]['number'] + `</span>
                                        </div>
                                        <div class="count">
                                            <span>总份数 :</span>
                                            <span>` + list[i]['count'] + `</span>
                                        </div>
                                    </div>
                                </div>`
                    }
                    str.insertAfter($label);

                    $('#frame_template .templates .public template').on('click', function(e){

                        var index = this.attr('index');

                        $.ajax({

                            url: '',
                            type: 'post',
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'text/json',
                            data: {
                                index: index
                            },
                            async: true,
                            success: function(d){
                                frameTemplate.jump(d)
                            }
                        })
                    })
                }
            })
        },

        jump: function(d){

            var str = frameImport.deal(d);

            $('#frame_template .templates').empty().html(str)

        },

        deal: function(e){},

        bind: function(){
            this.$button.on('click', this.displayFrame)
        }
    };


    frameImport.bind();
    frameTemplate.bind()
});