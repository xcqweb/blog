var express = require('express'),
	router = express.Router(),
	mongoose=require("./link.js"),
	ejs = require('ejs');

//前台的首页
router.get('/list.html', function(req, res, next) {
	articleModel.find({}).sort({'ctime':-1}).exec(function(err,data){
		res.render('index.ejs', {data:data});
	});
});

//前台新闻详情页
router.get('/content.html',function(req,res){
	//接收数据
	var id=req.query.id;
	
	//通过ID查询数据，将数据给模板文件渲染结果
	articleModel.findById(id).exec(function(err,data){
		res.render('content.ejs',{"data":data});
	});
});

//留言板
router.post('/add_msg.html',function(req,res){
	var email = req.body.email,//留言用户邮箱号
		namer = req.body.namer, //用户称呼
		msgcon = req.body.msgcon,//留言内容
		imgUrl = req.body.imgUrl,
		date = new Date(),
		ctime = date.getFullYear()+"-"+checkTime((date.getMonth()+1))+"-"+checkTime(date.getDate());
		
	var msg = new msgModel(); //实例化
	msg.email = email;
	msg.namer = namer;
	msg.msgcon = msgcon;
	msg.imgUrl = imgUrl;
	msg.ctime = ctime.toString();
	msg.save(function(err){
		if(err){
			throw err;
		}else{
			res.send("<script>alert('留言成功!');location.href ='./messageMe.html'</script>");
		}
	});
});

//显示留言
router.get('/show_msg.html',function(req,res){
	var page = req.query.page || 0,
		pagesize = 6;
	msgModel.find().skip(page*pagesize).limit(pagesize).exec(function(err,data){
		res.send(data);
	});
});

//显示日记
router.get('/show_diary.html',function(req,res){
	var page = parseInt(req.query.page) || 0,
		pagesize = 6; 
	diaryModel.find({}).sort({"dtime":-1}).skip(page*pagesize).limit(pagesize).exec(function(err,data){
		res.send(data);
	});
});

//前台首页文章列表
router.get('/article_index.html',function(req,res){
	var pagesize = 6, //设置每页显示数据的条数
		page = parseInt(req.query.page) || 1; //接收客户端传入的当前页码数 默认值是1
	
	articleModel.find().exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize), //根据读取数据库的数据总数计算总页数
			start = (page-1)*pagesize;

		articleModel.find().sort({"ctime":-1}).skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount); //将分页总页数 加到读取处的数据数组中 返回到客户端
			res.send(data);
		});
	});
});

//点赞
router.get('/add_help.html',function(req,res){
	var id = req.query.id,
		help = req.query.help;
	
	articleModel.findById(id).exec(function(err,data){
		data.help = help;
		data.save(function(err){
		});
	});
});

//前台文章详情
router.get('/article.html',function(req,res){
	var id = req.query.id;
	articleModel.findById(id).exec(function(err,data){
		res.render('article.ejs',{data:data});
	});
});

//文章内容
router.get('/article_con.html',function(req,res){
	var id = req.query.id;
	articleModel.findById(id).exec(function(err,data){
		res.send(data);
	});
});


//前台首页技术文章
router.get('/tecArticle_index.html',function(req,res){
	articleModel.find({"classify":{$ne:"爱生活"}}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台首页爱生活文章
router.get('/lifeArticle_index.html',function(req,res){
	articleModel.find({"classify":"爱生活"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台web前端文章列表
router.get('/article_webfore.html',function(req,res){
	var pagesize = 6, //设置每页显示数据的条数
		page = parseInt(req.query.page) || 1; //接收客户端传入的当前页码数 默认值是1
	
	articleModel.find({"classify":{$ne:"爱生活"}}).exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize), //根据读取数据库的数据总数计算总页数
			start = (page-1)*pagesize;

		articleModel.find({"classify":{$ne:"爱生活"}}).sort({"ctime":-1}).skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount); //将分页总页数 加到读取处的数据数组中 返回到客户端
			res.send(data);
		});
	});
});

//前台web前端文章精选html
router.get('/article_html.html',function(req,res){
	articleModel.find({"classify":"html"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台web前端文章精选css
router.get('/article_css.html',function(req,res){
	articleModel.find({"classify":"css"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台web前端文章精选js
router.get('/article_js.html',function(req,res){
	articleModel.find({"classify":"javascript"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台web前端文章精选node
router.get('/article_node.html',function(req,res){
	articleModel.find({"classify":"nodejs"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台web前端文章精选ifram
router.get('/article_ifram.html',function(req,res){
	articleModel.find({"classify":"框架"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//前台web前端文章精选other
router.get('/article_other.html',function(req,res){
	articleModel.find({"classify":"其他"}).limit(6).exec(function(err,data){
		res.send(data);
	});
});

//爱生活文章
router.get('/article_lifestyle.html',function(req,res){
	var page = parseInt(req.query.page) || 1,
		pagesize = 6;
	articleModel.find({"classify":"爱生活"}).exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize),
			start = (page-1)*pagesize;
		
		articleModel.find({"classify":"爱生活"}).skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount);
			res.send(data);
		});
	});
});

//获取当前用户和身份的路由
router.get('/getcurrent_user.html',function(req,res){
	var username = req.cookies.username;
	userModel.find({"username":username}).exec(function(err,data){
		res.send(data);
	});
});

//保存文章评论的路由
router.post('/savecomment.html',function(req,res){
	var id = req.body.id,
		content = req.body.content,
	date = new Date(),
	ctime = date.getFullYear()+"-"+checkTime((date.getMonth()+1))+"-"+checkTime(date.getDate());
	
	var comment = new commentModel();
	comment.id = id;
	comment.content = content;
	comment.ctime = ctime;
	
	comment.save(function(err){
		if(err){
			res.send({"errcode":1267,"msg":"保存失败!"});
		}else{
			res.send({"errcode":0,"msg":"评论成功!"});
		}
	});
});

//显示文评论的路由
router.get('/showcomment.html',function(req,res){
	var id = req.query.id,
		page = parseInt(req.query.page) || 0,
		pagesize = 6;
		
	commentModel.find({"id":id}).skip(page*pagesize).limit(pagesize).exec(function(err,data){
		res.send(data);
	});
});

//保存评论数量
router.get('/save_commentNum.html',function(req,res){
	var id = req.query.id;
	commentModel.find({"id":id}).exec(function(err,data){
		var discuss = data.length;
		articleModel.findById(id).exec(function(err,data){
			data.discuss = discuss;
			data.save(function(err){
				if(err){
					throw err;
				}else{
					res.send({"errcode":1567,"msg":"保存成功!"});
				}
			});
		});
	});
});


//显示友情链接
router.get('/show_links.html',function(req,res){
	friendLinkModel.find().limit(6).exec(function(err,data){
		res.send(data);
	});
});


module.exports = router;
