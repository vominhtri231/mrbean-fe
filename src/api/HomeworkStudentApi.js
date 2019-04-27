import ApiCaller from "./ApiCaller"

const baseUrl = "homeworkStudent";

class HomeworkStudentApi {
  static saveHomeworkStudent(homeworkId, studentId, choices) {
    return ApiCaller.post(`${baseUrl}`, {
      "homeworkId": homeworkId,
      "studentId": studentId,
      "choices": choices,
    })
  }

  static getHomeworkStudent(homeworkId, studentId,) {
    return ApiCaller.get(`${baseUrl}?homeworkId=${homeworkId}&studentId=${studentId}`)
  }

  static getHomeworkStudentOfHomework(homeworkId) {
    return ApiCaller.get(`${baseUrl}/all?homeworkId=${homeworkId}`)
  }
}

export default HomeworkStudentApi;