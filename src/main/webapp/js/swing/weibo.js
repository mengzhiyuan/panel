 $(function(){
        	var path = window.document.location.href;
        	var aa = {};
            aa.path =path;
            $.ajax({
                url:"http://10.0.0.12:8080/jfcpanel/party/weiboLogin",
                type:"post",
                contentType : "application/JSON;charset=utf-8",
                data:JSON.stringify(aa),
                dataType:"json",
                success:function(result){
                }
            });
        });