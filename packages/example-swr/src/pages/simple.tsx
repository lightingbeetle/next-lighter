import React from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const UserTable = () => {
  const { data, error } = useSWR(
    "https://api.github.com/users?per_page=5",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  // Github specific
  if (data.message) return data.message;
  if (Array.isArray(data) && data.length === 0) return "No users found";

  return data.map((item) => (
    <tr>
      <td>{item.login}</td>
      <td align="center">
        <img src={`${item.avatar_url}`} width="40" alt="" />
      </td>
      <td align="center">
        <a href={item.html_url}>{item.login} profile</a>
      </td>
      <td align="right">
        <a href={item.subscriptions_url}>Subscribe to {item.login}</a>
      </td>
    </tr>
  ));
};

const Simple = () => {
  return (
    <>
      <h1>
        Fetch{" "}
        <a href="https://api.github.com/users" target="_blank" rel="noreferrer">
          Github users
        </a>
      </h1>
      <table>
        <thead>
          <tr>
            <th align="left">Username</th>
            <th>Avatar</th>
            <th>Profile</th>
            <th align="right">Subscribtion</th>
          </tr>
        </thead>
        <tbody>
          <UserTable />
        </tbody>
      </table>
    </>
  );
};
export default Simple;
