export function resizeBase64(base64: string, maxWidth: number, maxHeight: number) {
	try {
		console.log(base64)
		// Max size for thumbnail
		if (typeof maxWidth === "undefined") maxWidth = 500
		if (typeof maxHeight === "undefined") maxHeight = 500

		// Create and initialize two canvas
		const canvas = document.createElement("canvas")
		const ctx = canvas.getContext("2d")
		const canvasCopy = document.createElement("canvas")
		const copyContext = canvasCopy.getContext("2d")

		// Create original image
		const img = new Image()
		img.src = base64

		// Determine new ratio based on max size
		let ratio = 1
		if (img.width > maxWidth) ratio = maxWidth / img.width
		else if (img.height > maxHeight) ratio = maxHeight / img.height

		// Draw original image in second canvas
		canvasCopy.width = img.width
		canvasCopy.height = img.height
		copyContext?.drawImage(img, 0, 0)

		// Copy and resize second canvas to first canvas
		canvas.width = img.width * ratio
		canvas.height = img.height * ratio
		ctx?.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height)

		return canvas.toDataURL()
	} catch {
		console.log("ha habido un problema resizing the image")
		return base64
	}
}
export function isBase64(str: string) {
	try {
		const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
		return base64regex.test(str.split(",")[1])
	} catch {
		return false
	}
}
