
<template>
	<div id="app">
		<div class="container">
			<div class="col-lg-6 offset-lg-3">
				<div>
					<p v-for="(user, index) in info" :key="index">
						{{user.username}} {{user.type}}
					</p>
				</div>
				<h2>{{username}}</h2>
				<div class="card bg-info">
					<div class="card-header text-white">
						<h4>My Chat App <span class="float-right">{{connections}} connections</span></h4>
					</div>
					<ul class="list-group list-group-flush text-right">
						<small v-if="typing" class="text-white">{{typing}} is typing</small>
						<li class="list-group-item" v-for="(message, index) in messages" :key="index">
							<span :class="{'float-left':message.type === 1}">
								{{message.message}}
								<small>:{{message.user}}</small>
							</span>
						</li>
					</ul>
					
					<div class="card-body">
						<form @submit.prevent="send">
							<div class="form-group">
								<input type="text" class="form-control" v-model="newMessage"
									placeholder="Enter message here">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>



<script>


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
		}
	},

	created() {

		this.chatId = this.$route.query.id 
		window.onbeforeunload = () => {
			this.$ioEmit('leave', this.username);
		}
		
		this.$ioOn('chat-message', (data) => {
			this.messages.push({
				message: data.message,
				type: 1,
				user: data.user,
			});
		});

		this.$ioOn('typing', (data) => {
			this.typing = data;
		});


		this.$ioOn('stopTyping', () => {
			this.typing = false;
		});

		this.$ioOn('joined', (data) => {
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
		});

		this.$ioOn('connections', (data) => {

			this.connections = data;
		});
	},

	watch: {
		newMessage(value) {
			value ? this.$ioEmit('typing', this.username) : this.$ioEmit('stopTyping')
		}
	},

	computed:{
		authUser(){
			return this.$store.state.user
		}
	},

	methods: {
		send() {
			this.messages.push({
				message: this.newMessage,
				type: 0,
				user: 'Me',
			});

			this.$ioEmit('chat-message', {
				message: this.newMessage,
				user: this.authUser.username,
				address: this.$route.query.id
			});
			this.newMessage = null;
		},

		addUser() {
			this.ready = true;
			this.$ioEmit('joined', this.username)
		}
	},

}


</script>
