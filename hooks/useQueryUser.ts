import { useRouter } from "next/router"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { User } from "@prisma/client"

export const useQueryUser = () => {
  
  const router = useRouter()

  // Nestjsのuser取得apiを叩く
  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user/get`
    )
    return data; 
  }
  
  // react queryを使用するとapiから取得した値をキャッシュに保持できる
  return useQuery<Omit<User, 'hashedPassword'>, Error>({
    // キャッシュ名を指定
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    }
  })
}
