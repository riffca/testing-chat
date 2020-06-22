import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
    dialog: {},
    messages: [],
		user: {},
    conversations: [],
	},
	mutations: {

		'set-auth'(state, val){
			state.user = val
		},
    'set-customer'(state,val) {
      state.cutomer = val
    },   
    'set-conversations'(state,val) {
      state.conversations = val
    },  
    'set-admin'(state,val) {
      state.admin = val
    }
	},
	actions: {
    initAuth({commit}){
      let token = localStorage.getItem('_token')
      if(token) {
        Vue.$request('post','credentials', {token}).then(user=>{
          if(user.uid) {
            commit('set-auth',user)
          } else {
            commit('set-auth', {username: false})
          }
        })
      } else {
        commit('set-auth', {username: false})
      }
    }
	},
	modules: {
	}

})
