# Example of T3 full-stack notetaking app

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack. Including:

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [zod](https://zod.dev/)
- [react-query](https://react-query-v3.tanstack.com/)
- [react-aria](https://react-spectrum.adobe.com/react-aria/)
- [react-hook-form](https://react-hook-form.com/)

## Possible enhancements

- [ ] custom styled [auth pages](https://next-auth.js.org/configuration/pages)](https://next-auth.js.org/configuration/pages)
- [ ] add the possibility to log in with [credentials](https://next-auth.js.org/configuration/providers/credentials)
- [ ] migration guide to PostgreSQL

## How do I deploy this?

Currently, this app is not ready to be deployed without effort.

### Option 1: Current database SQLite

Currently, this app uses SQLite as a database which could limit hosting solutions ([free possibilities](https://gist.github.com/bmaupin/d2d243218863320b01b0c1e1ca0cf5f3)). Another option is to host it as [Docker](https://create.t3.gg/en/deployment/docker) container.

### Option 2: Migration to PostgreSQL

Migration from SQLite to PostgreSQL could improve hosting options ([free possibilities](https://gist.github.com/bmaupin/0ce79806467804fdbbf8761970511b8c)). Frontend and TRPC APIs are compatible with [Vercel](https://create.t3.gg/en/deployment/vercel)]. The disadvantage of this approach makes it more complicated to use this app as an example because PostgreSQL has to be installed globally on the computer.
