const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "CodeWith@TeghSingh123456789";
const fetchuser=(req,res,next)=>{
    try {
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({error:"Authentication Failed! Invalid authorized token."});
        }
        const data = jwt.verify(token,JWT_SECRET_KEY);
        req.user = data.user
        next()
    } catch (error) {
        console.error(error);
        return res.status(401).send({error : "Authentication Failed! Invalid authorized token."});
    }
}
module.exports = fetchuser;