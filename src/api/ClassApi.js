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

  static getClassesOfTeacher(teacherId) {
    return ApiCaller.get(`${baseUrl}/teacher?teacherId=${teacherId}`)
  }

  static updateClass(id, name, description, teacherId) {
    return ApiCaller.update(`${baseUrl}`, {
      "id": id,
      "name": name,
      "description": description,
      "teacherId": teacherId,
    })
  }

  static deleteClass(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }

  static getClass(id) {
    return ApiCaller.get(`${baseUrl}/${id}`)
  }
}

export default ClassApi