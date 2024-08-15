import { IncomeCategories } from '@domain/post/entity/types'

import { saleCategories } from './saleCategories'
import { serviceCategories } from './serviceCategories'
import { vacancyCategories } from './vacancyCategories'

export const updateIncomeCategories = (category: IncomeCategories, tag: string) => {
	incomeCategories[category].tags = [...incomeCategories[category].tags, tag]
}

const incomeCategories = {
	...saleCategories,
	...serviceCategories,
	...vacancyCategories
}

export { incomeCategories }
