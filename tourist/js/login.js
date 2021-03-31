var login = {
				btnLogin: document.getElementById("login"),
				account: document.getElementById("account"),
				password: document.getElementById("password"),
				regButton: document.getElementById("reg"),
				oauthArea: document.getElementById("oauthArea"),
				autoLoginButton: document.getElementById("autoLogin"),
				autoLogin: false
			};
			//用于隐藏下面的oauth区域
			window.addEventListener('resize', function() {
				login.oauthArea.style.display = document.body.clientHeight > 400 ? 'block' : 'none';
			}, false);
			mui.ready(function() {
				login.btnLogin.addEventListener("tap", function() {
					if(!rcgl.regExp.notEmptyReg.test(login.account.value)) {
						mui.toast('请输入帐号');
						return;
					}
					if(!rcgl.regExp.notEmptyReg.test(login.password.value)) {
						mui.toast('请输入密码');
						return;
					}
					mui(login.btnLogin).button("loading");
					rcgl.dataType.userInfo.UserName = login.account.value;
					rcgl.dataType.userInfo.UserPassword = login.password.value;

					// 查询本地存储有灭有相关用户
					let userArr = JSON.parse(localStorage.getItem("userArr"))||[]
					userArr.forEach(item=>{
						console.log(item)
						if(item.UserName==rcgl.dataType.userInfo.UserName){
							console.log(item.UserName,item.UserPassword)
							if(item.UserPassword==rcgl.dataType.userInfo.UserPassword){
								console.log(item.UserPassword)
								localStorage.setItem('isLogin',JSON.stringify(item))
								window.location.href="index.html"
							}else{
								mui(login.btnLogin).button("reset");
								mui.toast("密码错误！")
								return
								
							}
						}
					})
					setTimeout(()=>{
						mui(login.btnLogin).button("reset");
					mui.toast("没有该账户")
					},100)
					

					// mui.ajax(api_url.userLoginUrl, {
					// 	type: "POST",
					// 	headers: {
					// 		'Content-Type': 'application/json;charset=utf-8'
					// 	},
					// 	data: JSON.stringify(rcgl.dataType.userInfo),
					// 	success: function(data) {
					// 		console.log(JSON.stringify(data));
					// 		mui.fire(mine, "updateLogin");
					// 		mui(login.btnLogin).button("reset");
					// 		//登录成功
					// 		if(data.status == "ok") {
					// 			//保存是否自动登录
					// 			var settings = rcgl.getSettings();
					// 			settings.autoLogin = login.autoLogin;
					// 			rcgl.setSettings(settings);
					// 			//保存用户token
					// 			rcgl.SetUserToken(data.res);
							
					// 			console.log(self.data);
					// 			if(self.data) {
					// 				var data = JSON.parse(self.data);
					// 				//console.log(data.win);
					// 				if(data && data.win) {
					// 					mui.openWindow({
					// 						id: data.win,
					// 						url: data.win,
					// 						extras: {
					// 							data: JSON.stringify(data)
					// 						}
					// 					});
					// 				} else {
					// 					plus.webview.getWebviewById("main.html").show();
					// 				}
					// 				self.close();
					// 			}
					// 			else{
					// 				plus.webview.getWebviewById("main.html").show();
					// 				self.close();
					// 			}
					// 		} else {
					// 			mui.toast(data.res);
					// 		}
					// 	},
					// 	error: function(xhr, type, errorThrown) {
					// 		//异常处理；
					// 		console.log(type);
					// 		mui(login.btnLogin).button("reset");
					// 	}
					// });
				});
				//打开注册页面
				login.regButton.addEventListener("tap", function() {
					mui.openWindow({
						id: "reg.html",
						url: "reg.html",
						extras: {
							data: self.data
						}
					});
				});
				//自动登录开关切换
				login.autoLoginButton.addEventListener("toggle", function() {
					login.autoLogin = !login.autoLogin;
				});

			});