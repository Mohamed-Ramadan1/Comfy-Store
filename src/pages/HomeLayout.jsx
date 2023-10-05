import { Outlet, useNavigate } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
const HomeLayout = () => {
  const navigation = useNavigate();
  const isPageLoading = navigation.state === "Loading";
  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
