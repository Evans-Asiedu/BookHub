import React, { Component } from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Books from "./components/books";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container pt-5">
          {/* <Books /> */}
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
