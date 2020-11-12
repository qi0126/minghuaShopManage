<!--
 * Step步骤条封装
 * @param    {Array}  data    请求参数
 *
 * 示例：
 * <Steps :data="[Array]"></Steps>
 *
 * @date     2020-10-12
 * @author   华英雄
-->
<template>
	<div id="stepDiv">
		<el-steps
			class="Steps"
			direction="vertical"
			:active="stepActive"
			:process-status="processTxt"
			finish-status="success"
		>
			<el-step v-for="(item, index) in getData" :key="index">
				<div slot="title">
					<span style="color:#000">
						{{ item.nodeName }}
						<span v-if="item.appMode == 1" class="verifySpan"
							>单审</span
						>
						<span v-if="item.appMode == 2" class="verifySpan"
							>双审</span
						>
						<span v-if="item.appMode == 3" class="verifySpan"
							>三审</span
						>
						<span v-if="item.appMode == 4" class="verifySpan"
							>四审</span
						>
						<span v-if="item.appMode == 5" class="verifySpan"
							>五审</span
						>
					</span>
				</div>
				<div slot="description" class="description">
					<div class="verifyDivOne">
						<div>
							<span
								v-for="(ielem, indOne) in item.list"
								:key="indOne"
								class="verifyDivTwo"
								>{{ ielem.name }}
								<span
									v-if="ielem.appStatus == 1"
									class="waitSpan"
									>待审</span
								>
								<span
									v-if="ielem.appStatus == 2"
									class="passSpan"
									>通过</span
								>
								<span
									v-if="ielem.appStatus == 3"
									class="rejectSpan"
									>驳回</span
								>
							</span>
						</div>
						<div class="verifTimeDiv">
							审批时间：{{ item.time || "-" }}
						</div>
					</div>
				</div>
			</el-step>
		</el-steps>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			stepActive: null, //步数
			processTxt: "process"
		}
	},
	computed: {
		getData() {
			let data = [...this.data]
			this.stepActive = 0
			// console.log("data:", data)
			data.forEach((ielem, ind) => {
				if (ielem.appStatus == 2) {
					this.stepActive++
				}
				if (ielem.appStatus == 3) {
					this.processTxt = "error"
				}
			})
			return data
		}
	}
}
</script>

<style lang="scss" scoped>
.description {
	.more {
		display: inline-block;
		position: relative;
		cursor: pointer;
		strong {
			color: #df343d;
			font-weight: bold;
		}
		.dialog {
			z-index: 10;
			visibility: hidden;
			position: absolute;
			left: 0;
			top: 100%;
			width: 250px;
			box-sizing: border-box;
			padding: 10px;
			background: #fff;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			border-radius: 5px;
			h3 {
				font-size: 14px;
				font-weight: bold;
				color: #37393b;
			}
			p {
				padding-top: 10px;
				line-height: 1.4;
				font-size: 12px;
				color: #3c3c3c;
			}
		}
		&:hover .dialog {
			visibility: visible;
		}
	}
	.verifyDivOne {
		background: #fafafa;
		line-height: 30px;
		margin: 10px 0;
		padding: 5px 10px;
		font-size: 14px;
		color: #37393b;
		.verifyDivTwo {
			margin-right: 30px;
		}
		.passSpan {
			background: #e5e5e5;
			color: #309f46;
			padding: 2px 6px;
			border-radius: 20px;
		}
		.waitSpan {
			background: #e5e5e5;
			color: #666;
			padding: 2px 6px;
			border-radius: 20px;
		}
		.rejectSpan {
			background: #e5e5e5;
			color: #ff0402;
			padding: 2px 6px;
			border-radius: 20px;
		}
	}
	.verifTimeDiv {
		color: #898989;
	}
}
.verifySpan {
	padding: 2px 5px;
	background: #eaeaea;
	border-radius: 20px;
}
</style>
<style>
#stepDiv .el-step__head.is-finish {
	color: #4db063;
	border-color: #4db063;
}
</style>
