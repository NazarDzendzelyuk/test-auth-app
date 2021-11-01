import { useEffect, useState } from "react";
// import isomorphic from "isomorphic-unfetch";

const Offerings = ({ data = [], isAuthenticated }) => {
  const [offerings, setOfferings] = useState(data);
  const [mounted, setMounted] = useState(false);

  const getOfferings = async () => {
    const res = await fetch("/api/offerings", {
      headers: {
        Authorization: isAuthenticated,
      },
    });

    return res.json();
  };

  // useEffect(() => {
  //   setMounted(true);

  //   if (!mounted && !isAuthenticated) return;

  //   (async function () {
  //     const { data } = await getOfferings();

  //     setOfferings(data);
  //   })();
  // }, [isAuthenticated]);

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

// export async function getStaticProps() {
//   const res = await isomorphic("http://localhost:3000/api/offerings");

//   const data = await res.json();

//   return {
//     props: {
//       ...data,
//     },
//   };
// }
