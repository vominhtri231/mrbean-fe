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

  static getAllOfClass(klassId){
    return ApiCaller.get(`${baseUrl}?klassId=${klassId}`);
  }
}

export default StudentApi;
