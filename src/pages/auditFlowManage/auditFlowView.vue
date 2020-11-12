<template>
	<div v-loading="loadingTF" class="conBigDiv orderlist">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
			<el-breadcrumb-item>node商城后台管理</el-breadcrumb-item>
			<el-breadcrumb-item>审核流程管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<div class="hr" />
			<div class="editDiv">
				选择审核流程类别
				<el-radio-group
					v-model="radio1"
					size="small"
					:disabled="editTF"
					@change="changeFlowFun"
				>
					<el-radio-button
						v-for="ielem in flowList"
						:key="ielem.processType"
						:label="ielem.processType"
					>
						{{ ielem.txt }}
					</el-radio-button>
				</el-radio-group>
			</div>
			<div class="spaceStyleOne"></div>
			<!-- header -->
			<div class="searchTxtDiv">
				<el-row>
					<el-col :span="14">
						<div>
							流程名称：<span v-if="!editTF">{{
								flowObj.processName || "无"
							}}</span>
							<el-input
								v-else
								v-model="flowObj.processName"
								placeholder="流程名称"
								class="width200A"
								size="small"
								@input="forceUpdate"
							>
							</el-input>
						</div>
						<div>
							流程备注：<span v-if="!editTF">{{
								flowObj.processRemark || "无"
							}}</span>
							<el-input
								v-else
								v-model="flowObj.processRemark"
								placeholder="流程备注"
								class="width200A"
								size="small"
								@input="forceUpdate"
							>
							</el-input>
						</div>
					</el-col>
					<el-col v-if="powerTF" :span="10" class="tRight">
						<el-button
							:disabled="editTF"
							size="small"
							type="primary"
							class="width99"
							@click="editFlowFun"
						>
							编辑流程
						</el-button>
					</el-col>
				</el-row>
			</div>
			<el-steps
				v-if="flowObj.tProcessNodes && flowObj.tProcessNodes.length > 0"
				id="editStepsOne"
				:active="flowObj.tProcessNodes.length + 1"
				class="Steps"
				direction="vertical"
			>
				<el-step
					v-for="(item, index) in flowObj.tProcessNodes"
					:key="index"
					:status="item.status"
					:simple="true"
				>
					<div slot="description" class="description">
						<el-row>
							<el-col :span="21">
								<div>
									<span class="titTxt">{{
										item.nodeName
									}}</span>
									<span class="verifySpan">
										<span>{{
											$publicData.nodeTypeList[
												item.nodeType
											].txt
										}}</span>
									</span>
									<span class="verifySpan">
										<span>{{
											$publicData.approvalMode[
												item.approvalMode
											].txtS
										}}</span>
									</span>
								</div>
								<div class="verifyTxt">
									审核人：{{ item.auditorTxt }}
								</div>
							</el-col>
							<el-col :span="3">
								<div v-if="editTF" class="tCenter">
									<el-button
										size="small"
										type="primary"
										class="width86"
										plain
										@click="editPointFun(item, index)"
									>
										编辑节点
									</el-button>
								</div>
								<div v-if="editTF" class="tCenter">
									<span
										class="width86 delBtn"
										type="text"
										@click="delPointFun(item, index)"
									>
										删除节点
									</span>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-step>
			</el-steps>
			<el-row v-if="editTF" class="addPointDiv">
				<el-col :span="12">
					<el-button
						size="small"
						type="primary"
						plain
						@click="addPointFun()"
					>
						添加审核节点+
					</el-button>
				</el-col>
				<el-col :span="12" class="tRight">
					<el-button
						size="small"
						type="primary"
						class="width86"
						@click="cancelFun"
					>
						取 消
					</el-button>
					<el-button
						size="small"
						type="primary"
						class="width86"
						@click="saveFun"
					>
						保 存
					</el-button>
				</el-col>
			</el-row>
		</div>
		<el-dialog
			:title="addPointTF ? '新增节点' : '编辑节点'"
			:visible.sync="editDivTF"
			width="1100px"
		>
			<div class="h450">
				<el-row class="editDiv">
					<el-col :span="4" class="tRight">
						<span class="red_font">*</span> 节点名称：
					</el-col>
					<el-col :span="20" class="tLeft">
						<el-input
							v-model="editPointObj.nodeName"
							placeholder="节点名称"
							class="width200A"
							size="small"
						>
						</el-input>
					</el-col>
					<el-col :span="4" class="tRight">
						<span class="red_font">*</span>节点类型：
					</el-col>
					<el-col
						:span="editPointObj.nodeType == 3 ? 10 : 20"
						class="tLeft"
					>
						<el-radio
							v-model="editPointObj.nodeType"
							:label="1"
							@change="changeGroupPointFun"
						>
							普通节点
						</el-radio>
						<el-radio
							v-model="editPointObj.nodeType"
							:label="2"
							@change="changeGroupPointFun"
						>
							部门节点
						</el-radio>
						<el-radio
							v-model="editPointObj.nodeType"
							:label="3"
							@change="changeGroupPointFun"
						>
							集团节点
						</el-radio>
					</el-col>
					<el-col
						v-if="editPointObj.nodeType == 3"
						:span="10"
						class="tLeft"
					>
						<span>
							<el-input
								v-model="editPointObj.searchTxt"
								placeholder="集团节点搜索"
								class="width200"
								size="small"
							>
							</el-input>
							<el-button
								size="small"
								type="primary"
								class="width86"
								@click="searchGroupFun"
							>
								查询
							</el-button>
						</span>
					</el-col>
					<el-col :span="4" class="tRight">
						<span class="red_font">*</span>审批模式：
					</el-col>
					<el-col :span="20" class="tLeft">
						<el-select
							v-model="editPointObj.approvalMode"
							size="small"
							placeholder="请选择"
							class="width200"
						>
							<el-option
								v-for="item in orderSourceSear"
								:key="item.code"
								:label="item.value"
								:value="item.code"
							></el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="editDivOne">
					<el-col :span="4" class="tRight checkTxtDiv">
						<span class="red_font">*</span> 审核人员：
					</el-col>
					<el-col :span="20" class="tLeft">
						<div class="checkTxtDivOne">
							<el-row>
								<el-col :span="22">
									<span
										v-for="(i,
										ind) in editPointObj.auditorObjList"
										:key="ind"
										class="checkNameSpan"
										>{{ i.concat }}
										<i
											class="el-icon-error delIcon"
											@click="delCheckMan(i)"
										></i>
									</span>
									&nbsp;
								</el-col>
								<el-col :span="2" class="sumPeopleDiv">
									<span
										>共{{
											editPointObj.auditorObjList
												? editPointObj.auditorObjList
														.length
												: 0
										}}人</span
									>
								</el-col>
							</el-row>
						</div>
						<div class="checkTxtDiv">
							<el-checkbox-group
								v-if="editPointObj.nodeType == 3"
								v-model="editPointObj.auditorList"
							>
								<span
									v-for="(i, indOne) in membersListGroup"
									:key="indOne"
								>
									<el-col :span="6">
										<el-checkbox
											:label="i.userId"
											class="checkboxDiv"
											:disabled="i.disableTF"
											@change="
												changeGroupFun(indOne, $event)
											"
										>
											<b>{{ i.concat }}</b>
										</el-checkbox>
									</el-col>
								</span>
							</el-checkbox-group>
							<el-checkbox-group
								v-if="editPointObj.nodeType != 3"
								v-model="editPointObj.auditorList"
							>
								<span
									v-for="(item, indOne) in membersList"
									:key="indOne"
								>
									<span>
										<el-col :span="24">
											<el-checkbox
												:label="'del_' + indOne"
												class="checkboxDiv"
												@change="
													changeDept(indOne, $event)
												"
											>
												<b>{{ item.deptName }}</b>
											</el-checkbox>
										</el-col>
										<el-col
											v-for="(i, indOne) in item.members"
											:key="indOne"
											:span="6"
										>
											<el-checkbox
												:key="i.userId"
												:disabled="i.disableTF"
												:label="i.userId"
												class="checkboxDiv"
												@change="
													changeUserFun(i, $event)
												"
											>
												{{ i.concat }}
											</el-checkbox>
										</el-col>
									</span>
								</span>
							</el-checkbox-group>
						</div>
					</el-col>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" class="width86" @click="cancelPointFun"
					>取 消</el-button
				>
				<el-button
					size="small"
					type="primary"
					class="width86"
					:loading="btnLoadingTF"
					@click="savePointFun"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script lang="ts">
