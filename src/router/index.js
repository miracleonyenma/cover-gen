import { createWebHistory, createRouter } from "vue-router";

import coverView from '../components/coverView.vue'

const routes = [
    {
        path: '/',
        name: 'default',
        component: coverView
    },

    {
        path: '/covers/:slug',
        component: coverView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router