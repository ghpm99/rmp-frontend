
import { Breadcrumb, Button, Input, Layout, Slider, Typography } from 'antd';
import { useEffect, useState } from 'react';
import LoadingPage from '../../components/loadingPage/Index';
import LoginHeader from '../../components/loginHeader/Index';
import MenuCollapsible from '../../components/menu/Index';
import { hotkeyService, keyPressService, mouseButtonService, mouseMoveService, screenSizeService } from '../../services/remoteService';
import styles from './Remote.module.css';


const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;


function CommandPage(props) {

    const [key, setKey] = useState('')
    const [hotkey, setHotkey] = useState('')
    const [screenSize, setScreenSize] = useState({
        screen_width: 0,
        screen_height: 0,
        x: 0,
        y: 0
    })

    useEffect(() => {
        screenSizeService().then(data => {
            setScreenSize(data)
        })

    }, [])

    return (
        <Layout className={ styles.container }>
            <MenuCollapsible selected={ ['3'] } />
            <Layout>
                <Header className={ styles.header } >
                    <LoginHeader />
                </Header>
                <Content>
                    <Breadcrumb className={ styles.breadcrumb }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Remoto</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className={ styles.key_hold }>
                        <Input.Group compact>
                            <Input
                                placeholder='Pressione uma tecla'
                                name='key'
                                onChange={ (event) => { setKey(event.target.value) } }
                                value={ key }
                                style={ { width: 'calc(100% - 200px)' } }
                            />
                            <Button
                                type='primary'
                                onClick={ () => {
                                    keyPressService(key)
                                    setKey('')
                                } }
                            >
                                Enviar tecla
                            </Button>
                        </Input.Group>
                    </Layout>
                    <Layout className={ styles.hotkey }>
                        <Input.Group compact>
                            <Input
                                placeholder='Pressione uma tecla'
                                name='key'
                                onChange={ (event) => { setHotkey(event.target.value) } }
                                value={ hotkey }
                                style={ { width: 'calc(100% - 200px)' } }
                            />
                            <Button
                                type='primary'
                                onClick={ () => {
                                    hotkeyService(hotkey)
                                    setHotkey('')
                                } }
                            >
                                Enviar combinação de tecla
                            </Button>
                        </Input.Group>
                        <div className={ styles.mouse_container }>
                            <Slider
                                min={ 0 }
                                max={ screenSize.screen_width }
                                onChange={ (event) => setScreenSize({
                                    ...screenSize,
                                    x: event
                                }) }
                            />
                            <div className={ styles.vertical_slider }>
                                <Slider
                                    reverse
                                    vertical
                                    min={ 0 }
                                    max={ screenSize.screen_height }
                                    onChange={ (event) => setScreenSize({
                                        ...screenSize,
                                        y: event
                                    }) }
                                />
                            </div>
                            <Button
                                type='primary'
                                onClick={ () => mouseMoveService(screenSize.x, screenSize.y) }
                                className={styles.buttons_mouse}
                            >
                                Mover
                            </Button>
                            <Button
                                type='primary'
                                className={styles.buttons_mouse}
                                onClick={() => mouseButtonService('click')}
                            >
                                Clicar
                            </Button>
                            <Button
                                type='primary'
                                className={styles.buttons_mouse}
                                onClick={() => mouseButtonService('double-click')}
                            >
                                Click duplo
                            </Button>
                            <Button
                                type='primary'
                                className={styles.buttons_mouse}
                                onClick={() => mouseButtonService('click-right')}
                            >
                                Click direito
                            </Button>
                        </div>
                    </Layout>
                </Content>
            </Layout>
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