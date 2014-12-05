//-------dom就绪---------//
var dateObj = new Date(); //当前时间
$(function(){
  mainChange();
  
  //获取浏览器高度改变事件
  if(!+"\v1" && !document.querySelector) { // for IE6 IE7
	document.body.onresize = mainChange;
  } else { 
	window.onresize = mainChange;
  }
  
  //切换区域事件绑定
  $("#closeOpen").bind('click',function(){
	$(this).blur();
	var leftW = $(".wrap .left").width();//左屏宽度
	if(leftW==215){
		$(".wrap .left").width(1);
		$("body").css({backgroundImage:"url()"});
		$("#closeOpen")[0].style.backgroundPosition = "-28px center";
	}else{
		$(".wrap .left").width(215);
		$("body").css({backgroundImage:"url(images/left_bg.gif)"});
		$("#closeOpen")[0].style.backgroundPosition = "2px center";
	}
  });
  
  //---------异步加载当前用户拥有权限的左侧树形菜单--------------//
  $.ajax({
	type: "GET",
	url: "menuConfig.js", //leftMenuAjaxUrl
	cache: false, //不缓存
	dataType: "html",
	success:function(data){
		var data = eval('('+data+')');
		getMenuData(data);
	},
	error:function(){
		$(".menu_left").html("<span style='color:#ff0000;'>菜单加载失败...</span>");	
	}
  });
  
  writeNowTime();
});

//主框架尺寸更改
function mainChange(){
  //设置左右屏切换区的高度
  var clientH = parseInt(document.documentElement.clientHeight); //客户端高度
  $("#closeOpen")[0].style.height = (clientH-80)+"px";
  $("#rightMain")[0].style.height = (clientH-118)+"px";
  $(".left_cont")[0].style.height = (clientH-108)+"px";
  
  if($.browser.msie&&$.browser.version=="6.0"){ //兼容IE6
	$(".right .main_content")[0].style.height = (clientH-116)+"px";
  }	
}

//读取菜单配置信息
function getMenuData(mainLink){
	$(".menu_left").empty(); //清空子元素
	for(var i=0;i<mainLink.length;i++){ //一级
		if(/javascript/.test(mainLink[i].url)){
			var target = "onclick="+mainLink[i].clickJS;
		}else{
			var target = "";
		}
		if(typeof(mainLink[i].subLink)!="undefined"){
			$(".menu_left").append('<h4><a href="'+mainLink[i].url+'" '+target+'><span class="icon icon_close_0"></span>'+mainLink[i].name+'</a></h4><ul id="menuUl_'+i+'" style="display:block;"></ul>');
			for(var j=0;j<mainLink[i].subLink.length;j++){ //二级
				if(/javascript/.test(mainLink[i].subLink[j].url)){
					var targetSub = "onclick="+mainLink[i].subLink[j].clickJS;
				}else{
					var targetSub = "";
				}
				if(typeof(mainLink[i].subLink[j].subLink)!="undefined"){ //三级
					$(".menu_left #menuUl_"+i).append('<li><dl id="menuDl_'+i+'_'+j+'"><dt><a href="'+mainLink[i].subLink[j].url+'" '+targetSub+'><span class="icon icon_open_1"></span>'+mainLink[i].subLink[j].name+'</a></dt></dl></li>');
					for(var k=0;k<mainLink[i].subLink[j].subLink.length;k++){
						$(".menu_left #menuDl_"+i+"_"+j).append('<dd style="display:none;"><a href="'+mainLink[i].subLink[j].subLink[k].url+'"><span class="icon icon_list_1"></span>'+mainLink[i].subLink[j].subLink[k].name+'</a></dd>');	
					}
				}else{
					$(".menu_left #menuUl_"+i).append('<li><dl><dt><a href="'+mainLink[i].subLink[j].url+'" '+targetSub+'><span class="icon icon_list_0"></span>'+mainLink[i].subLink[j].name+'</a></dt></dl></li>');
				}
			}
		}else{
			$(".menu_left").append('<h4><a href="'+mainLink[i].url+'" '+target+'><span class="icon icon_list"></span>'+mainLink[i].name+'</a></h4>');
		}
	}
	
	setTimeout(function(){
		$(".menu_left a").bind('click',function(){
			$(this).blur();
			//生成页面导航路径
			var theUrl = $(this).attr('href');
			if(!/^javascript.+/.test(theUrl)){ //非js事件，链接形式
				$("#urlName").html($(this).text());
			}
		});					
	},100);
}

//操作二级菜单,打开或关闭
function operateSub(_this){
	var subObj = $(_this).parent("h4").next("ul");
	subObj.slideToggle("fast",function(){
		if(subObj.css("display")=="block"){ //当前显示
			$(_this).parent("h4").find("span").attr("class","icon icon_close_0");
		}else{
			$(_this).parent("h4").find("span").attr("class","icon icon_open_0");
		}							 
	});
}
//操作三级菜单,打开或关闭
function operateNext(_this){
	var subObj = $(_this).parent("dt").nextAll("dd");
	subObj.slideToggle("fast",function(){
		if(subObj.css("display")=="block"){ //当前显示
			$(_this).parent("dt").find("span").attr("class","icon icon_close_1");
		}else{
			$(_this).parent("dt").find("span").attr("class","icon icon_open_1");
		}							 
	});
}

//当前时间
function writeNowTime(){
	var now= new Date();//获取当前时间
	var year=now.getFullYear();//年
	var month=now.getMonth()+1;//月
	var date=now.getDate();//日
	var day = now.getDay();//星期
	var hour=now.getHours()//时
	//判断今天是星期几
	if(day==0) day = "星期日";
	if(day==1) day = "星期一";
	if(day==2) day = "星期二";
	if(day==3) day = "星期三";
	if(day==4) day = "星期四";
	if(day==5) day = "星期五";
	if(day==6) day = "星期六";
	//问候
	if(hour>0&&hour<=6){
		$("#hello").html("午夜好");
	}else if(hour>6&&hour<=9){
		$("#hello").html("早上好");
	}else if(hour>9&&hour<=11){
		$("#hello").html("上午好");
	}else if(hour>11&&hour<=14){
		$("#hello").html("中午好");
	}else if(hour>14&&hour<=18){
		$("#hello").html("下午好");
	}else{
		$("#hello").html("晚上好");
	}
	
	//时间
	$("#date").html("今天是"+year+"年"+month+"月"+date+"日 "+day);
}