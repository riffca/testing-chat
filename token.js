var jToken = require('jsonwebtoken');
class Token {

	constructor() {
		this.secretKey = "4fe18341-042d-422c-b232-20b73f97cba5";
	}

	createToken(claims) {
		claims = { ...claims }
		return jToken.sign(claims, this.secretKey, { expiresIn: 600 * 600 } )

	}

	async verifyToken(token) {
		return new Promise((resolve, reject)=>{
			jToken.verify(token, this.secretKey, (err,data)=>{
				if(err)resolve(false)
				resolve(data)
			});
		})
	}
}

module.exports = new Token()