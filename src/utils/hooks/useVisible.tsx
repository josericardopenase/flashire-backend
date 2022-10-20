import { useState, useRef, useEffect } from "react"

function useVisible(initialIsVisible = false) {
	const [isVisible, setIsVisible] = useState(initialIsVisible)
	const ref = useRef<HTMLObjectElement>(null)
	const closeRef = useRef<HTMLObjectElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current !== null) {
			if (closeRef.current !== null) {
				if (ref.current && !ref.current.contains(event.target) && closeRef.current && !closeRef.current.contains(event.target)) {
					setIsVisible(false)
				}
			} else {
				if (ref.current && !ref.current.contains(event.target)) {
					setIsVisible(false)
				}
			}
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)

		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [])

	return { ref, closeRef, isVisible, setIsVisible }
}

export default useVisible
