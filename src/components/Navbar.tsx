import { NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import Container from "./Container";
import { useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";

export type NavLinks = { text: string; to: string };
const Navbar = ({ links }: { links: NavLinks[] }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <nav>
      <Container
        styleCssOverride="bg-neutral-800 text-white min-h-[100px] flex items-center"
        containerCssAdd=" xl:flex justify-between items-center"
      >
        <div className="flex justify-between px-4">
          <NavLink to="/">
            <img className="mx-auto my-8 xl:m-0" src={logo} alt="logo" />
          </NavLink>
          <button
            onClick={() => {
              setVisible(!visible);
            }}
            className="xl:hidden"
          >
            <BiMenuAltRight
              className={
                "text-3xl transform transition duration-300 " +
                (!visible ? "" : "scale-y-[-1] ")
              }
            />
          </button>
        </div>
        <ul
          className={
            "uppercase xl:flex justify-between items-center " +
            (!visible ? "hidden" : "block")
          }
        >
          {links.map(({ text, to }, index) => (
            <li className="flex flex-col justify-center" key={index}>
              <NavLink
                className={({ isActive }) =>
                  "border-x-4 border-r-transparent border-solid xl:border-y-4 xl:border-t-transparent xl:border-x-0 border-neutral-400 hover:xl:border-b-neutral-400 hover:border-l-neutral-400 transition duration-100 min-h-[100px] py-4 px-8 flex justify-center items-center " +
                  (!isActive ? " border-transparent" : "")
                }
                children={text}
                to={to}
                onClick={() => setVisible(false)}
              />
            </li>
          ))}
        </ul>
        <div className="xl:px-0 px-4 ">
          <input
            className="rounded-full h-[40px] px-4 py-3 xl:w-auto w-full my-4"
            id="search"
            type="text"
            placeholder="Search..."
          />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
