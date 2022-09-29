// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  position: string;
  finished: boolean;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await timeout(2000);

  res.status(200).json(
    [...Array(10)].map((_item, index) => ({
      id: `${index + 1}`,
      position: `${index + 1}`,
      finished: !!(index % 2),
    }))
  );
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