import app from "@/global"
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({ components: {} })
export default class ProductNew extends Vue {
	activeName: string = "one" //选择卡，默认打开产品放行审核流程
	loadingTF: boolean = false //页面加载效果
	powerTF: boolean = true //无权限
	radio1: number = 1
	radio: string = "1"
	editPointInd: number = 1
	flowObj = {} //当前流程对象
	editDivTF: boolean = false //新增和编辑节点弹窗
	editTF: boolean = false //查看状态false,编辑状态为true
	editPointObj: object = {} //编辑状态下流程下节点内容编辑
	editPointObjTemp: string = "" //编辑状态下流程下节点内容暂时保存
	addPointTF: boolean = false //新增节点为true,编辑节点为false
	btnLoadingTF: boolean = false //新增与编辑节点确定按钮加载中效果
	goldBasicNum: string = ""
	checkList: Array<object> = []
	membersList: Array<object> = [] //查询公司所有的用户, 包含部门信息和角色名称(部门节点、普通节点)
	membersListGroup: Array<object> = [] //查询公司所有的用户, 包含部门信息和角色名称(集团节点)
	membersListTemp: Array<object> = [] //查询公司所有的用户, 包含部门信息和角色名称
	deptList: Array<string> = []
	nodeTypeNum: number = 1 //节点保存
	nodeTypeNumSave: number = 1 //节点保存
	disableList: Array<object> = [] //禁用数组
	orderSourceSear: Array<object> = [
		{
			code: 1,
			value: "单人审核"
		},
		{
			code: 2,
			value: "双人审核"
		},
		{
			code: 3,
			value: "三人审核"
		},
		{
			code: 4,
			value: "四人审核"
		},
		{
			code: 5,
			value: "五人审核"
		}
	]
	flowList: Array<object> = [
		{
			txt: "产品放行审核流程",
			index: "one",
			processType: 1
		},
		{
			txt: "生产设备类放行审核流程",
			index: "two",
			processType: 2
		},
		{
			txt: "行政设备及物料类放行审核流程",
			index: "three",
			processType: 3
		},
		{
			txt: "人员放行审核流程",
			index: "four",
			processType: 4
		}
	]

