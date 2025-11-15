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
import ROUTES from "./routes";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppLayout, PublicLayout } from "./layouts";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          {/* -------- Public Routes (NO SIDEBAR) -------- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path={ROUTES.signIn} element={<SignIn />} />
            <Route path={ROUTES.signUp} element={<SignUp />} />
          </Route>

          {/* -------- Protected/App Routes (SIDEBAR VISIBLE) -------- */}
          <Route element={<AppLayout />}>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.completeProfile} element={<div>Profile</div>} />
            {/* add more here */}
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
