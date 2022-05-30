import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import { useState } from "react";
import './App.css';
function App() {
  const [showLogin, setShowLogin] = useState(localStorage.getItem("token") ? false : true);
  return (
    <>
    {showLogin ? <AuthScreen  isShowLogin={setShowLogin}/> : <HomeScreen isShowLogin={setShowLogin}/>}
      </>
    
  );
}

export default App;
