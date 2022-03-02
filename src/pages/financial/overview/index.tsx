import { Breadcrumb, Layout } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from '../../../components/loadingPage/Index'
import LoginHeader from '../../../components/loginHeader/Index'
import MenuCollapsible from '../../../components/menu/Index'
import { fetchPaymentReport } from '../../../store/features/financial/Index'
import { RootState } from '../../../store/store'
import styles from './Overview.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

function Overview() {
  const financialStore = useSelector((state: RootState) => state.financial.paymentReport)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPaymentReport())
  }, [])

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
        text: 'Relatorio pagamentos abertos sem mensalidades',
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
    labels: financialStore.data.map(data => data.label),
    datasets: [
      {
        label: 'Credito',
        data: financialStore.data.map(data => data.credit),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Debito',
        data: financialStore.data.map(data => data.debit),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  }

  const optionsFixed = {
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

  const labels = ['Ativo']

  const fixedCreditData = parseFloat(financialStore.data.map(data => {
    if (data.fixed_credit) {
      return parseFloat(data.fixed_credit)
    } else {
      return 0
    }
  }).reduce(((accum, curr) => accum + curr), 0).toFixed(2))

  const fixedDebitData = parseFloat(financialStore.data.map(data => {
    if (data.fixed_debit) {
      return parseFloat(data.fixed_debit)
    } else {
      return 0
    }
  }).reduce(((accum, curr) => accum + curr), 0).toFixed(2))

  const dataFixed = {
    labels,
    datasets: [
      {
        label: 'Credito',
        data: [fixedCreditData],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Debito',
        data: [fixedDebitData],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const optionsAll = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Relatorio todos pagamentos com mensalidades',
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

  const valueCreditWithFixed = financialStore.data.map(data => {
    if (data.credit) {
      return parseFloat(data.credit) + fixedCreditData
    } else {
      return fixedCreditData
    }
  })

  const valueDebitWithFixed = financialStore.data.map(data => {
    if (data.debit) {
      return parseFloat(data.debit) + fixedDebitData
    } else {
      return fixedDebitData
    }
  })

  const valueDifWithFixed = valueCreditWithFixed.map((credit, index) => credit - valueDebitWithFixed[index] )

  const dataAll = {
    labels: financialStore.data.map(data => data.label),
    datasets: [
      {
        label: 'Credito',
        data: valueCreditWithFixed,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Debito',
        data: valueDebitWithFixed,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Diferença',
        data: valueDifWithFixed,
        borderColor: 'rgb(99, 255, 151)',
        backgroundColor: 'rgba(99, 255, 151, 0.5)',
      }
    ],
  }

  return (
    <Layout className={ styles.container }>
      <MenuCollapsible selected={ ['sub2', 'overview'] } />
      <Layout>
        <Header className={ styles.header }>
          <LoginHeader />
        </Header>
        <Content>
          <Breadcrumb className={ styles.breadcrumb }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Financeiro</Breadcrumb.Item>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
          </Breadcrumb>
          <Layout>
            <Line data={ dataAll } options={ optionsAll } width={ 400 } height={ 200 } />
            <Line data={ data } options={ options } width={ 400 } height={ 200 } />
            <Bar data={ dataFixed } options={ optionsFixed } width={ 400 } height={ 200 } />
          </Layout>
        </Content>
      </Layout>
    </Layout>
  )
}

Overview.auth = {
  role: 'admin',
  loading: <LoadingPage />,
  unauthorized: '/login',
}

export default Overview
