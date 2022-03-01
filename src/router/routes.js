import Layout from "@/layout/index.vue";
const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/homepage',
        children: [{
            path: '/register',
            name: 'register',
            meta: {
                title: "注册",
            },
            component: () => import('@/views/register/index.vue'),
        },{
            path: '/homepage',
            name: 'homepage',
            meta: {
                title: "首页",
                isNav: true,
            },
            component: () => import('@/views/homepage/index.vue'),
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
            redirect:'/control/createScript',
            meta: {
                title: "开发者",
                isNav: true,
            },
            component: () => import('@/views/control/index.vue'),
            children:[
                {
                    path: 'createScript',
                    name: 'createScript',
                    meta: {
                        title: "开发者-创建脚本",
                        isNav: true,
                    },
                    component: () => import('@/views/control/createScript/index.vue'),
                },
                {
                    path: 'scriptOrder',
                    name: 'scriptOrder',
                    meta: {
                        title: "开发者-脚本订单",
                        isNav: true,
                    },
                    component: () => import('@/views/control/scriptOrder/index.vue'),
                },
            ]
        }, {
            path: '/becomeScript',
            name: 'becomeScript',
            meta: {
                title: "成为脚本方",
                isNav: true,
            },
            component: () => import('@/views/becomeScript/index.vue'),
        },]
    },
]
export default routes