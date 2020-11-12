<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>产品管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<!-- <el-row class="topLineHeight">
				<el-col :span="1">
					<span class="leftTitle">搜索信息</span>
				</el-col>
				<el-col :span="5">
					<el-input
						v-model="search_where.keyWord"
						placeholder="编号/申请人/被放行人"
						size="small"
						class="width90F"
					>
						<i
							slot="prefix"
							class="el-input__icon el-icon-search"
						></i>
					</el-input>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						类型
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.releaseGoldType"
						size="small"
						class="width90F"
						placeholder="请选择"
						@change="changeStatus"
					>
						<el-option
							v-for="item in typeList"
							:key="item.ind"
							:label="item.txt"
							:value="item.ind"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						状态
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.status"
						size="small"
						class="width90F"
						placeholder="请选择"
						@change="changeStatus"
					>
						<el-option
							v-for="item in orderStatusSear"
							:key="item.ind"
							:label="item.txt"
							:value="item.ind"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						所属部门
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.deptId"
						placeholder=""
						size="small"
						class="width90F"
					>
						<el-option
							v-for="item in deptList"
							:key="item.deptId"
							:label="item.deptName"
							:value="item.deptId"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						申请时间
					</div>
				</el-col>
				<el-col :span="5">
					<el-date-picker
						v-model="createTime"
						type="daterange"
						align="right"
						unlink-panels
						size="small"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期 "
						:default-time="['00:00:00', '23:59:59']"
						style="width:80%"
						:picker-options="$publicData.pickerOptions"
						@change="createTimeChange"
					></el-date-picker>
				</el-col>
			</el-row>
			<el-row class="topLineHeight">
				<el-col :span="1">
					<span class="leftTitleOne">放行时间</span>
				</el-col>
				<el-col :span="5">
					<el-date-picker
						v-model="releaseTime"
						type="daterange"
						align="right"
						unlink-panels
						size="small"
						style="width:90%"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期 "
						:default-time="['00:00:00', '23:59:59']"
						:picker-options="$publicData.pickerOptions"
						@change="releaseTimeChange"
					></el-date-picker>
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
			</div> -->

			<div>
				<el-table
					:data="orderList"
					height="750"
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
						label="主题ID"
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
				</el-table>
				<!-- <div class="pageDiv">
					<el-pagination
						:current-page.sync="pageNum"
						:page-sizes="[12, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="orderSize"
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					></el-pagination>
				</div> -->
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
	loadingTF: Boolean = false

	created() {
		this.created_fun()
	}

	created_fun() {
		this.getAllDate() //放行条读取
	}
	getAllDate() {
		let self = this
		this.loadingTF = true
		app.$api.proManage().then(
			res => {
				console.log("res:", res.data.data)
				self.loadingTF = false
				if (res.data.code == 200) {
					self.orderList = res.data.data ? res.data.data : []
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
		console.log("e:", e)
		this.$router.push({
			path: "proDetails",
			query: { proId: e.product_id }
		})
	}
}
</script>

<style scoped lang="scss">
@import "proMangeList.scss";
</style>
