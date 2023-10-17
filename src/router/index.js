// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/TaskBoard.vue'),
      },
    ],
  },
  {
    path: '/t/:taskId',
    component: () => import('@/layouts/default/Default.vue'),
	name: 'EditTask',
    children: [
      {
        path: '',
        component: () => import('@/views/TaskBoard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


export default router
