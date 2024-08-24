import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import DataView from './views/dataView';
import ReactGA from "react-ga4";
import { useEffect } from 'react';


function App() {

  useEffect(() => {
      ReactGA.initialize("G-FKREF78QMV");
  }, []);

  console.log(process.env.PUBLIC_URL);

  return (
    <div className="App">
      <HashRouter>
          <Routes>
            <Route
              exact
              path='/'
              element = { <DataView mapType="choropleth"/> } 
            />
            <Route
              exact
              path='/gridmap'
              element = { <DataView mapType="gridMap"/> } 
            />
            <Route
              exact
              path='/choroplethdiff'
              element = { <DataView mapType="choroplethDiff"/> } 
            />
            <Route
              exact
              path='/choroplethloserdiff'
              element = { <DataView mapType="choroplethLoserDiff"/> } 
            />
            <Route
              exact
              path='/parliament'
              element = { <DataView mapType="parliamentChart"/> } 
            />
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
