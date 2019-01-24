//手机号和验证获取焦点时清空文本框的内容
$("#phoneTxt").focus(function(){
	if( $(this).val() == "请输入手机号" ){
		$(this).val("");
	}
})
$("#codeTxt").focus(function(){
	if( $(this).val() == "请输入验证码" ){
		$(this).val("");
	}
})
/*-------随机数函数------------------------------------*/
function rand( min,max ){
	return Math.round( Math.random()*(max-min) + min );
}
//失去焦点时进行验证  输入的是否符合规则
//手机号---------------------------------------------
var flagPhone = false;
$("#phoneTxt").blur(function(){
	var reg = /^1[3,5,6,7,8,9]\d{9}$/;
	if( reg.test( $(this).val() ) ){
		flagPhone = true;
		$(this).parent().find("s").removeClass().addClass("yes").end()
						.find("span").html("");
	}else{
		flagPhone = false;
		$(this).parent().find("s").removeClass("yes").addClass("no").end()
						.find("span").html("手机号码格式不正确！请确认后输入!");
	}
	
})
//验证码-------------------------------------------------
//点击获取验证码时随机生成一个验证码
var flagCode = false;
$("#codeBtn").click(function(){
	var code = "";
	for( var i = 0; i < 6 ;i++ ){
		code += rand(0,9);
	}
	alert( "您本次的验证码为："+code)
	$("#codeTxt").blur(function(){
		if( $(this).val() == code ){
			flagCode = true;
			$(this).next("span").html("");	
		}else{
			flagCode = false;
			$(this).next("span").html("验证码不正确！请重新获取后输入!");					
		}
	
	})
})
$("#codeTxt").blur(function(){
	if( $(this).val().length == 0){
		$(this).next("span").html("请获取验证码后输入");	
	}else{
		$(this).next("span").html("");	
	}
})
/*----密码----------------------------------------------------------*/
var flagPwd = false;
$("#pwdTxt").blur(function(){
	var regn = /\d/;
	var regl = /[a-z]/i;
	var regc = /_/;
	var str = $(this).val();
	if(( regn.test(str) && regl.test( str ) && (str.length >= 8 && str.length <= 16))||( regc.test(str) && regn.test(str) && str.length >= 8 && str.length <= 16)|| (regl.test(str) && regc.test(str)&& str.length >= 8 && str.length <= 16)){
			flagPwd = true;
			$(this).parent().find("s").removeClass().addClass("yes").end()
							.find("span").html("");
	}else{
		flagPwd = false;
		$(this).parent().find("s").removeClass("yes").addClass("no").end()
						.find("span").html("密码须为8-16位字母,数字,下划线中至少两种组合");
	}
})
/*--------确认密码----------------------------------------------------------*/
var flagQpwd = false;
$("#QpwdTxt").blur(function(){
	//alert()
	var str = $(this).val();
	var str1 = $("#pwdTxt").val();
	if( str == str1 ){
		flagQpwd = true;
		$(this).parent().find("s").removeClass().addClass("yes").end()
						.find("span").html("");
	}else{
		flagQpwd = false;
		$(this).parent().find("s").removeClass("yes").addClass("no").end()
						.find("span").html("两次密码输入不相同！请确认后输入!");
	}
})
/*------------注册按钮的点击事件---------------------------------------------*/
//先判断复选框是否选中

$("#checkbox").click(function(){
	if($(this).prop("checked")){
		$(".choose").find("span").html("");
		$("#regBtn").removeClass("erro");
	}else{
		$("#regBtn").addClass("erro");
		
	}
})
$("#regBtn").click(function(){
	if( !$("#checkbox").prop("checked") ){
		$(".choose").find("span").html("请勾选“阅读并接受本来用户协议”");
	}else if( $("#phoneTxt").val() == "请输入手机号" ){
		$("#phoneTxt").next().html("请输入手机号").end()
					 .parent().find("s").removeClass("yes").addClass("no");
	}else if( $("#codeTxt").val() == "请输入验证码" ){
		$("#codeTxt").next().html("请输入验证码");
		$("#codeTxt").blur(function(){
			if( $(this).val().length == 0 || flagCode == false){
				$(this).next("span").html("请获取验证码后输入");	
			}else{
				$(this).next("span").html("");	
			}
		})
	}else if( $("#pwdTxt").val().length == 0 ){
		$("#pwdTxt").parent().find("s").removeClass("yes").addClass("no").end()
						.find("span").html("请输入密码");
	}else if( $("#QpwdTxt").val().length == 0 ){
		$("#QpwdTxt").parent().find("s").removeClass("yes").addClass("no").end()
						.find("span").html("请确认密码");
	}else if(flagPhone && flagCode && flagPwd && flagQpwd){
		
		var $uname = $("#phoneTxt").val();
		var $upwd = $("#pwdTxt").val();
		//console.log( $uname,$pwd )
		//使用ajax把数据存到数据库中----------------------------------------------
		var ajax = null;
		if( XMLHttpRequest ){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveObject("Microsoft.XMLHTTP");
		}
		//建立与服务器的链接
		ajax.open("get",`http://127.0.0.1/Benlailife/php/register_login.php?status=register&uname=${$uname}&upwd=${$upwd}`);
		//发送请求
		ajax.send();
		//获取服务器返回的结果
		ajax.onreadystatechange = function(){
			if( ajax.status == 200 && ajax.readyState == 4 ){
				var res = ajax.responseText;
				switch( Number( res )){
					case 1 : {
						if( confirm("注册成功，要现在登录吗？") ){
							location.href = "login.html";
						}
					};break;
					case 2 : {
						if( confirm("此号码已经存在，要现在登录吗？") ){
							location.href = "login.html";
						}
					};break;
					case 0 : {alert("登录失败")};break;
				}
			}
		}
	}	
})