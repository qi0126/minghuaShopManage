<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>保安岗亭设置</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />

			<!-- header -->
			<section>
				<div>
					<el-button
						type="primary"
						size="small"
						class="width86"
						@click="addSafetyFun"
					>
						新 增
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
					style="width: 100%; "
					@row-dblclick="safetyDetail"
				>
					<el-table-column
						prop="sentryName"
						label="保安亭名称"
					></el-table-column>
					<el-table-column
						prop="createTime"
						label="创建时间"
					></el-table-column>
					<el-table-column
						prop="creator"
						label="创建人"
					></el-table-column>
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

			<el-dialog
				:title="editTF ? '编辑保安亭' : '新增保安亭'"
				:visible.sync="editDivTF"
				width="1000px"
			>
				<div>
					<el-row class="editDiv">
						<el-col :span="6" class="tRight">
							<span class="red_font">*</span> 保安亭名称：
						</el-col>
						<el-col :span="18" class="tLeft">
							<el-input
								v-model="sentryObj.sentryName"
								placeholder="保安亭名称"
								class="width200"
								size="small"
								:maxlength="15"
								:minlength="2"
							>
							</el-input>
						</el-col>
						<el-col :span="6" class="tRight">
							相关备注：
						</el-col>
						<el-col :span="18" class="tLeft">
							<el-input
								v-model="sentryObj.remarks"
								:maxlength="50"
								placeholder="保安亭备注"
								class="width450"
								size="small"
							>
							</el-input>
						</el-col>
					</el-row>
					<el-row class="editDiv h450">
						<el-col :span="6" class="tRight">
							<span class="red_font">*</span> 管辖单位：
						</el-col>

						<el-col :span="18" class="tLeft">
							<!-- <el-checkbox-group v-model="checkList"> -->
							<el-col
								v-for="(i, indOne) in sentryObj.companyVoList"
								:key="indOne"
								:span="8"
							>
								<el-checkbox
									v-model="i.checkStatu"
									:label="i.companyId"
									:disabled="!i.statu"
								>
									<span v-if="i.statu">{{
										i.companyName
									}}</span>

									<el-tooltip
										v-if="!i.statu"
										class="item"
										effect="dark"
										content="该公司已被禁用"
										placement="top"
									>
										<span>{{ i.companyName }}</span>
									</el-tooltip>
								</el-checkbox>
							</el-col>
							<!-- </el-checkbox-group> -->
						</el-col>
						<el-col :span="6" class="tRight">
							<span class="red_font">*</span> 值岗保安：
						</el-col>
						<el-col :span="18" class="tLeft">
							<!-- <el-checkbox-group v-model="checkList"> -->
							<el-col
								v-for="(i,
								indOne) in sentryObj.securityGuardVoList"
								:key="indOne"
								:span="8"
							>
								<el-checkbox
									v-model="i.checkStatu"
									:label="i.guardId"
									:disabled="!i.statu"
								>
									<span v-if="i.statu">{{
										i.guardName
									}}</span>

									<el-tooltip
										v-if="!i.statu"
										class="item"
										effect="dark"
										content="该用户已被禁用"
										placement="top"
									>
										<span>{{ i.guardName }}</span>
									</el-tooltip>
								</el-checkbox>
							</el-col>
							<!-- </el-checkbox-group> -->
						</el-col>
					</el-row>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button
						size="small"
						class="width86"
						@click="editDivTF = false"
						>取 消</el-button
					>
					<el-button
						size="small"
						class="width86"
						type="primary"
						@click="saveFun()"
						>确 定</el-button
					>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	orderList: Array<object> = []
	sentryObj: object = {
		sentryName: "",
		remarks: "",
		companyVoList: [],
		securityGuardVoList: []
	} //保安岗亭详情
	checkList: Array<object> = []
	goldBasicNum: string = ""
	pageNum: Number = 1
	pageSize: Number = 0
	editDivTF: boolean = false
	loadingTF: boolean = false
	editTF: boolean = false //新曾岗亭为false,编辑岗亭为true

	created() {
		this.created_fun()
		// this.powerFun()
	}
	created_fun() {
		this.getAllDate(1, 12) //放行条读取
	}
	getAllDate(num, size) {
		let self = this
		this.loadingTF = true
		this.pageSize = size
		let params = {
			page: num,
			rows: size
		}

		Object.assign(params, self.search_where)
		app.$api.sentryboxList(params).then(
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
	//新建按钮
	addSafetyFun() {
		let self = this
		self.editTF = false //新增岗亭为false
		app.$api.sentryboxCreationPrepare().then(res => {
			self.loadingTF = false
			if (res.status == 200) {
				self.sentryObj = {
					sentryName: "",
					remarks: "",
					securityGuardVoList: res.data.securityGuardList,
					companyVoList: res.data.companyList
				}
				self.editDivTF = true
			} else {
				self.$message.error(res.msg)
			}
		})
	}
	//编辑按钮
	safetyDetail(e) {
		let self = this
		self.editTF = true //编辑岗亭为true
		let params = { sentryBoxId: e.sentryBoxId }
		app.$api.sentryboxDeltail(params).then(res => {
			self.loadingTF = false
			if (res.status == 200) {
				self.sentryObj = res.data //保安ypbfb
				// console.log("res:", self.sentryObj)
				self.editDivTF = true
			} else {
				self.$message.error(res.msg)
			}
		})
		// this.editDivTF = true
	}
	//权限判断
	powerFun() {
		this.powerControl = this.$publicData.checkPermissions(
			this.$store.state.queryVerify,
			"over_order_manage"
		)
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
	//编辑新增保存按钮
	saveFun() {
		let self = this

		let {
			sentryBoxId,
			sentryName,
			remarks,
			securityGuardVoList,
			companyVoList
		} = this.sentryObj
		if (sentryName.length == 0) {
			this.$message.error("保安岗名称不能为空!")
			return
		}
		let userList = []
		let companyList = []
		//保安列表编历
		securityGuardVoList.forEach(ielem => {
			if (ielem.checkStatu) {
				userList.push({
					userId: ielem.guardId,
					concat: ielem.guardName
				})
			}
		})
		//部门列表编历
		companyVoList.forEach(ielem => {
			if (ielem.checkStatu) {
				companyList.push({
					companyId: ielem.companyId,
					companyName: ielem.companyName
				})
			}
		})
		if (userList.length == 0 || companyList.length == 0) {
			this.$message.error("管辖单位或保安都为必填,请重新选择!")
			return
		}
		let params = {
			sentryName,
			remarks,
			userList,
			companyList
		}
		if (sentryBoxId) {
			params.sentryBoxId = sentryBoxId
			app.$api.sentryboxUpdate(params).then(res => {
				if (res.status == 200) {
					self.$message.success("修改保安亭成功，正在刷新！")
					self.editDivTF = false
					setTimeout(_ => {
						self.created_fun()
					}, 1000)
				} else {
					self.$message.error(res.msg)
				}
			})
		} else {
			app.$api.sentryboxCreate(params).then(res => {
				if (res.status == 200) {
					self.$message.success("创建保安亭成功，正在刷新！")
					self.editDivTF = false
					setTimeout(_ => {
						self.created_fun()
					}, 1000)
				} else {
					self.$message.error(res.msg)
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
@import "safetyPavilionSetList.scss";
</style>
