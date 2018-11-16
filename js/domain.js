
$(function(){
      var _json ={
        keyword:'',
        start_time:'',
    }
  init();
    function init(){
        var now = new Date();   
        var year = now.getFullYear();       //年  
        var month = now.getMonth() + 1;     //月  
        var day = now.getDate();            //日           
        day-=7;
         var datestr = year+'-'+month+'-'+day; 
        _json.start_time =datestr;
        $('#datetimepicker1').val(datestr);
    }

    $('#datetimepicker1').datetimepicker({
        minView: "0",
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: 1,
    }).on('changeDate', function(ev){
        _json.start_time = $('#datetimepicker1').val();
       
    });



$("input.date").jSelectDate({
        css:"date",
        yearBeign: 1995,
        disabled : false,
        showLabel : false
});

})