	created() {
		this.created_fun()
		// this.powerFun()
	}

	created_fun() {
		this.searchGroupFun() //集团节点列表接口
		this.membersFun() //查询公司所有的用户, 包含部门信息和角色名称
		this.getAllDate(1) //查询流程管理接口
	}
	getAllDate(elem) {
		let self = this
		self.loadingTF = true
		app.$api.findProcessList({}).then(
			res => {
				self.loadingTF = false
				if (res.status == 200) {
					this.flowList.forEach(ielem => {
						res.data.forEach(jelem => {
							if (jelem.processType == ielem.processType) {
								//流程数据填充进去流程列表
								Object.assign(ielem, jelem)
							}
						})
					})
					setTimeout(_ => {
						self.changeFlowFun(elem ? elem : 1) //默认第一个产品
					}, 50)
				} else {
					self.$message.error(res.msg)
				}
			},
			err => {
				self.loadingTF = false
				self.powerTF = false //无权限编辑按钮也隐藏
			}
		)
	}
	//查询公司所有的用户, 包含部门信息和角色名称
	membersFun() {
		app.$api.members({}).then(res => {
			if (res.status == 200) {
				this.membersList = res.data
				this.membersListTemp = JSON.parse(
					JSON.stringify(this.membersList)
				) //备注一份部门和员工列表，供普通节点和部门节点使用，集团结点用另外一个数据对象
			} else {
				this.$message.error(res.msg)
			}
		})
	}
	//切换流程方法
	changeFlowFun(e) {
		this.flowList.forEach(ielem => {
			if (ielem.processType == e) {
				this.flowObj = ielem
				if (ielem.tProcessNodes) {
					ielem.tProcessNodes.forEach(jelem => {
						jelem.auditorListT = []
						jelem.auditorList = []
						jelem.auditor.split(",").forEach(kelem => {
							jelem.auditorList.push(Number(kelem))
							if (jelem.nodeType != 3) {
								//普通节点和部门节点
								//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
								this.membersList.forEach(qelem => {
									//遍历部门下员工切换ID为姓名
									qelem.members.forEach(pelem => {
										if (pelem.userId == kelem) {
											jelem.auditorListT.push(
												pelem.concat
											)
										}
									})
								})
							} else {
								//集团节点
								//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
								this.membersListGroup.forEach(qelem => {
									//遍历部门下员工切换ID为姓名
									if (qelem.userId == kelem) {
										jelem.auditorListT.push(qelem.concat)
									}
								})
							}
						})
						jelem.auditorTxt = jelem.auditorListT.join(",")
					})
				}
			}
		})
		this.disableList = [] //集团结点禁用清空
		this.$forceUpdate()
	}

