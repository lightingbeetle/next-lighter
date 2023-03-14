import { useRouter } from "next/router";
import UserCard from "../../components/UserCard";
import { trpc } from "../../utils/trpc";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { isLoading, isError, error, data } = trpc.users.getById.useQuery(id, {
    enabled: Boolean(id),
    retry: false,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <UserCard {...data} />;
};

UserPage.auth = true;

export default UserPage;
