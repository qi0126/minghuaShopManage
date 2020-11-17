<template>
	<div v-loading="loadingTF" class="conBigDiv">
		<div class="displayFlex">
			<div class="returnDiv" @click="returnFun">
				<i class="el-icon-arrow-left"></i>返回
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
				<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="hr" />
		<div class="spaceStyleOne"></div>
		<div class="info">
			<div class="info-top">
				<div class="detailDiv">
					<div class="orderTitTxt">
						用户基本信息
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							用户ID：
						</div>
						<div class="titRight">
							{{ proObj.user_id }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							用户名称：
						</div>
						<div class="titRight">
							{{ proObj.user_name }}
						</div>
					</div>
					<div class="displayFlex">
						<div class="titLeft">
							用户别名：
						</div>
						<div class="titRight">
							{{ proObj.user_namesub }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							用户编号：
						</div>
						<div class="titRight">
							{{ proObj.user_number }}
						</div>
					</div>

					<div class="displayFlex">
						<div class="titLeft">
							用户地址：
						</div>
					</div>
					<div>
						<el-table
							:data="addlist"
							:header-cell-style="{
								fontWeight: '#bold',
								background: '#fafafa'
							}"
							border
							style="width: 100%;"
						>
							<el-table-column
								prop="address_id"
								label="地址ID"
							></el-table-column>
							<el-table-column
								prop="addressarea"
								label="地址"
							></el-table-column>
							<el-table-column
								prop="user_phone"
								label="联系电话"
							></el-table-column>
							<el-table-column
								prop="addressinfo"
								label="地址详情"
							></el-table-column>
							<el-table-column
								prop="sname"
								label="地址别名"
							></el-table-column>
						</el-table>
					</div>


				</div>
				<div class="detailDiv">
					用户订单：
				</div>
				<div>
					<el-table
						:data="orderList"
						:header-cell-style="{
							fontWeight: '#bold',
							background: '#fafafa'
						}"
						border
						style="width: 100%;"
					>
						<el-table-column
							prop="product_img_url"
							label="产品图片"
						>
							<template slot-scope="scope">
								<div class="tCenter">
									<img
										:src="scope.row.product_img_url"
										class="imgS"
									/>
								</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="order_id"
							label="订单id"
						></el-table-column>
						<el-table-column
							prop="orderno"
							label="订单编号"
						></el-table-column>
						<el-table-column
							prop="product_id"
							label="产品编号"
						></el-table-column>
						<el-table-column
							prop="ocount"
							label="订购数量"
						></el-table-column>
						<el-table-column
							prop="price"
							label="产品单价"
						></el-table-column>
						<el-table-column
							prop="total_price"
							label="订购总价"
						></el-table-column>
						<el-table-column
							prop="addressarea"
							label="地址"
						>
							<template slot-scope="scope">
								<div class="tCenter">
									<span>{{scope.row.addressarea}}-{{scope.row.addressinfo}}</span>
								</div>
							</template>
						</el-table-column>

					</el-table>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						购物车
					</div>
					<el-row v-if="cartlist && cartlist.length > 0">
						<el-col v-for="(ielem, indOne) in cartlist" :key="indOne" :span="4">
							<img
								:src="ielem.product_img_url"
								@click.stop="toPro(ielem.product_id)"
							/>
							<div>{{ielem.product_name}}</div>
							<div>数量：{{ielem.goods_num}}</div>
						</el-col>
					</el-row>
					<div v-else>
						用户购物车暂无产品
					</div>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						关注产品
					</div>
					<el-row v-if="flowlist && flowlist.length > 0">
						<el-col v-for="(ielem, indOne) in flowlist" :key="indOne" :span="4">
							<img
								:src="ielem.product_img_url"
								@click.stop="toPro(ielem.product_id)"
							/>
							<div>{{ielem.product_name}}</div>
						</el-col>
					</el-row>
					<div v-else>
						用户暂无关注产品
					</div>
				</div>
				<div class="spaceStyleOne"></div>
				<div class="detailDiv">
					<div class="orderTitTxt">
						浏览过产品
					</div>
					<el-row v-if="historylist && historylist.length > 0">
						<el-col v-for="(ielem, indOne) in historylist" :key="indOne" :span="4">
							<img
								:src="ielem.product_img_url"
								@click.stop="toPro(ielem.product_id)"
							/>
							<div>{{ielem.product_name}}</div>
							<div>浏览次数：{{ielem.time}}</div>
						</el-col>
					</el-row>
					<div v-else>
						用户暂无浏览过产品
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { $getLodop } from "../../utils/LodopFuncs"

import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class goldCateDetails extends Vue {
	proObj: Object = { release: {}, releaseGoldInfo: {} }
	userId: string = ""
	loadingTF: boolean = false
	addlist:Array[object] = [] //地址显示方法
	cartlist:Array[object] = [] //购物车显示方法
	flowlist:Array[object] = [] //用户关注产品方法
	historylist:Array[object] = [] //用户浏览过产品方法
	orderList:Array[object] = [] //用户订单查询方法

	created() {
		this.userId = this.$route.query.userId
		this.created_fun()
		// 获取权限
		// this.powerFun()
	}

	created_fun() {
		this.getAllDate()
	}
	//获取用户详情
	getAllDate() {
		let self = this

		let params = {
			userId: this.userId
		}
		app.$api
			.userDetails(params)
			.then(res => {
				self.loadingTF = false
				if (res.data.code == 200) {
					self.proObj = res.data.data
					self.addlist = res.data.addlist?res.data.addlist:[]
					self.cartlist = res.data.cartlist?res.data.cartlist:[]
					self.flowlist = res.data.flowlist?res.data.flowlist:[]
					self.historylist = res.data.historylist?res.data.historylist:[]
					self.orderList = res.data.orderList?res.data.orderList:[]
					console.log("用户详情：", self.proObj,self.orderList)
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
	toPro(e) {
		this.$confirm('此操作将跳转到产品详情页, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			console.log("e:",e)
			this.$router.push({
				path:'proDetails',
				query:{proId:e}
			})
        }).catch(() => {
			
        });
		
	}
}
</script>

<style scoped lang="scss">
@import "userList.scss";
</style>
