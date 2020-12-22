import React from "react";
import { useStyleguideContext } from "../Styleguide/useStyleguideContext";
import HeaderItem from "./HeaderItem";
import { H4 } from "../Typography";

const HeaderTitle = () => {
  const { currentPage } = useStyleguideContext();

  if (!currentPage) {
    return null;
  }

  return (
    <HeaderItem fill>
      <H4 as="div">{currentPage}</H4>
    </HeaderItem>
  );
};

export default HeaderTitle;
