// saves and loads recent activity for a session

import fs from 'fs';
import path from 'path';

const sessionDirectory = path.join(process.cwd(), 'data/sessions');

export const AddActivity = (sessionId, activity) => {
    // load the existing seesion file if it is available
    const filename = sessionId + '.json';
    const filepath = path.join(sessionDirectory, filename)

    let session = {};

    if (fs.existsSync(filepath)) {
        session = JSON.parse(fs.readFileSync(filepath));
    } else {
        session.activity = [];
    }

    session.activity.push(activity);

    fs.writeFileSync(filepath, JSON.stringify(session));
}