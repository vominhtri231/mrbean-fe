import ApiCaller from "./ApiCaller"

const baseUrl = "admin";

class AdminApi {
  static createClass(name, description) {
    return ApiCaller.post(`${baseUrl}/klass`, {
      "name": name,
      "description": description
    })
  }
  static getClasses() {
    return ApiCaller.get(`${baseUrl}/klass`)
  }

  static deleteClass(id){
    return ApiCaller.delete(`${baseUrl}/klass/${id}`)
  }
}

export default AdminApi