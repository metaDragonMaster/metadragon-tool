import { createRouter, createWebHashHistory } from 'vue-router';
import routes from "./routes.js";
import { UseStoreWeb3js } from '@/stores/web3js.js';
const router = createRouter({
	routes,
	history: createWebHashHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				top: 0,
				left: 0,
				behavior: 'smooth',
			}
		}
	}
});
const whitePathList = [
	'/',
	'/homepage',
	'/register',
]
router.beforeEach(async (to, from, next) => {
	const storeWeb3 = UseStoreWeb3js();
	const { startWeb3, haveAuth } = storeWeb3;
	console.log("router beforeEach", to.path)
	//验证是否被赋予权限
	if (!haveAuth && !whitePathList.includes(to.path)) {
		//没有就去请求
		try {
			const queryWeb3 = await startWeb3();
			if (queryWeb3) {
				next(to.path)
			} else {
				next('/homepage');
			}
		} catch (error) {
			console.error(error)
			next('/homepage');
		}
	} else {
		next();
	}
})
router.afterEach((to) => {
	document.title = to.meta.title
})

export default router
