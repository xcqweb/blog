var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	eje = require('ejs'),
	mongoose = require('./link');

//后台添加文章
router.post('/save_add.html',function(req,res){
	//接收客户端传的POST数据
	var title=req.body.title,
		imgUrl=req.body.imgUrl,
		author=req.body.author,
		content=req.body.content,
		classify=req.body.classify,
		date = new Date(),
		ctime=date.getFullYear()+"-"+checkTime((date.getMonth()+1))+"-"+checkTime(date.getDate());
	//创建实体用于向数据库新增数据
	var article=new articleModel();
	article.title=title;
	article.imgUrl=imgUrl;
	article.author=author;
	article.content=content;
	article.classify=classify;
	article.skim=1;
	article.help=1;
	article.ctime=ctime.toString();
	
	article.save(function(err){
		if(err){
			throw err;
		}else{
			addLog(req.cookies.username,"新增文章"+title,req.ip,"成功");
			res.send('<script>alert("文章发布成功!"); location.href="/admin/articlelist.html";</script>');
		}
	});
});

//后台文章列表 (查询分页)
router.get('/list.html',function(req,res){
	var page = parseInt(req.query.page) || 1,
		pagesize = 14, //单页显示数据条数

		keyword = req.query.keyword || "", //设置默认值
		classify = req.query.classify || "全部";
	
	//构建查询对象
	var obj={};
	if(classify!=="全部"){
		obj.classify = classify;
	}
	
	if(keyword.length>0){
		obj.classify =new RegExp(keyword); //构建正则表达式
	}
	
	articleModel.find(obj).exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize), //总页数
			start = (page-1)*pagesize;
		
		articleModel.find(obj).sort({"ctime":-1}).skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount); //将总页数打包出去到客户端
			res.send(data); 
		});
	});
});

//后台修改文章
router.get('/edit.html',function(req,res){
	var id = req.query.id; //获取要修改数据的id
	articleModel.findById(id).exec(function(err,data){
		res.render('articleEdit.ejs',{data:data});
	});
});

//保存修改
router.post('/save_edit.html',function(req,res){
	//接收客户端传的POST数据
	var title=req.body.title,
		imgUrl=req.body.imgUrl,
		author=req.body.author,
		content=req.body.content,
		classify=req.body.classify,
		id = req.body.id,
		date = new Date(),
		ctime=date.getFullYear()-2+"-"+checkTime((date.getMonth()+3))+"-"+checkTime(date.getDate());
	
	//创建实体用于向数据库新增数据
	articleModel.findById(id).exec(function(err,data){
		data.title=title;
		data.imgUrl=imgUrl;
		data.author=author;
		data.content=content;
		data.classify=classify;
		data.skim=1;
		data.help=1;
		data.ctime=ctime.toString();
		
		data.save(function(err){
			if(err){
				throw err;
			}else{
			addLog(req.cookies.username,"修改文章"+title,req.ip,"成功");
				res.send('<script>alert("文章修改成功!"); location.href="/admin/articlelist.html";</script>');
			}
		});
	});
});

//删除文章
router.post('/delete.html',function(req,res){
	var ids  = req.body.ids;
	ids = ids.split(","); //将字符串转换成数组
	
	articleModel.find({"_id":{$in:ids} }).exec(function(err,data){
		var arr=[]; //用于存放promise
		
		for(var i in data){
			arr.push(new Promise(function(resolve,reject){
				var title = data[i].title;
				data[i].remove(function(err){
					if(err){
						reject(title+'失败!');
					}else{
						resolve(title+'成功!');
					}
				});
			}));
		}
		//管理异步数据
		Promise.all(arr).then(function(datas){
			var str = datas.join("|||");
			addLog(req.cookies.username,"删除文章"+str,req.ip,"成功");
			res.send({"errcode":0,"msg":"数据删除成功!"})
		});
	});
});

