import React from "react"
import ReactDOM from "react-dom"
console.log("aaa")
console.log(document.querySelector("#root"))

const App = () => {
  return <div>helo!!! react</div>
}

ReactDOM.render(<App />, document.querySelector("#root"))
