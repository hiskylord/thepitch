import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function toPromo() {
  const router = useRouter()
  useEffect(() => {
    router.push('/latest/1')
  })
}
