import axios from 'axios';

const apiFinancial = axios.create({
    baseURL: '/api/financial/'
})

export async function fecthAllPaymentService(){
    const response = await apiFinancial.get('/')
    return response.data
}

export async function saveNewPaymentService(data){
    const response = await apiFinancial.post('/', data)
    return response.data
}