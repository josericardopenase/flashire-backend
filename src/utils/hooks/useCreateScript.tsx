import { useEffect } from "react"

const useCreateScript = (fun: string) => {
	useEffect(() => {
		const script = document.createElement("script")
		script.innerHTML = fun.toString()
		script.defer = true
		script.type = "text/javascript"

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [fun])
}

export default useCreateScript
