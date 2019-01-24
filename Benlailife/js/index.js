window.onload = function(){
 	//页面一加载就弹出地区选择框
 	$(".head").find($(".zhezhao")).css("display","block");
 	$(".head").find($(".alert-city")).css("display","block");
	
	//banner轮播图
	var bImg = document.getElementsByClassName("bannerImg")[0].children;
	var bintro = document.getElementsByClassName("ban-intro")[0].children;
	var index = 0;
	//var timer = null;
	timer = setInterval(autoplay,3000);
	//排他
	function fnclear(){
		for(var i = 0;i<bintro.length ; i++){
			bintro[i].children[0].className= "";
			startMove( bImg[i],{"opacity":0} );
		}
	}
	function autoplay(){
		//排他
		//fnclear();
		for(var i = 0;i< bintro.length ; i++){
			bintro[i].children[0].className= "";
			startMove( bImg[i],{"opacity":0} );
		}
		if( index == bImg.length ){
			index = 0;
		}
		startMove( bImg[index],{"opacity":100} );
		bintro[index].children[0].className= "current";
		index++;
	}
	var jt = document.getElementsByClassName("banner-control")[0].children[0];
	var binfo = document.getElementsByClassName("ban-intro")[0];//整个信息条
	var ba = document.getElementsByClassName("banner")[0];//箭头和详细信息外面包着的一个大的遮罩层
	//移入轮播图区域，显示箭头，介绍信息移上显示           移出隐藏----------------------------------
	ba.onmouseenter = function(){
		clearInterval(timer);
		jt.style.display = "block";
		startMove( binfo ,{top : 371} );
		//移上去时背景颜色改变
		for(var i = 0 ;i<6;i++){
			bintro[i].children[0].style.backgroundColor="rgba(255,255,255,0.7)";
		}
	}
	ba.onmouseleave = function(){
		//移走箭头消失------------------------------------------------------
		jt.style.display = "none";
		startMove( binfo ,{top : 396} )
		//timer = setInterval(autoplay,3000);
		//移走时背景颜色改变
		for(var i = 0 ;i<6;i++){
			bintro[i].children[0].style.backgroundColor="#a2a293;";
		}
	}
	/*轮播图介绍信息的移入移出-----------------------------------------------*/
	for(let i = 0 ;i < 6 ;i++){
		bintro[i].onmouseover = function(){
			clearInterval(timer);
			index = i;
			autoplay();
		}
		bintro[i].onmouseout = function(){
			timer = setInterval(autoplay,3000);
		}
	}
	/*轮播图介绍信息前一个-------------------------------------------------*/
	var prev = document.getElementsByClassName("prev")[0];
	prev.onclick = function(){
		clearInterval( timer )
		index-=2;
		if(index < 0){
			index = 5;
		}
		autoplay();
		timer = setInterval(autoplay,3000);
	}
	/*轮播图介绍信息下一个------------------------------------------------*/
	var next = document.getElementsByClassName("next")[0];
	next.onclick = function(){
		clearInterval( timer )
		if(index > 6){
			index = 0;
		}
		autoplay();
		timer = setInterval(autoplay,3000);
	}
	/*---------------新品上线      ajax动态添加商品数据-------------------------------------*/
	getAjax( `http://127.0.0.1/Benlailife/datas/data.json?ti=${Math.random()}`,function(res){
		var res = JSON.parse( res );
		var title = "";
		var con = "";
		title += `<span fy=newshop01 class="active">${res.newShop.newshop01.name}</span>
				 <span fy=newshop02>${res.newShop.newshop02.name}</span>`;
		//标题
		newtitle.innerHTML = title;
		for(var i = 0 ;i < res.newShop.newshop01.list.length;i++){
			var pro = res.newShop.newshop01.list[i];
			con += `<li class="lis">
						<div class="sbox">
							
								<p class="pic"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pa"><img src='images/proimg/${pro.pic}' alt="" class="pimg"/></a></p>
								<p class="pname"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pti pa"><span class="mti">${pro.pname[0]}</span><em class="sti">${pro.pname[1]}</em></a></p>
								<p class="price">${pro.price[0]}<i class="prev-price">${pro.price[1]}</i></p>
								<p class="pbtn"><a href="javascript:;" class="pbtna pa" pid=${pro.pid} pname=${pro.pname[0]} psrc=${pro.pic} price=${pro.price[0]}></a></p>
							
						</div>
					</li>`
		}
		//dl的内容
		$(".imgbox").html(con);
		//移入切换选项卡
		$("#newtitle").find("span").mouseenter(function(){
			$(this).addClass("active")
					.siblings().removeClass("active");
			//获取当前的span属性值
			var fy = $(this).attr("fy");
			var arr = res.newShop[fy].list;
			//console.log(arr)
			var cont = "";
			for(var i = 0 ;i < arr.length;i++){
				var pro = arr[i];
				cont += `<li class="lis">
							<div class="sbox">
									<p class="pic"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pa"><img src='images/proimg/${pro.pic}' alt="" class="pimg"/></a></p>
									<p class="pname"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pti pa"><span class="mti">${pro.pname[0]}</span><em class="sti">${pro.pname[1]}</em></a></p>
									<p class="price">${pro.price[0]}<i class="prev-price">${pro.price[1]}</i></p>
									<p class="pbtn"><a href="javascript:;" class="pbtna pa" pid=${pro.pid} pname=${pro.pname[0]} psrc=${pro.pic} price=${pro.price[0]}></a></p>
							</div>
						</li>`
			}
			//把内容添加到dl中
			$(".imgbox").html(cont);
			
			$(".imgbox li").on("mouseenter",function(){
				//div的设置
				$(this).find("div").css( {"border": "4px solid #f8f8f6","transition": "all .2s linear"} )
				//图片的设置
				$(this).find(".pic").animate( {"margin-top": "10px"} ,20)
				//名称的设置
				$(this).find(".pname").animate( {"margin-top": "5px"} ,20)
				//价格的设置
				$(this).find(".price").animate( {"margin-top": "2px"} ,20)
				//按钮的设置
				$(this).find(".pbtn").animate( {"top": "223px"} ,20)
			});
			$(".imgbox li").on("mouseleave",function(){
				//div的设置
				$(this).find("div").css( {"border": "4px solid #fff","transition": "all .2s linear"})
				//图片的设置
				$(this).find(".pic").animate( {"margin-top": "15px"} ,20)
				//名称的设置
				$(this).find(".pname").animate( {"margin-top": "15px"} ,20)
				//价格的设置
				$(this).find(".price").animate( {"margin-top": "7px"} ,20)
				//按钮的设置
				$(this).find(".pbtn").animate( {"top": "260px"} ,20)
			})
		})
		
		/*-----------------买手力荐----------------------------------------------------*/
		var con1 = "";
		for( var i = 0 ;i< res.buyer.list.length;i++){
			var pro = res.buyer.list[i];
			con1 += `<li>
							<p class="pic pic2"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pa"><img src='images/proimg/${pro.pic}' alt="" class="pimg"/></a></p>
							<p class="pname pn2"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pti pa">${pro.pname}</a></p>
							<p class="price pr2">${pro.price[0]}<i class="prev-price">${pro.price[1]}</i></p>
							<p class="pbtn pb2"><a href="javascript:;" class="pbtna pa" pid=${pro.pid} pname=${pro.pname} psrc=${pro.pic} price=${pro.price[0]} pclass=buyer></a></p>
					</li>`
		}
		//把内容添加到ul中
		$(".buy-shop").html(con1);
		//li的移入移出事件
		$(".buy-shop").on("mouseenter","li",function(){
			//图片的设置
			$(this).find(".pic2").animate( {"margin-top": "15px"} ,20);
			//名称的设置
			$(this).find(".pname").animate( {"margin-top": "10px"} ,20);
			//价格的设置
			$(this).find(".price").animate( {"margin-top": "3px"} ,20);
			//按钮的设置
			$(this).find(".pb2").animate( {"top": "242px"} ,20);
		});
		$(".buy-shop").on("mouseleave","li",function(){
			//图片的设置
			$(this).find(".pic2").animate( {"margin-top": "25px"} ,20);
			//名称的设置
			$(this).find(".pname").animate( {"margin-top": "15px"} ,20);
			//价格的设置
			$(this).find(".price").animate( {"margin-top": "7px"} ,20);
			//按钮的设置
			$(this).find(".pb2").animate( {"top": "280px"} ,20);
		})
		/*买手力荐背景图上的小动画*/
		
		
		
		//为时令鲜果添加数据-----------------------------------------------------------------
		function listr(attr){
			var list = res.fruit[attr].list;
			var str = "";
			for(var i = 0;i<list.length;i++){
				var pro = list[i];
				str += `<li class="lis">
							<div class="sbox">
									<p class="pic"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pa"><img src='images/proimg/${pro.pic}' alt="" class="pimg"/></a></p>
									<p class="pname"><a href="shoppage.html?pid=buyshop01&pclass=buyer" target="_blank" class="pti pa"><span class="mti">${pro.pname[0]}</span><em class="sti">${pro.pname[1]}</em></a></p>
									<p class="price">${pro.price[0]}<i class="prev-price">${pro.price[1]}</i></p>
									<p class="pbtn"><a href="javascript:;" class="pbtna pa" pid=${pro.pid} pname=${pro.pname[0]} psrc=${pro.pic} price=${pro.price[0]} pclass=${attr}></a></p>
							</div>
						</li>`
			}
			return str;
		}
		//给online-pros添加内容   更改选项卡的内容，图片不做更改，同用水果的图片
		$(".online-pros").each(function(index){
			var con = "";
			for( var attr in res.fruit ){
				con += `<dl>
							<dt><a href="javascript:;">${res.fruit[attr].name[index]}</a></dt>
							<dd>
								<ul>${listr(attr)}</ul>
							</dd>
						</dl>`
			}
			$(this).html( con );
		})
		/*为OnlineHomePage中所有的dl的dt添加移入移出效果，移入时，让对应的dd显示，移出时让dd隐藏--------------------------------------*/
		$(".online-pros dl").bind("mouseenter",function(){
			$(this).find("dt a").addClass("on").end()
					.siblings().find("dt a").removeClass("on");
			$(this).find("dd").css("display","block").end()
				   .siblings().find("dd").css("display","none")
				   				
		})
		//为OnlineHomePage中所有的li  .lis   添加移入移出效果-----------------------------------------------------------
		$(".lis").on("mouseenter",function(){
			//div的设置
			$(this).find("div").css( {"border": "4px solid #f8f8f6","transition": "all .2s linear"} )
			//图片的设置
			$(this).find(".pic").animate( {"margin-top": "10px"} ,20)
			//名称的设置
			$(this).find(".pname").animate( {"margin-top": "5px"} ,20)
			//价格的设置
			$(this).find(".price").animate( {"margin-top": "2px"} ,20)
			//按钮的设置
			$(this).find(".pbtn").animate( {"top": "223px"} ,20)
		});
		$(".lis").on("mouseleave",function(){
			//div的设置
			$(this).find("div").css( {"border": "4px solid #fff","transition": "all .2s linear"})
			//图片的设置
			$(this).find(".pic").animate( {"margin-top": "15px"} ,20)
			//名称的设置
			$(this).find(".pname").animate( {"margin-top": "15px"} ,20)
			//价格的设置
			$(this).find(".price").animate( {"margin-top": "7px"} ,20)
			//按钮的设置
			$(this).find(".pbtn").animate( {"top": "260px"} ,20)
		})
		
		//默认让第一个dl高亮显示
		$(".online-pros").each(function(){
			$(this).find("dl:first").find("dt a").addClass("on").end()
									.find("dd").css("display","block");
		})
		/*---------加入购物车---------*/
		var proArr = []
		$(".pbtn a").click(function(){
			/*弹出的购物信息的内容*/
			$(".active-cart").find(".item-pic").find("img").attr( "src",`../Benlailife/images/proimg/${$(this).attr("psrc")}` );
			$(".active-cart").find("#pname").html( $(this).attr("pname") );
			$(".active-cart").find("#pnum").html( 1 );
			$(".active-cart").find(".item-price").html( $(this).attr("price") );
			/*向cookie 中存数据*/
			var pro = null;
			pro = {
				"pid":$(this).attr("pid"),
				"pname":$(this).attr("pname"),
				"pic":$(this).attr("psrc"),
				"price":$(this).attr("price"),
				"pclass":$(this).attr("pclass"),
				"count":1
			}
			//看cookie中是否有数据
			var cookie = getCookie("prolist");
			var flag = true;
			if( cookie.length > 0){
				var crr = JSON.parse( cookie );
					proArr = crr;
					for( var i = 0 ;i<proArr.length ;i++ ){
						var item = proArr[i];
						if( pro.pid == item.pid ){
							item.count++;
							flag = false;
						}
					}
			}
			if( flag ){
				proArr.push( pro );
			}
			document.cookie = `prolist=${JSON.stringify(proArr)}`;
			/*弹出的购物信息的动画*/
			//取出cookie中的数据
			if( getCookie("prolist").length > 0  ){	
				var coonum = JSON.parse( getCookie("prolist") );
				var count = 0;
				for(var i = 0 ; i < coonum.length ;i++){
					count += Number( coonum[i].count );
				}
				carActive( count );
			}else{
				carActive( 1 );
			}
		})
	} )
	
	//页面一加载的时候就判断cookie中是否有
	/*------右侧的购物车--------*/

	/*用循环的方式显示online-bar中的img的路径*/
	$(".online-bar img").each(function(index){
		$(this).attr("src",`images/mainbar${index+1}.jpg`)
	})
	/*用循环的方式显示online-lable中的img的路径*/
	$(".online-lable img").each(function(index){
		$(this).attr("src",`images/proimg/label${index}.jpg`)
	})
	//online-lable中的小文字标签鼠标移上时改变其背景颜色
	$(".labels").find("a").mouseenter(function(){
		$(this).css({"background-color":"#a6ca44","color":"#fff"})
	})
	//移出时恢复
	$(".labels").find("a").mouseleave(function(){
		$(this).css({"background-color":"#fff","color":"#78a000"})
	})
	/*-----------------------楼梯效果--------------------------------------------------*/
	//移入时切换背景图片的位置
	$(".stairs a").hover(function(){
		$(this).css("backgroundPositionX",-43)
				//.siblings().css("backgroundPositionX",0);
	},function(){
		$(this).css("backgroundPositionX",0);
	})
	//开关变量控制滚动条事件是否可以触发   当值为true时触发滚动条事件
	var flag = true;
	//第一个回到顶部的单击事件
	$(".stop").click(function(){
		flag = false;
		$(this).siblings().css("backgroundPositionX",0);
		$("html,body").animate({"scrollTop":0},500,function(){
			flag = true;
		});
	})
	/*点击楼层号显示对应的楼层*/
	$(".stairs a:not(.stop)").click(function(){
		$(this).css("backgroundPositionX",-43)
				.mouseleave( function(){ $(this).css("backgroundPositionX",-43) } )
				.siblings().css("backgroundPositionX",0).mouseleave( function(){ $(this).css("backgroundPositionX",0) } );
		flag = false;
		var index = $(this).index();
		//根据当前操作的楼层号的下标  找到对应楼层距离文档顶部的 距离
		var topHeight = $(".online-prolist").eq( index-1 ).offset().top;
		//设置页面滚走的距离
		$("html,body").animate({"scrollTop":topHeight},500,function(){
			flag = true;
		})
	})
	$(window).scroll(function(){
		var stop = $(document).scrollTop();
		/*当页面滚走的距离大于900的时候，把楼层固定在页面左侧*/
		if( stop >= 900 ){
			$(".stairs").css({
				"position":"fixed",
				"top":0
			})
		}else{
			$(".stairs").css({
				"top":958
			})
		}
		/*当flag为真时，可以触发滚动条事件，滑到楼梯时让对应的楼层号显示*/
		if( flag ){
			var $floor;
			$(".online-prolist").each(function(index){
				if( Math.abs( $(this).offset().top - stop ) < $(this).height()/2 ){
						$floor = index;
						return false;
				}
			})
			//判断当页面还没滑到有商品的区域的时候，不让左侧的楼层号显示
			if( stop < $( ".online-prolist" ).eq(0).offset().top -200){
				$(".stairs a:not(.stop)").css("backgroundPositionX",0);
			}else{
				$(".stairs a:not(.stop)").eq( $floor ).css("backgroundPositionX",-43)
													  .mouseleave(function(){ $(this).css( "backgroundPositionX",-43 ) })
												      .siblings().css("backgroundPositionX",0).mouseleave( function(){ $(this).css( "backgroundPositionX",0 ) } );
			}
		}
	})
}
