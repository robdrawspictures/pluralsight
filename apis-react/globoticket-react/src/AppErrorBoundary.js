import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Eventlist from "./Eventlist";
import Shoppingcart from "./Shoppingcart";
import Confirmation from "./Confirmation";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
      <Router>
        <Header />
        <ErrorBoundary fallback={<div className="mt-5 ms-5">ERROR!</div>}>
          <Route exact path="/" component={Eventlist} />
        </ErrorBoundary>
        <Route exact path="/cart" component={Shoppingcart} />
        <Route exact path="/confirm" component={Confirmation} />
      </Router>
  );
}

export default App;
