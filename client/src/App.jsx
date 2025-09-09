import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Private from "./components/Private";
import CreateListing from "./pages/CreateListing";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<Private/>}>
          <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element= {<CreateListing/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         
      </Routes>
    </BrowserRouter>
  );
};

export default App;
