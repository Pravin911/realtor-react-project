import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state change listener
  }, [auth]);

  const pathMatchRoute = (route) => route === location.pathname;

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-white border-b-1 shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <NavItem
              label="Home"
              active={pathMatchRoute("/")}
              onClick={() => navigate("/")}
            />
            <NavItem
              label="Offers"
              active={pathMatchRoute("/offers")}
              onClick={() => navigate("/offers")}
            />
            <NavItem
              label={pageState}
              active={pathMatchRoute("/sign-in") || pathMatchRoute("/profile")}
              onClick={() => navigate("/profile")}
            />
          </ul>
        </div>
      </header>
    </div>
  );
}

// Separate component for navigation item to improve readability
function NavItem({ label, active, onClick }) {
  return (
    <li
      className={`cursor-pointer py-3 text-sm font-semibold ${
        active
          ? "text-black border-b-2 border-red-500"
          : "text-gray-400 hover:text-black hover:border-b-2 hover:border-red-500"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
}
