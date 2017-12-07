
//options url,data,success,timeout,error
function jsonp(options){
	
	options = options || {};
	if(!options.url){
		return;
	}
	options.data = options.data || {};
	options.timeout = options.timeout || 0;
	options.cbName = options.cbName || "cb";
	
	
	var fnName = ("jsonp" + Math.random()).replace(".","");
	
	var arr = [];
	
	options.data[options.cbName] = fnName;
	for(var name in options.data){
		arr.push(name + "=" + encodeURIComponent(options.data[name]));
	}
	
	var str = arr.join("&");
	
	window[fnName] = function (json){
		options.success && options.success(json);
		oHead.removeChild(oS);
		clearTimeout(timer);
	};
	
	var oS = document.createElement("script");
	oS.src = options.url + "?" + str;	
	var oHead = document.getElementsByTagName("head")[0];
	oHead.appendChild(oS);
	
	
	if(options.timeout){
		var timer = setTimeout(function(){
			window[fnName] = function(){};
			options.error && options.error();	
		},options.timeout);
	}
}
