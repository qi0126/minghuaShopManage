<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单管理</el-breadcrumb-item>
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
			</div>

			<div>
				<el-table
					:data="orderList"
					:header-cell-style="{
						fontWeight: '#bold',
						background: '#fafafa'
					}"
					border
					style="width: 100%;"
				>
					<el-table-column prop="product_img_url" label="产品图片">
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
						prop="order_id"
						label="订单id"
					></el-table-column>
					<el-table-column
						prop="orderno"
						label="订单编号"
					></el-table-column>
					<el-table-column
						prop="user_id"
						label="用户编号"
					></el-table-column>
					<el-table-column
						prop="user_namesub"
						label="用户全名"
					></el-table-column>
					<el-table-column
						prop="product_id"
						label="产品编号"
					></el-table-column>
					<el-table-column
						prop="ocount"
						label="订购数量"
					></el-table-column>
					<el-table-column
						prop="price"
						label="产品单价"
					></el-table-column>
					<el-table-column
						prop="total_price"
						label="订购总价"
					></el-table-column>
					<el-table-column prop="addressarea" label="地址">
						<template slot-scope="scope">
							<div class="tCenter">
								<span
									>{{ scope.row.addressarea }}-{{
										scope.row.addressinfo
									}}</span
								>
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
	search_where: Object = { cateId: "", pageNum: 1, pageSize: 12 }
	loadingTF: Boolean = false
	orderSize: number = 0 //放行单总个数

	created() {
		this.created_fun()
	}

	created_fun() {
		this.getAllDate() //放行条读取
		this.getCategoryList() //调用主题列表接口
	}
	getCategoryList() {
		let self = this
		app.$api.categoryList().then(
			res => {
				if (res.data.code == 200) {
					self.categoryList = res.data.data ? res.data.data : []
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
		app.$api.orderList(this.search_where).then(
			res => {
				self.loadingTF = false
				if (res.data.code == 200) {
					self.orderList = res.data.data ? res.data.data : []
					self.orderSize = res.data.orderNum
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
}
</script>

<style scoped lang="scss">
@import "orderList.scss";
</style>
