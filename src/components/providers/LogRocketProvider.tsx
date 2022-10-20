import { useEffect } from "react"
export default function LogRocketProvider({ children }: { children: JSX.Element }) {
	useEffect(() => {
		//LogRocket.init("dir7zq/socialwow-leo")
	}, [])

	return children
}
