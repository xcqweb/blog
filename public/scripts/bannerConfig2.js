$(function () {
	var w = document.documentElement.clientWidth;
		if(w<1200 && w>980){
			$("#bannner .slideBox").slide({
				w:632, //盒子高度
				h:336, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else if(w<980 && w>768){
			//首页
			$("#bannner .slideBox").slide({
				w:768, //盒子高度
				h:336, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else if(w===360){
			//首页
			$("#bannner .slideBox").slide({
				w:360, //盒子高度
				h:200, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else if(w===320){
			//首页
			$("#bannner .slideBox").slide({
				w:320, //盒子高度
				h:200, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else if(w===375){
			//首页
			$("#bannner .slideBox").slide({
				w:375, //盒子高度
				h:200, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else if(w===414){
			//首页
			$("#bannner .slideBox").slide({
				w:414, //盒子高度
				h:200, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else if(w===412){
			//首页
			$("#bannner .slideBox").slide({
				w:412, //盒子高度
				h:200, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}else{
			//首页
			$("#bannner .slideBox").slide({
				w:900, //盒子高度
				h:360, //盒子宽度
				controlBtnH:12,//按钮高度
				controlBtnW:12,//按钮宽度
				controlBtnB:10,//按钮圆角
				controlPosition:18, //控制按钮的位置
				btnNum:5, //按钮个数
				isShowNum:false,//按钮是否显示数字 
				btnBg:"rgba(0,0,0,0.7)", //按钮背景颜色
				btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
				btnMr:16,//按钮之间的间距
				btnTextColor:"#fff"//按钮字体颜色
			});
		}
		
		
		
});
