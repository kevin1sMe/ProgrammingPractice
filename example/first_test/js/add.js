/**
 * Created by kevin on 2015/4/28.
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

    //注册当输入框有东西时，提交按钮亮起事件
    showSubmitWhenInputSomething();

    //注册点击提交事件
    registerSumbit();
});

var funcContext = {
    funcList:[
        //增加忍者  /cgi-bin/addninja.sh&cmd=ZoneToolAddNinja&ninja_id=xx&ninja_level=xxx&all_params=ninja_id ninja_level
        {"name": "增加忍者", "id": "ninjia",  "url": "/cgi-bin/addninja.sh?cmd=ZoneToolAddNinja", "need_all_params": true,
            "inputList": [
                {"name" : "ninjia_id", "desc": "忍者id"},
                {"name" : "ninjia_level", "desc": "忍者等级"}
            ]
        },

        //添加物品 /cgi-bin/webtool?cmd=4&item_id=xx&item_count=xx
        {"name": "添加物品", "id": "addgoods",  "url": "/cgi-bin/webtool?cmd=4", "need_all_params": false,
            "inputList": [
                {"name" : "item_id", "desc": "物品id"},
                {"name" : "item_count", "desc": "物品数量"}
            ]
        },

        //我只是一个示例
        //{"name": "我是测试条", "id": "test", "url": "/cgi-bin/webtool?cmd=2", "need_all_params": true,
        //    "inputList": [
        //        {"name": "testinput1", "desc": "testinput1"},
        //        {"name": "testinput2", "desc": "testinput2"},
        //        {"name": "testinput3", "desc": "testinput3"}
        //    ]
        //},
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
    //console.log("html" + html);
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

registerSumbit = function() {
//注册点击提交的事件
    $(".funcBtn").click(function () {
        var $parent = $(this).parent();
        //获取cgi名称
        var $label = $parent.find("label:first");
        //var cgi = $parent.find("label").first().data("url");
        var cgi = $label.data("url");
        console.log("cgi:" + cgi)

        //组装cgi参数
        var $inputList = $parent.find("input");
        console.dir("inputList:" + $inputList + "len:" + $inputList.length);

        //使用each会把上面inputList对象中的其它杂七杂八的都输出，据说只能自己for i=0..len
        //$.each($inputList, function(i, val){
        //    console.log("i:" + i + " name:" + val.name);
        //});
        var len = $inputList.length;
        var all_params = "";
        for(var i=0;  i < len; ++i)
        {
            var $input = $inputList.eq(i);
            console.log("id:" + $input.attr("id") + " value:" + $input.val());
            cgi += "&" + $input.attr("id") + "=" + $input.val();

            all_params += $input.attr("id") + " ";
        }

        //某些cgi需要输入all_params
        var need_all_params = $label.data("need_all_params");
        console.log("need_all_params:" + need_all_params);
        if(need_all_params)
        {
            cgi +=  "&all_params=" + all_params;
        }

        console.log("cgi:" + cgi)

        //获得父页面中选择的玩家的信息
        var player = window.parent.$(":selected");
        if (typeof player == "undefined") {
            console.log("parent main_select not found");
        } else {
            console.dir("player:" + player);
            console.log("parent main_select found, select " + player.val());
            cgi += "&player_id=" + player.attr("player_id");
            cgi += "&zone_id=" + player.attr("zone_id");
            console.log(cgi);
        }

        //去请求cgi
        $.get(cgi, function (data) {
        }).success(function (data) {
            console.log("req succ, rsp:" + data)
            window.parent.$("#result").text(data.toString());
        }).error(function (data, status) {
            var errmsg = "req failed, status:" + data.status ;
            console.log("req failed, status:" + status + " data:" + data.status);
            window.parent.$("#result").text(errmsg);
        });

    });
}

//input中有输入时，才使提交亮起
showSubmitWhenInputSomething = function() {
    $("input").keyup(function () {
//        console.log("input value is " + $(this).first().val());
        //FIXME 当所有的都有输入时才亮起来
        if ($(this).val() == "") {
            $(this).parent().find("button").first().attr("disabled", true);
        }
        else {
            $(this).parent().find("button").first().attr("disabled", false);
        }
    });
}
