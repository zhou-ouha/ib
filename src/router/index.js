import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/sysuser',
        children: [{
                path: '/sysuser',
                name: 'sysuser',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/sysuser.vue')
            },
            {
                path: '/bus',
                name: 'bus',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/bus.vue')
            },
            {
                path: '/line',
                name: 'line',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/line.vue')
            },
            {
                path: '/role',
                name: 'role',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/role.vue')
            },
            {
                path: '/scheduling',
                name: 'scheduling',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/scheduling.vue')
            },
            {
                path: '/station',
                name: 'station',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/station.vue')
            },
            {
                path: '/permission',
                name: 'permission',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/permission.vue')
            }
        ]
    },
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next()
    const str = window.sessionStorage.getItem('token')
    if (!str) return next('/login')
    next();
});

export default router