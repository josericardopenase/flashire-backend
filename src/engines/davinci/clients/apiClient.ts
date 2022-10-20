import store from "@storage/store"
import apisauce from "apisauce"
import { apiUrl } from "../../../utils/constants/api.constants"

const api = apisauce.create({
	baseURL: apiUrl,
})

api.addAsyncRequestTransform(async (request) => {
	const token = store.getState().auth.token
	if (token) request.headers["Authorization"] = "Token " + token
})

export default api
