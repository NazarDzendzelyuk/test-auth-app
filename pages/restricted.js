import Router from "next/router";

const Restricted = ({ isAuthenticated, isLoading }) => {
  if (!isLoading && !isAuthenticated) {
    Router.replace("/");
  }
  return <h1>Restricted</h1>;
};

export default Restricted;
