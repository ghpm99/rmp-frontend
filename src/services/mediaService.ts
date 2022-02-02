import axios from 'axios'
import { pagination } from '../types/commonTypes'
import { media } from '../types/mediaTypes'

const apiMedia = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL + '/media/'
})

interface allMediaRequest extends pagination {
	data: media[]
}

export async function fetchAllMediaService() {
	const response = await apiMedia.get(`get-media`)
	const data = (await response.data) as allMediaRequest
	return data
}

interface playingMediaResponse {
	id: number,
	name: string
}

export async function fetchPlayingMediaService() {
	const response = await apiMedia.get(`get-media-playing`)
	const data = (await response.data) as playingMediaResponse
	return data
}