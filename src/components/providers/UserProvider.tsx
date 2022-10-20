import React from "react"
import CenterLoader from "@components/other/CenterLoader"
import { logOut, setCompany, setUser } from "@storage/reducer/auth.reducer"
import { useDispatch } from "react-redux"
import api from "@davinci/clients/apiClient"
import { useQuery } from "react-query"

export default function UserProvider({ children }: { children: JSX.Element }) {
	const dispatch = useDispatch()

	const { status } = useQuery(
		["me"],
		async () => {
			const response = await api.get("/users/me/")
			if (!response.ok) throw response.data
			return response.data
		},
		{
			retry: false,
			onError: () => {
				dispatch(logOut({}))
			},
			onSuccess: (data: any) => {
				dispatch(setUser(data))
			},
		}
	)

	const company = useQuery(
		["me", "company"],
		async () => {
			const response = await api.get("/users/me/company/")
			if (!response.ok) throw response.data
			return response.data
		},
		{
			enabled: status === "success",
			retry: false,
			onError: () => {
				dispatch(logOut({}))
			},
			onSuccess: (data: any) => {
				dispatch(setCompany(data))
			},
		}
	)

	if (status == "loading") return <CenterLoader></CenterLoader>

	return children
}
