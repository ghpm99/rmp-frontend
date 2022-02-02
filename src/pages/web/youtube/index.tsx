

import { Breadcrumb, Layout, Button, Table, Form, Input } from 'antd';
import MenuCollapsible from '../../../components/menu/Index';
import { changeScreenYoutube } from '../../../services/youtubeService';

function YoutubePage() {
	const { Header, Content, Footer } = Layout;

	const [form] = Form.useForm();

	const youtubeQueryColumns = [
		{
			title: 'Ordem',
			dataIndex: 'order',
			key: 'order'
		},
		{
			title: 'Nome do video',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Url do video',
			dataIndex: 'path',
			key: 'path'
		}
	]

	const changeScreen = () => {
		changeScreenYoutube()
	}

	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={ ['sub1', '3'] } />
			<Layout>
				<Header style={ { padding: 0 } } />
				<Content>
					<Breadcrumb style={ { margin: '16px 16px' } }>
						<Breadcrumb.Item>RMP</Breadcrumb.Item>
						<Breadcrumb.Item>Web</Breadcrumb.Item>
						<Breadcrumb.Item>Youtube</Breadcrumb.Item>
					</Breadcrumb>
					<div style={ { margin: '4px' } }>
						Solicitar youtube tela:
						<Button type='primary' style={ { margin: '0 16px' } } onClick={changeScreen}>
							Alterar tela
						</Button>
					</div>
					<div style={ { margin: '4px' } }>
						<Form layout='inline' form={ form }>
							<Form.Item label="Digite a url do video para reproduzir:">
								<Input placeholder="https://www.youtube.com/watch?v=" />
							</Form.Item>
							<Form.Item>
								<Button type="primary">Enviar</Button>
							</Form.Item>
						</Form>
					</div>
					<div style={ { margin: '4px' } }>
						Lista de videos para reproduzir:
						<Table columns={ youtubeQueryColumns } />
					</div>
				</Content>
				<Footer style={ { textAlign: 'center' } }>Copyright 2022. All Rights Reserved.</Footer>
			</Layout>
		</Layout>

	)
}

export default YoutubePage