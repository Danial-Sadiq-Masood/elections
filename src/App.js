import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppContext } from './contexts';
import Landing from './views/landing';
import Data from './views/data';
import ReactGA from "react-ga4";
import { useEffect, useState } from 'react';

//set up firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


function App() {

  const [app, setFbApp] = useState(null);

  useEffect(() => {
      ReactGA.initialize("G-FKREF78QMV");

      const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: "elections-2024.firebaseapp.com",
        databaseURL: "https://elections-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "elections-2024",
        storageBucket: "elections-2024.appspot.com",
        messagingSenderId: process.env.SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: "G-LLHN1373JL"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      setFbApp(app);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{app}}>
          <Routes>
            <Route
              exact
              path='/'
              element = { <Landing /> } 
            />
            <Route
              exact
              path='/data'
              element = { <Data /> } 
            />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
