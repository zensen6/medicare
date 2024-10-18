import './App.css';
import ButtonHeader from './Component/ButtonHeader';
import BodyList from './Component/BodyList';
import { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ButtonHeader/>} />
        <Route path="/result" element={<Result/>} />
      </Routes>
    </Router>
  );
}

export default App;
