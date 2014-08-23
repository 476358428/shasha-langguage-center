// JavaScript Document
addEvent(window,"load",function(){
//登陆框
$(".login_user_denglu").hover(function(){
	$(".login_user_denglu").css("color","#333");
	},function(){
	$(".login_user_denglu").css("color","#999");
		});
$(".login_user_denglu").click(function(){
	$(".login_box").css("display","block").center(350,400);
	$("#screen").lock().css("display","block").opacityChange({target:30,type:1});
	})	
$(".login_box h1 img").click(function(){
	$(".login_box").css("display","none");
	$("#screen").opacityChange({target:0,type:1,fn:function(){$("#screen").css("display","none")}});
	})	

$(window).bind("resize",function(){
	if($(".login_box").css("display")=="block"){
	$(".login_box").keepPosition();
	$("#screen").lock()}});
//提交登录
$("form").getForm("login").bind('keydown',function(e){
	if(e.keyCode==13){
		sendSubmit.call($(this).form("sub").elements[0]);
		}
	}).form("sub").bind("click",sendSubmit);


function sendSubmit(){
	$(".login_box .login_wait").show();
	removeEvent(this,"click",arguments.callee);
	this.style.cursor="default"
	var that=this;
	var fun=arguments.callee;
	ajax({
		method:"post",
		async:true,
		url:"demo.php",
		data:{
			username:this.form.login_user.value,
			password:this.form.login_pass.value
		},
		success:function(req){
			if(Boolean(req)==true){
				window.location.pathname="index.html"
				}else{
				$(".login_box .login_wait").hide();
				alert("用户名或密码错误，请重新输入！")
				that.style.cursor="pointer"
				addEvent(that,"click",fun);
				
				}
			}
		})
	}
//拖动登陆框
	$(".login_box").move("tuodong");
//语言选择框
$(".language_change").click(function(eve){
	var Event=getEvent(eve);
	stopPropagation(Event);
	$(".language_box").show();
	})
$(".language_change a").click(function(eve){
	var Event=getEvent(eve);
	stopPropagation(Event);
	var target=getTarget(Event);
	$(".language_change em").html($(target).text());
	$(".language_box").hide();
	})
$(document).click(function(){
	$(".language_box").hide();
	})
//下拉菜单
$(".yijilanmu li").hover(function(eve){
      if(this.className!=""){
	$(this).css("background","url(images/flag.png) no-repeat center bottom").find("ul").show().opacityChange({target:100,t:20,type:1});
	}
	},function(eve){
	if(this.className!=""){
	var that=this;
	$(this).css("background","none").find("ul").opacityChange({target:0,t:20,type:1,fn:function(){$(that).find("ul").hide()}});;	
	}
		})

$(".erjilanmu li a").hover(function(eve){
	$(this).css("color","#fdce11");
	},function(eve){
	$(this).css("color","#f7941f");
		})
//返回顶端按钮
$("#back_top").hover(function(){
	$(this).css("opacity","0.8").css("filter","alpha(opacity=80)")
	},function(){
		$(this).css("opacity","0.5").css("filter","alpha(opacity=50)")
		}).click(scrollToTop);
	function scrollToTop(){
		var target=0;
		var t=20;
		var speed=5;
		var step;
		var timer=setInterval(scrolling,t);
		function scrolling(){
			var top=document.documentElement.scrollTop||document.body.scrollTop;
			step=Math.ceil((top-target)/speed); 
			window.scrollBy(0,-step);
			if(document.documentElement.scrollTop==0&&document.body.scrollTop==0){
				clearInterval(timer)
				}
				}	
		}
$(window).bind("scroll",function(){
	var top=document.documentElement.scrollTop||document.body.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	if(top>height){
		$("#back_top").show();
	}else{
		$("#back_top").hide();
			}
	
	})






})