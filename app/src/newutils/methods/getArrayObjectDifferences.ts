import { SocialMedia } from '@domain/user/entity/types'

function getArrayObjectDifferences(firstArray: SocialMedia[], secondArray: SocialMedia[]): SocialMedia[] {
	return secondArray.filter((item) => {
		return !firstArray.some((firstItem) => firstItem.title === item.title && firstItem.link === item.link)
	})
}

export { getArrayObjectDifferences }
