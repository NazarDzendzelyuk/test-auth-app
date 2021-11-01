import Link from "next/link";

const routes = [
  {
    link: "/",
    label: "Public",
  },
  {
    link: "/offerings",
    label: "Offerings",
  },
  {
    link: "/restricted",
    label: "Restricted",
    auth: true,
  },
];

const NavBar = ({ isAuthenticated, isLoading, onLogin, onLogout }) => {
  if (isLoading) return null;

  return (
    <nav>
      {routes.map((elem) => {
        if (elem.auth && !isAuthenticated) return null;

        return (
          <Link key={elem.link} href={elem.link}>
            <a>{elem.label}</a>
          </Link>
        );
      })}
      <div className="login-container">
        {isAuthenticated ? (
          <button onClick={onLogout}>Log Out</button>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
