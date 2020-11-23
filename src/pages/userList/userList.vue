<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<el-row class="topLineHeight">
				<!-- <el-col :span="1">
					<div class="leftTitleOne">
						类型
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.cateId"
						size="small"
						class="width90F"
						placeholder="请选择"
					>
						<el-option
							v-for="item in categoryList"
							:key="item.category_id"
							:label="item.category_name"
							:value="item.category_id"
						></el-option>
					</el-select>
				</el-col> -->
				<el-col :span="5" class="tRight" :offset="17">
					<div class="width80F">
						<el-button
							type="primary"
							plain
							size="small"
							class="width86"
							@click="resetSear"
						>
							重 置
						</el-button>
						<el-button
							type="primary"
							size="small"
							class="width86"
							@click="sureSear"
						>
							查 询
						</el-button>
					</div>
				</el-col>
			</el-row>
			<div class="spaceStyleOne"></div>
			<div class="searchTxtDiv">
				搜索结果
				<el-button type="primary" size="small" @click="addUserFun">
					新增用户
				</el-button>
				<el-dialog
					title="新增用户"
					:visible.sync="addUserTF"
					width="500px"
					:close-on-click-modal="false"
				>
					<el-row class="UserDiv">
						<el-col :span="6">
							用户名称:
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="UserObj.user_name"
								placeholder="请输入内容"
								size="small"
							></el-input>
						</el-col>
						<el-col :span="6">
							用户别名：
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="UserObj.user_namesub"
								placeholder="请输入内容"
								size="small"
							></el-input>
						</el-col>
						<el-col :span="6">
							用户编号：
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="UserObj.user_number"
								placeholder="请输入内容"
								size="small"
							></el-input>
						</el-col>
						<el-col :span="6">
							输入密码：
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="UserObj.password"
								type="password"
								placeholder="请输入内容"
								size="small"
							></el-input>
						</el-col>
						<el-col :span="6">
							再输入密码：
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="UserObj.passwordA"
								type="password"
								placeholder="再输一次密码"
								size="small"
							></el-input>
						</el-col>
					</el-row>
					<span slot="footer" class="dialog-footer">
						<el-button size="small" @click="addUserTF = false"
							>取 消</el-button
						>
						<el-button type="primary" size="small" @click="saveUser"
							>确 定</el-button
						>
					</span>
				</el-dialog>
			</div>

			<div>
				<el-table
					:data="orderList"
					height="600"
					:header-cell-style="{
						fontWeight: '#bold',
						background: '#fafafa'
					}"
					border
					style="width: 100%;"
					@row-dblclick="orderDetail"
				>
					<el-table-column
						prop="user_id"
						label="用户id"
					></el-table-column>
					<el-table-column
						prop="user_name"
						label="用户名称"
					></el-table-column>
					<el-table-column
						prop="user_namesub"
						label="用户别名"
					></el-table-column>
					<el-table-column
						prop="user_number"
						label="用户编号"
					></el-table-column>
					<el-table-column prop="isdefault" label="操作" width="200">
						<template slot-scope="scope">
							<div class="tCenter">
								<el-button
									size="small"
									@click="editUser(scope.row)"
								>
									编辑
								</el-button>
								<el-button
									type="primary"
									size="small"
									@click="delUser(scope.row)"
								>
									删除
								</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="pageDiv">
					<el-pagination
						:current-page.sync="search_where.pageNum"
						:page-sizes="[12, 30, 50, 100]"
						:page-size="search_where.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="orderSize"
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { Vue, Component, Userp, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class proMangeList extends Vue {
	orderList: Array<object> = []
	categoryList: Array<object> = [] //主题列表
	search_where: Object = { cateId: "", pageNum: 1, pageSize: 12 }
	loadingTF: Boolean = false
	orderSize: number = 0 //放行单总个数
	addUserTF: Boolean = false //新增用户弹框
	UserObj: Object = {}

	created() {
		this.created_fun()
	}

	created_fun() {
		this.getAllDate() //放行条读取
	}
	getAllDate() {
		let self = this
		this.loadingTF = true
		app.$api.userList(this.search_where).then(
			res => {
				self.loadingTF = false
				if (res.data.code == 200) {
					self.orderList = res.data.data ? res.data.data : []
					self.orderSize = res.data.userNum
				} else {
					self.$message.error(res.data.msg)
				}
			},
			err => {
				self.loadingTF = false
			}
		)
	}
	orderDetail(e) {
		this.$router.push({
			path: "userDetails",
			query: { userId: e.user_id }
		})
	}
	//重置按钮
	resetSear() {
		this.search_where = { cateId: "", pageSize: 12, pageNum: 1 }
		this.getAllDate()
	}
	//查询按钮
	sureSear() {
		this.getAllDate()
	}
	//分页事件开始
	handleSizeChange(val) {
		this.search_where.pageSize = val
		this.search_where.pageNum = 1
		this.getAllDate(1, val)
	}
	handleCurrentChange(val) {
		this.getAllDate(val, this.search_where.pageSize)
	}
	//新增用户弹框
	addUserFun() {
		this.UserObj = {}
		this.addUserTF = true
	}
	//保存用户
	saveUser() {
		let self = this
		if (
			this.UserObj.password.length < 6 ||
			this.UserObj.password != this.UserObj.passwordA
		) {
			this.$message.error("密码格式不正确，请重新输入！")
			return
		}
		if (this.UserObj.user_id) {
			//编辑用户
			let params = this.UserObj
			console.log("编辑用户：", this.UserObj)
			// self.loadingTF = true
			// app.$api
			// 	.editUser(params)
			// 	.then(res => {
			// 		self.loadingTF = false
			// 		self.$message.success(res.data.msg)
			// 		self.addUserTF = false
			// 		setTimeout(_ => {
			// 			self.created_fun()
			// 		}, 1000)
			// 	})
			// 	.then(err => {
			// 		self.loadingTF = true
			// 	})
		} else {
			//新增用户
			let params = this.UserObj
			console.log("新增用户：", this.UserObj)
			self.loadingTF = true
			app.$api
				.addUser(params)
				.then(res => {
					self.loadingTF = false
					self.$message.success(res.data.msg)
					self.addUserTF = false
					setTimeout(_ => {
						self.created_fun()
					}, 1000)
				})
				.then(err => {
					self.loadingTF = true
				})
		}
	}
	//编辑用户
	editUser(e) {
		this.UserObj = e
		this.addUserTF = true
	}
	//删除用户
	delUser(e) {
		let self = this
		this.$confirm(`删除此用户-${e.user_name}?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				let params = {
					user_id: e.user_id
				}
				self.loadingTF = true
				app.$api
					.delUser(params)
					.then(res => {
						self.loadingTF = false
						self.$message.success(res.data.msg)
						setTimeout(_ => {
							self.created_fun()
						}, 1000)
					})
					.then(err => {
						self.loadingTF = true
						// console.log("err:", err)
					})
			})
			.catch(() => {})
	}
}
</script>

<style scoped lang="scss">
@import "userList.scss";
</style>
