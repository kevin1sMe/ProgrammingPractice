/**
 * Created by kevin on 15/4/9.
 */


$(document).ready(function(){
    $(".form-group > button").click(function(){
        $(this).next(".sublist").toggleClass("hidden");
    });
});

funcList = [
    {"name":"经验", "id": "exp",  "desc": "填写经验数值", "url":"/cgi-bin/webtool?cmd=2", "input1": "exp"},
    {"name":"金币", "id": "rmb", "desc": "填写提交数值", "url": "/cgi-bin/webtool?cmd=2", "input1":"rmb"},
    {"name":"vip经验", "id": "vip_gold", "desc": "填写vip经验数值", "url": "/cgi-bin/webtool?cmd=2", "input1":"vip_exp"},
    {"name":"铜板", "id": "gold", "desc": "填写要加的铜板数值", "url": "/cgi-bin/webtool?cmd=2", "input1":"copper"},
    {"name":"体力", "id": "physical", "desc": "体力写在这里啊", "url": "/cgi-bin/webtool?cmd=2", "input1":"physical"},
];

showList = function(data){
    var source   = $("#optDetail").html();
    var template = Handlebars.compile(source);
    $("#optList").html("");
    for(x in data){
        var html = template(data[x]);
        $("#optList").append(html);
    }
};

//显示可修改的内容列表
showList(funcList);

findParamName = function(id, param){
    for(x in funcList) {
        if(funcList[x].id == id) {
            console.log("id:" + id + " param:" + param + " => "  + funcList[x][param]);
            return funcList[x][param];
        }
    }
};
//注册点击提交的事件
$(".funcBtn").click(function(){
    var input = $(this).parent().find("input").first();
    console.log("vaule:" + input.val());
    var cgi = input.data("url");
    console.dir("input:" + input.attr("id"));
    var paramName = findParamName(input.attr("id"), "input1");
    console.log(paramName);
    if(typeof paramName != "undefined")
    {
        cgi += "&" + paramName + "=" + input.val();
    }
    else
    {
        console.log("not found paramName：" + "input1");
    }
    console.log(cgi);

    //获得父页面中选择的玩家的信息
//        var player = window.parent.$(".main_select");
    var player = window.parent.$(":selected");
    if(typeof player == "undefined") {
        console.log("parent main_select not found") ;
    }else{
        console.dir("player:" + player);
        console.log("parent main_select found, select " + player.val()) ;
        cgi += "&player_id=" + player.attr("player_id");
        cgi += "&zone_id=" + player.attr("zone_id");
        console.log(cgi);
    }

    //去请求cgi
    var result = "";
    $.get(cgi, function(data){
        console.log("get result:" + data);
        result = data;
    }).success(function(data){
        console.log("req succ, rsp:" + data)
        result = data;
    }).error(function(data, status){
        console.log("req failed, status:" + status)
        result = "get failed. status:" + status + " " + data;
    });

    console.log("result = " + result);
    $(this).parent().find("#result").first().text(result);

});

//input中有输入时，才使提交亮起
$("input").keyup(function(){
//        console.log("input value is " + $(this).first().val());
    if($(this).val() == ""){
        $(this).parent().find("button").first().attr("disabled", true);
    }
    else{
        $(this).parent().find("button").first().attr("disabled", false);
    }
});