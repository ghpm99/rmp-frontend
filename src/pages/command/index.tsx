
import { Breadcrumb, Button, Input, Layout, Typography } from 'antd';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import MenuCollapsible from '../../components/menu/Index';
import { sendCommandService } from '../../services/remoteService';


const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

let pusher

function CommandPage(props) {

    const [command, setCommand] = useState('')
    const [commandReturn, setCommandReturn] = useState('')

    useEffect(() => {
        pusher = new Pusher(props.pusher_key, {
            authEndpoint: '/api/pusher/auth',
            cluster: props.pusher_cluster,
        })
        const channel = pusher.subscribe('private-display')
        channel.bind('command-return', (data) => {
            setCommandReturn(data.output)
        })
    }, [])

    const sendCommand = () => {
        sendCommandService(command)
        setCommand('')
    }

    return (
        <Layout style={ { minHeight: '100vh' } }>
            <MenuCollapsible selected={ ['2'] } />
            <Layout>
                <Header style={ { padding: 0 } } />
                <Content>
                    <Breadcrumb style={ { margin: '16px 16px' } }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Comando</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={ { margin: '16px 16px' } }>
                        <Input.Group compact>
                            <Input
                                placeholder='Digite um comando'
                                name='command'
                                onChange={ (event) => { setCommand(event.target.value) } }
                                value={ command }
                                style={ { width: 'calc(100% - 200px)' } }
                            />
                            <Button
                                type='primary'
                                onClick={ () => { sendCommand() } }
                            >
                                Enviar comando
                            </Button>
                            <Title level={ 4 }>Retorno do comando:</Title>
                            <TextArea rows={ 4 } value={ commandReturn } />
                        </Input.Group>
                    </Layout>
                </Content>
            </Layout>
        </Layout>

    )


}

CommandPage.auth = {
    role: 'admin',
    loading: <LoadingPage/>,
    unauthorized: "/login",
}

function LoadingPage () {
    return(
        <div>
            Carregando...
        </div>
    )
}

export async function getServerSideProps() {
    const props = {
        pusher_key: process.env.PUSHER_KEY,
        pusher_cluster: process.env.PUSHER_CLUSTER
    }
    return { props }
}

export default CommandPage