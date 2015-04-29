/**
 * Created by kevin on 2015/4/28.
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
        //增加忍者  /cgi-bin/addninja.sh&cmd=ZoneToolAddNinja&ninja_id=xx&ninja_level=xxx&all_params=ninja_id ninja_level
        {"name": "增加忍者", "id": "ninjia",  "url": "/cgi-bin/addninja.sh?cmd=ZoneToolAddNinja", "need_all_params": true,
            "inputList": [
                {"name" : "ninjia_id", "desc": "忍者id"},
                {"name" : "ninjia_level", "desc": "忍者等级"}
            ]
        },

        //添加物品 /cgi-bin/webtool?cmd=4&item_id=xx&item_count=xx
        {"name": "添加物品", "id": "addgoods",  "url": "/cgi-bin/webtool?cmd=4", "need_all_params": false,
            "inputList": [
                {"name" : "item_id", "desc": "物品id"},
                {"name" : "item_count", "desc": "物品数量"}
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

