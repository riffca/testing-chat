<template>

	<div class="conversations">

		<div class="form-wrapper filter">

			<input type="filterName" v-model="filterName">

			<select v-model="selectActive">
				<option>all</option>
				<option>active</option>
				<option>offline</option>
			</select>

		</div>

		<div class="session" :class="{active: user.online }" v-for="(user, index) in filteredConversations" :key="index"  @click="openConversation(user)">
			{{ user.firstName ? user.firstName + ' ' + user.lastName : user.username }}
		</div>
	</div>

</template>

<script>

import { mapState } from 'vuex'

export default {
	data () {
		return {
			filteredConversations: [],
			selectActive: 'all',
			filterName: []
		}
	},
	created(){
		this.changeList()
	},
	watch:{
		filterName(val){

			this.filter(item=>{
				let name = item.username + item.firstName + item.lastName
				return name.includes(val)

			})

		},    
		selectActive(){
			this.changeList()
		},
		conversations(){
			this.changeList()
		}
	},
	computed: {
		...mapState(['conversations','user'])
	},  

	methods: {

		changeList(){
			if(this.selectActive === 'active') {
				this.filter(item=>{
					return item.online
				})


			}     

			if(this.selectActive === 'offline') {
				this.filter(item=>{
					return !item.online
				})

			}     

			if(this.selectActive === 'all') {

				this.filter(item=>item)
			}
		},

		filter(cb){
			this.filteredConversations = this.conversations.filter(cb).filter(item=>item.uid !== this.user.uid)
		},
		openConversation(user){
			this.$router.push({name: 'chat', query: { id: user.id }})
			this.$store.commit('set-customer', user)
		}
	}
}

</script>

<style lang="scss">

.conversations {
	display: flex;
	flex-direction: column;

	.session {
		cursor: pointer;
		&:hover {
			background: grey;
			color: white;
		}

		padding: 2vw 1.3vw;
		margin: .23vw;
	}

	.session {

		border-radius: 0.3vw;
		&.active {
			background: #6ea76e;
			color: white;
			&:hover {
				background: grey;
				color: white;
			}
		}

		font-size: 2.5wv;
	}
}

</style>