import ApiCaller from "./ApiCaller";
import appConstants from "../util/appConstants";

const baseUrl = "teacher";

class TeacherApi {
  static createTeacher(email, name, phoneNumber, dateOfBirth) {
    return ApiCaller.post(`${baseUrl}`, {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      role: appConstants.roles.Teacher
    })
  }

  static getAll() {
    return ApiCaller.get(`${baseUrl}`);
  }

  static getTeacher(id) {
    return ApiCaller.get(`${baseUrl}/${id}`);
  }

  static updateTeacher(id, email, name, phoneNumber, dateOfBirth) {
    return ApiCaller.update(`${baseUrl}`, {
      id: id,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      role: appConstants.roles.Teacher
    })
  }
}

export default TeacherApi;
