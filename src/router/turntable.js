//转盘路由
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../pages/turntable/index.vue')
    },
    {
        path: '/select',

        name: 'Select',
        component: () =>
            import ('../pages/turntable/select.vue')
    }, {
        path: '/title',
        name: 'Title',
        component: () =>
            import ('../pages/turntable/title.vue')
    },
    {
        path: '/power',
        name: 'Power',
        component: () =>
            import ('../pages/turntable/power.vue')
    },
    {
        path: '/create-title',
        name: 'CreateTitle',
        component: () =>
            import ('../pages/turntable/create-title.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router