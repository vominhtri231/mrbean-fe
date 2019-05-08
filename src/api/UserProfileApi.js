import ApiCaller from "./ApiCaller"

const baseUrl = "user-profile";

class UserProfileApi {
  static getCurrentProfile() {
    return ApiCaller.get(`${baseUrl}/me`)
  }
}

export default UserProfileApi