import http from "./http"

class Api {
	http: any
	constructor() {
		this.http = http
	}

	//上传图片
	uploadImg(params) {
		return this.http.upload("/m/pub/uploadImg", params)
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
		return this.http.post("/shopList", params)
	}

}

export default new Api()
