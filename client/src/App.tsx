import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Home, SignIn, Dashboard, PageNotFound } from "./pages/index";
import Layout from "./components/Layout";
import ROUTES from "./routes";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.signIn} element={<SignIn />} />

        <Route path={ROUTES.landing} element={<Layout />}>
          <Route path={ROUTES.landing} element={<Landing />} />
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.completeProfile} element={<div>Profile</div>} />
        </Route>

        <Route path={ROUTES.notFound} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
