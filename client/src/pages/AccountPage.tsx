import React from "react"
import { useAppSelector } from "../redux/hooks"
import { AuthenticationInterface } from "../redux/models"
import { authSelector } from "../redux/reducer/authReducer"

const AccountPage = () => {
  const { user }: AuthenticationInterface = useAppSelector(authSelector)

  return (
    <div className="account-page container">
      <div className="display-3 mb-3">Accout</div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center mb-3 py-4 border-top border-bottom">
            <img
              src={
                user
                  ? user.info?.avatar
                  : "https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"
              }
              alt="avatar"
              width="48px"
              className="rounded-circle"
            />
            <div className="flex-grow-1 px-3">
              <div className="username">
                {user ? user.username : "username"}
              </div>
              <small className="sub-text">
                PNG or JPG no bigger than 1000px wide and tall.
              </small>
            </div>
            <button className="btn btn-primary btn-sm">Upload</button>
          </div>
        </div>

        <div className="col-12">
          <div className="py-4">
            <div className="mb-3">
              <label htmlFor="ident" className="form-label">
                Identification:
              </label>
              <input
                type="text"
                id="ident"
                className="form-control"
                value={user ? user.info?.identification : "B1709566"}
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={user ? user.info?.name : "Nguyễn Phương Tây"}
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                value={user ? user.info?.email : "nptay@example.com"}
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={user ? user.info?.phone : "0910010203"}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
