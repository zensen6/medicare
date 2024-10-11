import './App.css';
import ButtonHeader from './Component/ButtonHeader';
import BodyList from './Component/BodyList';
import { useEffect } from 'react';

function App() {

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });


  return (
    <div className="App">
      <ButtonHeader></ButtonHeader>
    </div>
  );
}

export default App;
