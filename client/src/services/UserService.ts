import $api from "../http";
import{AxiosResponse} from "axios"
import { AuthResponse } from "../models/response/AuthResponse";
import{iUser} from "../models/iUser"
export default class UserService{
    static fetchUser(): Promise<AxiosResponse<iUser[]>>{
        return $api.get("/users")
    }
}