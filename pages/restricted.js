import Router from "next/router";
import Head from "next/head";

const Restricted = ({ isAuthenticated, isLoading }) => {
  if (!isLoading && !isAuthenticated) {
    Router.replace("/");
  }
  return (
    <>
      <Head>
        <title>Restricted page</title>
        <meta name="description" content="Restricted page" />
      </Head>
      <h1>Restricted</h1>
    </>
  );
};

export default Restricted;
