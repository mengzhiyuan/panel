/**
 * Created by wangxiangyang on 2017/6/28.
 */
(function($){
    var ms = {
        init:function(obj,args){
            return (function(){
                ms.fillHtml(obj,args);
                ms.bindEvent(obj,args);
            })();
        },
        //填充html
        fillHtml:function(obj,args){
            return (function(){
                obj.empty();
                //上一页
                if(args.current > 1){
                    obj.append('<li><a href="javascript:;" class="prevPage">上一页</a></li>');
                }else{
                    obj.remove('.prevPage');
                    obj.append('<li><span class="disabled">上一页</span></li>');
                }
                //中间页码
                if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                    obj.append('<li><a href="javascript:;" class="tcdNumber">'+1+'</a></li>');
                }
                if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                    obj.append('<li><span>...</span></li>');
                }
                var start = args.current -2,end = (args.current/1)+2;
                if((start > 1 && args.current < 4)||args.current == 1){
                    end++;
                }
                if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                    start--;
                }
                for (;start <= end; start++) {
                    if(start <= args.pageCount && start >= 1){
                        if(start != args.current){
                            obj.append('<li><a href="javascript:;" class="tcdNumber">'+ start +'</a></li>');
                        }else{
                            obj.append('<li><span class="current">'+ start +'</span></li>');
                        }
                    }
                }
                if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                    obj.append('<li><span>...</span></li>');
                }
                if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                    obj.append('<li><a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a></li>');
                }
                //下一页
                if(args.current < args.pageCount){
                    obj.append('<li><a href="javascript:;" class="nextPage">下一页</a></li>');
                }else{
                    obj.remove('.nextPage');
                    obj.append('<li><span class="disabled">下一页</span></li>');
                }

                $("#page").find(".current").parent().addClass("active")
            })();
        },
        //绑定事件
        bindEvent:function(obj,args){
            return (function(){
                obj.find("a.tcdNumber").on("click",function(){
                    current = parseInt($(this).text());
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });
                //上一页
                obj.find("a.prevPage").on("click",function(){
                    current = parseInt(obj.find("span.current").text()) - 1;
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });
                //下一页
                obj.find("a.nextPage").on("click",function(){
                    current = parseInt(obj.find("span.current").text()) + 1;
                    if(typeof(args.backFn)=="function"){
                        args.backFn(current);
                    }
                });
            })();
        }
    };
    $.fn.createPage = function(options){
        var args = $.extend({
            pageCount : 10,
            current : 1,
            backFn : function(){}
        },options);
        ms.init(this,args);
        current = null;
    }
})(jQuery);

