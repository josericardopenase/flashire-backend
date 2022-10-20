import { combineReducers } from "redux"
import authReducer from "./reducer/auth.reducer"
import globalReducer from "./reducer/global.reducer"

export default combineReducers({
	global: globalReducer,
	auth: authReducer,
})
