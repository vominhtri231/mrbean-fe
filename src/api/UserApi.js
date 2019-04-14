import ApiCaller from "./ApiCaller"

const baseUrl = "user";

class UserApi {
  static getUser() {
    return ApiCaller.get(`${baseUrl}`);
  }
}

export default UserApi
