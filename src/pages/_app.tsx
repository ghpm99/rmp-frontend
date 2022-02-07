import { Provider } from 'react-redux'
import Pusher from 'pusher-js';
import '../../styles/globals.css'
import 'antd/dist/antd.css'
import { store } from '../store/store'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={ store }>
      <Component { ...pageProps } />
    </Provider>
  )
}

export default MyApp
