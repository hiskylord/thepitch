import Link from 'next/link'
import { useRouter } from 'next/router'
import { unProtect } from '/components/unprotected'
import { FaAngleDoubleLeft, FaTimesCircle } from 'react-icons/Fa'
import { Strtolink } from '/components/itemcard'
import Header from '../../Header'
function Preview({ data }) {
  const router = useRouter()
  const { id } = router.query
  const item = data[0].item
  return (
    <>
      <Header />
      <div className="container  mx-auto mt-1 h-[800px]">
        <div className="w-full shadow  mx-auto h-full">
          <Link
            href={'/item/' + Strtolink(item.title) + '/' + id}
            className="flex"
          >
            <FaAngleDoubleLeft className="my-auto" />{' '}
            <span className="my-auto">BACK</span>
          </Link>
          <h2 className="mx-auto text-center uppercase font-bold">
            {' '}
            Preview:{item.title}
          </h2>
          <iframe src={item.preview} className="w-full h-full"></iframe>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  const { id } = context.query
  return await unProtect(context, [`/api/item/${id}/get`])
}
export default Preview
