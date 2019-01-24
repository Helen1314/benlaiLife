window.onload = function(){
	//页面加载时判断路径上是否有用户名参数  
	
	var hre = (location.href).split("?")[1];
	if( hre  && hre.split("=")[0] == "uname"){
		var hrr = hre.split("=");
		if( hrr[0] == "uname" ){
			$("#phoneTxt").val( hrr[1] );
		}
	}
	//判断cookie中是否有用户数据
	var cook = document.cookie;
	if( cook && cook.split("=")[0] == "user" && cook.split("=")[1]){
		cook = cook.split("=")[1];
		if( cook != "" ){
			cook = JSON.parse(cook);
			$("#phoneTxt").val( cook.uname );
			$("#pwdTxt").val( cook.upwd )
		}
	}
	$("#phoneTxt").focus(function(){
		if( $(this).val() == "请输入手机号" ){
			$(this).val("");
		}
	})
	$("#pwdTxt").focus(function(){
		if( $(this).val()== "请输入密码" ){
			$(this).val("");
		}
	})
	//文本框的失焦事件  进行一个简单的判断
	var flagPhone = true;
	$("#phoneTxt").blur(function(){
		var reg = /^1[3,5,6,7,8,9]\d{9}$/;
		if( reg.test( $(this).val() ) ){
			flagPhone = true;
			$(this).next().html("").end()
					.parent().find("s").removeClass("no").addClass("yes");
		}else{
			flagPhone = false;
			$(this).next().html("手机号码格式不正确！请确认后输入!").end()
					.parent().find("s").removeClass("yes").addClass("no");
		}
	})
	var flagPwd = true;
	$("#pwdTxt").blur(function(){
		var reg = /^.{8,16}$/;
		if( reg.test( $(this).val() ) ){
			flagPwd = true;
			$(this).next().html("").end()
					.parent().find("s").removeClass("no").addClass("yes");
		}else{
			flagPwd = false;
			$(this).next().html("密码至少8位，最多16位!").end()
					.parent().find("s").removeClass("yes").addClass("no");
		}
	})
	/*点击登录按钮*/
	$("#logBtn").click(function(){
		
		if( $("#phoneTxt").val() == "请输入手机号" ){
			$("#phoneTxt").next().html("请输入手机号").end()
						  .parent().find("s").removeClass("yes").addClass("no");
		}else if( $("#pwdTxt").val() == "请输入密码" ){
			$("#pwdTxt").next().html("请输入密码").end()
						 .parent().find("s").removeClass("yes").addClass("no");
		}else if( flagPhone && flagPwd ){
			
			var $uname = $("#phoneTxt").val();
			var $upwd = $("#pwdTxt").val();
			/*$.ajax({
				type:"get",
				url:`http://127.0.0.1/Benlailife/php/register_login.php?status=login&uname=${$uname}&upwd=${$upwd}`,
				dataType:"jsonp",
				async:true,
				jsonCallback:"fn"
			})
			function fn(seg){
				arr.log( seg )
			}*/
			$.ajax({
				type:"get",
				url:`http://127.0.0.1/Benlailife/php/register_login.php?status=login&uname=${$uname}&upwd=${$upwd}`,
				async:true,
				success:function(res){
					switch( Number(res) ){
						case 1:{
							if( confirm("登录成功，点击确定跳转首页") ){
								location.href = `index.html`;
							}
							//把数据存到cookie中
							var json = null;
							json={
								"uname":$uname,
								"upwd":$upwd
							}
							if( $("#logcheck").prop("checked") ){
								var now = new Date();
								now.setDate( now.getDate() + 10 );
							document.cookie = `user=${JSON.stringify(json)};expires=${now}`;
								
							}else{
								document.cookie = `user=${JSON.stringify(json)}`;
							}
						};break;
						case 2:{
							$(".pwd").find("span").html("密码输入错误");
						};break;
						case 0:{
							$(".phone").find("span").html("用户名不存在，请确认后输入");
						};break;
					}
				}
			})
		}
	})
}

