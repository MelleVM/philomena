import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter as Router} from "react-router-dom"
import {ContextProvider} from "./Context"
import * as serviceWorker from './serviceWorker';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_tDIwUGKtAPM4MC7EbjfTYEc2009jDpOSTz");



ReactDOM.render(
    <ContextProvider>
        <Router>
            {/* Wrapped the app component in a stripe Element to make it work*/}
            <Elements stripe={stripePromise}>
                <App />
            </Elements>
        </Router>
    </ContextProvider>, document.getElementById("root")
)

serviceWorker.register();