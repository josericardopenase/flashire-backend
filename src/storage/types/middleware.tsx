interface apiPopUp {
	title: string
	message: string
}

export interface apiCallAction {
	url: string
	method: "get" | "post" | "patch" | "put" | "delete"
	data?: unknown
	onSuccess?: string
	onError?: string
	onBegin?: string
	payload?: unknown
	popUpOnSuccess?: apiPopUp
	payloadData?: unknown
}
