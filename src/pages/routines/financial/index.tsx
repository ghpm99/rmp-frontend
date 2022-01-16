
import { Breadcrumb, Layout } from 'antd';
import MenuCollapsible from '../../../components/menu/Index';


const { Header, Content, Footer } = Layout;

function FinancialPage() {
	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={['sub2', '6']} />
			<Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Rotinas</Breadcrumb.Item>
			<Breadcrumb.Item>Financeiro</Breadcrumb.Item>
          </Breadcrumb>
		</Layout>

	)
}

export default FinancialPage