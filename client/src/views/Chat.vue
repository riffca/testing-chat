
<template>
	<div id="chat">
		<div class="header">
			<h4>
				<div class="title">Conversation with <span>{{ chatMembers[1] ? chatMembers[1].username : '' }}</span> </div>
				
				<div class="info">
					<p v-for="(user, index) in info" :key="index">
						{{user.username}} {{user.type}}
					</p>
				</div>
			</h4>
		</div>

		<div class="body">
			<ul class="messages">
				<li v-for="(message, index) in messages" :key="index">
					<span :style="{'float-left':message.type === 1}">
						{{message.message}}
						<small>:{{message.user}}</small>
					</span>
				</li>
			</ul>
			
		</div>
		<div class="footer">
			<form @submit.prevent="send">
				<div class="form-wrapper">
					<input 
						type="text" 
						@keydown="typeAction(true)" 
						@keyup="typeAction(false)" 
						class="form-control" 
						v-model="newMessage"
						placeholder="Enter message here">

						<div @click="send" class="button send-button">send</div>
				</div>
			</form>

			<small v-if="typing" class="text-white">{{typing}}</small>

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
			chatMembers: [],
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

			let current = this.chatMembers.find(item=>item.uid==data.from)

			if(current) {
				this.messages.push({
					message: data.message,
					type: 1,
					user: data.user,
				});
			}
			this.$nextTick(()=>{
				this.scrollWindow()
			})

		});

		this.$ioOn('typing', (data) => {
			let typer = this.chatMembers.find(item=>item.uid == data.from)
			if(typer) {
				this.typing = typer.username +  ' is typing';	
			}
		});


		this.$ioOn('stopTyping', () => {
			this.typing = false;
		});		

		this.$ioOn('joinConversation', (data) => {
			let member = this.conversations.find(item=>item.uid===data.from)
			this.chatMembers.push(member)
		});

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
		},

		chatMembers(){

				if(this.chatMembers <= 1) return 

				let that = this
				let ref = this.$db.collection("messages")
				this.chatMembers.forEach(item=>{
					if(item){
						ref = ref.where('members.'+item.uid, '==',true)
					}
				})

				ref.get()
					.then(function(querySnapshot) {
						let messages = []
						querySnapshot.forEach(function(doc) {
							let item = {
								id: doc.id,
								...doc.data()
							}
							messages.push(item)


						})
						messages.sort((a,b)=>{
							return a.createdAt - b.createdAt
						})

						that.messages = messages

						that.$nextTick(()=>{
							that.scrollWindow()
						})

					})
					.catch(function(error) {
							console.log("Error getting documents: ", error);
					});

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
				if(user.id !== this.user.id) {
					value ? this.$ioEmit('typing', { address: user.uid, from: this.user.uid  } ) 
						: this.$ioEmit('stopTyping',  { address: user.uid, from: this.user.uid   } )
				}
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
		
			this.chatMembers.push(opponent)

		},
		async send() {

			this.current = ''
				

			let message = {
				message: this.newMessage,
				user: this.user.username,
				createdAt: Date.now()
			}

			this.messages.push({
				...message,
				type: 0
			});

			this.$nextTick(()=>{
				this.scrollWindow()
			})

			message.members = {}

			this.chatMembers.forEach(item=>{
				message.members[item.uid] = true
			})

			this.$db.collection("messages").add(message)
			.then(function(docRef) {
					console.log("Document written with ID: ", docRef.id);
			})
			.catch(function(error) {
					console.error("Error adding document: ", error);
			});


			this.chatMembers.forEach(user=>{
				if(user.id !== this.user.id) {
					message.address = user.uid
					message.from = this.user.uid
					this.$ioEmit('chat-message', message);			
				}
			})

			this.newMessage = null;
		},
		scrollWindow(){
			var scrollingElement = (document.scrollingElement || document.body);
			scrollingElement.scrollTop = scrollingElement.scrollHeight;
		},

	},

}


</script>

<style lang="scss">

#chat { 

	
	margin-bottom: 15vw;
	margin-top: 15vw;
	.header {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		background: white;
	}
	
	.messages {
		list-style: none;
	}
	.info {
		display: inline-block;
	}
	.footer {
		position: fixed;
		bottom: 2vw;
		left: 50%;
		transform: translateX(-50%);
		form, small  {
			display: block;
		}

		small {
			position: absolute;
			right: 0;
			top: -2vw;
		}
	}

	.body {

		margin-top: 8vw;
	}
}
	


</style>
