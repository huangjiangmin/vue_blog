import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/views/homeIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: HomeIndex,
      children: [
        {
          path: '/home',
          name: 'home',
          component:(resolve) =>require(['@/views/home'],resolve)
        },
        {
          path: '/essaydetail/:id',
          name: 'essaydetail',
          component:(resolve) =>require(['@/views/essaydetail'],resolve)
        },  {
          path: '/code',
          name: 'code',
          component:(resolve) =>require(['@/views/code'],resolve)
        },  {
          path: '/life',
          name: 'life',
          component:(resolve) =>require(['@/views/life'],resolve)
        },  {
          path: '/author',
          name: 'author',
          component:(resolve) =>require(['@/views/author'],resolve)
        },{
          path: '/labels/:labelId/:labelName',
          name: 'labels',
          component:(resolve) =>require(['@/views/labels'],resolve)
        }, {
          path: '/message',
          name: 'message',
          component:(resolve) =>require(['@/views/message'],resolve)
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}