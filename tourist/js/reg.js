
var reg = {
				regButton: document.getElementById("reg"),
				account: document.getElementById("account"),
				password: document.getElementById("password"),
				confirmpassword: document.getElementById("password_confirm"),
				tel: document.getElementById("phone"),
				email: document.getElementById("email")
			};
	
			mui.ready(function() {
				
				reg.regButton.addEventListener('tap', function() {
					if(!valideUser()) {
						return;
					}
					mui(this).button("loading");
					rcgl.dataType.userInfo.UserName = reg.account.value;
					rcgl.dataType.userInfo.UserPassword = reg.password.value;
					rcgl.dataType.userInfo.UserTel = reg.tel.value;
					rcgl.dataType.userInfo.UserEmail = reg.email.value;
					console.log(JSON.stringify(rcgl.dataType.userInfo));
					//此部分为ajax请求，删除，改为本地存储
					let userArr = JSON.parse(localStorage.getItem('userArr'))||[]
					userArr.push(rcgl.dataType.userInfo)
					localStorage.setItem("userArr",JSON.stringify(userArr))
					window.location.href='login.html'
					// mui.ajax(api_url.userRegisterUrl, {
					// 	type: "POST",
					// 	headers: {
					// 		'Content-Type': 'application/json;charset=utf-8'
					// 	},
					// 	data: JSON.stringify(rcgl.dataType.userInfo),
					// 	success: function(data) {
					
					// 		mui("#reg").button("reset");
					// 		console.log(data);
					// 		if(data == 'ok') {
					// 			mui.toast('注册成功');
					// 			plus.webview.currentWebview().close();
					// 		} else {
					// 			mui.toast(data);
					// 		}
					// 	},
					// 	error: function(xhr, type, errorThrown) {
					// 		//异常处理；
					// 		console.log(type);
					// 		mui("#reg").button("reset");
					// 	}
					// });
				})
				
			});
// rcgl中regExp为正则，dataType为数据体
			function valideUser() {
				if(!rcgl.regExp.notEmptyReg.test(reg.account.value+"")) {
					mui.toast('请输入帐号');
					return false;
				}
				if(!rcgl.regExp.notEmptyReg.test(reg.password.value+"")) {
					console.log(!rcgl.regExp.notEmptyReg.test(reg.password.value+""))
					console.log(reg.password.value,"value")
					mui.toast('请输入密码');
					return false;
				}
				if(!rcgl.regExp.notEmptyReg.test(reg.confirmpassword.value+"")) {
					mui.toast('请确认密码');
					return false;
				}
				if(reg.confirmpassword.value+"" != reg.password.value+"") {

					mui.toast('密码两次输入不一致');
					return false;
				}
				if(!rcgl.regExp.notEmptyReg.test(reg.email.value+"")) {
					mui.toast('请输入Email');
					return false;
				}
				if(!rcgl.regExp.emailReg.test(reg.email.value+"")) {
					mui.toast('请输入正确的邮箱');
					return false;
				}
				if(!rcgl.regExp.notEmptyReg.test(reg.tel.value+"")) {
					mui.toast('请输入手机');
					return false;
				}
				if(!rcgl.regExp.mobileReg.test(reg.tel.value+"")) {
					mui.toast('请输入正确的手机号');
					return false;
				}

				return true;

			}