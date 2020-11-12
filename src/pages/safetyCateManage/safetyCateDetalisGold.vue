<template>
	<div ref="cateDetaolisGold" v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>保安放行管理-产品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div>
			<el-row class="orderTop">
				<el-col :span="24" class="orderTopDiv">
					产品放行条详情
					<span
						v-for="(item, indOne) in $publicData.orderStatusList"
						v-if="result.release.status == item.ind"
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
						<span class="passSpan"
							>{{
								result.release.releaseGoldType == 1
									? "常规"
									: ""
							}}{{
								result.release.releaseGoldType == 2
									? "批量"
									: ""
							}}</span
						>
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
								放行小类：
							</div>
							<div class="titRight">
								{{ result.release.subclassTxt || "-" }}
							</div>
						</div>
						<div
							v-if="result.release.subclassRemarkTF"
							class="displayFlex"
						>
							<div class="titLeft">
								小类备注：
							</div>
							<div class="titRight">
								{{ result.release.subclassRemark || "-" }}
							</div>
						</div>
						<div class="displayFlex">
							<div class="titLeft">
								放行备注：
							</div>
							<div class="titRight">
								{{ result.release.subclassRemark || "-" }}
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
								{{ result.release.releaseTypeTxt || "-" }}
							</div>
						</div>
						<div
							v-if="result.release.releaseRemarkTF"
							class="displayFlex"
						>
							<div class="titLeftT">
								放行原因备注：
							</div>
							<div class="titRight">
								{{ result.release.releaseRemark || "-" }}
							</div>
						</div>
						<div class="displayFlex">
							<div class="titLeft">
								申请人：
							</div>
							<div class="titRight">
								{{ result.release.createName || "-" }}
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
								离厂时间：
							</div>
							<div class="titRight">
								{{ result.release.leaveTime || "-" }}
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
						<div
							v-if="
								result.release.status == 3 ||
									result.release.status == 6
							"
							class="displayFlex"
						>
							<div class="titLeftT">
								复核毛重(g)：
							</div>
							<div class="titRight">
								{{ result.release.reviewRoughWeight || "-" }}
							</div>
						</div>
					</div>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						产品基本信息
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							去向：
						</div>
						<div class="titRight">
							{{ result.releaseGoldInfo.goldDestin || "-" }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							客户：
						</div>
						<div class="titRight">
							{{ result.releaseGoldInfo.customer || "-" }}
						</div>
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							总净重(g)：
						</div>
						<div class="titRight">
							{{ result.releaseGoldInfo.totalSuttle || "-" }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							总毛重(g)：
						</div>
						<div class="titRight">
							{{ result.releaseGoldInfo.roughWeight || "-" }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							包装数量：
						</div>
						<div class="titRight">
							{{
								result.releaseGoldInfo.packNumber || "-"
							}}(袋/箱)
						</div>
					</div>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						凭证
					</div>
					<div v-if="result.attachs && result.attachs.length > 0">
						<img
							v-for="(ielem, indOne) in result.attachs"
							:key="indOne"
							:src="$portImg + ielem.url"
							@click.stop="showPic($portImg + ielem.url)"
						/>
					</div>
					<div v-else>
						暂无凭证
					</div>
				</div>
				<div v-if="result.release.status == 2" class="bottomBtnDiv">
					<!-- 常规类 -->
					<el-row v-if="result.release.releaseGoldType == 1">
						<el-col v-if="nextTF" :span="10">
							<span class="comNumSpan">{{ comNum }}</span>
							<!-- <el-input-number
								v-model="comNum"
								placeholder="总毛重（电子秤自动传输）"
								size="small"
								class="width300"
								disabled
								:controls="false"
							></el-input-number> -->
							<span
								v-if="overStandTF && comNum != 0"
								class="redTxt"
								><i class="el-icon-warning"></i
								>总毛重已超标</span
							>
							<span
								v-if="!overStandTF && comNum != 0"
								class="txtGreen"
								><i class="el-icon-circle-check"></i
								>总毛重已达标</span
							>
							<div>
								注意：类型为常规的产品放行条保安需要复核实际毛重与放行条毛重一致
							</div>
						</el-col>
						<el-col v-if="!nextTF" :span="14">
							<el-button
								type="primary"
								size="small"
								@click="nextFun"
							>
								签字单据齐全进行下一步
							</el-button>
							<el-button size="small" @click="rejectFun">
								驳回修改
							</el-button>
						</el-col>
						<el-col v-if="nextTF" :span="14">
							<el-button
								:type="
									!overStandTF && comNum != 0 ? 'primary' : ''
								"
								size="small"
								@click="passFun"
							>
								放行
							</el-button>
							<el-button
								:type="
									overStandTF && comNum != 0 ? 'primary' : '0'
								"
								size="small"
								@click="passTwoFun"
							>
								进入二审
							</el-button>
						</el-col>
					</el-row>
					<!-- 批量 -->
					<el-row v-if="result.release.releaseGoldType == 2">
						<el-col :span="24">
							<el-button size="small" @click="rejectFun">
								驳回修改
							</el-button>
							<el-button
								type="primary"
								size="small"
								@click="passFunOne"
							>
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
		<!-- 图片放大 -->
		<Popoverpic
			v-show="modelType"
			:img-src="modelImgSrc"
			@callback="cancelModel"
		></Popoverpic>
		<a v-show="false" ref="comA" href="ChiticData://temp">电子称读数</a>
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
	result: Object = { release: {}, releaseGoldInfo: {} }
	caseId: string = ""
	loadingTF: boolean = false
	nextTF: boolean = false //称重输入框出现
	flowData: Array[object] = [] //流程显示方法
	comNum: number = 0 //电子称数量
	overStandTF: boolean = true //超标状态
	rejectTF: boolean = false //确认驳回弹窗
	rejectTxt: String = "" //驳回内窗

	created() {
		let self = this
		this.caseId = this.$route.query.caseId
		this.created_fun()
		//读电子称
		document.onkeydown = e => {
			let dom = self.$refs.cateDetaolisGold
			if (dom && e.code == "F9") {
				self.$refs.comA.click()
				self.loop()
			}
		}
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
	//获取产品详情
	getAllDate() {
		let self = this

		let params = {
			caseId: this.caseId
		}
		app.$api
			.getSecurityGoldReleaseById(params)
			.then(res => {
				self.loadingTF = false
				if (res.status == 200) {
					self.result = res.data

					//小类处理
					self.result.release.subclassList = self.result.release.subclass.split(
						","
					)
					self.result.release.subclassTxt = []
					self.result.release.subclassRemarkTF = false
					self.result.release.subclassList.forEach(ielem => {
						if (ielem == 12) {
							//当小类有其他就显示备注
							self.result.release.subclassRemarkTF = true
						}
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
					self.result.release.releaseRemarkTF = false
					self.result.release.releaseTypeList.forEach(ielem => {
						if (ielem == 8) {
							//当放行原因有其他就显示备注
							self.result.release.releaseRemarkTF = true
						}
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

	//循环读取电子称输入框数量
	loop() {
		let self = this

		setTimeout(() => {
			self.$$.ajax({
				type: "get",
				async: false,
				url:
					"http://localhost:5000/BalanceResult/result.js?t=" +
					new Date().getTime(),
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback: "attr",
				success: function(json) {
					if (json.weight) {
						self.comNum = json.weight
						self.getSecurityFun() //根据id保安查询得到每个公司允许的标准误差克
					}
				},
				error: function() {
					// alert("fail");
				}
			})
		}, 1000)
		// setTimeout(_ => {
		// 	self.delFile()
		// }, 200)
	}
	// delFile() {
	// 	//删除文件
	// 	console.log("删除文件")
	// 	let fso = new ActiveXObject("Scripting.FileSystemObject")
	// 	console.log("fso:", fso)
	// }
	getSecurityFun() {
		let self = this
		let params = {
			caseId: self.caseId
		}
		let roughWeight = self.result.releaseGoldInfo.roughWeight //单据毛重
		app.$api
			.getSecurityCompanyTolerance(params)
			.then(res => {
				if (res.status == 200) {
					let securityNum = typeof res.data == "number" ? res.data : 0
					if (
						self.comNum >= roughWeight - securityNum &&
						self.comNum <= roughWeight + securityNum
					) {
						self.overStandTF = false //不超标状态
					} else {
						self.overStandTF = true //超标状态
					}
				} else {
					self.$message.error(res.msg)
				}
			})
			.then(err => {
				// console.log("err:", err)
			})
		// self.
	}
	//权限判断
	powerFun() {
		this.powerControl = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"order_use"
		)
	}
	//进入称重按钮
	nextFun() {
		this.nextTF = true
	}

	//放行(批量)
	passFunOne() {
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
				if (this.result.release.releaseGoldType == 1) {
					//常规放行要带克重，批量不用
					params.reviewRoughWeight = self.comNum
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
	//放行(常规)
	passFun() {
		let self = this
		if (this.comNum == 0) {
			this.$message.error("还没有过称，请打开电子称开启服务按F9过称！")
			return
		}
		if (this.overStandTF) {
			this.$message.error("总毛重超标，无法放行！")
			return
		}
		this.$confirm("确认放行吗, 是否继续?", "提示", {
			confirmButtonText: "确定放行",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				let params = {
					id: this.caseId
				}
				if (this.result.release.releaseGoldType == 1) {
					//常规放行要带克重，批量不用
					params.reviewRoughWeight = self.comNum
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
	//进行二审
	passTwoFun() {
		let self = this
		if (this.comNum == 0) {
			this.$message.error("还没有过称，请打开电子称开启服务按F9过称！")
			return
		}
		if (!this.overStandTF) {
			this.$message.error("总毛重达标，无需二审！")
			return
		}
		this.$confirm("确认进行二审吗, 是否继续?", "提示", {
			confirmButtonText: "确定二审",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				let params = {
					id: this.caseId
				}
				if (this.result.release.releaseGoldType == 1) {
					//常规放行要带克重，批量不用
					params.reviewRoughWeight = self.comNum
				}
				app.$api
					.securityTwoAuditOperation(params)
					.then(res => {
						self.loadingTF = false
						if (res.status == 200) {
							self.$message.success(
								"保安进行二审成功，正在跳转！"
							)
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
