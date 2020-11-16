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
const shopList = () => import("@/pages/shopList/shopList") // 生产设备类放行管理列表页
const shopDetails = () => import("@/pages/shopList/shopDetails") // 生产设备类放行管理详情页

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
				path: "shopList", //店铺管理
				component: shopList
			},
			{
				path: "shopDetails", //店铺管理详情页
				component: shopDetails
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
