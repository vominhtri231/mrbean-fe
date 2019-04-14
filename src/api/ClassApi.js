import ApiCaller from "./ApiCaller"

const baseUrl = "klass";

class ClassApi {
  static createClass(name, description, teacherId, studentIds) {
    return ApiCaller.post(`${baseUrl}`, {
      "name": name,
      "description": description,
      "teacherId": teacherId,
      "studentIds": studentIds
    })
  }

  static getClasses() {
    return ApiCaller.get(`${baseUrl}`)
  }

  static deleteClass(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }
}

export default ClassApi