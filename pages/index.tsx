import type { NextPage } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import * as Yup from 'yup'
import { IconDatabase } from "@tabler/icons"
import {ShieldCheckIcon} from '@heroicons/react/solid'
import {ExclamationCircleIcon} from "@heroicons/react/solid"
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { useForm, yupResolver } from "@mantine/form"
import { Layout } from "../components/Layout"
import { AuthForm } from "../types"

// Yupを使ってバリデーション
const schema = Yup.object().shape({
  userName: 
    Yup.string()
    .required('No username provided'),
  password:
    Yup.string()
    .required('No password provided')
    .min(5, 'Password should be min 5 chars'),
})

const Home: NextPage = () => {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  // MantineとYupでフォームの設定を行う
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      userName: '',
      password: '',
    },
  })

  const handleSubmit = async () => {
    try {
      console.log('handleSubmit')
      // サインアップしていない時に実行する
      if (isRegister) {
        // このデータがNestjsのdtoに渡される
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          userName: form.values.userName,
          password: form.values.password,
        })
      }

      // サインアップが完了したらそのままログイン処理
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        userName: form.values.userName,
        password: form.values.password,
      })

      // フォームをリセット
      form.reset()
      router.push('/dashboard')
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  return (
    // まずはLayoutでラップ
    <Layout title="Auth">
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      {/* errorがある場合はアラートを表示する */}
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

      {/* 本来はonSubmitに関数を設置するときはprevent defaultを設定するが
          form.onSubmitでラップするとそれが不要になる
      */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="username"
          label="Username*"
          placeholder="toranoi"
          // 通常はvalueとonChangeに加えて、各stateと更新用のロジックが必要になるが
          // mantain uiのuseFormだと以下の１行で全てやってくれる
          {...form.getInputProps('userName')}
        />
        <PasswordInput 
          mt="md"
          id="password"
          placeholder="password"
          label="Password*"
          description="Must be min 5 char"
          {...form.getInputProps('password')}
        />

        {/* テキストとボタンを横並びにするためにGroupを使用 */}
        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
          >
            {isRegister
              ? 'Have an account? Login'
              : "Don't have as account? Register"
            }
          </Anchor>
          <Button 
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {/* ログインモードかどうかで文言を切り替える */}
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Layout>
  )
}

export default Home