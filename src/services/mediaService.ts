import { pagination } from '../types/commonTypes'
import { media } from '../types/mediaTypes'

const url = process.env.NEXT_PUBLIC_API_URL + '/media/'

interface allMediaRequest extends pagination {
	data: media[]
}

export async function fetchAllMediaService() {
	const response = await fetch(`${url}get-media`)
	const data = (await response.json()) as allMediaRequest
	return data
}

interface playingMediaResponse {
	id: number,
	name: string
}

export async function fetchPlayingMediaService() {
	const response = await fetch(`${url}get-media-playing`)
	const data = (await response.json()) as playingMediaResponse
	return data
}