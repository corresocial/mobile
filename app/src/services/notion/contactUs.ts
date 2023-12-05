/* eslint-disable camelcase */
import uuid from 'react-uuid'

import { getEnvVars } from '@infrastructure/environment'

import { ContactUsOptions } from './types'

const { NOTION_FALECONOSCO_ID, NOTION_FALECONOSCO_KEY } = getEnvVars()

async function sendContactUsMessageToNotion({
	userId,
	type,
	title,
	message,
	reportTarged,
	reportedId
}: ContactUsOptions) {
	const getReportTitle = () => {
		if (title) return title
		if (message.length > 15) {
			return `${message.split(' ', 15).join(' ')}...`
		}
		return message
	}

	const getCustomMessage = () => {
		if (message.length >= 2000) {
			return `${message.substring(0, 1950)}...`
		}
		return message
	}

	const customTitle = getReportTitle()
	const customMessage = getCustomMessage()
	const reportId = uuid()

	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Notion-Version': '2022-02-22',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${NOTION_FALECONOSCO_KEY} `,
		},
		body: JSON.stringify({
			parent: { database_id: NOTION_FALECONOSCO_ID },
			properties: {
				ID: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: reportId || '---',
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
								content: customTitle || '---',
							},
						},
					],
				},
				description: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: customMessage || '---',
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
								content: userId || '---',
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
