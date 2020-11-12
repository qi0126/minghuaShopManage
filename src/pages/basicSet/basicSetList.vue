<template>
	<div class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>基础设置</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<section class="top20">
				<div>
					产品标准误差（±g）：
					<el-input-number
						v-model="goldBasicNum"
						label="产品标准误差"
						class="width200"
						size="small"
						:min="0"
						:max="999999"
						:precision="2"
						:controls="false"
					></el-input-number>
				</div>
				<div>
					<el-button
						type="primary"
						size="small"
						class="width86"
						@click="saveFun"
					>
						修 改
					</el-button>
				</div>
			</section>
		</div>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	goldBasicNum: number = 0 //弹框图片路径
	created() {
		this.created_fun()
		// this.powerFun()
	}

	created_fun() {
		this.getCompanyProperty()
	}
	//获取指定公司的基本配置
	getCompanyProperty() {
		app.$api.getCompanyProperty().then(res => {
			if (res.status == 200) {
				this.goldBasicNum = res.data.tolerance ? res.data.tolerance : 0
			}
		})
	}
	saveFun() {
		let self = this
		this.$confirm("确认修改所选内容?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				let params = {
					jsonTemplate: `{ tolerance: ${self.goldBasicNum} }`
				}
				app.$api.updateCompanyProery(params).then(res => {
					if (res.status == 200) {
						self.$message.success("修改成功，正在刷新！")
						setTimeout(_ => {
							self.created_fun()
						}, 1000)
					}
				})
			})
			.catch(() => {})
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
@import "basicSetList.scss";
</style>
