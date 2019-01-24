<?php
	header("content-type:text/html;charset=utf-8");
	//接收数据
	$status = isset( $_GET["status"] ) ? $_GET["status"] : "";
	$uname = isset( $_GET["uname"] ) ? $_GET["uname"] : "";
	$upwd = isset( $_GET["upwd"] ) ? $_GET["upwd"] : "";
	//连接数据库
	$db = mysql_connect("localhost","root","root");
	//找到数据库
	mysql_select_db("benlife",$db);
	//设置字符编码
	mysql_query("set names utf8");
	
	//注册功能
	if( $status == "register" ){
		//查询数据库中是否存在用户输入的这个用户名
		$sql = "select * from user where uname ='$uname'";
		//执行
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		//判断是否存在这条数据
		if( $arr ){
			echo 2;//用户名存在
		}else{
			//不存在   存到数据库
			$sql = "INSERT INTO `user`(`uname`, `upwd`) VALUES ('$uname','$upwd')";
			$re = mysql_query( $sql );
			if( $re ){
				echo 1;//注册失败
			}else{
				echo 0;//注册成功
			}
		}
	}
	//登录功能
	if( $status == "login" ){
		//查询数据库中是否存在用户输入的这个用户名
		$sql = "select * from user where uname ='$uname'";
		//执行
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		if( $arr ){
			if( $upwd == $arr["upwd"] ){
				echo 1;//登录成功
			}else{
				echo 2;//密码错误
			}
		}else{
			echo 0;//用户不存在
		}
	}
?>