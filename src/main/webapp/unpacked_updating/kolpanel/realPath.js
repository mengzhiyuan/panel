/**
 * Created by wangxiangyang on 2017/11/29.
 */
var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);

window.realPath=localhostPath+projectName;
//window.sets = window.sets ? sets : {};
window.questions = window.questions ? questions : [];
window.vues = window.vues ? vues : [];