$(function() {
	//二维码
	$("#backTop .wechat").hover(function() {
		$("#QRcode").stop(true,false).animate({"left":"-100px","opacity":100},500);
	},function () {
		$("#QRcode").stop(true,false).animate({"left":"-150px","opacity":0});
	});
	
	//返回顶部
	$(window).scroll(function () {
		var top = $(this).scrollTop();
		if(top>600){
			$("#backTop").fadeIn();
		}else{
			$("#backTop").fadeOut();
		}
	});
	
	//点击返回顶部
	$("#backTop").find(".top").click(function () {
		var top = $(window).scrollTop();
		$("html,body").animate({"scrollTop":"0px"});
	});
	
	//首页鼠标移入文章标题
	$("article").on("mouseover","h3 a",function () {
		$(this).stop(true,false).animate({"left":"16px"});
	});
	$("article").on("mouseout","h3 a",function () {
		$(this).stop(true,false).animate({"left":"0px"});
	});
	
	//首页技术文章
	$("#tecDiscussion").on('mouseover',"dd a",function () {
		$(this).stop(true,false).animate({"left":"16px"});
	});
	$("#tecDiscussion").on('mouseout',"dd a",function () {
		$(this).stop(true,false).animate({"left":"0px"});
	});
	
	//文章分类
	$("#classsify .con").on("mouseover","li a",function () {
		$(this).stop(true,false).animate({"left":"16px"});
	});
	$("#classsify .con").on("mouseout","li a",function () {
		$(this).stop(true,false).animate({"left":"0px"});
	});
	
	//分类菜单
	
	$("#classsify .menu").eq(0).css("color","#EA1F00");
	$("#classsify .menu").click(function () {
		$("#classsify .con").stop(true,false).slideUp();
		//初始化
		$("#classsify .class_iocn").css({"border-color":"transparent transparent #3D727E transparent","margin-top":"-6px"});
		$("#classsify .menu").css("color","#777");
		//改变当前
		$(this).css("color","#EA1F00").find(".class_iocn").css({"border-color":"#fff transparent transparent transparent","margin-top":"6px"});
		$(this).next().stop(true,false).slideDown();
	});
	
	//爱生活
	$("#music li").mouseover(function(){
		//初始化
		$(this).stop(true,false).animate({"height":"150px"},300).siblings().stop(true,false).animate({"height":"45px"},300);
	});
	
	//留言板
	$("#email").blur(function(){
		$(this).css({"border":"solid 2px #ccc","font-size":"12px","color":"#000"}).attr("placeholder","不会收到消息...");
	});
	
	$("#namer").blur(function(){
		$(this).css({"border":"solid 2px #ccc","font-size":"12px","color":"#000"}).attr("placeholder","请输入你的称呼...");
	});
	
	$("#msg textarea").blur(function(){
		$(this).css({"border":"solid 2px #ccc","font-size":"12px","color":"#000"}).attr("placeholder","给我留言...");
	});
	
	$("#msg textarea,#email,#namer").focus(function(){
		$(this).css({"border":"solid 2px #ff6700","font-size":"12px","color":"#000"}).attr("placeholder","");
	});
	
	//提交留言
	$("#subMsg").click(function(){
		//图片数组
		var arr = ["images/msg1.png","images/msg2.png","images/msg3.png","images/msg4.png","images/msg5.png","images/msg6.png","images/msg7.png","images/msg8.png","images/msg9.png","images/msg10.png"];
		//获取随机数
		var index = Math.floor(Math.random()*10);
		var imgUrl = arr[index];
		//图片url写入隐藏域
		$("#imgUrl").val(imgUrl);
		var textval = $("#msg textarea").val();
		var emailval = $("#email").val();
		var namerval = $("#namer").val();
		var pattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/img;
		if(!pattern.test(emailval)){
			$("#email").css("border","1px solid #f00");
			return false;
		}
		//判断输入的合法性
		if(textval.length==0 || emailval.length==0 || namerval.length==0){
			alert('请输入内容后再提交!');
			return false;
		}else{
			$("#msgform").submit();
		}
	});
	
	//文章列表点赞   遍历每条文章列表
	$("article").each(function(i,v){
			$(v).on("click",".help",function(){
			var val = parseInt($(this).text());
			val++;
			$(this).text(val);
			var id = $(this).attr("helpid");
			//点击赞是加上样式
			$(this).parent().find(".tips").css("top",0).stop(true,false).animate({"opacity":1,"top":"-20px"},600,function(){
			$(v).parent().find(".tips").css("opacity",0);
					});
			//定义保存赞的路由	
			function savehelp(){
				$.get('/add_help.html?id='+id+'&&help='+val,function(data){
				});
			}
				savehelp(); //默认执行一次
		});
	});
	
	//手机端显示菜单
	var isShow = false;
	$(".phoneNav").click(function(){
		if(isShow){
			$(this).next().slideUp();
			isShow = false;
		}else{
			$(this).next().slideDown();
			isShow = true;
		}
	});
});
