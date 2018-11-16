/*补零*/
function toDouble(n)
{
	return n>=10 ? n+'' : '0'+n;
}
// 随机数
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}
//角度转弧度
function d2a(d)
{
	// tan阿尔法 = y/x
	return d*180/Math.PI;
}
//弧度转角度
function a2d(d)
{
	return d*Math.PI/180;
}

// 阿拉伯数组1~10转换一~十
function fnNumToChart(num){
    var str = num+'';
    var res = '';
    switch (str)
    {
        case '1':
            res = '一';
            break;
        case '2':
            res = '二';
            break;
        case '3':
            res = '三';
            break;
        case '4':
            res = '四';
            break;
        case '5':
            res = '五';
            break;
        case '6':
            res = '六';
            break;
        case '7':
            res = '七';
            break;
        case '8':
            res = '八';
            break;
        case '9':
            res = '九';
            break;
        case '10':
            res = '十';
            break;
        default:
            break;
    }
    return res;
}
// url地址操作
var URL={
	fnGetUrlPara:function(name){ //获得url参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	},
	fnDelUrlPara:function(name){//删除url某个参数
		var loca = window.location;
		var baseUrl = loca.origin+loca.pathname+"?";
		var query = loca.search.substr(1);
		if(query.indexOf(name) > -1){
			var obj = {};
			var arr = query.split('&');
			for(var i=0;i<arr.length;i++){
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			}
			delete obj[name];
			var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
			return url;
		}
	},
	fnAddUrlPara:function (url, name, value) {//添加url参数
	    var currentUrl = url.split('#')[0];
	    if (/\?/g.test(currentUrl)) {
	        if (/name=[-\w]{4,25}/g.test(currentUrl)) {
	            currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
	        } else {
	            currentUrl += "&" + name + "=" + value;
	        }
	    } else {
	        currentUrl += "?" + name + "=" + value;
	    }
	    if (url.split('#')[1]) {
	        url = currentUrl + '#' + window.location.href.split('#')[1];
	    } else {
	        url = currentUrl;
	    }
		return url;
	},
	//修改url参数
	fnChangeUrlArg:function (url, arg, val){
	    var pattern = arg+'=([^&]*)';
	    var replaceText = arg+'='+val;
	    return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
	}
};


/*滚轮事件*/
function AddScroll(parentConent,content,bar)
{
	var top = 0;
	var oUlH = parseInt(content.css('height'));
	var oDivH = parseInt(parentConent.css('height'))
	var nMaxTop=oUlH-oDivH;
	var oBarH = oDivH*oDivH/oUlH; //滚动条高度
	if(oBarH >= oDivH) oBarH=0;
	bar.css('height',oBarH);
	var oMaxBartop = oDivH-oBarH;
 	if(nMaxTop<0)
	{
		return;
	}
	var _move=false;//移动标记
	var _x,_y;//鼠标离控件左上角的相对位置
    bar.click(function(){
        //alert("click");//点击（松开后触发）
        }).mousedown(function(e){
        _move=true;
        _y=e.pageY-parseInt(bar.css("top"));
    });
    $(document).mousemove(function(e){
        if(_move){
            var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
            var y=e.pageY-_y;
            if(y<0)
            {
            	y=0;
	        }
            if(y>oMaxBartop)
            {
            	y=oMaxBartop;
            }
            bar.css({top:y });//控件新位置
           	top =- y/oMaxBartop*nMaxTop;
            content.css('top',top+'px');
        }
        //event.preventDefault();
    }).mouseup(function(){
    	_move=false;
	});
	parentConent.myScroll(function(down,event){
		if (down)
		{
			// 往下滚
			top-=20;
			event.cancelBubble=true;
			event.stopPropagation();
			event.preventDefault();
		}
		else
		{
			top+=20;
			event.cancelBubble=true;
			event.stopPropagation();
			event.preventDefault();
		}
		if(nMaxTop<0)
		{
			return;
		}
		if (top > 0)
		{
			top=0;
			event.cancelBubble=false;
			event.stopPropagation();
			event.preventDefault();
		}
		else if (top < -nMaxTop)
		{
			top=-nMaxTop;
			event.cancelBubble=false;
			event.stopPropagation();
			event.preventDefault();
		}
		content.css('top',top+'px');
	 	var bartop = top/nMaxTop*oMaxBartop;
	 	bar.css('top',-bartop);
	});
}

function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() + (-10 * 24 * 60 * 60 * 1000));
	var cval = getCookie(name);
	document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
// 设置7天自动消失
function setCookie(name,value)
{
	var Days = 7;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

