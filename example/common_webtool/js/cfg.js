

var funcLists = [
    {name:"基本信息", url:"basic.html?cfg=cfgBasicJson", icon: "fa-user-plus fa-lg"},
    {name:"修改道具", url:"basic.html?cfg=cfgAddJson", icon:"fa-briefcase fa-lg"},
    {name:"商店相关", url:"basic.html?cfg=cfgShopJson", icon:"fa-shopping-cart fa-lg"},
    {name:"关卡相关", url:"basic.html?cfg=cfgStageJson", icon:"fa-unlock fa-lg"},
  {name:"+PK+相关", url:"basic.html?cfg=cfgPkJson", icon:"fa-male fa-lg"},
    {name:"任务相关", url:"basic.html?cfg=cfgTaskJson", icon:"fa-tasks fa-lg"},
    {name:"组织相关", url:"basic.html?cfg=cfgGuildJson", icon:"fa-bank fa-lg"},
  {name:"好友相关", url:"basic.html?cfg=cfgFriendJson", icon:"fa-users fa-lg"},
  {name:"活动相关", url:"basic.html?cfg=cfgActJson", icon:"fa-unlock fa-lg"},
  {name:"服务器设置", url:"basic.html?cfg=cfgServerJson", icon:"fa-server fa-lg"},
  {name:"拉取玩家信息", url:"fetch_player_info.html", icon:"fa-car fa-lg"},
  {name:"Lua下发工具", url:"lua_tool.html", icon:"fa-send fa-lg"},
  {name:"导配置表", url:"export.html", icon:"fa-clipboard fa-lg"},
];

var cfgTaskJson = {
    funcList:[
        {"name": "修改每日活跃度", "id": "task_add_activity",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolTask", "need_all_params": true,
            "inputList": [
                {"name" : "activity", "desc": "活跃度"}
            ]
        },
        {"name": "重置任务集会所数据", "id": "clear_ninja_task",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearNinjaTask",
            "inputList": [
            ]
        },
        {"name": "修改任务进度", "id": "process_task",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolTaskProcess", "need_all_params": true,
            "inputList": [
                {"name" : "condition", "desc": "条件-对应任务表 完成条件-参数"},
                {"name" : "param1", "desc": "参数1"},
                {"name" : "param2", "desc": "参数2"},
                {"name" : "param3", "desc": "参数3"},
            ]
        },
        {"name": "发邮件", "id": "send_mail",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolSendMail", "need_all_params": true,
            "inputList": [
                {"name" : "title", "desc": "标题-不能纯数字"},
                {"name" : "content", "desc": "内容-不能纯数字"},
                {"name" : "attachments", "desc": "附件: 100:1,101:2,103:5 无附件填个字母"},
                {"name" : "send_times", "desc": "发送次数"},
            ]
        },
        {"name": "小队信息", "id": "group_info",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolGroupInfo", "need_all_params": true,
            "inputList": [
                {"name" : "score", "desc": "分数(111不修改此项)"},
                {"name" : "win_cnt", "desc": "胜利次数(111不修改此项)"},
                {"name" : "fight_cnt", "desc": "出战次数(111不修改此项)"},
                {"name" : "dissmiss_time", "desc": "距今过多少秒解散小队(111不修改此项)"},
                {"name" : "lost_cnt", "desc": "连败次数(111不修改此项)"},
            ]
        },
        //加小队宝箱
        {"name": "增加小队宝箱", "id": "pvp_2v2_addbox",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolPvp2v2AddBox", "need_all_params": true,
            "inputList": [
                {"name" : "score", "desc": "此宝箱所属分数段"},
                {"name" : "day_buy_times", "desc": "当天购买的钥匙次数(填111不修改此项）"},
            ]
        },
        //设置决斗场任务次数
        {"name": "设置决斗场任务次数", "id": "pvp_1v1_set_task_cnt",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetPvp1v1TaskCnt", "need_all_params": true,
            "inputList": [
                {"name" : "cnt", "desc": "任务次数"},
            ]
        },
        //清除Vip特权周礼包数据
        {"name": "清除Vip特权周礼包数据", "id": "clear_vip_priv_gift",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearVipPrivilegeData", "need_all_params": false,
            "inputList": [
            ]
        },
  ]
};

