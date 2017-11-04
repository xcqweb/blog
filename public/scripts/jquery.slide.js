;(function($){
	var _this;
	function _slide(conf){
		_this = this;
		//配置默认参数
		var def = {			
			h:200, //盒子高度
			w:500, //盒子高度
			showArrow:true,//是否启用左右箭头
			controlBtnH:20,//按钮高度
			controlBtnW:20,//按钮宽度
			controlBtnB:20,//按钮圆角
			controlPosition:0,//控制按钮条的位置	
			btnNum:3, //按钮个数
			isShowNum:true,//按钮是否显示数字 
			btnBg:"#ff6600",//按钮背景颜色
			btnCurrentBg:"#ff0",//当前按钮颜色
			btnMr:20,//按钮之间的间距
			btnTextColor:"#fff",//按钮字体颜色
			isShowText:false //是否显示文字
		};
		
		//用户配置的参数覆盖默认的参数
		var conf = $.extend({},def,conf);
		
		//选择器可选中多个轮播
		$(_this).each(function(index,item){
			//设置盒子高度
			$(item).css("width",conf.w+"px");
			//设置盒子宽度
			$(item).css("height",conf.h+"px");
			
			//按钮的个数
			for(var i=0; i<conf.btnNum-def.btnNum; i++){
				$(item).find(".control").append("<li></li>");
			}		
			
			//改变控制按钮条的位置 始终居中
			$(item).find(".control").css({"bottom":conf.controlPosition+"px","margin-left":-conf.btnNum*(conf.controlBtnW+conf.btnMr)/2+"px"});
			
			//改变按钮样式
			$(item).find(".control>li").css({"width":conf.controlBtnW+"px","height":conf.controlBtnH+"px","boder-radius":conf.controlBtnB+"px","backgroundColor":conf.btnBg,"margin-right":conf.btnMr+"px","line-height":conf.controlBtnH+"px","border-radius":conf.controlBtnB+"px","color":conf.btnTextColor});
			
			//按钮是否显示数字
			if(conf.isShowNum){
				$(item).find(".control>li").each(function(index,item){
					$(this).text(index+1);
				});
			}else{
				$(item).find(".control>li").text("");
			}
			
			var nowIndex = 0; //当前索引
			var lenImg = $(_this).find(".conBox li").length; //图张数
			//定义一个函数,显示轮播图
			function show(){
				//轮播图片显示
				$(_this).find(".conBox li").eq(nowIndex).fadeIn(2000).siblings().fadeOut(1500);
				//初始化按钮样式
				$(_this).find(".control li").css("background",conf.btnBg);	
				//改变当前按钮样式
				$(_this).find(".control li").eq(nowIndex).css("background",conf.btnCurrentBg);	
				if(conf.isShowText){
						$(".conBox p").stop(true,false).animate({"opacity":0,"left":"150px"},10)
						$(".conBox li").eq(nowIndex).find("p").stop(true,false).animate({"opacity":1,"left":"450px"},1500);
					}
			}
			show();
			//点击左箭头
			$(item).find(".arrow .arrowLeft").on("click",function(){
				nowIndex<0 && (nowIndex=lenImg-1)
				show();
				nowIndex--;
			});
			
			//点击右箭头
			$(item).find(".arrow .arrowRight").on("click",function(){
				nowIndex++;
				nowIndex>=lenImg && (nowIndex=0);
				show();
			});
			
			//鼠标点击按钮事件
			$(item).find(".control li").on('click',function(){
				nowIndex = $(this).index();
				show();
			});
			
			//自动播放
			function autoPlay(){
				timer = setInterval(function(){
					nowIndex++;
					nowIndex>=lenImg && (nowIndex=0);
					show();
				},6000);
			}
			autoPlay();
			
			//鼠标移入盒子停止自动播放
			$(_this).hover(function(){
				//隐藏箭头
				$(_this).find(".arrow").show();
				//清除定时器
				clearInterval(timer);
			},function(){
				//显示箭头
				$(_this).find(".arrow").hide();
				//自动播放
				autoPlay();
			});
		});	
		return _this; //返回jQuery对象 实现链式调用
	}
	//挂在在全局下
	$.fn.slide = _slide;
})(jQuery);
