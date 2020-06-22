import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component:  () => import('../views/Auth.vue')
	},
	{
		path: '/chat',
		name: 'chat',
		component: () => import('../views/Chat.vue')
	}, 
	{
		path: '/sessions',
		name: 'sessions',
		component: () => import('../views/Sessions.vue')
	},  
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to,from,next)=>{


  if(to.name !== 'auth') {
    if(!store.state.username) {
      next('/auth')
    }
  } else {
	  next()
    
  }


})

export default router
