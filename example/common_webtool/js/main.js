/**
 *
 * Created by kevin on 15/4/9.
 */

showPlayer = function(data){
    $("#status span").text("当前总玩家:" + data.length);
    var source   = $("#player_list_template").html();
	if( typeof(source) == "undefined") {
		source = '<option class="{{op_name}}" player_name="{{player_name}}" player_id="{{player_id}}" zone_id="{{zone_id}}" open_id="{{open_id}}"> {{name}} </option>';
	}
    console.log(source);
    console.dir(data);
    var template = Handlebars.compile(source);
    $(".main_select").html("");
    for(x in data){
        var fill_data = {op_name: "opcls_test", player_name:data[x].name, player_id: data[x].player_id , zone_id: data[x].zone_id, open_id: data[x].open_id, name: data[x].name + "(zone_id:" + data[x].zone_id + ",gid:"+data[x].player_id + ")"};

        //var fill_data = {op_name: "opcls_test", player_name:data[x].name, player_id: data[x].player_id , zone_id: data[x].zone_id, open_id: data[x].open_id, name: data[x].name + "(zone_id:" + data[x].zone_id + ",gid:"+data[x].player_id+ ",open_id:" + data[x].open_id + ")"};
        var html = template(fill_data);
        console.log("html" + html);
        $(".main_select").append(html);
    }
    //$("<option> hello </option>").appendTo($(".main_select"));
    var ret='succeeded. result: ret_info { ret_code: 0 ret_msg: "\346\201\255\345\226\234\344\275\240\344\277\256\346\224\271\346\210\220\345\212\237!" }';
    console.log(ret);
    //console.log(urlencode(ret));
};


$(document).ready(function(){
    registerCopy();
	//注册刷新事件
    registerRefreshPlayer();

	//刷新玩家列表
	refreshPlayerList();

    //显示左边栏菜单
    showMenu(funcLists);

    //注册左边栏菜单点击事件
    registerMenu();
	registerSelect();

	//复制功能
	
	
    //显示当时时间
    writeNowTime();

});

refreshPlayerList = function(){
    var PlayerLists="";

    //去拉取玩家列表
    $.getJSON("/cgi-bin/webtool?cmd=get_player_list", function(data){
        console.log("getJson");
        playerLists = data;
        console.dir(data);
        showPlayer(playerLists);
		//showPlayerInfo();
    }).error(function(data)
    {
        console.log("error cause, redirect to TOF");
        alert(data.responseText + "可能服务器挂了。如果没挂的话，尝试清除本地浏览器的cookie试一试。(选择全部而不是过去的xx小时)");
        $(location).attr("href", "/");
    });
	
}

showMenu = function(data){
    var source   = $("#menu_list_template").html();
    console.log(source);
    console.dir(data);
    var template = Handlebars.compile(source);
    $(".menu").html("");
    for(x in data){
        var html = template(data[x]);
        console.log("html" + html);
        $(".menu").append(html);
    }
    $(".menu > li:first").addClass("menuSelect");
};


//注册menu的点击事件
registerMenu = function(){
    $(".menu > li").click(function(){
        $(".menu > li").removeClass("menuSelect");
        $(this).addClass("menuSelect");
        var $iframe = $("iframe");
        console.log("click " + $(this).data("url"));
        $iframe.attr("src",$(this).data("url"));
    }
	);
}
//注册select on change的点击事件
registerSelect = function(){
    $(".main_select").change(function(){
      showPlayerInfo();
    }
	);	
}

showPlayerInfo = function(){

   var player_detail= $(".main_select").val();
   //$("#show_player_detail").html(player_detail);
}


//复制功能
registerCopy = function() {
    new Clipboard('.cpAll', {
        text: function() {
            //var x = document.getElementById("show_player_detail");
            return $(":selected").val();
        }
    });
    
    new Clipboard('.cpGid', {
        text: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").attr("player_id");
            //return x;
            return $(":selected").attr("player_id");
        }
    });
    
    new Clipboard('.cpZoneid', {
        text: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").attr("zone_id");
            //return x;
            return $(":selected").attr("zone_id");
        }
    });
    
    new Clipboard('.cpOpenid', {
        text: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").attr("open_id");
            //return x;
            return $(":selected").attr("open_id");
        }
    });
 
    //new Clipboard('.cpAll', {
        //target: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").val();
            //return x;
        //}
    //});
    
    //new Clipboard('.cpGid', {
        //target: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").attr("player_id");
            //return x;
        //}
    //});
    
    //new Clipboard('.cpZoneid', {
        //target: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").attr("zone_id");
            //return x;
        //}
    //});
    
    //new Clipboard('.cpOpenid', {
        //target: function() {
            //var x = document.getElementById("show_player_detail");
            //x.innerHTML = $(":selected").attr("open_id");
            //return x;
        //}
    //});
    
    
    
	// $(".cpAll").zclip({
		// path: 'js/ZeroClipboard.swf',
		// copy: function() { 
			// return $(":selected").val(); }
    // });

	// $(".cpGid").zclip({
		// path: 'js/ZeroClipboard.swf',
		// copy: function() { 
			// return $(":selected").attr("player_id"); }
    // });

	// $(".cpZoneid").zclip({
		// path: 'js/ZeroClipboard.swf',
		// copy: function() { 
			// return $(":selected").attr("zone_id"); }
    // });

	// $(".cpOpenid").zclip({
		// path: 'js/ZeroClipboard.swf',
		// copy: function() { 
			// return $(":selected").attr("open_id"); }
    // });



}


registerRefreshPlayer = function() {
	$(".refreshPlayer").click(function(){
		console.log("refresh playerlist click!!")
		refreshPlayerList();	
	});

}


