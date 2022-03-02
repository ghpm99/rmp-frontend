import { Breadcrumb, Layout } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import LoadingPage from '../../../components/loadingPage/Index'
import LoginHeader from '../../../components/loginHeader/Index'
import MenuCollapsible from '../../../components/menu/Index'
import styles from './Overview.module.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useEffect } from 'react'
import { fetchAllPayment, fetchPaymentReport } from '../../../store/features/financial/Index'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Overview() {
  const financialStore = useSelector((state: RootState) => state.financial)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPayment({}))
    dispatch(fetchPaymentReport())
  }, [])

  const findLabelName = (date) => {
    const paymentDate = new Date(date)

    const month = paymentDate.getUTCMonth() + 1

    const labelName = `${month}/${paymentDate.getUTCFullYear()}`

    return labelName
  }

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
        text: 'Relatorio todos pagamentos abertos',
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

  const labels = []

  financialStore.payments.data.forEach((payment) => {

    const labelName = findLabelName(payment.payment_date)

    const index = labels.indexOf(labelName)

    if (index === -1) {
      labels.push(labelName)
    }
  })

  const dataCredit = labels.map(label => {
    const creditArray = financialStore.payments.data
      .filter(payment => payment.type === 0)
      .filter(payment => label === findLabelName(payment.payment_date))
      .map(payment => payment.value)

    let valueCredit = 0

    if (creditArray.length > 0) {
      valueCredit = creditArray.reduce((previous, current) => parseFloat(previous) + parseFloat(current))
    }

    return valueCredit

  })

  const dataDebit = labels.map(label => {
    const debitArray = financialStore.payments.data
      .filter(payment => payment.type === 1)
      .filter(payment => label === findLabelName(payment.payment_date))
      .map(payment => payment.value)

    let valueDebit = 0

    if (debitArray.length > 0) {
      valueDebit = debitArray.reduce((previous, current) => parseFloat(previous) + parseFloat(current))
    }

    return valueDebit

  })

  const dataDif = dataCredit.map((credit, index) => {
    const valueDebit = dataDebit[index]
    return credit - valueDebit
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Credito',
        data: dataCredit,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Debito',
        data: dataDebit,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Diferença',
        data: dataDif,
        borderColor: 'rgb(99, 255, 138)',
        backgroundColor: 'rgba(99, 255, 138, 0.5)',
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
            <Line data={ data } options={ options } width={ 400 } height={ 200 } />
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
