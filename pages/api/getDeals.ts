// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Deal } from '@/models/deal.model';
import { DealsService } from '@/utils/DealsService';
import { RedisCacheService } from '@/utils/RedisCacheService';

type Data = {
  deals: Deal[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cacheService = new RedisCacheService();
  await cacheService.Connect();
  const dealsService = new DealsService(cacheService);
  const results = { "deals": dealsService.GetDealList(8) };
  res.status(200).json(results);
}
