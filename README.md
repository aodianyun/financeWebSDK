#功能模块HTML嵌入


欢迎使用[金融解决方案](http://finance.aodianyun.com/info.html)HTML模块 目前模块有 `聊天模块` `问答模块` `用户列表`

这些模块依赖于 `jquery1.10` 及以上版本 和 `dmshub.js`(支持https)，使用之前需在[金融解决方案后台](http://finance.aodianyun.com/admin/)创建房间

引用 地址： `<script src="http://finance.aodianyun.com/dist/sdk/dmshub.js?v=1.0.0"></script>`

CDN 地址 `<script src="http://static.douyalive.com/dist/sdk/dmshub.js?v=1.0.0"></script>`

demo:

以下页面均为静态页面  当前用户信息会存储在session中  请使用不同浏览器或隐身窗口 分别打开测试页面

[简单视频聊天页面](http://aodianyun.github.io/financeWebSDK/caijing.html?nick=张三&uid=10001)

`http://aodianyun.github.io/financeWebSDK/caijing.html?nick=张三&uid=10001`

[简单视频聊天页面 手机版](http://aodianyun.github.io/financeWebSDK/caijingmobile.html?nick=李四&uid=10002)

`http://aodianyun.github.io/financeWebSDK/caijingmobile.html?nick=李四&uid=10002`

[简单视频聊天页面 后台审核页面](http://finance.aodianyun.com/admin/mcsblock/wisreview?token=a07dVZvHzZPe8GZEAePcC3loHl8Tn5cBXyPpy3qrcdyLqCFhBCbaBJXQdbox)

`http://finance.aodianyun.com/admin/mcsblock/wisreview?token=a07dVZvHzZPe8GZEAePcC3loHl8Tn5cBXyPpy3qrcdyLqCFhBCbaBJXQdbox`

[视频+PPT+聊天+问答](http://aodianyun.github.io/financeWebSDK/index.html?nick=隔壁老王&uid=10003)

`http://aodianyun.github.io/financeWebSDK/index.html?nick=隔壁老王&uid=10003`

[视频+PPT+聊天+问答 手机版](http://aodianyun.github.io/financeWebSDK/mobile.html?nick=测试人员&uid=10004)

`http://aodianyun.github.io/financeWebSDK/mobile.html?nick=测试人员&uid=10004`


[视频+PPT+聊天+问答 后台审核页面](http://finance.aodianyun.com/admin/mcsblock/wismgr?token=a07dVZvHzZPe8GZEAePcC3loHl8Tn5cBXyPpy3qrcdyLqCFhBCbaBJXQdbox)

`http://finance.aodianyun.com/admin/mcsblock/wismgr?token=a07dVZvHzZPe8GZEAePcC3loHl8Tn5cBXyPpy3qrcdyLqCFhBCbaBJXQdbox`

注： **本demo仅供展示使用不可用于其他用途** 对应测试房间为 1478， 发布视频可使用 [MCS直播工具](http://www.aodianyun.com/aodianyun_doc/301) （直播账号 `dyy42446555` 密码 `123456`)
或者使用OBS等推流软件 推流地址：`rtmp://13830.lsspublish.aodianyun.com/dyy_1736_133/a0c3d2dd3b4688f31da13991477980d9`

对应[金融解决方案后台管理帐号](http://finance.aodianyun.com/admin/)为  demo  密码为  demo （**请不要修改密码**）

## 使用方法

``` html
<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
<script src="http://finance.aodianyun.com/dist/sdk/dmshub.js?v=1.0.0>"></script>
<link rel="stylesheet" type="text/css" href="./statics/css/common.css">

<!--嵌入播放器 objectPlayer对象可用，具体请阅读objectPlayer相关文档-->
<div id="play-container" class="video-box"></div>
<script type="text/javascript" src="http://finance.aodianyun.com/helper/room_player.js?r=1478&id=play-container&chat=0"></script>

<!--嵌入PPT白板 WISExchange对象可用，具体请阅读WISExchange相关文档-->
<iframe id="wis-container" class="white-box"></iframe>
<script type="text/javascript" src="http://finance.aodianyun.com/helper/room_wis.js?r=1478&id=wis-container"></script>
    
<!--聊天栏 请阅读聊天栏文档 按需求操作并引用依赖的js和css-->
<div class="chat"></div>
<script src="./statics/js/mychat.js"></script>
<script src="./statics/js/jquery.qqFace.js"></script>

<!--问答栏 请阅读问答栏文档 按需求操作并引用依赖的js和css-->
<div class="ask"></div>
<script src="./statics/js/myask.js"></script>

<!--用户列表栏 请阅读用户列表文档 按需求操作并引用依赖的js和css-->
<div class="userlist-div"></div>
<script src="./statics/js/userlist.js"></script>
    
<script type="text/javascript">
    var dmsObj = new DmsHub({
        debug: true,  //是否开启debug 开启之后会有 console.log 打印的调试信息
        room_id: 73,  //房间id 需要在 金融解决方 后台创建房间  必选
        uid: 100001,   //当前用户 uid 唯一标识  必选
        nick: '测试用户',  //当前用户 昵称  必选
        ava: '',  //用户头像 默认为 默认头像
        rank: 100,  //用户排序值 为大于0的整数 影响用户列表排序 数值小的排在前面  默认为当前时间戳
        ext: ''  //额外参数 格式为字符串 你可以用来扩展 用户角色、等级、性别等信息  默认为空
    }, function () {  //连接成功后的回调  可以在这里加载模块
        this.debug && console.log(this);
        //聊天栏初始化
        var chatObj = $('.chat').chatlist({
            config: this,        //配置信息
            emotionPath: 'statics/img/arclist/', //表情存放路径
            emotionbtn: 'statics/img/emotion.png', //表情按钮路径
            systemImg: 'statics/img/system.png'   //系统提示图片路径
        });
        //问答栏初始化
        var askObj = $('.ask').asklist({
            config: this                 //配置信息
        });
        //用户列表初始化
        var userObj = $('.userlist-div').userlist({
            config: this                 //配置信息
        });
    });
    
    /* 为关心的事件绑定回调函数 */
    dmsObj.onMsg('chat',   //关注cmd为chat的消息（聊天消息）
        function(dms_topic, dms_data){  //收到消息的回调函数 dms_topic 为话题 dms_data 为消息内容
            this.debug && console.log('topic:', dms_topic, ', data:', dms_data);
        }, function(dms_topic, dms_data){  //消息过滤函数  返回true时才会调用回调函数
            return true;
    });
    dmsObj.onEnter(function(user_data){  //有用户进入房间时的回调函数 
        this.debug && console.log('onEnter:', user_data);
        /*user_data 格式为 {
            ava: "http: //abc.com/xxx.png",  
            ext: "", 
            nick: "测试", 
            room_id: 73, 
            uid: "1213123",  //用户信息
            state: 1,   // 1表示进入房间  0表示退出房间
            time: 1479205467,   // 进入或退出的时间戳 单位秒
            total: 3   //当前房间在线人数
        }
        */
    });
    dmsObj.onLeave(function(user_data){ this.debug && console.log('onLeave:', user_data); });  //有用户离开房间时的回调函数 参数同上
    
    dmsObj.onStartPublish(function(dms_data){  //当前房间 开始直播的回调函数
        this.debug && console.log('onStartPublish:', dms_data);
        /*dms_data 格式为 {
            time: 1479206692  //开始直播 或 停止直播 的时间戳 单位秒
        }
        */
    });
    dmsObj.onStopPublish(function(dms_data){ this.debug && console.log('onStopPublish:', dms_data); });  //当前房间 停止直播的回调函数 参数同上

    /* 还有一些和具体功能模块相关的API接口及辅助方法 会在具体模块中用到 */
</script>
```

## 聊天模块 （mychat.js）

聊天模块提供基本的文字和表情聊天功能，后台提供对应的关键词过滤及聊天审核功能

你可以自己扩展 私聊、赠送礼物、发送图片 等功能

### 依赖文件 

1. 插件 `./statics/js/mychat.js`

2. 表情插件  pc页面 `./statics/js/jquery.qqFace.js`  手机页面 `./statics/js/jquery.qqFace.mobile.js`

注：demo需加载  `./statics/css/common.css`


### 使用方法

在 `DmsHub` 的回调中 使用 `$('.chat').chatlist()` 加载聊天模块

``` html
<div class="chat"></div>
<script src="./statics/js/mychat.js"></script>

<script type="text/javascript">
    var dmsObj = new DmsHub({
        room_id: 73,
        uid: 'YK-46312',
        nick: '游客',
    }, function () {
        var chatObj = $('.chat').chatlist({
            config: this,                 //配置信息
            emotionPath: 'statics/img/arclist/', //表情存放路径
            emotionbtn: 'statics/img/emotion.png', //表情按钮路径
            systemImg: 'statics/img/system.png',   //系统提示图片路径
            phone: false   //是否手机版页面  会影响聊天框模版的选择
        }); 
    });
</script>
```

你可以自己修改 聊天框的结构和样式  主要需要修改插件代码中的html模版及以下函数

> appentList方法

```javascript
chatF.prototype.appentList = function(data){  // 收到聊天信息时及调用此方法
    /* data 格式为 {
        ava: "/dist/dyy/view/jiaoyu/mobile/images/male.png",
        cmd: "chat",
        content: "hjahd",  // 聊天内容
        ext: "",
        msg_id: 481,  // 聊天消息id
        nick: "游客",
        rank: 0,
        room_id: 1480,
        time: 1481087775,
        uid: "YK-23829",
    } */
}

```

> appentSystemList方法

```javascript
chatF.prototype.appentSystemList = function(data){   // 当有用户进入房间时及调用此方法
    /* data 格式 参照 dmsObj.onEnter */
}
```

## 问答模块 （myask.js）

问答模块提供基本的提问功能，后台提供提问审核及回答功能

### 依赖文件 

1. 插件 `./statics/js/myask.js`

注：demo需加载  `./statics/css/common.css`

### 使用方法

在 `DmsHub` 的回调中 使用 `$('.ask').asklist()` 加载问答模块


``` html
<div class="ask"></div>
<script src="./statics/js/myask.js"></script>

<script type="text/javascript">
    var dmsObj = new DmsHub({
        room_id: 73,
        uid: 'YK-46312',
        nick: '游客',
    }, function () {
        var askObj = $('.ask').asklist({
            config: this,                 //配置信息
        }); 
    });
</script>
```
你可以自己修改 问答框的结构和样式  主要需要修改插件代码中的html模版及以下函数

> appentList方法

```javascript
askF.prototype.appentList = function(data){    // 收到提问信息时及调用此方法
    /* data格式为 {
        ava: "/dist/dyy/view/jiaoyu/mobile/images/male.png",
        cmd: "addquestion",
        content: "有人在吗？",  // 提问内容
        ext: "",
        msg_id: 481,  // 提问消息id
        nick: "游客",
        rank: 0,
        room_id: 1480,
        time: 1481087775,
        uid: "YK-23829",
    } */
}
```

> reply方法

```javascript
askF.prototype.reply = function(data){   // 收到提问信息时及调用此方法
    /* data格式为 {
        ava: "/dist/dyy/view/jiaoyu/mobile/images/male.png",
        cmd: "answer",
        content: "哈哈哈哈哈",
        msg_id: "479",  // 指向回答的 提问的消息 id
        nick: "助理",
        room_id: 1480,
        time: 1481087626,
        uid: 101,
    } */
}
```

## 用户列表模块 (userlist.js）

问答模块提供基本当前房间在线用户显示功能，`DmsHub` 中传入的 `rank` 用于排序

你可以自己扩展 白名单、黑名单、管理员 等功能

### 依赖文件 

1. 插件 `./statics/js/userlist.js`

注：demo需加载  `./statics/css/common.css`

### 使用方法

在 `DmsHub` 的回调中 使用 `$('.userlist').userlist()` 加载问答模块


``` html
<div class="userlist"></div>
<script src="./statics/js/userlist.js"></script>

<script type="text/javascript">
    var dmsObj = new DmsHub({
        room_id: 73,
        uid: 'YK-46312',
        nick: '游客',
    }, function () {
        //用户列表初始化
        var userObj = $('.userlist').userlist({
            config: this                 //配置信息
        });
    });
</script>
```

你可以自己修改 用户列表的结构和样式  主要需要修改插件代码中的html模版及以下函数

> appentList方法

```javascript
userF.prototype.appentList = function(data){  // 根据具体用户信息 生成列表
    /* data 格式为 {
        ava: "/dist/dyy/view/jiaoyu/mobile/images/male.png",
        nick: "助理",
        room_id: 1480,
        rank: 0,
        ext: "",
        uid: 101,
    } */
}
```