
import { Breadcrumb, Button, Layout, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuCollapsible from '../../components/menu/Index';
import { fetchAllMedia, fetchMediaPlaying } from '../../store/features/media/Index';
import { RootState } from '../../store/store';


const { Header, Content, Footer } = Layout;

function MediaPage(props) {

	const mediaStore = useSelector((state: RootState) => state.media)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllMedia())
		dispatch(fetchMediaPlaying())
	}, [])

	const mediaQueryColumns = [
		{
			title: 'Ordem',
			dataIndex: 'order',
			key: 'order'
		},
		{
			title: 'Nome do arquivo',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Caminho do arquivo',
			dataIndex: 'path',
			key: 'path'
		},
		{
			title: 'tipo de arquivo',
			dataIndex: 'type',
			key: 'type'
		}
	]

	const filesColumns = [
		{
			title: 'Nome do arquivo',
			dataIndex: 'name',
			key: 'name'
		}
	]

	const changeScreen = () => {
		console.log('clicou alterar tela')
	}

	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={ ['2'] } />
			<Layout>
				<Header style={ { padding: 0 } } />
				<Content>
					<Breadcrumb style={ { margin: '16px 16px' } }>
						<Breadcrumb.Item>RMP</Breadcrumb.Item>
						<Breadcrumb.Item>Media</Breadcrumb.Item>
					</Breadcrumb>
					<div style={ { margin: '0 13px' } }>
						Solicitar Media tela:
						<Button type='primary' style={ { margin: '13px' } } onClick={changeScreen}>
							Alterar tela
						</Button>
					</div>
					<div style={ { margin: '0 15px' } }>
						Media em reprodução: { mediaStore.mediaPlaying?.name }
					</div>
					<div style={ { margin: '15px' } }>
						Lista de reprodução:
						<Table
							columns={ mediaQueryColumns }
							loading={ mediaStore.loading }
							dataSource={ mediaStore.medias }
						/>
					</div>
					<div style={ { margin: '15px' } }>
						Arquivos:
						<Table columns={ filesColumns } />
					</div>
					<Button type='primary' style={ { margin: '15px' } }>Adicionar</Button>
					<div style={ { margin: '15px' } }>
						Controles:
						<Button type='default' style={ { margin: '5px' } }>Play</Button>
						<Button type='default' style={ { margin: '5px' } }>Pause</Button>
					</div>
				</Content>
				<Footer style={ { textAlign: 'center' } }>Copyright 2022. All Rights Reserved.</Footer>
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

export default MediaPage