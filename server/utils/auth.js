const jwt = require('jsonwebtoken');

const secret = 'thisisasecret_ssh-12342341';
const expiration = '2h';

module.exports = {
    signToken: ({ username, email, _id }) => {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: ({ req }) => {
        // allows token to be sent by headers, req.query, or req.body
        let token = req.body.token || req.query.token || req.headers.authorization;

        // separate 'bearer' from token value
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // if no token, return request object as is
        if (!token) {
            return req;
        }

        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated request object
        return req;
    }
}