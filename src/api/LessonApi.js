import ApiCaller from "./ApiCaller";

const baseUrl = "lesson";

class LessonApi {
  static createLesson(lessonNumber, description, klassId) {
    return ApiCaller.post(`${baseUrl}`, {
      lessonNumber: lessonNumber,
      description: description,
      klassId: klassId
    })
  }

  static getAllOfClass(klassId) {
    return ApiCaller.get(`${baseUrl}?klassId=${klassId}`);
  }

  static delete(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }

  static update(lessonNumber, description, id) {
    return ApiCaller.update(`${baseUrl}`, {
      lessonNumber: lessonNumber,
      description: description,
      id: id
    })
  }
}

export default LessonApi;
