
import { Breadcrumb, Button, Input, Layout, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Pusher from 'react-pusher';
import LoadingPage from '../../components/loadingPage/Index';
import LoginHeader from '../../components/loginHeader/Index';
import MenuCollapsible from '../../components/menu/Index';
import { sendCommandService } from '../../services/remoteService';


const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

let pusher

function CommandPage(props) {

    const [command, setCommand] = useState('')
    const [commandReturn, setCommandReturn] = useState('')
    const { data, status } = useSession()

    const screenData = (data) => {
        console.log(data)
    }

    return (
        <Layout style={ { minHeight: '100vh' } }>
            <MenuCollapsible selected={ ['3'] } />
            <Layout>
                <Header style={ { padding: 0 } } >
                    <LoginHeader />
                </Header>
                <Content>
                    <Breadcrumb style={ { margin: '16px 16px' } }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Remoto</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={ { margin: '16px 16px' } }>
                        <Input.Group compact>
                            <Input
                                placeholder='Pressione uma tecla'
                                name='key'
                                onChange={ (event) => { setCommand(event.target.value) } }
                                value={ command }
                                style={ { width: 'calc(100% - 200px)' } }
                            />
                            <Button
                                type='primary'
                                onClick={ () => { } }
                            >
                                Enviar tecla
                            </Button>
                        </Input.Group>
                    </Layout>
                    <Layout style={ { margin: '16px 16px' } }>
                        <Input.Group compact>
                            <Input
                                placeholder='Pressione uma tecla'
                                name='key'
                                onChange={ (event) => { setCommand(event.target.value) } }
                                value={ command }
                                style={ { width: 'calc(100% - 200px)' } }
                            />
                            <Button
                                type='primary'
                                onClick={ () => { } }
                            >
                                Enviar combinação de tecla
                            </Button>
                        </Input.Group>
                    </Layout>
                </Content>
            </Layout>
            <Pusher
				channel='private-remote'
				event='screen'
				onUpdate={screenData}
			/>
        </Layout>

    )


}

CommandPage.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: "/login",
}

export async function getServerSideProps() {
    const props = {
        pusher_key: process.env.PUSHER_KEY,
        pusher_cluster: process.env.PUSHER_CLUSTER
    }
    return { props }
}

export default CommandPage