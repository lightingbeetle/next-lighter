import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Item } from "react-stately";
import ButtonMenu from "../ButtonMenu";

function PageHeader() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const onAction = useCallback(
    (key: string | number) => {
      switch (key) {
        case "logout": {
          signOut();
        }
        //NOTE: Links in ButtonMenu (react-aria Menu) are not supported well and we need this workaround to enable navigation
        case "profile": {
          router.push("/users/me");
        }
      }
    },
    [router]
  );

  return (
    <header className="page-header">
      <div className="page-header__logo">
        <Link href="/">Notebook</Link>
      </div>
      <div className="page-header__menu">
        <ButtonMenu
          label={sessionData?.user?.name}
          onAction={onAction}
          purpose="secondary"
        >
          {/* @ts-expect-error -- we neet to tell the Item we are going to pass a link to adjust styles accordingly */}
          <Item key="profile" isLink>
            {/* This not work as expected most of the times - nothing happens after click on link - that's why we do router push in onAction as well */}
            <Link href="/users/me">Profile</Link>
          </Item>
          <Item key="logout">Logout</Item>
        </ButtonMenu>
      </div>
    </header>
  );
}

export default PageHeader;