	//编辑按钮
	editFlowFun() {
		this.editTF = true
	}
	//新增节点
	addPointFun() {
		this.addPointTF = true
		this.editPointObj = {
			nodeName: "",
			auditor: "",
			nodeStep: 1,
			nodeType: 1,
			approvalMode: 1,
			auditorList: [],
			auditorObjList: []
		}
		if (
			this.flowObj.tProcessNodes &&
			this.flowObj.tProcessNodes.length > 0
		) {
			this.disableFun(
				this.flowObj.tProcessNodes,
				this.flowObj.tProcessNodes.length
			) //流程别的节点人员禁用方法
		} else {
			this.membersList.forEach(ielem => {
				ielem.members.forEach(jelem => {
					jelem.disableTF = false
				})
			})
		}

		this.nodeTypeNumSave = 1
		this.editDivTF = true
	}
	//编辑节点
	editPointFun(e, ind) {
		this.nodeTypeNumSave = this.flowObj.tProcessNodes[ind].nodeType //普通节点为1，部门节点为2,集团节点为3
		this.nodeTypeNum = this.flowObj.tProcessNodes[ind].nodeType == 3 ? 3 : 1 //部门和普通节点为1，集团节点为3
		this.disableFun(this.flowObj.tProcessNodes, ind) //流程别的节点人员禁用方法
		this.addPointTF = false //新增节点状态编辑节点为false
		this.editPointObj = this.flowObj.tProcessNodes[ind]
		if (this.editPointObj.nodeType == 3) {
			//集团节点
			this.flowObj.tProcessNodes[ind].auditorObjList = []
			this.flowObj.tProcessNodes[ind].auditorList.forEach(ielem => {
				//部门和普通节点
				//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
				//遍历部门下员工切换ID为姓名
				this.membersListGroup.forEach(pelem => {
					if (pelem.userId == ielem) {
						this.flowObj.tProcessNodes[ind].auditorObjList.push({
							concat: pelem.concat,
							userId: ielem
						})
					}
				})
			})
		} else {
			//普通和部门节点
			this.flowObj.tProcessNodes[ind].auditorObjList = []
			this.flowObj.tProcessNodes[ind].auditorList.forEach(ielem => {
				//部门和普通节点
				//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
				this.membersList.forEach(qelem => {
					//遍历部门下员工切换ID为姓名
					qelem.members.forEach(pelem => {
						if (pelem.userId == ielem) {
							this.flowObj.tProcessNodes[ind].auditorObjList.push(
								{
									concat: pelem.concat,
									userId: ielem
								}
							)
						}
					})
				})
			})
		}

		this.editPointObjTemp = JSON.stringify(this.flowObj.tProcessNodes[ind])
		this.editPointInd = ind //编辑节点的index
		this.editDivTF = true //新增或编辑节点弹窗
	}
	//流程别的节点人员禁用方法
	disableFun(list, ind) {
		//list为所有流程遍历
		let disableList = []
		list.forEach((i, indOne) => {
			if (indOne == ind) {
			} else {
				disableList = disableList.concat(i.auditorList)
			}
		})
		this.disableList = disableList
		//禁用数组

		//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
		this.membersList.forEach(qelem => {
			//遍历部门下员工切换ID为姓名
			qelem.members.forEach(pelem => {
				pelem.disableTF = false
				disableList.forEach(ielem => {
					if (pelem.userId == ielem) {
						//流程上下有审核人员就开启禁用
						pelem.disableTF = true
						return
					}
				})
			})
		})

		//遍历部门下员工切换ID为姓名
		this.membersListGroup.forEach(pelem => {
			pelem.disableTF = false
			disableList.forEach(ielem => {
				if (pelem.userId == ielem) {
					//流程上下有审核人员就开启禁用
					pelem.disableTF = true
					return
				}
			})
		})
	}

