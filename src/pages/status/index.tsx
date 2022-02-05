
import { Breadcrumb, Layout, Progress, Typography } from 'antd';
import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuCollapsible from '../../components/menu/Index';
import { setCpuAndMemoryValue } from '../../store/features/status/Index';
import { RootState } from '../../store/store';


const { Header, Content } = Layout;
const { Title } = Typography;



function StatusPage(props) {


	const statusStore = useSelector((state: RootState) => state.status)
	const dispatch = useDispatch()

	useEffect(() => {
		const pusher = new Pusher(props.pusher_key, {
			cluster: props.pusher_cluster
		})
		const channel = pusher.subscribe('krill')
		channel.bind('status', (data) => {
			const usedMemory = (100 - data.memory).toFixed(1)
			dispatch(setCpuAndMemoryValue({
				cpu: data.cpu,
				memory: usedMemory
			}))
		})
	}, [])


	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={ ['8'] } />
			<Layout>
				<Header style={ { padding: 0 } } />
				<Content>
					<Breadcrumb style={ { margin: '16px 16px' } }>
						<Breadcrumb.Item>RMP</Breadcrumb.Item>
						<Breadcrumb.Item>Status</Breadcrumb.Item>
					</Breadcrumb>
					<div style={ { display: 'flex', margin: '16px 16px' } }>
						<div style={ {
							margin: '16px 16px',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column'
						} }>
							<Title level={ 2 }>Uso de CPU</Title>
							<Progress
								type="circle"
								strokeColor={ {
									'0%': '#108ee9',
									'100%': '#ff0000',
								} }
								percent={ statusStore.cpu }
							/>
						</div>
						<div style={ {
							margin: '16px 16px',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column'
						} }>
							<Title level={ 2 }>Uso de Memoria</Title>
							<Progress
								type="circle"
								strokeColor={ {
									'0%': '#108ee9',
									'100%': '#ff0000',
								} }
								percent={ statusStore.memory }
							/>
						</div>
					</div>
				</Content>
			</Layout>
		</Layout>

	)
}

export async function getServerSideProps() {
	const props = {
		pusher_appId: process.env.PUSHER_APP_ID,
		pusher_key: process.env.PUSHER_KEY,
		pusher_secret: process.env.PUSHER_SECRET,
		pusher_cluster: process.env.PUSHER_CLUSTER
	}
	return { props }
}

export default StatusPage