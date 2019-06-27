import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Places from '@/components/Places'
import NewPlace from '@/components/NewPlace'
import SearchPage from '@/components/SearchPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/places',
      name: 'Places',
      component: Places
    },
    {
      path: '/places/new/',
      name: 'NewPlace',
      component: NewPlace
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
