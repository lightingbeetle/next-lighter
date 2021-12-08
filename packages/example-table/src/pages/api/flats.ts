import flatsData, { filter } from "../../mocks/data/flats";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { FlatObjectAttributesFromAPI } from "../../mocks/data/objects";

type Data = {
  filter: typeof filter;
  data: FlatObjectAttributesFromAPI[];
  count: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);
  // const filteredData = data.filter(item => )
  res.status(200).json(flatsData);
}
