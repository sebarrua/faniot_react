import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import Nav from "./components/Nav";
import Sensor from "./pages/Sensor";
import Medicion from "./pages/Medicion";
import AddSensor from "./pages/AddSensor";
import AddMedicion from "./pages/AddMedicion";

function App() {
  return (
    <Router>
      <div>
        <Nav/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/sensor">
            <Sensor/>
          </Route>
          <Route path="/medicion">
            <Medicion/>
          </Route>
          <Route path="/addSensor">
            <AddSensor/>
          </Route>
          <Route path="/addMedicion">
            <AddMedicion/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
