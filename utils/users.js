// decodes jwt token and returns a populated user object

import jsonwebtoken from 'jsonwebtoken';

export const GetUserFromToken = (token) => {
    try {
        const user = jsonwebtoken.decode(token);

        return user;
    } catch {
        return null;
    }
}