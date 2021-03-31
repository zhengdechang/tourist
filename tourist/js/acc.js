//定义程序全句对象，用于设计一些通用的方法
var meishiapp = {};
/*获取相应的artTemplate模板,采用同步获取*/
meishiapp.getTemplate = function(tmpl, container) {
	mui.ajax(tmpl, {
		type: "GET",
		async: false,
		success: function(res) {
			container.innerText = res;
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

/*获取用户的UserToken*/
meishiapp.GetUserToken = function() {
	var token = plus.storage.getItem("user_token");
	return token;
}
/*设置用户的UserToken*/
meishiapp.SetUserToken = function(token) {
	plus.storage.setItem("user_token",token);
}
/*注销用户的UserToken*/
meishiapp.removeUserToken=function(){
	plus.storage.removeItem("user_token");
}

//封装应用中的所有传递数据格式
meishiapp.dataType = {};
//请求美食列表的数据格式
meishiapp.dataType.foodData = {
	lat: null, //纬度
	lon: null, //经度
	radius: "10", //半径
	offset: 0, //页码
	limit: 5, //数据条数
	keyword: "" //关键词
};
//用户注册时的数据格式
meishiapp.dataType.userInfo={
	UserName:null,
	UserPass:null,
    UserTel:null,
    UserEmail:null
}

meishiapp.setttings={
	autoLogin:false
};

//获取app的相关配置
meishiapp.getSettings=function(){
	var settings=JSON.parse(plus.storage.getItem("settings"));
	if(!settings){
		return meishiapp.setttings;
	}
	return settings;
}
//设置app的相关配置
meishiapp.setSettings=function(settings){
	plus.storage.setItem("settings",JSON.stringify(settings));
}

//注销
meishiapp.signout=function(){
	//清除自动登录
	meishiapp.setttings.autoLogin=false;
	this.setSettings(meishiapp.setttings);
	//移除用户token
	this.removeUserToken();
}

/*移除收藏*/
meishiapp.removeFavour = function(deal_id) {
	var favour = JSON.parse(plus.storage.getItem("favourdata"));
	if(favour) {
		for(var i = 0; i < favour.length; i++) {
			if(deal_id == favour[i].deal_id) {
				favour.splice(i, 1);
				break;
			}
		}
	}
	plus.storage.setItem("favourdata", JSON.stringify(favour));
}

/*进行授权打开页面，没有token的一律先转向登录,data是需要传递的数据对象*/
meishiapp.openAuthorWindow = function(win, data) {
	if(!data) {
		data = {};
	}
	data.win = win;
	var token = this.GetUserToken();
	//console.log("tt:"+token);
	//没有token
	if(!token) {
		mui.openWindow({
			id: 'login.html',
			url: 'login.html',
			extras:{
				data:JSON.stringify(data)
			}
		});
	}
	else{
		mui.openWindow({
			id: win,
			url: win,
			extras:{
				data:JSON.stringify(data)
			}
		});
	}
}

//正则表达式
meishiapp.regExp={
	notEmptyReg:/\S/,
	emailReg:/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
	mobileReg:/^1[3|4|5|7|8]\d{9}$/
}

//专用于url字符串替换
String.prototype.format=function()
{  
  if(arguments.length==0) return this;  
  for(var s=this, i=0; i<arguments.length; i++)  
    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
  return s;  
};  

var api_url={};
//通过经纬度获取所在城市api
api_url.getCityUrl="http://www.meishihui68.com.cn/api/geo?latitude={0}&longitude={1}";
//美食获取api
api_url.getFoodUrl="http://www.meishihui68.com.cn/api/food";
//根据类别的美食获取api
api_url.getFoodByCatUrl="http://www.meishihui68.com.cn/api/food?cat={0}";
//取美食详细api
api_url.getFoodDetailByIDUrl="http://www.meishihui68.com.cn/api/food?deal_id={0}";
//取美食评论api
api_url.getCommmentUrl="http://www.meishihui68.com.cn/api/comment?dealID={0}&count={1}&page={2}";
//订单数据url
api_url.orderUrl="http://www.meishihui68.com.cn/api/order?UserToken={0}";
//上传评价图片url
api_url.uploadimgUrl="http://www.meishihui68.com.cn/SaveImg.ashx";
//评论发布
api_url.commentUrl="http://www.meishihui68.com.cn/api/comment";
//用户评论详情
api_url.orderCommentUrl="http://www.meishihui68.com.cn/api/order?UserToken={0}&OrderID={1}";
//用户注册api
api_url.userRegisterUrl="http://www.meishihui68.com.cn/api/user";
//用户登录api
api_url.userLoginUrl="http://www.meishihui68.com.cn/api/account";
//抽奖api
api_url.winlotteryUrl="http://www.meishihui68.com.cn/api/lottery?token={0}&type={1}";
//红包记录api
api_url.lotteryListUrl="http://www.meishihui68.com.cn/api/lottery?token={0}";
//获取用户名api
api_url.getUserNameUrl="http://www.meishihui68.com.cn/api/account?token={0}";
//升级说明文件url
api_url.upgradeTxtUrl="http://www.meishihui68.com.cn/update.json";
