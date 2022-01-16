
import { Breadcrumb, Layout } from 'antd';
import MenuCollapsible from '../../components/menu/Index';


const { Header, Content, Footer } = Layout;

function ServerPage() {
	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={['7']} />
			<Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Servidor</Breadcrumb.Item>
          </Breadcrumb>
		</Layout>

	)
}

export default ServerPage