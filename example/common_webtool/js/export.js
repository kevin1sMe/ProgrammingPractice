/**
 * Created by kevin on 2015/8/3.
 */



showBranches = function(data){
    var source   = $("#branches_list_template").html();
    console.log("source:" + source);
    var template = Handlebars.compile(source);
    console.dir("template:" , template);
    var html = template(data);

    console.log("html:" + html);
    $("#branchesSelect").html(html);
};

showResult = function(str){
    window.parent.$("#loading").hide();
    var $result =  $(".result");
    console.dir("result:" + $result);
    $result.text(str);
    $result.removeClass("hidden");
}

registerSumbit = function() {
//注册点击提交的事件
    $(".funcBtn").click(function () {
        //获得选择的分支
        var branch = $("#branchesSelect");
        console.log("export btn click, select branch is " + branch.val());

        //去拉取分支列表
        var req_str = "/cgi-bin/webtool?cmd=export_xml.sh?branch=" + branch.val();
        console.log("req_str:" + req_str);

        $.getJSON(req_str, function(data){
            console.log("getJson succ, data:" + data);
            showResult(data);
        })
            .always(function() {
                window.parent.$("#loading").show();
            })
            .error(function(data)
        {
            console.log("getJson error");
            console.log("error cause , data is :" +  data);
            showResult("send request error or recv response err!");
        });

    });
};

$(document).ready(function() {

    console.log("in ready function");
    var ctx = {
        "branch_list": [
            {"branch_name": "trunk"},
            {"branch_name": "20150728"}
        ]
    };


    //展示分支列表
    showBranches(ctx);

    //注册导表按钮行为
    registerSumbit();

});

//registerSumbit = function() {
////注册点击提交的事件
//    $(".funcBtn").click(function () {
//        var $parent = $(this).parent();
//        //获取cgi名称
//        var $label = $parent.find("label:first");
//        //var cgi = $parent.find("label").first().data("url");
//        var cgi = $label.data("url");
//        console.log("cgi:" + cgi)
//
//        //组装cgi参数
//        var $inputList = $parent.find("input");
//        console.dir("inputList:" + $inputList + "len:" + $inputList.length);
//
//        //使用each会把上面inputList对象中的其它杂七杂八的都输出，据说只能自己for i=0..len
//        //$.each($inputList, function(i, val){
//        //    console.log("i:" + i + " name:" + val.name);
//        //});
//        var len = $inputList.length;
//        var all_params = "";
//        for(var i=0;  i < len; ++i)
//        {
//            var $input = $inputList.eq(i);
//            console.log("id:" + $input.attr("id") + " value:" + $input.val());
//            cgi += "&" + $input.attr("id") + "=" + $input.val();
//
//            all_params += $input.attr("id") + " ";
//        }
//
//        //某些cgi需要输入all_params
//        var need_all_params = $label.data("need_all_params");
//        console.log("need_all_params:" + need_all_params);
//        if(need_all_params)
//        {
//            cgi +=  "&all_params=" + all_params;
//        }
//
//        console.log("cgi:" + cgi)
//
//        //获得父页面中选择的玩家的信息
//        var player = window.parent.$(":selected");
//        if (typeof player == "undefined") {
//            console.log("parent main_select not found");
//        } else {
//            console.dir("player:" + player);
//            console.log("parent main_select found, select " + player.val());
//            cgi += "&player_id=" + player.attr("player_id");
//            cgi += "&zone_id=" + player.attr("zone_id");
//            console.log(cgi);
//        }
//
//        //去请求cgi
//        $.get(cgi, function (data) {
//
//        })
//            .always(function(){
//            window.parent.$("#loading").show();
//        })
//            .success(function (data) {
//                console.log("req succ, rsp:" + data)
//                showResult($parent, data.toString());
//            }).error(function (data, status) {
//                var errmsg = "req failed, status:" + data.status;
//                console.log("req failed, status:" + status + " data:" + data.status);
//                showResult($parent, errmsg);
//            });
//
//    });
//}

////初始化submit状态
//showSubmit = function(parent) {
//    var $parent = parent;
//    var $inputList = $parent.find("input");
//    var any_not_finish = false;
//    var len = $inputList.length;
//    console.log("len:" + len);
//    for(var i=0; i < len; ++i) {
//        if($inputList.eq(i).val() == "") {
//            any_not_finish = true;
//            break;
//        }
//    }
//
//    $parent.find("button:first").attr("disabled", any_not_finish);
//}

