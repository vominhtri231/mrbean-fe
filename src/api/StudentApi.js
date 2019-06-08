import ApiCaller from "./ApiCaller";
import appConstants from "../util/appConstants";

const baseUrl = "student";

class StudentApi {
  static createStudent(email, name, phoneNumber, dateOfBirth, workspace, isWorker) {
    return ApiCaller.post(`${baseUrl}`, {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      workspace: workspace,
      isWorker: isWorker,
      role: appConstants.roles.Student
    })
  }

  static getAll() {
    return ApiCaller.get(`${baseUrl}/all`);
  }

  static getStudent(id) {
    return ApiCaller.get(`${baseUrl}/${id}`);
  }

  static updateStudent(id, email, name, phoneNumber, dateOfBirth, workspace, isWorker) {
    return ApiCaller.update(`${baseUrl}`, {
      id: id,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      workspace: workspace,
      isWorker: isWorker,
      role: appConstants.roles.Student
    })
  }
}

export default StudentApi;
