// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GetDealList } from '@/utils/dataloader';
import { Deal } from '@/models/deal.model';

type Data = {
  deals: Deal[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const results = { "deals": GetDealList(8) };
  res.status(200).json(results);
}
