$(function(){
	//导航
	$('dt').click(function(){
		var obj=$(this).next();
		if($(this).next().css('display')=='block'){
			obj.hide('fast');
			$(this).removeClass('on');
		}else{
			obj.show('fast');
			$(this).addClass('on');
		}
	});
});
	
var str = '<nav>\
	<h3>欢迎您来到管理后台</h3>\
	<p>登陆名：<strong class="c_user">Admin</strong><br/>身　份：<strong class="c_role">超级管理员</strong></p>\
	<dl>\
		<dt><span class="icon news"></span>文章管理</dt>\
		<dd>\
			<a href="add.html">-&emsp;发布文章</a>\
			<a href="articlelist.html">-&emsp;文章列表</a>\
			<a href="articleClassify.html">-&emsp;文章分类</a>\
		</dd>\
		<dt><span class="icon pro"></span>日记管理</dt>\
		<dd>\
			<a href="diary.html">-&emsp;新增日记</a>\
			<a href="diarylist.html">-&emsp;日记列表</a>\
		</dd>\
		<dt><span class="icon book"></span>留言管理</dt>\
		<dd>\
			<a href="msglist.html">-&emsp;留言列表</a>\
		</dd>\
		<dt><span class="icon flink"></span>友情连接管理</dt>\
		<dd>\
			<a href="addLink.html">-&emsp;新增连接</a>\
			<a href="linkList.html">-&emsp;连接列表</a>\
		</dd>\
		<dt><span class="icon admin"></span>管理员管理</dt>\
		<dd>\
			<a href="adduser.html">-&emsp;新增管理员</a>\
			<a href="userlist.html">-&emsp;管理员列表</a>\
			<a href="loglist.html">-&emsp;日志列表</a>\
			<a href="editpassword.html">-&emsp;修改密码</a>\
		</dd>\
	</dl>\
</nav>';

document.write(str);


//封装ajax
;(function(){
	window.ajax = function(opt){
		var ajax = new XMLHttpRequest();
		opt.type = opt.type || "get";
		if(opt.type=="get" && opt.data){
			ajax.open(opt.type,opt.url+'?'+opt.data);
		}else{
			ajax.open(opt.type,opt.url);
		}
		
		if(opt.type=='post'){
			ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		}
		ajax.onreadystatechange = function(){
			if(ajax.readyState==4 && ajax.status==200){
				var data = ajax.responseText;
				if(opt.dataType=="json"){
					data = JSON.parse(data);
				}
				opt.ok(data);
			}
		}
		if(opt.type=="post" && opt.data){
			ajax.send(opt.data);
		}else{
			ajax.send();
		}
	}
})();


//定义函数实现后台文章,留言,日记分页效果
;(function(){
	function _showlist(pagename,page){
			page= page || 1;
			ajax({
				url:"/admin/"+pagename+".html?page="+page,
				dataType:"json",
				ok:function(data){
					var pagecount = data.pop(); //取出从服务器端返回的总页数
					$("#list").html($("#tmpl").tmpl(data)); //渲染模板
					
					var str='';
					if(page>1){
						str='<li class="upPage"><a href="javascript:showlist('+(page-1)+');">下一页</a></li>';
					}
					
					for(var i=page-2; i<pagecount; i++){
						if(i<1){continue;}
						if(i>pagecount){break;}
						if(i===page){
							str+='<li class="current"><a href="javascript:showlist('+i+');">'+i+'</a></li>';
						}else{
							str+='<li><a href="javascript:showlist('+i+');">'+i+'</a></li>';
						}
						
					}
					
					if(page<pagecount){
						str+='<li class="downPage"><a href="javascript:showlist('+(page+1)+');">上一页</a></li>';
					}
					document.getElementById("page").innerHTML = str;
				}
			});
		}
	window.showlist = _showlist;
})();

	
//获取当前登录的用户,及身份
ajax({
	url:"/getcurrent_user.html",
	data:"json",
	ok:function(data){
		var data = JSON.parse(data);
		$(".c_user").eq(0).text(data[0].username);
		$(".c_role").eq(0).text(data[0].role);
	}
});

		
