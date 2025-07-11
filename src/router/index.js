import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/bio',
    name: 'bio',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/GalleryView.vue')
  },
  {
    path: '/tools',
    name: 'tool',
    component: () => import('../views/ToolsView.vue')
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue')
  },
  {
    path: '/vita',
    name: 'vita',
    component: () => import('../views/VitaView.vue')
  },
  {
    path: '/classes',
    name: 'Classes',
    component: () => import('../views/ClassesView.vue')
  },
  {
    path: '/dates',
    name: 'dates',
    component: () => import('../views/DatesView.vue')
  },
  {
    path: '/teaching',
    name: 'teaching',
    component: () => import('../views/TeachingView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
