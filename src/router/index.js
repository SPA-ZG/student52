import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/first.vue'),
    },
    {
      path: '/list',
      name: 'Home',
      component: () => import('@/views/home.vue'),
    },
    {
      path: '/add',
      name: 'Add',
      component: () => import('@/views/add.vue'),
    },
    {
      path: '/expenses/:id',
      name: 'expense-details',
      component: () => import('@/views/details.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/notFound.vue'),
    },
  ],
});

export default router;
