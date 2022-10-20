import { Axios } from "axios"

const api = new Axios({
	baseURL: "http://0.0.0.0:8000/v1",
	headers: {
		Accept: "application/json",
	},
})

export default api