	//删除节点统一方法
	delPointFun(txt, ind) {
		this.$confirm(
			"此操作将只是虚拟删除该节点,需要点保存后方可真正删除该节点, 是否继续?",
			"提示",
			{
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}
		)
			.then(() => {
				this.flowObj.tProcessNodes.splice(ind, 1)
				this.$forceUpdate()
			})
			.catch(() => {})
	}
	forceUpdate() {
		this.$forceUpdate()
	}
	//编辑节点保存按钮
	savePointFun() {
		let self = this
		let { editPointObj } = this
		editPointObj.nodeName = editPointObj.nodeName.replace(/\s+/g, "") //去空格
		if (editPointObj.nodeName.length == 0) {
			this.$message.error("节点名称不能为空,请重新输入！")
			return
		}
		//节点上审核人员审核个数判断
		if (editPointObj.auditorObjList.length < editPointObj.approvalMode) {
			this.$message.error("审核人员数量不够,请重新选择提交！")
			return
		}

		this.editDivTF = false
		this.btnLoadingTF = true //确定按钮加载中效果
		if (!this.addPointTF) {
			this.editSavePointFun() //编辑节点方法
		} else {
			this.addSavePointFun() //新增节点方法
		}
		setTimeout(_ => {
			self.btnLoadingTF = false //取消确定按钮加载中效果
		}, 500)
	}
	//编辑节点保存方法
	editSavePointFun() {
		let { editPointObj } = this
		//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
		editPointObj.auditorListT = []
		editPointObj.auditorList.forEach(ielem => {
			if (editPointObj.nodeType != 3) {
				//普通部门节点
				this.membersList.forEach(qelem => {
					//遍历部门下员工切换ID为姓名
					qelem.members.forEach(pelem => {
						if (pelem.userId == ielem) {
							editPointObj.auditorListT.push(pelem.concat)
						}
					})
				})
			} else {
				//集团节点
				//遍历部门下员工切换ID为姓名
				this.membersListGroup.forEach(pelem => {
					if (pelem.userId == ielem) {
						editPointObj.auditorListT.push(pelem.concat)
					}
				})
			}
		})
		editPointObj.auditorTxt = editPointObj.auditorListT.join(",") //节点成员id转姓名
		this.flowObj.tProcessNodes[this.editPointInd] = editPointObj
	}
	//新增节点保存方法
	addSavePointFun() {
		let { editPointObj } = this
		//节点每个成员ID遍历，下边的部门成员遍历根据ID切换姓名
		editPointObj.auditorListT = []
		if (editPointObj.nodeType != 3) {
			//普通和部门节点名称遍历保存
			editPointObj.auditorList.forEach(ielem => {
				this.membersList.forEach(qelem => {
					//遍历部门下员工切换ID为姓名
					qelem.members.forEach(pelem => {
						if (pelem.userId == ielem) {
							editPointObj.auditorListT.push(pelem.concat)
						}
					})
				})
			})
		} else {
			//集团节点名称遍历保存
			editPointObj.auditorList.forEach(ielem => {
				//遍历部门下员工切换ID为姓名
				this.membersListGroup.forEach(pelem => {
					if (pelem.userId == ielem) {
						editPointObj.auditorListT.push(pelem.concat)
					}
				})
			})
		}

		editPointObj.auditorTxt = editPointObj.auditorListT.join(",") //节点成员id转姓名
		if (this.flowObj.tProcessNodes) {
			this.flowObj.tProcessNodes.push(editPointObj)
		} else {
			this.flowObj.tProcessNodes = [editPointObj]
		}
	}
	//编辑节点取消
	cancelPointFun() {
		if (this.editPointObjTemp) {
			this.editPointObj = JSON.parse(this.editPointObjTemp)
			this.flowObj.tProcessNodes[this.editPointInd] = JSON.parse(
				this.editPointObjTemp
			)
		}

		this.editDivTF = false
	}
	//点击部门选框
	changeDept(ind, e) {
		let { editPointObj } = this
		if (e) {
			//选中
			this.membersList[ind].members.forEach(ielem => {
				if (!ielem.disableTF) {
					//选中部门禁用状态不能添加
					editPointObj.auditorObjList.push(ielem)
				}
			})
			this.deptList.push("del_" + ind)
			this.editObjFunTwo(true, ind) //对象处理
		} else {
			let auditorListTemp = [] //新的数组保存取消返中
			//取消选中
			editPointObj.auditorObjList.forEach((jelem, indOne) => {
				let addTF = true
				this.membersList[ind].members.forEach(ielem => {
					if (ielem.userId == jelem.userId) {
						addTF = false //在这里边就不添加
					}
				})
				if (addTF) {
					auditorListTemp.push(jelem) //新数组添加userid，在这部门下不添加
				}
			})
			editPointObj.auditorObjList = auditorListTemp
			let delInd = null
			this.deptList.forEach((ielem, indTwo) => {
				if ("del_" + ind === ielem) {
					delInd = indTwo
				}
			})
			this.deptList.splice(delInd, 1)
			this.editObjFunTwo(false, ind) //对象处理
		}
	}

