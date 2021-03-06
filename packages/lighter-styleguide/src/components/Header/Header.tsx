import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import HeaderBar from "./HeaderBar";
import HeaderLogo from "./HeaderLogo";
import HeaderTitle from "./HeaderTitle";

type HeaderProps = {
  customUI?: React.ReactNode;
};

const Header = ({ customUI }: HeaderProps) => {
  return (
    <>
      {customUI ? (
        customUI
      ) : (
        <HeaderBar>
          <HeaderLogo />
          <HeaderTitle />
          <HeaderAdmin />
        </HeaderBar>
      )}
    </>
  );
};

export default Header;
