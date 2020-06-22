import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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

router.beforeEach(async (to,from,next)=>{

	let user = store.state.user
	let isAuth = user.username
	console.log(isAuth)
	if(to.name !== 'auth') {
		if(!isAuth) {
			next('/auth')
			return

		}
	}

	if(to.name !== 'chat' && isAuth && !user.admin) {
		next('/chat')
		return

	}

	if(to.name === 'auth' && isAuth) {

		if(user.admin) {
			next('/sessions')
			return

		} else {
			next('/chat')
			return
			
		}

	}

	next()

})

export default router
