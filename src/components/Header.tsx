import logo from "../images/logo.svg";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="sticky top-0 border-b border-primary bg-secondary">
      <div className="w-full inline-flex pb-8 pt-12 px-16">
        <img alt="No Logo" src={logo} className="w-32" />
        <NavBar />
      </div>
    </header>
  );
}
