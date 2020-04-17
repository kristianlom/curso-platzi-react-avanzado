import React, { useContext } from 'react'
import { Context } from '../Context'
import { UserForm } from '../components/UserForm'
import { RegisterMutation } from '../container/RegisterMutation'
import { LoginMutation } from '../container/LoginMutation'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)
  return (
    <>
      <RegisterMutation>
        {
          (register, { loading, error }) => {
            const onSubmit = ({ email, password }) => {
              const input = { email, password }
              const variables = { input }
              register({ variables })
                .then(({ data }) => activateAuth(data.signup))
            }
            const errorMsg = error && 'Hay algún problema'
            return (
              <UserForm disabled={loading} error={errorMsg} title='Registrarse' onSubmit={onSubmit} />
            )
          }
        }
      </RegisterMutation>
      <LoginMutation>
        {
          (login, { loading, error }) => {
            const onSubmit = ({ email, password }) => {
              const input = { email, password }
              const variables = { input }
              login({ variables })
                .then(({ data }) => activateAuth(data.login))
            }
            const errorMsg = error && 'Credenciales incorrectas'

            return (
              <UserForm disabled={loading} error={errorMsg} title='Iniciar Sesión' onSubmit={onSubmit} />
            )
          }
        }
      </LoginMutation>
    </>
  )
}
