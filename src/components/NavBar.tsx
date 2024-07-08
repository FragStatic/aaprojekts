import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [location, setLocation] = useState(useLocation().pathname);

  return (
    <div className="flex w-full items-center text-3xl pl-16">
      <Link
        className={location === "/" ? "underline mr-8" : "mr-8"}
        to="/"
        onClick={() => setLocation("/")}
      >
        Tabula
      </Link>
      <Link
        className={location === "/about-me" ? "underline" : ""}
        to="/about-me"
        onClick={() => setLocation("/about-me")}
      >
        Par mani
      </Link>
    </div>
  );
}
