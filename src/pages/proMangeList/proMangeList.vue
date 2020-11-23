<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>产品管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<el-row class="topLineHeight">
				<el-col :span="1">
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
				</el-col>
				<el-col :span="5" class="tRight" :offset="13">
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
				<el-button type="primary" size="small" @click="addProFun">
					新增产品
				</el-button>
				<el-dialog
					title="新增产品"
					:visible.sync="addProTF"
					width="500px"
					:close-on-click-modal="false"
				>
					<el-row class="ProDiv">
						<el-col :span="6">
							选择主题：
						</el-col>
						<el-col :span="18">
							<el-select
								v-model="ProObj.category_id"
								size="small"
								class="width90F"
								placeholder="请选择"
							>
								<el-option
									v-for="item in categoryListS"
									:key="item.category_id"
									:label="item.category_name"
									:value="item.category_id"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							选择店铺：
						</el-col>
						<el-col :span="18">
							<el-select
								v-model="ProObj.shop_id"
								size="small"
								class="width90F"
								placeholder="请选择"
							>
								<el-option
									v-for="item in shopList"
									:key="item.shop_id"
									:label="item.shop_name"
									:value="item.shop_id"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							产品名称:
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="ProObj.product_name"
								placeholder="请输入内容"
								size="small"
							></el-input>
						</el-col>
						<el-col :span="6">
							产品价格：
						</el-col>
						<el-col :span="18">
							<el-input-number
								v-model="ProObj.product_price"
								placeholder="请输入内容"
								size="small"
								:min="0"
							></el-input-number>
						</el-col>
						<el-col :span="6">
							产品优惠价：
						</el-col>
						<el-col :span="18">
							<el-input-number
								v-model="ProObj.product_uprice"
								placeholder="请输入内容"
								:min="0"
								size="small"
							></el-input-number>
						</el-col>
						<el-col :span="6">
							产品详情：
						</el-col>
						<el-col :span="18">
							<el-input
								v-model="ProObj.product_detail"
								type="textarea"
								:autosize="{ minRows: 2, maxRows: 4 }"
								placeholder="请输入内容"
								size="small"
							></el-input>
						</el-col>
						<el-col :span="6">
							上传图片：
						</el-col>
						<el-col :span="18">
							<input
								id="exFile"
								type="file"
								multiple
								@change="uploadImg($event)"
							/>
						</el-col>
					</el-row>
					<span slot="footer" class="dialog-footer">
						<el-button size="small" @click="addProTF = false"
							>取 消</el-button
						>
						<el-button type="primary" size="small" @click="savePro"
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
						prop="product_img_url"
						label="图片"
						align="center"
						width="150"
					>
						<template slot-scope="scope">
							<div class="tCenter">
								<img
									:src="scope.row.product_img_url"
									class="imgS"
								/>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="product_id"
						label="编号"
					></el-table-column>
					<el-table-column
						prop="category_name"
						label="主题"
					></el-table-column>
					<el-table-column
						prop="shop_name"
						label="店铺"
					></el-table-column>
					<el-table-column
						prop="shop_address"
						label="店铺地址"
					></el-table-column>
					<el-table-column
						prop="product_name"
						label="产品名称"
						width="300px"
					></el-table-column>
					<el-table-column
						prop="product_price"
						label="产品价格"
					></el-table-column>
					<el-table-column
						prop="product_uprice"
						label="产品优惠价"
					></el-table-column>
					<el-table-column
						prop="product_detail"
						label="产品详情"
						width="500px"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.product_detail">
								<span
									v-if="scope.row.product_detail.length <= 50"
									>{{ scope.row.product_detail }}</span
								>
								<span v-else>
									{{
										scope.row.product_detail.substring(
											0,
											50
										)
									}}...
									<el-popover
										placement="top-start"
										width="200"
										trigger="hover"
										:content="scope.row.product_detail"
									>
										<span
											slot="reference"
											class="txtRed cPointer"
										>
											更多</span
										>
									</el-popover>
								</span>
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="isdefault" label="操作" width="200">
						<template slot-scope="scope">
							<div class="tCenter">
								<el-button
									size="small"
									@click="editPro(scope.row)"
								>
									编辑
								</el-button>
								<el-button
									type="primary"
									size="small"
									@click="delPro(scope.row)"
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
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class proMangeList extends Vue {
	orderList: Array<object> = []
	categoryList: Array<object> = [] //主题列表
	categoryListS: Array<object> = [] //主题列表
	search_where: Object = { cateId: "", pageNum: 1, pageSize: 12 }
	loadingTF: Boolean = false
	orderSize: number = 0 //放行单总个数
	addProTF: Boolean = false //新增产品弹框
	ProObj: Object = {}
	shopList: Array<object> = [] //店铺列表

	created() {
		this.created_fun()
	}

	created_fun() {
		this.getAllDate() //放行条读取
		this.getCategoryList() //调用主题列表接口
		this.getShopList() //调用店铺列表接口
	}
	//调用店铺列表接口
	getShopList() {
		let self = this
		let params = { cateId: "", pageNum: 1, pageSize: 1000 }
		app.$api.shopList(params).then(
			res => {
				if (res.data.code == 200) {
					self.shopList = res.data.data ? res.data.data : []
				} else {
					self.$message.error(res.data.msg)
				}
			},
			err => {}
		)
	}
	//调用主题列表接口
	getCategoryList() {
		let self = this
		app.$api.categoryList().then(
			res => {
				if (res.data.code == 200) {
					self.categoryList = res.data.data ? res.data.data : []
					self.categoryListS = res.data.data
						? JSON.parse(JSON.stringify(res.data.data))
						: []

					self.categoryList.unshift({
						category_id: "",
						category_name: "全部"
					})
					// console.log("主题:", self.categoryList)
				} else {
					self.$message.error(res.data.msg)
				}
			},
			err => {}
		)
	}
	getAllDate() {
		let self = this
		this.loadingTF = true
		app.$api.proManage(this.search_where).then(
			res => {
				self.loadingTF = false
				if (res.data.code == 200) {
					self.orderList = res.data.data ? res.data.data : []
					self.orderSize = res.data.proNum
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
			path: "proDetails",
			query: { proId: e.product_id }
		})
	}
	uploadImg(e) {
		let files = e.target.files
		let result = false
		for (let i = 0; i < files.length; i++) {
			if (files[i].size > 1024 * 1024 * 2) {
				result = true
			}
		}
		if (result) {
			this.$message.error("图片大小不能超过2MB")
			return
		}
		for (let i = 0; i < files.length; i++) {
			this.upImg(files[i])
		}
	}
	upImg(file) {
		let param = new FormData() // 创建form对象
		param.append("file ", file) // 添加form表单中其他数据

		// 图片上传
		app.$api.uploadImg(param).then(
			res => {},
			err => {}
		)
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
	//新增产品弹框
	addProFun() {
		this.ProObj = {
			category_id: this.categoryListS[0].category_id,
			shop_id: this.shopList[0].shop_id,
			product_price: 0,
			product_uprice: 0
		}
		this.addProTF = true
	}
	//保存产品
	savePro() {
		let self = this
		if (this.ProObj.product_id) {
			//编辑产品
			let params = this.ProObj
			self.loadingTF = true
			app.$api
				.editPro(params)
				.then(res => {
					self.loadingTF = false
					self.$message.success(res.data.msg)
					self.addProTF = false
					setTimeout(_ => {
						self.created_fun()
					}, 1000)
				})
				.then(err => {
					self.loadingTF = true
				})
		} else {
			//新增产品
			let params = this.ProObj
			self.loadingTF = true
			app.$api
				.addPro(params)
				.then(res => {
					self.loadingTF = false
					self.$message.success(res.data.msg)
					self.addProTF = false
					setTimeout(_ => {
						self.created_fun()
					}, 1000)
				})
				.then(err => {
					self.loadingTF = true
				})
		}
	}
	//编辑产品
	editPro(e) {
		this.ProObj = e
		this.addProTF = true
	}
	//删除产品
	delPro(e) {
		let self = this
		this.$confirm(`删除此产品-${e.product_name}?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				let params = {
					product_id: e.product_id
				}
				self.loadingTF = true
				app.$api
					.delPro(params)
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
@import "proMangeList.scss";
</style>
