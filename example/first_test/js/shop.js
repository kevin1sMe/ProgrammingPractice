/**
 * Created by kevin on 2015/4/28.
 */


$(document).ready(function(){

    //显示可修改的内容列表
    showList(cfgShopJson);

    //注册当输入框有东西时，提交按钮亮起事件
    showSubmitWhenInputSomething();

    //绑定点击事件
    registerButton();

    //注册点击提交事件
    registerSumbit();

});

