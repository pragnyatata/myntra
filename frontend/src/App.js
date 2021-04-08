import { Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./containers/home";
import SlotForm from "./containers/slotform";
import React from "react";
import NavBar from "./components/navbar";
import CreateSlot from "./containers/createslot";
import SlotList from "./containers/slotlist";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/slot" component={SlotList} />
          <Route exact path="/slot/:scheduleId" component={SlotForm} />
          <Route exact path="/slot/create" component={CreateSlot} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
