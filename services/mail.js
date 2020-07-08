import mailgun from 'mailgun.js'

const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

const send = async (email, data) => {
	const message = {
		from: 'ImageModel <info@imagemodel.agency>',
		to: [email],
		subject: `Jira update`,
		html: data.toString()
	}
	const result = await mailgunClient.messages.create(
		'mg.imagemodel.agency',
		message
	)
	return result
}

export default { send }