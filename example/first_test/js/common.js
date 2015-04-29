/**
 * Created by kevin on 2015/4/29.
 */

//绑定点击事件
registerButton = function(){
    $(".form-group > button").click(function(){
        //$(this).parent().find(".sublist").addClass("hidden");
        $(".form-group > .sublist").addClass("hidden");
        $(".form-group > #result").addClass("hidden");
        $(this).next(".sublist").toggleClass("hidden");

        showSubmit($(this).next(".sublist"));
    });
}

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
