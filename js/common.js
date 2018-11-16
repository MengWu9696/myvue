$(function(){
	$('.site-menu > li > a').on('click',function(){
		var _this = $(this).parent(); 
		_this.find('>a').css('color','#fff');
		_this.siblings().find('.site-menu-sub').slideUp(500);
		_this.siblings().find('a').css('color','rgba(163,175,183,.9)'); 
		_this.find('.site-menu-sub').slideDown(500)
	});

 

	// $('.btnOut').on('click',function(){
	// 	// ShowOrderDetails( );
	// 	window.open('','','width=800,height=600')
	// });


	// 全选
	/*全选*/

	$('.checkall input').change(function(){
		if($(this).prop('checked')){
			//选中
			$(this).find('input').attr('checked','checked');
			$('.checkitem input').prop('checked','true');
			$('.btnDelAll').removeAttr('disabled');
			$('.btnSet').removeAttr('disabled');
		}else{
			$(this).find('input').removeAttr('checked');
			$('.checkitem input').removeAttr('checked');
			$('.btnDelAll').prop('disabled','true');
			$('.btnSet').prop('disabled','true');
		}
	});



	/*选中表格的每一项*/
	$('.checkitem input').change(function(){
		var item = $('.checkitem input');
		var con = item.length;
		var totle = 0;
		for(var i=0;i<con;i++){
			if($('.checkitem input').eq(i).prop('checked')){
				totle++;
			}
		}
		if(totle == con)
		{
			$('.checkall input').prop('checked','true');
		}else{
			$('.checkall input').removeAttr('checked');
		}
		if(totle==0){
			$('.btnDelAll').prop('disabled','true');
			$('.btnSet').prop('disabled','true');
		}else{
			$('.btnDelAll').removeAttr('disabled');
			$('.btnSet').removeAttr('disabled');
		}
		if(totle == 1){
			$('.btnUpdatemsg').removeAttr('disabled');
		}else{
			$('.btnUpdatemsg').prop('disabled','true');
		}
	});


	//菜单栏，app检测
	$('.btn-app').on('click',function(){
		$('.appuploadfile').click();
	})

});