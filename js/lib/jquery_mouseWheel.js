/*滚轮插件*/

$.fn.myScroll=function (fn){

	this.each(function (){
		var oDiv=this;

		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
		{
			oDiv.addEventListener('DOMMouseScroll', _wheel, false);
		}
		else
		{
			oDiv.onmousewheel=_wheel;
		}

		function _wheel(ev)
		{

			var down=false;
			var oEvent=ev || event;
			if (oEvent.wheelDelta)
			{
				down=oEvent.wheelDelta>0 ? false : true;
			}
			else
			{
				down=oEvent.detail>0 ? true : false;
			}
			//ev.cancelBubble=true;
			// call 第一个参数永远是 this
			fn.call(this, down,ev);
		}
	});
};
