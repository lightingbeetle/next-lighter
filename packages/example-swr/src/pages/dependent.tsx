import React from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const UserInfo = ({ url }) => {
  const { data, error } = useSWR(url, fetcher);

  if (error) return <>An error has occurred.</>;
  if (!data) return <>Loading...</>;
  // Github specific
  if (data.message) return data.message;

  return (
    <>
      <td align="right">{data.followers}</td>
      <td align="right">{data.following}</td>
    </>
  );
};

const UserTable = () => {
  const { data, error } = useSWR(
    "https://api.github.com/users?per_page=5",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  // Github specific
  if (data.message) return data.message;
  if (Array.isArray(data) && data.length === 0) return "No results found";

  return (
    <table>
      <thead>
        <tr>
          <th align="left">Profile</th>
          <th>Avatar</th>
          <th align="right">Followers</th>
          <th align="right">Following</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            <td align="center">
              <a href={item.html_url}>{item.login} profile</a>
            </td>
            <td align="center">
              <img src={`${item.avatar_url}`} width="40" alt="" />
            </td>
            <UserInfo url={item.url} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Simple = () => {
  return (
    <>
      <h1>
        Fetch{" "}
        <a href="https://api.github.com/users" target="_blank" rel="noreferrer">
          Github users
        </a>{" "}
        info
      </h1>
      <UserTable />
    </>
  );
};
export default Simple;
