import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Eventlist from "./Eventlist";
import Shoppingcart from "./Shoppingcart";
import Confirmation from "./Confirmation";
import ErrorBanner from "./ErrorBanner";

function App() {
  return (
      <Router>
        <Header />
        <ErrorBanner />
        <Route exact path="/" component={Eventlist} />
        <Route exact path="/cart" component={Shoppingcart} />
        <Route exact path="/confirm" component={Confirmation} />
      </Router>
  );
}

export default App;
