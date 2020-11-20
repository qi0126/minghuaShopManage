import http from "./http"

class Api {
	http: any
	constructor() {
		this.http = http
	}

	//上传图片
	uploadImg(params) {
		return this.http.upload("/file/uploading", params)
	}

	//退出登录
	logout(params) {
		return this.http.get("/sso/logout", params)
	}


	//登录
	login(params) {
		return this.http.post("/login", params)
		// return this.http.get("/categorygoods?mId=34")
	}
	//用户信息查询
	userInfo(params) {
		return this.http.get("/userInfo", params)
	}
	//产品查询
	proManage(params) {
		return this.http.post("/proManage", params)
	}
	//产品详情
	getProId(params) {
		return this.http.get("/detail", params)
	}
	categoryList(){
		return this.http.get("/categoryList")
	}
	//产品查询
	shopList(params) {
		return this.http.post("/shoplist", params)
	}
	//用户查询
	userList(params) {
		return this.http.post("/userList", params)
	}
	//用户详情查询
	userDetails(params) {
		return this.http.post("/userDetails", params)
	}
	//订单查询
	orderList(params) {
		return this.http.post("/orderList", params)
	}
	//删除购物车
	delCart(params) {
		return this.http.post("/delCart", params)
	}
	//删除关注
	delFlow(params) {
		return this.http.post("/delFlow", params)
	}
	//新增地址
	addAddr(params) {
		return this.http.post("/addAddr", params)
	}
	//修改地址
	editAddr(params) {
		return this.http.post("/editAddr", params)
	}
	//删除地址
	delAddr(params) {
		return this.http.post("/delAddr", params)
	}
	//修改产品
	editPro(params) {
		return this.http.post("/editPro", params)
	}
	//新建产品
	addPro(params) {
		return this.http.post("/addPro", params)
	}
	//删除产品
	delPro(params) {
		return this.http.post("/delPro", params)
	}
}

export default new Api()
