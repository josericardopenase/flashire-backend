export const ProductTypes: Record<string, string> = {
	online_course: "Curso Online",
	subscription: "Subscripción",
	online_event: "Evento online",
}

export const ProductLinkTypes: Record<string, string> = {
	cash: "Al contado",
	fractionated: "Fraccionado",
	recurrent: "Recurrente",
}

export interface ProductLink {
	id: number
	name: string
	slug: string
	product: number
	price: number
	taxes: number
	taxes_include: boolean
	signal: number
	quotes: number
	recurrence: number
	link_type: "cash" | "fractionated" | "recurrent"
	main: boolean
	interest: number
	discount: number
	discount_type: "absolute" | "ratio"
}

export interface Product {
	id: number
	product_type: string
	thumbnail: string
	image: string
	name: string
	description: string
	active: boolean
	brand: number
	warranty: number
}

export interface ProductCategorie {
	id: number
	name: string
	color: string
	icon: string
}
