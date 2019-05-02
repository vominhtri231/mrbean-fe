import ApiCaller from "./ApiCaller"

const baseUrl = "user";

class UserApi {
  static getUser() {
    return ApiCaller.get(`${baseUrl}`);
  }

  static deleteUser(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`);
  }
}

export default UserApi
