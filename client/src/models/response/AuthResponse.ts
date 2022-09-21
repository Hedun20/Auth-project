import { iUser } from "../iUser";
export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    user:iUser;
}