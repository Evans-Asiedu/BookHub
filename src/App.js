import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Books from "./components/books";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <Books />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
