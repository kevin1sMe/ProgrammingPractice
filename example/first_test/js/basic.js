/**
 * Created by kevin on 15/4/9.
 */


$(document).ready(function(){

    //显示可修改的内容列表
    showList(funcContext);

    //注册当输入框有东西时，提交按钮亮起事件
    showSubmitWhenInputSomething($(this));

    //绑定点击事件
    $(".form-group > button").click(function(){
        //$(this).parent().find(".sublist").addClass("hidden");
        $(".form-group > .sublist").addClass("hidden");
        $(".form-group > #result").addClass("hidden");
        $(this).next(".sublist").toggleClass("hidden");

        showSubmit($(this).next(".sublist"));
    });

    //注册点击提交事件
    registerSumbit();
});

var funcContext = {
    funcList:[
        {"name": "经验", "id": "exp",  "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name" : "exp", "desc": "填写经验数值"}
            ]
        },
        {"name": "金币", "id": "rmb", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "rmb", "desc": "填写加要的金币数值"}
            ]
        },
        {"name": "vip经验", "id": "vip_gold", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "vip_exp", "desc" : "填写vip经验数值"}
            ]
        },

        {
            "name": "铜板", "id": "gold",  "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "copper", "desc": "填写要加的铜板数值"}
            ]
        },

        {
            "name": "体力", "id": "physical", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "physical", "desc": "要加的体力写在这里"}
            ]
        },

        {
            "name": "竞技场排名", "id": "arena_rank", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "arena_rank", "desc": "设置新的名次"}
            ]
        },

        //声望: /cgi-bin/webtool?cmd=2&reputation=1
        {
            "name": "声望", "id": "reputation", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "reputation", "desc": "填写声望数值"}
            ]
        },

        //天赋： /cgi-bin/webtool?cmd=2&talent_point=1
        {
            "name": "天赋", "id": "talent_point", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "talent_point", "desc": "填写天赋点数"}
            ]
        },

        //示例
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
            //window.parent.$("#result").text(errmsg);
            var $result = $parent.parent().find("#result:first");
            $result.text(errmsg);
            $result.removeClass("hidden");
        });

    });
}

//初始化submit状态
showSubmit = function(parent) {
    var $parent = parent;
    var $inputList = $parent.find("input");
    var any_not_finish = false;
    var len = $inputList.length;
    console.log("len:" + len);
    for(var i=0; i < len; ++i) {
        if($inputList.eq(i).val() == "") {
            any_not_finish = true;
            break;
        }
    }

    $parent.find("button:first").attr("disabled", any_not_finish);
}

//所有的input中有输入时，才使提交亮起
showSubmitWhenInputSomething = function() {
    $("input").keyup(function () {
        showSubmit($(this).parent())
    });
}
