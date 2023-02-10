import type { NextPage } from "next"
import { useState } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/solid"
import { Alert } from '@mantine/core'
import { Layout } from "../components/Layout"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mantine/core"

const Home: NextPage = () => {
  const [error, setError] = useState('')
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Layout title="Toranoi">
      {error && (
        <Alert 
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          title="Autorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}

      {isAuthenticated 
        ?(
          <Button
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
          >
            Log out
          </Button>
        )
        :(
          <Button 
            onClick={loginWithRedirect}
          >
            Log in
          </Button>
        )
      }
    </Layout>
  )
}

export default Home