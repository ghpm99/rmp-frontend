import { Avatar, Button, Popover } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import S from './Login.module.css'
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';


export default function LoginHeader() {

    const { data, status } = useSession()

    console.log(data.user)

    const content = (
        <div>
            <div>{data?.user.name}</div>
            <Button onClick={ () => signOut() }>Deslogar</Button>
        </div>
    )

    return (
        <div className={ S.layout }>
            { status === 'authenticated' ?
                <Popover content={ content } title='Conta'>
                    <Avatar size='small' icon={ <UserOutlined /> } />
                </Popover>
                :
                (
                    <div className={ S.buttons }>
                        <Button
                            type='ghost'
                            className={ S.button }
                        >
                            <Link href='/login'>Sign in</Link>
                        </Button>
                        <Button
                            type='ghost'
                            className={ S.button }
                        >
                            Sign up
                        </Button>
                    </div>
                )
            }
        </div>
    )
}