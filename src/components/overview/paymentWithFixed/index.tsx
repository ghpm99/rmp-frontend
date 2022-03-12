import { Line } from 'react-chartjs-2'

export default function PaymentWithFixed(props) {

    const allPayments = []

    const paymentsWithFixed = props.data?.open.map(data => ({
        ...data,
        credit: parseFloat(data.credit ?? 0) + parseFloat(props.data.fixed_credit[0] ?? 0),
        debit: parseFloat(data.debit ?? 0) + parseFloat(props.data.fixed_debit[0] ?? 0)
    }))


    props.data.open.forEach(payment => {

        const duplicatePayments = props.data.closed.filter(allPayment => allPayment.label === payment.label)
        console.log('duplicatePayments', duplicatePayments)
        if (duplicatePayments.length > 0) {
            const totalDebitDuplicate = duplicatePayments.reduce((previous, current) => {
                const newPayment = {
                    ...previous,
                    debit: parseFloat(previous.debit ?? 0) + parseFloat(current.debit ?? 0),
                    credit: parseFloat(previous.credit ?? 0) + parseFloat(current.credit ?? 0)
                }
                return newPayment
            })
            console.log('totalDebitDuplicate', totalDebitDuplicate)
            const newPayment = {
                ...payment,
                debit: parseFloat(payment.debit ?? 0) + parseFloat(totalDebitDuplicate.debit ?? 0),
                credit: parseFloat(payment.credit ?? 0) + parseFloat(totalDebitDuplicate.credit?? 0)
            }
            console.log('newPayment', newPayment)
            allPayments.push(newPayment)
        } else {
            allPayments.push(payment)
        }
    })

    console.log('allPayments', allPayments)

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Relatorio pagamentos',
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            }
        },
    }

    const data = {
        labels: props.data?.open.map(data => data.label),
        datasets: [
            {
                label: 'Credito',
                data: props.data?.open.map(data => data.credit),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Debito',
                data: props.data?.open.map(data => data.debit),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Credito com mensalidades',
                data: paymentsWithFixed.map(data => data.credit),
                borderColor: 'rgb(11, 106, 170)',
                backgroundColor: 'rgba(11, 106, 170, 0.5)',
            },
            {
                label: 'Debito com mensalidades',
                data: paymentsWithFixed.map(data => data.debit),
                borderColor: 'rgb(184, 27, 27)',
                backgroundColor: 'rgba(184, 27, 27, 0.5)',
            },
            {
                label: 'Todos creditos',
                data: allPayments.map(data => data.credit),
                borderColor: 'rgb(0, 47, 78)',
                backgroundColor: 'rgba(0, 47, 78, 0.5)',
            },
            {
                label: 'Todos debitos',
                data: allPayments.map(data => data.debit),
                borderColor: 'rgb(94, 0, 0)',
                backgroundColor: 'rgba(94, 0, 0, 0.5)',
            },
        ],
    }

    return (
        <>
            <Line data={ data } options={ options } width={ 400 } height={ 200 } />
        </>
    )
}