import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import useAuth from "@/hooks/useAuth";

const Layout = () => {
  const { role } = useAuth();

  return (
    <div className="relative max-h-max min-h-screen overflow-x-clip">
      <div className="fixed backdrop-blur-3xl flex w-full">
        <Navbar role={role} />
      </div>
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
