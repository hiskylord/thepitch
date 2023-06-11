import Axios from 'axios'
import Swal from 'sweetalert2'
const baseurl =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.protocol + '//' + window.location.host
    : ''
export default function Form(e) {
  e.preventDefault()
  let data = new FormData(e.target)
  const method = e.target.getAttribute('method')
  Axios({
    data,
    url: baseurl + '/api/' + e.target.getAttribute('action'),
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      Swal.fire(
        (res.data.title = 'RESPONSE'),
        res.data.msg,
        (res.data.type = 'success'),
      )
      if (
        res.data.msg === 'Account Created Successfully' ||
        res.data.msg == 'ACCESS GRANTED'
      ) {
        setTimeout(() => {
          return (window.location =
            res.data.badge < 1 ? '/dashboard' : '/admin/dashboard')
        }, 2000)
      }
      if (res.data.redirect) {
        window.location = res.data.redirect
      }
      if (res.data.clear) {
        e.target.reset()
      }
    })
    .catch((err) => {
      Swal.fire(JSON.stringify(err.message))
    })
}
