import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  Home,
  SignIn,
  SignUp,
  Dashboard,
  PageNotFound,
} from "./pages/index";
import Layout from "./components/Layout";
import ROUTES from "./routes";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ToastContainer />
        <Routes>
          <Route path={ROUTES.signIn} element={<SignIn />} />
          <Route path={ROUTES.signUp} element={<SignUp />} />

          <Route path={ROUTES.landing} element={<Layout />}>
            <Route path={ROUTES.landing} element={<Landing />} />
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.completeProfile} element={<div>Profile</div>} />
          </Route>

          <Route path={ROUTES.notFound} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
