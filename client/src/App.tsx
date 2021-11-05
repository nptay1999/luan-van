import React, { Fragment } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import HandleLoginComponent from "./controllers/HandleLoginComponent"
import AccountPage from "./pages/AccountPage"
import EditTopicPage from "./pages/EditTopicPage"
import LoginPage from "./pages/LoginPage"
import SuggestTopicPage from "./pages/SuggestTopicPage"
import TopicsPage from "./pages/TopicsPage"

function App() {
  return (
    <Router>
      <Switch>
        {/* Pages Route */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/suggest-topic" component={SuggestTopicPage} />
        <Route path="/topics" component={TopicsPage} />
        <Route path="/edit-topic/:id">
          <EditTopicPage />
        </Route>
        {/* Controllers Route */}
        <Route path="/login-handle" component={HandleLoginComponent} />
      </Switch>
    </Router>
  )
}

const HomePage = () => {
  return (
    <Fragment>
      <h1> Hello world! This is home page</h1>
      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
      <br />
      <br />
      <Link to="/account">
        <button className="btn btn-primary">account</button>
      </Link>
      <br />
      <br />
      <Link to="/suggest-topic">
        <button className="btn btn-primary">suggest topic</button>
      </Link>
      <br />
      <br />
      <Link to="/topics">
        <button className="btn btn-primary">Topics</button>
      </Link>
    </Fragment>
  )
}

export default App
