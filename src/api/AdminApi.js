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

  static getAdmin(id) {
    return ApiCaller.get(`${baseUrl}/${id}`);
  }

  static updateAdmin(id, email, name) {
    return ApiCaller.update(`${baseUrl}`, {
      id: id,
      email: email,
      name: name,
      role: appConstants.roles.Admin
    })
  }
}

export default AdminApi;
