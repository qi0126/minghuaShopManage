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
	search_where: Object = { cateId: "",pageNum:1,pageSize:12 }
	loadingTF: Boolean = false
	orderSize: number = 0 //放行单总个数

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
		this.search_where = { cateId: "",pageSize:12,pageNum:1 }
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
@import "userList.scss";
</style>
