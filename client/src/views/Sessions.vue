<template>

	<div class="conversations">
		<div class="session" :class="{active: item.online }" v-for="(item, index) in conversations" :key="index"  @click="openConversation(id)">
			{{ item.firstName ? item.firstName + ' ' + item.lastName : item.username }}
		</div>
	</div>

</template>

<script>



export default {
	data () {
		return {
			conversations: []
		}
	},

	created(){

		this.$request('get','users').then(data=>{
			data.users.forEach((user)=>{
				user.online = data.online[user.uid]
			});
			this.conversations =  data.users
		})


		this.$ioOn('cennectedUsers',(data)=>{

			this.conversations.forEach((user)=>{
				user.online = data[user.uid]
			});
		})

	},
	methods: {
		openConversation(id){
			this.$router.push({name: 'chat', query: { id }})
		}
	}
}

</script>

<style lang="scss">

.conversations {
	display: flex;
	flex-direction: column;



	.session {
		margin: 3vw;
		&.active {
			background: green;
		}

		font-size: 2.5wv;
	}
}

</style>