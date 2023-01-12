/* eslint-disable camelcase */
import { NOTION_FALECONOSCO_ID, NOTION_FALECONOSCO_KEY } from '@env'
import uuid from 'react-uuid'
import { ContactUsOptions } from './types'

async function sendContactUsMessageToNotion({
	userId,
	type,
	message,
	reportTarged,
	reportedId
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
				ID: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: reportId,
							},
						},
					],
				},
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
				image: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: '---',
							},
						},
					],
				},
				reportedTarget: {
					select: {
						name: reportTarged || 'none',
					},
				},
				reportedId: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: reportedId || '---',
							},
						},
					],
				},
				senderId: {
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
				status: {
					select: {
						name: 'not started',
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
