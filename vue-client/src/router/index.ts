import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AfterAuthView from '../views/AfterAuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pending',
      name: 'pending',
      component: AfterAuthView
    },
    {
      path: '/404',
      alias: "*",
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(
    record => record.meta.requiresAuth
  )) {
    const tokenData = sessionStorage.getItem('jwt');

    if (tokenData) {
      next();
    } else {
      next({ name: '/' })
    }

  } else {
    next();
  }
})

export default router
