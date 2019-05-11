import ApiCaller from "./ApiCaller";

const baseUrl = "lessonTemplate";

class LessonTemplateApi {
  static createLessonTemplate(description, content, klassTemplateId) {
    return ApiCaller.post(`${baseUrl}`, {
      description: description,
      content: content,
      klassTemplateId: klassTemplateId
    })
  }

  static getAllOfClass(klassTemplateId) {
    return ApiCaller.get(`${baseUrl}?klassTemplateId=${klassTemplateId}`);
  }

  static getLessonTemplate(id) {
    return ApiCaller.get(`${baseUrl}/${id}`)
  }

  static deleteLessonTemplate(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }

  static updateLessonTemplate(id, description, content) {
    return ApiCaller.update(`${baseUrl}`, {
      description: description,
      content: content,
      id: id
    })
  }
}

export default LessonTemplateApi;
