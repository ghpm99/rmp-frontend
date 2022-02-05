import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from '../store/features/media/Index'
import statusReducer from './features/status/Index'

export const store = configureStore({
	reducer: {
		media: mediaReducer,
		status: statusReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch