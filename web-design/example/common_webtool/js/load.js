/**
 * Created by kevin on 15/5/13.
 */

$(document).ready(function(){

    console.log(window.location.search);
    console.log("cfg=" + getQueryParam("cfg"));
    var jsonDataName = getQueryParam("cfg");

    //显示可修改的内容列表
    showList(window[jsonDataName]);
    //注册当输入框有东西时，提交按钮亮起事件
    showSubmitWhenInputSomething();

    //绑定点击事件
    registerButton();

    //注册点击提交事件
    registerSumbit();
});


//获得子页面的输入参数
function getQueryParam(param) {
    var result =  window.location.search.match(
        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
    );

    return result ? result[3] : false;
}

