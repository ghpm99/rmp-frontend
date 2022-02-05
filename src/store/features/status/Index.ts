import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cpu: 0,
	memory: 0,
}

export const mediaSlice = createSlice({
	name: 'media',
	initialState,
	reducers: {
		setCpuAndMemoryValue: (state, action) => {
			state.cpu = action.payload.cpu
			state.memory = action.payload.memory
		},
	},
})

export const {setCpuAndMemoryValue} = mediaSlice.actions

export default mediaSlice.reducer
