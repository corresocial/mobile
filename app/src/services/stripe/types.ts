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
