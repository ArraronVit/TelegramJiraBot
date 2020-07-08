import wrapper from '../helpers/wrapper'

const EventType = {
	JIRA_ISSUE_CREATED: 'jira:issue_created',
	JIRA_ISSUE_UPDATED: 'jira:issue_updated',
	JIRA_COMMENT_CREATED: 'comment_created',
	JIRA_COMMENT_DELETED: 'comment_deleted',
	JIRA_ISSUE_DELETED: 'jira:issue_deleted'
}

const baseURL = 'https://testjird.atlassian.net/rest/api/3/'
const token = process.env.JIRA_TOKEN

const handleEvent = async (event) => {
	// noinspection JSUnresolvedVariable
	const webhookEvent = event.webhookEvent
	switch (webhookEvent) {
		case EventType.JIRA_ISSUE_CREATED:
			return handleIssueCreated(event)
		case EventType.JIRA_ISSUE_UPDATED:
			return handleIssueUpdated(event)
		case EventType.JIRA_COMMENT_CREATED:
			return await handleCommentCreated(event)
		case EventType.JIRA_ISSUE_DELETED:
			return handleIssueDeleted(event)
		case EventType.JIRA_COMMENT_DELETED:
			return handleCommentDeleted(event)
		default:
			return "hmmm"
	}
}

const handleIssueCreated = (event) => {
	const userName = event.user.displayName
	// noinspection JSUnresolvedVariable
	const key = event.issue.key
	return `${userName} created a new issue(#${key})`
}

// noinspection JSUnresolvedVariable
const handleIssueUpdated = (event) => {
	// noinspection JSUnresolvedVariable
	const issueTypeName = event.issue_event_type_name
	// noinspection JSUnresolvedVariable
	const assigneeName = event.issue.fields.assignee.displayName
	const userName = event.user.displayName
	// noinspection JSUnresolvedVariable
	const key = event.issue.key
	// noinspection JSUnresolvedVariable
	const status = event.issue.fields.status.name
	switch (issueTypeName) {
		case 'issue_updated':
			return `${userName} changed status of (#${key}) on ${status}`
		case 'issue_assigned':
			return `${userName} assigned (#${key}) on @${assigneeName}`
		default:
			return "hmmm"
	}
}

const handleIssueDeleted = (event) => {
	const userName = event.user.displayName
	const key = event.issue.key
	const assigneeName = event.issue.fields.assignee.displayName
	if (assigneeName) {
		return `${userName} deleted issue (#${key}) that was assigned on @${assigneeName}`
	} else {
		return `${userName} deleted issue (#${key})`
	}
}

const handleCommentCreated = async (event) => {
	let comment = event.comment.body
        const matches = Array.from(comment.matchAll(/\[~accountid:(\w+)\]/g))
	for (const match of matches) {
		const mention = match[0]
		const userID = match[1]
		const user = await getUser(userID)
		comment = comment.replace(mention, '@'+user.displayName)
	}
	const userName = event.comment.author.displayName
	// noinspection JSUnresolvedVariable
	const key = event.issue.key
	return `${userName} left comment for issue(#${key})\n${comment}`
}

const handleCommentDeleted = async (event) => {
	let comment = event.comment.body
	 const matches = Array.from(comment.matchAll(/\[~accountid:(\w+)\]/g))
	for (const match of matches) {
		const mention = match[0]
		const userID = match[1]
		const user = await getUser(userID)
		comment = comment.replace(mention,'@' + user.displayName)
	}
	const key = event.issue.key
	return `comment ${comment} was deleted from (#${key})`
}

const getUser = async (userID) => {
	const url = `${baseURL}/user?accountId=${userID}`
	return await wrapper.getRequest(
		url,
		token
	)
}

export default { handleEvent, getUser }
