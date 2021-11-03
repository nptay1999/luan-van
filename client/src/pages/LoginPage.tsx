import React, { useState, ChangeEvent, FormEvent, Fragment } from "react"
import { Redirect } from "react-router-dom"

const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [hasLogin, setHasLogin] = useState<boolean>(false)

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username.length !== 0 || password.length !== 0) {
      console.log("Login", { username, password })
      setHasLogin(true)
    }
  }

  return (
    <Fragment>
      {!hasLogin ? (
        <div className="login-page container h-fullscreen">
          <div className="row h-fullscreen d-flex justify-content-center align-items-center">
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center h-fullscreen">
              <div className="w-100">
                <h1 className="text-center display-3 mb-4">Login</h1>
                <form onSubmit={onFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="username"
                      value={username}
                      onChange={onUsernameChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="password"
                      value={password}
                      onChange={onPasswordChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Đăng nhập
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect
          to={{ pathname: "login-handle", state: { username, password } }}
        />
      )}
    </Fragment>
  )
}

export default LoginPage
