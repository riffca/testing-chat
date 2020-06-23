import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import io from 'socket.io-client';
import { request, isDevelopment } from './common'

import firebase from 'firebase';
import 'firebase/firestore';

var config = {
	apiKey: "AIzaSyBaccQKkNcjZRoC2GsqbFDfuAMJ1IgAd9Q",
	authDomain: "test-5d51c.firebaseapp.com",
	projectId: 'test-5d51c',
	databaseURL: "https://test-5d51c.firebaseio.com",
	storageBucket: "ttest-5d51c.appspot.com"
};

firebase.initializeApp(config)


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

Vue.prototype.$db = firebase.firestore();
Vue.prototype.$firestore = firebase.firestore;


Vue.prototype.isDevelopment = isDevelopment

Vue.prototype.$request = request

store.dispatch('initAuth').then(()=>{
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})







