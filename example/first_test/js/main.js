/**
 * Created by kevin on 15/4/9.
 */
$(document).ready(function(){
    $(".menu > li").click(function(){
        var iframe = $("iframe");
        $("iframe").attr("src",$(this).attr("url"));
    });

    //去拉取玩家列表
    $.getJSON("http://10.12.190.83/cgi-bin/webtool?cmd=get_player_list", function(data){
    //    $.getJSON("http://localhost:63342/", function(data){
        playerLists = data;
        console.dir(data);
    });

});


playerLists = [
    {"name": "kevin"},
    {"name": "lin"},
];

showPlayer = function(){
//        $("#status").children("span").text("当前总玩家:" + playerLists.length());
    $("#status span").text("当前总玩家:" + playerLists.length);
}();

var funcLists = [
    {name:"基本信息", url:"basic.html"},
    {name:"忍者",    url:"404.html"},
    {name:"背包",    url:""},
];

showMenu = function(){
    $(".menu").text("");
    for( x in funcLists)
    {
//            $('<li class="menuList"' + 'url=' + funcLists[x].url + '> ' + funcLists[x].name + '</li>').appendTo($(".menu"));
//            $('<li class="menuList"' + 'url=' + funcLists[x].url + '> ' + funcLists[x].name + '</li>').appendTo($(".menu"));
        console.dir(x);
    }
}();
