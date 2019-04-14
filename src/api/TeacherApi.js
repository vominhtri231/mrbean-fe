import ApiCaller from "./ApiCaller";
import appConstants from "../util/appConstants";

const baseUrl = "teacher";

class TeacherApi {
  static createTeacher( email, name, phoneNumber, dateOfBirth) {
    return ApiCaller.post(`${baseUrl}`, {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      role: appConstants.roles.Teacher
    })
  }

  static getAll(){
    return ApiCaller.get(`${baseUrl}`);
  }
}

export default TeacherApi;
