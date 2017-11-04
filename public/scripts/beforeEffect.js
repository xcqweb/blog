$(function(){	
	//主菜单
	$("nav ul li").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
	
	//导航
	$("nav ul li").each(function(index,item) {	
			var _this = $(item).find("a");
			//判断当前连接和点击的连接相同
			if((window.location.href).indexOf(_this.attr('href'))>-1){
				$(item).addClass("current").siblings().removeClass("current");
				//获取当前位置
				$(".currentPosition").text(" > "+_this.text()).css({'color':'#33ac72','font-weight':"bold"});
			}	
	});
	
	//缓动函数(每日一语)

		$("article,#bannner .slideBox").css({"left":"-100px","position":"relative"}).animate({"left":"0px"},600);


		$("#tecDiscussion,#aboutMe,#classsify").css({"left":"100px","position":"relative"}).animate({"left":"0px"},600);
});

