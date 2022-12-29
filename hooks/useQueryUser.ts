import { useRouter } from "next/router"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { User } from "@prisma/client"
import { useAuth0 } from "@auth0/auth0-react"

// export const useQueryUser = () => {
  
//   const router = useRouter()
//   const { error, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

//   // Nestjsのuser取得apiを叩く
//   const getUser = async () => {

//     const accessToken = await getAccessTokenSilently({
//       audience: process.env.NEXT_PUBLIC_API_URL,
//       scope: "read:current_user",
//     })
//     console.log("accessToken:" + accessToken)
//     // console.log("error:" + error)

//     const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
//       `${process.env.NEXT_PUBLIC_API_URL}/user/get`, 
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         }
//       }
//     )

//     // const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
//     //   `${process.env.NEXT_PUBLIC_API_URL}/user/get`
//     // )

//     // console.log("data:" + JSON.stringify(data))
//     return data; 
//   }
  
//   // react queryを使用するとapiから取得した値をキャッシュに保持できる
//   return useQuery<Omit<User, 'hashedPassword'>, Error>({
//     // キャッシュ名を指定
//     queryKey: ['user'],
//     queryFn: getUser,
//     onError: (err: any) => {
//       console.log("err: " + err)
//       if (err.response.status === 401 || err.response.status === 403) {
//         router.push('/')
//       }
//     }
//   })
// }

// なぜauthを外から渡すと動くのか分かっていないので後で調べる
export const useQueryUser = () => {
  const auth = useAuth0();
  return useQuery(["user"],() => apiGet(auth));
};

export const apiGet = async (auth: any) => {
  const accessToken = await auth.getAccessTokenSilently();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/get`, 
    {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    }
  );

  console.log("apiGet > response:" + response)

  return response.data;
};

