import React from "react";
import { useSession, signIn } from "next-auth/react";

type ProtectedPageProps = {
  children: React.ReactNode;
};

function ProtectedPage({ children }: ProtectedPageProps) {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <p>Access Denied</p>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  return <>{children}</>;
}

export default ProtectedPage;
