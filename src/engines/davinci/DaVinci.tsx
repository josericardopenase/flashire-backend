import { useInfiniteQuery, useMutation, useQuery } from "react-query"
import apiClient from "./clients/apiClient"
import { listApiResponse } from "./types/apitypes"

export const $iQuery = useInfiniteQuery
export const $query = useQuery
export const $mutation = useMutation

export const createQuery = <Type,>(name: string, url: string) => {
	return (filters: any) => {
		const apiFunction = async () => {
			const response = await apiClient.get<any>(url, filters)

			if (response.ok) return response.data

			return response.data
		}

		return useQuery<listApiResponse<Type>, Error>([name, filters], apiFunction)
	}
}

export const createInfiniteQuery = <Type,>(name: string, url: string) => {
	return (filters: any) => {
		const apiFunction = async () => {
			const response = await apiClient.get<any>(url, filters)

			if (response.ok) return response.data

			return response.data
		}

		return useInfiniteQuery<listApiResponse<Type>, Error>([name, filters], apiFunction)
	}
}
