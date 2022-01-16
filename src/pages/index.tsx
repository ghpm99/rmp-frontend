
import { Breadcrumb, Layout } from 'antd';
import MenuCollapsible from '../components/menu/Index';


const { Header, Content, Footer } = Layout;

export default function Home() {

  return (
    <Layout style={ { minHeight: '100vh' } }>
      <MenuCollapsible selected={['1']} />
      <Layout>
        <Header style={ { padding: 0 } } />
        <Content style={ { margin: '0 16px' } }>
          <Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>RMP</Breadcrumb.Item>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          </Breadcrumb>
          <div style={ { padding: 24, minHeight: 360 } }>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={ { textAlign: 'center' } }>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
