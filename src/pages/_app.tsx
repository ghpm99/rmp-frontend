import { Provider } from 'react-redux'
import Pusher from 'pusher-js';
import '../../styles/globals.css'
import 'antd/dist/antd.css'
import { store } from '../store/store'
import { useEffect } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={ session }>
      { Component.auth ? (
        <Auth>
          <Provider store={ store }>
            <Component { ...pageProps } />
          </Provider>
        </Auth>
      ) : (
        <Provider store={ store }>
          <Component { ...pageProps } />
        </Provider>
      ) }

    </SessionProvider>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true })
  const isUser = !!session?.user

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
