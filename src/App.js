import React,{useState,useEffect} from "react";
import "./App.css";
import Nav from "./Nav.js"
import Content from "./Content.js"
import Footer from "./Footer.js"
const App = () => {
  const [category,setCategory]=useState(1);

  function setContents(e){
    setCategory(e);
  }
  useEffect(() => {
    console.log(category);
    return () => {
     
    }
  }, [category])
  return (
      <div className="wrapper">
        <section>
            <Nav category={category} setContents={setContents}/>
            <Content category={category} />
            <Footer/>
            </section>
        </div>
  )
}
export default App;