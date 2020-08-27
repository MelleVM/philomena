import React from 'react';
import {useStripe, useElements, IdealBankElement} from '@stripe/react-stripe-js';
import Button from "../../../Button"
import IdealBankSection from './IdealBankSection';

let clientSecret

fetch('https://philomena.herokuapp.com/secret').then(function (response) {
  return response.json();
}).then(function (responseJson) {
  clientSecret = responseJson.client_secret;
});

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // I don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const idealBank = elements.getElement(IdealBankElement);
    const accountholderName = event.target['accountholder-name'];

    const {error} = await stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: idealBank,
        billing_details: {
          name: accountholderName.value, 
        },
      },
      return_url: `${document.location.protocol}//${window.location.hostname}:${window.location.port}/payment/status?timeFrom=${props.details.timeFrom}&timeTo=${props.details.timeTo}&date=${props.details.date}&fullDate=${props.details.fullDate}&fullDateEnd=${props.details.fullDateEnd}&productId=${props.details.productId}&employeeId=${props.details.employeeId}&userId=${props.details.userId}`,
    });

    if (error) {
      // Show error to the customer.
      console.log(error.message);
    } 
    

    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  };

  return (
    <form className="ideal-form" id="payment-form" onSubmit={handleSubmit}>
      <div onClick={props.prevPage} className="back"> {'<'} Go back</div>
      <div className="ideal-header">
        <img alt="ideal" src="/images/ideal.png" />
        <div>
          <h2>iDEAL</h2>
          <h5>Most popular method in the netherlands</h5>
        </div>
      </div>
      <div className="form-row total-amount">
        <label>
          Total amount
          <h1>€5.00</h1>
        </label>
      </div>
      <div className="form-row">
        <label>
          Name
          <input name="accountholder-name" placeholder="Enter your full name" required />
        </label>
      </div>
      <div className="form-row">
        <IdealBankSection />
      </div>

      <Button disabled={!stripe} value="Submit Payment" />
      <h3>This will be reducted from the total amount you will pay after your appointment is finished</h3>

    </form>

  );
}

export default CheckoutForm