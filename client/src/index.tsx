import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import { store, persistor } from "./redux"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import ApolloContext from "./context/ApolloContext"
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloContext>
          <App />
        </ApolloContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
