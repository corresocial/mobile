/* eslint-disable camelcase */
import { NOTION_FALECONOSCO_ID, NOTION_FALECONOSCO_KEY } from '@env'
import uuid from 'react-uuid'
import { ContactUsOptions } from './types'

async function sendContactUsMessageToNotion({
	userId,
	type,
	message
}: ContactUsOptions) {
	const getReportTitle = () => {
		if (message.length > 10) {
			return `${message.split(' ', 10).join(' ')}...`
		}
		return message
	}

	const title = getReportTitle()
	const reportId = uuid()
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Notion-Version': '2022-02-22',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${NOTION_FALECONOSCO_KEY}`,
		},
		body: JSON.stringify({
			parent: { database_id: NOTION_FALECONOSCO_ID },
			properties: {
				type: {
					select: {
						name: type,
					},
				},
				title: {
					title: [
						{
							type: 'text',
							text: {
								content: title,
							},
						},
					],
				},
				description: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: message,
							},
						},
					],
				},
				status: {
					select: {
						name: 'not started',
					},
				},
				reportedID: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: reportId,
							},
						},
					],
				},
				senderID: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: userId,
							},
						},
					],
				},
				created: {
					date: {
						start: new Date(),
					},
				},
			},
		}),
	}

	const result = await fetch('https://api.notion.com/v1/pages', options)
		.then((response) => response.json())
		.then((json) => {
			return json
		})
		.catch((err) => {
			console.log(err)
			throw new Error(err)
		})

	return { ...result, reportId }
}

export { sendContactUsMessageToNotion }
