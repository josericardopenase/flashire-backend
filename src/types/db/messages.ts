export interface Message {
	author?: string
	body: string
	href?: string
	type?: "image" | "text"
	timestamp: number
	reverse_timestamp: number
	readed_by: Record<string, string>
	imageIndex?: number
	id: string
}

export interface Chat {
	last: Message
	messages: Message[]
	name: string
	id: string
}
