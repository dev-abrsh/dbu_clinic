import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/ddbuicon.png";
import useAuth from "../../hooks/useAuth";
import { authAPI } from "@/services/apiService";

interface Props {
  role?: string;
}

const Navbar = ({ role = "" }: Props) => {
  const { loggedIn, setLoggedIn, setRole, setUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch {}
    setLoggedIn(false);
    setRole("");
    setUser(null);
    navigate("/");
    setOpen(false);
  };

  const linkClass =
    "block md:inline text-[1.05rem] text-black opacity-80 hover:text-blue-500 hover:opacity-100 duration-200";

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="DBU logo" className="w-12 md:w-14" />

        {/* Hamburger (mobile only) */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* Nav links */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent
          ${open ? "block" : "hidden"} md:block`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 xl:gap-10 p-4 md:p-0">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            {role === "doctor" && (
              <NavLink to="/Doctor_dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}
            {role === "patient" && (
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}
            {role === "admin" && (
              <NavLink to="/admins_dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}

            {role === "" && (
              <>
                <NavLink to="/#services" className={linkClass}>
                  Services
                </NavLink>
                <NavLink to="/#about" className={linkClass}>
                  About us
                </NavLink>
              </>
            )}

            <NavLink to="/contact" className={linkClass}>
              Contact us
            </NavLink>

            {!loggedIn ? (
              <NavLink to="/signin" className={linkClass}>
                Sign in
              </NavLink>
            ) : (
              <button onClick={handleLogout} className={linkClass}>
                Logout
              </button>
            )}

            {!loggedIn && (
              <NavLink to="/signup">
                <button className="bg-blue-700 text-white px-4 py-2 rounded-2xl">
                  Sign up
                </button>
              </NavLink>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
