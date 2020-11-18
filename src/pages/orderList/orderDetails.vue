<template>
	<div v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>产品管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div class="spaceStyleOne"></div>
		<div class="info">
			<div class="info-top">
				<div class="detailDiv">
					<div class="orderTitTxt">
						产品基本信息
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							产品编号：
						</div>
						<div class="titRight">
							{{ proObj.product_id }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							产品名称：
						</div>
						<div class="titRight">
							{{ proObj.product_name }}
						</div>
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							所属主题：
						</div>
						<div class="titRight">
							{{ proObj.category_name }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							所属店铺：
						</div>
						<div class="titRight">
							{{ proObj.shop_name }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							店铺地址：
						</div>
						<div class="titRight">
							{{ proObj.shop_address }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							产品价格：
						</div>
						<div class="titRight">
							{{ proObj.product_price }}
						</div>
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							优惠价：
						</div>
						<div class="titRight">
							{{ proObj.product_uprice }}
						</div>
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							产品详情：
						</div>
						<div class="titRight">
							{{ proObj.product_detail }}
						</div>
					</div>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						产品图片
					</div>
					<div v-if="proObj.image && proObj.image.length > 0">
						<img
							v-for="(ielem, indOne) in proObj.image"
							:key="indOne"
							:src="ielem.image_url"
							@click.stop="showPic(ielem.image_url)"
						/>
					</div>
					<div v-else>
						暂无产品图片
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
export default class goldCateDetails extends Vue {
	modelType: boolean = false //弹框显示状态
	modelImgSrc: string = "" //弹框图片路径
	proObj: Object = { release: {}, releaseGoldInfo: {} }
	proId: string = ""
	loadingTF: boolean = false
	flowData: Array[object] = [] //流程显示方法

	created() {
		this.proId = this.$route.query.proId
		this.created_fun()
		// 获取权限
		// this.powerFun()
	}

	created_fun() {
		this.getAllDate()
	}
	//获取产品详情
	getAllDate() {
		let self = this

		let params = {
			mId: this.proId
		}
		app.$api
			.getProId(params)
			.then(res => {
				self.loadingTF = false
				if (res.data.code == 200) {
					self.proObj = res.data.data
					console.log("产品详情：", self.proObj)
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
}
</script>

<style scoped lang="scss">
@import "orderList.scss";
</style>
