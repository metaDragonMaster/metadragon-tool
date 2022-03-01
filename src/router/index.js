import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "./routes.js";
const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth',
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  next();
})
router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
