 <template>
	<div id="app">
		

		<div class="corner">
			<div class="logo">{{user.username ? user.username : ''}}</div>
			<div class="button" v-if="user.username" @click="logout">Logout</div>
		</div>
		<div id="nav">
			<router-link 
				class="button" 
				to="/sessions" 
				v-if="user.admin && $route.name !== 'sessions'">
				Sessions
		</router-link>
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

			console.log(data)

			let conversations = this.$store.state.conversations.slice()
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

* {
	margin: 0;
	padding: 0;
}

.corner {

	display: flex;
	position: fixed;
	top: 0;
	right: 0;

	.logo {
		font-size: 3.1vw;
		margin-right: 1vw;
		margin-top: 1vw;
	}
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
	font-size: 2.4vw;
	padding: 1vw;
}

.form-wrapper {
	display: flex;
	justify-content: center;
	

	input  {
		display: inline-block;
		padding: 1.28vw 2.24vw;
		margin: 0.2vw;
		width: 10vw;
		font-size: 1.3vw;
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

.logo {
	font-size: 2.3vw;
	margin-right: .3vw;


}


</style>
