<template>

	<div class="auth">
		<div class="auth-wrap">
			<div class="buttons">
				<div class="button" @click="isSignup=true" :class="{active: isSignup}">Регистрация</div>
				<div class="button" @click="isSignup=false" :class="{active: !isSignup}">Вход</div>
			</div>
			
			<div class="form-wrapper">
				<label for="username">Username:</label>
				<input id='username' type="text" v-model="username">			
			</div>		

			<div class="form-wrapper">
				<label for="password">Пароль:</label>
				<input id='password' type="text" v-model="password">			
			</div>		

			<div class="form-wrapper" v-if="isSignup">
				<label for="firstName">Имя:</label>
				<input id='firstName' type="text" v-model="firstName">			
			</div>		

			<div class="form-wrapper" v-if="isSignup">
				<label for="lastName">Фамилия:</label>
				<input id='lastName' type="text" v-model="lastName">			
			</div>			

			<div class="form-wrapper checkbox" v-if="isSignup">
				<label for="lastName">admin:</label>
				<input id='lastName' type="checkbox" v-model="isAdmin">			
			</div>

			<div class="send-button button blue" @click="authAction">Отправить</div>

		</div>

		
	</div>

</template>

<script>


export default {

	name: 'Auth',

	data () {
		return {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			isAdmin: false,
			isSignup: false,
		}
	},



	methods: {

		authAction(){

			let req = {
				username: this.username,
				password: this.password
			}

			if(this.isSignup) {
				req = {
					...req, 
					lastName: this.lastName,
					firstName: this.firstName,
					admin: this.isAdmin
				}
			}

			let action = this.isSignup ? 'register' : 'login'

			this.$request('post', action, req).then(data=>{

				if(data.token) {
					localStorage.setItem("_token",data.token)
					localStorage.setItem("user",JSON.stringify(data.user))
					this.$store.commit('set-auth', data.user)
				}

				if(!data.token) {
					alert(data.error)
					return	
				}

				if(!data.user.admin) {
					this.$router.push('/chat')
				} else {
					this.$router.push('/sessions')
				}

			}).catch(err=>{
				console.log('server err', err)
			})
		}
	}
}
</script>
<style lang="scss">

.auth {
	display: flex;
	justify-content: center;

	.send-button {
		margin-top: 2vw;
	}
}


.form-wrapper {
	min-width: 40vw;
	margin-top: .5vw;
}

.buttons {
	margin-bottom: 2vw;
	display: block;

}
	
.auth-wrap {

	margin-top: 5vw;
	max-width: 50vw;

	label {
		display: inline-block;
		width: 12vw;
		text-align:left;
	}

		

	.checkbox {
		display: inline-block;
		margin-top: 3vw;
		margin-bottom: 4vw;
	}
}


</style>