import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/home/homepage',
      children: [
        {
          path: '/home/homepage',
          component: () => import('@/views/home/HomePage.vue')
        },
        {
          path: '/product/productpage',
          component: () => import('@/views/product/ProductPage.vue')
        },
        {
          path: '/shopcart/shopcartpage',
          component: () => import('@/views/shopcart/ShopCart.vue')
        },
        {
          path: '/usereviews/usereviews',
          component: () => import('@/views/usereviews/UserReviews.vue')
        },
        {
          path: '/personal/personalcenter',
          component: () => import('@/views/personal/PersonalCenter.vue')
        }
      ]
    }
  ]
})

export default router
