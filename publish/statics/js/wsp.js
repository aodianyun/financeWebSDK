if(!console || !console.log){
    var console = {};
    console.log = function(){} 
}
var DMS_AGENT;
function dmsInit(){
    /*
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = WSP_ASSETS_PATH_SITE + 'view/maiquan/web/entertainment/' + dmsConfig.layout_js;
	s.charset = 'UTF-8';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
	*/
}

function dmsCommon(){
	var _this = this;
	var userAgentInfo = navigator.userAgent;
    var Agents = ["Android","iPhone","SymbianOS","Windows Phone","WP","iPad","iPod"];
    for(var v = 0; v < Agents.length; v++){
        if(userAgentInfo.indexOf(Agents[v]) > 0){
            DMS_EQUIPMENT = 'phone';
			DMS_AGENT = Agents[v];
            break;
        }
    }	
	this.htmlspecialchars = function (str){    
		str = str.replace(/&/g, '&amp;');  
		str = str.replace(/</g, '&lt;');  
		str = str.replace(/>/g, '&gt;');  
		str = str.replace(/"/g, '&quot;');  
		str = str.replace(/'/g, '&#039;');  
		return str;  
	}
	
	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
	// public method for encoding
	this.encode = function (input) {
		input = String(input);
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _this._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
 
	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _this._utf8_decode(output);
		return output;
	}
 
	// private method for UTF-8 encoding
	this._utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	// private method for UTF-8 decoding
	this._utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
	
	this.getIeVerson = function(){
		var mode = /Microsoft Internet Explorer/i;
		if(mode.test(navigator.appName)){
			var mode = /MSIE 6\./i;
			if(mode.test(navigator.appVersion)){
				return 6;
			}
			var mode = /MSIE 7\./i;
			if(mode.test(navigator.appVersion)){
				return 7;
			}
			var mode = /MSIE 8\./i;
			if(mode.test(navigator.appVersion)){
				return 8;
			}
			var mode = /MSIE 9\./i;
			if(mode.test(navigator.appVersion)){
				return 9;
			}
			var mode = /MSIE 10\./i;
			if(mode.test(navigator.appVersion)){
				return 10;
			}
			var mode = /MSIE 11\./i;
			if(mode.test(navigator.appVersion)){
				return 11;
			}
		}
		return 0;


	}
	
	this.formatDate = function(now){
		if(now){
			var now = new Date(now*1000);
		}
		else{
			var now = new Date().getTime();
			var now = new Date(now);
		}
		var year = now.getFullYear();     
		var month = now.getMonth()+1;     
		var date = now.getDate();     
		var hour = now.getHours();     
		var minute = now.getMinutes();    
		if(minute < 10){
			minute = '0' + minute.toString();
		} 
		return year+"-"+month+"-"+date+" "+hour+":"+minute;
	}
	
	this.formatDate2 = function(now){
		if(now){
			now = new Date(now*1000);
		}
		else{
			now = new Date();
		}     
		var hour = now.getHours();
		if(hour < 10){
			hour = '0' + hour.toString();
		}      
		var minute = now.getMinutes();    
		if(minute < 10){
			minute = '0' + minute.toString();
		} 
		return hour+":"+minute;
	}
	
	this.dmsPublish = function(args, error, success){
		var url = dmsConfig.publish_api,
		    type = 'POST';
		    
		$.ajax({
			type:type,
			url:url,
			data: {dmsData: args, room_id: dmsConfig.room_id},
			dataType:'json',
			async:true,
			success:function(data){
				if(data.Flag == 100){
                    console.log && dmsConfig.DEBUG && console.log(type, 'args:', args, 'data:', data);
                    typeof(success) == 'function' && success(data);
				} else {
    				console.log && dmsConfig.DEBUG && console.log(type, 'args:', args, 'data:', data);
    				typeof(error) == 'function' && error('操作失败:'+data.FlagString);
				}
			}
		});
	}

    this.remoteJsonApi = function(type, url, args, success, error){
		$.ajax({
	        type: type,
	        url: url,
	        data: args,
	        dataType: 'json',
	        async: true,
	        success: 
		        function(data) {
		            if(data.Flag == 100){
			            console.log && dmsConfig.DEBUG && console.log(['Info  dmsCommonHandle remoteJsonApi:',type ,'->', url,'\nargs:', args, '\ndata:', data]);
			            typeof(success) == 'function' && success(data);
		            } else {
			            console.log && dmsConfig.DEBUG && console.log(['Error dmsCommonHandle remoteJsonApi:',type ,'->', url,'\nargs:', args, '\ndata:', data]);
			            typeof(error) == 'function' && error('操作失败:'+data.FlagString);
		            }
		        }
	    });
	}

}

var dmsCommonHandle = new dmsCommon();
dmsInit();
