import React from "react";
import "./App.css";
import Nav from "./Nav.js"
import Content from "./Content.js"
import Footer from "./Footer.js"
const App = () => {
  return (
      <div className="wrapper">
            <Nav/>
            <Content/>
            <Footer/>
        </div>
  )
}
export default App;