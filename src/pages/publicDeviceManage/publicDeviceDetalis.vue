<template>
	<div v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>行政设备物料类放行管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div>
			<el-row class="orderTop">
				<el-col :span="18" class="orderTopDiv">
					行政设备物料类放行条详情
					<span
						v-for="(item, indOne) in $publicData.orderStatusList"
						v-if="result.release.status == item.ind"
						:key="indOne"
						:style="{ color: item.color }"
						>{{ item.txt || "-" }}</span
					>
				</el-col>
				<el-col :span="6">
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
								是否核销：
							</div>
							<div class="titRight">
								<span v-if="result.release.writeoff == 0"
									>不核销</span
								>
								<span v-if="result.release.writeoff == 1"
									>核销</span
								>
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
									{{
										result.release.otherStatus == 0
											? "待核销"
											: ""
									}}
									{{
										result.release.otherStatus == 1
											? "半核销"
											: ""
									}}
									{{
										result.release.otherStatus == 2
											? "已核销"
											: ""
									}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						物品基本信息
					</div>
					<div>
						<el-table
							:data="result.releaseSolids"
							:header-cell-style="{
								fontWeight: '#bold',
								background: '#fafafa'
							}"
							style="max-height:700px"
						>
							<el-table-column
								prop="name"
								label="物品名称"
							></el-table-column>
							<el-table-column
								prop="no"
								label="编号"
							></el-table-column>
							<el-table-column
								prop="num"
								label="数量"
							></el-table-column>
							<el-table-column prop="weight" label="重量(kg)">
							</el-table-column>
							<el-table-column
								prop="planReturnTime"
								label="计划返回日期"
							></el-table-column>
							<el-table-column
								v-if="result.release.status == 3"
								prop="num"
								label="核销状态"
							>
								<template slot-scope="scope">
									<span
										>{{
											scope.row.writeoffStatus == 0
												? "待核销"
												: ""
										}}
										{{
											scope.row.writeoffStatus == 1
												? "已核销"
												: ""
										}}</span
									>
								</template>
							</el-table-column>
							<el-table-column
								v-if="result.release.status == 3"
								prop="writeoffRemark"
								label="核销备注"
							></el-table-column>
							<el-table-column
								v-if="result.release.status == 3"
								prop="writeoffUserName"
								label="核销人"
							></el-table-column>
						</el-table>
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
			</div>
		</div>
		<!-- 图片放大 -->
		<Popoverpic
			v-show="modelType"
			:img-src="modelImgSrc"
			@callback="cancelModel"
		></Popoverpic>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { $getLodop } from "../../utils/LodopFuncs"

import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	modelType: boolean = false //弹框显示状态
	modelImgSrc: string = "" //弹框图片路径
	powerEdit: boolean = false //编辑权限
	orderList: Array<object> = []
	result: Object = { release: {} }
	caseId: string = ""
	fname: string = "" //文件名
	excelVisTF: boolean = false //excel导出弹框
	productCs: string = "999" //默认999
	elemObj: Object = {} //excel导出当前对象
	powerControl: boolean = false
	btnLoadingTF: boolean = false
	downloadLoading: boolean = false
	powerExcel: boolean = false
	table: Array<object> = []
	loadingTF: boolean = false
	markingList: Array<object> = [] //字印列表接口
	markingListS: Object = {} //字印选择对象
	flowData: Array[object] = [] //流程显示方法

	created() {
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
	//获取产品详情
	getAllDate() {
		let self = this

		let params = {
			caseId: this.caseId
		}
		app.$api.getMaterReleaseById(params).then(res => {
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
	}
	//权限判断
	powerFun() {
		this.powerControl = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"order_use"
		)
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
	//返回上一页
	returnFun() {
		this.$router.go(-1)
	}
	//打印二维码
	printQrcodeFun() {
		let LODOP = $getLodop()
		LODOP.PRINT_INIT("")

		//一维条形码
		LODOP.ADD_PRINT_BARCODE(
			"10mm",
			"10mm",
			"30mm",
			"12mm",
			"128Auto",
			this.result.release.orderNo
		)
		//二维吗
		// LODOP.ADD_PRINT_BARCODE(
		// 	30,
		// 	61,
		// 	250,
		// 	100,
		// 	"QRCode",
		// 	"2020 0510 2001"
		// )
		// this.LODOP.SET_PRINT_STYLEA(0, "QRCodeVersion", 7) //设置二维码版本为7
		LODOP.PREVIEW() //打印预览
	}
}
</script>

<style scoped lang="scss">
@import "publicDeviceManageList.scss";
</style>
