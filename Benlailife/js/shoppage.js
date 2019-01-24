window.onload = function(){
	//页面加载时判断路径上是否有用户名参数  
	var hre = (location.href).split("?")[1];
	if( hre.indexOf("pid") != -1 ){
		var arr = hre.split("&");
		var pclass = arr[1].split("=")[1];
		var pid = arr[0].split("=")[1];
		//请求ajax
		$.ajax({
			type:"get",
			url : "http://127.0.0.1/Benlailife/datas/data.json",
			async:true,
			success:function( res ){
				var lrr = res[pclass].list;
				//console.log( res[pclass].list)
				//变遍历list
				for( var i = 0 ; i < lrr.length;i++ ){
					var pro = lrr[i];
					if( pro.pid == pid ){
						$(".name1").html( pro.pname );
						$(".name2").html( pro.info );
						$(".price").find("span").html( pro.price[0] );
						$(".price").find("font").html( pro.price[1] );
						$(".buybtn1").attr({
							"pid":pro.pid,
							"pic":pro.pic,
							"pname":pro.pname,
							"price":pro.price[0],
							"plass":"buyer"
						})
						//给放大镜加图片  遍历图片数组
						var con = "";
						for( var i = 0 ; i < pro.zoom.length ; i++ ){
							con += `<a href="javascript:;"><img src="images/proimg/zoom/${pro.zoom[i]}" alt="" /></a>`;
						}
						$(".smallpic").html(con);
						$(".smallimg").attr( "src" , `images/proimg/zoom/${pro.zoom[0]}` );
						$(".bigimg").attr( "src" , `images/proimg/zoom/${pro.zoom[0]}` );
						//移上某个a的，显示对应的图
						$(".smallpic img").on("mouseenter",function(){
							var imgSrc = $(this).attr("src");
							$(".smallimg").attr( "src" , imgSrc );
							$(".bigimg").attr( "src" , imgSrc );
						})
					}
				}
			}
		})
		//放大镜效果
		$(".zoombox").mouseenter(function(){
			$(".mask").css("display","block");
			$(".bigpic").css("display","block");
			//mask随着鼠标移动
			$(document).mousemove(function(e){
				var e = e || event;
				var x = e.pageX - $(".zoombox").offset().left - $(".mask").width()/2;
				var y = e.pageY - $(".zoombox").offset().top - $(".mask").height()/2;
				//边界处理
				var maxL = $(".zoombox").width() - $(".mask").width();
				var maxT = $(".zoombox").height() - $(".mask").height();
				x = Math.max( 0 , Math.min( x , maxL ) );
				y = Math.max( 0 , Math.min( y , maxT ) );
				$(".mask").css({
					"left" : x,
					"top" : y
				})
				//让大图跟着移动
				var bigx = x * ($(".bigimg").width()-$(".bigpic").width())/( $(".zoombox").width() - $(".mask").width() );
				var bigy = y * ($(".bigimg").height()-$(".bigpic").height())/( $(".zoombox").height() - $(".mask").height() );
				
				$(".bigimg").css({
					"left" :-bigx,
					"top" : -bigy
				})
			})
		});
		$(".zoombox").mouseleave(function(){
			$(".mask").css("display","none");
			$(".bigpic").css("display","none");
		});
	}
	//移上显示二维码
	$(".intro-app dl").bind("mouseenter",function(){
		$(this).find("dd").css("display","block");
	})
	$(".intro-app dl").bind("mouseleave",function(){
		$(this).find("dd").css("display","none");
	})
	/*-------------数量的增加减少----------------------*/
	 $(".ys a").click(function(){
	 	var num = $(this).attr("number");

	 	if( $(".buynum").html() == 1  &&  num == -1){
	 			$(".buynum").html(1);
	 	}else{
	 		$(".buynum").html( Number( $(".buynum").html() ) + Number( num ) );
	 	}
	 })
	/*---------加入购物车按钮-------------------*/
	var proArr = [];//存放多个商品
	$(".buybtn1").click(function(){
		/*弹出的购物信息的内容*/
		$(".active-cart").find(".item-pic").find("img").attr( "src",`../Benlailife/images/proimg/${$(this).attr("pic")}` );
		$(".active-cart").find("#pname").html( $(this).attr("pname") );
		$(".active-cart").find("#pnum").html( $(".buynum").html() );
		$(".active-cart").find(".item-price").html( $(this).attr("price") );
		
		/*弹出的购物信息的动画*/
		var shu = Number($("#right-car").html()) + Number( $("#pnum").html() );
		carActive( shu );
		/*导航栏的购物车数量和内容*/
		
		/*想向cookie中存数据*/
			var pro = null;
			pro = {
				"pid":$(this).attr("pid"),
				"pname":$(this).attr("pname"),
				"pic":$(this).attr("pic"),
				"price":$(this).attr("price"),
				"pclass":$(this).attr("pclass"),
				"count":Number($(".buynum").html())
			}
			//看cookie中是否有数据
			var cookie = getCookie("prolist");
			var flag = true;
			if( cookie.length > 0 ){
				var crr = JSON.parse( cookie );
				if( crr.length > 0 ){
					proArr = crr;
					for( var i = 0 ;i<proArr.length ;i++ ){
						var item = proArr[i];
						if( pro.pid == item.pid ){
							item.count += Number($(".buynum").html());
							flag = false;
						}
					}
				}
			}
			
			if( flag ){
				proArr.push( pro );
			}
			document.cookie = `prolist=${JSON.stringify(proArr)}`;
		
	})
	
}
