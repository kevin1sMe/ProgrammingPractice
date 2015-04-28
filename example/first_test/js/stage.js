/**
 * Created by kevin on 2015/4/28.
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
        $(this).next(".sublist").toggleClass("hidden");

        showSubmit($(this).next(".sublist"));
    });


    //注册点击提交事件
    registerSumbit();
});

var funcContext = {
    funcList:[
        ///cgi-bin/common_tool.sh?cmd=ZoneToolModClientState&all_params=bit_count bit_value state&state=xxx&bit_count=xxx&bit_value=xxx
        {"name": "新手引导进度", "id": "guide",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModClientState", "need_all_params" : true,
            "inputList": [
                {"name": "state", "desc": "需要修改的状态"},
                {"name": "bit_count", "desc": "需要修改的该状态的位"},
                {"name": "bit_value", "desc": "需要修改的该状态的值  0或1"},
            ]
        },

        //6)打开所有关卡 /cgi-bin/enabledungeon.sh?cmd=ZoneToolEnableDungeon
        {"name": "打开所有关卡", "id": "enable_dungeon",  "url": "/cgi-bin/enabledungeon.sh?cmd=ZoneToolEnableDungeon",
            "inputList": [
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

