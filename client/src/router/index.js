import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Places from '@/components/Places'
import NewPlace from '@/components/NewPlace'
import SearchPage from '@/components/SearchPage'
import Login from '@/components/Login'
import AuthCallback from '@/components/AuthCallback'
import Liked from '@/components/Liked'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/auth/callback',
      name: 'AuthCallback',
      component: AuthCallback
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
    },
    {
      path: '/liked',
      name: 'Liked',
      component: Liked
    }    
  ]
})
