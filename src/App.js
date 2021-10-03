import './App.css';
import React, { createContext, useState } from "react";
import Bg from './Image/Bg.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Conform from './components/Conform/Conform';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
export const UserContext = createContext();
function App() {
  const [data, setData] = useState({});
  console.log(data);
  return (
    <UserContext.Provider value={[data, setData]}>
      <h1>User Name : {data.displayName}</h1>
      <div className="App" className="for-banner" style={{ backgroundImage: `url(${Bg})` }}>
        <Router>
          <Header />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/conform">
              <Conform />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
