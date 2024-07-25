import {createRouter, createWebHashHistory} from 'vue-router'
// import routesAutoImported from '~pages'

const routes = [
    {path: '/', component: () => import('../views/Index.vue')},
    {path: '/favlist', component: () => import('../views/Favlist.vue')},
    {path: '/history', component: () => import('../views/History.vue')},
    {path: '/setting', component: () => import('../views/Setting.vue')},
    {path: '/search', component: () => import('../views/Search.vue')},
    {path: '/video/:bv', component: () => import('../views/VideoView.vue'), props: true},
    {path: '/video/:bv/:p', component: () => import('../views/VideoView.vue'), props: true}

    // ...routesAutoImported,
]

// setTimeout(() => {
//   console.log(routes)
// }, 2000);

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})