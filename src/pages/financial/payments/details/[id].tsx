import { Breadcrumb, Button, Card, Checkbox, DatePicker, InputNumber, Layout, Select, Typography } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from '../../../../components/loadingPage/Index'
import LoginHeader from '../../../../components/loginHeader/Index'
import MenuCollapsible from '../../../../components/menu/Index'
import { payoffPaymentService, savePaymentDetailService } from '../../../../services/financialService'
import { changeActivePaymentDetails, changeFixedPaymentDetails, changeNamePaymentDetails, changePaymentDatePaymentDetails, changeTypePaymentDetails, changeValuePaymentDetails, fetchPaymentDetails } from '../../../../store/features/financial/Index'
import { RootState } from '../../../../store/store'
import styles from './Details.module.css'

const { Paragraph } = Typography
const { Option } = Select

export default function PaymentDetails() {
    const router = useRouter()
    const { id } = router.query

    const financialStore = useSelector((state: RootState) => state.financial)
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            const idPayment = parseInt(id as string)
            dispatch(fetchPaymentDetails(idPayment))
        }
    }, [id])

    const date = new Date(financialStore.paymentDetail.data?.date).toLocaleDateString()

    const save = (event) => {
        savePaymentDetailService(id, financialStore.paymentDetail.data)
    }

    const changeName = (event) => {
        dispatch(changeNamePaymentDetails(event))
    }

    const changeType = (event) => {
        dispatch(changeTypePaymentDetails(event))
    }

    const changeFixed = (event) => {
        const { checked } = event.target
        dispatch(changeFixedPaymentDetails(checked))
    }

    const changeActive = (event) => {
        const { checked } = event.target
        dispatch(changeActivePaymentDetails(checked))
    }

    const changePaymentDate = (date) => {
        dispatch(changePaymentDatePaymentDetails(date.format('YYYY-MM-DD')))
    }

    const changeValue = (event) => {
        dispatch(changeValuePaymentDetails(event))
    }

    const payoff = (event) => {
        payoffPaymentService(financialStore.paymentDetail.data.id).then(data => {
            console.log(data)
            dispatch(fetchPaymentDetails(financialStore.paymentDetail.data.id))
        })
    }

    return (
        <Layout className={ styles.container }>
            <MenuCollapsible selected={ ['sub2', 'payments'] } />
            <Layout>
                <Header className={ styles.header } >
                    <LoginHeader />
                </Header>
                <Content>
                    <Breadcrumb className={ styles.breadcrumb }>
                        <Breadcrumb.Item>RMP</Breadcrumb.Item>
                        <Breadcrumb.Item>Financeiro</Breadcrumb.Item>
                        <Breadcrumb.Item>Pagamento</Breadcrumb.Item>
                        <Breadcrumb.Item>Detalhes</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className={ styles.container_labels }>
                        <Card loading={ financialStore.paymentDetail.loading }>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    ID: { financialStore.paymentDetail.data?.id }
                                </div>
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Nome:
                                </div>
                                <Paragraph
                                    style={ { margin: '0' } }
                                    editable={ { onChange: changeName } }
                                >
                                    { financialStore.paymentDetail.data?.name }
                                </Paragraph>
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Dia de lançamento:
                                </div>
                                <div>
                                    { date }
                                </div>
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Status:
                                </div>
                                <div>
                                    { financialStore.paymentDetail.data?.status === 0 ? 'Em aberto' : 'Baixado' }
                                </div>
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Dia de pagamento:
                                </div>
                                <DatePicker
                                    value={ moment(financialStore.paymentDetail.data?.payment_date) }
                                    format='DD/MM/YYYY'
                                    onChange={ changePaymentDate }
                                />
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Tipo:
                                </div>
                                <Select
                                    placeholder='Selecione o tipo de entrada'
                                    value={ financialStore.paymentDetail.data?.type }
                                    onChange={ changeType }
                                >
                                    <Option value={ 0 }>
                                        Credito
                                    </Option>
                                    <Option value={ 1 }>
                                        Debito
                                    </Option>
                                </Select>
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Parcelas:
                                </div>
                                <div>
                                    { financialStore.paymentDetail.data?.installments }
                                </div>
                            </div>
                            <div className={ styles.label_detail }>
                                <div>
                                    <Checkbox
                                        checked={ financialStore.paymentDetail.data?.fixed }
                                        onChange={ changeFixed }
                                    >
                                        Fixo
                                    </Checkbox>
                                </div>
                            </div>
                            <div className={ styles.label_detail }>
                                <div>
                                    <Checkbox
                                        checked={ financialStore.paymentDetail.data?.active }
                                        onChange={ changeActive }
                                    >
                                        Ativo
                                    </Checkbox>
                                </div>
                            </div>
                            <div className={ styles.label_detail }>
                                <div className={ styles.label }>
                                    Valor:
                                </div>
                                <InputNumber
                                    value={ financialStore.paymentDetail.data?.value }
                                    onChange={ changeValue }
                                />
                            </div>
                            <div className={styles.buttons}>
                                {
                                    financialStore.paymentDetail.data?.status === 0 ? (
                                        <Button
                                            danger
                                            type='default'
                                            onClick={payoff}
                                        >
                                            Baixar pagamento
                                        </Button>
                                    ) : (<></>)
                                }
                                <Button
                                    type='primary'
                                    onClick={ save }
                                    className={styles.button_save}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </Card>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    )
}

PaymentDetails.auth = {
    role: 'admin',
    loading: <LoadingPage />,
    unauthorized: "/login",
}