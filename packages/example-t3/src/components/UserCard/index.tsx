import React from "react";

// Prisma have strong opinions on how null vs. undefined is used so we have to count with null in the types https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const UserCard = ({ name, email, image }: UserProps) => {
  return (
    <div className="user-card">
      {image && (
        <img className="user-card__image" src={image} alt={name ?? ""} />
      )}
      <h2 className="user-card__name">{name ?? "Name not provided"}</h2>
      {email && (
        <p>
          <a className="user-card__email" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      )}
    </div>
  );
};

export default UserCard;
