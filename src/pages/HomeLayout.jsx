import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
const HomeLayout = () => {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
