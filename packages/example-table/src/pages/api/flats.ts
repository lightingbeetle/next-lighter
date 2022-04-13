import flatsData, { filter } from "../../mocks/data/flats";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { FlatObjectAttributesFromAPI } from "../../mocks/data/objects";

type Data = {
  filter: typeof filter;
  data: FlatObjectAttributesFromAPI[];
  count: number;
};

const getParam = (value) => {
  return Array.isArray(value) ? value[0] : value;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // create a object copy so this filtering works, shallow copy does not work
  let resultData = JSON.parse(JSON.stringify(flatsData));
  const maxPageItems = 10;
  const { query } = req;
  const { page, price_from, price_to, rooms, has_balcony } = query;
  if (!!price_from || !!price_to) {
    resultData.data = resultData.data.filter(
      (flat) =>
        flat.price >=
          parseInt(getParam(price_from ?? flatsData?.filter?.price_from)) &&
        flat.price <=
          parseInt(getParam(price_to ?? flatsData?.filter?.price_to))
    );
    resultData.count = resultData.data.length;
  }
  if (rooms) {
    resultData.data = resultData.data.filter((flat) =>
      rooms.includes(flat.rooms)
    );
    resultData.count = resultData.data.length;
  }
  if (has_balcony) {
    resultData.data = resultData.data.filter((flat) => flat.has_balcony);
    resultData.count = resultData.data.length;
  }
  if (page) {
    const pageNum = parseInt(getParam(page)) || 1;
    const [pageStart, pageEnd] = [
      (pageNum - 1) * maxPageItems,
      pageNum * maxPageItems,
    ];
    resultData.data = resultData.data.slice(pageStart, pageEnd);
  }
  res.status(200).json(resultData);
}