	//修改
	changeGroupPointFun() {
		if (this.editPointObj.nodeType == 3) {
			//为集团结点
			this.searchGroupFun()
			this.changeGroupStatus(3, 3) //
		} else {
			//普通结点、部门结点
			// this.membersList = JSON.parse(JSON.stringify(this.membersListTemp))
			this.changeGroupStatus(1, this.editPointObj.nodeType)
		}
	}
	//普通、部门和集团节点切换，会提示清除数据
	changeGroupStatus(n, num) {
		if (this.nodeTypeNum != n) {
			//切换普通部门和集团节点，提交会清除数据
			this.$confirm(
				"切换普通部门和集团节点，将会清除已选审核人员, 是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}
			)
				.then(() => {
					this.nodeTypeNum = n
					this.editPointObj.auditorObjList = []
					this.nodeTypeNumSave = this.editPointObj.nodeType

					this.editObjFun()
				})
				.catch(() => {
					this.editPointObj.nodeType = this.nodeTypeNumSave
				})
		} else {
			this.nodeTypeNumSave = num
		}
	}
	//集团节点接口
	searchGroupFun() {
		let param = {
			keyWord: this.editPointObj.searchTxt
		}
		app.$api.groupUserList(param).then(res => {
			if (res.status == 200) {
				this.membersListGroup = res.data

				this.membersListGroup.forEach(pelem => {
					pelem.disableTF = false
				})
				//遍历部门下员工切换ID为姓名
				if (this.disableList && this.disableList.length > 0) {
					this.membersListGroup.forEach(pelem => {
						pelem.disableTF = false
						this.disableList.forEach(ielem => {
							if (pelem.userId == ielem) {
								//流程上下有审核人员就开启禁用
								pelem.disableTF = true
								return
							}
						})
					})
				} else {
				}
			} else {
				this.$message.error(res.msg)
			}
		})
	}
	//集团节点点击人员接口
	changeGroupFun(indOne, e) {
		let { auditorObjList } = this.editPointObj
		if (e) {
			//人员选中
			auditorObjList.push(this.membersListGroup[indOne])
		} else {
			//人员取消选中
			let delInd = null
			auditorObjList.forEach((ielem, indTwo) => {
				if (ielem.userId == this.membersListGroup[indOne].userId)
					delInd = indTwo //将删除的index保存
			})
			auditorObjList.splice(delInd, 1) //删除
		}
	}
	//大流程取消按钮
	cancelFun() {
		this.editTF = false
	}
	//大流程保存按钮
	saveFun() {
		let self = this
		if (!this.flowObj.processName || this.flowObj.processName.length == 0) {
			this.$message.error("流程名称不能为空,请重新输入!")
			return
		}
		if (
			!this.flowObj.tProcessNodes ||
			this.flowObj.tProcessNodes.length == 0
		) {
			this.$message.error("流程名称不能没有节点,请添加节点再保存!")
			return
		}
		let addTF = true //审核节点人数小于实际节点人员，true为可提交，false要警告，不能提交
		this.flowObj.tProcessNodes.forEach((ielem, ind) => {
			ielem.auditorListN = []
			if (ielem.approvalMode > ielem.auditorList.length) {
				addTF = false
			}
			ielem.auditorList.forEach((jelem, indOne) => {
				if (typeof jelem == "number" && !isNaN(jelem)) {
					ielem.auditorListN.push(jelem)
				}
			})
			ielem.auditor = ielem.auditorListN.join(",") //id赋值
			ielem.nodeStep = ind + 1 //节点顺序
			delete ielem.createTime //删除时间
			delete ielem.id //删除ID
		})
		if (!addTF) {
			//审核节点人数小于实际节点人员，true为可提交，false要警告，不能提交
			this.$message.error("审核人员数量不够,请重新选择提交！")
			return
		}
		// console.log("flowObj:", this.flowObj)
		if (this.flowObj.id) {
			//编辑流程调接口
			app.$api.editProcess(this.flowObj).then(res => {
				if (res.status == 200) {
					this.$message.success("修改流程成功!")
					setTimeout(_ => {
						self.getAllDate(self.radio1)
					}, 1000)
					this.editTF = false
				} else {
					this.$message.error(res.msg)
				}
			})
		} else {
			//新增流程调接口
			app.$api.saveProcess(this.flowObj).then(res => {
				if (res.status == 200) {
					this.$message.success("新增流程成功!")
					setTimeout(_ => {
						self.getAllDate(self.radio1)
					}, 1000)

					this.editTF = false
				} else {
					this.$message.error(res.msg)
				}
			})
		}
	}
	//删除已选人员
	delCheckMan(i) {
		let delInd = null
		this.editPointObj.auditorObjList.forEach((ielem, indOne) => {
			if (ielem.userId == i.userId) {
				delInd = indOne
				return
			}
		})
		this.editPointObj.auditorObjList.splice(delInd, 1) //删除已选对象数组
		this.editObjFun() //对象处理
	}
	//对象处理
	editObjFun() {
		this.editPointObj.auditorListT = []
		this.editPointObj.auditorList = []
		this.editPointObj.auditorObjList.forEach(ielem => {
			this.editPointObj.auditorListT.push(ielem.concat)
		})
		this.editPointObj.auditorObjList.forEach(ielem => {
			this.editPointObj.auditorList.push(ielem.userId)
		})
		this.editPointObj.auditor = this.editPointObj.auditorList.join(",")
		this.editPointObj.auditorTxt = this.editPointObj.auditorListT.join(",")
	}
	//对象处理
	editObjFunTwo(checkTF, e) {
		this.editPointObj.auditorListT = []
		this.editPointObj.auditorList = []
		this.editPointObj.auditorObjList.forEach(ielem => {
			this.editPointObj.auditorListT.push(ielem.concat)
		})
		this.editPointObj.auditorObjList.forEach(ielem => {
			this.editPointObj.auditorList.push(ielem.userId)
		})
		//部门选中
		if (checkTF == true) {
			this.editPointObj.auditorList = app.$u.unique(
				this.editPointObj.auditorList.concat(this.deptList)
			)
		}
		if (checkTF == false) {
			this.editPointObj.auditorList = app.$u.unique(
				this.editPointObj.auditorList.concat(this.deptList)
			)
		}
		this.editPointObj.auditor = this.editPointObj.auditorList.join(",")

		this.editPointObj.auditorTxt = this.editPointObj.auditorListT.join(",")
		this.editPointObj.auditorObjList = app.$u.repetCust(
			this.editPointObj.auditorObjList,
			"userId"
		)
	}
	//用户选择与反选事件
	changeUserFun(i, checkTF) {
		if (checkTF) {
			//选择
			this.editPointObj.auditorObjList.push(i) //增加已选对象数组
			this.editObjFun() //对象处理
		} else {
			//取消选择
			this.delCheckMan(i)
		}
	}
}
</script>

<style scoped lang="scss">
@import "auditFlowView.scss";
</style>

<style>
/* 步骤条样式唯一 */

#editStepsOne .el-step__head.is-finish {
	color: #4db063;
	border-color: #4db063;
}
#editStepsOne .el-step__description {
	padding-right: 0;
}
</style>
