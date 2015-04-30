

var funcLists = [
    {name:"基本信息", url:"basic.html"},
    {name:"修改道具", url:"add.html"},
    {name:"商店相关", url:"shop.html"},
    {name:"关卡相关", url:"stage.html"},
];

//基本信息页
var cfgBasicJson = {
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
    ]
};


//修改道具
var cfgAddJson = {
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



var cfgShopJson = {
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

