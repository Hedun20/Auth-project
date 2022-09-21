const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuId  =require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../DTO/userDto');
const ApiError = require("../exceptions/apiErrors");
class userService{
    async registration(email, password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с такой почтой${email} уже существует`);
        }
        const activationLink = uuId.v4();
        const hashPass = await bcrypt.hash(password,7 );
        const user = await UserModel.create({email, password: hashPass,activationLink});
        await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken); 
        console.log(this.registration);
        return {
            ...tokens,
            user:userDto
        };
       
    }
    async activate(activationLink){
        const user = await UserModel.findOne({activationLink});
        if(!user){
            throw ApiError.BadRequest("Error activation link");
        }
            user.isActivated = true;
            await user.save(); 
    }
    async login (email, password){
        const user = await UserModel.findOne({email});
        if(!user){
            throw ApiError.BadRequest(`Пользователь с такой почтой${email} несуществует`);
        }
        const isPassEquals =await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.BadRequest(`Неверный пароль`);
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken); 
        return {
            ...tokens,
            user:userDto
        };

}
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnathorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if(!userData||!tokenFromDb){
            throw ApiError.UnathorizedError();
        }
        const user  = UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken); 
        return {
            ...tokens,
            user:userDto
        };
    }
    async getALlUsers(){
        const users = await UserModel.find();
        return users;

    }
} 


module.exports = new userService();