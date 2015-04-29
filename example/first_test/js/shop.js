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
        //查询我的商店信息：/cgi-bin/webtool?cmd=3&query_shop=1
        //FIXME 当inputList为空时，对应的button直接默认为提交功能
        {"name": "查询我的商店信息", "id": "query_shop",  "url": "/cgi-bin/webtool?cmd=3&query_shop=1",
            "inputList": [
            ]
        },

        //设置今日刷新次数: /cgi-bin/webtool?cmd=3&refresh_times=xxx
        {"name": "设置今日刷新次数", "id": "refresh_times",  "url": "/cgi-bin/webtool?cmd=3",
            "inputList": [
                {"name" : "refresh_times", "desc": "刷新次数"}
            ]
        },

        //清空今日忍者秘宝抽奖次数： /cgi-bin/common_tool.sh?cmd=ZoneToolClearNinjiaChest
        {"name": "清空今日忍者秘宝抽奖次数", "id": "clear_ninjia_chest",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolClearNinjiaChest",
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

