import { Provider } from 'react-redux'

import '../../styles/globals.css'
import 'antd/dist/antd.css'
import { store } from '../store/store'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
