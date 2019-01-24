window.onload = function(){
	//kancookie中是否有数据
	var cook = getCookie("prolist");
	if( cook.length > 0){
		$(".cart-none").css("display","none");
		$(".cart-full").css("display","block");
		
		var proArr = JSON.parse( cook );
		var con = "";
		for( var i = 0 ; i < proArr.length;i++ ){
			var pro = proArr[i];
			//console.log( pro )
			con += `<li>
						<input type="checkbox" class="sel"/>
						<a href="index.html"><img src="images/proimg/${pro.pic}" alt="" class="pic"/></a>
						<div class="name">
							<a href="index.html" class="pname">${pro.pname}</a>
							<div class="iconp">
								<span>无会员折扣</span>
							</div>
						</div>
						<div class="price">${pro.price}</div>
						<div class="pcalculate" data-pid=${pro.pid} data-price=${Number( pro.price.split("￥")[1])}>
							<button data-num="-1" class="updateCount">-</button>
							<input type="text" class="calnum" value="${pro.count}"/>
							<button data-num="1" class="updateCount">+</button>
						</div>
						<div class="subtotal">￥${(Number( pro.price.split("￥")[1] * pro.count)).toFixed(2)}</div>
						<div class="oprate">
							<a href="javascript:;">收藏</a>
							<a href="javascript:;" class="delone">删除</a>
						</div>
					</li>`;
		}
		$(".cart_list").html( con );
		//每一行的删除操作
		$(".delone").click(function(){
			if( confirm("确定要删除吗？") ){
				var index = $(this).parent().parent().find(".pcalculate").data("pid");
				//遍历数组
				for( var i = 0 ; i < proArr.length ; i++ ){
			 		if( proArr[i].pid == index ){
			 			proArr.splice( i,1 )
			 			//把更新后的信息重新存到cookie中
			 			document.cookie = `prolist=${JSON.stringify( proArr )}`;
			 			//删除页面对应商品
			 			$(this).parent().parent().remove();
			 			Calculate()
			 			break;
			 		}
			 		
			 	}
				$(this).parent().parent().remove();
			}
		})
		//加减操作
		$(".updateCount").click(function(){
			 //如果数量只有一件时不能再减少
			 if( $(this).parent().find(".calnum").val() == 1 && $(this).data("num") == -1 ){
			 	alert("只有一件了，不能再少了！！！")
			 	return;
			 }else{
			 	//找到对应商品的id  变量数组  改变商品的count
			 	var index = $(this).parent().data("pid");
			 	for( var i = 0 ; i < proArr.length ; i++ ){
			 		if( proArr[i].pid == index ){
			 			proArr[i].count += Number($(this).data("num"));
			 			//把更新后的信息重新存到cookie中
			 			document.cookie = `prolist=${JSON.stringify( proArr )}`;
			 			//更新页面对应商品的数量和金额
			 			$(this).parent().find(".calnum").val( proArr[i].count );
			 			$(this).parent().next().html( "￥"+(proArr[i].count * $(this).parent().data("price")).toFixed(2) );
			 			Calculate()
			 			break;
			 		}
			 		
			 	}
			 	//当proArr中的商品都删完时，回到空购物车的页面
			 	if( proArr.length == 0 ){
			 		$(".cart-none").css("display","block");
					$(".cart-full").css("display","none");
			 	}
			 }
		})
		
		//点击复选框的时候进行计算
		$(".sel").click(function(){
			Calculate();
		})
		//页面打开默认全部选中
		$(".sel").prop("checked",$("#qx").prop("checked"));
		Calculate();
		
		//全选按钮的点击事件
		$("#qx").click(function(){
			$(".sel").prop("checked",$("#qx").prop("checked"));
			Calculate();
		})
		//删除所有的操作
		$(".delall").click(function(){
			if( confirm("确定要删除所有选中的商品吗？") ){
				//取出选中的复选框对应的商品的pid
				var pidArr = [];
				$(".sel:checked").each(function(){
					pidArr.push( $(this).parent().find(".pcalculate").data("pid") );
					$(this).parent().remove();
				})
				//取出cookie中的数据，把对应pidArr中pid的商品删掉
				for( var i = 0 ; i<pidArr.length ; i++ ){
					var item = pidArr[i];
					for( var j = 0 ; j < proArr.length ;j++ ){
						if( item == proArr[j].pid ){
							proArr.splice(j,1);
							
						}
					}
				}
				if( proArr.length == 0 ){
					document.cookie = `prolist=;expires=-1`;
					//把页面换成购物车图片的页面
					$(".cart-none").css("display","block");
					$(".cart-full").css("display","none");
				}else{
					//重新把proArr存到cookie中
					document.cookie = `prolist=${JSON.stringify(proArr)}`;
				}
				
				Calculate()
			}
		})
		
		//合计的函数
		function Calculate(){
			var numSum = 0;
			var sumMoney = 0;
			//找到所有被选中的复选框
			$(".sel:checked").each(function(){
				numSum += parseInt( $(this).parent().find(".calnum").val() );
				sumMoney += Number($(this).parent().find(".subtotal").html().split("￥")[1]);
			})
			//总金额
			$(".sum").html( sumMoney.toFixed(2) );
			//如果总金额小于88元时需要付20元的邮费
			if( Number( $(".sum").html()) > 0 && Number( $(".sum").html())< 88 ){
				$(".yunf").html( "￥20.00" );
				
			}else{
				$(".yunf").html( "￥0.00" );
			}
			//判断是否有商品被选中    如果有被选中的商品  在总金额上加运费
			if( numSum > 0 ){
				sumMoney += 20;
			}
			//改变页面上的信息
			$(".numSum").html( numSum );
			$(".sumprice").html( "￥"+ sumMoney.toFixed(2) );
		}
	}
	
}
