/* eslint-disable camelcase */
import { NOTION_APPICONS_ID, NOTION_APPICONS_KEY } from '@env'
import axios from 'axios'

async function getCatalogIcons() {
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Notion-Version': '2022-02-22',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${NOTION_APPICONS_KEY}`,
		},
		data: {

		}
	}

	return axios(`https://api.notion.com/v1/databases/${NOTION_APPICONS_ID}/query`, options)
		.then((res) => {
			const files = res.data.results.map((row: any) => {
				if (!row.properties.Finalizado.files.length || !row.properties.slug.rich_text.length) {
					return false
				}

				return {
					iconSlug: row.properties.slug.rich_text[0].text.content || '',
					iconUri: row.properties.Finalizado.files[0].file.url,
					expiryTime: new Date(row.properties.Finalizado.files[0].file.expiry_time).getTime()
				}
			})
			return files.filter((file: any) => file)
		})
		.catch((err) => {
			console.log(err)
			throw new Error(err)
		})
}

export { getCatalogIcons }
