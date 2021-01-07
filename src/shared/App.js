import React,{useState,useEffect} from "react";
import "./App.css";
import Nav from "../components/Nav.js"
import Footer from "../components/Footer.js"
import { Route, Switch,Redirect } from 'react-router-dom';
import { ProHome, ClassHome} from '../pages';
import 'regenerator-runtime/runtime'
const App = () => {
  const [category,setCategory]=useState(1);

  function setContents(e){
    setCategory(e);
  }
  useEffect(() => {
    //console.log(category);
    return () => {
     
    }
  }, [category])
  return (
      <div className="wrapper">
        <section>
            <Nav category={category} setContents={setContents}/>
            
            <Switch>
            <Route exact path="/">
              <Redirect to="/class" />
            </Route>
            <Route path="/class" component={ClassHome}/>
            <Route path="/professor" component={ProHome}/>
            </Switch>
            
            </section>
            <Footer/>
        </div>
  )
}
export default App;