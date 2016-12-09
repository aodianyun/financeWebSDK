(function($){
      function chatF(obj, options){
         this.obj = $(obj); 
         this.opts = options;
         this.stop = false;
         this.noSubmit = false;
      }
      chatF.prototype.init = function(){
            var self = this;
            this.opts.emotionId = 'emotion-img';
            this.opts.textareaId = 'chatTxt';
            this.opts.submitId = 'chatSubmit';
            if(this.stop){
              return;
            }
            if(this.opts.config.dmsConfig.ctrl_chat==9){
                this.noSubmit = true;
            }
            //加载模板
            this.obj.append( this.template() );

            //加载表情
            this.opts.emotionId ? this.loadEmotion() : '';

            //发送
            $(document).on('click','#'+this.opts.submitId,function(){
                  self.chatSubmit();
             });
            //ROP相关
            this.opts.config.onMsg('chat', function(topic, dms_data) {
                  self.chatInfo(dms_data);       
              }, function(topic, dms_data) {
                  return true;
            });
            this.opts.config.onEnter(function(dms_data) {
                 if(self.opts.config.dmsConfig.ctrl_sysmsg==1 ){
                      self.systemInfo(dms_data);
                  }         
            });
            this.opts.config.onMsg('setchat', function(topic, dms_data) {
                  if(dms_data.ctrl_chat==9){
                     self.noSubmit = true;
                   } else {
                     self.noSubmit = false;
                   }       
              }, function(topic, dms_data) {
                  return true;
            });
            this.opts.config.onMsg('setsysmsg', function(topic, dms_data) {
                   if(dms_data.ctrl_sysmsg==1){
                      self.opts.config.dmsConfig.ctrl_sysmsg=1;
                    } else {
                       self.opts.config.dmsConfig.ctrl_sysmsg=0;
                    }       
              }, function(topic, dms_data) {
                  return true;
            });
      }
      //ROP相关
      chatF.prototype.chatInfo = function(data){
          if($('#'+data.msg_id).length==0){
                this.appentList(data);
            }
      }
      chatF.prototype.systemInfo = function(data){
           this.appentSystemList(data);
      }
      //表情
      chatF.prototype.loadEmotion = function(){
          $('#'+this.opts.emotionId).qqFace({
            id: 'facebox',
            assign: this.opts.textareaId,
            callback: function(obj) {
                obj.css('margin-top', '-261px');
                obj.css('margin-left', 0);
            },
            path: this.opts.emotionPath //表情存放的路径
        });
      }
      //模板
      chatF.prototype.template = function(){
            var listHeight = this.obj.height()-96;
            var html = "";
                html = '\
                       <div class="chat-box">\
                                <div class="chat-list" style="height:'+listHeight+'px">\
                                      <ul class="chat-message">\
                                      </ul>\
                                </div>\
                                <div class="chat-btn">\
                                   <div class="chat-emotion">\
                                      <img id="'+this.opts.emotionId+'" src="'+this.opts.emotionbtn+'">\
                                   </div>\
                                   <div class="chat-input">\
                                       <div class="chat-textarea"><textarea id="'+this.opts.textareaId+'"></textarea></div>\
                                       <div class="chat-submit" id="'+this.opts.submitId+'" >发送</div>\
                                   </div>\
                                </div>\
                          </div>\
                          ';
           return html;
      }
      //时间格式
      chatF.prototype.timeFormat = function(now){
            return this.opts.config.date('H:i', now);
      }
      //内容格式
      chatF.prototype.contentFormat = function(str){
          str = str.replace(/\</g, '&lt;');
          str = str.replace(/\>/g, '&gt;');
          str = str.replace(/\n/g, '<br/>');
          str = str.replace(/\[em_([0-9]*)\]/g, '<img src="'+this.opts.emotionPath+'$1.gif" border="0" style="vertical-align: middle;width: 24px;"/>');
          return str;
      }
      chatF.prototype.warnWindow = function(warning){
           alert(warning);
      }
      //发送
      chatF.prototype.chatSubmit = function(){
          var self = this;
          var content = $('#'+self.opts.textareaId).val();
          if(content==""){
            self.warnWindow('内容不能为空！');
            return;
          }
          if(this.noSubmit){
            self.warnWindow('你现在不能发言！');
            return;
          }
          content = content.replace(/\[([\u4e00-\u9fa5]{1,})\]/g, function() {
            if (typeof(dmsFaceArr2[arguments[1]]) == 'undefined') {
                return arguments[0];
            } else {
                return '[' + dmsFaceArr2[arguments[1]] + ']';
            }
          });
          var dmsData = {
            uid: this.opts.config.dmsConfig.uid,
            nick: this.opts.config.dmsConfig.nick,
            ava: this.opts.config.dmsConfig.ava,
            content: content,
            time: Math.ceil(new Date().getTime() / 1000)
          };
          this.opts.config.dmsMsgPublish(dmsData,function(data){
              dmsData.msg_id = data.Info.msg_id; 
              $('#'+self.opts.textareaId).val('');
              $('#'+self.opts.textareaId).focus();
              if($('#'+data.Info.msg_id).length==0){
                   self.appentList(dmsData);
              }
          },function(data){
             self.warnWindow(data.FlagString);
          });
      }
      //信息显示
      chatF.prototype.appentList = function(data){
            var ava = data.ava;
            var nick = data.nick;
            var uid =data.uid;
            var time = this.timeFormat(data.time);
            var content = this.contentFormat(this.opts.config.htmlspecialchars(data.content));
            var html = '\
                       <li id="'+data.msg_id+'">\
                         <span><img src="'+ava+'"></span>\
                         <span class="li-nick">'+this.opts.config.htmlspecialchars(nick)+'('+uid+')：</span>\
                         <span class="li-time">'+time+'</span>\
                         <p class="li-content">'+content+'</p>\
                      </li>\
            ';
            $('.chat-message').append(html);
            $('.chat-list').scrollTop(100000);
      }
      chatF.prototype.appentSystemList = function(data){
            if(this.opts.config.dmsConfig.ctrl_sysmsg==1){
              return;
            }
            var nick = data.nick;
            var uid =data.uid;
            var time = this.timeFormat(data.time);
            var html = '\
                       <li>\
                         <span><img src="'+this.opts.systemImg+'"></span>\
                         <span class="li-nick">系统提示：</span>\
                         <span class="li-time">'+time+'</span>\
                         <p class="li-content">'+this.opts.config.htmlspecialchars(nick)+'('+uid+')进入房间</p>\
                      </li>\
            ';
            $('.chat-message').append(html);
            $('.chat-list').scrollTop(100000);
      }
      //扩展
      $.fn.chatlist = function(opts){
          var defaults = {};
          var options = $.extend(defaults,opts);
          var chatB = new chatF(this, options);
          chatB.init();
          return chatB;
      }
})(jQuery);