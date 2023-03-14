import UserCard from "../../components/UserCard";
import { trpc } from "../../utils/trpc";

const UserPage = () => {
  const { isLoading, isError, error, data } = trpc.users.getMe.useQuery();

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
