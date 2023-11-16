import React from 'react'
import { SvgProps } from 'react-native-svg'

interface Category {
	label: string;
	value: string;
	SvgIcon: React.FC<SvgProps>; // Pode ajustar conforme necessário
}

interface IncomeCategory {
	sale: Category;
	service: Category;
	vacancy: Category;
}

interface SocialImpactCategory {
	informative: Category;
	iniciative: Category;
	donation: Category;
}

interface CultureCategory {
	art: Category;
	event: Category;
	education: Category;
}

export interface PostMacroCategories {
	income: IncomeCategory;
	socialImpact: SocialImpactCategory;
	culture: CultureCategory;
}
