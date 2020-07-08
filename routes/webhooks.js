import express from 'express'

import { sendMessage } from '../services/telegram'
import jireService from '../services/jira'

const router = express.Router()

const tempChatID = '-1001207836629'

router.post('/', async (req, res) => {
	//await sendJSON(tempChatID, req.body)
	await sendMessage(tempChatID, await jireService.handleEvent(req.body))
	res.send()
})

export default router
