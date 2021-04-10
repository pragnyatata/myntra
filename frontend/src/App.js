import { Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./containers/home";
import React from "react";
import NavBar from "./components/navbar";
import CreateSlot from "./containers/createslot";
import SlotList from "./containers/slotlist";
import Chat from "./components/chat";
import LiveStream from "./containers/livestream";
import BuddyChat from "./containers/buddychat";
import UserChat from "./containers/userchat";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/slot" component={SlotList} />
          <Route exact path="/slot/create" component={CreateSlot} />
          <Route exact path="/chat/:roomId" component={Chat} />
          <Route exact path="/user/chat" component={UserChat} />
          <Route exact path="/live/:url" component={LiveStream} />
          <Route exact path="/buddy/chat" component={BuddyChat} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
