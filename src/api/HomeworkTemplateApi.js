import ApiCaller from "./ApiCaller"

const baseUrl = "homeworkTemplate";

class HomeworkTemplateApi {
  static createHomeworkTemplate(name, lessonTemplateId, questions) {
    return ApiCaller.post(`${baseUrl}`, {
      "name": name,
      "lessonTemplateId": lessonTemplateId,
      "questions": questions,
    })
  }

  static updateHomeworkTemplate(id, name, questions) {
    return ApiCaller.update(`${baseUrl}`, {
      "id": id,
      "name": name,
      "questions": questions,
    })
  }

  static deleteHomeworkTemplate(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }
}

export default HomeworkTemplateApi;