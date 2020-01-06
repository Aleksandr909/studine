import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";
import { Footer } from "./components/Footer";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
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
