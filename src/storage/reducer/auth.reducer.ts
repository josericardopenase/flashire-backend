import { createSlice } from "@reduxjs/toolkit"
import useAppSelector from "@storage/hooks/useAppSelector"
import { removeLocalToken, setLocalToken } from "@utils/localStorage/auth.storage"
import { Company } from "@wowtypes/db/company"
import { User } from "@wowtypes/db/users"

const global = createSlice({
	name: "auth",
	initialState: {
		token: null,
		user: null as User | null,
		company: null as Company | null,
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload
			setLocalToken(action.payload)
		},
		setCompany: (state, action) => {
			state.company = action.payload
		},
		logOut: (state, action) => {
			state.token = null
			state.user = null
			removeLocalToken()
		},
		setUser: (state, action) => {
			state.user = action.payload
		},
	},
})

export const useMe = () => useAppSelector((state) => state.auth.user)
export const useCompany = () => useAppSelector((state) => state.auth.company)
export const name = global.name
export const { setToken, setUser, logOut, setCompany } = global.actions
export default global.reducer
