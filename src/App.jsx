import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./Components";
import {Home, Sukses} from "./pages"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent/>
        <main>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/" component={Sukses} />
          </Routes>
        </main>
      </BrowserRouter>
    )
    
  }
}


