import ApiCaller from "./ApiCaller";

const baseUrl = "lesson";

class LessonApi {
  static createLesson(lessonNumber, description, content, klassId) {
    return ApiCaller.post(`${baseUrl}`, {
      lessonNumber: lessonNumber,
      description: description,
      content: content,
      klassId: klassId
    })
  }

  static getAllOfClass(klassId) {
    return ApiCaller.get(`${baseUrl}?klassId=${klassId}`);
  }

  static delete(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }

  static update(lessonNumber, description, content, id) {
    return ApiCaller.update(`${baseUrl}`, {
      lessonNumber: lessonNumber,
      description: description,
      content: content,
      id: id
    })
  }
}

export default LessonApi;
