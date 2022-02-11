import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './features/status/Index'
import commonReducer from './features/common/Index'

export const store = configureStore({
	reducer: {
		status: statusReducer,
		common: commonReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch