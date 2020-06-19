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

			<div class="form-wrapper checkbox">
				<label for="lastName">admin:</label>
				<input id='lastName' type="checkbox" v-model="isAdmin">			
			</div>


							<div class="button blue" @click="action">Отправить</div>

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

	mounted(){


	},

	methods: {

		action(){

			if(this.isSignup) {
				this.register()
			} else {
				this.login()
			}
		},
		login(){
			let req = {
				username: this.username,
				password: this.password,
				admin: this.isAdmin
			}
			this.$ioEmit('login',req)

		},
		register(){

			let req = {
				username: this.username,
				password: this.password,
				lastName: this.lastName,
				firstName: this.firstName,
				admin: this.isAdmin
			}

			this.$request('post', 'register', req).then(data=>{

				if(data.token) {
					localStorage.setItem("_token",data.token)
					localStorage.setItem("user",JSON.stringify(data.user))
					this.$store.commit('set-auth', data.user)
				}

			}).catch(err=>{
				console.log(err)
			})
		}
	}
}
</script>
<style lang="scss">

.auth {
	display: flex;
	justify-content: center;
}


.form-wrapper {
	min-width: 40vw;
	margin-top: .5vw;
}

.buttons {
	display: block;

}
	

.auth-wrap {

	margin-top: 10vw;
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