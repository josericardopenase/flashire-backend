export function truncateText(str: string, length: number) {
	return str.length > length ? str.slice(0, length) + "..." : str
}

export function toFirstUpperCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function makeid(length: number) {
	let result = ""
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}
