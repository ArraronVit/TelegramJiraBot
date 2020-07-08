import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import webhooksRouter from '../routes/webhooks'
import swaggerSpec from '../config/swagger'

const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     description: Get something
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Successfully got something
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  version:
 *                    type: string
 *                    example: 1.0.0
 */
router.get('/', (req, res, next) => {
	res.status(200).json({ name: 'TelegramJiraBot', version: '1.0.0' })
})

router.use('/webhooks', webhooksRouter)
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))

export default router