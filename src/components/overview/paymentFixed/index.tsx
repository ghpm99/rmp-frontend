import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function PaymentFixed(props) {

    const labels = ['Ativo']

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Relatorio pagamentos mensais',
          },
        },
      }

      const data = {
        labels,
        datasets: [
          {
            label: 'Credito',
            data: props.fixedCredit,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Debito',
            data: props.fixedDebit,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }

    return(
        <>
        <Bar data={ data } options={ options } width={ 400 } height={ 200 } />
        </>
    )
}