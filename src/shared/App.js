import React,{useState,useEffect} from "react";
import "./App.css";
import Nav from "../components/Nav.js"
import Footer from "../components/Footer.js"
import { Route, Switch,Redirect } from 'react-router-dom';
import { ProHome, ClassHome,Credit} from '../pages';
import 'regenerator-runtime/runtime'
import Modal from '../pages/Modal'
const App = () => {
  const [category,setCategory]=useState(1);
  const [showModal, setShowModal] = useState(false);
  const HAS_VISITED_BEFORE = localStorage.getItem('visited');

  function setContents(e){
    setCategory(e);
  }
  const onClick = () => {
    console.log('dd');
   setShowModal(false)};
  useEffect(() => {
    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }

      if (!HAS_VISITED_BEFORE) {
        setShowModal(true);
        let expires = new Date();
        expires = expires.setHours(expires.getHours() + 24);
        localStorage.setItem('visited', expires);
      }
    };

    window.setTimeout(handleShowModal, 2000);
  }, [HAS_VISITED_BEFORE]);

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
            <Route path="/credit" component={Credit}/>
            </Switch>
            {showModal && <Modal onClose={onClick} />}
            </section>
            
            <Footer/>
        </div>
  )
}
export default App;