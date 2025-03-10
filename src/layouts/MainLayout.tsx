import { Outlet } from "react-router-dom";
import Navbar, { NavLinks } from "../components/Navbar";
import GoBackButton from "../components/GoBackButton";
import Container from "../components/Container";

const MainLayout = ({ links }: { links: NavLinks[] }) => {
  return (
    <>
      <Navbar links={links} />
      <Container styleCssOverride=" ">
        <GoBackButton />
      </Container>

      <Outlet />
    </>
  );
};

export default MainLayout;
