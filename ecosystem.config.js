module.exports = {
	apps: [
		{
			name: 'TelegramJiraBot',
			version: '1.0.0',
			instances: 'max',
			exec_mode: 'cluster',
			script: 'npm',
			args: 'start',
			env: {
				COMMON_VARIABLE: 'true'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
}
