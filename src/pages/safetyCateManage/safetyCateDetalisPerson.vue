<template>
	<div ref="cateDetaolisGold" v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>
					保安放行管理-人员类
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div>
			<el-row class="orderTop">
				<el-col :span="24" class="orderTopDiv">
					人员类放行条详情
					<span
						v-for="(item, indOne) in $publicData.orderStatusList"
						v-if="
							result.release.status &&
								result.release.status == item.ind
						"
						:key="indOne"
						:style="{ color: item.color }"
						>{{ item.txt || "-" }}
					</span>
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
						<el-col :span="24">
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
								申请人：
							</div>
							<div class="titRight">
								{{ result.release.releases || "-" }}
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
								放行时间：
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
						<div class="displayFlex">
							<div class="titLeft">
								返回时间：
							</div>
							<div class="titRight">
								{{ result.release.returnTime || "-" }}
							</div>
						</div>
						<!-- 保安驳回5-->
						<div
							v-if="
								result.release.status == 3 ||
									result.release.status == 4 ||
									result.release.status == 5 ||
									result.release.status == 6
							"
						>
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
								<div class="titLeftT">
									保安驳回备注：
								</div>
								<div class="titRightT">
									{{ result.release.securityRemark || "-" }}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="result.release.status == 2" class="bottomBtnDiv">
					<el-row>
						<el-col :span="24">
							<el-button
								size="small"
								plain
								type="primary"
								@click="rejectFun"
							>
								驳回修改
							</el-button>
							<el-button size="small" @click="passFun">
								放行
							</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<el-dialog title="确认驳回" :visible.sync="rejectTF" width="400px">
			<div>
				<el-input
					v-model="rejectTxt"
					placeholder="请输入驳回原因"
					:maxlength="50"
				></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="rejectTF = false"
					>取 消</el-button
				>
				<el-button type="primary" size="small" @click="rejectSaveFun"
					>确定驳回</el-button
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
	modelType: boolean = false //弹框显示状态
	modelImgSrc: string = "" //弹框图片路径
	result: Object = { release: {} }
	caseId: string = ""
	loadingTF: boolean = false
	nextTF: boolean = false //称重输入框出现
	flowData: Array[object] = [] //流程显示方法
	comNum: number = null //电子称数量
	overStandTF: boolean = false //超标状态
	rejectTF: boolean = false //确认驳回弹窗
	rejectTxt: String = "" //驳回内窗

	created() {
		let self = this
		this.caseId = this.$route.query.caseId
		this.created_fun()
		// 获取权限
		// this.powerFun()
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
			.getSecurityStaffReleaseById(params)
			.then(res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.result = res.data

					//小类处理
					self.result.release.subclassList = self.result.release.subclass.split(
						","
					)
					self.result.release.subclassTxt = []
					self.result.release.subclassList.forEach(ielem => {
						if (self.$publicData.subclassObj[ielem]) {
							self.result.release.subclassTxt.push(
								self.$publicData.subclassObj[ielem]
							)
						}
					})
					self.result.release.subclassTxt = self.result.release.subclassTxt.join(
						","
					)
					//放行原因处理
					self.result.release.releaseTypeList = self.result.release.releaseType.split(
						","
					)
					self.result.release.releaseTypeTxt = []
					self.result.release.releaseTypeList.forEach(ielem => {
						if (self.$publicData.releaseTypeObj[ielem]) {
							self.result.release.releaseTypeTxt.push(
								self.$publicData.releaseTypeObj[ielem]
							)
						}
					})
					self.result.release.releaseTypeTxt = self.result.release.releaseTypeTxt.join(
						","
					)
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
		this.powerControl = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"order_use"
		)
	}
	//放行
	passFun() {
		let self = this
		this.$confirm("确认放行吗, 是否继续?", "提示", {
			confirmButtonText: "确定放行",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				let params = {
					id: this.caseId
				}
				app.$api
					.securityEquipReleaseOperation(params)
					.then(res => {
						self.loadingTF = false
						if (res.status == 200) {
							self.$message.success("保安放行成功，正在跳转！")
							setTimeout(_ => {
								self.$router.push({
									path: "safetyCateManageList"
								})
							}, 1000)
						} else {
							self.$message.error(res.msg)
						}
					})
					.then(err => {
						// console.log("err:", err)
					})
			})
			.catch(() => {})
	}
	//确认驳回弹窗
	rejectFun() {
		this.rejectTxt = ""
		this.rejectTF = true
	}
	//确认驳回保存按钮
	rejectSaveFun() {
		let self = this
		let params = {
			id: this.caseId,
			securityRemark: this.rejectTxt
		}
		app.$api
			.securityRejectOperation(params)
			.then(res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.$message.success("驳回成功，正在跳转！")
					self.rejectTF = false
					setTimeout(_ => {
						self.$router.push({ path: "safetyCateManageList" })
					}, 1000)
				} else {
					self.$message.error(res.msg)
				}
			})
			.then(err => {
				// console.log("err:", err)
			})
	}
	//返回上一页
	returnFun() {
		this.$router.go(-1)
	}
	//查看图片
	showPic(imgSrc) {
		this.modelType = true
		this.modelImgSrc = imgSrc
	}
	//关闭弹框
	cancelModel(e) {
		this.modelType = e
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
@import "safetyCateManageList.scss";
</style>
