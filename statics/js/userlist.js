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
    function userF(obj, options){
        this.obj = $(obj); 
        this.opts = options;
        this.user_arr = {};
        this.client_arr = {};
        this.skip = 0;
        this.num = 10;
        this.page = true;
    }
    userF.prototype.init = function(){
            var self = this;
            
            this.opts.totalId = 'userTotal';
            this.opts.itemClass = 'user-item';
            this.opts.listId = 'userList';
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
                      self.opts.config.dmsUserListByPage(self.skip, self.num, function(dms_data){
                      console.log('翻页');
                      if(dms_data.List.length==0) self.page = false;
                      self.userInit(dms_data);
                      self.updateTotal(dms_data.Total);
                      },function(dms_data){
                                 
                      });
                  }
                }
            });

            //先拉取第一页用户列表
            this.opts.config.dmsUserListByPage(this.skip, this.num, function(data){
                self.userInit(data);
                var this_num = self.opts.config.dmsConfig.client_id in self.client_arr ? 0 : 1;
                self.updateTotal(data.Total + this_num );

                //把自己加入用户列表  如果已经添加 将会忽略
                self.opts.config.dmsConfig.clientId = self.opts.config.dmsConfig.client_id;
                self.enterInfo(self.opts.config.dmsConfig);
            },function(data){
                  self.warnWindow(data.FlagString);
            });
            
            this.opts.config.onEnter(function(dms_data) {
                  self.enterInfo(dms_data);
                  self.updateTotal(dms_data.total);
            });

            this.opts.config.onLeave(function(dms_data) {
                  self.leaveInfo(dms_data);
                  self.updateTotal(dms_data.total);
            });
      }
      userF.prototype.userInit = function(data){
            for(var i in data.List){
                var item = data.List[i];
                if( item.clientId in this.client_arr ){
                    continue;
                }
                this.client_arr[item.clientId] = 1;
                this.user_arr[item.uid] = this.user_arr[item.uid] ? (this.user_arr[item.uid]+1) : 1;  //增加该用户的连接计数
                this.appentList(item);
            }
      }
      //ROP相关
      userF.prototype.enterInfo = function(item){
            this.client_arr[item.clientId] = 1;
            this.user_arr[item.uid] = this.user_arr[item.uid] ? (this.user_arr[item.uid]+1) : 1;  //增加该用户的连接计数
            this.appentList(item);
      }
      userF.prototype.leaveInfo = function(item){
           if( item.clientId in this.client_arr ){
               delete this.client_arr[item.clientId];
           } else {
               return ;
           }
           this.user_arr[item.uid] = this.user_arr[item.uid] ? (this.user_arr[item.uid]-1) : 0;  //减少该用户的连接计数
           if( this.user_arr[item.uid] <= 0 ){
               delete this.user_arr[item.uid];
               $('#'+item.uid).remove();
           }
      }
      userF.prototype.updateTotal = function(num){
           $('#'+this.opts.totalId).html( num );
           $('.user-item').sortElements(function(a, b) {
                return $(a).attr('time') > $(b).attr('time') ? 1 : -1;
            });
      }
      //模板
      userF.prototype.template = function(){
            var html = '\
                       <div class="userlist-box">\
                            <div class="user-head">\
                            <span style="color:#FFFFFF;">&nbsp;&nbsp;在线用户：</span>\
                            <span style="color:#FFFF00;" id="'+this.opts.totalId+'">0</span>\
                            </div>\
                            <div class="user-list" id="'+this.opts.listId+'">\
                             </div>\
                        </div>\
                          ';
           return html;
      }
      userF.prototype.warnWindow = function(warning){
           alert(warning);
      }
      //信息显示
      userF.prototype.appentList = function(data){
              if($('#'+data.uid).length>0){  //已存在条目 不用重复添加
                  return;
              }
            var row = data.clientId.split('_')[0];
            var nick = data.nick;
            var uid =data.uid;
            var html = '\
                         <div time="'+row+'" id="'+uid+'" class="'+this.opts.itemClass+'" >\
                             <div class="user-item-info">● '+this.opts.config.htmlspecialchars(nick)+'</div>\
                         </div>\
            ';
            $('#'+this.opts.listId).append(html);
      }
      //扩展
      $.fn.userlist = function(opts){
          var defaults = {};
          var options = $.extend(defaults, opts);
          var userB = new userF(this, options);
          userB.init();
          return userB;
      }
})(jQuery);