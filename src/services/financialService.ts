import axios from 'axios';

const apiFinancial = axios.create({
    baseURL: '/api/financial/'
})

export async function fecthAllPaymentService(filters?){
    const response = await apiFinancial.get('/',{
        params: filters,
    })
    return response.data
}

export async function saveNewPaymentService(data){
    const response = await apiFinancial.post('/', data)
    return response.data
}