 var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
 $(function(){
	 /*window.onbeforeunload=function(){
		 sessionStorage.removeItem("link"); 
		}*/
	 var link = sessionStorage.getItem("link"); 
	 $("#input-32").val(link);
	 $("#copyUrl").click(function(){
		 var ele = document.getElementById("input-32");
	        ele.select();
	        document.execCommand("Copy");
	 });
	 /*创建二维码*/
		var qrcode = new QRCode('download', {
			text : $("#input-32").val(),
			width : 200,
			height : 200,
			colorDark : '#000000',
			colorLight : '#ffffff',
			correctLevel : QRCode.CorrectLevel.H,
			src : "../img/icon.png"
		});
		$('#saveQrCode').click(function() {
			var canvas = $('#download').find("canvas").get(0);
			try {//解决IE转base64时缓存不足，canvas转blob下载
				var blob = canvas.msToBlob();
				navigator.msSaveBlob(blob, 'qrcode.jpg');
			} catch (e) {//如果为其他浏览器，使用base64转码下载
				var url = canvas.toDataURL('image/jpeg');
				$("#download").attr('href', url).get(0).click();
			}
			return false;
		});
		/*分享qq空间*/ 
		var url = $("#input-32").val();  
	    var desc_ = "北京联合市场有限责任公司";   
	    $("#qqZone").click(function(){
	    	qqZone();
	    });
		 function qqZone(){  
	         var _url = url;     
	         var _showcount = 0;  
	         var _desc = desc_;  
	         var _summary = "";  
	         var _title = "北京联合市场有限责任公司";  
	         var _site = "";  
	         var _width = "600px";  
	         var _height = "800px";  
	         var _summary = "";  
	         var _pic = "";  
	         var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';  
	         _shareUrl += 'url=' + encodeURIComponent(_url||document.location);   //参数url设置分享的内容链接|默认当前页location  
	         _shareUrl += '&showcount=' + _showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示  
	         _shareUrl += '&desc=' + encodeURIComponent(_desc||'分享的描述');    //参数desc设置分享的描述，可选参数  
	         //_shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数  
	         _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享标题，可选参数  
	         //_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数  
	         _shareUrl += '&pics=' + encodeURIComponent(_pic||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数  
	        window.open(_shareUrl,'width='+_width+',height='+_height+',top='+(screen.height-_height)/2+',left='+(screen.width-_width)/2+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');   
	    }  
		 /*分享qq朋友*/ 
		 $("#qqFriend").click(function(){
			 qqFriend();
		 });
		 function qqFriend() {  
	            var p = {  
	                url :$("#input-32").val(), /*获取URL，可加上来自分享到QQ标识，方便统计*/  
	                desc:'',  
	                //title : '新玩法，再不来你就out了！', /*分享标题(可选)*/  
	                title:desc_,  
	                summary : '', /*分享摘要(可选)*/  
	                pics : '', /*分享图片(可选)*/  
	                flash : '', /*视频地址(可选)*/  
	                site :url, /*分享来源(可选) 如：QQ分享*/  
	                style : '201',  
	                width : 32,  
	                height : 32  
	            };  
	            var s = [];  
	            for ( var i in p) {  
	                s.push(i + '=' + encodeURIComponent(p[i] || ''));  
	            }  
	            var url = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');  
	            window.open(url); 
	        } 
		 $("#shareTSina").click(function(){
			 shareTSina();
		 });
		 var top = window.screen.height / 2 - 250;    
		    var left = window.screen.width / 2 - 300;    
		    var height = window.screen.height;  
		    var width =  window.screen.width;   
		    /*title是标题，rLink链接，summary内容，site分享来源，pic分享图片路径,分享到新浪微博*/    
		    function shareTSina() {    
		        var title = desc_;  
		        var   rLink = url;  
		        var backUrl = url;  
		        var site = desc_;  
		        var pic = "";  
		        window.open("http://service.weibo.com/share/share.php?pic=" +encodeURIComponent(pic) +"&title=" +     
		        encodeURIComponent(title.replace(/ /g, " ").replace(/<br \/>/g, " "))+ "&url=" + encodeURIComponent(rLink),    
		        "分享至新浪微博",    
		        "height=500,width=600,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");    
		    }     
	 
		    
		    
			if (!String.prototype.trim) {
				(function() {
					// Make sure we trim BOM and NBSP
					var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
					String.prototype.trim = function() {
						return this.replace(rtrim, '');
					};
				})();
			}

			[].slice.call(document.querySelectorAll('input.input__field'))
					.forEach(function(inputEl) {
						// in case the input is already filled..
						if (inputEl.value.trim() !== '') {
							classie.add(inputEl.parentNode, 'input--filled');
						}

						// events:
						inputEl.addEventListener('focus', onInputFocus);
						inputEl.addEventListener('blur', onInputBlur);
					});

			function onInputFocus(ev) {
				classie.add(ev.target.parentNode, 'input--filled');
			}

			function onInputBlur(ev) {
				if (ev.target.value.trim() === '') {
					classie.remove(ev.target.parentNode, 'input--filled');
				}
			}
			
			$("#shareEmail").click(function(){
					   location.href="mailto:?cc=&subject=北京市场联合调查有限公司问卷&body=<a>"+link;
			 });
			
	 
	 
 });