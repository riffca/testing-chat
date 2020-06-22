 <template>
	<div id="app">
		<div class="button logout" v-if="user.username" @click="logout">Logout</div>
		<div id="nav">
			<router-link class="button" to="/auth" v-if="">Auth</router-link> 
			<router-link class="button" to="/chat">Chat</router-link> 
			<router-link class="button" to="/sessions">Sessions</router-link>
		</div>
		<router-view/>
	</div>
</template>


<script>

import { mapState } from 'vuex'

export default {



	computed:{
		...mapState(['user'])
	},

	created(){
		document.querySelector('.loader').style.display = 'none'
	},

	async beforeCreate(){

		//Conversations

		this.$request('get','users').then(data=>{
			data.users.forEach((user)=>{
				user.online = data.online[user.uid]
			});
			this.$store.commit('set-conversations', data.users)
		})

		this.$ioOn('connectedUsers',(data)=>{
			let conversations = this.$store.conversations.slice()
			conversations.forEach((user)=>{
				user.online = data[user.uid]
			});
			this.$store.commit('set-conversations', conversations)
		})

	},

	methods: {
		logout(){
			localStorage.removeItem('_token')			
			localStorage.removeItem('user')			
			window.location.reload()
		}
	}


}
	

</script>

<style lang="scss">
.loader {
	font-size: 2vw;
	display: inline-block;
}
.logout {
	position: fixed;
	top: 0;
	right: 0;
} 

.blue {
	background: #0090fff2;
	border: 1px solid #0084fff2;
	color: white;
}
.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}


.button {

	font-weight: bold;
	display: inline-block;
	padding: 1.2vw;
	margin: .2vw;
	cursor: pointer;
	&:hover {
		transform: scale(1.04);
	}

	border: 1px solid black;

	&.active {
		background: black;
		color: white;
	}
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.title {
	font-size: 4vw;
	padding: 1vw;
}

.form-wrapper {
	display: flex;
	justify-content: center;
	

	input {
		padding: .8vw;
		width: 10vw;
		font-size: 1.4vw;
	}

	label {
		padding: 0.8vw;
		font-size: 1.3vw;
	}

}

#nav {

	position: fixed;
	top:0;

	a {
		text-decoration: none;
		color: #2c3e50;

	}
}
</style>
