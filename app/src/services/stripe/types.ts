export type StripeProducts = {
	cityMonthly: StripeProduct,
	cityYearly: StripeProduct,
	countryMonthly: StripeProduct,
	countryYearly: StripeProduct
}

export type StripeProduct = {
	id: string
	name: string
	price: string
	priceId: string
}

export type CustomerData = {
	name?: string
	description?: string
	phone?: string
	email?: string
	address?: {}
	payment_method?: any
}
