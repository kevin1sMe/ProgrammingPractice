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

//当前时间
function writeNowTime(){
    console.log("writeNowTime");
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

    //FIXME 为什么html中有个，没展示出来？
    //时间
    $("#date").html("，今天是"+year+"年"+month+"月"+date+"日 "+day);
    console.log("今天是"+year+"年"+month+"月"+date+"日 "+day);
}

