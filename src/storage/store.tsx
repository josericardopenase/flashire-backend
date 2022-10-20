import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import api from "./middleware/api"
import reducer from "./reducer"

const store = configureStore({
	reducer,
	middleware: [api, ...getDefaultMiddleware()],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
