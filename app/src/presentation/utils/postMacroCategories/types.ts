import React from 'react'
import { SvgProps } from 'react-native-svg'

export interface MacroCategoryObject {
	label: string
	value: string
	SvgIcon: React.FC<SvgProps> // Pode ajustar conforme necessário
}

interface IncomeCategory {
	sale: MacroCategoryObject
	service: MacroCategoryObject
	vacancy: MacroCategoryObject
}

interface SocialImpactCategory {
	informative: MacroCategoryObject
	iniciative: MacroCategoryObject
	donation: MacroCategoryObject
}

interface CultureCategory {
	art: MacroCategoryObject
	event: MacroCategoryObject
	education: MacroCategoryObject
}

export type MacroCategoriesType = keyof IncomeCategory | keyof SocialImpactCategory | keyof CultureCategory
export type MacroCategories = IncomeCategory | SocialImpactCategory | CultureCategory

export interface PostMacroCategories {
	income: IncomeCategory
	socialImpact: SocialImpactCategory
	culture: CultureCategory
}
