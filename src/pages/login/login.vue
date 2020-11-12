<template>
	<div class="conBigDiv">
		<div v-if="printDisTF" class="printDis">
			系统需要安装打印机插件才能正常使用，请点击“下载安装”，安装完成后请在使用系统前刷新浏览器，<a
				href="http://bms.szsjysy.com/drivers/lodop-Batar.zip"
				>立即下载打印插件>></a
			>
		</div>
		<div id="loginBig">
			<el-row>
				<el-col :span="12">
					<img
						src="/static/images/loginImg/leftIco.png"
						class="leftIco"
					/>
				</el-col>
				<el-col :span="12">
					<div class="loginRight">
						<div class="loginRightOne">
							node商城后台管理
							<!-- <img
								src="/static/images/loginImg/logoIco2.png"
								class="logoIco"
							/> -->
						</div>
						<div class="loginRightTwo">
							<el-input
								v-model="userName"
								placeholder="请输入用户名"
								size="large"
							>
								<template slot="prepend">
									<i class="iconfont icon-yonghuming"></i>
								</template>
							</el-input>
							<br />
							<el-input
								ref="userPassword"
								v-model="userPassword"
								placeholder="请输入密码"
								type="password"
								size="large"
							>
								<template slot="prepend">
									<i
										slot="prefix"
										class="iconfont icon-mima"
									></i>
								</template>
							</el-input>
						</div>
						<div class="loginRightThree">
							<el-button
								type="primary"
								class="loginBtn"
								@click="loginFun"
							>
								登 录
							</el-button>
						</div>
					</div>
				</el-col>
			</el-row>
			<div class="divVersion">
				<div>当前版本系统V3.42.7</div>
			</div>
		</div>
	</div>
</template>
<script>
import app from "@/global"
import { $getLodop } from "../../utils/LodopFuncs"
export default {
	data() {
		return {
			userName: "",
			userPassword: "",
			printDisTF: false, //打印插件提示
			LODOP: {}
		}
	},
	created() {
		this.created_fun()
	},
	methods: {
		created_fun() {
			let self = this
			document.onkeydown = e => {
				let dom = this.$refs.userPassword
				if (dom && (e.code == "Enter" || e.code == "NumpadEnter")) {
					this.loginFun()
				}
			}
			setTimeout(_ => {
				self.LODOP = $getLodop()
				if (self.LODOP) {
					self.printDisTF = false
				} else {
					self.printDisTF = true
				}
			}, 2000)
		},
		loginFun() {
			let params = {
				loginName: this.userName,
				loginPawd: this.userPassword
			}
			app.$api.login(params).then(res => {
				// console.log("res:", res.data.data)
				localStorage.removeItem("accesstoken")
				if (res.data.code == 200) {
					localStorage.userInfo = JSON.stringify(res.data.data)
					localStorage.accesstoken = res.data.data.accesstoken
					this.$message({
						duration: 1500,
						showClose: true,
						message: "登录成功，正在跳转中！",
						type: "success"
					})
					this.$router.push("/index")
				} else {
					this.$message.error(res.data.msg)
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
.conBigDiv {
	height: 100%;
	background-image: url("/static/images/loginImg/background.png");
	text-align: center;
	padding-top: 10%;

	.title {
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 10px;
		margin-bottom: 10px;
	}

	.hr {
		border-top: 1px solid #d9d9d9;
		height: 3px;
		margin: 12px 0 12px 0;
	}

	.redfont {
		margin-bottom: 15px;
		padding-left: 10px;
		border-left: 3px solid #e60e32;
		font-size: 15px;
	}

	.red_font {
		color: rgb(230, 14, 50);
	}

	#loginBig {
		background-color: #ffffff;
		width: 1020px;
		height: 460px;
		border-radius: 10px;
		margin: 0 auto;
		text-align: center;
		padding-top: 100px;

		.leftIco {
			margin-left: 100px;
		}

		.loginRight {
			text-align: left;
			padding: 0px 80px 20px 65px;

			.loginRightOne {
				color: #e60e32;
				font-size: 26px;
				line-height: 50px;
				margin-bottom: 15px;
			}

			.loginRightTwo {
				line-height: 60px;
			}

			.loginRightThree {
				padding-top: 104px;
			}

			.loginBtn {
				width: 100%;
			}
		}

		.divVersion {
			margin-top: 70px;
			color: #919599;
			font-size: 12px;
			padding-left: 16px;
			text-align: left;
		}
	}
}
.printDis {
	height: 40px;
	border-radius: 10px;
	margin: 15px auto;
	line-height: 40px;
	background-color: #fff;
	color: #919599;
	font-size: 14px;
	width: 990px;
	text-align: left;
	padding-left: 30px;
}
.printDis a {
	color: #f20f34;
}
</style>
