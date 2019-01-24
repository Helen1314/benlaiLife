//加载公共部分
$(".head").load("public.html .public-head","js/public.js",head);
$(".foot").load("public.html .public-footers","js/public.js",foot);
function head(){
	
	/*-----//判断cookie中是否有用户的加购的商品信息   有的话显示出来-------*/
		if( getCookie("prolist").length > 0){
				var coonum = JSON.parse( getCookie("prolist") );
				var count = 0;
				for(var i = 0 ; i < coonum.length ;i++){
					count += Number( coonum[i].count );
				}
				
				/*顶部的购物车的数量*/
				$("#proNum").html(count);
				
		}
	
	//判断cookie中是否有用户的注册登录数据
	var cook =  getCookie( "user" ) ;
	if( cook.length > 0 ){
			cook = JSON.parse(cook);
			var uname = cook.uname;
			$(".top-left").find(".unlogin").css("display","none").end()
						  .find("dl").css("display","block");
			//把当前登录的用户名显示出来
			$("#uname").html(uname);
			$("#dname").html(uname);
			$(".top-left dl").hover(function(){
				$(this).find(".tcbg").css("display","block").end()
						.find("dd").css("display","block");
			},function(){
				$(this).find(".tcbg").css("display","none").end()
						.find("dd").css("display","none");
			})
			//我的本来显示用户名
			$(".my-login").find("h4").css("display","none").end()
							.find(".onlogin").css("display","block");
			$("#lname").html(uname);
			
			//点击退出登录按钮
			$("#nologin").click(function(){
					$(".my-login").find("h4").css("display","block").end()
								.find(".onlogin").css("display","none"); 
					$(".top-left").find(".unlogin").css("display","block").end()
						          .find("dl").css("display","none");
					//删除cookie中数据
					document.cookie="user=;expires=-1";
					//跳转到登录页面
					location.href = `login.html?uname=${uname}`;
			})
		
	}

	
	//点击选择地区弹出选择框
	$("#acity").click(function(){
		$(".zhezhao").css("display","block");
		$(".alert-city").css("display","block");
	})
	//关闭弹出框
	$("#closecity").click(function(){
		$(".zhezhao").css("display","none");
		$(".alert-city").css("display","none");
	})
	
	$(".hot-city a,#city").click(function(){
		$("#checked_city").html( $(this).html() );
		$(".zhezhao").css("display","none");
		$(".alert-city").css("display","none");
	})
	/*掌上本来的移入移出*/
	$(".divzhang").hover(function(){
		$(this).find(".zhang-top").css({
			"box-shadow": "1px 1px 6px rgba(192,192,192,.5)",
    		"border-left": "1px solid #e8e8e8",
    		"border-right": "1px solid #e8e8e8",
    		"display":"inline-block",
    		"background":"url('images/icon33.gif') 11px 4px no-repeat #fff"
		})
		$(this).find(".zhangcover").css({
			"display":"block"
		})
		$(this).find(".zhang-bottom").css({
			"display":"block"
		})
		
	},function(){
		$(this).find(".zhang-top").css({
			"box-shadow":"none",
			"border":"none",
			"background":"url('images/icon3.gif') 11px 4px no-repeat"
		})
		$(this).find(".zhangcover").css({
			"display":"none"
		})
		$(this).find(".zhang-bottom").css({
			"display":"none"
		})
		
	})
	/*掌上本来的二维码*/
	$(".zhang-bottom").hover(function(){
		$(this).parent().find(".zhang-top").css({
			"background-color":"#fff",
			"box-shadow":"1px 1px 6px rgba(192,192,192,.5)",
			"border-right":"1px solid #e8e8e8",
			"border-left":"1px solid #e8e8e8",
			"background":"url('images/icon33.gif') 11px 4px no-repeat #fff"
		})
		$(this).parent().find(".zhangcover").css({
			"display":"block"
		})
		$(this).css({
			"display":"block"
		})
		
	},function(){
		$(this).parent().find(".zhang-top").css({
			"background-color":"",
			"box-shadow":"none",
			"border":"none",
			"background":"url('images/icon3.gif') 11px 4px no-repeat"
		})
		$(this).css({
			"display":"none"
		})
		$(this).parent().find(".zhangcover").css({
			"display":"none"
		})
	})
	
	//客户服务的移入移出
	$("#dt_service").hover(function(){
		$(this).find("a").css({
			"box-shadow": "1px 1px 6px rgba(192,192,192,.5)",
    		"border-left": "1px solid #e8e8e8",
    		"border-right": "1px solid #e8e8e8",
    		"background-color": "#fff",
    		"left": "-1px",
    		"background-position":"65px -12px"
		})
		$(this).find(".serviceover").css({
			"display":"block"
		})
		$(this).next().css({
			"display":"block"
		})
	},function(){
		$(this).find("a").css({
			"background-color":"",
			"box-shadow":"none",
			"border":"none",
			"background-position":"65px 13px",
			"left":0
		})
		$(this).find(".serviceover").css({
			"display":"none"
		})
		$(this).next().css({
			"display":"none"
		})
	})
	/*客户服务下面的详细信息*/
	$(".service").find("dd").hover(function(){
		$(this).prev().find("a").css({
			"box-shadow": "1px 1px 6px rgba(192,192,192,.5)",
    		"border-left": "1px solid #e8e8e8",
    		"border-right": "1px solid #e8e8e8",
    		"background-color": "#fff",
    		"left": "-1px",
    		"background-position":"65px -12px"
		})
		$(this).prev().find(".serviceover").css({
			"display":"block"
		})
		$(this).css({
			"display":"block"
		})
	},function(){
		$(this).prev().find("a").css({
			"background-color":"",
			"box-shadow":"none",
			"border":"none",
			"background-position":"65px 13px"
		})
		$(this).prev().find(".serviceover").css({
			"display":"none"
		})
		$(this).css({
			"display":"none"
		})
	})
	/*顶部的轮播图*/
	var topImg = document.getElementsByClassName("head-bar")[0].children;
	var index = 0;
	var timer = setInterval(play,4000)
	function play(){
		//清空样式
		for(let i = 0 ;i <topImg.length ;i++){
			startMove(topImg[i],{"opacity":"0"})
		}
		if( index == topImg.length ){
			index = 0;
		}
		startMove(topImg[index],{"opacity":"100"});
		index++;
	}
	
	/*我的本来的移入移出*/
	$(".my-top").hover(function(){
		$(this).find("a").css({
			"background-color":"#fff",
			"background-position":"103px -8px",
			"height":"41px"
		})
		
		$(this).next().css("display","block");
	},function(){
		$(this).find("a").css({
			"background-color":"",
			"background-position":"103px 17px",
			"height":"38px"
		})
		
		$(this).next().css("display","none")
	})
	/*本来里面的信息*/
	$(".my-bottom").hover(function(){
		$(this).prev().find("a").css({
			"background-color":"#fff",
			"background-position":"103px -8px",
			"height":"41px"
		})
		
		$(this).css("display","block")
	},function(){
		$(this).prev().find("a").css({
			"background-color":"",
			"background-position":"103px 17px",
			"height":"38px"
		})
		
		$(this).css("display","none")
	})
	//顶部的购物车的移入移出-----------------------------------------------
	
	$(".carbox .procar").hover(function(){
		function setPros(){
			
		}
		var cook1 = getCookie( "prolist" );
		if( cook1.length > 0){
				cook1 = JSON.parse(cook1);
				var str = "";
				var num1 = 0;
				var money1 = 0;
				for( var i = 0 ; i< cook1.length;i++ ){
					var item = cook1[i];
					str += `<li>
								<a href="index.html"><img src="images/proimg/${item.pic}" alt="" class="pic2"/></a>
								<div class="name">
									<a href="index.html" class="pname">${item.pname}</a>
								</div>
								<div class="price">${item.price}</div>
								<div class="digital">
									<i>x</i><span class="num">${item.count}</span>
								</div>
							</li>`;
					num1 += item.count;
					money1 += ( Number(item.price.split("￥")[1]) * item.count );
				}
				$(".fulpro ul").html( str );
				$(".tonum").html( num1 );
				$(".total").html( "￥"+ money1.toFixed(2) );
				
			$(".fulpro").css("display","block")
						.siblings().css("display","none");
		}else{
			$(".none-pro").css("dispaly","block!important")
						  .siblings().css("display","none");
		}
		
		$(this).css({
			"background-color":"#fff",
			"background-position":"103px -8px",
			"height":"42px"
		})
		$(this).parent().next().css("display","block")
	},function(){
		$(this).css({
			"background-color":"",
			"background-position":"103px 17px",
			"height":"38px"
		})
		
		$(this).parent().next().css("display","none")
	})
	$(".head-shoplist").hover(function(){
		$(".carbox .procar").css({
			"background-color":"#fff",
			"background-position":"103px -8px",
			"height":"42px"
		})
		$(this).css("display","block")
	},function(){
		$(".carbox .procar").css({
			"background-color":"",
			"background-position":"103px 17px",
			"height":"38px"
		})
		$(this).css("display","none")
	})
	/*本来里面的信息*/
	$("head-shoplist").hover(function(){
		$(this).prev().find("a").css({
			"background-color":"#fff",
			"background-position":"103px -8px",
			"height":"42px"
		})
		
		$(this).css("display","block")
	},function(){
		$(this).prev().find("a").css({
			"background-color":"",
			"background-position":"103px 17px",
			"height":"38px"
		})
		
		$(this).css("display","none")
	})
	/*所有商品分类的显示------------------------------------*/
	$(".nav-left").mouseenter(function(){
		$(".nav-shoplist").css("display","block");
	})
	$(".nav-left").mouseleave(function(){
		$(".nav-shoplist").css("display","none");
	})
	$(".nav-shoplist dl").mouseenter(function(){
		$(this).find("dt").addClass("hover-dt")
	})
	$(".nav-shoplist dl").mouseleave(function(){
		$(this).find("dt").removeClass("hover-dt")
	})
	/*搜素框的得到焦点    失焦事件------------------*/
	$("#search_box").focus(function(){
		$(this).val("");
	})
	$("#search_box").blur(function(){
		if( !$(this).val() ){
			$(this).val("褚橙优级果138元10斤");
		}
	})
}
function foot($top){
	/*右侧的固定固定栏*/
	if( $top > 600 ){
		//显示回到顶部
		$("#go-top").css("display","block")
	}else{
		$("#go-top").css("display","none")
	}
	//移入移出事件
	$("#go-top").hover(function(){
		$(this).css("background-position", "-43px 8px");
	},function(){
		$(this).css("background-position", "-43px -43px");
	})
	$("#kefu").hover(function(){
		$(this).css("background-position", "-60px 0");
	},function(){
		$(this).css("background-position", "0 0");
	})
	$("#erwei").hover(function(){
		$(this).css("background-position", "-96px 5px");
	},function(){
		$(this).css("background-position", "-96px -46px");
	})
	var flag = true;
	$("#erwei").click(function(){
		if(flag){
			$(".erwei-box").show(200);
			flag = false;
			return false;
		}
		if( !flag ){
			$(".erwei-box").hide(200);
			flag = true;
			return false;
		}
	})
	/*-----//判断cookie中是否有用户的加购的商品信息   有的话显示出来   显示在右侧的购物车中-------*/
		if( getCookie("prolist").length > 0){
				var coonum = JSON.parse( getCookie("prolist") );
				var count = 0;
				for(var i = 0 ; i < coonum.length ;i++){
					count += Number( coonum[i].count );
				}
				$("#right-car").css("background","url('../Benlailife/images/buycar.gif')")
							   .html(count) ;
				
		}
}
$(window).scroll(function(){
	var $top = $(document).scrollTop();
	foot($top);
	
})
/*委托实现回到顶部*/
$(".foot").on("click","#go-top",function(){
	$("html,body").animate({"scrollTop":0},500)
})
function carActive( number ){
	  
	    	/*$("#right-car").css("background","url('../Benlailife/images/buycar.gif')")
					   .html( number ) ;
			$("#proNum").html(  number )*/
	   
		setTimeout(function(){
			$(".active-cart").css({"display":"block","right":-300})
							 .stop().animate({"right":56},600,function(){
								$(".active-cart").delay(1000).animate({"right":"-260"},500,function(){
									$(".active-cart").css({"height":61,"display":"none"})
								})
							 	
							 })
			$(".whitebg").css({"display":"block"})
						 .stop().animate( {"width" :16 },600 ,function(){
						 	$(".whitebg").delay(1000).animate({"width":0},500)
						 })
		},100)
		$(".active-cart").css({"height":84});
}