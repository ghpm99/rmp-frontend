import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	fetchAllPaymentService,
	fetchDetailPaymentService,
	saveNewPaymentService,
} from '../../../services/financialService'

const initialState = {
	payments: {
		data: [],
		loading: true,
	},
	paymentDetail: {
		data: undefined,
		loading: true,
	},
	modal: {
		newPayment: {
			visible: false,
			error: false,
			errorMsg: '',
		},
		modalFilters: {
			visible: false,
		},
	},
}

export const fetchAllPayment = createAsyncThunk(
	'financial/fetchAllPayment',
	async (filters?: financialFilter) => {
		const response = await fetchAllPaymentService(filters)
		return response
	}
)

export const fetchPaymentDetails = createAsyncThunk(
	'financial/fetchPaymentDetails',
	async (id: number) => {
		const response = await fetchDetailPaymentService(id)
		return response
	}
)

export const saveNewPayment = createAsyncThunk(
	'financial/saveNewPayment',
	async (args: { payment }) => {
		await saveNewPaymentService(args.payment)
		return args.payment
	}
)

export const financialSlice = createSlice({
	name: 'financial',
	initialState,
	reducers: {
		changeVisibleModal: (state, action) => {
			state.modal[action.payload.modal].visible = action.payload.visible
		},
		changeNamePaymentDetails: (state, action) => {
			state.paymentDetail.data.name = action.payload
		},
		changeTypePaymentDetails: (state, action) => {
			state.paymentDetail.data.type = action.payload
		},
		changeFixedPaymentDetails: (state, action) => {
			state.paymentDetail.data.fixed = action.payload
		},
		changeActivePaymentDetails: (state, action) => {
			state.paymentDetail.data.active = action.payload
		},
		changePaymentDatePaymentDetails: (state, action) => {
			state.paymentDetail.data.payment_date = action.payload
		},
		changeValuePaymentDetails: (state, action) => {
			state.paymentDetail.data.value = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPayment.pending, (state) => {
				state.payments.loading = true
			})
			.addCase(fetchAllPayment.fulfilled, (state, action) => {
				state.payments.data = action.payload.data
				state.payments.loading = false
			})
			.addCase(saveNewPayment.fulfilled, (state, action) => {
				state.payments.data.push(action.payload)
			})
			.addCase(fetchPaymentDetails.pending, (state) => {
				state.paymentDetail.loading = true
			})
			.addCase(fetchPaymentDetails.fulfilled, (state, action) => {
				state.paymentDetail.data = action.payload.data
				state.paymentDetail.loading = false
			})
	},
})

export const {
	changeVisibleModal,
	changeNamePaymentDetails,
	changeTypePaymentDetails,
	changeFixedPaymentDetails,
	changeActivePaymentDetails,
	changePaymentDatePaymentDetails,
	changeValuePaymentDetails
} = financialSlice.actions

export default financialSlice.reducer
