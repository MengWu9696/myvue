/**
 * jQuery.jSelectDate Version 0.2
 * jQuery 下拉列表选择日期插件
/*
 * *****************   Example   ***********************
 <script type="text/javascript">
 $("body").ready(function(){
 $("input.date").jSelectDate({
 css:"date",
 yearBeign: 1995,
 disabled : true
 });
 })
 </script>
 
 
 <body>
 <input type="text" id="txtName" class="date" value="2005-3-22" />
 <input type="text" id="txtDate2" class="date" value="1995-5-2" />
 </body>
 
 * ****************  End Example  **********************
 */
var jSelectDate = {

		
	/**
	 * 选项设置
	 */
    settings : {
		css: "date",
		borderCss: "date",
        disabled: false,
        yearBegin: 1960,
        yearEnd: 2008,
		isShowLabel: true
	},
	
    
    
    /**
     * 初始化对向
     * @param {Object} el 用于存放日期结果的文本框 jQuery DOM
     */
    init: function(els){
    
        els.each(function(){
        
        
            var el = $(this);
            
            /* 取得旧的日期 */
            var elValue = el.val();
            elDate = new Date(elValue.split("-").join("/"));
            
            var nYear = elDate.getFullYear();
            var nMonth = jSelectDate.returnMonth(elDate.getMonth());
            var nDay = elDate.getDate();
            
            
            /* 隐藏给出的对向 */
            el.hide();
            
            /* 先算出当前共有多少个jSelectDate */
            var currentIdx = $(".jSelectDateBorder").length + 1;
			
             /* 加入控件到文本框的位置 */
			var spanDate = document.createElement("span");
			spanDate.id = "spanDate" + currentIdx;
			spanDate.className = "jSelectDateBorder " + jSelectDate.settings.borderCss;
			spanDate.disabled = jSelectDate.settings.disabled;
			
            el.after(spanDate);
			
            /* 创建年 */
            var selYear = document.createElement("select");
            selYear.id = "selYear" + currentIdx
            selYear.className = jSelectDate.settings.css;
            selYear.disabled = jSelectDate.settings.disabled;
            
            /* 加入选项 */
            for (var i = jSelectDate.settings.yearEnd; i >= jSelectDate.settings.yearBegin; i--) {
            
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = i+"年";
                
                /* 判断是否有旧的值，如果有就选中 */
                if (!isNaN(nYear)) {
                    if (i == nYear) {
                        option.selected = true;
                    }
                }
                
                selYear.appendChild(option);
                option = null;
                
            }            
           
			$(spanDate).append(selYear);
            
			
            /* 返回当前选择的日期 */
            var getDate = function(){
                var year = $(selYear).val();
                el.val(year + "年");
            }
			
			
            /**
             * 给几个下拉列表加入更改后的事件
             */
       
            $(selYear).change(function(){
				jSelectDate.progressDaySize(this,false);
                return getDate();
            });
            
        })
        
        
    },
	
	/**
	 * 判断是否闰年
	 * @param {Object} year
	 * @author 没剑 http://regedit.cnblogs.com
	 */
	isLeapYear : function(year){ 
　　	return (0==year%4&&((year%100!=0)||(year%400==0)));
　　},

	/**
	 * 判断是否是大月
	 * @param {Object} monthNum
	 */
	isLargeMonth : function(monthNum){
		var largeArray = [true,false,true,false,true,false,true,true,false,true,false,true];
		return largeArray[monthNum - 1];
	},
    
    returnMonth: function(num){
        var arr = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
        return arr[num];
    },
	
	/**
	 * 创建一个Option对象
	 * @param {Object} value 值
	 * @param {Object} text 文本
	 */
	createOption : function(value,text){
		var option = document.createElement("option");
        option.value = value;
        option.innerHTML = text;
		return option;			
	},
	
	/**
	 * 处理天数
	 * @param {Object} el 下拉列表对像
	 * @param {Object} isMonth 是否是月的下拉列表 或者就处理 年的下拉列表
	 */
	progressDaySize: function(el,isMonth){
		if (isMonth == true) {
			/* 选择月时处理大月、小月和二月的情况 */
			var month = $(el).val();
			var year = $($("select", $(el).parent())[0]).val()
			var selDay = $($("select", $(el).parent())[2]);
			if (month == 2) {
			
				/* 2月处理 */
				$("option:contains('31')", selDay).remove();
				$("option:contains('30')", selDay).remove();
				
				/* 闰年处理 */
				if (!jSelectDate.isLeapYear(year)) {
					$("option:contains('29')", selDay).remove();
				}
				else {
				
					if ($("option:contains('29')", selDay).length == 0) {
						selDay.append(jSelectDate.createOption(29, 29));
					}
				}
			}
			else 
				if (!jSelectDate.isLargeMonth(month)) {
				
					/* 小月处理 */
					if ($("option:contains('30')", selDay).length == 0) {
						selDay.append(jSelectDate.createOption(30, 30));
					}
					
					$("option:contains('31')", selDay).remove();
				}
				else {
				
					/* 大月处理 */
					if ($("option:contains('30')", selDay).length == 0) {
						selDay.append(jSelectDate.createOption(30, 30));
					}
					
					if ($("option:contains('31')", selDay).length == 0) {
						selDay.append(jSelectDate.createOption(31, 31));
					}
				}
		}
		else{
			/* 处理闰年的二月问题 */
			var panelDate = $(el).parent();
			var year = $(el).val();	
		}
	}
    
}

jQuery.fn.jSelectDate = function(settings){    

	var getNowYear = function(){
        /* 得到现在的年 */
        var date = new Date();
        return date.getFullYear();
    }
	
	jSelectDate.settings.yearEnd = getNowYear();
	
    $.extend(jSelectDate.settings, settings);


    jSelectDate.init($(this));
    
    return $(this);
    
}