//文章分类
router.get('/classify.html',function(req,res){
	articleModel.find({}).exec(function(err,data){
	});
});


//编写日记
router.post('/add_diary.html',function(req,res){
	var content = req.body.content,
		date = new Date(),
		dtime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+checkTime(date.getDate());
	
	var diary = new diaryModel();
	diary.content = content;
	diary.dtime = dtime;
	diary.save(function(err){
		if(err){
			throw err;
		}else{
			addLog(req.cookies.username,"新增日记"+content,req.ip,"成功");
			res.send("<script>alert('保存成功!');location.href='/admin/diarylist.html';</script>");
		}
	});
});

//显示日记列表(分页)
router.get('/diarylist_d.html',function(req,res){
	var page = parseInt(req.query.page) || 1,
		pagesize = 14; //单页显示数据条数
	
	diaryModel.find().exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize), //总页数
			start = (page-1)*pagesize;
		
		diaryModel.find().sort({"dtime":-1}).skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount); //将总页数打包出去到客户端
			res.send(data);
		});
	});
});

//删除日记
router.post('/delete_d.html',function(req,res){
	var ids  = req.body.ids;
	ids = ids.split(",");
	
	diaryModel.find({"_id":{$in:ids}}).exec(function(err,data){
			var arr=[]; //用于存放promise
			
			for(var i in data){
				arr.push(new Promise(function(resolve,reject){
					var content = data[i].content;
					data[i].remove(function(err){
						if(err){
							reject(content+"失败!");
						}else{
							resolve(content+"成功!");
						}
					});
				}));
			}
		
		//管理异步数据
		Promise.all(arr).then(function(datas){
			var str = datas.join("|||");
			addLog(req.cookies.username,"删除日记"+str,req.ip,"成功");
			res.send({"errcode":0,"msg":"数据删除成功!"});
		});
	});
});

//修改日记
//找到要修改的数据渲染到模板上
router.get('/edit_d.html',function(req,res){
	var id  = req.query.id;
	diaryModel.findById(id).exec(function(err,data){
		res.render('diaryedit.ejs',{"data":data});		
	});
});

//保存修改后的日记
router.post('/save_diaryedit.html',function(req,res){
	var id  = req.body.editid,
		content  = req.body.content,
		date = new Date(),
		dtime = date.getFullYear()-1+"-"+checkTime((date.getMonth()+1-6))+"-"+checkTime(date.getDate()-12);
	
	diaryModel.findById(id).exec(function(err,data){
		data.dtime = dtime;
		data.content = content;
		data.save(function(err){
			addLog(req.cookies.username,"修改日记"+content,req.ip,"成功");
			res.send('<script>alert("日记修改成功!"); location.href="/admin/diarylist.html";</script>');
		});
	});
});


//后台留言列表
router.get('/msglist_m.html',function(req,res){
	var page = parseInt(req.query.page) || 1;
	var pagesize = 14; //单页显示数据条数
	
	msgModel.find().exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize); //总页数
		var start = (page-1)*pagesize;
		
		msgModel.find().sort({"ctime":-1}).skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount); //将总页数打包出去到客户端
			res.send(data);
		});
	});
});

//删除留言
router.post('/delete_m.html',function(req,res){
	var ids = req.body.ids; //获取从客户端发送过来的要删除数据的id
	ids = ids.split(",");
	
	msgModel.find({"_id":{$in:ids}}).exec(function(err,data){
		var arr=[]; //用于存放promise
		
		for(var i in data){
			arr.push(new Promise(function(resolve,reject){
				var name = data[i].namer;
				data[i].remove(function(err){
					if(err){
						reject(name+"失败");
					}else{
						resolve(name+"成功");
					}
				});
			}));
		}
		
		Promise.all(arr).then(function(datas){
			var str = datas.join("|||");
			addLog(req.cookies.username,"删除"+str+"的留言",req.ip,"成功");
			res.send({"errcode":1217,"msg":"留言删除成功!"});
		});
	});
	
});


