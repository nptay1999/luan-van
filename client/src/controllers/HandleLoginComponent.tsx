import { useQuery } from "@apollo/client"
import React from "react"
import { useLocation, Redirect } from "react-router-dom"
import { LOGIN } from "../graphql/authGQL"
import LoadingComponent from "../components/LoadingComponent"
import { useAppDispatch } from "../redux/hooks"
import { login } from "../redux/reducer/authReducer"
import { LoginResponseInterface } from "../redux/models"

const HandleLoginComponent = () => {
  const { state } = useLocation()
  const dispatch = useAppDispatch()
  const { loading, error, data } = useQuery(LOGIN, { variables: state })
  if (loading) return <LoadingComponent />
  if (error) return <Redirect to="/login" />
  if (data !== undefined) {
    const { token, tokenExpiration, user }: LoginResponseInterface = data.login
    dispatch(login({ token, tokenExpiration, user }))
  }
  return <Redirect to="/account" />
}

export default HandleLoginComponent
