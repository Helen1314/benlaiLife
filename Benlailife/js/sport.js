//运动函数
//obj 为运动的对象  json为要变化的属性 属性值   callback为回调函数 完成链式运动
function startMove(obj,json,callback){
	//清除定时器
	clearInterval( obj.timer );
	//把定时器作为对象的私有属性  多物体运动时不冲突
	obj.timer = setInterval(function(){
		//遍历json对象  保证每个目标值都可以达到
		for(var attr in json){
			//定义一个开关变量  当值为true时结束定时器  为false时继续进行
			var flag = true;
			//获取当前的属性值
			var cur = 0;
			//不同的属性  对获取到的属性值进行改变
			if( attr == "opacity" ){
				cur = getStyle(obj,attr) * 100;
			}else if( attr == "zIndex" ){
				cur = parseInt( getStyle( obj,attr ) );
			}else{
				cur = parseInt( getStyle( obj,attr ) );
			}
			//确定速度
			var speed = ( json[attr] - cur ) / 10;
			//对速度进行处理  >0 向上取整  <0 向下取整  因为浏览器对小数有精度问题
			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );
			//判断是否都达到目标值
			if( cur != json[attr] ){
				flag = false;
			}
			
			//给obj的属性赋值
			if( attr == "opacity" ){
				obj.style[attr] = ( cur + speed )/100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = ( cur + speed ) + "px";
			}
		}
		//遍历结束  看flag的值
		if( flag ){
			clearInterval( obj.timer );
			//调用回调函数
			if( callback ){
				callback();
			}
		}
		
	},30);
}
//获取属性值的函数
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
