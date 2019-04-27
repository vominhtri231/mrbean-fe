import ApiCaller from "./ApiCaller"

const baseUrl = "homework";

class HomeworkApi {
  static createHomework(name, deathLine, lessonId, questions) {
    return ApiCaller.post(`${baseUrl}`, {
      "name": name,
      "deathLine": deathLine,
      "lessonId": lessonId,
      "questions": questions,
    })
  }

  static updateHomework(id, name, deathLine, questions) {
    return ApiCaller.update(`${baseUrl}`, {
      "id": id,
      "name": name,
      "deathLine": deathLine,
      "questions": questions,
    })
  }

  static deleteHomework(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }

  static endHomework(id) {
    return ApiCaller.update(`${baseUrl}/end/${id}`)
  }
}

export default HomeworkApi;