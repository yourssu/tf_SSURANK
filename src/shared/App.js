import React,{useState,useEffect} from "react";
import {atom,useRecoilValue} from "recoil";
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
  const HAS_VISITED_BEFORE = localStorage.getItem('PopupVisited');
  /*const isWebAppAtom = atom({
    key:"userAccessToken",
    default :(document.cookie||null)
  })*/ 

  function setContents(e){
    setCategory(e);
  }
  const userAgent = window.navigator.userAgent.toLowerCase(),
  safari = /safari/.test( userAgent ),
  ios = /iphone|ipod|ipad/.test( userAgent );
  const onClick = () => {
    let expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem('PopupVisited', expires);
   setShowModal(false)};
{/*
  useEffect(() => {
    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }
      if (!HAS_VISITED_BEFORE) {
        setShowModal(true);
      }
    };
    window.setTimeout(handleShowModal, 0);
  }, [HAS_VISITED_BEFORE]);*/
}
  useEffect(() => {
    //console.log('this is '+ios)
  },[]
  )
  useEffect(() => {
    //console.log(category);
    return () => {
     
    }
  }, [category])
  useEffect(()=>{
    console.log(navigator.userAgent.toLowerCase())
    console.log()
  },[]);
  
  return (
      <div className="wrapper">
        <section>
          {
          (navigator.userAgent.indexOf("SSURANK")>-1)||
          <Nav category={category} setContents={setContents}/>
          }
            
            
            <Switch>
            <Route exact path="/">
              <Redirect to="/professor" />
            </Route>
            <Route path="/class" component={ClassHome}/>
            <Route path="/professor" component={ProHome}/>
            <Route path="/credit" component={Credit}/>
            </Switch>
            {showModal && <Modal onClose={onClick} />}
            </section>
            {
          (navigator.userAgent.indexOf("SSURANK")>-1)||
          <Footer/>
          }
            
        </div>
  )
}
export default App;