import httpError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import 'express-async-errors'

import indexRouter from '../routes/index'

const app = express()

/**
 * Middlewares
 */
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Routes
 */
app.use('/', indexRouter)

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
	next(new httpError.NotFound)
})

/**
 * error handler
 */
app.use((err, req, res, next) => {
	const status = err.status || 500
	const message = err.message || err
	const data = {
		error: {
			message: message
		}
	}
	res.status(status).json(data)
})

export default app
