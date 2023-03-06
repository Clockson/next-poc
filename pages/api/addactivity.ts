// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { cookies } from 'next/headers';
import { GetUserFromToken } from './../../utils/users';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AddActivity } from '@/utils/recentactivity';

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const user = GetUserFromToken(req.headers.authorization);

    if (user && req.cookies.sessionId != null) {
        AddActivity(req.cookies.sessionId, req.query.activity);
        res.status(200).json({ message: "Success: " + user.name + " is a real boy." });
    } else {
        res.status(400).json({ message: "There is no Session Id" });
    }

}
