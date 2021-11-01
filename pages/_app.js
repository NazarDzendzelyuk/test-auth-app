import "../styles/globals.css";

import router from "next/router";
import { useState, useEffect, createContext } from "react";
import { isTokenActive } from "../utils";

import NavBar from "../components/NavBar";

export const UserContext = createContext();

const App = ({ Component, pageProps }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, []);

  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && isTokenActive(storedToken)) {
      setToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setToken("");
    }
  };

  const onLogin = () => {
    const data = {
      userName: "username",
      password: "password",
    };

    // fetch("/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then(({ token }) => {
    //     console.log(token);
    //     localStorage.setItem("token", token);
    //     setToken(token);
    //     setIsAuthenticated(true);
    //   });
  };

  const onLogout = () => {
    localStorage.removeItem("token");

    setIsAuthenticated(false);
  };

  const isLoading = isAuthenticated === null;

  return (
    <UserContext.Provider
      value={{
        token,
        isAuthenticated,
        isLoading,
      }}
    >
      <NavBar
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        onLogout={onLogout}
        onLogin={onLogin}
      />
      <Component
        {...{
          ...pageProps,
          isAuthenticated,
          isLoading,
        }}
      />
    </UserContext.Provider>
  );
};

export default App;
