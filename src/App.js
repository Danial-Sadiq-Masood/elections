import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppContext } from './contexts';
import Landing from './views/landing';
import Data from './views/data';
import ReactGA from "react-ga4";
import { useEffect, useState } from 'react';


function App() {

  const [app, setFbApp] = useState(null);

  useEffect(() => {
      ReactGA.initialize("G-FKREF78QMV");
  }, []);

  console.log(process.env.PUBLIC_URL);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppContext.Provider value={{app}}>
          <Routes>
            <Route
              exact
              path='/'
              element = { <Data /> } 
            />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
