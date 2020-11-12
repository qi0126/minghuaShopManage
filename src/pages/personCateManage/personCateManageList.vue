<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>人员类放行管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<el-row class="topLineHeight">
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
						状态
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.status"
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
						核销状态
					</div>
				</el-col>
				<el-col :span="3">
					<el-select
						v-model="search_where.otherStatus"
						size="small"
						class="width90F"
						placeholder="请选择"
						@change="changeStatus"
					>
						<el-option
							v-for="item in otherStatusList"
							:key="item.ind"
							:label="item.txt"
							:value="item.ind"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="1">
					<div class="leftTitleOne">
						放行时间
					</div>
				</el-col>
				<el-col :span="5">
					<el-date-picker
						v-model="releaseTime"
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
						@change="releaseTimeChange"
					></el-date-picker>
				</el-col>
			</el-row>
			<el-row class="topLineHeight">
				<el-col :span="5" class="tRight" :offset="19">
					<div class="width80F">
						<el-button
							type="primary"
							plain
							size="small"
							class="width70"
							@click="resetSear"
						>
							重 置
						</el-button>
						<el-button
							type="primary"
							size="small"
							class="width70"
							@click="sureSear"
						>
							查 询
						</el-button>
						<!--
						<el-button
							type="primary"
							plain
							size="small"
							class="width70"
							@click="addGo"
						>
							新 增
						</el-button> -->
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
					height="530"
					:header-cell-style="{
						fontWeight: '#bold',
						background: '#fafafa'
					}"
					style="width: 100%;"
					@row-dblclick="orderDetail"
				>
					<el-table-column
						type="index"
						width="50"
						label="序号"
					></el-table-column>
					<el-table-column
						prop="orderNo"
						label="编号"
					></el-table-column>
					<el-table-column
						prop="deptName"
						label="所属部门"
					></el-table-column>
					<!-- <el-table-column
						prop="createName"
						label="申请人"
					></el-table-column> -->
					<el-table-column
						prop="releases"
						label="被放行人"
					></el-table-column>
					<el-table-column
						prop="releaseTime"
						label="放行日期"
					></el-table-column>
					<el-table-column
						prop="leaveTime"
						label="离厂时间"
					></el-table-column>

					<el-table-column prop="otherStatus" label="核销状态">
						<template slot-scope="scope">
							<span v-if="scope.row.otherStatus == 0"
								>待核销</span
							>
							<!-- <span v-if="scope.row.otherStatus == 1"
								>半核销</span
							> -->
							<span v-if="scope.row.otherStatus == 2"
								>已核销</span
							>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="状态">
						<template slot-scope="scope">
							<span
								v-for="(item,
								indOne) in $publicData.orderStatusList"
								v-if="scope.row.status == item.ind"
								:key="indOne"
								:style="{ color: item.color }"
								>{{ item.txt }}</span
							>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="name" label="操作">
						<template slot-scope="scope">
							<el-button
								size="small"
								class="btnRight"
								@click="editOrder(scope.row)"
							>
								编辑
							</el-button>
						</template>
					</el-table-column> -->
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
		<el-dialog
			:title="editOrderTF ? '编辑人员放行申请' : '新建人员放行申请'"
			:visible.sync="addGoTF"
			width="700"
		>
			<el-row class="detailDiv" style="padding:0;line-height:50px;">
				<el-col :span="4" class="tRight">
					被放行人：
				</el-col>
				<el-col :span="5" class="tLeft">
					<el-input
						v-model="search_where.orderNo"
						placeholder="被放行人"
						class="width300"
						size="small"
					>
					</el-input>
				</el-col>
				<el-col :span="6" class="tRight">
					所属部门：
				</el-col>
				<el-col :span="9" class="tLeft">
					<el-select
						v-model="search_where.companyId"
						placeholder="请输入部门"
						size="small"
						class="width300"
					>
						<el-option
							v-for="item in customerData"
							:key="item.companyId"
							:label="item.companyName"
							:value="item.companyId"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" class="tRight">
					去向：
				</el-col>
				<el-col :span="5" class="tLeft">
					<el-input
						v-model="search_where.orderNo"
						placeholder="去向"
						class="width300"
						size="small"
					>
					</el-input>
				</el-col>
				<el-col :span="6" class="tRight">
					个人物品：
				</el-col>
				<el-col :span="9" class="tLeft">
					<el-input
						v-model="search_where.orderNo"
						placeholder="个人物品"
						class="width300"
						size="small"
					>
					</el-input>
				</el-col>
				<el-col :span="4" class="tRight">
					放行日期：
				</el-col>
				<el-col :span="5" class="tLeft">
					<el-date-picker
						v-model="releaseTime"
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
						@change="releaseTimeChange"
					></el-date-picker>
				</el-col>
				<el-col :span="6" class="tRight">
					放行原因：
				</el-col>
				<el-col :span="9" class="tLeft">
					<el-input
						v-model="search_where.orderNo"
						placeholder="放行原因"
						class="width300"
						size="small"
					>
					</el-input>
				</el-col>
				<el-col :span="4" class="tRight">
					返回时间：
				</el-col>
				<el-col :span="20" class="tLeft">
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
			</el-row>
			<el-row>
				<span v-if="editOrderTF">
					<el-col :span="4" class="tRight">
						编号：
					</el-col>
					<el-col :span="5" class="tLeft">
						202005105213
					</el-col>
					<el-col :span="6" class="tRight">
						状态：
					</el-col>
					<el-col :span="9" class="tLeft">
						已驳回
					</el-col>
					<el-col :span="4" class="tRight">
						驳回备注：
					</el-col>
					<el-col :span="20" class="tLeft">
						日期不对
					</el-col>
				</span>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" class="width86" @click="addGoTF = false"
					>取 消</el-button
				>
				<el-button
					type="primary"
					size="small"
					class="width86"
					@click="confirmFun"
					>确定申请</el-button
				>
			</span>
		</el-dialog>
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
	value1: string = ""
	searchloading: boolean = false
	customerData: Array<object> = [] //下单公司
	addGoTF: boolean = false //新增放行弹框
	editOrderTF: string = false //编辑放行单状态，false为新增放行单，true为编辑放行单
	orderList: Array<object> = []
	search_where: Object = {
		status: "",
		keyWord: "",
		releaseGoldType: "",
		deptId: "",
		otherStatus: ""
	}
	orderStatusSear: Array<object> = []
	otherStatusList: Array<object> = [
		{ ind: "", txt: "全部" },
		{ ind: 0, txt: "待核销" },
		// { ind: 1, txt: "半核销" },
		{ ind: 2, txt: "已核销" }
	]
	createTime: string = "" //申请时间
	releaseTime: string = "" //放行时间
	pageNum: number = 1 //默认第一页
	pageSize: number = 12 //每页显示条目个数
	orderSize: number = 0 //放行单总个数
	loadingTF: boolean = false
	deptList: Array<object> = [] //所属部门

	created() {
		this.created_fun()
		// this.powerFun()
	}

	created_fun() {
		this.orderStatusSear = [
			{ ind: "", txt: "全部", color: "#FF0402" }
		].concat(this.$publicData.orderStatusListOne)
		this.getAllDate(1, 12) //放行条读取
		this.findUserDeptList() //根据用户查询公司的部门列表
	}
	//根据用户查询公司的部门列表
	findUserDeptList() {
		app.$api.findUserDeptList().then(res => {
			if (res.status == 200) {
				this.deptList = [{ deptId: "", deptName: "全部" }].concat(
					res.data
				)
			} else {
				this.$message.error(res.msg)
			}
		})
	}
	getAllDate(num, size) {
		let self = this
		this.loadingTF = true
		let params = {
			start: num,
			limit: size
		}
		Object.assign(params, self.search_where)
		app.$api.findStaffReleasePage(params).then(
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
	// 申请时间改变
	createTimeChange() {
		if (this.createTime && this.createTime.length > 0) {
			this.search_where.createTimeStart = app.$u.dateGetDay(
				this.createTime[0]
			)
			this.search_where.createTimeEnd = app.$u.dateGetDay(
				this.createTime[1]
			)
		} else {
			delete this.search_where.createTimeStart
			delete this.search_where.createTimeEnd
		}

		this.pageNum = 1
	}
	//放行时间改变
	releaseTimeChange() {
		if (this.releaseTime && this.releaseTime.length > 0) {
			this.search_where.releaseTimeStart = app.$u.dateGetDay(
				this.releaseTime[0]
			)
			this.search_where.releaseTimeEnd = app.$u.dateGetDay(
				this.releaseTime[1]
			)
		} else {
			delete this.search_where.releaseTimeStart
			delete this.search_where.releaseTimeEnd
		}
		this.pageNum = 1
	}
	changeStatus() {
		this.$forceUpdate()
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
	// 搜索订单
	sureSear() {
		this.pageNum = 1
		this.getAllDate(1, this.pageSize)
	}

	resetSear() {
		this.search_where = {
			status: "",
			keyWord: "",
			releaseGoldType: "",
			deptId: "",
			otherStatus: ""
		}
		this.createTime = ""
		this.releaseTime = ""
		this.pageNum = 1
		this.getAllDate(1, this.pageSize)
	}

	// 订单详情
	orderDetail(e) {
		this.$router.push({
			path: "personCateDetails",
			query: { caseId: e.id }
		})
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
	//新增放行弹框
	addGo() {
		this.editOrderTF = false
		this.addGoTF = true
	}
	//编辑放行单据
	editOrder(e) {
		console.log("e:", e)
		this.editOrderTF = true
		this.addGoTF = true
	}
	confirmFun() {
		console.log(this.editOrderTF)
	}
}
</script>

<style scoped lang="scss">
@import "personCateManageList.scss";
</style>
