// random
function rnd(n,m){
	return parseInt(n+Math.random()*(m-n));
}

// getByClass
function getByClass(oParent,classN){
	if(oParent.getElementsByClassName(classN)){
		return oParent.getElementsByClassName(classN);
	}else{
		var aEle=oParent.getElementsByTagName('*');
		var re=new RegExp('\\b'+classN+'\\b');
		var arr=[];
		for (var i = 0; i < aEle.length; i++) {
			if(re.test(aEle[i].className)){
				arr.push(aEle[i])
			}
		}
		return arr;
	}
}

// mouse
function addMouseWheel(obj,fn){
	if(navigator.userAgent.indexOf('Firefox')!=-1){
		obj.addEventListener('DOMMouseScroll', fnWheel, false);
	}else{
		obj.onmousewheel=fnWheel;
	}

	function fnWheel(ev){
		var oEvt=ev||event;
		var oFrom=oEvt.fromElement||oEvt.relatedTarget;
		if(obj.contains(oFrom)){return;}
		var down=true;
		if(oEvt.wheelDelta){
			down=oEvt.wheelDelta<0?true:false; 
		}else{
			down=oEvt.detail>0?true:false;
		}

		fn&&fn(down);
		oEvt.preventDefault&&oEvt.preventDefault();
		return false;
	}

}

function findInArr(n,arr){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]==n){
			return true;
		}
	}
	return false;
};