var cfgServerJson = {
    funcList:[
       // {"name": "修改服务器时间(单位：秒数)", "id": "server_time_set",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolServer", "need_all_params": true,
        //    "inputList": [
        //        {"name" : "time", "desc": "时间,修改服务器时间(单位：秒数)"}
        //    ]
        //},

        {"name": "设置活动通用服务器偏移时间(单位：秒数)", "id": "server_time_set",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolServer", "need_all_params": true,
            "inputList": [
            {"name" : "act_svr_time", "desc": "时间,设置活动通用服务器偏移时间(单位：秒数, 正数向后偏移，负数向前偏移)"}
            ]
        },

        {"name": "战斗力排行榜人气清零时间", "id": "fight_capacity_rank_praise_clear",  "url": "/cgi-bin/ranksvr_tool.sh?cmd=praise_clear_time", "need_all_params": true,
            "inputList": [
                {"name" : "time", "desc": "时间(周几/小时/分)"}
            ]
        },
        {"name": "战斗力排行榜上榜人数", "id": "fight_capacity_rank_top_num",  "url": "/cgi-bin/ranksvr_tool.sh?cmd=fight_capacity_rank_top_num", "need_all_params": true,
            "inputList": [
                {"name" : "num", "desc": "人数"}
            ]
        },
        {"name": "战斗力排行榜被点赞次数", "id": "fight_capacity_change_praise_times",  "url": "/cgi-bin/common_tool.sh?cmd=ToolsFightCapacityRankPraiseTimes", "need_all_params": true,
            "inputList": [
                {"name" : "praise_times", "desc": "被点赞次数"}
            ]
        },
        {"name": "战斗力排行榜当日点赞清零", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=TopRankFightCapacityPraiseTimesReset",
            "inputList": [
            ]
        },
        {"name": "生存挑战当日清零", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SurvivalChallengeReset",
            "inputList": [
            ]
        },
        {"name": "生存挑战数据操作", "id": "",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolSurvivalChallenge", "need_all_params": true,
            "inputList": [
                {"name" : "option", "desc": "1 获取数据; 2 设置数据"},
                {"name" : "data", "desc": "要设置的数据"}
            ]
        },
        {"name": "导出用户信息", "id": "enable_dungeon",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolCheckRoleDb",
            "inputList": [
            ]
        },
        {"name": "查询服务器公告", "id": "",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneSsQueryAnnounce",
            "inputList": [
            ]
        },
        {"name": "删除服务器公告", "id": "",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneSsDelAnnounce", "need_all_params": true,
            "inputList": [
                {"name" : "id", "desc": "公告id"},
                {"name" : "zone_type", "desc": "大区类型 wx_ios:1 wx_andriod:2 qq_ios:3 qq_andriod:4"},
            ]
        },
        {"name": "发布服务器公告", "id": "",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneSsPubAnnounce", "need_all_params": true,
            "inputList": [
                {"name" : "id", "desc": "公告id"},
                {"name" : "zone_type", "desc": "大区类型 wx_ios:1 wx_andriod:2 qq_ios:3 qq_andriod:4"},
                {"name" : "partition", "desc": "大区编号 0表示全部 1、2、3、4...表示具体大区编号"},
                {"name" : "appear", "desc": "公告出现时间"},
                {"name" : "disappear", "desc": "公告消失时间"},
                {"name" : "gap", "desc": "公告间隔时间"},
                {"name" : "start_stay", "desc": "公告开始停留时间"},
                {"name" : "end_stay", "desc": "公告结束停留时间"},
                {"name" : "show_place", "desc": "公告展示位置 0~256"},
                {"name" : "message", "desc": "公告内容"},
            ]
        },
        {"name": "发布跑马灯", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SendBroadcast", "need_all_params": true,
            "inputList": [
                {"name" : "type", "desc": "跑马灯类型"},
                {"name" : "digit1", "desc": "参数1"},
                {"name" : "digit2", "desc": "参数2"},
                {"name" : "digit3", "desc": "参数3"},
                {"name" : "digit4", "desc": "参数4"},
                {"name" : "content", "desc": "内容"},
            ]
        },
        {"name": "微信订阅立即推送", "id": "",  "url": "/cgi-bin/weixin_subscribe.sh?cmd=push", "need_all_params": true,
            "inputList": [
                {"name" : "msgid", "desc": "msgid"},
                {"name" : "user", "desc": "推送人"},
            ]
        },
        {"name": "微信订阅定时推送", "id": "",  "url": "/cgi-bin/weixin_subscribe_auto.sh?cmd=push", "need_all_params": true,
            "inputList": [
                {"name" : "user", "desc": "推送人"},
            ]
        },
  ]
};



