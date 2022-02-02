import axios from 'axios';

const apiYoutube = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL + '/web/youtube/'
})

export async function changeScreenYoutube(){
	const response = await apiYoutube.post('change-screen')
	return response.data
}