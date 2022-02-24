import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	fecthAllPaymentService,
	saveNewPaymentService,
} from '../../../services/financialService'

const initialState = {
	payments: {
		data: [],
		loading: true,
	},
	modal: {
		newPayment: {
			visible: false,
			error: false,
			errorMsg: '',
		},
		modalFilters: {
			visible: false
		}
	},
}

export const fecthAllPayment = createAsyncThunk(
	'financial/fecthAllPayment',
	async () => {
		const response = await fecthAllPaymentService()
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fecthAllPayment.pending, (state) => {
				state.payments.loading = true
			})
			.addCase(fecthAllPayment.fulfilled, (state, action) => {
				state.payments.data = action.payload.data
				state.payments.loading = false
			})
			.addCase(saveNewPayment.fulfilled, (state, action) => {
				state.payments.data.push(action.payload)
			})
	},
})

export const { changeVisibleModal } = financialSlice.actions

export default financialSlice.reducer
