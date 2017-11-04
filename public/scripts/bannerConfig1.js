$(function () {
	
	if(document.documentElement.clientWidth<1000){
		//爱生活
		$("#bannner_life .slideBox").slide({
			w:940, //盒子高度
			h:400, //盒子宽度
			controlBtnH:20,//按钮高度
			controlBtnW:20,//按钮宽度
			controlBtnB:10,//按钮圆角
			controlPosition:18, //控制按钮的位置
			btnNum:5, //按钮个数
			isShowNum:false,//按钮是否显示数字 
			btnBg:"rgba(255,255,255,0.7)", //按钮背景颜色
			btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
			btnMr:16,//按钮之间的间距
			btnTextColor:"#fff",//按钮字体颜色
			isShowText:true //是否显示文字
		});
	}else{
		//爱生活
		$("#bannner_life .slideBox").slide({
			w:1200, //盒子高度
			h:675, //盒子宽度
			controlBtnH:20,//按钮高度
			controlBtnW:20,//按钮宽度
			controlBtnB:10,//按钮圆角
			controlPosition:18, //控制按钮的位置
			btnNum:5, //按钮个数
			isShowNum:false,//按钮是否显示数字 
			btnBg:"rgba(255,255,255,0.7)", //按钮背景颜色
			btnCurrentBg:"rgba(226,143,35,0.8)",//当前按钮颜色
			btnMr:16,//按钮之间的间距
			btnTextColor:"#fff",//按钮字体颜色
			isShowText:true //是否显示文字
		});
	}
});
