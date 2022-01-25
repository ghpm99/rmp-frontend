
import { Breadcrumb, Layout } from 'antd';
import MenuCollapsible from '../../../components/menu/Index';


const { Header, Content, Footer } = Layout;

function KanbanPage() {
	return (
		<Layout style={ { minHeight: '100vh' } }>
			<MenuCollapsible selected={['sub2', '5']} />
			<Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Rotinas</Breadcrumb.Item>
			<Breadcrumb.Item>Kanban</Breadcrumb.Item>
          </Breadcrumb>
		</Layout>

	)
}

export default KanbanPage