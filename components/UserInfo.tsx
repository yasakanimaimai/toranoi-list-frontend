import { useQueryUser } from "../hooks/useQueryUser"
import { Button, Loader } from "@mantine/core"
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { User } from "@prisma/client"

export const Userinfo = () => {

  // const { data: user, status } = useQueryUser()
  // if (status === 'loading') return <Loader />

  const { error, getAccessTokenSilently } = useAuth0();

  const getUser = async () => {
    
    const accessToken = await getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      scope: "read:current_user",
    })

    const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user/get`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
    )
  
    console.log("accessToken:" + accessToken)
    console.log("error:" + error)
    console.log("data:" + data)


    return data
  }

  return (
    <>
      <Button onClick={getUser}></Button>
      {/* <p>{user?.name}</p> */}
    </>
  )
}
