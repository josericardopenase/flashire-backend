export interface Release {
	id: number
	title: string
	funnel: number
	init_date: string
	end_date: string
	is_evergreen: boolean
}

export interface Campaign {
	id: number
	name?: string
	release?: number
}

export interface List {
	id: number
	name: number
	release: number
	list_type: "customer" | "scheduled" | "registered"
}
