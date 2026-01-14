export function initiatePayment(amount) {
  return {
    transactionReference: "MOCK_" + Date.now(),
    paymentUrl: "https://mock.monnify.com/pay"
  };
}
