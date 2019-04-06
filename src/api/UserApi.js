import ApiCaller from "./ApiCaller"

const baseUrl="user";
class UserApi{
  static getRole(token){
    return ApiCaller.get(`${baseUrl}/${token}/role`);
  }
}

export default UserApi
