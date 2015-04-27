/**
 * Created by kevin on 15/4/9.
 */


$(document).ready(function(){

    //显示可修改的内容列表
    showList(funcContext);

    //绑定点击事件
    $(".form-group > button").click(function(){
        //$(this).parent().find(".sublist").addClass("hidden");
        $(".form-group > .sublist").addClass("hidden");
        $(this).next(".sublist").toggleClass("hidden");
    });

    //$(".result").text("怎么就找不到你呢");


});

var funcContext = {
    funcList:[
        {"name": "经验", "id": "exp", "desc": "填写经验数值", "url": "/cgi-bin/webtool?cmd=2", "input1": "exp"},
        {"name": "金币", "id": "rmb", "desc": "填写提交数值", "url": "/cgi-bin/webtool?cmd=2", "input1": "rmb"},
        {"name": "vip经验", "id": "vip_gold", "desc": "填写vip经验数值", "url": "/cgi-bin/webtool?cmd=2", "input1": "vip_exp"},
        {"name": "铜板", "id": "gold", "desc": "填写要加的铜板数值", "url": "/cgi-bin/webtool?cmd=2", "input1": "copper"},
        {"name": "体力", "id": "physical", "desc": "体力写在这里啊", "url": "/cgi-bin/webtool?cmd=2", "input1": "physical"},
    ]
};

showList = function(data){
    //使用handlerbar的Block语法来自动生成重复行
    //var source   = $("#optDetail").html();
    //var template = Handlebars.compile(source);
    //$("#optList").html("");
    //for(x in data){
    //    var html = template(data[x]);
    //    $("#optList").append(html);
    //}

    var source   = $("#optDetail").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    console.log("html" + html);
    $("#optList").html(html);
};


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
    $.get(cgi, function(data){
    }).success(function(data){
        console.log("req succ, rsp:" + data)
        //var result_p =  $(this).parent().find("#result").first();
        //result_p.text(data);
        //result_p.removeClass("hidden");
        window.parent.$("#result").text(data.toString());
    }).error(function(data, status){
        console.log("req failed, status:" + status + " data:" + data);

        //data="testt.......";
        //result_p.removeClass("hidden");

        //console.dir("this:" + $(this).parent());
        //var result_p =  $(this).parent().find(".result");
        //result_p.text(".....q");

        //console.dir("next:" + $(this).parent());
        //$(this).next("p").text("this is next");
        //window.parent.$("#result").text(data.toString());
        window.parent.$("#result").text("这里展示结果。");
    });

    //$("p").text("怎么就找不到你呢");

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