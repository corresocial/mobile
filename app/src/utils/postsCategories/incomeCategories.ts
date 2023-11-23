import { saleCategories } from './saleCategories'
import { serviceCategories } from './serviceCategories'
import { vacancyCategories } from './vacancyCategories'

const incomeCategories = {
	...saleCategories,
	...serviceCategories,
	...vacancyCategories
}

export { incomeCategories }
