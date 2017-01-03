function JiaoYuUserInfoHelper(){
    var _this = this;
    this.DEBUG = true;
    this._log_func = (typeof console != "undefined" && typeof console.info == "function" && typeof console.warn == "function") ? {INFO: console.info.bind(console), ERROR: console.warn.bind(console)} : {};
    this.exports = {};
    
    this.formatDate = function(){
        var now = new Date(new Date().getTime());
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        if(minute < 10){
            minute = '0' + minute.toString();
        } 
        var seconds = now.getSeconds()
        if(seconds < 10){
            seconds = '0' + seconds.toString();
        }
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
    }
    
    this.rfcApi = function(type, url, _args, success, error, log){
        var args = _args ? _args : {};
        var start_time = new Date().getTime();
        if( typeof CSRF_TOKEN != "undefined" && CSRF_TOKEN && args ){
            args.csrf = CSRF_TOKEN;
        }
        $.ajax({
            type: type,
            url: url,
            data: args,
            dataType: 'json',
            success:
                function(data) {
                    var use_time = Math.round( (new Date().getTime() - start_time) );
                    if(data.Flag == 100){
                        log('INFO', use_time, args, data);
                        typeof(success) == 'function' && success(data);
                    } else {
                        log('ERROR', use_time, args, data);
                        typeof(error) == 'function' && error(data);
                    }
                }
        });
    }

    /**
     * 用户发送 dms 消息
     * @param string $token
     * @param $dmsData  array  消息数据
     * @return array ['Flag'=>100, 'FlagString'=>'退出成功'];
     */
    this.dmsAuthMsgPublish = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.dmsAuthMsgPublish('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/dmsAuthMsgPublish' ,args, success, error, log);
    }
    this.dmsAuthMsgPublish_args = {"token":"?","dmsData":["?","..."]};
    
    this.exports.dmsAuthMsgPublish = this.dmsAuthMsgPublish;
    this.exports.dmsAuthMsgPublish_args = this.dmsAuthMsgPublish_args;

    /**
     * 用户发送 dms 消息
     * @param $room_id  int  房间room_id
     * @param $dmsData  array  消息数据
     * @return array ['Flag'=>100, 'FlagString'=>'退出成功'];
     */
    this.dmsMsgPublish = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.dmsMsgPublish('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/dmsMsgPublish' ,args, success, error, log);
    }
    this.dmsMsgPublish_args = {"room_id":"?","dmsData":["?","..."]};
    
    this.exports.dmsMsgPublish = this.dmsMsgPublish;
    this.exports.dmsMsgPublish_args = this.dmsMsgPublish_args;

    
    this.delQuestion = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.delQuestion('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/delQuestion' ,args, success, error, log);
    }
    this.delQuestion_args = {"token":"?","msg_id":"?"};
    
    this.exports.delQuestion = this.delQuestion;
    this.exports.delQuestion_args = this.delQuestion_args;

    /**
     * 直播间发布提问
     * @param int $room_id 房间id
     * @param array $dmsData 提问内容
     * @return array ['Flag' => 101, 'FlagString' => '参数错误']
     *               ['Flag' => 103, 'FlagString' => '房间被冻结']
     *              ['Flag' => 103, 'FlagString' => '禁止问答']
     *              ['Flag' => 106, 'FlagString' => '您提问过快，请稍候再试']
     */
    this.dmsQuestionPublish = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.dmsQuestionPublish('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/dmsQuestionPublish' ,args, success, error, log);
    }
    this.dmsQuestionPublish_args = {"room_id":"?","dmsData":["?","..."]};
    
    this.exports.dmsQuestionPublish = this.dmsQuestionPublish;
    this.exports.dmsQuestionPublish_args = this.dmsQuestionPublish_args;

    /**
     * 用户发送题目
     * @param int $room_id 直播间id
     * @param int $uid 用户uid
     * @param string $content 提问内容
     * @return array ['Flag' => 101, 'FlagString' => '参数错误']
     *                ['Flag' => 103, 'FlagString' => '房间被冻结']
     *                ['Flag' => 103, 'FlagString' => '禁止问答']
     *                ['Flag' => 106, 'FlagString' => '您提问过快，请稍候再试']
     */
    this.sendQuestion = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.sendQuestion('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/sendQuestion' ,args, success, error, log);
    }
    this.sendQuestion_args = {"room_id":"?","uid":"?","content":"?"};
    
    this.exports.sendQuestion = this.sendQuestion;
    this.exports.sendQuestion_args = this.sendQuestion_args;

    /**
     * 主播回复
     * @param string $token
     * @param int $msg_id
     * @param string $content
     * @return array ['Flag' => 102, 'FlagString' => '认证错误']
     *                ['Flag' => 103, 'FlagString' => '消息不存在']
     */
    this.sendAnswer = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.sendAnswer('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/sendAnswer' ,args, success, error, log);
    }
    this.sendAnswer_args = {"token":"?","msg_id":"?","content":"?"};
    
    this.exports.sendAnswer = this.sendAnswer;
    this.exports.sendAnswer_args = this.sendAnswer_args;

    /**
     * 后台审核 清空所有 dms 消息
     * @param string $token
     * @return array ['Flag'=>100, 'FlagString'=>'删除成功'];
     */
    this.delMsgReview = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.delMsgReview('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/delMsgReview' ,args, success, error, log);
    }
    this.delMsgReview_args = {"token":"?"};
    
    this.exports.delMsgReview = this.delMsgReview;
    this.exports.delMsgReview_args = this.delMsgReview_args;

    /**
     * 后台审核 清空所有 提问 消息
     * @param string $token
     * @return array ['Flag'=>100, 'FlagString'=>'删除成功'];
     */
    this.delQuestionReview = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.delQuestionReview('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/delQuestionReview' ,args, success, error, log);
    }
    this.delQuestionReview_args = {"token":"?"};
    
    this.exports.delQuestionReview = this.delQuestionReview;
    this.exports.delQuestionReview_args = this.delQuestionReview_args;

    /**
     * 后台审核 发布 dms 消息
     * @param string $token
     * @param string $uid
     * @param int $msg_id
     * @param string $msg_topic
     * @param string $msg_cmd
     * @param int $state 2 发布  9 删除
     * @param string $create_time_s
     * @param string $create_time_e
     * @param string $uptime_s
     * @param string $uptime_e
     * @param int $start
     * @param int $limit
     * @param array $sort_option
     * @return array ['Flag' => 100, 'rows' => $list, 'results' => $total];
     */
    this.listMsgReview = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.listMsgReview('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/listMsgReview' ,args, success, error, log);
    }
    this.listMsgReview_args = {"token":"?","uid":"","msg_id":0,"msg_topic":"","msg_cmd":"","state":1,"create_time_s":"","create_time_e":"","uptime_s":"","uptime_e":"","start":0,"limit":0,"sort_option":{"field":"create_time","direction":"decs"}};
    
    this.exports.listMsgReview = this.listMsgReview;
    this.exports.listMsgReview_args = this.listMsgReview_args;

    /**
     * 后台审核 发布 dms 消息
     * @param string $token
     * @param int $msg_id
     * @param int $state 2 发布  9 删除
     * @return array ['Flag'=>100, 'FlagString'=>'退出成功'];
     */
    this.dmsMsgReview = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.dmsMsgReview('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/dmsMsgReview' ,args, success, error, log);
    }
    this.dmsMsgReview_args = {"token":"?","msg_id":"?","state":"?"};
    
    this.exports.dmsMsgReview = this.dmsMsgReview;
    this.exports.dmsMsgReview_args = this.dmsMsgReview_args;

    /**
     * 获取教育模版 文档列表
     * @param string $token 认证token
     * @param int $page 页数
     * @param int $num 每页数量
     * @return array $rst
     */
    this.listWisDoc = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.listWisDoc('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/listWisDoc' ,args, success, error, log);
    }
    this.listWisDoc_args = {"token":"?","page":1,"num":10};
    
    this.exports.listWisDoc = this.listWisDoc;
    this.exports.listWisDoc_args = this.listWisDoc_args;

    /**
     * 获取单条白板录制信息
     * @param string $token  认证token
     * @param string $recordId  录制id
     * @return array $rst
     */
    this.getWisRecordInfo = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.getWisRecordInfo('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/getWisRecordInfo' ,args, success, error, log);
    }
    this.getWisRecordInfo_args = {"token":"?","recordId":"?"};
    
    this.exports.getWisRecordInfo = this.getWisRecordInfo;
    this.exports.getWisRecordInfo_args = this.getWisRecordInfo_args;

    /**
     * 删除教育模版 文档
     * @param string $token  认证token
     * @param int $doc_id  文档id
     * @return array $rst
     */
    this.delWisDoc = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.delWisDoc('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/delWisDoc' ,args, success, error, log);
    }
    this.delWisDoc_args = {"token":"?","doc_id":"?"};
    
    this.exports.delWisDoc = this.delWisDoc;
    this.exports.delWisDoc_args = this.delWisDoc_args;

    /**
     * 获取教育房间 白板wis录制列表
     * @param string $token  认证token
     * @param int $page
     * @param int $num
     * @return array
     */
    this.listWisReplay = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.listWisReplay('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/listWisReplay' ,args, success, error, log);
    }
    this.listWisReplay_args = {"token":"?","page":1,"num":20};
    
    this.exports.listWisReplay = this.listWisReplay;
    this.exports.listWisReplay_args = this.listWisReplay_args;

    /**
     * 上传教育模版 文档
     * @param string $token 认证token
     * @param string $file_name 文档文件名 支持格式 ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', ]
     * @param string $file_contents 文档文件 base64编码后的内容
     * @return array $rst
     */
    this.uploadWisDoc = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.uploadWisDoc('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/uploadWisDoc' ,args, success, error, log);
    }
    this.uploadWisDoc_args = {"token":"?","file_name":"?","file_contents":"?"};
    
    this.exports.uploadWisDoc = this.uploadWisDoc;
    this.exports.uploadWisDoc_args = this.uploadWisDoc_args;

    /**
     * 用户登出
     * @param $room_id  int  房间room_id
     * @return array ['Flag'=>100, 'FlagString'=>'退出成功'];
     */
    this.logout = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.logout('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/logout' ,args, success, error, log);
    }
    this.logout_args = {"room_id":"?"};
    
    this.exports.logout = this.logout;
    this.exports.logout_args = this.logout_args;

    /**
     * 获取 dms 用户列表
     * @param $room_id  int  房间room_id
     * @param $skip  int  跳过
     * @param $num  int  数量
     * @return array [ 'Flag'=>100, 'List'=>[] ];
     */
    this.getDmsUserList = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.getDmsUserList('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/getDmsUserList' ,args, success, error, log);
    }
    this.getDmsUserList_args = {"room_id":"?","skip":0,"num":20};
    
    this.exports.getDmsUserList = this.getDmsUserList;
    this.exports.getDmsUserList_args = this.getDmsUserList_args;

    /**
     * 获取用户信息
     * @param $uid  int  用户uid
     * @param $room_id  int  房间room_id
     * @return array [ 'Flag'=>101, 'FlagString'=>'该用户不存在' ];
     * [ 'Flag'=>100, 'Info'=>$info ];
     */
    this.getUserInfo = function(args, success, error) {
        var log = function(tag, use_time, args, data){
            if(args.csrf){
                delete args.csrf;
            }
            var f = _this._log_func[tag];
            _this.DEBUG && f && f(_this.formatDate(), '['+tag+'] JiaoYuUserInfo.getUserInfo('+use_time+'ms)', 'args:', args, 'data:', data);
        }
        return _this.rfcApi('POST', '/api/JiaoYuUserInfo/getUserInfo' ,args, success, error, log);
    }
    this.getUserInfo_args = {"uid":"?","room_id":"?"};
    
    this.exports.getUserInfo = this.getUserInfo;
    this.exports.getUserInfo_args = this.getUserInfo_args;
}

if( typeof JiaoYuUserInfo == "undefined" ){
    var JiaoYuUserInfo = new JiaoYuUserInfoHelper();
    if(typeof exports == "undefined"){
        var exports = {};
    }
    for(var key in JiaoYuUserInfo.exports){
        exports[key] = JiaoYuUserInfo.exports[key];
    }
}