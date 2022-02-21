import axios from 'axios'
import { getSession } from 'next-auth/react'

const apiFinancial = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL + '/financial',
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
})

export default async (req, res) => {
	const session = await getSession({ req })

	if (req.method === 'GET') {
		const response = await apiFinancial.get('/', {
			headers: {
				Authorization: `Basic ${session.accessToken}`,
			},
		})
		res.status(response.status).send(response.data)
		res.end()
	} else if (req.method === 'POST') {
		const response = await apiFinancial.post('/new-payment', req.body, {
			headers: {
				Authorization: `Basic ${session.accessToken}`,
			},
		})
		res.status(response.status).send(response.data)
		res.end()
	}
}
