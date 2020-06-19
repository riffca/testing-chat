import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import io from 'socket.io-client';
import axios from 'axios'

Vue.config.productionTip = false





let isDevelopment = process.env.NODE_ENV === 'development'

let getSocket = function() {
	let token = '?token='+localStorage.getItem('_token')
	return io(isDevelopment ? 'http://localhost:3000' + token : '' + token)
}

let socket = getSocket()

Vue.prototype.getSocket = getSocket

Vue.prototype.setUrl = function(url) {
	return this.isDevelopment ? 'http://localhost:3000/' + url  : '' + url
}

Vue.prototype.$ioEmit = function(name,data) {
	socket.emit(name,data)
}

Vue.prototype.$ioOn = function(name,fn) {
	socket.on(name,fn)
}


Vue.prototype.isDevelopment = isDevelopment

Vue.prototype.$request = async function( type='post', url = '', data = {}) {
	if(this.isDevelopment) {
		console.log(`req ->> ${url}`)
	}
	return axios({
		url: this.setUrl(url),
		method: type,
		data,
	}).then(data=>{
		if(this.isDevelopment) {
			console.log('<--', data)
		}
		return data.data
	})
}



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
