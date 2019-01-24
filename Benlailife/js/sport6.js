//缓冲运动 + 多物体运动 + 透明度的操作 + 链式运动 + 完美
//封装一个函数 功能是让div匀速运动
//obj就是运动的对象  
// json 表示多个属性和目标值
//callback 表示一个函数   当一个函数作为参数时，这样的函数叫做回调函数  
function startMove(obj,json,callback){ //{width:3,height:300}
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		var flag = true;//假设值为true时 可以停止定时器
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){
				current =  getStyle(obj,attr) * 100 ;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				//获取元素的样式值
				current = parseInt( getStyle(obj,attr) ) ;
			}
			
			//缓冲运动速度确定
			var speed = (json[attr] - current)/10;
			speed = speed > 0  ? Math.ceil( speed ) : Math.floor( speed );
			if( current != json[attr] ){  //动作没有完成 flag 就要变成false
				flag = false;
			}
			
			//继续设置样式
			if( attr == "opacity" ){
				obj.style[attr] = (current + speed)/100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	
		//如果循环结束后 flag的值还是true  假设成立 可以停止定时器了
		if( flag ){  //动作完成的条件
			clearInterval( obj.timer );
			//下一个动作功能不确定    所以通过一个参数传递 这个参数表示函数
			//上一个动作完成后进入到下一个动作
			if( callback ){
				callback();
			}
		}
	} , 30 )
}

//获取运动元素实际样式值 
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}