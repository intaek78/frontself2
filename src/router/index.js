import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Coupon from '@/components/Coupon'
import Member from '@/components/Member'
import Cancellation from '@/components/Cancellation'
import Mypage from '@/components/Mypage'
import Crawling from '@/components/Crawling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/logins',
      name: 'login',
      component: Login
    },
    {
      path: '/coupons',
      name: 'coupon',
      component: Coupon,
      props: true
    },
    {
      path: '/members',
      name: 'member',
      component: Member,
      props: true
    },
    {
      path: '/cancellations',
      name: 'cancellation',
      component: Cancellation,
      props: true
    },
    {
      path: '/mypages',
      name: 'mypage',
      component: Mypage,
      props: true
    },
    {
      path: '/crawlings',
      name: 'crawling',
      component: Crawling,
      props: true
    }
  ]
})
