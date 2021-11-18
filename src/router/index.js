import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/currentorder',
    name: 'CurrentOrder',
    component: () => import('../views/CurrentOrder.vue'),
  },
  {
    path: '/editorder',
    name: 'Editorder',
    component: () => import('../views/EditOrder.vue'),
  },
  {
    path: '/additemorder',
    name: 'AddItemOrder',
    component: () => import('../views/AddItemOrder.vue'),
  },
  {
    path: '/listitems',
    name: 'ListItems',
    component: () => import('../views/ListItems.vue'),
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
