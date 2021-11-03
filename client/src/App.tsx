import React, { Fragment } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import HandleLoginComponent from "./components/HandleLoginComponent"
import AccountPage from "./pages/AccountPage"
import LoginPage from "./pages/LoginPage"
import SuggestTopic from "./pages/SuggestTopic"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/login-handle" component={HandleLoginComponent} />
        <Route path="/account" component={AccountPage} />
        <Route path="/suggest-topic" component={SuggestTopic} />
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
    </Fragment>
  )
}

export default App
