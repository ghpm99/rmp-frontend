
import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, DatePicker, Form, Input, InputNumber, Layout, Modal, Select, Switch, Table, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../../../components/loadingPage/Index';
import LoginHeader from '../../../components/loginHeader/Index';
import MenuCollapsible from '../../../components/menu/Index';
import { changeVisibleModal, fecthAllPayment, saveNewPayment } from '../../../store/features/financial/Index';
import { RootState } from '../../../store/store';
import styles from './Opened.module.css';


function FinancialPage() {

    const { Header, Content, Footer } = Layout;

    const { Title } = Typography
    const { Option } = Select

    const [form] = Form.useForm()

    const financialStore = useSelector((state: RootState) => state.financial)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fecthAllPayment())
    }, [])

    const dateFormat = 'DD/MM/YYYY'
    const customFormat = value => `${value.format(dateFormat)}`

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    const openModal = () => {
        dispatch(changeVisibleModal({ modal: 'newPayment', visible: true }))
    }

    const closeModal = () => {
        dispatch(changeVisibleModal({ modal: 'newPayment', visible: false }))
    }

    const onOk = () => {
        form.submit()
    }

    const onFinish = (values) => {
        const newPayment = {
            'type': values.type,
            'name': values.name,
            'date': moment(values.date).format('YYYY-MM-DD'),
            'installments': values.installments,
            'payment_date': moment(values.payment_date).format('YYYY-MM-DD'),
            'fixed': values.fixed ? true : false,
            'value': values.value
        }
        dispatch(saveNewPayment({ payment: newPayment }))
    }

    const headerTableFinancial = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: text => text === 0 ? 'Credito' : 'Debito'
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'dataIndex'
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value'
        },
        {
            title: 'Parcelas',
            dataIndex: 'installments',
            key: 'installments'
        },
        {
            title: 'Dia de pagamento',
            dataIndex: 'payment_date',
            key: 'payment_date'
        },
        {
            title: 'Fixo',
            dataIndex: 'fixed',
            key: 'fixed',
            render: value => value ? 'Sim' : 'Não'
        }
    ]

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

    return (
        <Layout className={ styles.container }>
            <MenuCollapsible selected={ ['sub2', 'opened'] } />
            <Layout>
                <Header className={ styles.header } >
                    <LoginHeader />
                </Header>
                <Content>
                    <Breadcrumb className={ styles.breadcrumb }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Financeiro</Breadcrumb.Item>
                        <Breadcrumb.Item>Em aberto</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout>
                        <div className={ styles.header_command }>
                            <Title level={ 3 } className={ styles.title }>
                                Valores em aberto
                            </Title>
                            <Button icon={ <PlusOutlined /> } onClick={ openModal }>
                                Novo
                            </Button>
                        </div>
                        <Table
                            columns={ headerTableFinancial }
                            dataSource={ financialStore.payments.data }
                            loading={ financialStore.payments.loading }
                        />

                        <Modal
                            title='Nova entrada'
                            visible={ financialStore.modal.newPayment.visible }
                            onCancel={ closeModal }
                            okButtonProps={ { htmlType: 'submit' } }
                            onOk={ onOk }
                        >
                            <Form
                                {...formItemLayout}
                                form={ form }
                                className={ styles.form }
                                name='payment'
                                onFinish={ onFinish }
                            >
                                <Form.Item
                                    style={{width:'auto'}}
                                    label='Tipo'
                                    name='type'
                                    rules={ [{ required: true, message: 'Selecione o tipo de entrada' }] }
                                >
                                    <Select placeholder='Selecione o tipo de entrada'>
                                        <Option value={ 0 }>
                                            Credito
                                        </Option>
                                        <Option value={ 1 }>
                                            Debito
                                        </Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label='Nome'
                                    name='name'
                                    rules={ [{ required: true, message: 'Entre com o nome da entrada' }] }
                                >
                                    <Input placeholder='Digite o nome' />
                                </Form.Item>
                                <Form.Item
                                    label='Data'
                                    name='date'
                                    rules={ [{ required: true, message: 'Selecione a data da entrada' }] }
                                >
                                    <DatePicker format={ customFormat } style={{width:'100%'}}/>
                                </Form.Item>
                                <Form.Item
                                    label='Parcelas'
                                    name='installments'
                                    rules={ [{ required: true, message: 'Digite o numero de parcelas' }] }
                                >
                                    <InputNumber style={{width:'100%'}}/>
                                </Form.Item>
                                <Form.Item
                                    label='Dia de pagamento'
                                    name='payment_date'
                                    rules={ [{ required: true, message: 'Selecione a data do pagamento' }] }
                                >
                                    <DatePicker format={ customFormat } style={{width:'100%'}}/>
                                </Form.Item>
                                <Form.Item
                                    label='Valor'
                                    name='value'
                                    rules={ [{ required: true, message: 'Digite o valor' }] }
                                >
                                    <InputNumber style={{width:'100%'}}/>
                                </Form.Item>
                                <Form.Item
                                    label='Entrada mensal'
                                    name='fixed'
                                    valuePropName='checked'
                                >
                                    <Switch />
                                </Form.Item>
                            </Form>
                        </Modal>

                    </Layout>
                </Content>
            </Layout>
        </Layout>

    )
}

FinancialPage.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: "/login",
}

export default FinancialPage