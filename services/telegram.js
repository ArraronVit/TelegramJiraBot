import TelegramBot from 'node-telegram-bot-api'
import asyncRedis from 'async-redis'

const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })
const redisURL = process.env.REDIS_URL
const redis = asyncRedis.createClient(redisURL)

bot.on('message', async (message) => {
	console.log(message)
})

bot.onText(/\/status/, async (message) => {
	let fromID = message.from.id.toString()
	let jiraID = await redis.get(fromID)
	if (jiraID) {
		await sendMessage(fromID, `Your JIRA account id - ${jiraID}`)
	} else {
		await sendMessage(fromID, `Your haven't got an associated JIRA account`)
	}
})

bot.onText(/\/configure (.+)/, async (message, match) => {
	if (!match || match.length === 0 || match[1].length === 0) {
		return
	}
	let fromID = message.from.id.toString()
	let jiraID = match[1]
	await redis.set(fromID, jiraID)
	await sendMessage(fromID, `Your have set ${jiraID} as JIRA account id`)
})

export const sendMessage = async (chatID, message) => {
	try {
		return await bot.sendMessage(
			chatID,
			message
		)
	} catch (err) {
		console.error(err.response.body)
		throw err
	}
}

export const sendJSON = async (chatID, data) => {
	const fileOptions = {
		filename: `Response_${new Date()}.json`,
		contentType: 'application/json',
	}
	return await bot.sendDocument(
		chatID,
		Buffer.from(JSON.stringify(data), "utf-8"),
		{},
		fileOptions
	)
}

export default bot
