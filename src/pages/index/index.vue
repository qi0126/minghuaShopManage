<template>
	<div class="index">
		<div class="headerWrapper">
			<div class="headerLeft">
				<span class="title">node商城后台管理</span>
				<el-menu
					:default-active="menuIndex"
					class="el-menu-demo"
					mode="horizontal"
					@select="handleSelect"
				>
					<el-menu-item
						v-for="(item, indOne) in menusMenu"
						:key="indOne + ''"
						:index="indOne + ''"
					>
						<span>{{ item.menuName }}</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="headerRight">
				<i class="el-icon-menu" @click="loginOut"></i>
			</div>
		</div>
		<div class="buttomWrapper">
			<div class="leftWrapper"></div>
			<div class="rightWrapper">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import _ from "lodash"
import { menu } from "./menuConfig"
import app from "@/global"

export default {
	data() {
		return {
			menuIndex: "0",
			menus: {
				menu: _.cloneDeep(menu),
			},
		}
	},

	computed: {
		menusMenu: function () {
			return this.menus.menu
				.filter((item) => item.showTF)
				.filter((item) => item.menuName !== "自营系统")
		},
	},

	created() {
		// this.getMenus()
		this.$router.push(this.menusMenu[0].menuUrl)
	},

	methods: {
		//一级菜单选择
		handleSelect(key) {
			this.menuIndex = key
			this.$router.push(this.menusMenu[key].menuUrl)
		},
		//退出登录
		loginOut() {
			localStorage.removeItem("userInfo")
			localStorage.removeItem("accesstoken")
			this.$router.push("/login")
		},
	},
}
</script>
<style>
.el-badge__content.is-fixed {
	right: -46px !important;
	top: 30px !important;
	width: 12px;
	height: 16px;
}
</style>
<style scoped lang="scss">
body {
	background-color: #f3f3f3;
}

.el-dropdown-link {
	cursor: pointer;
	margin-top: 20px;
	margin-left: 30px;
	display: block;
}
.el-icon-arrow-down {
	font-size: 12px;
}

.textCenter {
	text-align: center;
}

.index {
	overflow: hidden;

	.title {
		background-color: rgb(230, 14, 50);
		color: #ffffff;
		height: 33px;
		width: 195px;
		text-align: center;
		padding-top: 17px;
		font-size: 14px;
	}

	.headerWrapper {
		background: #ffffff;
		margin-bottom: 15px;
		box-shadow: 0 1px 5px #ebebeb;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.headerLeft {
			color: rgb(230, 14, 50);
			margin-left: 0px;
			display: flex;
			align-items: center;

			i.logoIcon:after {
				content: "\e61a";
				font-size: 1.5rem;
				margin-right: 5px;
			}
		}

		.headerRight {
			color: #2d2f33;
			margin-right: 25px;
			display: flex;
			align-items: center;
			font-size: 0.6rem;

			i {
				cursor: pointer;
			}

			i.outLoginIcon:after {
				content: "\e654";
				transition: color 0.5s;
			}

			i.outLoginIcon {
				&:hover {
					color: rgb(230, 14, 50);
				}
			}

			.accoutName {
				margin: 0 12px 0 5px;
				font-size: 14px;
				cursor: pointer;
			}
		}
	}

	.el-menu-demo {
		height: 50px;

		li {
			height: 50px;
			line-height: 50px;
		}

		/deep/ .el-submenu__title {
			height: 50px;
			line-height: 54px;
		}
	}

	.buttomWrapper {
		display: flex;

		.leftWrapper {
			width: 200px;
			box-shadow: 1px 0 5px #ebebeb;
			background: #ffffff;
			overflow: auto;
			overflow-x: hidden;
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			bottom: 0;
			border-top-right-radius: 8px;
		}

		.rightWrapper {
			border-top-left-radius: 8px;
			padding: 15px 15px 0 15px;
			flex: 1;
			box-shadow: -1px 0 5px #ebebeb;
			background: #ffffff;
			overflow: auto;
			overflow-x: hidden;
			box-sizing: border-box;
			position: absolute;
			top: 60px;
			left: 210px;
			right: 0;
			bottom: 0;
		}
	}

	.editUserDiv {
		line-height: 40px;

		.editUserLeft {
			color: #999999;
		}

		.editUserRight {
			color: #333333;

			.userInp {
				width: 200px;
				margin-right: 30px;
				float: left;
			}
		}
	}

	.gold_999,
	.gold_9999,
	.platinum_950 {
		color: #878d99;
		font-size: 14px;
	}

	.gold_999:hover {
		color: red;
	}

	.gold_9999:hover {
		color: red;
	}

	.platinum_950:hover {
		color: red;
	}
}

i.bt-proManagerIcon:after {
	content: "\e601";
}

i.bt-genManagerIcon:after {
	content: "\e650";
}

i.bt-genColumnIcon:after {
	content: "\e61c";
}

i.bt-homePageCmIcon:after {
	content: "\e608";
}

i.bt-sellManagerIcon:after {
	content: "\e604";
}

i.bt-custManagerIcon:after {
	content: "\e607";
}

i.bt-orderManagerIcon:after {
	content: "\e602";
}

i.bt-systemManagerIcon:after {
	content: "\e61b";
}

i.bt-dataStatisticsIcon:after {
	content: "\e603";
}

i.bt-userFeedBackIcon:after {
	content: "\e60d";
}

i.bt-userManagerIcon:after {
	content: "\e61d";
}

i.bt-companyManagerIcon:after {
	content: "\e606";
}

.item {
	margin-top: 10px;
	margin-right: 40px;
}
</style>
