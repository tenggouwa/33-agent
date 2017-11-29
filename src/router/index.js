import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {
      path:"/index",
      component: function(resolve){
        require(['../views/home/home.vue'],resolve);
      }
    },
    {
      path:"/setPwd",
      component: function(resolve){
        require(['../views/home/setPwdMail.vue'],resolve);
      }
    },
    {
      path:"/apply",
      component: function(resolve){
        require(['../views/agent/applyAgent.vue'],resolve);
      }
    },
    {
      path:"/myAgent",
      component: function(resolve){
        require(['../views/agent/myAgent.vue'],resolve);
      }
    },
  ]
})
