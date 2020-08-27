import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter as Router} from "react-router-dom"
import {ContextProvider} from "./Context"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    // Wrapping everything in a ContextProvider to use cotext in the entire app
    <ContextProvider>
        {/* wrapping the App component in a Router component so that i can use react-router-dom in the whole app */}
        <Router>
            <App />
        </Router>
    </ContextProvider>, document.getElementById("root"))

serviceWorker.register();
