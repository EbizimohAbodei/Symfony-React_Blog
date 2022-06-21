import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import ScrollToTop from "./Components/ScrollToTop";
import About from "./Components/About";
import CreateArticle from "./Components/CreateArticle";

const Index = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="createarticle" element={<CreateArticle />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDom.createRoot(document.querySelector("#app"));
root.render(<Index />);

export default Index;
