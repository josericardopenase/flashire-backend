import { useQuery } from "react-query"
import api from "../client"

const useDgtMetrics = () =>
	useQuery(
		["metrics"],
		async () => {
			const response = await api.get("/metrics/dgt/")
			return JSON.parse(response.data)
		},
		{ retry: false }
	)
export default useDgtMetrics
