/**
 * Created by kevin on 2017/5/9.
 */

showResult = function(str){
    window.parent.$("#loading").hide();
    var $result =  $(".result");
    console.dir("result:" + $result);
    $result.html(str);
    $result.removeClass("hidden");

    $(".funcBtn").attr("disabled", false);
}

checkFileSize = function(file) {
	if(typeof file != "undefined"){
		byteSize = file.size;
		console.log("file size:" + byteSize);
		if(Math.ceil(byteSize / 1024) > 63) {
			console.log("file size limited:" + byteSize);
			showResult("文件大小不能超过63K。请压缩或者修改文件！");
			return false
		}
	}
	return true
}


registerCb = function() {
	console.log("registerCb change");
    //注册点击提交的事件
    $("#content, #cmd").change(function () {
			//使结果隐藏
    		var $result =  $(".result");
			$result.removeClass("hidden")
			$result.addClass("hidden");
	});

	$("#file").change(function() {
			//使结果隐藏
    		var $result =  $(".result");
			$result.removeClass("hidden")
			$result.addClass("hidden");

			//检查文件大小
			checkFileSize($('#file')[0].files[0])
	})
}


registerSumbit = function() {
    //注册点击提交的事件
    $(".funcBtn").click(function () {

    //使按钮隐藏防止多次点击
    $(this).attr("disabled", true);

	//使结果隐藏
	$(".result").addClass("hidden");

   var req_str = "/for_peck";
   var player_id = 0
   var zone_id = 0

   console.log("req_str:" + req_str);
	//获得父页面中选择的玩家的信息
	var player = window.parent.$(":selected");
	if (typeof player == "undefined") {
		console.log("parent main_select not found");
	} else {
		console.dir("player:" + player);
		console.log("parent main_select found, select " + player.val());
		player_id = player.attr("player_id")
		zone_id = player.attr("zone_id")

		console.log("player_id:" + player_id)
		console.log("zoner_id:" + zone_id)
	}

	//获得cmd（op)
	var cmd = $("#cmd").val()
	console.log("cmd:" + cmd)
	if(cmd=="") {
		showResult("Lua op(cmd) 不能为空!");
		return
	}


	var content = $("#content").val()
	console.log("content:" + content)
	var file = $('#file')[0].files[0]
	console.log("file:" + file)
	if((content=="" && typeof file == "undefined") ){
		//alert("Content 或者 文件，必须有一个有值");
		showResult("Content 或者 文件，必须有一个有值");
		return
	}

	if(typeof file != "undefined"){
			//检查文件大小
			if(!checkFileSize(file)){
				console.log("check file size failed")
				showResult("文件大小校验失败！");
				return
			}
	}
	
	var formData = new FormData()
	formData.append('player_id', player_id)
	formData.append('zone_id', zone_id)
	formData.append('cmd', cmd)
	formData.append('content', content)
	formData.append('file', file)

	$.ajax({
		url: req_str, 
		type: 'POST', 
		cache: false,
		data: formData, 
		processData:false,
		//contentType: 'multipart/form-data'
		contentType: false
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

};

$(document).ready(function() {

    console.log("in ready function");
    //注册导表按钮行为
    registerSumbit();

	//注册回调
	registerCb();
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

