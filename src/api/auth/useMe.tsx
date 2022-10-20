import api from "@davinci/clients/apiClient"
import { useQuery } from "react-query"

const useMe = () =>
	useQuery(
		"user",
		async () => {
			const response = await api.get("user/me")
			if (response.ok) return response.data
			throw response.data
		},
		{
			cacheTime: 12000,
		}
	)

export default useMe
