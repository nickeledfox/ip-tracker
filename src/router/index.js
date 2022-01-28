import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import '/node_modules/leaflet/dist/leaflet.css';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'IP Address Tracker',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
