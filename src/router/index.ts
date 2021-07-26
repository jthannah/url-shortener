import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/home.vue'
import MyUrls from '/src/views/my-urls.vue'
import ForwardUrl from '/src/views/forward-url.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/myurls',
    name: 'MyUrls',
    component: MyUrls,
  },
  {
    path: '/:shortUrl',
    name: 'forwardUrl',
    component: ForwardUrl,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
