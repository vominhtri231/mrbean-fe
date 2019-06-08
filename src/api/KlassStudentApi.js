import ApiCaller from "./ApiCaller"

const baseUrl = "klassStudent";

class KlassStudentApi {
  static getKlassesOfStudent(studentId) {
    return ApiCaller.get(`${baseUrl}/klass?studentId=${studentId}`)
  }

  static getStudentsOfKlass(klassId) {
    return ApiCaller.get(`${baseUrl}/student?klassId=${klassId}`)
  }

  static unregisterStudents(id, studentIds) {
    return ApiCaller.update(`${baseUrl}/unRegisterStudents`, {
      "id": id,
      "studentIds": studentIds
    })
  }

  static registerStudents(id, studentIds) {
    return ApiCaller.update(`${baseUrl}/registerStudents`, {
      "id": id,
      "studentIds": studentIds
    })
  }
}

export default KlassStudentApi;