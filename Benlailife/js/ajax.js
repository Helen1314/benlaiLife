//ajax的封装  
//方法一：使用回调函数进行封装
//url 路径  callback 回调函数，服务器处理后将数据返回   data 参数  可选
function getAjax(url,callback,data){
	var ajax = null;
	if( XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(data){
		url = url+"?"+data;
	}
	ajax.open("get",url);
	ajax.send();
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText);
		}
	}
}
//方法二  promise()对象
//url为路径  data为参数 可选
function ajaxPromise(url,data){
	var pro = new Promise(function(success,failed){
		var ajax = null;
		if(XMLHttpRequest){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveXObject();
		}
		if(data){
			url = url + "?" + data;
		}
		ajax.open("get",url);
		ajax.send();
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success( ajax.responseText );
			}
		}
		//如果经过一段时间后没有拿到数据，一般就是失败了
		setTimeout(function(){
			failed("数据请求失败");
		},5000)
	});
	return pro;
}
