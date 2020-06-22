import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import io from 'socket.io-client';
import { request, isDevelopment } from './common'
Vue.config.productionTip = false

let getSocket = function() {
	let token = '?token='+localStorage.getItem('_token')
	return io(isDevelopment ? 'http://localhost:3000' + token : '' + token)
}

let socket = getSocket()

Vue.prototype.$ioEmit = function(name,data) {
	socket.emit(name,data)
}

Vue.prototype.$ioOn = function(name,fn) {
	socket.on(name,fn)
}

Vue.prototype.isDevelopment = isDevelopment

Vue.prototype.$request = request

store.dispatch('initAuth').then(()=>{
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})







