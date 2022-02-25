import { Breadcrumb, Layout } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import LoadingPage from '../../../components/loadingPage/Index'
import LoginHeader from '../../../components/loginHeader/Index'
import MenuCollapsible from '../../../components/menu/Index'
import styles from './Overview.module.css'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export default function Overview() {

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
            text: 'Chart.js Line Chart - Multi Axis',
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => 184),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => 546),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
          },
        ],
      };

    return (
        <Layout className={ styles.container }>
            <MenuCollapsible selected={ ['sub2', 'overview'] } />
            <Layout>
                <Header className={ styles.header } >
                    <LoginHeader />
                </Header>
                <Content>
                    <Breadcrumb className={ styles.breadcrumb }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Financeiro</Breadcrumb.Item>
                        <Breadcrumb.Item>Overview</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout>
                        <Line
                            data={data}
                            options={options}
                            width={ 400 }
                            height={ 200 }
                        />
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    )
}

Overview.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: "/login",
}