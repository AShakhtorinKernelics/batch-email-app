import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AfterAuthView from '../views/AfterAuthView.vue'
import { storageAuthItemName } from '../constants/auth-item-names';
import { viewNames } from "../constants/view-names";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: viewNames.HomeView,
      component: HomeView
    },
    {
      path: '/profile',
      name: viewNames.ProfileView,
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pending',
      name: 'pending',
      component: AfterAuthView
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(
    record => record.meta.requiresAuth
  )) {
    const tokenData = sessionStorage.getItem(storageAuthItemName);

    if (tokenData) {
      next();
    } else {
      next({ name: viewNames.HomeView })
    }

  } else {
    next();
  }
})

export default router
