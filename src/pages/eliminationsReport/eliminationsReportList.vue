<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>核销报表</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<el-row class="topLineHeight">
				<el-col :span="1">
					<span class="leftTitle">选择类别</span>
				</el-col>
				<el-col :span="4">
					<el-radio-group
						v-model="radio1"
						size="small"
						@change="changeRadio"
					>
						<el-radio-button label="生产设备类"></el-radio-button>
						<el-radio-button
							label="行政设备及物料类"
						></el-radio-button>
					</el-radio-group>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						核销时间
					</div>
				</el-col>
				<el-col :span="4">
					<el-date-picker
						v-model="writeoffTime"
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
						@change="writeoffTimeChange"
					></el-date-picker>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						核销状态
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.writeoffStatus"
						size="small"
						class="width90F"
						placeholder="请选择"
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
						是否超时
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.writeoffTimeOut"
						placeholder=""
						:remote-method="remoteMethod"
						:loading="searchloading"
						size="small"
						class="width90F"
						@focus="remoteMethod('')"
					>
						<el-option
							v-for="item in timeOutTFList"
							:key="item.ind"
							:label="item.txt"
							:value="item.ind"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-input
						v-model="search_where.keyWord"
						placeholder="物品名称/物品编号/放行条编号"
						style="width:80%"
						size="small"
						@keyup.enter.native="sureSear"
					>
						<i
							slot="prefix"
							class="el-input__icon el-icon-search"
						></i>
					</el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6" class="tRight" :offset="18">
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

			<NoDataPage
				v-if="!orderList || orderList.length === 0"
			></NoDataPage>
			<div v-else>
				<el-table
					:data="orderList"
					stripe
					height="530"
					:header-cell-style="{
						fontWeight: '#bold',
						background: '#fafafa'
					}"
					style="width: 100%;"
					@row-dblclick="orderDetail"
				>
					<el-table-column
						prop="orderNo"
						label="放行条编号"
					></el-table-column>
					<el-table-column
						prop="name"
						label="物品名称"
					></el-table-column>
					<el-table-column prop="no" label="编号"></el-table-column>
					<el-table-column prop="num" label="数量"></el-table-column>
					<el-table-column prop="weight" label="重量(kg)">
					</el-table-column>
					<el-table-column
						prop="planReturnTime"
						label="计划返回日期"
						width="180"
					></el-table-column>
					<el-table-column prop="writeoffStatus" label="核销状态">
						<template slot-scope="scope">
							<span>
								<span v-if="scope.row.writeoffStatus == 0"
									>待核销</span
								>
								<span v-if="scope.row.writeoffStatus == 1"
									>已核销</span
								>
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="writeoffUserName"
						label="核销人员"
					></el-table-column>
					<el-table-column
						prop="writeoffTime"
						label="核销时间"
						width="180"
					></el-table-column>
					<el-table-column prop="writeoffTimeOut" label="是否超时">
						<template slot-scope="scope">
							<span>
								<span v-if="scope.row.writeoffTimeOut == 0"
									>未超时</span
								>
								<span
									v-else-if="scope.row.writeoffTimeOut == 1"
									class="txtRed"
									>超时</span
								>
								<span v-else>-</span>
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="writeoffRemark"
						label="核销备注"
						width="220px"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.writeoffRemark">
								<span
									v-if="scope.row.writeoffRemark.length <= 10"
									>{{ scope.row.writeoffRemark }}</span
								>
								<span v-else>
									{{
										scope.row.writeoffRemark.substring(
											0,
											9
										)
									}}...
									<el-popover
										placement="top-start"
										width="200"
										trigger="hover"
										:content="scope.row.writeoffRemark"
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
				<div class="pageDiv">
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
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	powerControl: boolean = false
	modelType: boolean = false //弹框显示状态
	modelImgSrc: string = "" //弹框图片路径
	searchloading: boolean = false
	orderList: Array<object> = []
	search_where: Object = {
		keyWord: "",
		writeoffStatus: "",
		writeoffTimeOut: ""
	}
	radio1: string = "生产设备类"
	orderStatusSear: Array<object> = [
		{ ind: "", txt: "全部" },
		{ ind: 0, txt: "未销核" },
		{ ind: 1, txt: "已销核" }
	]
	timeOutTFList: Array<object> = [
		{ ind: "", txt: "全部" },
		{ ind: 0, txt: "未超时" },
		{ ind: 1, txt: "超时" }
	]
	writeoffTime: string = "" //核销时间
	pageNum: number = 1 //默认第一页
	pageSize: number = 12 //每页显示条目个数
	orderSize: number = 0 //放行单总个数
	loadingTF: boolean = false

	created() {
		this.created_fun()
		// this.powerFun()
	}

	created_fun() {
		this.getAllDate(1, 12) //放行条读取
	}
	//切换类别
	changeRadio() {
		this.resetSear()
	}
	getAllDate(num, size) {
		let params = {
			start: num,
			limit: size
		}
		Object.assign(params, this.search_where)
		if (this.radio1 == "生产设备类") {
			this.proFun(params)
		}
		if (this.radio1 == "行政设备及物料类") {
			this.publicFun(params)
		}
	}
	//生产设备类读取
	proFun(e) {
		let self = this
		this.loadingTF = true
		app.$api.findEquipWriteoffPage(e).then(
			res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.orderList = res.data.data ? res.data.data : []
					self.orderSize = res.data.rowSize
				} else {
					self.$message.error(res.msg)
				}
			},
			err => {
				self.loadingTF = false
			}
		)
	}
	//生产设备类读取
	publicFun(e) {
		let self = this
		this.loadingTF = true
		app.$api.findMaterWriteoffPage(e).then(
			res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.orderList = res.data.data ? res.data.data : []
					self.orderSize = res.data.rowSize
				} else {
					self.$message.error(res.msg)
				}
			},
			err => {
				self.loadingTF = false
			}
		)
	}
	//分页事件开始
	handleSizeChange(val) {
		this.pageSize = val
		this.pageNum = 1
		this.getAllDate(1, val)
	}
	handleCurrentChange(val) {
		this.getAllDate(val, this.pageSize)
	}
	changeStatus() {
		this.$forceUpdate()
	}
	// 搜索订单
	sureSear() {
		this.pageNum = 1
		this.getAllDate(1, this.pageSize)
	}
	// 重置订单
	resetSear() {
		this.search_where = {
			keyWord: "",
			writeoffStatus: "",
			writeoffTimeOut: ""
		}
		// this.radio1 = "生产设备类"
		this.writeoffTime = ""
		this.pageNum = 1
		this.getAllDate(1, this.pageSize)
	}

	// 申请时间改变
	writeoffTimeChange() {
		if (this.writeoffTime && this.writeoffTime.length > 0) {
			this.search_where.writeoffTimeStart = app.$u.dateGetDay(
				this.writeoffTime[0]
			)
			this.search_where.writeoffTimeEnd = app.$u.dateGetDay(
				this.writeoffTime[1]
			)
		} else {
			delete this.search_where.writeoffTimeStart
			delete this.search_where.writeoffTimeEnd
		}

		this.pageNum = 1
	}
	// 订单详情
	orderDetail(e) {
		// console.log(e)
	}

	// 下拉搜索
	remoteMethod(query) {
		let self = this
	}

	//权限判断
	powerFun() {
		this.powerControl = this.$publicData.checkPermissions(
			this.$store.state.queryVerify,
			"over_order_manage"
		)
	}
}
</script>

<style scoped lang="scss">
@import "eliminationsReportList.scss";
</style>
