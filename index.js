'use strict';
const memberstackAdmin = require('@memberstack/admin');

const memberstack = memberstackAdmin.init(process.env.MEMBERSTACK_SECRET_KEY)

// const fetch = require('node-fetch');

module.exports.handler = (event, context, callback) => {
	(async () => {

		// get specific values passed into the request body
		let requestBody = JSON.parse(event.body)

		const token = requestBody['_ms-mid']
		const { id } = await memberstack.verifyToken({ token })
		let { data } = await memberstack.members.retrieve({ id })
		
		// verify the jwt signature against the public key just fetched
		let verifiedJwt = data

		// compile a response
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				user: {
						id: verifiedJwt.id,
						email: verifiedJwt.email,
						site: verifiedJwt.site
					},
			}),
		};

		// log the success
		console.log('Successful download. Member ID: ' + decodedJwt.payload.id + ' with Site ID: ' + decodedJwt.payload.site);

		// respond
		callback(null, response);

	})().catch(console.error);
};