///基本信息页
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
    {"name": "功勋", "id": "exploit", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "exploit", "desc": "填写要设置的功勋数值"}
            ]
        },
    {"name": "每日清除触发", "id": "daily_clean", "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolRoleDailyClean", "need_all_params": true,
            "inputList": [
                {"name": "clean", "desc": "立即触发每日清除，确认填1"}
            ]
        },
        {"name": "组织祈福次数", "id": "day_build_count", "url": "/cgi-bin/webtool?cmd=2",
            "inputList": [
                {"name": "day_build_count", "desc": "填写要设置的组织祈福次数"}
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

    //武斗祭 /cgi-bin/common_tool.sh?cmd=ZoneToolPvpRivalInfo
        {"name": "武斗祭对手的信息", "id": "pvp_rival",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolPvpRivalInfo", "need_all_params": true,
            "inputList": [
            ]
        },

        {
            "name": "踢用户下线", "id": "kick_player", "url": "/cgi-bin/do_lua_func.sh?lua_func=KickPlayer",
            "inputList": [
            ]
        },
        //删除用户 /cgi-bin/delete_user.sh?
        {
            "name": "删除用户", "id": "delete_all", "url": "/cgi-bin/delete_user.sh?", "need_all_params": true, "need_confirm": true,
            "inputList": [
            ]
        },

        {
            "name": "Dolua", "id": "do_lua", "url": "/cgi-bin/do_lua_string.sh?", "need_all_params": true,
            "inputList": [
                {"name": "lua_string", "desc": "lua命令"}
            ]
        },

        {
            "name": "导入玩家", "id": "import_player", "url": "/cgi-bin/do_import_player.sh?", "need_all_params": true,
            "inputList": [
                {"name": "src_svr", "desc": "从哪导玩家，外网填 idc 241环境填 test241"},
                {"name": "src_open_id", "desc": "源openid"},
                {"name": "src_zoneid", "desc": "源小区id（例如400001）"},
                {"name": "dest_svr", "desc": "哪入哪里，241环境填 test241"},
                {"name": "dest_open_id", "desc": "目标openid"},
                {"name": "dest_zone_id", "desc": "导入的小区，小区类型须与外网一致"}
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


//修改道具
var cfgAddJson = {
    funcList:[
        //增加忍者  /cgi-bin/addninja.sh&cmd=ZoneToolAddNinja&ninja_id=xx&ninja_level=xxx&all_params=ninja_id ninja_level
        //{"name": "增加忍者", "id": "ninjia",  "url": "/cgi-bin/addninja.sh?cmd=ZoneToolAddNinja", "need_all_params": true,
        {"name": "增加忍者、道具、勾玉等", "id": "ninjia",  "url": "/cgi-bin/do_lua_func.sh?lua_func=AddItem", "need_all_params": true,
            "inputList": [
                {"name" : "item_id", "desc": "物品id"},
                {"name" : "item_count", "desc": "物品数量"}
            ]
        },

    //通灵兽 /cgi-bin/common_tool.sh?cmd=ZoneToolModPsychic
        {"name": "通灵兽", "id": "psychic_info",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModPsychic", "need_all_params": true,
            "inputList": [
                {"name" : "skill_lvl", "desc": "通灵术的等级"},
            ]
        },

    //武斗祭 /cgi-bin/common_tool.sh?cmd=ZoneToolPvp
        {"name": "武斗祭", "id": "pvp_info",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolPvp", "need_all_params": true,
            "inputList": [
                {"name" : "score", "desc": "pvp的积分"},
            ]
        },

    {"name": "修改兵粮丸冷却时间", "id": "mode_noodle",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModeNoodle", "need_all_params": true,
            "inputList": [
        {"name": "cd", "desc": "cd"},
            ]
        },
    //邮件 /cgi-bin/common_tool.sh?cmd=ZoneToolMailSend
        {"name": "发送邮件", "id": "zone_mail",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolMailSend", "need_all_params": true,
            "inputList": [
                {"name" : "zone_id", "desc": "哪个区（如：400001）"},
                {"name" : "gid", "desc": "玩家的id"},
                {"name" : "title", "desc": "邮件标题"},
                {"name" : "contents", "desc": "邮件正文"},
                {"name" : "id1", "desc": "附件物品id"},
                {"name" : "count1", "desc": "附件物品数量"},
                {"name" : "id2", "desc": "附件物品id"},
                {"name" : "count2", "desc": "附件物品数量"},
                {"name" : "client_web_jump", "desc": "超链接"},
				{"name" : "send_cnt", "desc": "发送邮件的数量"}
            ]
        },
        {"name": "whosyourdaddy", "id": "whosyourdaddy",  "url": "/cgi-bin/do_lua_func.sh?lua_func=OneKeyBecomeKing",
            "inputList": [
            ]
        },
        {"name": "设置装备等级", "id": "EquipSetLvl",  "url": "/cgi-bin/do_lua_func.sh?lua_func=EquipSetLvl", "need_all_params": true,
            "inputList": [
                {"name" : "type", "desc": "装备类型(0~5)"},
                {"name" : "lvl", "desc": "装备等级"}
            ]
        },
        {"name": "设置装备阶数", "id": "EquipSetStage",  "url": "/cgi-bin/do_lua_func.sh?lua_func=EquipSetStage", "need_all_params": true,
            "inputList": [
                {"name" : "type", "desc": "装备类型(0~5)"},
                {"name" : "stage", "desc": "装备阶数"}
            ]
        },
        {"name": "添加装备进阶材料", "id": "EquipAddSlot",  "url": "/cgi-bin/do_lua_func.sh?lua_func=EquipOneKeyFillSlot", "need_all_params": true,
            "inputList": [
                {"name" : "type", "desc": "装备类型(0~5)"},
            ]
        },
        {"name": "一键全忍者", "id": "AddAllNinja",  "url": "/cgi-bin/do_lua_func.sh?lua_func=AddAllNinja",
            "inputList": [
            ]
        },
        {"name": "一键加忍者碎片", "id": "AddAllNinjaSlice",  "url": "/cgi-bin/do_lua_func.sh?lua_func=AddAllNinjaSlice",  "need_all_params": true,
            "inputList": [
                {"name" : "slice_cnt", "desc": "碎片数目"},
            ]
        },
     //密卷 /cgi-bin/common_tool.sh?cmd=ZoneToolPvp1v1ModScore
        {"name": "一键密卷满级", "id": "set_secret_scroll",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolSetSecretScroll", "need_all_params": true,
            "inputList": [
                {"name" : "level", "desc": "填1所有密卷满级"}
            ]
        },
        {"name": "设置天赋等级", "id": "TalentSetLvl",  "url": "/cgi-bin/do_lua_func.sh?lua_func=TalentSetLvl", "need_all_params": true,
            "inputList": [
                {"name" : "type", "desc": "天赋等级"},
            ]
        },
        {"name": "设置忍传感悟等级", "id": "NinjaSoulSetLvl",  "url": "/cgi-bin/do_lua_func.sh?lua_func=NinjaSoulSetLvl", "need_all_params": true,
            "inputList": [
                {"name" : "type", "desc": "感悟等级"},
            ]
        },
        {"name": "增加神器经验", "id": "AddArtifactExp",  "url": "/cgi-bin/do_lua_func.sh?lua_func=AddArtifactExp", "need_all_params": true,
            "inputList": [
                {"name" : "id", "desc": "神器ID"},
                {"name" : "exp", "desc": "经验值"}
            ]
        },
        {"name": "设置雕文属性比率", "id": "SetOrnamentationRate",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetOrnamentationRate", "need_all_params": true,
            "inputList": [
                {"name" : "artifact_id", "desc": "神器ID"},
                {"name" : "orn_idx", "desc": "雕文位置1-3"},
                {"name" : "atk_rate", "desc": "攻击比率"},
                {"name" : "def_rate", "desc": "防御比率"},
                {"name" : "hp_rate", "desc": "HP比率"}
            ]
        },
    ]
};

var cfgShopJson = {
    funcList:[
        //查询我的商店信息：/cgi-bin/webtool?cmd=3&query_shop=1
        //FIXME 当inputList为空时，对应的button直接默认为提交功能
        //{"name": "查询我的商店信息", "id": "query_shop",  "url": "/cgi-bin/webtool?cmd=3&query_shop=1",
        //    "inputList": [
        //    ]
       // },

        //设置今日刷新次数: /cgi-bin/webtool?cmd=3&refresh_times=xxx
       // {"name": "设置今日刷新次数", "id": "refresh_times",  "url": "/cgi-bin/webtool?cmd=3",
          //  "inputList": [
          //      {"name" : "refresh_times", "desc": "刷新次数"}
          //  ]
       // },

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

//PK相关
var cfgPkJson = {
    funcList:[
        //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolPvp1v1ModScore
        {"name": "决斗场积分", "id": "pvp_1v1_info",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolPvp1v1ModScore", "need_all_params": true,
            "inputList": [
                {"name" : "score", "desc": "决斗场的积分"},
            ]
        },
        {"name": "小队激斗（擂台赛)积分", "id": "challenge3v3_score",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GmToolChallenge3v3Score", "need_all_params": true,
            "inputList": [
                {"name" : "score", "desc": "显示分数"},
                {"name" : "elo_score", "desc": "隐藏分数"},
            ]
        },
        //清除决斗场及2v2的惩罚
        {"name": "清除决斗场及各种模式惩罚时间和异常次数", "id": "pvp_punish_clear",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolPunishClear",
            "inputList": [
            ]
        },

    //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolJdcModFight
        {"name": "决斗场及PVE(秘境)挑战次数", "id": "pvp_1v1_info_mod_fight",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolJdcModFight", "need_all_params": true,
            "inputList": [
                {"name" : "cnt", "desc": "挑战次数"},
            ]
        },

    //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolJdcModWeekWin
        {"name": "决斗场一周内获胜次数", "id": "pvp_1v1_info_mod_week_win",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolJdcModWeekWin", "need_all_params": true,
            "inputList": [
                {"name" : "cnt", "desc": "一周内获胜次数"},
            ]
        },

    //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolJdcModContinueWin
        {"name": "决斗场连胜次数", "id": "pvp_1v1_info_mod_continue_win",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolJdcModContinueWin", "need_all_params": true,
            "inputList": [
                {"name" : "cnt", "desc": "连胜次数"},
            ]
        },

    //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolJdcModContinueLose
        {"name": "决斗场连败次数", "id": "pvp_1v1_info_mod_continue_lose",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolJdcModContinueLose", "need_all_params": true,
            "inputList": [
                {"name" : "cnt", "desc": "连败次数"},
            ]
        },

    //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolJdcClearDailyReward
        {"name": "清除决斗场日奖励领奖情况", "id": "pvp_1v1_info_clear_daily",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolJdcClearDailyReward", "need_all_params": true,
            "inputList": [
            ]
        },

    //决斗场 /cgi-bin/common_tool.sh?cmd=ZoneToolJdcClearWeekWinReward
        {"name": "清除决斗场周奖励领奖情况", "id": "pvp_1v1_info_clear_reward",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolJdcClearWeekWinReward", "need_all_params": true,
            "inputList": [
            ]
        },
    {"name": "决斗场赛季清除名人堂数据", "id": "pvp_1v1_info_clear_hall",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolPvpSeasonHallOfFameClear", "need_all_params": true,
            "inputList": [
                {"name" : "season", "desc": "要清除哪个赛季"},
            ]
        },
        {"name": "赛事战斗次数设置", "id": "pvp_tournament_cnt_set",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetTournamentData", "need_all_params": true,
            "inputList": [
                {"name": "fight_cnt", "desc": "战斗次数"},
                {"name": "win_cnt", "desc": "获胜次数"},
                {"name": "rank", "desc": "排名"},
            ]
        },
        {"name": "清除赛事数据", "id": "pvp_tournament_clear",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearTournament", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "查询联系方式", "id": "pvp_tournament_contact",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GetTournamentContact", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "设置联系方式", "id": "pvp_tournament_set_contact",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetTournamentContact", "need_all_params": true,
            "inputList": [
                {"name" : "name", "desc": "名字"},
                {"name" : "phone_numer", "desc": "电话号码"},
            ]
        },

        {"name": "增加小队激斗宝箱", "id": "pvp_2v2_box",  "url": "/cgi-bin/do_lua_func.sh?lua_func=AddPvp2v2Box", "need_all_params": true,
            "inputList": [
                {"name": "box_id", "desc": "宝箱类型"},
            ]
        },
        {"name": "清除小队激斗宝箱清算标志", "id": "pvp_2v2_box",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearBoxSettleFlag", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "查询所在场景", "id": "get_scene",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GetScene", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "发送弹幕", "id": "send_barrage",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SendBarrage", "need_all_params": true,
            "inputList": [
                {"name": "dup_cnt", "desc": "发送弹幕重复次数"},
                {"name": "sys", "desc": "弹幕sys_id，填1代表场景 2代表ob"},
                {"name": "sub_sys", "desc": "在场景里填查询到的场景id，在ob里随便填"},
                {"name": "anchor", "desc": "在场景里填时间戳，在ob里面填帧号(帧号一般是1~2000)"},
                {"name": "msg", "desc": "弹幕内容"},
                {"name": "rand_range", "desc": "弹幕anchor随机范围，最后发出的实际anchor为所填anchor正负随机范围内"},
            ]
        },
        {"name": "清理限时背包", "id": "send_barrage",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearTimeLimitPack", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "增加决斗币", "id": "send_barrage",  "url": "/cgi-bin/do_lua_func.sh?lua_func=AddPvp1v1ExchangeCoin", "need_all_params": true,
            "inputList": [
                {"name": "amount", "desc": "增加决斗币数目"},
            ]
        },
        {"name": "设置周免偏移时间", "id": "send_barrage",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetWeeklyFreeOffset", "need_all_params": true,
            "inputList": [
                {"name": "time_gap", "desc": "时间间隔(秒)"},
            ]
        },
        {"name": "开启锦标赛", "id": "",  "url": "/cgi-bin/common_tool.sh?cmd=SceneChampionTestCreate", "need_all_params": true,
            "inputList": [
                {"name" : "gid_list", "desc": "参与者gid列表，通过分号;隔开"},
                {"name" : "npc_num", "desc": "填充机器人的数目，它与参与者数目之和不能大于max_numl"},
                {"name" : "bo_type", "desc": "bo1:1 bo3:2 "},
                {"name" : "mode", "desc": "决斗场段位:1 无差别淘汰赛:2"},
                {"name" : "prepare_time", "desc": "第一轮对局开始前的准备时间"},
                {"name" : "count_down_time", "desc": "每一轮开始前的倒计时时间"},
                {"name" : "fight_time", "desc": "单局pk的最长时间"},
                {"name" : "remain_time", "desc": "在产生冠军后保持时间"},
                {"name" : "match_gap_time", "desc": "两轮比赛之间间隔时间"},
            ]
        },
        {"name": "加入锦标赛", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GmToolChampEnter", "need_all_params": true,
            "inputList": [
                {"name" : "cid", "desc": "赛事id"},
                {"name" : "gids", "desc": "参与者,格式:gid或\\\"gid1_gid2_gid3\\\""},
            ]
        },
        {"name": "修改锦标赛开始时间", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GmToolChampBeginTime", "need_all_params": true,
            "inputList": [
                {"name" : "cid", "desc": "赛事id"},
                {"name" : "begin_time", "desc": "时间间隔(即几秒后开启)"},
            ]
        },
        {"name": "工具开启PvP玩法", "id": "",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolCreateGame", "need_all_params": true,
            "inputList": [
                {"name" : "playerid_list", "desc": "玩家列表，用英文逗号分割，设置小于10000代表机器人(包括0)"},
                {"name" : "query_spec", "desc": "查询说明书[1只进行查询, 0直接开启玩法]"},
                {"name" : "business_id", "desc": "BusinessId 说明书中有解释"},
                {"name" : "create_room", "desc": "是否创建玩法房间[0不创建, 1创建](跟玩法房间无关的PvP战斗填0)"},
            ]
        },
        {"name": "清除玩家状态", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearState", "need_all_params": false,
            "inputList": [
            ]
        },
    ]
};



var cfgStageJson = {
    funcList:[
        ///cgi-bin/common_tool.sh?cmd=ZoneToolModClientState&all_params=bit_count bit_value state&state=xxx&bit_count=xxx&bit_value=xxx
        {"name": "新手引导进度", "id": "guide",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModClientState", "need_all_params" : true,
            "inputList": [
                {"name": "state", "desc": "需要修改的状态"},
                {"name": "bit_count", "desc": "需要修改的该状态的位"},
                {"name": "bit_value", "desc": "需要修改的该状态的值  0或1"},
            ]
        },

    {"name": "妙木山跳到某个关卡", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=FairylandSetDungeon", "need_all_params": true,
            "inputList": [
        {"name": "gate_id", "desc": "妙木山关卡号(第几关即填几, 不是副本号！！！)"},
            ]
        },
        {"name": "妙木山设置重置次数", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=FairylandResetTimes", "need_all_params": true,
            "inputList": [
                {"name": "reset_times", "desc": "要设置的重置次数"},
            ]
        },

        {"name": "开启主线副本(到第X关/N关/全部)", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=OpenMainDungeon", "need_all_params": true,
            "inputList": [
                {"name" : "dungeon_id", "desc": "填关卡id或者要开启的关卡数目 0表示开启全部关卡"},
            ]
        },
        {"name": "开启精英副本(到第X关/N关/全部)", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=OpenEliteDungeon", "need_all_params": true,
            "inputList": [
                {"name" : "dungeon_id", "desc": "填关卡id或者要开启的关卡数目 0表示开启全部关卡"},
            ]
        },
        {"name": "刷新精英副本次数", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=RefreshEliteDungeon", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "清除主线副本", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearMainDungeon", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "清除精英副本", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearEliteDungeon", "need_all_params": false,
            "inputList": [
            ]
        },
        {"name": "查看副本数据", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GetDungeonInfo", "need_all_params": false,
            "inputList": [
            ]
        },
    ]
};

//组织，公会相关功能
var cfgGuildJson = {
    funcList:[
        {"name": "修改组织服务器偏移时间", "id": "modify_guild_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id, 随便一个存在的组织即可"},
                {"name": "svr_time_offset", "desc": "相对当前时间的偏移(影响所有人)，正往未来，负往过去，0重置"},
            ]
        },

        {"name": "创建组织", "id": "create_guild",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolCreateGuild",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_name", "desc": "组织名称"},
                {"name": "member_name", "desc": "首领名"},
            ]
        },
        {"name": "修改组织等级", "id": "guild_level",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "guild_level", "desc": "组织等级"},
            ]
        },
        {"name": "增减组织经验", "id": "guild_exp",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "guild_exp", "desc": "组织经验，正数为加，负数为减，注意不会被减降级"},
            ]
        },
        {"name": "修改成员人数上限", "id": "member_limited",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "member_limited", "desc": "成员上限。当组织等级变化时，这个设置会被重置"},
            ]
        },
        {"name": "解散时间", "id": "disband_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "disband_time", "desc": "将要解散的时间点。请填从1970-1-1起始的秒数，目前不支持其它样式"},
            ]
        },
    {"name": "清除公会24小时限制", "id": "quit_guild_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "quit_guild_time", "desc": "退出公会的时间。请填从1970-1-1起始的秒数，目前不支持其它样式"},
            ]
        },
        {"name": "上次改名时间", "id": "last_rename_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "last_rename_time", "desc": "组织上次改名的时间。请填从1970-1-1起始的秒数，目前不支持其它样式"},
            ]
        },
        {"name": "修改完美忍具数量", "id": "total_perfect_count",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "total_perfect_count", "desc": "仅修改数量，不会触发自动发奖励哦"},
            ]
        },
        {"name": "添加成员到组织", "id": "add_member",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolAddGuildMember",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "member_name", "desc": "成员名"},
                {"name": "fc", "desc": "成员战斗力"},
            ]
        },
    {"name": "清除叛忍活动", "id": "clear_beatninja",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
        {"name": "clear_beatninja", "desc": "删除击杀叛忍数据,填1"},
            ]
        },

    {"name": "叛忍活动，修改boss战斗力参考时间", "id": "beat_ninja_boos_day",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
        {"name": "beat_ninja_boos_day", "desc": "天数（重启之后失效）"},
            ]
        },
        {"name": "组织战时间，修改开启及结束时间", "id": "guildwar_setting_change",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolGuildwarSettingChange&open_date=0&open_time=0&settle_duration=0",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "week_day", "desc": "星期几 {0-6,4444:不开启，9999,每天开启}"},
                {"name": "open_duration", "desc": "开启时长（多少秒）"},
            ]
        },
        {"name": "跨服组织战，修改报名和开战时间", "id": "cross_guildwar_period",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "cross_guildwar_period", "desc": "设置跨服要塞战第几届"},
                {"name": "cgw_battle_before_time", "desc": "设置跨服要塞战几分钟后开战"},
                {"name": "cgw_battle_time", "desc": "设置跨服要塞战开战持续几分钟"},
            ]
        },

        {"name": "组织战活跃，修改活跃开启", "id": "guildwar_setting_change",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolGuildwarSettingChange",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "wau", "desc": "周活跃数"},
                {"name": "fort_count", "desc": "填0吧暂时没有用"},
            ]
        },
        {"name": "组织战排行榜修改", "id": "guildwar_setting_change",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolGuildwarSettingChange",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "fort_id", "desc": "要塞id"},
                {"name": "score", "desc": "分数"},
                {"name": "gid", "desc": "gid"},
                {"name": "streak", "desc": "连胜"},
            ]
        },
        {"name": "修改加入组织时间", "id": "last_boss_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "join_guild_time", "desc": "加入组织时间"},
                {"name": "gid","desc": "gid"},
		 {"name": "设置组织资金", "id": "guild_money",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
			    {"name": "guild_money", "desc": "填资金数"},
            ]
        },
        {"name": "修改追击晓组织boss刷新时间", "id": "last_boss_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "last_boss_refreash_time", "desc": "上次刷新boss的时间"},
            ]
        },
        {"name": "修改追击晓组织忍者刷新时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "last_ninja_refreash_time", "desc": "上次刷新忍者的时间"},
            ]
        },
        {"name": "修改追击晓组织boss当前血量", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "chase_xiao_boss_index", "desc": "boss索引"},
                {"name": "chase_xiao_boss_now_hp","desc": "boss当前血量"},
            ]
        },
        {"name": "修改追击晓组织boss死亡时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "chase_xiao_boss_index", "desc": "boss索引"},
                {"name": "chase_xiao_boss_dead_time","desc": "boss死亡时间"},
            ]
        },
        {"name": "修改上周密令", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "chase_xiao_ninja_id", "desc": "命令个数"},
            ]
        },
        {"name": "修改comm_data追击晓组织平均战斗力数值", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "zone_avg_fighting_capacity", "desc": "战斗力数值"},
            ]
        },
        {"name": "修改comm_data追击晓组织刷新boss时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "last_boss_refreash_time", "desc": "刷新boss时间"},
            ]
        },
        {"name": "修改comm_data追击晓组织刷新忍者时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "last_ninja_refreash_time", "desc": "刷新忍者时间"},
            ]
        },
        {"name": "修改comm_data追击晓组织系统的时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "now_time", "desc": "追击晓组织的系统时间"},
            ]
        },

    ]
        },
        {"name": "修改组织矿洞数据", "id": "guild_money",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolGuildMineModify",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_mine", "desc": "矿洞资金数量,0为不修改数据"},
                {"name": "mine_level", "desc": "矿洞等级， 0为不修改等级"},
			    {"name": "clear_dig_limit", "desc": "是否限制矿洞挖掘限制,1为清除"},
			    {"name": "clear_transport_cnt", "desc": "清除矿洞运输次数，1清除,0不清除"},
            ]
        },
        {"name": "修改加入组织时间", "id": "last_boss_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "join_guild_time", "desc": "加入组织时间"},
                {"name": "gid","desc": "gid"},
            ]
        },
        {"name": "修改追击晓组织boss刷新时间", "id": "last_boss_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "last_boss_refreash_time", "desc": "上次刷新boss的时间"},
            ]
        },
        {"name": "修改追击晓组织忍者刷新时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "last_ninja_refreash_time", "desc": "上次刷新忍者的时间"},
            ]
        },
        {"name": "修改追击晓组织boss当前血量", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "chase_xiao_boss_index", "desc": "boss索引"},
                {"name": "chase_xiao_boss_now_hp","desc": "boss当前血量"},
            ]
        },
        {"name": "修改追击晓组织boss死亡时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "chase_xiao_boss_index", "desc": "boss索引"},
                {"name": "chase_xiao_boss_dead_time","desc": "boss死亡时间"},
            ]
        },
        {"name": "修改追击晓组织选择的忍者", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "chase_xiao_ninja_id", "desc": "忍者id"},
                {"name": "gid","desc": "gid"},
            ]
        },
        {"name": "修改comm_data追击晓组织平均战斗力数值", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "zone_avg_fighting_capacity", "desc": "战斗力数值"},
            ]
        },
        {"name": "修改comm_data追击晓组织刷新boss时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "last_boss_refreash_time", "desc": "刷新boss时间"},
            ]
        },
        {"name": "修改comm_data追击晓组织刷新忍者时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "last_ninja_refreash_time", "desc": "刷新忍者时间"},
            ]
        },
        {"name": "修改comm_data追击晓组织系统的时间", "id": "last_ninja_refreash_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildCommData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "now_time", "desc": "追击晓组织的系统时间"},
            ]
        },
        {"name": "修改强者对决资格赛boss当前血量", "id": "sb_qr_boss_now_hp",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "sb_qr_boss_now_hp","desc": "boss当前血量"},
            ]
        },
        {"name": "修改强者对决资格赛上次刷新时间", "id": "sb_qr_last_refresh_time",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "sb_qr_last_refresh_time","desc": "上次刷新时间"},
            ]
        },
        {"name": "修改强者对决资格赛已经挑战的次数", "id": "sb_qr_has_challenge_times",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "sb_qr_has_challenge_times","desc": "已经挑战的次数"},
                {"name": "gid","desc": "gid"},
            ]
        },
        {"name": "修改强者对决资格赛击退boss奖励标志", "id": "sb_qr_has_challenge_times",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "sb_qr_repel_boss_prize_flag","desc": "击退boss奖励标志"},
                {"name": "gid","desc": "gid"},
            ]
        },
        {"name": "修改强者对决：匹配数据", "id": "sb_match_opp_zone_id",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "sb_match_opp_zone_id","desc": "对手所在大区id"},
                {"name": "sb_match_opp_guild_id","desc": "对手组织id"},
                {"name": "sb_match_opp_guild_name","desc": "对手组织名字"},
                {"name": "sb_match_opp_rank","desc": "对手排名"},
                {"name": "sb_match_self_rank","desc": "自己排名"},
                {"name": "sb_match_state","desc": "数据状态：设置2代表有对手了"},
            ]
        },
        {"name": "祈愿系统清理", "id": "modify_guild_time",  "url": "/cgi-bin/do_lua_func.sh?lua_func=GuildWishClearData",
            "need_all_params" : true,
            "inputList": [
                {"name": "clear_wish_cd", "desc": "清理许愿符CD填1，其他填0"},
                {"name": "present_cnt", "desc": "设置赠送次数"},
                {"name": "clear_box", "desc": "清理宝箱填1，其他填0"},
                {"name": "clear_week_clean", "desc": "清理周清时间填1，其他填0"},
            ]
        },
        {"name": "师生修炼", "id": "guild_apprentice",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolModifyGuildData",
            "need_all_params" : true,
            "inputList": [
                {"name": "guild_zone", "desc": "组织所在的zoneid, 形如400001等"},
                {"name": "guild_id", "desc": "组织id，请在游戏内组织详情中查看"},
                {"name": "gid","desc": "gid"},
                {"name": "guild_apprentice", "desc": "1-解除师生关系"},
            ]
        },

    ]
};


