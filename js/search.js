$(function(){
    var _json ={
        keyword:'',
        start_time:'',
        end_time:'',
    }

    init();
    function init(){
        var now = new Date();   
        var year = now.getFullYear();       //年  
        var month = now.getMonth() + 1;     //月  
        var day = now.getDate();            //日           
        var hh = now.getHours();            //时  
        var mm = now.getMinutes();          //分  
        var ss = now.getSeconds();          //秒    
        var nowtime  = year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss;
        _json.end_time =nowtime;
        $('#datetimepicker2').val(nowtime);
        day-=7;
         var datestr = year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss; 
        _json.start_time =datestr;
        $('#datetimepicker1').val(datestr);
    }

	$('#datetimepicker1').datetimepicker({
        minView: "0",
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        autoclose: 1,
    }).on('changeDate', function(ev){
        _json.start_time = $('#datetimepicker1').val();
       
    });
    $('#datetimepicker2').datetimepicker({
        minView: "0",
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        autoclose: 1,
    }).on('changeDate', function(ev){
         _json.end_time = $('#datetimepicker2').val();
    });



    $('.radio-custom input').on('change',function(){
        var value = $(this).attr('data-state');
      
        var now = new Date();   
        var year = now.getFullYear();       //年  
        var month = now.getMonth() + 1;     //月  
        var day = now.getDate();            //日           
        var hh = now.getHours();            //时  
        var mm = now.getMinutes();          //分  
        var ss = now.getSeconds();          //秒    
        var nowtime  = year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss;
        _json.end_time =nowtime;
        $('#datetimepicker2').val(nowtime);
        if(value == 'week'){ //一周
            day-=7;
        }
        else if(value == 'month'){//一月
            month--;
        }
        else if(value == 'year'){//半年
            if(month>6){
                month-=6;
            }else{
                month = 12-(6-month);
                year--;
            }
        }
        else if(value =='custom'){//自定义

        }

        var datestr = year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss; 
        _json.start_time =datestr;
        $('#datetimepicker1').val(datestr);

    });


    //搜索
    $('.btn-search').on('click',function(){
        _json.keyword = $('.iptsearch').val();
        if(!_json.keyword) return;

        $.ajax({
            url:'/textsearch/add_search_api',
            data:{
                'operateKeyword':_json.keyword,
                'start_time':_json.start_time,
                'end_time':_json.end_time
            },
            success:function(dt){
                if(dt.success){ //成功
                    
                }
            },error:function(dt){

            }
        })
    });
});