import React, { useEffect, useState } from "react";
import { FiChevronDown, FiBell } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import HeaderItem from "./HeaderItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [scroll, setScroll] = useState(false);

  function toggleMobileMenu() {
    setMobileMenu(!mobileMenu);
  }

  function toggleAccountMenu() {
    setAccountMenu(!accountMenu);
  }

  useEffect(() => {
    const changeScroll = () => {
      if (window.scrollY >= 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", changeScroll);
  }, []);

  const { data } = useCurrentUser();

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex items-center flex-row transition duration-500 ${
          scroll ? "bg-zinc-900 bg-opacity-90" : "bg-inherit"
        }`}
      >
        <img className="h-4 lg:h-7" src="/assets/logo.png" alt="logoImage" />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <HeaderItem label="Home" />
          <HeaderItem label="Series" />
          <HeaderItem label="Films" />
          <HeaderItem label="New & Popular" />
          <HeaderItem label="My List" />
          <HeaderItem label="Browse by languages" />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-sm">Browse</p>
          <FiChevronDown
            className={`transition ${mobileMenu ? "rotate-180" : "rotate-0"}`}
          />
          <MobileMenu visible={mobileMenu} />
        </div>

        <div className="flex ml-auto gap-7 items-center">
          <div
            onClick={toggleAccountMenu}
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/assets/profile.png" alt="profile_image" />
            </div>

            <FiChevronDown
              className={`transition ${
                accountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={accountMenu} name={data?.name} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
