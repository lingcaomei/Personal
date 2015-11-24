window.onload=function(){
	var oPhotoWall=document.getElementById('photo_wall');
	var aLi=oPhotoWall.getElementsByTagName('li');
	var oBtn=document.getElementById('btn');

	var aPos=[];
	var zIndex=1;

	for (var i = 0; i < aLi.length; i++) {
		aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop})
		aLi[i].style.left=aLi[i].offsetLeft+'px';
		aLi[i].style.top=aLi[i].offsetTop+'px';
	}
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].style.position='absolute';
		aLi[i].style.margin='0';
		aLi[i].index=i;

	}

	for (var i = 0; i < aLi.length; i++) {
		drag(aLi[i])
	}
	oBtn.onclick=function(){
		aPos.sort(function(){
			return Math.random()-0.5;
		})
		for (var i = 0; i < aLi.length; i++) {
			move(aLi[i],aPos[i])
		}
	}

	function drag(obj){
		
		obj.onmousedown=function(ev){
			var oEvt=ev||event;
			var disX=oEvt.clientX-obj.offsetLeft;
			var disY=oEvt.clientY-obj.offsetTop;
			obj.style.zIndex=zIndex++;

			document.onmousemove=function(ev){
				var oEvt=ev||event;
				var l=oEvt.clientX-disX;
				var t=oEvt.clientY-disY;
				if(t<0){
					t=0;
				}else if(t>document.documentElement.clientHeight-obj.offsetHeight){
					t=document.documentElement.clientHeight-obj.offsetHeight;
				}
				if(l<0){
					l=0;
				}else if(l>document.documentElement.clientWidth-obj.offsetWidth){
					l=document.documentElement.clientWidth-obj.offsetWidth;
				}

				obj.style.left=l+'px';
				obj.style.top=t+'px';

				for (var i = 0; i < aLi.length; i++) {
					aLi[i].className='';
				}
				var oNear=findNearest(obj);
				if(oNear)oNear.className='active';
			}
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				obj.releaseCapture&&obj.releaseCapture();

				var oNear=findNearest(obj);

				if(oNear){
					move(obj,aPos[oNear.index]);
					move(oNear,aPos[obj.index]);
					oNear.className='';
					var tmp=obj.index;
					obj.index=oNear.index;
					oNear.index=tmp;

				}else{
					move(obj,aPos[obj.index]);
				}
			}
			obj.setCapture&&obj.setCapture();
			return false;
		}
	}

	function collTest(obj1,obj2){
		var l1=obj1.offsetLeft;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var t1=obj1.offsetTop;
		var b1=obj1.offsetTop+obj1.offsetHeight;

		var l2=obj2.offsetLeft;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var t2=obj2.offsetTop;
		var b2=obj2.offsetTop+obj2.offsetHeight;
		if(l1>r2||r1<l2||t1>b2||b1<t2){
			return false;
		}else{
			return true;
		}
	}

	function getDis(obj,obj2){
		var l1=obj.offsetLeft+obj.offsetWidth/2;
		var t1=obj.offsetTop+obj.offsetHeight/2;
		var l2=obj2.offsetLeft+obj2.offsetWidth/2;
		var t2=obj2.offsetTop+obj2.offsetHeight/2;

		var a=l1-l2;
		var b=t1-t2;
		return Math.sqrt(a*a+b*b);
	}
	function findNearest(obj){
		var minNum=99999999999999;
		var minIndex=-1;
		for (var i = 0; i < aLi.length; i++) {
			if(obj==aLi[i]) continue;
			if(collTest(obj,aLi[i])){
				var dis=getDis(obj,aLi[i]);
				if(dis<minNum){
					minNum=dis;
					minIndex=i;
				}
			}
		}
		if(minIndex==-1){
			return null;
		}else{
			return aLi[minIndex];
		}
	}




}