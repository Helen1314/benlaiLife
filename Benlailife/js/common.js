//获取id
function $id(id){
	return document.getElementById(id);
}
//获取随机数
function rand(min,max){
		return Math.round(Math.random()*(max-min)+min);
	}
//自定义时间格式
function dateToString(now,sign){
	sign = sign || "-"
	var y = now.getFullYear();
	var m = toTwo(now.getMonth()+1);
	var d = toTwo (now.getDate() );
	var h = toTwo(now.getHours() );
	var _m = toTwo(now.getMinutes());
	var s = toTwo(now.getSeconds());
	var str = y + sign +m + sign + d + " " + h + ":"+ _m + ":" +s;
	return str;
	}
	function toTwo(val){
		return val > 10 ? val : "0"+val; 
	}
//获取6位验证码,包含大写字母，小写字母，数字
function yzm(){
	var str = "";
	var num = rand(48,122);
	for(var i = 1;i <= 6;i++){
		if(num > 57 && num <65 || num > 90 && num <97){
			i--;
		}else{
			str += String.fromCharCode(num);
		}
	}
	return str;
}
//获取随机颜色
function getColor(){
	str = "#";
	for(var i = 1;i<=6;i++){
		str +=  rand(0,15).toString(16);
	}
	return str;
}
