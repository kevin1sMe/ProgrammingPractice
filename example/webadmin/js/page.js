//-------dom就绪---------//
$(function(){
  //表单输入框 - 激活
  $(".input-text").bind('focus',function(){
	  $(this).css({backgroundImage:"url(images/input_focus.png)",borderColor:"#AFCEE6"});
	  if(typeof $(this).next()[0]!= "undefined"&&/^on.+/.test($(this).next()[0].className)){
	  	$(this).next()[0].className = "onFocus";
	  }
  });
  //表单输入框 - 未激活
  $(".input-text").bind('blur',function(){
	  $(this).css({backgroundImage:"url(images/input.png)",borderColor:"#D0D0D0"});
	  if(typeof $(this).next()[0]!= "undefined"&&/^on.+/.test($(this).next()[0].className)){
	  	$(this).next()[0].className = "onShow";
	  }
  });
  
  //列表隔行换色
  $(".table-list tbody tr").mouseover(function(){ //如果鼠标移到表格的tr上时，执行函数
		  $(this).addClass("tabover");
	  }
  ).mouseout(function(){ //并且当鼠标移出该行时执行函数
		  $(this).removeClass("tabover");
	  }
  );
  
  //日期输入框
  if(typeof $("#datepicker").datepicker!="undefined"){
  	$("#datepicker").datepicker();
  	$("#datepicker").datepicker("option","dateFormat","yy-mm-dd");
  }
  if(typeof $("#datepicker_ed").datepicker!="undefined"){
  	$("#datepicker_ed").datepicker();
  	$("#datepicker_ed").datepicker("option","dateFormat","yy-mm-dd");
  }
});

//关闭元素
function hide_element(_obj){
	$("#"+_obj).fadeOut();	
}