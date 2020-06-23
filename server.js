let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')
const path = require('path')
const serveStatic = require("serve-static");
let tokenService = require('./token')
const methodOverride = require('method-override')



app.set('port', process.env.PORT || 3000);

let clientPath = (location)=>{
	return path.resolve(__dirname, 'client', 'dist')
}
app.use(require('connect-history-api-fallback')()) 
app.use(serveStatic(clientPath()));
app.use(methodOverride('_method'));
app.use(cors())
app.use(express.json());


const sequelize = new Sequelize('postgres://gxyfblsv:ZSoIrttKdzkmQbpAfUGEjOGOmIryw67G@kandula.db.elephantsql.com:5432/gxyfblsv')

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const User = sequelize.define('user', {

	uid: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4(),
	},
	// attributes
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},	

	// attributes
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},

	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	admin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	}

});


// Note: using `force: true` will drop the table if it already exists
//User.sync({ force: true }) // Now the `users` table in the database corresponds to the model definition

function generateToken(model) {
	return tokenService.createToken({
		uid: model.uid,
		username: model.username,
		firstName: model.firstName,
		lastName: model.lastName,
		admin: model.admin
	})
}

function handleError(error, res){
	if(error.original) {
		res.send({ 'error': error.original.detail})
		console.error('error !',error.original.detail)
		
	} else {
		res.send({ error})
		console.error('error !',error)
	}
}


app.post('/register', async (req, res) => {
	try {
		const newUser = new User(req.body)
		await newUser.save()
		let token = generateToken(newUser)
		res.json({ 'user': newUser, token }) // Returns the new user that is created in the database
	
	} catch (error) {

		 handleError(error,res)
	}
})


app.post('/login', async (req, res) => {

		const { username, password } = req.body

		try {
			const users = await User.findAll({
				where: {
					username,
					password
				}
			})
			if(users.length) {
				let user = users[0]
				let token = generateToken(user)
				res.json({ 'user': user, token }) 
			} else {
				res.json({ 'error': 'login error' }) 
			}

		} catch (error) {
			handleError(error,res)
		}

})


app.post('/credentials', async (req, res) => {

	const { token } = req.body

	try {
		let data = await tokenService.verifyToken(token)
		res.send(data)
	} catch(e) {
		res.send({error: 'bad token'})
	}



})


app.get('/users', async (req, res) => {
	try {
		const data = await User.findAll()
		res.json({ users: data, online: connectedUsers })
	} catch (error) {
		console.error(error)
	}
})



http.listen(app.get('port'), () => {
	console.log('Listening on port *: ' + app.get('port'));
});


let connectedUsers = {}

async function authCheck(socket){
	let token = socket.handshake.query.token;
	let valid = await tokenService.verifyToken(token)
	if(valid) {
		connectedUsers[valid.uid] = socket.id
	}
	socket.credentials = valid
}

io.use(async (socket, next) => {

	await authCheck(socket)
	return next();

});


io.on('connection', async (socket) => {

	if(socket.credentials) {
		socket.broadcast.emit('connectedUsers', connectedUsers)
	}

	console.log('new connection')

	socket.use(async (packet, next) => {
		await authCheck(socket)
		return next();
	});


	socket.emit('connections', Object.keys(io.sockets.connected).length);

	socket.on('disconnect', () => {

		console.log('disconnected')

		let id = socket.credentials.uid
		if(id) {
			connectedUsers[id] = ''
		}

		socket.broadcast.emit('connectedUsers', connectedUsers)

	});

	socket.on('chat-message', (data) => {
		socket.to(connectedUsers[data.address]).emit('chat-message', (data));

	});

	socket.on('typing', (data) => {
		socket.to(connectedUsers[data.address]).emit('typing', (data));

	});

	socket.on('stopTyping', (data) => {
		socket.to(connectedUsers[data.address]).emit('stopTyping');
	});	


	socket.on('joinConversation', (data) => {
		socket.to(connectedUsers[data.address]).emit('joinConversation', data);
	});


});


