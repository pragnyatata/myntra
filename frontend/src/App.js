import { Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./containers/home";
import SlotForm from "./containers/slotform";
import React from "react";
import NavBar from "./components/navbar";
import CreateSlot from "./containers/createslot";
import SlotList from "./containers/slotlist";
<<<<<<< HEAD
import Chat from "./components/chat";
=======
import LiveStream from "./containers/livestream";
import BuddyChat from "./containers/buddychat";
>>>>>>> fbcb7f3072d969217b2932d077c353dce078c774

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/slot" component={SlotList} />
          <Route exact path="/slot/create" component={CreateSlot} />
          <Route exact path="/slot/:scheduleId" component={SlotForm} />
<<<<<<< HEAD
          <Route exact path="/chat" component={Chat} />
=======
          <Route exact path="/live/:url" component={LiveStream} />
          <Route exact path="/buddy/chat" component={BuddyChat} />
>>>>>>> fbcb7f3072d969217b2932d077c353dce078c774
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
