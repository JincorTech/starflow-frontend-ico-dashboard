import React from 'react';
import { connect } from 'react-redux';

const OrderForm = ({
  user, rate, ethAmount, eth
}) => {
  const date = new Date().toLocaleString();
  return (
    <div>
      <h2>ORDER FOR STAR TOKENS</h2>
      <p>Order number: {user.ethAddress}</p>
      <p>Order Date: {date}</p>
      <p>
        Seller: STARFLOW TECHNOLOGY PTE. LTD. (Company Registration No.
        201804853K), a Singapore company with its registered office address at
        101 Upper Cross Street, #05-16, Singapore 058357 (“Starflow”)
      </p>
      <p>Buyer: {user.name}</p>
      <p>
        1. Buyer agrees to purchase the following STAR Tokens in accordance with
        the STAR Token Sale Terms and Conditions (the “Terms”):
      </p>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{eth / rate}</td>
            <td>STAR Tokens</td>
            <td>1 ETH/ {1 / rate} STAR</td>
            <td>{ethAmount} ETH</td>
          </tr>
        </tbody>
      </table>
      <p>
        2. This Order is subject to the Terms, a copy of which is attached to
        this Order.
      </p>
      <p>
        3.{' '}
        <strong>
          This Order is firm and not subject to change or revocation by Buyer.
        </strong>
        This Order is subject to acceptance, adjustment and/or cancellation by
        Starflow according to the Terms. You acknowledge that the number of STAR
        Tokens delivered to you may be less than the number you ordered, as
        provided in the Terms.
      </p>
      <p>
        On the date stated above, this Order has been submitted by, and the
        Terms have been accepted by:
      </p>
      <p>{user.name} </p>
      <p>{date}</p>
    </div>
  );
};

export default connect((state) => ({
  user: state.app.app.user,
  rate: state.dashboard.dashboard.jcrTokenPrice.ETH,
  ethAmount: state.dashboard.buyTokens.ethAmount,
  eth: state.dashboard.buyTokens.eth,
  jcr: state.dashboard.buyTokens.jcr,
}))(OrderForm);
