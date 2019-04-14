import ApiCaller from "./ApiCaller";
import appConstants from "../util/appConstants";

const baseUrl = "admin";

class AdminApi {
  static createAdmin(email, name) {
    return ApiCaller.post(`${baseUrl}`, {
      email: email,
      name: name,
      role: appConstants.roles.Admin
    })
  }
}

export default AdminApi;
