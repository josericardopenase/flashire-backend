import { createSlice } from "@reduxjs/toolkit"

const global = createSlice({
	name: "processTree",
	initialState: {
		confetti: false,
	},

	reducers: {
		setConfetti: (state, action) => {
			state.confetti = action.payload
		},
	},
})

export const name = global.name
export const { setConfetti } = global.actions
export default global.reducer
