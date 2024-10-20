import './App.css';
import ButtonHeader from './Component/ButtonHeader';
import BodyList from './Component/BodyList';
import Loading from './Component/Loading';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Result from './Component/Result';
import Intro from './Component/Intro';



function App() {

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  const [canAccessLoading, setCanAccessLoading] = useState(false);

  // Function to allow access to loading page (you can call this based on an event)
  const allowAccessToLoading = () => {
    setCanAccessLoading(true);
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro/>}></Route>
        <Route path="/main" element={<ButtonHeader/>} />
        <Route 
          path="/loading" 
          element={<Loading />} 
        />
        <Route path="/result" element={<Result/>} />
      </Routes>
    </Router>
  );
}

export default App;