/*登入验证*/
 router.post('/login_p.html',function(req,res,next){
 	var username = req.body.username,
 		password = req.body.password;
 	userModel.find({"username":username,"password":password}).exec(function(err,data){
 		//对用户名和密码进行最简单的验证
	  if(data.length){  
	  		//设置cookie
	  		res.cookie("username",username);
	      	res.redirect("/admin");
		}else{	
		    res.send('<script>alert("用户名和密码错误!"); location.href="/admin/login.html";</script>');
		}
	});
});

//修改密码
router.get('/password_edit.html',function(req,res){
	var username = req.cookies.username;
	userModel.find({"username":username}).exec(function(err,data){
		res.send(data);
	});
});

//保存修改的密码
router.post('/save_editpassword.html',function(req,res){
	var username = req.cookies.username,
		old_password = req.body.old_password, 
		new_password = req.body.new_password, 
		confirm_password = req.body.confirm_password; 
	
	userModel.find({"username":username,"passsword":old_password}).exec(function(err,data){
		if(data.length){
			var user = new userModel();
			user.password = new_password;
			user.save(function(err){
				if(err){
					res.send({"errcode":1122,"msg":"密码保存失败!"});
				}else{
					res.send({"errcode":0,"msg":"恭喜你密码保存成功!"});
				}
			});
		}else{
			res.send({'errcode':1233,'msg':'抱歉!原密码错误!'});
		}
	});
});


//验证是否登录
router.get('/loginState.html',function(req,res){

	if(req.cookies.username){
		res.send("1");
	}else{
		res.send("alert('请登录后使用!');location.href='/admin/login.html';");
	}
});

//验证只有超级管理员允许访问
router.get('/checkAdmin.html',function(req,res){
	if(req.cookies.username!=="admin"){
		res.send("alert('抱歉!您没有访问权限!');location.href='/admin';");
	}else{
		res.send("1");
	}
});

//注销登入
router.get('/logout.html',function(req,res){
	res.clearCookie("username");
	res.send('<script>alert("退出成功，欢迎下次再来!");location.href="/admin/login.html";</script>');
});

//管理员列表
router.get('/userlist.html',function(req,res){
	userModel.find({}).sort({"sort":1}).exec(function(err,data){
		res.render('userlist.ejs',{"data":data});
	});
});

//新增管理员
router.post('/add_user.html',function(req,res){
	var username = req.body.username,
		password = req.body.password,
		role = req.body.role,
		sort = req.body.sort;
	
	userModel.find({"username":username}).exec(function(err,data){
		if(data.length){
			res.send("<script>alert('该用户名太受欢迎,请更换其他!');location.href='./adduser.html';</script>")
		}else{
				var user = new userModel();
				user.username = username;
				user.password = password;
				user.role = role;
				user.sort = sort;
				
				//保存新增用户数据
				user.save(function(err){
					if(err){
						throw err;
					}else{
						addLog(req.cookies.username,"新增用户"+username,req.ip,"成功");
						res.send("<script>alert('新增用户成功!');location.href='./userlist.html';</script>")
					}
				});
			}
	});	
});

//删除管理员用户
router.get('/delete_u.html',function(req,res){
	var id = req.query.id;
	userModel.findById(id).exec(function(err,data){
		var username = data.username;
		data.remove(function(){
			addLog(req.cookies.username,"删除用户"+username,req.ip,"成功");
			res.send("<script>alert('删除用户成功!');location.href='./userlist.html';</script>");
		});
	});
});

//修改管理员用户
router.get('/edit_u.html',function(req,res){
	var id = req.query.id;
	userModel.findById(id).exec(function(err,data){
		res.render('edituser.ejs',{"data":data});
	});
});

