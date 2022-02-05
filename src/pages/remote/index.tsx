
import { Breadcrumb, Button, Input, Layout, Typography } from 'antd';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import MenuCollapsible from '../../components/menu/Index';
import { sendCommandService } from '../../services/remoteService';


const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

let pusher

function RemotePage(props) {

    const [command, setCommand] = useState('')
    const [commandReturn, setCommandReturn] = useState('')

    useEffect(() => {
        pusher = new Pusher(props.pusher_key, {
            cluster: props.pusher_cluster
        })
        const channel = pusher.subscribe('krill')
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
            <MenuCollapsible selected={ ['9'] } />
            <Layout>
                <Header style={ { padding: 0 } } />
                <Content>
                    <Breadcrumb style={ { margin: '16px 16px' } }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Remoto</Breadcrumb.Item>
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

export async function getServerSideProps() {
    const props = {
        pusher_appId: process.env.PUSHER_APP_ID,
        pusher_key: process.env.PUSHER_KEY,
        pusher_secret: process.env.PUSHER_SECRET,
        pusher_cluster: process.env.PUSHER_CLUSTER
    }
    return { props }
}

export default RemotePage