import axios from 'axios'


const apiRemote = axios.create({
	baseURL: '/api/remote/',
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
})

export async function sendCommandService(command){
    const response = await apiRemote.post('command', {'cmd': command})
    return response.data
}