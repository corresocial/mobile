/* eslint-disable camelcase */
import { NOTION_FALECONOSCO_ID, NOTION_FALECONOSCO_KEY } from '@env'
import { ContactUsOptions } from './types'

async function sendContactUsMessage({
	userId,
	title,
	message,
	tag
}: ContactUsOptions) {
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
				type: {
					select: {
						name: tag,
					},
				},
				status: {
					select: {
						name: 'not started',
					},
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
		.then((json) => json)
		.catch((err) => err)

	console.log(result)

	return result
}

export { sendContactUsMessage }
