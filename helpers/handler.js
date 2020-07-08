const onError = (error) => {
	if (error.syscall !== 'listen') {
		throw error
	}
	const bind = 'Port ' + process.env.PORT
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

const onListening = () => {
	console.log('Listening on port ' + process.env.PORT)
}

export default { onError, onListening }