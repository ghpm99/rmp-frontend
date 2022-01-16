
import { Breadcrumb, Layout } from 'antd';
import MenuCollapsible from '../../../components/menu/Index';


const { Header, Content, Footer } = Layout;

function NavigationPage() {
	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={['sub1','4']} />
			<Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Web</Breadcrumb.Item>
			<Breadcrumb.Item>Navegação</Breadcrumb.Item>
          </Breadcrumb>
		</Layout>

	)
}

export default NavigationPage