<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>保安放行管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<section>
				<div class="right20">
					<span class="leftTitle">选择类别：</span>
					<el-select
						v-model="search_where.bizType"
						placeholder="请选择"
						size="small"
					>
						<el-option
							v-for="ielem in bizTypeList"
							:key="ielem.ind"
							:label="ielem.txt"
							:value="ielem.ind"
						>
						</el-option>
					</el-select>
					<!-- <el-radio-group v-model="search_where.bizType" size="small">
						<el-radio-button
							v-for="ielem in bizTypeList"
							:key="ielem.ind"
							:label="ielem.ind"
						>
							{{ ielem.txt }}
						</el-radio-button>
					</el-radio-group> -->
				</div>
				<div>
					<span class="leftTitle">状态：</span>
					<el-select
						v-model="search_where.status"
						placeholder="请选择"
						size="small"
					>
						<el-option
							v-for="ielem in statusList"
							:key="ielem.ind"
							:label="ielem.txt"
							:value="ielem.ind"
						>
						</el-option>
					</el-select>
				</div>
				<div>
					<span class="leftTitle left20">放行时间</span>
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
						:picker-options="$publicData.pickerOptions"
						class="width300"
						@change="timeChange"
					></el-date-picker>
				</div>
				<div>
					<el-input
						ref="searchInput"
						v-model="search_where.keyWord"
						placeholder="编号/申请人/被放行人"
						class="width200A"
						size="small"
						@keyup.enter.native="sureSear"
					>
						<i
							slot="prefix"
							class="el-input__icon el-icon-search"
						></i>
					</el-input>
				</div>

				<div>
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
			</section>
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
					height="590"
					:header-cell-style="{
						fontWeight: '#bold',
						background: '#fafafa'
					}"
					style="width: 100%;"
					@row-dblclick="orderDetail"
				>
					<el-table-column prop="bizType" label="业务类型">
						<template slot-scope="scope">
							<span>{{
								$publicData.bizTypeList[scope.row.bizType].txt
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="orderNo"
						label="编号"
					></el-table-column>
					<el-table-column
						prop="releases"
						label="被放行人"
					></el-table-column>
					<el-table-column
						prop="releaseTime"
						label="放行日期"
					></el-table-column>
					<el-table-column
						prop="createName"
						label="申请人"
					></el-table-column>
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
	customerData: Array<object> = [] //下单公司
	orderList: Array<object> = []
	search_where: Object = {
		keyWord: "",
		status: "",
		bizType: 0
	}
	orderStatusSear: Array<object> = []
	typeList: Array<object> = [
		{ ind: "", txt: "全部" },
		{ ind: 1, txt: "常规" },
		{ ind: 2, txt: "批量" }
	]
	bizTypeList: Array<object> = [
		{ ind: 0, txt: "全部" },
		{ ind: 1, txt: "产品" },
		{ ind: 2, txt: "生产设备类" },
		{ ind: 3, txt: "行政设备及物料类" },
		{ ind: 4, txt: "人员类" }
	]
	statusList: Array<object> = [
		{ ind: "", txt: "全部" },
		{ ind: 2, txt: "待放行", color: "#000000" },
		{ ind: 3, txt: "已放行", color: "#15832E" },
		{ ind: 4, txt: "已驳回", color: "#FF0402" },
		{ ind: 5, txt: "保安驳回", color: "#FF0402" },
		{ ind: 6, txt: "已超标", color: "#FF0402" }
	]
	createTime: Array<object> = [new Date(), new Date()] //申请时间
	releaseTime: string = "" //放行时间
	pageNum: number = 1 //默认第一页
	pageSize: number = 12 //每页显示条目个数
	orderSize: number = 0 //放行单总个数
	loadingTF: boolean = false

	created() {
		this.timeChange()
		this.created_fun()

		// this.powerFun()
	}

	created_fun() {
		let self = this
		this.getAllDate(1, 12) //放行条读取
		setTimeout(_ => {
			self.$refs.searchInput.focus()
		}, 300)
	}
	getAllDate(num, size) {
		let self = this
		this.loadingTF = true
		let params = {
			start: num,
			limit: size
		}
		Object.assign(params, self.search_where)
		let paramsN = JSON.parse(JSON.stringify(params))
		if (paramsN.bizType == 0) {
			delete paramsN.bizType //选择全部情况下删除bizType
		}
		app.$api.findSecurityReleasePage(paramsN).then(
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
			status: "",
			bizType: 0
		}
		this.createTime = [new Date(), new Date()]
		this.timeChange()
		this.pageNum = 1
		this.getAllDate(1, this.pageSize)
	}

	// 时间改变
	timeChange() {
		if (this.createTime && this.createTime.length > 0) {
			this.search_where.releaseTimeStart = app.$u.dateGetDay(
				this.createTime[0]
			)
			this.search_where.releaseTimeEnd = app.$u.dateGetDay(
				this.createTime[1]
			)
		} else {
			delete this.search_where.releaseTimeStart
			delete this.search_where.releaseTimeEnd
		}
		this.pageNum = 1
	}
	// 订单详情
	orderDetail(e) {
		let routerList = {
			1: { txt: "safetyCateDetalisGold", caseId: e.id, remark: "产品" },
			2: {
				txt: "safetyCateDetalisPro",
				caseId: e.id,
				remark: "生产设备类"
			},
			3: {
				txt: "safetyCateDetalisPublic",
				caseId: e.id,
				remark: "行政设备物料类"
			},
			4: {
				txt: "safetyCateDetalisPerson",
				caseId: e.id,
				remark: "人员类"
			}
		}
		this.$router.push({
			path: routerList[e.bizType].txt,
			query: { caseId: e.id }
		})
	}

	// 下拉搜索
	remoteMethod(query) {
		let self = this
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
@import "safetyCateManageList.scss";
</style>
