import { pagination } from '../types/commonTypes'
import { media } from '../types/mediaTypes'

const url = process.env.REACT_API_HOST + '/media/'

interface allMediaRequest extends pagination {
	data: media[]
}

export async function fetchAllMediaService() {
	const response = await fetch(`${url}get-media/`)
	const data = (await response.json()) as allMediaRequest
	return data
}