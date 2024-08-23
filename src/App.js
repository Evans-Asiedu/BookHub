import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Books from "./components/books";
import NavBar from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container pt-5">
          <Switch>
            <Route path="/" component={Books} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
