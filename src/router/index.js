import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import GameBoard from '@/pages/GameBoard'
import GameSetup from '@/pages/GameSetup'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'setup',
    component: GameSetup
  },
  {
    path: '/game',
    name: 'game',
    component: GameBoard,
    beforeEnter: (to, from, next) => {
        if (!store.state.players.length) { alert("Nincs elegendő játékos. Adj hozzá leglább 2 játékost"); next({ path: '/' }) }
        else next()
    }
  },
  {
    path: '*',
    redirect: '/',
  }
]


const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior () {
    return { x: 0, y: 0}
  }
})

export default router
