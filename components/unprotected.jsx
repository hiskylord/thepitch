export async function unProtect(context, urls) {
  let obj
  let returndata = []
  const { req } = context
  const host = req.headers.host
  const protocol =
    process.env.NODE_ENV !== 'development' ? 'https://' : 'http://'
  if (urls.length > 0) {
    for (let i = 0; i < urls.length; i++) {
      returndata.push(
        await fetch(protocol + host + urls[i], {
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
          }),
      )
    }
  }

  obj = {
    props: { data: returndata },
  }
  return obj
}
