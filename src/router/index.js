import Vue from 'vue'
import Router from 'vue-router'
import GameList from '@/components/GameList'
import GameSettings from '@/components/GameSettings'
import ClientList from '@/components/ClientList'
import ClientSettings from '@/components/ClientSettings'
import ActivityList from '@/components/ActivityList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'GameList', component: GameList},
    {path: '/ClientList', name: 'ClientList', component: ClientList},
    {path: '/GameSettings', name: 'GameSettings', component: GameSettings},
    {path: '/ClientSettings', name: 'ClientSettings', component: ClientSettings},
    {path: '/ActivityList', name: 'ActivityList', component: ActivityList}
  ]
})
