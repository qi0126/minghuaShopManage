<template>
	<div v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>保安放行管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div class="info">
			<div class="info-top">
				<div class="infot-table">
					<div class="tr borderBt">
						<div class="th">
							被放行人
						</div>
						<div class="th">
							编号
						</div>
						<div class="th">
							小类
						</div>
						<!-- <div class="th">
							小类备注
						</div> -->
						<div class="th">
							类型
						</div>
						<div class="th">
							放行日期
						</div>
						<div class="th">
							放行原因
						</div>
						<!-- <div class="th">
							是否核销
						</div> -->
						<div class="th">
							申请人
						</div>
						<div class="th">
							申请时间
						</div>
						<div class="th">
							状态
						</div>
						<!-- <div class="th">
							保安亭
						</div>
						<div class="th">
							保安姓名
						</div>
						<div class="th">
							复核毛重
						</div> -->
						<div class="th">
							离厂时间
						</div>
					</div>
					<div class="tr">
						<div class="td">
							1111
						</div>
						<div class="td">
							网络下单
						</div>
						<div class="td">
							展厅下单
						</div>
						<div class="td">
							111
						</div>
						<div class="td">
							111
						</div>
						<div class="td">
							111
						</div>
						<div class="td">
							2222
						</div>
						<div class="td">
							111
						</div>
						<div class="td">
							111
						</div>
						<div class="td">
							111
						</div>
					</div>
					<!-- <div class="remarkDiv">
						<el-row>
							<el-col :span="8">
								<div>
									<el-col :span="4" class="tRight">
										保安亭：
									</el-col>
									<el-col :span="20">
										111111111
									</el-col>
								</div>
								<div>
									<el-col :span="4" class="tRight">
										保安姓名：
									</el-col>
									<el-col :span="20">
										1111111
									</el-col>
								</div>
								<div>
									<el-col :span="4" class="tRight">
										离厂时间：
									</el-col>
									<el-col :span="20">
										1111111
									</el-col>
								</div>
							</el-col>
							<el-col :span="16">
								<div>
									<el-col :span="4" class="tRight">
										小类备注：
									</el-col>
									<el-col :span="20">
										111111111
									</el-col>
								</div>
								<div tyle="display:flex">
									<el-col :span="4" class="tRight">
										放行原因：
									</el-col>
									<el-col :span="20">
										1111111
									</el-col>
								</div>
								<div tyle="display:flex">
									<el-col :span="4" class="tRight">
										放行原因备注：
									</el-col>
									<el-col :span="20">
										1111111
									</el-col>
								</div>
							</el-col>
						</el-row>
					</div> -->
					<div class="spaceStyle"></div>
					<div class="tr paddingTop22" style="border: none">
						<el-col :span="12">
							<Steps
								:data="result.perFroms"
								style="padding: 15px 0;"
							></Steps>
						</el-col>
						<el-col :span="12" class="flexLayout">
							<div>
								<el-button
									v-show="editType && powerEdit"
									type="primary"
									size="mini"
									@click="cancelFun"
								>
									取消
								</el-button>
								<el-button
									v-show="
										!editType &&
											powerEdit &&
											result.orderStatus == 1
									"
									type="primary"
									size="mini"
									@click="editFun"
								>
									编辑
								</el-button>
								<el-button
									v-show="editType && powerEdit"
									type="primary"
									size="mini"
									@click="saveFun"
								>
									保存
								</el-button>

								<el-button
									v-if="
										result.orderStatus == 1 ||
											result.orderStatus == 7
									"
									type="primary"
									size="mini"
									:loading="btnLoadingTF"
									:disabled="editType"
									@click="upAudit"
								>
									提交审核
								</el-button>
								<el-button
									v-if="
										result.orderStatus == 1 ||
											result.orderStatus == 7
									"
									type="warning"
									size="mini"
									:loading="btnLoadingTF"
									:disabled="editType"
									@click="backOrder"
								>
									驳回
								</el-button>
							</div>
						</el-col>
					</div>
					<div class="spaceStyle"></div>
					<div class="detailDiv">
						<span class="tit">产品基本信息</span>
						<el-row>
							<el-col :span="3" class="tRight">
								去向：
							</el-col>
							<el-col :span="5" class="tLeft">
								河北邯郸
							</el-col>
							<el-col :span="3" class="tRight">
								客户：
							</el-col>
							<el-col :span="5" class="tLeft">
								河北邯郸珠宝
							</el-col>
							<el-col :span="3" class="tRight">
								包装数量（袋/箱）：
							</el-col>
							<el-col :span="5" class="tLeft">
								121
							</el-col>
							<el-col :span="3" class="tRight">
								总净重（g）：
							</el-col>
							<el-col :span="5" class="tLeft">
								120.00
							</el-col>
							<el-col :span="3" class="tRight">
								总毛重（g）：
							</el-col>
							<el-col :span="5" class="tLeft">
								120.00
							</el-col>
						</el-row>
					</div>
					<div class="detailDiv">
						<span class="tit">物品的基本信息</span>
						<el-table
							:data="orderList"
							:header-cell-style="{ fontWeight: '#bold' }"
							style="width: 100%;"
						>
							<el-table-column
								prop="name"
								label="物品名称"
							></el-table-column>
							<el-table-column
								prop="name"
								label="编号"
							></el-table-column>
							<el-table-column
								prop="name"
								label="数量"
							></el-table-column>
							<el-table-column prop="weight" label="重量(kg)">
							</el-table-column>
							<el-table-column
								prop="name"
								label="计划返回日期"
							></el-table-column>
						</el-table>
					</div>
					<div class="detailDiv bottom70">
						<span class="tit">凭证</span>
						<div>
							<img
								v-for="i in 5"
								:key="i"
								:src="$portImg + ielem.url"
								@click.stop="showPic($portImg + ielem.url)"
							/>
						</div>
					</div>
					<div class="bottomBtnDiv">
						<el-row>
							<el-col v-if="nextTF" :span="6">
								<el-input
									placeholder="总毛重（电子秤自动传输）"
									size="small"
									class="width300"
								></el-input>
								<span class="redTxt"
									><i class="el-icon-warning"></i
									>总毛重已超标</span
								>
								<div>
									注意：类型为常规的产品放行条保安需要复核实际毛重与放行条毛重一致
								</div>
							</el-col>
							<el-col v-if="!nextTF" :span="18">
								<el-button
									type="primary"
									size="small"
									@click="nextFun"
								>
									签字单据齐全进行下一步
								</el-button>
								<el-button size="small">
									驳回修改
								</el-button>
							</el-col>
							<el-col v-if="nextTF" :span="18">
								<el-button
									type="primary"
									size="small"
									@click="goFun"
								>
									放行
								</el-button>
								<el-button size="small">
									进入二审
								</el-button>
							</el-col>
						</el-row>
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
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	modelType: boolean = false //弹框显示状态
	modelImgSrc: string = "" //弹框图片路径
	powerEdit: boolean = false //编辑权限
	editType: boolean = false
	stepsActive: number = 1
	result: Object = {}
	orderNo: string = ""
	fname: string = "" //文件名
	excelVisTF: boolean = false //excel导出弹框
	productCs: string = "999" //默认999
	elemObj: Object = {} //excel导出当前对象
	powerControl: boolean = false
	btnLoadingTF: boolean = false
	downloadLoading: boolean = false
	powerExcel: boolean = false
	table: Array<object> = []
	orderList: Array<object> = [
		{ name: "111" },
		{ name: "111" },
		{ name: "111" }
	]
	loadingTF: boolean = false
	markingList: Array<object> = [] //字印列表接口
	markingListS: Object = {} //字印选择对象
	nextTF: boolean = false //称重输入框出现

	created() {
		this.orderNo = this.$route.query.orderNo
		this.created_fun()
		// 获取权限
		// this.powerFun()
	}

	created_fun() {
		let self = this
		let params = {
			orderNo: this.orderNo
		}
	}
	//获取权限
	getPower() {}
	//权限判断
	powerFun() {
		this.powerControl = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"order_use"
		)
		this.powerExcel = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"order_manage_excel"
		)
		this.powerEdit = this.$publicData.checkPermissions(
			sessionStorage.verify,
			"order_manage_edit"
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
	//进入称重按钮
	nextFun() {
		this.nextTF = true
	}
	//放行按钮
	goFun() {
		this.nextTF = false
	}
	//返回上一页
	returnFun() {
		this.$router.go(-1)
	}
}
</script>

<style scoped lang="scss">
@import "safetyCateManageList.scss";
</style>
