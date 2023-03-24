import Axios from 'axios'
const paystack = () => {
  const SecretKey = process.env.PAYSTACK_SKEY
  const initializePaymentCard = (form, mycallback) => {
    const option = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        authorization: SecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    }
    const callback = (error, response, body) => {
      return mycallback(error, body)
    }
    Axios.post(option, callback)
  }
  const verifyPaymentCard = (ref, mycallback) => {
    const option = {
      url:
        'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
      headers: {
        authorization: SecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    }
    const callback = (error, response, body) => {
      return mycallback(error, body)
    }
    Axios(option, callback)
  }
  return { initializePaymentCard, verifyPaymentCard }
}
export default paystack
