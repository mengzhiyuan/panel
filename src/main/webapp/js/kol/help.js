/**
 * Created by wangxiangyang on 2017/7/6.
 */
var curWwwPath=window.document.location.href;
 var pathName=window.document.location.pathname;
 var pos=curWwwPath.indexOf(pathName);
 var localhostPath=curWwwPath.substring(0,pos);
 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
 var realPath=localhostPath+projectName;
$(function(){
	
	$(".infobox-green").click(function(){
		document.location.href =""+realPath+"/download/doctorTemp.xlsx";//""+realPath+"/doctorEdit";
	});
	
	$(".infobox-blue").click(function(){
		document.location.href =""+realPath+"/download/hospitalTemp.xlsx";//""+realPath+"/doctorEdit";
	});
	$(".infobox-grey").click(function(){
		document.location.href =""+realPath+"/download/regionTemp.txt";//""+realPath+"/doctorEdit";
	});
	$(".infobox-purple").click(function(){
		document.location.href =""+realPath+"/download/InstructionsTemp.docx";//""+realPath+"/doctorEdit";
	});
	$(".infobox-red").click(function(){
		//document.location.href =""+realPath+"/download/video.mp4";//""+realPath+"/doctorEdit";
		window.open(""+realPath+"/download/video.mp4");
	});
	$(".infobox-orange").click(function(){
		document.location.href =""+realPath+"/download/dictionaryTemp.xlsx";//""+realPath+"/doctorEdit";
	});

});