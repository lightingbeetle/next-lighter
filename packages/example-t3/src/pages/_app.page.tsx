import { type AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "components/styles.scss";
import "../styles/index.scss";
import ProtectedPage from "../components/ProtectedPage";
import PageHeader from "../components/PageHeader";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: { auth?: boolean } & AppProps["Component"];
} & AppProps<{ session: Session | null }>) => {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <ProtectedPage>
          <PageHeader />
          <Component {...pageProps} />
        </ProtectedPage>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
