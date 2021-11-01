import { useEffect, useState } from "react";
import isomorphic from "isomorphic-unfetch";
import Head from 'next/head'

const Offerings = ({ data = [], isAuthenticated }) => {
  const [offerings, setOfferings] = useState(data);
  const [mounted, setMounted] = useState(false);

  const getOfferings = async () => {
    const res = await fetch(
      "https://test-auth-app-ten.vercel.app/api/offerings",
      {
        headers: {
          Authorization: isAuthenticated,
        },
      }
    );

    return res.json();
  };

  useEffect(() => {
    setMounted(true);

    if (!mounted && !isAuthenticated) return;

    (async function () {
      const { data } = await getOfferings();

      setOfferings(data);
    })();
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>Offerings</title>
        <meta name="description" content="All offerings" />
      </Head>
      <h1>Offerings</h1>

      {offerings.map((elem) => (
        <div key={elem}>{elem}</div>
      ))}
    </>
  );
};

export default Offerings;

export async function getStaticProps() {
  const res = await isomorphic(
    "https://test-auth-app-ten.vercel.app/api/offerings"
  );

  const data = await res.json();

  return {
    props: {
      ...data,
    },
  };
}
