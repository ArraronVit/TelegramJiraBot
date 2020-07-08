const swaggerSpec = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'TelegramJiraBot API documentation',
			version: '1.0.0',
		},
		host: process.env.HOST,
		basePath: '/',
	},
	apis: ['./models/*.js', './routes/*.js']
}

export default swaggerSpec
