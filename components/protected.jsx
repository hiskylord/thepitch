export async function Protect(context, url = '') {
  let obj
  let returndata = {}
  const { req } = context
  const host = req.headers.host
  const protocol =
    process.env.NODE_ENV !== 'development' ? 'https://' : 'http://'

  const auth = await fetch(protocol + host + '/api/users/authenticate', {
    headers: {
      Cookie: 'jwtkey=' + req.cookies.jwtkey,
    },
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
      return data.auth
    })
    .catch((err) => {
      console.log(JSON.stringify(err.message))
    })
  if (url !== '') {
    returndata = await fetch(protocol + host + url, {
      credentials: 'include',
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        return data.data
      })
      .catch((err) => {
        console.error({ err })
      })
  }
  if (auth !== true) {
    obj = {
      redirect: {
        permanent: false,
        destination: '/access/signin',
      },
      props: { data: returndata, isAuth: 'True' },
    }
  } else {
    obj = {
      props: { data: returndata, isAuth: 'false' },
    }
  }
  return obj
}
