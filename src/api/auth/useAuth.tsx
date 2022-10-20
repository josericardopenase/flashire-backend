import api from "@davinci/clients/apiClient"
import { useMutation } from "react-query"

const useAuth = (onSuccess: any) =>
	useMutation(
		async (user: { username: string; password: string }) => {
			const response = await api.post("/users/auth/", user)
			if (!response?.ok) throw response.data
			return response.data
		},
		{
			onSuccess: onSuccess,
		}
	)
export default useAuth
