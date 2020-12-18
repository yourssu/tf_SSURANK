import React,{useState,useEffect} from "react";
import "./App.css";
import Nav from "../components/Nav.js"
import Footer from "../components/Footer.js"
import { Route, Switch } from 'react-router-dom';
import { ProHome, ClassHome} from '../pages';
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
            <Nav category={category} setContents={setContents}/>
            <Switch>
            <Route path="/class" component={ClassHome}/>
            <Route path="/professor" component={ProHome}/>
            </Switch>
            <Footer/>
        </div>
  )
}
export default App;