
import { Breadcrumb, Layout } from 'antd';
import MenuCollapsible from '../../components/menu/Index';


const { Header, Content, Footer } = Layout;

function StatusPage() {
	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={['8']} />
			<Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Status</Breadcrumb.Item>
          </Breadcrumb>
		</Layout>

	)
}

export default StatusPage