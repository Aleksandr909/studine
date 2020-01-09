import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";
import { localStoreInit } from "./store/actions/localStorage";
import "materialize-css";

function App() {
  const dispacth = useDispatch();
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  dispacth(localStoreInit());
  const localStoreReady = useSelector(state => state.app.localStoreReady);

  if (!ready || !localStoreReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated
      }}
    >
      <Router>
        <div className="win ">
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
          {isAuthenticated && <Navbar />}
          <div className="block z-depth-1">{routes}</div>
          {isAuthenticated && <Footer />}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
