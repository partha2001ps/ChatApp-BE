const jwt = require('jsonwebtoken');
const { JWTPASS } = require('../utilies/config');

const auth = {
    auth_middleWare: async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({message:"Token not vaild"})
        }
        const getToken = (request) => {
            const authorization = request.get('authorization');
            if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
                return authorization.substring(7)
            }
            return null;
        }
        try {
            jwt.verify(getToken(req), JWTPASS, (error, decodeToken) => {
                if (error) {
                   return res.status(400).json({message:"Invaild Token"})
                }
                req.userId = decodeToken.id;
                next();
           }) 
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports=auth