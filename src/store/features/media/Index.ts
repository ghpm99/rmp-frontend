import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	fetchAllMediaService,
	fetchPlayingMediaService,
} from '../../../services/mediaService'
import { media, simpleMedia } from '../../../types/mediaTypes'

export interface MediaState {
	medias: media[]
	mediaPlaying: simpleMedia | undefined
	loading: boolean
}

const initialState: MediaState = {
	medias: [],
	mediaPlaying: undefined,
	loading: true,
}

export const fetchAllMedia = createAsyncThunk(
	'media/fetchAllMedia',
	async () => {
		const data = await fetchAllMediaService()
		return { data }
	}
)

export const fetchMediaPlaying = createAsyncThunk(
	'media/fetchMediaPlaying',
	async () => {
		const data = await fetchPlayingMediaService()
		return { data }
	}
)

export const mediaSlice = createSlice({
	name: 'media',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllMedia.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchAllMedia.fulfilled, (state, action) => {
				state.medias = action.payload.data.data
				state.loading = false
			})
			.addCase(fetchAllMedia.rejected, (state, action) => {
				state.loading = false
			})
			.addCase(fetchMediaPlaying.fulfilled, (state, action) => {
				state.mediaPlaying = action.payload.data
			})
	},
})

export default mediaSlice.reducer
