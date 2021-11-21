import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketDataTable from './components/market-data-table.component.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<MarketDataTable />}/>
        </Routes>
      </Router>
    );
  }
}

export default App;