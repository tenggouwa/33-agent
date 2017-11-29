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
    {
      path: '/myassets',
      component: function(resolve){
        require(['../views/Myassets/myassets'],resolve);
      },
    },
    {
      path: '/innovate',
      component: function(resolve){
        require(['../views/tradepage/innovte'],resolve)
      }
    },
    {
      path: '/traditional',
      component: function(resolve){
        require(['../views/tradepage/traditiontrade'],resolve)
      }
    },
    {
      path: '/usercenter',
      redirect:"/usercenter/identify",
      component: function(resolve){
        require(['../views/usercenter/usercenter'],resolve)
      },
      children:[
        {
          path: 'setting',
          component: function(resolve){
            require(['../views/usercenter/setting'],resolve)
          },
        },
        {
          path: 'identify',
          component: function(resolve){
            require(['../views/usercenter/identify'],resolve)
          },
        }
      ],
    },
    {
      path: '/tradecenter',
      redirect:"/tradecenter/entrustment",
      component: function(resolve){
        require(['../views/tradecenter/tradecenter'],resolve);
      },
      children:[
        {
          path: 'entrustment',
          component:function(resolve){
            require(['../views/tradecenter/tradechild/tradebottomchild/entrustment'],resolve);
          }
        },
        {
          path: 'history',
          component:function(resolve){
            require(['../views/tradecenter/tradechild/tradebottomchild/history'],resolve);
          }
        },
        {
          path: 'everybody',
          component:function(resolve){
            require(['../views/tradecenter/tradechild/tradebottomchild/everybody'],resolve);
          }
        },
      ]
    },
    {
      path: '/appload',
      component: function(resolve){
        require(['../views/appload/appload'],resolve);
      },
    },
    {
    	path:'/help',
      redirect:"/help/placeinform",
    	component: function(resolve){
    		require(['../views/help/helpcommon'],resolve);
    	},
    	children:[
    		{
    			path:'placeinform',
    			component:function(resolve){
    				require(['../views/help/helpchild/placeinform'],resolve);
    			}
    		},
        {
          path:'coinintroduce',
          component:function(resolve){
            require(['../views/help/helpchild/coinintroduce'],resolve);
          }
        },
        {
          path:'warningrisk',
          component:function(resolve){
            require(['../views/help/helpchild/warningrisk'],resolve);
          }
        },
        {
          path:'agencyneed',
          component:function(resolve){
            require(['../views/help/helpchild/agencyneed'],resolve);
          }
        },
        {
          path:'ratedescript',
          component:function(resolve){
            require(['../views/help/helpchild/ratedescript'],resolve);
          }
        },
        {
          path:'feedback',
          component:function(resolve){
            require(['../views/help/helpchild/feedback'],resolve);
          }
        },
        {
          path:'contantus',
          component:function(resolve){
            require(['../views/help/helpchild/contantus'],resolve);
          }
        },
    	]
    }
  ]
})
