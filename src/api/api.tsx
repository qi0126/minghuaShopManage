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
	//登录
	proManage() {
		return this.http.get("/proManage")
	}

}

export default new Api()
