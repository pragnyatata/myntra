import { Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./containers/home";
import SlotForm from "./containers/slotform";
import React from "react";
import NavBar from "./components/navbar";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/slot" component={SlotForm} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
