/**
 * Created by kevin on 15/4/9.
 */


$(document).ready(function(){

    //显示可修改的内容列表
    showList(funcContext);

    //注册当输入框有东西时，提交按钮亮起事件
    showSubmitWhenInputSomething();

    //绑定点击事件
    registerButton();

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

