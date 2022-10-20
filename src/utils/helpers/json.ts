export function downloadJsonAsFile(content: JSON, fileName: string): void {
	const a = document.createElement("a")
	const file = new Blob([JSON.stringify(content)], { type: "text/plain" })
	a.href = URL.createObjectURL(file)
	a.download = fileName
	a.click()
}

export function downloadBase64AsFile(base64: string): void {
	const w: any = window.open("about:blank")
	const obj: any = w?.document.createElement("iframe")
	obj.style.width = "100%"
	obj.style.height = "100vh"
	w.document.body.appendChild(obj).src = base64
}
