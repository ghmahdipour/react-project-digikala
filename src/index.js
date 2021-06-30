
import ReactDOM from 'react-dom';
import './index.css';
import AppWrapper from './app/app'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import Store from './app/utils/create_store'
import { BrowserRouter } from 'react-router-dom'

const app = (
  <Provider store={Store}>
    <BrowserRouter>
       <AppWrapper />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()