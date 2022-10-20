import { useEffect } from "react"

const defaultScripts: Record<string, string> = {
	paycomet: "https://api.paycomet.com/gateway/paycomet.jetiframe.js",
}

export default function useLoadScript(scriptName: string) {
	useEffect(() => {
		let scriptToLoad = scriptName

		if (scriptName in defaultScripts) scriptToLoad = defaultScripts[scriptName]

		const script = document.createElement("script")

		script.src = scriptToLoad
		script.async = true

		document.body.appendChild(script)
	}, [])
}
