//排序扩展
jQuery.fn.sortElements = (function() {
    var sort = [].sort;
    return function(comparator, getSortable) {
        getSortable = getSortable ||
        function() {
            return this;
        };
        var placements = this.map(function() {
            var sortElement = getSortable.call(this),
            parentNode = sortElement.parentNode,
            nextSibling = parentNode.insertBefore(document.createTextNode(''), sortElement.nextSibling);

            return function() {
                if (parentNode === this) {
                    throw new Error("You can't sort elements if any one is a descendant of another.");
                }
                parentNode.insertBefore(this, nextSibling);
                parentNode.removeChild(nextSibling);
            };
        });

        return sort.call(this, comparator).each(function(i) {
            placements[i].call(getSortable.call(this));
        });
    };
})();

(function($){
    function micF(obj, options){
        this.obj = $(obj); 
        this.opts = options;
        this.mic_arr = {};
        this.client_arr = {};
        this.skip = 0;
        this.num = 10;
        this.page = true;
    }
    micF.prototype.init = function(){
            var self = this;
            
            this.opts.totalId = 'micTotal';
            this.opts.itemClass = 'mic-item';
            this.opts.listId = 'micList';
            //加载模板
            this.obj.append( this.template() );
            
            //scroll操作翻页
            $("#"+this.opts.listId).scroll(function(){
                var h = $(this).height();//div可视区域的高度
                var sh = $(this)[0].scrollHeight;//滚动的高度，$(this)指代jQuery对象，而$(this)[0]指代的是dom节点
                var st =$(this)[0].scrollTop;//滚动条的高度，即滚动条的当前位置到div顶部的距离
                if(h+st>=sh){
                //上面的代码是判断滚动条滑到底部的代码
                  if(self.page){
                      self.skip = self.skip + self.num;
                      self.opts.config.dmsMicListByPage(self.skip, self.num, function(dms_data){
                      console.log('翻页');
                      if(dms_data.List.length==0) self.page = false;
                      self.micInit(dms_data);
                      self.updateTotal(dms_data.Total);
                      },function(dms_data){
                                 
                      });
                  }
                }
            });

            //先拉取第一页用户列表
            this.opts.config.dmsMicListByPage(this.skip, this.num, function(data){
                self.micInit(data);
                var this_num = self.opts.config.dmsConfig.client_id in self.client_arr ? 0 : 1;
                self.updateTotal(data.Total + this_num );
                /* 记录上麦列表的状态  用户刷新页面 默认是会离开排麦列表的 */
                //把自己加入用户列表  如果已经添加 将会忽略
                //self.opts.config.dmsConfig.clientId = self.opts.config.dmsConfig.client_id;
                //self.enterInfo(self.opts.config.dmsConfig);
            },function(data){
                  self.warnWindow(data.FlagString);
            });
            
            this.opts.config.onMicEnter(function(dms_data) {
                  self.enterInfo(dms_data);
                  self.updateTotal(dms_data.total);
            });

            this.opts.config.onMicLeave(function(dms_data) {
                  self.leaveInfo(dms_data);
                  self.updateTotal(dms_data.total);
            });
      }
      micF.prototype.micInit = function(data){
            for(var i in data.List){
                var item = data.List[i];
                if( item.clientId in this.client_arr ){
                    continue;
                }
                this.client_arr[item.clientId] = 1;
                this.mic_arr[item.uid] = this.mic_arr[item.uid] ? (this.mic_arr[item.uid]+1) : 1;  //增加该用户的连接计数
                this.appentList(item);
            }
      }
      //ROP相关
      micF.prototype.enterInfo = function(item){
            this.client_arr[item.clientId] = 1;
            this.mic_arr[item.uid] = this.mic_arr[item.uid] ? (this.mic_arr[item.uid]+1) : 1;  //增加该用户的连接计数
            this.appentList(item);
      }

      micF.prototype.leaveInfo = function(item){
           if( item.clientId in this.client_arr ){
               delete this.client_arr[item.clientId];
           } else {
               return ;
           }
           this.mic_arr[item.uid] = this.mic_arr[item.uid] ? (this.mic_arr[item.uid]-1) : 0;  //减少该用户的连接计数
           if( this.mic_arr[item.uid] <= 0 ){
               delete this.mic_arr[item.uid];
               $('#mic_'+item.uid).remove();
           }
      }
      micF.prototype.updateTotal = function(num){
           $('#'+this.opts.totalId).html( num );
           $('.mic-item').sortElements(function(a, b) {
                return $(a).attr('time') > $(b).attr('time') ? 1 : -1;
            });
      }
      //模板
      micF.prototype.template = function(){
            var html = '\
                       <div class="miclist-box">\
                            <div class="mic-list" id="'+this.opts.listId+'">\
                             </div>\
                        </div>\
                          ';
           return html;
      }
      micF.prototype.warnWindow = function(warning){
           alert(warning);
      }
      //信息显示
      micF.prototype.appentList = function(data){
              if($('#mic_'+data.uid).length>0){  //已存在条目 不用重复添加
                  return;
              }
            var row = data.clientId.split('_')[0];
            var nick = data.nick;
            var uid =data.uid;
            if(!this.opts.type){
                var is_stream_ex = data.pub_stream && data.pub_stream == this.opts.config.dmsConfig.stream_ex;
                var show_connect = is_stream_ex ? 'display:none;' : '',
                    show_reject = is_stream_ex ? 'display:none;' : '',
                    show_quit = is_stream_ex ? '' : 'display:none;';
                var oper = '<span style="float:right;margin-right:15px;margin-top:6px;'+show_connect+'" onclick="connectRoomMic(\''+uid+'\',\''+data.clientId+'\')" class="new-btn new-btn-blue">允许</span><span onclick="rejectRoomMic(\''+uid+'\',\''+data.clientId+'\')" style="float:right;margin-right:15px;margin-top:6px;'+show_reject+'" class="new-btn new-btn-orange">拒绝</span><span onclick="quitRoomMic(\''+uid+'\',\''+data.clientId+'\')" style="float:right;margin-right:15px;margin-top:6px;'+show_quit+'" class="quit-btn new-btn-orange">下麦</span>';
            }else{
                var oper = '';
            }
            var html = '\
                         <div style="padding:10px;border-bottom:1px solid gray;" data-uid="'+ uid +'" data-ext="'+ data.ext +'" data-client="' + data.clientId + '" time="'+row+'" id="mic_'+uid+'" class="'+this.opts.itemClass+'" >\
                             <div class="mic-item-info"><img style="width:35px;height:35px;border-radius:50%;margin-right:10px;" src="'+data.ava+'" />\
                             '+this.opts.config.htmlspecialchars(nick)+oper+'\
                             </div>\
                         </div>\
            ';
            $('#'+this.opts.listId).append(html);
      }
      //扩展
      $.fn.miclist = function(opts){
          var defaults = {};
          var options = $.extend(defaults, opts);
          var micB = new micF(this, options);
          micB.init();
          return micB;
      }
})(jQuery);