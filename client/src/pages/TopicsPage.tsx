import React from "react"
import {
  Link,
  useRouteMatch,
  useLocation,
  Switch,
  Route,
} from "react-router-dom"
import AllTopicsComponent from "../components/AllTopicsComponent"
import MyTopicsComponent from "../components/MytopicsComponent"
import classnames from "classnames"

const TopicsPage = () => {
  let { path, url } = useRouteMatch()
  let { pathname } = useLocation()

  return (
    <div className="container topics-page">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="py-4 mt-4">
            <div className="sub-text text-bold opacity-50">OVERVIEW</div>
            <div className="page-title">Topics</div>
          </div>
          <ul className="nav border-bottom">
            <li className="nav-item">
              <Link
                to={url}
                className={classnames("nav-link", { active: pathname === url })}
              >
                All Topics
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${url}/your-topic`}
                className={classnames("nav-link", {
                  active: pathname === `${url}/your-topic`,
                })}
              >
                Your Topics
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-12">
          <Switch>
            <Route exact path={path}>
              <AllTopicsComponent />
            </Route>
            <Route path={`${path}/:topicId`}>
              <MyTopicsComponent />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default TopicsPage
