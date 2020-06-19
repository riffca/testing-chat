<template>
	<div id="app">
		<div id="nav">
			<router-link to="/auth">Auth</router-link> |
			<router-link to="/chat">Chat</router-link> |
			<router-link to="/sessions">Sessions</router-link>
		</div>
		<router-view/>
	</div>
</template>


<script>
export default {

	mounted(){

		// let req = {
		// 	token: localStorage.getItem('_token')
		// }

		// socket.emit('login',req)
	}

}
	

</script>

<style lang="scss">

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
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
