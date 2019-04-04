/**
 * Created by kevin on 2015/8/3.
 */

var ctx = {
    "branch_list": [
    {"branch_name": "trunk", "sync_desc": "同步到17.6开发环境"},
    {"branch_name": "KiHan10",  "sync_desc": "同步到17.14开发环境"}
    ]
};

getDevEnvDesc = function(branch_list, name){
    for(var e in branch_list){
        console.dir("e:" + e );
        if(branch_list[e]["branch_name"] == name){
            return branch_list[e]["sync_desc"];
        }
    }
    return "没找到这个分支对应的环境"
}

updateSyncTips = function(){
    console.log("branch select is :" + $("#branchesSelect").val());
    var branch_name = $("#branchesSelect").val();
    var branch_to_dev_env = getDevEnvDesc(ctx["branch_list"], branch_name);
    console.log("branch_to_dev_env:" + branch_to_dev_env);
    $("#sync_desc").text(branch_to_dev_env);
}


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
    $result.html(str);
    $result.removeClass("hidden");

    $(".funcBtn").attr("disabled", false);
}

registerSumbit = function() {
    //注册点击提交的事件
    $(".funcBtn").click(function () {

    //使按钮隐藏防止多次点击
    $(this).attr("disabled", true);

    if(window.location.hostname != "devtest1.kihan.oa.com"){
        showResult("请在17.6环境的管理工具中执行导表操作，可导到17.6或17.14. 其它环境都不能够自助导表")
        return
    }

	//使结果隐藏
    	$(".result").addClass("hidden");

        //获得选择的分支
        var branch = $("#branchesSelect");
        console.log("export btn click, select branch is " + branch.val());

        //获得是否同步到测试环境的需求
        var sync_to_test = 0
	if($("#sync_to_test").is(":checked")) {
		sync_to_test = 1
	}
        var req_str = "/cgi-bin/export_xml.sh?branch=" + branch.val() + "&sync_to_test=" + sync_to_test;
        console.log("req_str:" + req_str);

	$.get(req_str, function(data){
	})
	.always(function() {
		window.parent.$("#loading").show();      
	})
	.success(function (data){  
		console.log("getJson succ, data:" + data);
		showResult(data);
	})
    	.error(function(data) {     
		    console.log("getJson error");            
		    console.log("error cause , data is :" +  data);
		    showResult("send request error or recv response err!");
		    });

    });

    //2016年1月25日 22:55:02@kevin
    //注册下拉列表框变化时，左侧的复选框中文字跟着变化的事件
    $("#branchesSelect").change(function(){
        updateSyncTips();
    });
};

$(document).ready(function() {

    console.log("in ready function");
    /*
    var req_str = "/cgi-bin/get_config_branch_list.sh"
	$.getJSON(req_str, function(data){
	})
    .success(function (data){  
		console.log("getJson succ, data:" + data);
        //展示分支列表
        showBranches(data);
	})
    .error(function(data) {     
		    console.log("getJson error");            
		    console.log("error cause , data is :" +  data);
    });
    */

    //展示分支列表
    showBranches(ctx);

    //注册导表按钮行为
    registerSumbit();

    //先更新一下状态
    updateSyncTips();
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

