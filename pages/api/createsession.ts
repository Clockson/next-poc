/* API to create a dummy session, can be called from an edge
 * server, because that's how we roll now-a-days
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AddActivity } from '@/utils/recentactivity';

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("Add Activity called");
    console.log(req.query.activity);
    console.log(req.cookies.sessionId);
    if (req.cookies.sessionId != null) {
        AddActivity(req.cookies.sessionId, req.query.activity);
        res.status(200).json({ message: "success" });
    } else {
        res.status(400).json({ message: "There is no Session Id" });
    }
}
