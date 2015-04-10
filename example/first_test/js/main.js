/**
 *
 * Created by kevin on 15/4/9.
 */

showPlayer = function(data){
    $("#status span").text("当前总玩家:" + data.length);
    var source   = $("#player_list_template").html();
    console.log(source);
    console.dir(data);
    var template = Handlebars.compile(source);
    $(".main_select").html("");
    for(x in data){
        var fill_data = {op_name: "opcls_test", player_id: data[x].player_id , zone_id: data[x].zone_id, name: data[x].name};
        var html = template(fill_data);
        console.log("html" + html);
        $(".main_select").append(html);
    }
    //$("<option> hello </option>").appendTo($(".main_select"));
};


var funcLists = [
    {name:"基本信息", url:"basic.html"},
    {name:"忍者",    url:"404.html"},
    {name:"背包",    url:""},
];

$(document).ready(function(){
    $(".menu > li").click(function(){
        var iframe = $("iframe");
        $("iframe").attr("src",$(this).attr("url"));
    });

    var PlayerLists="";

    //去拉取玩家列表
    //$.getJSON("http://10.12.190.83/cgi-bin/webtool?cmd=get_player_list", function(data){
      $.getJSON("/cgi-bin/webtool?cmd=get_player_list", function(data){
        console.log("getJson");
        playerLists = data;
        console.dir(data);
    }).error(function(data)
    {
        console.log("getJson error");
        //playerLists = [{"name":"not on line, zonesvr bug!!", "player_id":"11107", "zone_id":"0"}, {"name":"猫代王", "player_id":"1850286090", "zone_id":"400010"}, {"name":"前田荣二", "player_id":"791036170", "zone_id":"400010"}, {"name":"not on line, zonesvr bug!!", "player_id":"11118", "zone_id":"0"}];
        playerLists = [{"name":"not on line, zonesvr bug!!", "player_id":"11107", "zone_id":"0"},
                    {"name":"猫代王", "player_id":"1850286090", "zone_id":"400010"}
            ];
        console.log("error cause");
        console.dir(playerLists);
        showPlayer(playerLists);
    });


    showMenu(funcLists);

});

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
};
