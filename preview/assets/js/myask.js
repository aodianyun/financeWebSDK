(function($){
      function askF(obj,options){
         this.obj = $(obj); 
         this.opts = options;
         this.stop = false;
         this.noSubmit = false;
      }
      askF.prototype.init = function(){
             var self = this;
             this.opts.textareaId = 'askTxt';
             this.opts.submitId = 'askSubmit';
            if(this.stop){
              return;
            }
            if(this.opts.config.dmsConfig.ctrl_qas==9){
                this.noSubmit = true;
            }
            //加载模板
            this.obj.append( this.template() );

            //发送
            $(document).on('click','#'+this.opts.submitId,function(){
                  self.chatSubmit();
             });
            //ROP相关
            this.opts.config.onMsg('question', function(topic, dms_data) {
                  self.questionInfo(dms_data);       
              }, function(topic, dms_data) {
                  return true;
            });

            this.opts.config.onMsg('answer', function(topic, dms_data) {
                  self.answerInfo(dms_data);       
              }, function(topic, dms_data) {
                  return true;
            });

            this.opts.config.onMsg('setqas', function(topic, dms_data) {
                  if(dms_data.ctrl_qas==9){
                      this.noSubmit = true;
                   } else {
                      this.noSubmit = false;
                   }      
              }, function(topic, dms_data) {
                  return true;
            });
      }
      //ROP相关
      askF.prototype.questionInfo = function(data){
          if($('#'+data.msg_id).length==0)
            this.appentList(data);
      }
      askF.prototype.answerInfo = function(data){
           this.reply(data);
      }
      //模板
      askF.prototype.template = function(){
            var listHeight = this.obj.height()-96;
            var html = '\
                       <div class="chat-box">\
                                <div class="chat-list">\
                                      <ul class="ask-message">\
                                      </ul>\
                                </div>\
                                <div class="chat-btn">\
                                   <div class="chat-emotion">\
                                      <span style="margin-left:3%;">专家为您答疑解惑</span>\
                                   </div>\
                                   <div class="chat-input clearfix">\
                                       <div class="chat-textarea"><textarea onkeydown="if(event.keyCode==13){askObj.chatSubmit();}" id="'+this.opts.textareaId+'"></textarea></div>\
                                       <div class="chat-submit" id="'+this.opts.submitId+'" >提问</div>\
                                   </div>\
                                </div>\
                          </div>\
                          ';
           return html;
      }
      //时间格式
      askF.prototype.timeFormat = function(now){
            return this.opts.config.date('H:i', now);
      }
      askF.prototype.warnWindow = function(warning){
           alert(warning);
      }
      //发送
      askF.prototype.chatSubmit = function(){
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
          var dmsData = {
                uid: this.opts.config.dmsConfig.uid,
                nick: this.opts.config.dmsConfig.nick,
                ava: this.opts.config.dmsConfig.ava,
                ext: this.opts.config.dmsConfig.ext,
                cmd: 'question',
                content: content,
                time: Math.ceil(new Date().getTime() / 1000)
          };
          this.opts.config.dmsQuestionPublish({dmsData:dmsData},function(data){
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
      askF.prototype.appentList = function(data){
            var msg_id = data.msg_id;
            var who = data.uid==this.opts.config.dmsConfig.uid ? '我问' : data.uid+'('+data.nick+')'+'问';
            var uid =data.uid;
            var time = this.timeFormat(data.time);
            var content = data.content
            var html = '\
                       <div class="'+uid+'" id="'+msg_id+'" style="border-bottom:1px solid gray;" >\
                           <li>\
                             <span class="li-nick">'+who+'：</span>\
                             <span class="li-time">'+time+'</span>\
                             <p class="li-content">'+this.opts.config.htmlspecialchars(content)+'</p>\
                          </li>\
                      </div>\
            ';
            $('.ask-message').append(html);
            $('.chat-list').scrollTop(100000);
      }
       //信息显示
      askF.prototype.reply = function(data){
            var msg_id = data.msg_id;
            var time = this.timeFormat(data.time);
            var content = data.content
            var html = '\
                           <li>\
                             <span class="li-nick">答复：</span>\
                             <span class="li-time">'+time+'</span>\
                             <p class="li-content">'+this.opts.config.htmlspecialchars(content)+'</p>\
                          </li>\
            ';
            $('#'+msg_id).append(html);
            $('.chat-list').scrollTop(100000);
      }
      //扩展
      $.fn.asklist = function(opts){
          var defaults = {};
          var options = $.extend(defaults,opts);
          var askB = new askF(this, options);
          askB.init();
          return askB;
      }
})(jQuery);