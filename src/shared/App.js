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
        <section>
            <Nav category={category} setContents={setContents}/>
            <Route exact path="/">
              <Redirect to="/class" />
            </Route>
            <Switch>
            <Route path="/class" component={ClassHome}/>
            <Route path="/professor" component={ProHome}/>
            </Switch>
            <Footer/>
            </section>
        </div>
  )
}
export default App;