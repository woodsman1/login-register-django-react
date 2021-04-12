import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";


import Login from "./comp/Login";
import Signup from "./comp/Signup";
import Home from "./comp/Home";
import { onLogin, onSignUp } from "./comp/utilities/Request";

const App = () => {
    
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true) 

  const onlogin = (obj) => {
    setLoading(true);
    const stat = onLogin(obj, setAuthenticated);
    setLoading(false);
    return stat
  };

  const onsignup = (obj) => {
    setLoading(true);
    const stat = onSignUp(obj , setAuthenticated);
    setLoading(false);
    return stat
  };

  return (
    <Router>
      <div>
        {/* <Navbar authenticated={authenticated} /> */}
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              {!authenticated ? (
                <Redirect to="/login" />
              ) : (
                <Home  />
              )}
            </Route>

            <Route exact path="/login">
              <Login onlogin={onlogin} />
            </Route>

            <Route exact path="/sign-up">
              <Signup onSignUp={onsignup} />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
