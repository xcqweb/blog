var mongoose=require("mongoose");

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/blog',function(err){
	if(err){
		throw err;
	}else{
		console.log('数据库连接成功...');
	}
});

//创建留言板板骨架
var msgSchema = new mongoose.Schema({
	email:String,
	msgcon:String,
	ctime:String,
	namer:String,
	imgUrl:String
});

//创建文章骨架
var articleSchema = new mongoose.Schema({
	title:String, //标题
	author:String, //作者
	imgUrl:String, //图片地址
	content:String, //文章内容
	ctime:String,  //发表时间
	skim:Number,  //浏览次数
	help:Number,  //点赞数
	discuss:String,//评论
	classify:String //文章分类
});

//创建文章评论骨架
var commentSchema = new mongoose.Schema({
	content:String,
	ctime:String,
	id:String
});

//创建用户登录骨架
var userSchema = new mongoose.Schema({
	username:String,
	password:String,
	role:String,
	sort:String
});

//创建日记骨架
var diarySchema = new mongoose.Schema({
	content:String,
	dtime:String
});

//创建日志骨架
var logSchema = new mongoose.Schema({
	username:String,
	optime: String,
	content:String,
	result:String,
	ip:String
});

//创建友情链接路由
var friendLinkSchema = new mongoose.Schema({
	namer:String,
	links:String,
	ltime:String,
	sort:Number
});

global.msgModel = mongoose.model('msg',msgSchema,'msg');
global.articleModel = mongoose.model('article',articleSchema,'article');
global.userModel = mongoose.model('user',userSchema,'user');
global.diaryModel = mongoose.model('diary',diarySchema,'diary');
global.logModel = mongoose.model('log',logSchema,'log');
global.commentModel = mongoose.model('comment',commentSchema,'comment');
global.friendLinkModel = mongoose.model('friendLink',friendLinkSchema,'friendLink');
module.exports=mongoose;