var cfgFriendJson = {
    funcList:[
        {"name": "修改friendsvr时间偏移", "id": "set_friend_server_time",  "url": "/cgi-bin/do_lua_func.sh?lua_func=TestSetSvrTime", "need_all_params": true,
            "inputList": [
                {"name" : "dist_time", "desc": "时间偏移/秒 可正可负"},
            ]
        },
        {"name": "使用预设平台好友", "id": "add_plat_friend",  "url": "/cgi-bin/do_lua_func.sh?lua_func=TestAddPlatFriend", "need_all_params": true,
            "inputList": [
                {"name" : "is_quit", "desc": "是否退出使用预设好友列表 0不退出 1退出"},
                {"name" : "use_openid_num", "desc": "使用测试openid的个数"},
            ]
        },
    	{"name": "按照老的方式添加单向好友", "id": "add_old_game_friend",  "url": "/cgi-bin/do_lua_func.sh?lua_func=TestAddOldGameFriend", "need_all_params": true,
            "inputList": [
                {"name" : "gid", "desc": "被添加的好友gid"},
                {"name" : "zoneid", "desc": "被添加的好友zoneid"},
                {"name" : "openid", "desc": "被添加的好友openid"},
            ]
        },
  ]
};

var cfgActJson = {
    funcList:[
        {"name": "玩家时间设置", "id": "time_shift",  "url": "/cgi-bin/time_shift.sh?cmd=ZoneToolTimeShift", "need_all_params": true,

            "inputList": [
                {"name": "clear", "desc": "0：清除设置  1：设置"},
                {"name": "year", "desc": "希望设置的年"},
                {"name": "month", "desc": "希望设置的月"},
                {"name": "day", "desc": "希望设置的日"},
                {"name": "hour", "desc": "希望设置的小时"},
                {"name": "minute", "desc": "希望设置的分"},
                {"name": "second", "desc": "希望设置的秒"},
            ]
  },
    {"name": "清除活动数据", "id": "clear_act_data",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearActData", "need_all_params": true,
        "inputList": [
            {"name" : "act_id", "desc": "活动id"},
        ]
    },
        {"name": "月登陆数据重置", "id": "reset_month_signin",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolActMonthSigninReset", "need_all_params": true,

            "inputList": [
                {"name": "day_in_month", "desc": "在该月里面的天数"},
                {"name": "clear_got", "desc": "领奖重置，0:未领 1:已领"},
            ]
  },

       {"name": "月卡数据重置", "id": "reset_month_card",  "url": "/cgi-bin/common_tool.sh?cmd=ZoneToolActMonthCardReset", "need_all_params": true,

            "inputList": [
                {"name": "day_in_month", "desc": "在该月里面的天数"},
                {"name": "clear_got", "desc": "领奖重置，0:未领 1:已领"},
                {"name": "set_rebuy", "desc": "设置续费，0:未续费 1:已续费"},
                {"name": "day_recharge_rmb", "desc": "当天已充值金额"},
            ]
  },
    {"name": "设置用户登出时间(uinx时间戳)", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetLogoutTime", "need_all_params": true,
        "inputList": [
            {"name" : "timestamp", "desc": "时间戳"},
        ]
    },
    {"name": "设置用户登录时间(uinx时间戳)", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetLoginTime", "need_all_params": true,
        "inputList": [
            {"name" : "timestamp", "desc": "时间戳"},
        ]
    },
	{"name": "所有任务重置(重返木叶2.0)", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ResetMuYeTask", "need_all_params": true,
        "inputList": [
            ]
    },
    {"name": "批量生成测试机器人(极限挑战)", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=UCGenerateRobots", "need_all_params": true,
        "inputList": [
            {"name": "name", "desc": "机器人名字前缀（可以用来区分活跃度）"},
            {"name": "zone", "desc": "区"},
            {"name": "last_login_time", "desc": "上次登录时间(时间戳)"},
            {"name": "low_fc", "desc": "最低战力"},
            {"name": "high_fc", "desc": "最高战力"},
            {"name": "num", "desc": "生成数量"},
        ]
    },
    {"name": "重置ios3元直购礼包", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=CleariOSPurchaseGift",
        "inputList": [
        ]
    },

    {"name": "设置充值返还数据", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SetRechargeData", "need_all_params": true,
        "inputList": [
            {"name": "count", "desc": "充值金额"},
            {"name": "level", "desc": "等级"},
        ]
    },
    {"name": "发送活动请求", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SendInnerReq", "need_all_params": true,
        "inputList": [
            {"name": "act_id", "desc": "活动id"},
            {"name": "cmd", "desc": "命令字"},
            {"name": "inner_cmd", "desc": "内部字"},
            {"name": "req", "desc": "query_string"},
        ]
    },

    {"name": "修改追击晓组织数据（玩家）", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ModifyRoleChaseXiaoInfo", "need_all_params": true,
        "inputList": [
            {"name": "data1", "desc": "boss奖励标志（-1代表不修改这个字段）"},
            {"name": "data2", "desc": "已经购买的挑战次数（-1代表不修改这个字段）"},
            {"name": "data3", "desc": "已经挑战的次数（-1代表不修改这个字段）"},
            {"name": "data4", "desc": "更新boss的奖励时间（-1代表不修改这个字段，如果发现已改变则会修改boss奖励标志）"},
        ]
    },

    {"name": "强者对决:发送匹配请求", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=SendSBQRReportReqToGlobalSvr", "need_all_params": true,
        "inputList": [
            {"name": "begin_time", "desc": "开始时间"},
            {"name": "end_time", "desc": "结束时间"},
            {"name": "fight", "desc": "战斗力"},
            {"name": "guild_id", "desc": "guild_id"},
            {"name": "guild_zone_id", "desc": "guild_zone_id"},
            {"name": "name", "desc": "name"},
        ]
    },

    {"name": "清除直购礼包活动(101)数据", "id": "",  "url": "/cgi-bin/do_lua_func.sh?lua_func=ClearAct101Data", "need_all_params": false,
        "inputList": [
        ]
    },
  ]
};

