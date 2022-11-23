import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: () => import('../views/TareaView.vue')
  },
  {
    path: '/Usuarios/:id',
    name: 'verTarea',
    component: () => import('../views/VerTareaView.vue')
  },
  {
    path: '/Usuarios/:id/editar',
    name: 'editarTarea',
    component: () => import('../views/EditarTareaView.vue')
  },

  {
    path: '/Consumos',
    name: 'Consumos',
    component: () => import('../views/ConsumoView.vue')
  },
  {
    path: '/Consumos/:id',
    name: 'verConsumo',
    component: () => import('../views/VerConsumoView.vue')
  },
  {
    path: '/Consumos/:id/editar',
    name: 'editarConsumo',
    component: () => import('../views/EditarConsumoView.vue')
  },
  {
    path: '/Reporte1',
    name: 'reporte1',
    component: () => import('../views/ReporteMesView.vue')
  },
  {
    path: '/Reporte2',
    name: 'reporte2',
    component: () => import('../views/ReporteUsuarioView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
