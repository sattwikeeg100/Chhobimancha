import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './Redux/store';

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)