//保存修改用户
router.post('/save_edituser.html',function(req,res){
	var username = req.body.username,
		password = req.body.password,
		role = req.body.role,
		sort = req.body.sort,
		id = req.body.editid;
	
	userModel.findById(id).exec(function(err,data){
		data.username = username;
		data.password = password;
		data.role = role;
		data.sort = sort;
		
		//保存修改用户数据
		data.save(function(err){
			if(err){
				throw err;
			}else{
				//日志
			addLog(req.cookies.username,"修改用户"+username,req.ip,"成功");
				res.send("<script>alert('修改用户成功!');location.href='./userlist.html';</script>")
			}
		});
	});
});

//新增友情链接路由
router.post('/add_friendLink.html',function(req,res){
	var links = req.body.links,
		sort  = req.body.sort,
		namer  = req.body.namer,
		date = new Date(),
		ltime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+checkTime(date.getDate())+" "+checkTime(date.getHours())+":"+checkTime(date.getMinutes());
	
	var friendLink = new friendLinkModel();
	friendLink.links = links;
	friendLink.namer = namer;
	friendLink.ltime = ltime;
	friendLink.sort = sort;
	friendLink.save(function(err){
		res.send("<script>alert('链接保存成功!'); location.href='/admin/linkList.html';</script>");
	});
});

//显示链接列表
router.get('/linkList_m.html',function(req,res){
	friendLinkModel.find().exec(function(err,data){
		res.send(data);
	});
});

//删除友情链接
router.post('/delete_link.html',function(req,res){
	var ids = req.body.ids;
	ids = ids.split(",");
	
	friendLinkModel.find({"_id":{$in:ids}}).exec(function(err,data){
		var arr=[];
		for(var i in data){
			arr.push(new Promise(function(resolve,reject){
				data[i].remove(function(err){
					if(err){
						reject("失败!");
					}else{
						resolve("成功!");
					}
				});
			}));
		}
		
		//异步管理数据
		Promise.all(arr).then(function(datas){
			var str = arr.join("|||");
			addLog(req.cookies.username,"删除链接",req.ip,"成功");
			res.send({"errcode":3432,"msg":"链接删除成功"});
		});
	})
});

//显示日志的路由
router.get('/showlog.html',function(req,res){
	var pagesize = 17; //每页显示数据条数
	var page = parseInt(req.query.page) || 1; //默认显示第一页
	
	logModel.find().exec(function(err,data){
		var pagecount = Math.ceil(data.length/pagesize); //总页数
		var start = (page-1)*pagesize;
		logModel.find().skip(start).limit(pagesize).exec(function(err,data){
			data.push(pagecount); // 将总页数返回到客户端
			res.send(data);
		});
	});
});

//删除日志的路由
router.post('/delete_log.html',function(req,res){
	var ids = req.body.ids;
	ids = ids.split(",");
	
	logModel.find({"_id":{$in:ids}}).exec(function(err,data){
		var arr = [];
		for(var i in data){
			arr.push(new Promise(function(resolve,reject){
				data[i].remove(function(err){
					if(err){
						reject("失败");
					}else{
						resolve("成功");
					}
				});
			}));
		}
		//管理异步数据
		Promise.all(arr).then(function(datas){
			var str = datas.join("|||");
			addLog(req.cookies.username,"删除日志",req.ip,"成功");
			res.send({"errcode":34232,"msg":"日志删除成功"});
		});
	});
});

//定义一个函数实现记录日志的功能
function addLog(username,content,ip,result){
	var log = new logModel(); //实例化日志模型用于保存日志数据
	log.username = username;
	log.content = content;
	log.ip = ip;
	log.result = result;
	
	var date = new Date();
	var optime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+checkTime(date.getDate())+" "+checkTime(date.getHours())+":"+checkTime(date.getMinutes());
	
	log.optime = optime.toString();
	//保存日志
	log.save();
}

//将日期格式转换成    xx:xx:xx 格式
;(function(){
		function _checkTime(i){
		if(i<10){
			return "0"+i;
		}else{
			return i;
		}
	}
		global.checkTime = _checkTime;
})();


module.exports = router;