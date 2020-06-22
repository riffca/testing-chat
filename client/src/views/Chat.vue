
<template>
	<div id="chat">
		<div class="wrapper">
			<div class="info">
				<p v-for="(user, index) in info" :key="index">
					{{user.username}} {{user.type}}
					<span class="float-right">{{connections}} connections</span>
				</p>
			</div>

			<div class="header">
				<h4>
					<span>{{ chatMembers[0] ? chatMembers[0].username : '' }}</span> 
						vs 
					<span>{{ chatMembers[1] ? chatMembers[1].username : '' }}</span>  
				</h4>
			</div>

			<h2>{{username}}</h2>
			<div class="body">
				<ul class="messages">
					<small v-if="typing" class="text-white">{{typing}} is typing</small>
					<li class="list-group-item" v-for="(message, index) in messages" :key="index">
						<span :class="{'float-left':message.type === 1}">
							{{message.message}}
							<small>:{{message.user}}</small>
						</span>
					</li>
				</ul>
				
				<div class="footer">
					<form @submit.prevent="send">
						<div class="form-group">
							<input 
								type="text" 
								@keydown="typeAction(true)" 
								@keyup="typeAction(false)" 
								class="form-control" 
								v-model="newMessage"
								placeholder="Enter message here">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

</template>



<script>
import { mapState } from 'vuex'

export default {
	data(){
		return	{
			newMessage: null,
			messages: [],
			typing: false,
			username: null,
			info: [],
			connections: 0,
			chatId: '',
			chatMembers: []
		}
	},

	created() {

		if(this.user.username) {
			this.setMembers()
		}

		window.onbeforeunload = () => {
			this.$ioEmit('leave', this.user.username);
		}
		
		this.$ioOn('chat-message', (data) => {
			this.messages.push({
				message: data.message,
				type: 1,
				user: data.user,
			});
		});

		this.$ioOn('typing', (data) => {
			let typer = this.chatMembers.find(item=>item.uid == data.address)
			this.typing = typer.username +  ' is typing';
		});


		this.$ioOn('stopTyping', () => {
			this.typing = false;
		});

/*		this.$ioOn('joined', (data) => {
			this.info.push({
				username: data,
				type: 'joined'
			});

			setTimeout(() => {
				this.info = [];
			}, 5000);
		});

		this.$ioOn('leave', (data) => {
			this.info.push({
				username: data,
				type: 'left'
			});

			setTimeout(() => {
				this.info = [];
			}, 5000);
		});*/

	},

	watch: {

		user(val){
			if(val.username) {
				this.setMembers()
			}
		},
		conversations(){
			if(this.chatMembers.length >= 0  || this.chatMembers.length <= 1) {
				this.setMembers()
			}
		}
	},

	computed:{

		...mapState(['conversations', 'user']),
		getAddresses(){
			return this.chatMembers.filter(item=>this.user.id!=item.id)
		},

	},

	methods: {

		typeAction(value){
			this.getAddresses.forEach(user=>{

				value ? this.$ioEmit('typing', { address: user.uid  } ) 
					: this.$ioEmit('stopTyping',  { address: user.uid  } )
				
			})
		},



		setMembers(){
			this.chatMembers  = []

			this.chatMembers.push(this.user)

			this.chatId = this.$route.query.id 
			let opponent

			if(!this.chatId) {

				opponent = this.conversations.find(item=>{
					return item.admin && item.online
				})

				if(!opponent) {
					opponent = this.conversations.find(item=>{
						return item.admin
					})
				}

			} else {
				opponent = this.conversations.find(item=>{

					return item.id == this.chatId
				})

			}

			console.log(opponent)
			this.chatMembers.push(opponent)
		},
		send() {

			this.messages.push({
				message: this.newMessage,
				type: 0,
				user: 'Me',
			});

			this.chatMembers.forEach(user=>{
				this.$ioEmit('chat-message', {
					message: this.newMessage,
					user: this.user.username,
					address: user.uid
				});			
			})

			this.newMessage = null;
		},

		addUser() {
			this.ready = true;
			this.$ioEmit('joined', this.username)
		}
	},

}


</script>

<style lang="scss">

.chat { 

	height: 100vh;
	width: 100vm;


	.info {


	}

	.header {


	}

	.body {


	}

	.footer {


	}

}
	


</style>
