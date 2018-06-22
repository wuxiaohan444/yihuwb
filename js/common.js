// 判断是安卓还是ios
// let u = navigator.userAgent;
// let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// alert('是否是Android：' + isAndroid);
// alert('是否是iOS：' + isiOS);
//
// let link = document.createElement("link");
// link.setAttribute("rel", "stylesheet");
// link.setAttribute("type", "text/css");

// 验证信息
let mate = function (rule, content, classes, ele) {
    if (content.trim() === '') {
        ele.text(classes + '不能为空');
        ele.css("color", 'red');
    }
    else if (!(rule.test(content))) {
        ele.text(classes + "错误");
        ele.css("color", 'red');
    }
    else {
        ele.text(classes + "正确");
        ele.css("color", 'green');
    }
};


let ip = 'http://192.168.2.122:8080/customerapi';

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = decodeURI(window.location.search).substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//获取code
function getLoginUserCode(){
	if(document.cookie === "" || document.cookie ===undefined||document.cookie ==="code=undefined"){
        return "";
    }else{
        return document.cookie.split("=")[1];
    }
}


