import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllMediaService } from '../../../services/mediaService'
import { media } from '../../../types/mediaTypes'

export interface MediaState {
	medias: media[],
	loading: boolean
}

const initialState : MediaState = {
	medias: [],
	loading: true
}

export const fetchAllMedia = createAsyncThunk(
	'media/fetchAllMedia',
	async () => {
		const data = await fetchAllMediaService()
		return {data}
	}
)

export const mediaSlice = createSlice({
	name: 'media',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllMedia.pending, (state) =>{
			state.loading = true
		})
		.addCase(fetchAllMedia.fulfilled, (state, action) => {
			state.medias = action.payload.data.data
		})

	}
})

export default mediaSlice.reducer