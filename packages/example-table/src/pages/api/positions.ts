// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  position: string;
  finished: boolean;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(
    [...Array(30)].map((_item, index) => ({
      id: `${index}`,
      position: `${index}`,
      finished: !!(index % 2),
    }))
  );
}
