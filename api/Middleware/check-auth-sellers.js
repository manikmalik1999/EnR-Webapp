const jwt= require('jsonwebtoken');
module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SELLER_KEY)
        req.userData = decoded;
        next();
    }
    catch(error)
    {
        return res.json({
            message:'Unauthorized',
            status: 401
        }).status(401);
        
    }
   
};