import { useEffect, useState } from "react";
import nodeFetch from "node-fetch";

const Offerings = ({ data, isAuthenticated }) => {
  const [offerings, setOfferings] = useState(data);
  const [mounted, setMounted] = useState(false);

  const getOfferings = async () => {
    const res = await fetch("/offerings", {
      headers: {
        Authorization: isAuthenticated,
      },
    });

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
      <h1>Offerings</h1>

      {offerings.map((elem) => (
        <div key={elem}>{elem}</div>
      ))}
    </>
  );
};

export default Offerings;

export async function getStaticProps() {
  const res = await nodeFetch("/offerings");

  const data = await res.json();

  return {
    props: {
      ...data,
    },
  };
}
