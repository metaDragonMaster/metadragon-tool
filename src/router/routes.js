import Layout from "@/layout/index.vue";
const routes = [
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		// redirect: '/homepage',
		redirect: '/demo',
		children: [{
			path: '/register',
			name: 'register',
			meta: {
				title: "注册",
			},
			component: () => import('@/views/register/index.vue'),
		}, {
			path: '/homepage',
			name: 'homepage',
			meta: {
				title: "首页",
				isNav: true,
			},
			component: () => import('@/views/homepage/index.vue'),
		},{
			path: '/demo',
			name: 'demo',
			meta: {
				title: "测试用",
				// i18nTitle: '',
			},
			component: () => import('@/views/demo/index.vue'),
		}, {
			path: '/developer',
			name: 'developer',
			meta: {
				title: "开发者",
				isNav: true,
			},
			component: () => import('@/views/developer/index.vue'),
		}, {
			path: '/whiteBook',
			name: 'whiteBook',
			meta: {
				title: "白皮书",
				isNav: true,
			},
			component: () => import('@/views/whiteBook/index.vue'),
		}, {
			path: '/control',
			name: 'control',
			redirect: '/control/createScript',
			meta: {
				title: "开发者",
				isNav: true,
			},
			component: () => import('@/views/control/index.vue'),
			children: [
				{
					path: 'createScript',
					name: 'control-createScript',
					meta: {
						title: "开发者-创建脚本",
					},
					component: () => import('@/views/control/createScript/index.vue'),
				},
				{
					path: 'scriptOrder',
					name: 'control-scriptOrder',
					meta: {
						title: "开发者-脚本订单",
					},
					component: () => import('@/views/control/scriptOrder/index.vue'),
				},
			]
		}, {
			path: '/becomeScript',
			name: 'becomeScript',
			// redirect: '/becomeScript/createScript',
			redirect: '/becomeScript/projectPage',
			meta: {
				title: "成为脚本方",
				isNav: true,
			},
			component: () => import('@/views/becomeScript/index.vue'),
			children: [
				{
					path: 'projectPage',
					name: 'becomeScript-projectPage',
					meta: {
						title: "成为脚本方-项目列表",
					},
					component: () => import('@/views/becomeScript/projectPage/index.vue'),
				},
				{
					path: 'scriptPage',
					name: 'becomeScript-scriptPage',
					meta: {
						title: "成为脚本方-脚本列表",
					},
					component: () => import('@/views/becomeScript/scriptPage/index.vue'),
				},
				{
					path: 'createProject',
					name: 'becomeScript-createProject',
					meta: {
						title: "成为脚本方-创建项目",
					},
					component: () => import('@/views/becomeScript/createProject/index.vue'),
				},
				{
					path: 'createScript',
					name: 'becomeScript-createScript',
					meta: {
						title: "成为脚本方-创建脚本",
					},
					component: () => import('@/views/becomeScript/createScript/index.vue'),
				},
			]
		},]
	},
	{
		path: '/error/404',
		name: 'error404',
		meta: {
			title: "错误页面-找不到资源",
		},
		component: () => import('@/views/errorPage/404.vue'),
	},
	{
		path: "/:catchAll(.*)",
		redirect: '/error/404'
	},
]
export default routes
