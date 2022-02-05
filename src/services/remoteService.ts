import axios from 'axios'

const apiRemote = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL + '/remote/'
})

export async function sendCommandService(command){
    const response = await apiRemote.post('send-command', {'cmd': command})
    return response.data
}