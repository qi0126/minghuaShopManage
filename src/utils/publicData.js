let pickerOptions = {
	shortcuts: [
		{
			text: "最近一周",
			onClick(picker) {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
				picker.$emit("pick", [start, end])
			}
		},
		{
			text: "最近一个月",
			onClick(picker) {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
				picker.$emit("pick", [start, end])
			}
		},
		{
			text: "最近三个月",
			onClick(picker) {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
				picker.$emit("pick", [start, end])
			}
		}
	]
}
/**
 * [检测是否拥有某项权限]
 * permissionsList Array  权限数组
 * permissionsValue String 需要匹配的权限值
 * return Boolean
 */
var checkPermissions = (permissionsList, permissionsValue) => {
	if (typeof permissionsList === "string") {
		permissionsList = JSON.parse(permissionsList)
	}
	if (permissionsList && permissionsList.length === 0) {
		return false
	}
	return permissionsList.includes(permissionsValue)
	//   return permissionsList.some(
	//     item => item.auth === permissionsValue && item.hasAuth
	//   );
}
//产品订单状态
let orderStatusList = [
	{ ind: 1, txt: "待审核", color: "#000000" },
	{ ind: 2, txt: "待放行", color: "#000000" },
	{ ind: 3, txt: "已放行", color: "#15832E" },
	{ ind: 4, txt: "已驳回", color: "#FF0402" },
	{ ind: 5, txt: "保安驳回", color: "#FF0402" },
	{ ind: 6, txt: "已超标", color: "#FF0402" }
]
//订单状态2
let orderStatusListOne = [
	{ ind: 1, txt: "待审核", color: "#000000" },
	{ ind: 2, txt: "待放行", color: "#000000" },
	{ ind: 3, txt: "已放行", color: "#15832E" },
	{ ind: 4, txt: "已驳回", color: "#FF0402" },
	{ ind: 5, txt: "保安驳回", color: "#FF0402" }
]
//小类对象
let subclassObj = {
	1: "成品",
	2: "半成品",
	3: "原料",
	4: "金水",
	5: "客户自带金",
	6: "生产设备类",
	7: "工装夹具类",
	8: "银版",
	9: "蜡板",
	10: "行政设备",
	11: "磨刀",
	12: "其他"
}
//放行原因对象
let releaseTypeObj = {
	1: "对外出入库",
	2: "集团内出入库",
	3: "内部借用",
	4: "维修",
	5: "外发加工",
	6: "变卖",
	7: "试模",
	8: "其他"
}
//审核模式
let approvalMode = {
	1: { txt: "单人审核", txtS: "单审" },
	2: { txt: "双人审核", txtS: "双审" },
	3: { txt: "三人审核", txtS: "三审" },
	4: { txt: "四人审核", txtS: "四审" },
	5: { txt: "五人审核", txtS: "五审" }
}
//节点数据
let nodeTypeList = {
	1: { txt: "普通节点" },
	2: { txt: "部门节点" },
	3: { txt: "集团节点" }
}

//业务类型
let bizTypeList = {
	1: { txt: "产品" },
	2: { txt: "生产设备类" },
	3: { txt: "行政设备及物料类" },
	4: { txt: "人员类" }
}
export default {
	checkPermissions,
	pickerOptions,
	orderStatusList,
	orderStatusListOne,
	subclassObj,
	releaseTypeObj,
	nodeTypeList,
	bizTypeList,
	approvalMode
}
