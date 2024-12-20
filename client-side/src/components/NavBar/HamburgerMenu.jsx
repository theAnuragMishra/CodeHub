import { useState } from "react";
import Hamburger from "hamburger-react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const auth = true;

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <div
        className={` bg-opacity-[70%] rounded-xl ${isOpen ? "fixed " : "absolute  right-4"
          } z-[90] right-4`}
      >
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          color="#fff"
          size={30}
        />
      </div>

      <div
        className={`fixed inset-0 py-16 w-full h-full text-white transition-all duration-700 ease-in-out transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } z-40`}
      >
        <nav className="flex flex-col justify-center gap-12 items-center h-full relative text-4xl font-bebas text-navlink">
          <ul className="flex flex-col items-center justify-center gap-1">
            <li className="py-2 px-4 hover:text-blue1 transition-all duration-300 ease-in-out">
              <a href="/">Home</a>
            </li>
            <li className="py-2 px-4 hover:text-blue1 transition-all duration-300 ease-in-out">
              <a href="/contact-us">Contact Us</a>
            </li>
            <li className="py-2 px-4 hover:text-blue1 transition-all duration-300 ease-in-out">
              <a href="/notice-board">NoticeBoard</a>
            </li>
          </ul>
          {auth ? (
            <a href="/user-home">
              <button
                className={`md:flex w-[9.8rem] h-[4rem] tracking-wider bg-accent text-white items-center justify-center font-semibold font-bebas hover:text-register hover:bg-white transition-all duration-500 ${isOpen ? "block" : "hidden"
                  }`}
              >
                <h1 className="text-[2.2rem]">PROFILE</h1>
              </button>
            </a>
          ) : (
            <a href="/login">
              <button
                className={`md:flex w-[9.8rem] h-[4rem] tracking-wider bg-accent text-white items-center justify-center font-semibold font-bebas hover:text-register hover:bg-white transition-all duration-500 ${isOpen ? "block" : "hidden"
                  }`}
              >
                <h1 className="text-[2.2rem]">Login</h1>
              </button>
            </a>
          )}
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
