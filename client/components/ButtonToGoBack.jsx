import { useRouter } from 'next/router'

const ButtonToGoBack = () => {
  const router = useRouter()

  return <button onClick={() => router.back()} className="w-36 bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-10">
    Return
  </button>
}

export default ButtonToGoBack