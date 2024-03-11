require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE
const PORT=process.env.PORT
const JWTPASS = process.env.JWTPASS

module.exports={
    MONGOOSE_URL,
    PORT,
    JWTPASS,
}