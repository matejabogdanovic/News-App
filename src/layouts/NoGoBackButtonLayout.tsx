import { Outlet } from "react-router-dom";
import Navbar, { NavLinks } from "../components/Navbar";

const NoGoBackButtonLayout = ({ links }: { links: NavLinks[] }) => {
  return (
    <>
      <Navbar links={links} />
      <Outlet />
    </>
  );
};

export default NoGoBackButtonLayout;
