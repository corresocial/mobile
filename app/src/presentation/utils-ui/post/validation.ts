import { differenceInDays } from 'date-fns'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

export function isRecentPost(date: Date) {
	if (!date) return false

	try {
		const currentDate = new Date()
		const postDate = getNewDate(date)

		if (Math.abs(differenceInDays(currentDate, postDate)) <= 1) {
			return true
		}
		return false
	} catch (error) {
		console.log(error)
		return false
	}
}
