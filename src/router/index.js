import Vue from "vue"
import Router from "vue-router"
import Axios from "@/api/http"
import store from "../store"
Vue.use(Router)

const noFound = () => import("@/pages/noFound/404")
const Index = () => import("@/pages/index/index") // 首页
const Login = () => import("@/pages/login/login") // 登陆页面

//产品管理
const proMangeList = () => import("@/pages/proMangeList/proMangeList") // 产品管理列表页
const proDetails = () => import("@/pages/proMangeList/proDetails") // 产品管理详情页

//生产设备类放行管理
const proDeviceManageList = () =>
	import("@/pages/proDeviceManage/proDeviceManageList") // 生产设备类放行管理列表页
const proDeviceDetails = () =>
	import("@/pages/proDeviceManage/proDeviceDetails") // 生产设备类放行管理详情页

//行政设备物料类放行管理
const publicDeviceManageList = () =>
	import("@/pages/publicDeviceManage/publicDeviceManageList") // 行政设备物料类放行管理列表页

const publicDeviceDetalis = () =>
	import("@/pages/publicDeviceManage/publicDeviceDetalis") // 行政设备物料类放行管理详情页

//人员类放行管理
const personCateManageList = () =>
	import("@/pages/personCateManage/personCateManageList") // 人员类放行管理列表页
const personCateDetails = () =>
	import("@/pages/personCateManage/personCateDetails") // 人员类放行管理详情页

//保安放行管理
const safetyCateManageList = () =>
	import("@/pages/safetyCateManage/safetyCateManageList") // 保安放行管理列表页
const safetyCateDetalis = () =>
	import("@/pages/safetyCateManage/safetyCateDetalis") // 保安放行管理详情页
const safetyCateDetalisGold = () =>
	import("@/pages/safetyCateManage/safetyCateDetalisGold") // 保安放行管理产品详情页
const safetyCateDetalisPro = () =>
	import("@/pages/safetyCateManage/safetyCateDetalisPro") // 保安放行管理生产设备类详情页
const safetyCateDetalisPublic = () =>
	import("@/pages/safetyCateManage/safetyCateDetalisPublic") // 保安放行管理行政设备物料类详情页
const safetyCateDetalisPerson = () =>
	import("@/pages/safetyCateManage/safetyCateDetalisPerson") // 保安放行管理人员类详情页

//核销报表
const eliminationsReportList = () =>
	import("@/pages/eliminationsReport/eliminationsReportList") // 核销报表列表页

//审核流程管理
const auditFlowView = () => import("@/pages/auditFlowManage/auditFlowView") // 审核流程管理查看页

//保安岗亭设置
const safetyPavilionSetList = () =>
	import("@/pages/safetyPavilionSet/safetyPavilionSetList") // 保安岗亭设置列表页

//基础设置
const basicSetList = () => import("@/pages/basicSet/basicSetList") // 基础设置列表页

let routes = [
	{
		path: "/",
		redirect: "/index"
	},
	{
		path: "/index",
		component: Index,
		children: [
			{
				path: "proMangeList", // 产品管理列表页
				component: proMangeList
			},
			{
				path: "proDetails", // 产品管理详情页
				component: proDetails
			},
			{
				path: "proDeviceManageList", //生产设备类放行管理列表页
				component: proDeviceManageList
			},
			{
				path: "proDeviceDetails", //生产设备类放行管理详情页
				component: proDeviceDetails
			},
			{
				path: "publicDeviceManageList", //行政设备物料类放行管理列表页
				component: publicDeviceManageList
			},
			{
				path: "publicDeviceDetalis", //行政设备物料类放行管理详情页
				component: publicDeviceDetalis
			},
			{
				path: "personCateManageList", //人员类放行管理列表页
				component: personCateManageList
			},
			{
				path: "personCateDetails", //人员类放行管理详情页
				component: personCateDetails
			},
			{
				path: "safetyCateManageList", //保安放行管理列表页
				component: safetyCateManageList
			},
			{
				path: "safetyCateDetalis", //保安放行管理详情页
				component: safetyCateDetalis
			},
			{
				path: "safetyCateDetalisGold", //保安放行管理产品详情页
				component: safetyCateDetalisGold
			},
			{
				path: "safetyCateDetalisPro", //保安放行管理生产设备类详情页
				component: safetyCateDetalisPro
			},
			{
				path: "safetyCateDetalisPublic", //保安放行管理行政物料设备类详情页
				component: safetyCateDetalisPublic
			},
			{
				path: "safetyCateDetalisPerson", //保安放行管理人员类详情页
				component: safetyCateDetalisPerson
			},
			{
				path: "eliminationsReportList", //核销报表列表页
				component: eliminationsReportList
			},
			{
				path: "auditFlowView", //审核流程管理查看页
				component: auditFlowView
			},
			{
				path: "safetyPavilionSetList", //保安岗亭设置列表页
				component: safetyPavilionSetList
			},
			{
				path: "basicSetList", //基础设置列表页
				component: basicSetList
			}
		]
	},
	{
		path: "/login",
		component: Login
	},
	{
		path: "*",
		component: noFound
	}
]

// 配置引入路由
let routerChildObj = {}

const mergeRouter = (routes, obj) => {
	for (const key in obj) {
		routes[2].children = routes[2].children.concat(obj[key])
	}
	return routes
}

routes = mergeRouter(routes, routerChildObj)

const routerInstance = new Router({
	routes
})

// 全局路由拦截
routerInstance.beforeEach((to, from, next) => {
	const refreshToken = to.query.refreshToken
	let route = to.query.route
	// eslint-disable-next-line no-undef
	const portMain = process.env.API_HOST
	// 如果不是从其他系统跳转的 则不做处理
	if (!refreshToken) {
		store.commit({
			type: "global/changaLoading",
			loading: false
		})
		next()
	} else {
		let params = {
			refreshToken
		}
		Axios.get(`${portMain}/sso/covertRefreshToken`, params)
			.then(res => {
				localStorage.accessToken = res.data
				if (route) {
					localStorage.pathData = route
				}
			})
			.catch()
			.finally(() => {
				store.commit({
					type: "global/changaLoading",
					loading: false
				})
				if (route) {
					next(route)
				} else {
					next("/")
				}
			})
	}
})

export default routerInstance
