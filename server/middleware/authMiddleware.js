const ApiError = require("../exceptions/apiErrors");
const tokenService = require("../service/tokenService");
module.exports = function(req,res,next){
    try{
        const authorizationHeader = req.header.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnathorizedError());
        }
        const accessToken = authorizationHeader.split(" ")[1];
        if(!accessToken){
            return next(ApiError.UnathorizedError());
    }
        const  userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnathorizedError());
        }
        res.user = userData;
        next();
    } 
    catch(error){
        return next(ApiError.UnathorizedError());
    }
};