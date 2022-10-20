import React from "react"
import CenterLoader from "@components/other/CenterLoader"
import { setToken } from "@storage/reducer/auth.reducer"
import { getLocalToken } from "@utils/localStorage/auth.storage"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function AuthProvider({ children }: { children: JSX.Element }) {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = getLocalToken()
		if (token) {
			dispatch(setToken(token))
		}
		setLoading(false)
	}, [])

	if (loading) return <CenterLoader></CenterLoader>

	return children
}
