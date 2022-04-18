import "./App.css";
import Header from "./Components/Header";
import DataTable from "./Components/DataTable";
import Footer from "./Components/Footer";
import React, { useState } from "react";
import { advanceSearch, searchForm } from "./Services/Data";

function App() {
 
  //console.log([data.invoice_currency]);
  return (
    <div className="App">
      <Header/>
      <DataTable/>
      <Footer />
    </div>
  );
}

export default App;
