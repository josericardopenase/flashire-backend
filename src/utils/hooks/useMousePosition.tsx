import { useEffect, useState } from "react"

export default function useMousePosition(id?: string) {
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

	function moveMouse(e: MouseEvent) {
		setMousePosition({ x: e.pageX, y: e.pageY })
	}

	function positionRelativeContainer(e: any) {
		const rect = e.target.getBoundingClientRect()
		setMousePosition({ x: e.clientX - rect.left, y: e.pageY - rect.top })
	}
	useEffect(() => {
		if (id) {
			document?.getElementById(id)?.addEventListener("mousemove", positionRelativeContainer)
		} else {
			window.addEventListener("mousemove", moveMouse)
		}

		return () => {
			window.removeEventListener("mousemove", moveMouse)
		}
	}, [])

	return mousePosition
}
