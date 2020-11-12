<template>
	<div v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>人员类放行管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div>
			<el-row class="orderTop">
				<el-col :span="14" class="orderTopDiv">
					人员类放行条详情
					<span
						v-for="(item, indOne) in $publicData.orderStatusList"
						v-if="result.release.status == item.ind"
						:key="indOne"
						:style="{ color: item.color }"
						>{{ item.txt || "-" }}
					</span>
				</el-col>
				<el-col :span="6" style="text-align:right;">
					<el-button
						v-if="
							result.release.status == 3 &&
								result.release.otherStatus == 0 &&
								mjPeopleHxTF
						"
						size="small"
						@click="cancelPersonFun"
					>
						核销
					</el-button>
					<el-button
						size="small"
						type="primary"
						@click="printQrcodeFun"
					>
						打印二维码
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="spaceStyleOne"></div>
		<div class="info">
			<div class="info-top">
				<div class="infot-table">
					<div class="orderTitTxtOne">
						审核流程
					</div>
					<el-row>
						<el-col :span="20">
							<Steps
								:data="flowData"
								style="padding: 15px 0;"
							></Steps>
						</el-col>
					</el-row>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						放行信息
						<span>编号：{{ result.release.orderNo || "-" }}</span>
					</div>
					<div>
						<div class="displayFlex">
							<div class="titLeft">
								被放行人：
							</div>
							<div class="titRight">
								{{ result.release.releases || "-" }}
							</div>
						</div>
						<div class="displayFlex">
							<div class="titLeft">
								所属单位：
							</div>
							<div class="titRight">
								{{ result.release.companyName || "-" }}
							</div>
						</div>
						<div class="displayFlex">
							<div class="titLeft">
								所属部门：
							</div>
							<div class="titRight">
								{{ result.release.deptName || "-" }}
							</div>
						</div>

						<div class="displayFlex">
							<div class="titLeft">
								去向：
							</div>
							<div class="titRight">
								{{ result.release.destin || "-" }}
							</div>
						</div>

						<div class="displayFlex">
							<div class="titLeft">
								个人物品：
							</div>
							<div class="titRight">
								{{ result.release.effects || "-" }}
							</div>
						</div>
						<div class="displayFlex">
							<div class="titLeft">
								申请时间：
							</div>
							<div class="titRight">
								{{ result.release.createTime || "-" }}
							</div>
						</div>
						<div class="displayFlex">
							<div class="titLeft">
								放行日期：
							</div>
							<div class="titRight">
								{{ result.release.releaseTime || "-" }}
							</div>
						</div>

						<div class="displayFlex">
							<div class="titLeft">
								放行原因：
							</div>
							<div class="titRight">
								{{ result.release.releaseRemark || "-" }}
							</div>
						</div>
						<!-- <div
							v-if="result.release.releaseRemarkTF"
							class="displayFlex"
						>
							<div class="titLeftT">
								放行原因备注：
							</div>
							<div class="titRight">
								{{ result.release.releaseRemark || "-" }}
							</div>
						</div> -->
						<div class="displayFlex">
							<div class="titLeft">
								返回时间：
							</div>
							<div class="titRight">
								{{ result.release.returnTime || "-" }}
							</div>
						</div>
						<!-- 已驳回4-->
						<div v-if="result.release.status == 4">
							<div class="displayFlex">
								<div class="titLeft">
									驳回备注：
								</div>
								<div class="titRight">
									{{ result.release.backRemark || "-" }}
								</div>
							</div>
						</div>
						<!-- 保安驳回5-->
						<div v-if="result.release.status == 5">
							<div class="displayFlex">
								<div class="titLeftT">
									保安驳回备注：
								</div>
								<div class="titRightT">
									{{ result.release.securityRemark || "-" }}
								</div>
							</div>
						</div>
						<!-- 已放行3 -->
						<div v-if="result.release.status == 3">
							<div class="displayFlex">
								<div class="titLeft">
									保安亭:
								</div>
								<div class="titRight">
									{{ result.release.securityPost || "-" }}
								</div>
							</div>
							<div class="displayFlex">
								<div class="titLeft">
									保安姓名：
								</div>
								<div class="titRight">
									{{ result.release.securityName || "-" }}
								</div>
							</div>
							<div class="displayFlex">
								<div class="titLeft">
									离厂时间：
								</div>
								<div class="titRight">
									{{ result.release.leaveTime || "-" }}
								</div>
							</div>
							<div class="displayFlex">
								<div class="titLeft">
									核销状态：
								</div>
								<div class="titRight">
									<span v-if="result.release.otherStatus == 0"
										>待核销</span
									>
									<span v-if="result.release.otherStatus == 1"
										>半核销</span
									>
									<span v-if="result.release.otherStatus == 2"
										>已核销</span
									>
								</div>
							</div>
							<div class="displayFlex">
								<div class="titLeft">
									返厂时间：
								</div>
								<div class="titRight">
									{{ result.release.realReturnTime || "-" }}
								</div>
							</div>
							<div
								v-if="result.release.otherStatus == 2"
								class="displayFlex"
							>
								<div class="titLeft">
									核销人：
								</div>
								<div class="titRight">
									{{
										result.release.realReturnUserName || "-"
									}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="确认核销" :visible.sync="rejectTF" width="400px">
			<div>
				<el-date-picker
					v-model="cancelTime"
					type="datetime"
					placeholder="选择核销时间"
					default-time="12:00:00"
					size="small"
					style="width:100%"
				>
				</el-date-picker>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="rejectTF = false"
					>取 消</el-button
				>
				<el-button type="primary" size="small" @click="rejectSaveFun"
					>确定核销</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { $getLodop } from "../../utils/LodopFuncs"

import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class goldCateDetails extends Vue {
	result: Object = { release: {} }
	caseId: string = ""
	loadingTF: boolean = false
	rejectTF: boolean = false //核销弹框
	mjPeopleHxTF: boolean = false //人员核销权限
	flowData: Array[object] = [] //流程显示方法
	cancelTime: string = ""

	created() {
		this.caseId = this.$route.query.caseId
		this.created_fun()
		// 获取权限
		this.powerFun()
	}

	created_fun() {
		this.getAllDate()
		this.flowFun() //流程调用方法
	}
	//流程调用方法
	flowFun() {
		let self = this

		let params = {
			caseId: this.caseId
		}
		app.$api
			.findBusinessProcessById(params)
			.then(res => {
				if (res.status == 200) {
					self.flowData = res.data
				} else {
					self.$message.error(res.msg)
				}
			})
			.then(err => {
				// console.log("err:", err)
			})
	}
	//获取人员类详情
	getAllDate() {
		let self = this

		let params = {
			caseId: this.caseId
		}
		app.$api
			.getStaffReleaseById(params)
			.then(res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.result = res.data
				} else {
					self.$message.error(res.msg)
				}
			})
			.then(err => {
				// console.log("err:", err)
			})
	}
	//权限判断
	powerFun() {
		this.mjPeopleHxTF = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"mj-people-hx"
		)
	}
	//返回上一页
	returnFun() {
		this.$router.go(-1)
	}
	//核销人员弹框
	cancelPersonFun() {
		this.rejectTF = true

		this.cancelTime = ""
	}
	//核销人员方法
	rejectSaveFun() {
		if (!this.cancelTime || this.cancelTime.length == 0) {
			this.$message.error("核销时间未填，请重新输入！")
			return
		}
		let time1 = new Date(app.$u.dateGetTime(this.cancelTime)) //核销时间
		let time2 = new Date(this.result.release.leaveTime) //原订单返回返厂时间
		if (time1 < time2) {
			this.$message.error("核销时间不能早于离开时间，请重新输入！")
			return
		}
		let self = this
		self.loadingTF = true
		let params = {
			id: this.caseId,
			realReturnTime: app.$u.dateGetTime(this.cancelTime)
		}
		app.$api
			.writeoffOperationByStaff(params)
			.then(res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.$message.success("人员核销成功，正在刷新")
					self.rejectTF = false
					setTimeout(() => {
						self.created_fun()
					}, 100)
				} else {
					self.$message.error(res.msg)
				}
			})
			.then(err => {
				self.rejectTF = false
				// console.log("err:", err)
			})
	}
	//打印二维码
	printQrcodeFun() {
		this.LODOP = $getLodop()
		this.LODOP.PRINT_INIT("")

		//一维条形码
		this.LODOP.ADD_PRINT_BARCODE(
			"10mm",
			"10mm",
			"30mm",
			"12mm",
			"128Auto",
			this.result.release.orderNo
		)
		//二维吗
		// this.LODOP.ADD_PRINT_BARCODE(
		// 	30,
		// 	61,
		// 	250,
		// 	100,
		// 	"QRCode",
		// 	"2020 0510 2001"
		// )
		// this.LODOP.SET_PRINT_STYLEA(0, "QRCodeVersion", 7) //设置二维码版本为7
		this.LODOP.PREVIEW() //打印预览
	}
}
</script>

<style scoped lang="scss">
@import "personCateManageList.scss";
</style>
