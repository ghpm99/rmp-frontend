
import { Breadcrumb, Layout } from 'antd';
import LoadingPage from '../../components/loadingPage/Index';
import MenuCollapsible from '../../components/menu/Index';


const { Header, Content, Footer } = Layout;

function ServerPage() {
	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={['6']} />
			<Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Servidor</Breadcrumb.Item>
          </Breadcrumb>
		</Layout>

	)
}

ServerPage.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: "/login",
}

export default ServerPage