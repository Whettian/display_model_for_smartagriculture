import { createApp } from 'vue'

import axios from 'axios';
import $ from 'jquery'
import * as echarts from 'echarts'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'

import utils from '/public/utils.js'
import api from '/public/api.js'

import 'lib-flexible'
import '/public/dark_theme.css';

import App from './App.vue'
import index from "./pages/index.vue"
import device from "./pages/device.vue"
import crop from "./pages/crop.vue"
import environment from "./pages/environment.vue"
import market from "./pages/market.vue"

import {
	createRouter,
	createWebHashHistory
} from "vue-router";

const routes = [{
		path: '/',
		component: index
	},
	{
		path: '/index',
		component: index
	},
	{
		path: '/crop',
		component: crop
	},
	{
		path: '/environment',
		component: environment
	},
	{
		path: '/device',
		component: device
	},
	{
		path: '/market',
		component: market
	}
]
const router = createRouter({
	// 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
	history: createWebHashHistory(),
	routes, // `routes: routes` 的缩写
})

var app = createApp(App);

// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;

for (const name in ElIcons) {
	app.component(name, ElIcons[name])
}
app.use(router);
app.use(ElementPlus);

app.mount('#app')
