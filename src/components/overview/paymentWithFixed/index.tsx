import { Line } from 'react-chartjs-2'

export default function PaymentWithFixed(props) {

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
                data: props.data?.open.map(data => parseFloat(data.credit ?? 0) + parseFloat(props.data.fixed_credit[0] ?? 0)),
                borderColor: 'rgb(11, 106, 170)',
                backgroundColor: 'rgba(11, 106, 170, 0.5)',
            },
            {
                label: 'Debito com mensalidades',
                data: props.data?.open.map(data => parseFloat(data.debit ?? 0) + parseFloat(props.data.fixed_debit[0] ?? 0)),
                borderColor: 'rgb(184, 27, 27)',
                backgroundColor: 'rgba(184, 27, 27, 0.5)',
            },
        ],
    }

    return (
        <>
            <Line data={ data } options={ options } width={ 400 } height={ 200 } />
        </>
    )
}