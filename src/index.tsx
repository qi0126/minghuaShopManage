import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import $$ from 'jquery'
import './utils'
const Steps = () => import("./pages/common/steps");//步骤条组件
const Popoverpic = () => import("./pages/common/popoverPic");//图片放大组件
const NoDataPage = () => import("./pages/common/noDataPage");//没有数据显示组件

Vue.component("Steps", Steps);
Vue.component("Popoverpic", Popoverpic);
Vue.component("NoDataPage", NoDataPage);

const isDebug_mode = process.env.NODE_ENV !== 'production'
const portImg = process.env.API_IMG;
Vue.prototype.$portImg = portImg;
Vue.prototype.$$ = $$;

Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;


new Vue({
    el: '#app',
    data: {
        eventHub: new Vue()
    },
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
